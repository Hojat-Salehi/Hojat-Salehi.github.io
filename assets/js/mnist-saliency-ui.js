/*!
 * UI wiring for the MNIST saliency demo. Depends on mnist-saliency.js
 * (window.MnistSaliency) having loaded first.
 */
(function () {
  "use strict";

  var DRAW_SIZE = 280; // draw canvas, 10x scale of 28x28
  var HEATMAP_DISPLAY_SIZE = 168; // 6x scale of 28x28

  // Heatmap colormap: transparent -> signal blue -> trace orange, matching
  // the site's own "measured vs identified" accent pair instead of a
  // generic rainbow jet colormap.
  var SIGNAL_RGB = [24, 87, 164];
  var TRACE_RGB = [196, 98, 45];

  function lerp(a, b, t) { return a + (b - a) * t; }
  function heatColor(t) {
    // t in [0,1]. Low t -> mostly signal, high t -> mostly trace.
    var r = lerp(SIGNAL_RGB[0], TRACE_RGB[0], t);
    var g = lerp(SIGNAL_RGB[1], TRACE_RGB[1], t);
    var b = lerp(SIGNAL_RGB[2], TRACE_RGB[2], t);
    return [r, g, b];
  }

  function el(tag, attrs, children) {
    var e = document.createElement(tag);
    for (var k in attrs) {
      if (!Object.prototype.hasOwnProperty.call(attrs, k)) continue;
      if (k === "class") e.className = attrs[k];
      else e.setAttribute(k, attrs[k]);
    }
    (children || []).forEach(function (c) { e.appendChild(c); });
    return e;
  }

  function buildPanel(title) {
    var wrap = el("div", { class: "saliency-panel" });
    var heading = el("p", { class: "saliency-panel-title" });
    heading.textContent = title;
    var canvasWrap = el("div", { class: "saliency-canvas-wrap" });
    var digitCanvas = el("canvas", { width: HEATMAP_DISPLAY_SIZE, height: HEATMAP_DISPLAY_SIZE, class: "saliency-digit-canvas" });
    var heatCanvas = el("canvas", { width: HEATMAP_DISPLAY_SIZE, height: HEATMAP_DISPLAY_SIZE, class: "saliency-heat-canvas" });
    canvasWrap.appendChild(digitCanvas);
    canvasWrap.appendChild(heatCanvas);
    var pred = el("p", { class: "saliency-prediction" });
    pred.textContent = "Draw a digit above";
    var bars = el("div", { class: "saliency-bars" });
    wrap.appendChild(heading);
    wrap.appendChild(canvasWrap);
    wrap.appendChild(pred);
    wrap.appendChild(bars);
    return { wrap: wrap, digitCanvas: digitCanvas, heatCanvas: heatCanvas, pred: pred, bars: bars };
  }

  function renderProbBars(barsEl, probs) {
    barsEl.innerHTML = "";
    var maxIdx = 0;
    for (var i = 1; i < probs.length; i++) if (probs[i] > probs[maxIdx]) maxIdx = i;
    for (var d = 0; d < probs.length; d++) {
      var row = el("div", { class: "saliency-bar-row" + (d === maxIdx ? " top" : "") });
      var label = el("span", { class: "saliency-bar-label" });
      label.textContent = d;
      var track = el("div", { class: "saliency-bar-track" });
      var fill = el("div", { class: "saliency-bar-fill" });
      fill.style.width = (probs[d] * 100).toFixed(1) + "%";
      track.appendChild(fill);
      var pct = el("span", { class: "saliency-bar-pct" });
      pct.textContent = (probs[d] * 100).toFixed(1) + "%";
      row.appendChild(label);
      row.appendChild(track);
      row.appendChild(pct);
      barsEl.appendChild(row);
    }
  }

  function drawDigitCanvas(ctx, image28) {
    // image28: Float32Array(784) in [0,1] (denormalized display space)
    var img = ctx.createImageData(28, 28);
    for (var i = 0; i < 784; i++) {
      var v = Math.max(0, Math.min(1, image28[i])) * 255;
      img.data[i * 4] = v; img.data[i * 4 + 1] = v; img.data[i * 4 + 2] = v; img.data[i * 4 + 3] = 255;
    }
    var off = document.createElement("canvas");
    off.width = 28; off.height = 28;
    off.getContext("2d").putImageData(img, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.clearRect(0, 0, HEATMAP_DISPLAY_SIZE, HEATMAP_DISPLAY_SIZE);
    ctx.drawImage(off, 0, 0, HEATMAP_DISPLAY_SIZE, HEATMAP_DISPLAY_SIZE);
  }

  function drawHeatmap(ctx, cam14) {
    var img = ctx.createImageData(14, 14);
    for (var i = 0; i < 196; i++) {
      var t = cam14[i];
      var rgb = heatColor(t);
      img.data[i * 4] = rgb[0]; img.data[i * 4 + 1] = rgb[1]; img.data[i * 4 + 2] = rgb[2];
      img.data[i * 4 + 3] = t * 190; // alpha follows importance; low-importance areas stay transparent
    }
    var off = document.createElement("canvas");
    off.width = 14; off.height = 14;
    off.getContext("2d").putImageData(img, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.clearRect(0, 0, HEATMAP_DISPLAY_SIZE, HEATMAP_DISPLAY_SIZE);
    ctx.drawImage(off, 0, 0, HEATMAP_DISPLAY_SIZE, HEATMAP_DISPLAY_SIZE);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var root = document.getElementById("mnist-saliency-root");
    if (!root) return;

    // ---- build DOM ----
    var app = el("div", { class: "saliency-app" });

    var drawSection = el("div", { class: "saliency-draw-section" });
    var drawWrap = el("div", { class: "saliency-draw-wrap" });
    var drawCanvas = el("canvas", { width: DRAW_SIZE, height: DRAW_SIZE, class: "saliency-draw-canvas", "aria-label": "Draw a digit 0-9 here with your mouse or finger" });
    drawWrap.appendChild(drawCanvas);
    drawSection.appendChild(drawWrap);

    var controls = el("div", { class: "saliency-controls" });
    var clearBtn = el("button", { type: "button", class: "corbin-tab" });
    clearBtn.textContent = "Clear";
    var frameLabel = el("label", { class: "saliency-frame-toggle" });
    var frameCheckbox = el("input", { type: "checkbox" });
    frameLabel.appendChild(frameCheckbox);
    var frameText = document.createElement("span");
    frameText.textContent = " add a frame (reproduces the README's distribution-shift test)";
    frameLabel.appendChild(frameText);
    controls.appendChild(clearBtn);
    controls.appendChild(frameLabel);
    drawSection.appendChild(controls);

    app.appendChild(drawSection);

    var panelsWrap = el("div", { class: "saliency-panels" });
    var panelOrig = buildPanel("Original model (mnist_cnn.pth)");
    var panelMixed = buildPanel("Mixed / framed-9 model (mixed_mnist_cnn.pth)");
    panelsWrap.appendChild(panelOrig.wrap);
    panelsWrap.appendChild(panelMixed.wrap);
    app.appendChild(panelsWrap);

    var status = el("p", { class: "saliency-status" });
    status.textContent = "Loading model weights…";
    app.appendChild(status);

    root.appendChild(app);

    // ---- drawing ----
    var dctx = drawCanvas.getContext("2d");
    dctx.fillStyle = "#000";
    dctx.fillRect(0, 0, DRAW_SIZE, DRAW_SIZE);
    dctx.strokeStyle = "#fff";
    dctx.lineWidth = 22;
    dctx.lineCap = "round";
    dctx.lineJoin = "round";

    var drawing = false, lastX = 0, lastY = 0, hasInk = false;

    function pos(evt) {
      var rect = drawCanvas.getBoundingClientRect();
      var scaleX = DRAW_SIZE / rect.width, scaleY = DRAW_SIZE / rect.height;
      var cx = (evt.touches ? evt.touches[0].clientX : evt.clientX) - rect.left;
      var cy = (evt.touches ? evt.touches[0].clientY : evt.clientY) - rect.top;
      return [cx * scaleX, cy * scaleY];
    }
    function start(evt) {
      evt.preventDefault();
      drawing = true; hasInk = true;
      var p = pos(evt); lastX = p[0]; lastY = p[1];
      dctx.beginPath(); dctx.arc(lastX, lastY, dctx.lineWidth / 2, 0, Math.PI * 2); dctx.fillStyle = "#fff"; dctx.fill();
    }
    function move(evt) {
      if (!drawing) return;
      evt.preventDefault();
      var p = pos(evt);
      dctx.beginPath(); dctx.moveTo(lastX, lastY); dctx.lineTo(p[0], p[1]); dctx.stroke();
      lastX = p[0]; lastY = p[1];
      scheduleUpdate();
    }
    function end() { if (drawing) { drawing = false; scheduleUpdate(); } }

    drawCanvas.addEventListener("mousedown", start);
    drawCanvas.addEventListener("mousemove", move);
    window.addEventListener("mouseup", end);
    drawCanvas.addEventListener("touchstart", start, { passive: false });
    drawCanvas.addEventListener("touchmove", move, { passive: false });
    drawCanvas.addEventListener("touchend", end);

    clearBtn.addEventListener("click", function () {
      dctx.fillStyle = "#000"; dctx.fillRect(0, 0, DRAW_SIZE, DRAW_SIZE);
      hasInk = false;
      scheduleUpdate();
    });
    frameCheckbox.addEventListener("change", scheduleUpdate);

    var rafPending = false;
    function scheduleUpdate() {
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(function () { rafPending = false; update(); });
    }

    // ---- inference ----
    var modelOrig = null, modelMixed = null;

    function getImage28() {
      var off = document.createElement("canvas");
      off.width = 28; off.height = 28;
      var octx = off.getContext("2d");
      octx.imageSmoothingEnabled = true;
      octx.drawImage(drawCanvas, 0, 0, DRAW_SIZE, DRAW_SIZE, 0, 0, 28, 28);
      var data = octx.getImageData(0, 0, 28, 28).data;
      var image28 = new Float32Array(784);
      for (var i = 0; i < 784; i++) image28[i] = data[i * 4] / 255; // grayscale: R channel
      return image28;
    }

    function addFrame(image28) {
      var out = image28.slice();
      for (var i = 0; i < 28; i++) {
        out[0 * 28 + i] = 1; out[27 * 28 + i] = 1;
        out[i * 28 + 0] = 1; out[i * 28 + 27] = 1;
      }
      return out;
    }

    function normalize(image28) {
      var out = new Float32Array(784);
      for (var i = 0; i < 784; i++) out[i] = (image28[i] - MnistSaliency.MNIST_MEAN) / MnistSaliency.MNIST_STD;
      return out;
    }

    function runPanel(model, panel, image28display, image28norm) {
      var fwd = model.forward(image28norm);
      var probs = fwd.probs;
      var predClass = 0;
      for (var i = 1; i < probs.length; i++) if (probs[i] > probs[predClass]) predClass = i;
      var cam = model.gradCAM(fwd, predClass);

      drawDigitCanvas(panel.digitCanvas.getContext("2d"), image28display);
      drawHeatmap(panel.heatCanvas.getContext("2d"), cam);
      panel.pred.innerHTML = "Prediction: <strong>" + predClass + "</strong> (" + (probs[predClass] * 100).toFixed(1) + "%)";
      renderProbBars(panel.bars, probs);
    }

    function update() {
      if (!modelOrig || !modelMixed) return;
      if (!hasInk) {
        panelOrig.pred.textContent = "Draw a digit above";
        panelMixed.pred.textContent = "Draw a digit above";
        return;
      }
      var image28 = getImage28();
      if (frameCheckbox.checked) image28 = addFrame(image28);
      var norm = normalize(image28);
      runPanel(modelOrig, panelOrig, image28, norm);
      runPanel(modelMixed, panelMixed, image28, norm);
    }

    // ---- load weights ----
    var manifestUrl = root.getAttribute("data-manifest");
    var origUrl = root.getAttribute("data-orig");
    var mixedUrl = root.getAttribute("data-mixed");

    fetch(manifestUrl).then(function (r) { return r.json(); }).then(function (manifest) {
      return Promise.all([
        fetch(origUrl).then(function (r) { return r.arrayBuffer(); }),
        fetch(mixedUrl).then(function (r) { return r.arrayBuffer(); }),
      ]).then(function (buffers) {
        modelOrig = new MnistSaliency.Model(MnistSaliency.loadWeights(manifest, buffers[0]));
        modelMixed = new MnistSaliency.Model(MnistSaliency.loadWeights(manifest, buffers[1]));
        status.textContent = "";
        status.style.display = "none";
      });
    }).catch(function (err) {
      status.textContent = "Could not load model weights.";
      console.error(err);
    });
  });
})();
