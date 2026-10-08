// Treasure effects: synthesized sound (no audio files) and a sparkle-and-coin burst for the chest reveal.
(function () {
  "use strict";
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------------- Sound ----------------
  var ctx = null, master = null, soundOn = true;
  try { soundOn = localStorage.getItem("tg-sound") !== "off"; } catch (e) {}
  function ac() {
    if (!soundOn) return null;
    if (!ctx) {
      var C = window.AudioContext || window.webkitAudioContext;
      if (!C) return null;
      ctx = new C(); master = ctx.createGain(); master.gain.value = 0.5; master.connect(ctx.destination);
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }
  function tone(freq, start, dur, type, vol, endFreq) {
    var c = ac(); if (!c) return;
    var t = c.currentTime + (start || 0);
    var o = c.createOscillator(), g = c.createGain();
    o.type = type || "sine"; o.frequency.setValueAtTime(freq, t);
    if (endFreq) o.frequency.exponentialRampToValueAtTime(endFreq, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol || 0.3, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(master); o.start(t); o.stop(t + dur + 0.02);
  }
  function noise(start, dur, vol, fromHz, toHz) {
    var c = ac(); if (!c) return;
    var t = c.currentTime + (start || 0);
    var len = Math.floor(c.sampleRate * dur), buf = c.createBuffer(1, len, c.sampleRate), d = buf.getChannelData(0);
    for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    var src = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    src.buffer = buf; f.type = "bandpass"; f.Q.value = 6;
    f.frequency.setValueAtTime(fromHz, t); f.frequency.exponentialRampToValueAtTime(toHz, t + dur);
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(f); f.connect(g); g.connect(master); src.start(t); src.stop(t + dur);
  }
  var lastCreak = 0;
  var SFX = {
    coin: function (d) { d = d || 0; tone(2637, d, 0.18, "triangle", 0.12); tone(3520, d + 0.04, 0.3, "sine", 0.09); },
    // the lock clicking and the lid creaking open
    unlock: function () { noise(0, 0.05, 0.3, 2500, 1800); tone(1400, 0.02, 0.05, "square", 0.04); },
    creak: function () {
      var now = Date.now(); if (now - lastCreak < 350) return; lastCreak = now;
      noise(0, 0.32, 0.1, 300, 900); tone(140, 0, 0.3, "sawtooth", 0.025, 210);
      for (var i = 0; i < 2; i++) SFX.coin(0.2 + i * 0.08 + Math.random() * 0.03);
    },
    // a soft music-box shimmer when the gifts appear
    chime: function () {
      [1047, 1319, 1568, 2093].forEach(function (f, i) { tone(f, i * 0.11, 1.1, "sine", 0.09); tone(f * 2, i * 0.11 + 0.01, 0.6, "triangle", 0.025); });
    },
  };

  // ---------------- Coin burst particles ----------------
  var cv = document.getElementById("fx"), g2 = cv ? cv.getContext("2d") : null, parts = [], raf = 0, dpr = 1;
  function size() { if (!cv) return; dpr = Math.min(window.devicePixelRatio || 1, 2); cv.width = innerWidth * dpr; cv.height = innerHeight * dpr; }
  addEventListener("resize", size); size();
  // Gold dust and starbursts: reads as light on real gold rather than cartoon coins.
  function burst(x, y, n) {
    if (!g2 || reduced) return;
    n = n || 60;
    for (var i = 0; i < n; i++) {
      var a = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.5, sp = 2 + Math.random() * 7;
      parts.push({ x: x + (Math.random() - 0.5) * 60, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 2,
        r: 1 + Math.random() * 2.4, life: 1, dust: true, tw: Math.random() * 6 });
    }
    for (var s = 0; s < Math.round(n / 3); s++) {
      var b = Math.random() * Math.PI * 2, v = 1.5 + Math.random() * 5;
      parts.push({ x: x, y: y, vx: Math.cos(b) * v, vy: Math.sin(b) * v - 1.5, r: 3 + Math.random() * 6, spark: true, life: 1 });
    }
    if (!raf) raf = requestAnimationFrame(step);
  }
  function star(c, x, y, r) {
    c.beginPath();
    for (var i = 0; i < 8; i++) { var rr = i % 2 ? r * 0.25 : r, a = i * Math.PI / 4; c.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); }
    c.closePath(); c.fill();
  }
  function step() {
    var c = g2; c.setTransform(dpr, 0, 0, dpr, 0, 0); c.clearRect(0, 0, innerWidth, innerHeight);
    parts = parts.filter(function (p) { return p.life > 0; });
    c.globalCompositeOperation = "lighter";
    parts.forEach(function (p) {
      p.x += p.vx; p.y += p.vy; p.vx *= 0.97; p.vy = p.vy * 0.97 + (p.spark ? 0.02 : 0.06);
      p.life -= p.spark ? 0.02 : 0.009;
      var al = Math.max(0, Math.min(1, p.life * 1.4));
      if (p.spark) { c.globalAlpha = al; c.fillStyle = "#FFF4CF"; star(c, p.x, p.y, p.r * 1.8); return; }
      p.tw += 0.3;
      c.globalAlpha = al * (0.6 + 0.4 * Math.sin(p.tw));
      var gr = c.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
      gr.addColorStop(0, "rgba(255,244,200,1)"); gr.addColorStop(0.35, "rgba(255,200,90,.8)"); gr.addColorStop(1, "rgba(255,170,40,0)");
      c.fillStyle = gr; c.beginPath(); c.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2); c.fill();
    });
    c.globalAlpha = 1; c.globalCompositeOperation = "source-over";
    raf = parts.length ? requestAnimationFrame(step) : 0;
    if (!raf) c.clearRect(0, 0, innerWidth, innerHeight);
  }

  window.FX = {
    sfx: SFX, burst: burst,
    get soundOn() { return soundOn; },
    setSound: function (on) {
      soundOn = on;
      try { localStorage.setItem("tg-sound", on ? "on" : "off"); } catch (e) {}
      if (on) SFX.coin();
    },
  };
})();
