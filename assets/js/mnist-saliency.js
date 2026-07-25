/*!
 * In-browser MNIST saliency demo (AGENT_BRIEF.md Demo 2).
 * SimpleCNN (Utils.py, AI_Explainability repo): conv(1->16,3x3,pad1) -> relu ->
 * pool2 -> conv(16->32,3x3,pad1) -> relu -> pool2 -> fc(1568->10).
 *
 * No ONNX Runtime Web: its smallest WASM backend is ~13.5MB for a model with
 * ~20,000 parameters, well over this page's weight budget, and Grad-CAM needs
 * a backward pass ONNX Runtime Web doesn't do anyway. Forward pass and
 * Grad-CAM are both implemented here from the raw extracted weights and
 * verified bit-exact against PyTorch's own forward() and autograd (see
 * NOTES.md) before being ported. Two model checkpoints load: the plain
 * baseline and the one trained on framed-9 / mixed data (README's
 * distribution-shift story) -- drawing with the "add frame" toggle on
 * reproduces that same failure mode live.
 */
(function () {
  "use strict";

  var MNIST_MEAN = 0.1307;
  var MNIST_STD = 0.3081;

  // ---------- tensor ops (mirror Utils.SimpleCNN.forward exactly) ----------

  function conv2d(x, Cin, H, W, w, b, Cout, kh, kw, pad) {
    var Ho = H + 2 * pad - kh + 1;
    var Wo = W + 2 * pad - kw + 1;
    var out = new Float32Array(Cout * Ho * Wo);
    for (var co = 0; co < Cout; co++) {
      var bias = b[co];
      for (var oy = 0; oy < Ho; oy++) {
        for (var ox = 0; ox < Wo; ox++) {
          var acc = bias;
          for (var ci = 0; ci < Cin; ci++) {
            for (var ky = 0; ky < kh; ky++) {
              var iy = oy + ky - pad;
              if (iy < 0 || iy >= H) continue;
              for (var kx = 0; kx < kw; kx++) {
                var ix = ox + kx - pad;
                if (ix < 0 || ix >= W) continue;
                var wv = w[((co * Cin + ci) * kh + ky) * kw + kx];
                var xv = x[(ci * H + iy) * W + ix];
                acc += wv * xv;
              }
            }
          }
          out[(co * Ho + oy) * Wo + ox] = acc;
        }
      }
    }
    return { data: out, C: Cout, H: Ho, W: Wo };
  }

  function reluInplace(x) {
    for (var i = 0; i < x.length; i++) if (x[i] < 0) x[i] = 0;
    return x;
  }

  // Returns pooled output plus, per output cell, which of the 4 inputs (0..3,
  // row-major within the 2x2 window) was the max -- needed to route the
  // Grad-CAM gradient back through the pool exactly like torch's backward.
  function maxpool2WithArgmax(x, C, H, W) {
    var Ho = H >> 1, Wo = W >> 1;
    var out = new Float32Array(C * Ho * Wo);
    var argmax = new Uint8Array(C * Ho * Wo);
    for (var c = 0; c < C; c++) {
      for (var oy = 0; oy < Ho; oy++) {
        for (var ox = 0; ox < Wo; ox++) {
          var base = c * H * W;
          var y0 = oy * 2, x0 = ox * 2;
          var v00 = x[base + y0 * W + x0];
          var v01 = x[base + y0 * W + x0 + 1];
          var v10 = x[base + (y0 + 1) * W + x0];
          var v11 = x[base + (y0 + 1) * W + x0 + 1];
          var best = v00, idx = 0;
          if (v01 > best) { best = v01; idx = 1; }
          if (v10 > best) { best = v10; idx = 2; }
          if (v11 > best) { best = v11; idx = 3; }
          var oidx = (c * Ho + oy) * Wo + ox;
          out[oidx] = best;
          argmax[oidx] = idx;
        }
      }
    }
    return { data: out, argmax: argmax, C: C, H: Ho, W: Wo };
  }

  function fc(x, w, b, outDim, inDim) {
    var out = new Float32Array(outDim);
    for (var o = 0; o < outDim; o++) {
      var acc = b[o];
      var rowBase = o * inDim;
      for (var i = 0; i < inDim; i++) acc += w[rowBase + i] * x[i];
      out[o] = acc;
    }
    return out;
  }

  function softmax(logits) {
    var max = Math.max.apply(null, logits);
    var exps = Array.prototype.map.call(logits, function (v) { return Math.exp(v - max); });
    var sum = exps.reduce(function (a, b) { return a + b; }, 0);
    return exps.map(function (v) { return v / sum; });
  }

  // ---------- model ----------

  function Model(weights) {
    this.w = weights; // {conv1_w, conv1_b, conv2_w, conv2_b, fc_w, fc_b}
  }

  // image28: Float32Array(28*28), already MNIST-normalized.
  // Returns logits, probs, and everything Grad-CAM needs.
  Model.prototype.forward = function (image28) {
    var w = this.w;
    var c1 = conv2d(image28, 1, 28, 28, w.conv1_w, w.conv1_b, 16, 3, 3, 1);
    reluInplace(c1.data);
    var p1 = maxpool2WithArgmax(c1.data, 16, 28, 28);

    var c2 = conv2d(p1.data, 16, 14, 14, w.conv2_w, w.conv2_b, 32, 3, 3, 1); // A^k for Grad-CAM
    var a2 = c2.data.slice();
    reluInplace(a2);
    var p2 = maxpool2WithArgmax(a2, 32, 14, 14);

    var logits = fc(p2.data, w.fc_w, w.fc_b, 10, 1568);
    var probs = softmax(logits);

    return { logits: logits, probs: probs, conv2raw: c2, conv2relu: a2, pool2: p2 };
  };

  // Grad-CAM for `targetClass`, targeting conv2 (matches the repo's own
  // pytorch_grad_cam target_layers=[model.conv2]).
  Model.prototype.gradCAM = function (fwd, targetClass) {
    var w = this.w;
    var conv2raw = fwd.conv2raw; // {data, C:32, H:14, W:14}
    var pool2 = fwd.pool2; // {argmax, C:32, H:7, W:7}

    // d(logit_c)/d(pool2 flat) = fc.weight[c, :]
    var dFlatBase = targetClass * 1568;

    // route through maxpool2 (unpool to the recorded argmax position)
    var dA2 = new Float32Array(32 * 14 * 14);
    for (var c = 0; c < 32; c++) {
      for (var oy = 0; oy < 7; oy++) {
        for (var ox = 0; ox < 7; ox++) {
          var pIdx = (c * 7 + oy) * 7 + ox;
          var g = w.fc_w[dFlatBase + pIdx];
          var idx = pool2.argmax[pIdx];
          var y0 = oy * 2 + (idx >> 1);
          var x0 = ox * 2 + (idx & 1);
          dA2[(c * 14 + y0) * 14 + x0] = g;
        }
      }
    }

    // route through relu2 (zero where the raw conv2 output was <= 0)
    var dZ2 = new Float32Array(32 * 14 * 14);
    for (var i = 0; i < dZ2.length; i++) dZ2[i] = conv2raw.data[i] > 0 ? dA2[i] : 0;

    // Grad-CAM channel weights: global-average-pool the gradient per channel
    var alpha = new Float32Array(32);
    for (var ch = 0; ch < 32; ch++) {
      var sum = 0;
      for (var j = 0; j < 196; j++) sum += dZ2[ch * 196 + j];
      alpha[ch] = sum / 196;
    }

    // weighted sum of the *activation* (raw conv2 output), then ReLU
    var cam = new Float32Array(196);
    for (var ch2 = 0; ch2 < 32; ch2++) {
      var a = alpha[ch2];
      for (var j2 = 0; j2 < 196; j2++) cam[j2] += a * conv2raw.data[ch2 * 196 + j2];
    }
    var maxV = 0;
    for (var k = 0; k < 196; k++) { if (cam[k] < 0) cam[k] = 0; if (cam[k] > maxV) maxV = cam[k]; }
    if (maxV > 0) for (var k2 = 0; k2 < 196; k2++) cam[k2] /= maxV;

    return cam; // 14x14, normalized 0..1
  };

  // ---------- weight loading ----------

  function loadWeights(manifest, buffer) {
    function slice(name) {
      var t = manifest.tensors[name];
      return new Float32Array(buffer, t.offset, t.length);
    }
    return {
      conv1_w: slice("conv1.weight"), conv1_b: slice("conv1.bias"),
      conv2_w: slice("conv2.weight"), conv2_b: slice("conv2.bias"),
      fc_w: slice("fc.weight"), fc_b: slice("fc.bias"),
    };
  }

  window.MnistSaliency = { Model: Model, loadWeights: loadWeights, MNIST_MEAN: MNIST_MEAN, MNIST_STD: MNIST_STD };
})();
