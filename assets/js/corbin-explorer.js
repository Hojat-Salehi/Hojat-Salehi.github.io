/*!
 * CorBin-FL privacy/accuracy explorer (AGENT_BRIEF.md Demo 1).
 * Hand-rolled SVG chart, no chart library, no backend -- reads
 * assets/data/corbin_sweep.json (real numbers, see the file's own
 * "generated_from" field). Log-scaled x-axis (privacy budget epsilon),
 * linear y-axis (test accuracy %). Non-private baselines render as
 * dashed flat reference lines since they have no epsilon.
 */
(function () {
  "use strict";

  var SVG_NS = "http://www.w3.org/2000/svg";
  var MARGIN = { top: 20, right: 24, bottom: 44, left: 46 };
  var WIDTH = 760;
  var HEIGHT = 420;
  var EPS_MIN = 0.08;
  var EPS_MAX = 9;

  // Marker shapes cycle for non-CorBin-FL series so they stay
  // distinguishable without leaning on more accent colors.
  var MARKER_SHAPES = ["circle", "square", "diamond", "triangle", "cross", "circle"];

  function el(tag, attrs, parent) {
    var e = document.createElementNS(SVG_NS, tag);
    for (var k in attrs) {
      if (Object.prototype.hasOwnProperty.call(attrs, k)) e.setAttribute(k, attrs[k]);
    }
    if (parent) parent.appendChild(e);
    return e;
  }

  function xScale(epsilon) {
    var lo = Math.log(EPS_MIN), hi = Math.log(EPS_MAX);
    var t = (Math.log(epsilon) - lo) / (hi - lo);
    return MARGIN.left + t * (WIDTH - MARGIN.left - MARGIN.right);
  }

  function yScale(acc, yMin) {
    var t = (acc - yMin) / (100 - yMin);
    return HEIGHT - MARGIN.bottom - t * (HEIGHT - MARGIN.top - MARGIN.bottom);
  }

  function drawMarker(shape, cx, cy, size, cls, parent) {
    var half = size / 2;
    if (shape === "circle") {
      el("circle", { cx: cx, cy: cy, r: half, class: cls }, parent);
    } else if (shape === "square") {
      el("rect", { x: cx - half, y: cy - half, width: size, height: size, class: cls }, parent);
    } else if (shape === "diamond") {
      var d = "M " + cx + " " + (cy - half) + " L " + (cx + half) + " " + cy +
        " L " + cx + " " + (cy + half) + " L " + (cx - half) + " " + cy + " Z";
      el("path", { d: d, class: cls }, parent);
    } else if (shape === "triangle") {
      var d2 = "M " + cx + " " + (cy - half) + " L " + (cx + half) + " " + (cy + half) +
        " L " + (cx - half) + " " + (cy + half) + " Z";
      el("path", { d: d2, class: cls }, parent);
    } else if (shape === "cross") {
      el("line", { x1: cx - half, y1: cy - half, x2: cx + half, y2: cy + half, class: cls }, parent);
      el("line", { x1: cx - half, y1: cy + half, x2: cx + half, y2: cy - half, class: cls }, parent);
    }
  }

  function buildChart(root, data) {
    var state = { dataset: data.datasets[0].key, hidden: {} };

    var wrap = document.createElement("div");
    wrap.className = "corbin-explorer";

    // Dataset tabs
    var tabs = document.createElement("div");
    tabs.className = "corbin-tabs";
    data.datasets.forEach(function (ds) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "corbin-tab" + (ds.key === state.dataset ? " active" : "");
      btn.textContent = ds.label;
      btn.addEventListener("click", function () {
        state.dataset = ds.key;
        Array.prototype.forEach.call(tabs.children, function (c) { c.classList.remove("active"); });
        btn.classList.add("active");
        render();
      });
      tabs.appendChild(btn);
    });
    wrap.appendChild(tabs);

    // Chart + tooltip
    var chartHolder = document.createElement("div");
    chartHolder.className = "corbin-chart-holder";
    var svg = el("svg", { viewBox: "0 0 " + WIDTH + " " + HEIGHT, class: "corbin-chart" });
    chartHolder.appendChild(svg);
    var tooltip = document.createElement("div");
    tooltip.className = "corbin-tooltip";
    tooltip.setAttribute("aria-hidden", "true");
    chartHolder.appendChild(tooltip);
    wrap.appendChild(chartHolder);

    // Legend
    var legend = document.createElement("ul");
    legend.className = "corbin-legend";
    wrap.appendChild(legend);

    var note = document.createElement("p");
    note.className = "corbin-note";
    note.textContent = data.note;
    wrap.appendChild(note);

    root.appendChild(wrap);

    function showTooltip(evt, html) {
      tooltip.innerHTML = html;
      tooltip.classList.add("visible");
      var holderRect = chartHolder.getBoundingClientRect();
      var x = evt.clientX - holderRect.left;
      var y = evt.clientY - holderRect.top;
      tooltip.style.left = Math.min(x + 14, holderRect.width - 210) + "px";
      tooltip.style.top = Math.max(y - 10, 0) + "px";
    }
    function hideTooltip() {
      tooltip.classList.remove("visible");
    }

    function render() {
      svg.innerHTML = "";
      legend.innerHTML = "";

      var seriesForDataset = data.series[state.dataset] || {};
      var keys = Object.keys(seriesForDataset);

      // y-domain: pad below the lowest point actually shown
      var allAccs = [];
      keys.forEach(function (k) {
        seriesForDataset[k].forEach(function (p) { allAccs.push(p.acc); });
      });
      var yMin = Math.max(0, Math.floor((Math.min.apply(null, allAccs) - 8) / 10) * 10);

      // Axes
      var axisGroup = el("g", { class: "corbin-axis" }, svg);
      [0, 25, 50, 75, 100].forEach(function (gy) {
        if (gy < yMin) return;
        var y = yScale(gy, yMin);
        el("line", { x1: MARGIN.left, x2: WIDTH - MARGIN.right, y1: y, y2: y, class: "corbin-gridline" }, axisGroup);
        el("text", { x: MARGIN.left - 8, y: y + 4, class: "corbin-axis-label", "text-anchor": "end" }, axisGroup).textContent = gy;
      });
      [0.1, 0.3, 1, 3, 7].forEach(function (ge) {
        if (ge < EPS_MIN || ge > EPS_MAX) return;
        var x = xScale(ge);
        el("text", { x: x, y: HEIGHT - MARGIN.bottom + 20, class: "corbin-axis-label", "text-anchor": "middle" }, axisGroup).textContent = "ε=" + ge;
      });
      el("text", {
        x: (MARGIN.left + WIDTH - MARGIN.right) / 2, y: HEIGHT - 4,
        class: "corbin-axis-title", "text-anchor": "middle"
      }, axisGroup).textContent = "privacy budget ε (log scale) →";
      el("text", {
        x: 14, y: (MARGIN.top + HEIGHT - MARGIN.bottom) / 2,
        class: "corbin-axis-title", "text-anchor": "middle",
        transform: "rotate(-90, 14, " + ((MARGIN.top + HEIGHT - MARGIN.bottom) / 2) + ")"
      }, axisGroup).textContent = "test accuracy (%) ↑";

      var shapeIndex = 0;

      keys.forEach(function (key) {
        var meta = data.methods[key];
        var points = seriesForDataset[key];
        var isHero = key === "corbinfl";
        var isFlat = meta.nonPrivate;
        var shape = (isHero || isFlat) ? "circle" : MARKER_SHAPES[shapeIndex++ % MARKER_SHAPES.length];
        var colorClass = isHero ? "corbin-series-hero" : (isFlat ? "corbin-series-flat" : "corbin-series-baseline");

        var g = el("g", { class: "corbin-series " + colorClass + (state.hidden[key] ? " corbin-hidden" : "") }, svg);

        if (isFlat) {
          var y = yScale(points[0].acc, yMin);
          el("line", {
            x1: MARGIN.left, x2: WIDTH - MARGIN.right, y1: y, y2: y,
            class: "corbin-line corbin-line-flat"
          }, g);
          var hit = el("rect", {
            x: MARGIN.left, y: y - 6, width: WIDTH - MARGIN.left - MARGIN.right, height: 12,
            fill: "transparent", style: "cursor:pointer"
          }, g);
          hit.addEventListener("mousemove", function (evt) {
            showTooltip(evt, tooltipHtml(meta, points[0]));
          });
          hit.addEventListener("mouseleave", hideTooltip);
        } else {
          var pathD = points.map(function (p, i) {
            return (i === 0 ? "M " : "L ") + xScale(p.epsilon) + " " + yScale(p.acc, yMin);
          }).join(" ");
          el("path", { d: pathD, class: "corbin-line" + (isHero ? " corbin-line-hero" : "") }, g);

          points.forEach(function (p) {
            var cx = xScale(p.epsilon), cy = yScale(p.acc, yMin);
            var marker = el("g", { class: "corbin-marker" }, g);
            drawMarker(shape, cx, cy, isHero ? 9 : 7, "corbin-marker-shape", marker);
            var hitR = el("circle", { cx: cx, cy: cy, r: 11, fill: "transparent", style: "cursor:pointer" }, marker);
            hitR.addEventListener("mousemove", function (evt) {
              showTooltip(evt, tooltipHtml(meta, p));
            });
            hitR.addEventListener("mouseleave", hideTooltip);
          });
        }
      });

      // Legend (with visibility toggles)
      shapeIndex = 0;
      keys.forEach(function (key) {
        var meta = data.methods[key];
        var isHero = key === "corbinfl";
        var isFlat = meta.nonPrivate;
        var shape = (isHero || isFlat) ? "circle" : MARKER_SHAPES[shapeIndex++ % MARKER_SHAPES.length];
        var li = document.createElement("li");
        li.className = "corbin-legend-item" + (isHero ? " hero" : "") + (state.hidden[key] ? " hidden" : "");

        var swatch = document.createElementNS(SVG_NS, "svg");
        swatch.setAttribute("viewBox", "0 0 16 16");
        swatch.setAttribute("class", "corbin-legend-swatch " + (isHero ? "corbin-series-hero" : (isFlat ? "corbin-series-flat" : "corbin-series-baseline")));
        if (isFlat) {
          el("line", { x1: 1, x2: 15, y1: 8, y2: 8, class: "corbin-line corbin-line-flat" }, swatch);
        } else {
          drawMarker(shape, 8, 8, isHero ? 9 : 7, "corbin-marker-shape", swatch);
        }

        var label = document.createElement("span");
        label.textContent = meta.label + " · " + meta.bits + "-bit · " + meta.privacy;

        li.appendChild(swatch);
        li.appendChild(label);
        li.addEventListener("click", function () {
          state.hidden[key] = !state.hidden[key];
          render();
        });
        legend.appendChild(li);
      });
    }

    function tooltipHtml(meta, p) {
      var epsLabel = (p.epsilon === null) ? "non-private reference" : "ε = " + p.epsilon;
      var html = "<strong>" + meta.label + "</strong><br>" +
        epsLabel + "<br>" +
        p.acc.toFixed(2) + "% ± " + p.std.toFixed(2) + "<br>" +
        meta.bits + " bit/coord · " + meta.privacy;
      if (p.note) html += "<br><em>" + p.note + "</em>";
      html += "<br><span class=\"corbin-tooltip-source\">source: " + p.source + "</span>";
      return html;
    }

    render();
  }

  document.addEventListener("DOMContentLoaded", function () {
    var root = document.getElementById("corbin-explorer-root");
    if (!root) return;
    fetch(root.getAttribute("data-src"))
      .then(function (r) { return r.json(); })
      .then(function (data) { buildChart(root, data); })
      .catch(function () {
        root.innerHTML = '<p class="corbin-error">Could not load the sweep data (assets/data/corbin_sweep.json).</p>';
      });
  });
})();
