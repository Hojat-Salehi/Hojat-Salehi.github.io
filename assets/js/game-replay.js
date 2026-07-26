/*!
 * Multi-agent debate replay (AGENT_BRIEF.md Demo 3).
 * A stepper walking through one real recorded run of game-analyst-multiagent:
 * each analyst's argument, both parallel debates, the judges' convergence,
 * the head analyst's cross-check, the final prediction, then the actual
 * outcome. Driven entirely by a JSON transcript (assets/data/game_replay/)
 * pulled straight from the run's own SQLite database -- no live LLM call,
 * per the brief: a live demo needs a key, costs money per visitor, and can
 * fail during an interview; a recorded replay is free and fully controllable.
 */
(function () {
  "use strict";

  // ---------- minimal, safe markdown -> HTML ----------
  // The transcript content is real model output (prose with #/##/### headers,
  // **bold**, and "- " bullet lists). No markdown library is vendored on this
  // site (see corbin-explorer.js's own hand-rolled-SVG rationale) -- this is
  // the same philosophy applied to text. HTML-escapes first, then only ever
  // emits tags itself, so nothing in the source text can inject markup.
  function escapeHtml(s) {
    return s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function inlineFormat(s) {
    return s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  }

  function markdownToHtml(text) {
    var lines = escapeHtml(text).split("\n");
    var html = [];
    var listOpen = false;

    function closeList() {
      if (listOpen) { html.push("</ul>"); listOpen = false; }
    }

    lines.forEach(function (raw) {
      var line = raw.trim();

      if (line === "") { closeList(); return; }
      if (/^-{3,}$/.test(line)) { closeList(); html.push("<hr>"); return; }

      var h = line.match(/^(#{1,6})\s+(.*)$/);
      if (h) {
        closeList();
        var level = Math.min(h[1].length + 2, 6); // keep below the page's own h1/h2
        html.push("<h" + level + ">" + inlineFormat(h[2]) + "</h" + level + ">");
        return;
      }

      var li = line.match(/^[-*]\s+(.*)$/);
      if (li) {
        if (!listOpen) { html.push("<ul>"); listOpen = true; }
        html.push("<li>" + inlineFormat(li[1]) + "</li>");
        return;
      }

      closeList();
      html.push("<p>" + inlineFormat(line) + "</p>");
    });
    closeList();
    return html.join("\n");
  }

  // ---------- rendering ----------

  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    for (var k in attrs) {
      if (Object.prototype.hasOwnProperty.call(attrs, k)) e.setAttribute(k, attrs[k]);
    }
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  var STEP_TYPE_LABEL = {
    analyst: "Analyst",
    debate: "Debate",
    judge: "Judge",
    final: "Head Analyst",
    outcome: "Outcome",
    lessons: "Lessons",
  };

  function renderStepBody(step) {
    var body = el("div", { class: "replay-step-body" });

    if (step.type === "debate") {
      var cols = el("div", { class: "replay-debate-cols" });
      step.positions.forEach(function (pos) {
        var col = el("div", { class: "replay-debate-col" });
        col.appendChild(el("p", { class: "replay-debate-col-label" }, pos.label));
        col.appendChild(el("div", { class: "replay-prose" }, markdownToHtml(pos.argument)));
        cols.appendChild(col);
      });
      body.appendChild(cols);
      return body;
    }

    if (step.type === "judge") {
      var meta = el("div", { class: "replay-judge-meta" });
      meta.appendChild(el("span", { class: "replay-badge" }, step.key_projection));
      meta.appendChild(el("span", { class: "replay-badge replay-badge-muted" }, "Confidence: " + step.confidence));
      body.appendChild(meta);
      body.appendChild(el("div", { class: "replay-prose" }, markdownToHtml(step.content)));
      return body;
    }

    if (step.type === "final") {
      var meta2 = el("div", { class: "replay-judge-meta" });
      meta2.appendChild(el("span", { class: "replay-badge replay-badge-hero" }, "Predicted: " + step.predicted_winner));
      meta2.appendChild(el("span", { class: "replay-badge" }, "Win prob: " + step.win_probability + "%"));
      meta2.appendChild(el("span", { class: "replay-badge" }, "Total: " + step.projected_total));
      meta2.appendChild(el("span", { class: "replay-badge replay-badge-muted" }, "Confidence: " + step.confidence));
      body.appendChild(meta2);
      body.appendChild(el("div", { class: "replay-prose" }, markdownToHtml(step.content)));
      return body;
    }

    if (step.type === "outcome") {
      var card = el("div", { class: "replay-outcome-card" });
      var score = el("div", { class: "replay-score" });
      score.appendChild(el("span", { class: "replay-score-team" }, step.away_team + " " + step.away_score));
      score.appendChild(el("span", { class: "replay-score-sep" }, "–"));
      score.appendChild(el("span", { class: "replay-score-team" }, step.home_score + " " + step.home_team));
      card.appendChild(score);

      var verdict = el("div", { class: "replay-verdict" + (step.winner_correct ? " correct" : " incorrect") });
      verdict.textContent = (step.winner_correct ? "✓ " : "✗ ") +
        "Predicted " + step.predicted_winner + " — " + (step.winner_correct ? "correct" : "incorrect") +
        " (actual winner: " + step.actual_winner + ", total error: " + step.total_error + ")";
      card.appendChild(verdict);
      body.appendChild(card);
      body.appendChild(el("div", { class: "replay-prose" }, markdownToHtml(step.content)));
      return body;
    }

    if (step.type === "lessons") {
      var list = el("div", { class: "replay-lessons" });
      step.lessons.forEach(function (lesson) {
        var details = el("details", { class: "replay-lesson" });
        var summary = el("summary", { class: "replay-lesson-summary" });
        summary.appendChild(el("span", {}, lesson.label));
        summary.appendChild(el("span", { class: "replay-badge replay-badge-outcome-" + lesson.outcome.toLowerCase() }, lesson.outcome));
        details.appendChild(summary);
        details.appendChild(el("div", { class: "replay-prose" }, markdownToHtml(lesson.lesson)));
        list.appendChild(details);
      });
      body.appendChild(list);
      return body;
    }

    // analyst (default)
    body.appendChild(el("div", { class: "replay-prose" }, markdownToHtml(step.content)));
    return body;
  }

  function buildStepper(root, data) {
    var state = { index: 0 };
    var steps = data.steps;

    var wrap = el("div", { class: "game-replay" });

    var meta = el("div", { class: "replay-meta" });
    meta.appendChild(el("span", {}, data.meta.away_team + " @ " + data.meta.home_team));
    meta.appendChild(el("span", { class: "replay-meta-sep" }, "·"));
    meta.appendChild(el("span", {}, data.meta.sport + " · " + data.meta.game_date.slice(0, 10)));
    wrap.appendChild(meta);

    var pillRow = el("div", { class: "replay-pills" });
    var pillButtons = [];
    steps.forEach(function (step, i) {
      var pill = el("button", { type: "button", class: "replay-pill", "aria-label": step.label });
      pill.textContent = (i + 1);
      pill.title = step.label;
      pill.addEventListener("click", function () { goTo(i); });
      pillButtons.push(pill);
      pillRow.appendChild(pill);
    });
    wrap.appendChild(pillRow);

    var panel = el("div", { class: "replay-panel" });
    var panelHeader = el("div", { class: "replay-panel-header" });
    var stepTypeLabel = el("p", { class: "channel-label" });
    var stepTitle = el("h3", {});
    panelHeader.appendChild(stepTypeLabel);
    panelHeader.appendChild(stepTitle);
    panel.appendChild(panelHeader);
    var panelBody = el("div", { class: "replay-panel-body" });
    panel.appendChild(panelBody);
    wrap.appendChild(panel);

    var nav = el("div", { class: "replay-nav" });
    var prevBtn = el("button", { type: "button", class: "corbin-tab" }, "← Previous");
    var stepCount = el("span", { class: "replay-step-count" });
    var nextBtn = el("button", { type: "button", class: "corbin-tab" }, "Next →");
    nav.appendChild(prevBtn);
    nav.appendChild(stepCount);
    nav.appendChild(nextBtn);
    wrap.appendChild(nav);

    root.appendChild(wrap);

    function goTo(i) {
      state.index = Math.max(0, Math.min(steps.length - 1, i));
      render(true);
    }

    prevBtn.addEventListener("click", function () { goTo(state.index - 1); });
    nextBtn.addEventListener("click", function () { goTo(state.index + 1); });

    function render(scroll) {
      var step = steps[state.index];
      pillButtons.forEach(function (p, i) { p.classList.toggle("active", i === state.index); });
      stepTypeLabel.textContent = "STEP " + (state.index + 1) + "/" + steps.length + " — " + (STEP_TYPE_LABEL[step.type] || step.type).toUpperCase();
      stepTitle.textContent = step.label;
      panelBody.innerHTML = "";
      panelBody.appendChild(renderStepBody(step));
      stepCount.textContent = (state.index + 1) + " / " + steps.length;
      prevBtn.disabled = state.index === 0;
      nextBtn.disabled = state.index === steps.length - 1;
      if (scroll) panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    render(false);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var root = document.getElementById("game-replay-root");
    if (!root) return;
    fetch(root.getAttribute("data-src"))
      .then(function (r) { return r.json(); })
      .then(function (data) { buildStepper(root, data); })
      .catch(function () {
        root.innerHTML = '<p class="corbin-error">Could not load the replay transcript.</p>';
      });
  });
})();
