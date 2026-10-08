// Treasure.gift effects: synthesized sound (no audio files), coin-burst particles, and the slot reels.
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
    coin: function (d) { d = d || 0; tone(2637, d, 0.18, "triangle", 0.18); tone(3520, d + 0.04, 0.3, "sine", 0.14); },
    tick: function () { tone(900 + Math.random() * 200, 0, 0.03, "square", 0.04); },
    thunk: function () { tone(160, 0, 0.18, "sine", 0.5, 60); noise(0, 0.08, 0.25, 900, 300); tone(1800, 0.01, 0.05, "square", 0.05); },
    lever: function () { noise(0, 0.22, 0.25, 400, 1600); tone(220, 0.18, 0.15, "sawtooth", 0.08, 110); },
    creak: function () {
      var now = Date.now(); if (now - lastCreak < 350) return; lastCreak = now;
      noise(0, 0.32, 0.12, 300, 900); tone(140, 0, 0.3, "sawtooth", 0.03, 210);
      for (var i = 0; i < 3; i++) SFX.coin(0.18 + i * 0.07 + Math.random() * 0.03);
    },
    jackpot: function () {
      [523, 659, 784, 1047, 1319].forEach(function (f, i) { tone(f, i * 0.09, 0.4, "square", 0.08); });
      tone(1047, 0.5, 0.9, "triangle", 0.15); tone(1319, 0.5, 0.9, "triangle", 0.12); tone(1568, 0.5, 0.9, "triangle", 0.1);
      for (var i = 0; i < 16; i++) SFX.coin(0.4 + i * 0.06 + Math.random() * 0.05);
    },
  };

  // ---------------- Coin burst particles ----------------
  var cv = document.getElementById("fx"), g2 = cv ? cv.getContext("2d") : null, parts = [], raf = 0, dpr = 1;
  function size() { if (!cv) return; dpr = Math.min(window.devicePixelRatio || 1, 2); cv.width = innerWidth * dpr; cv.height = innerHeight * dpr; }
  addEventListener("resize", size); size();
  function burst(x, y, n) {
    if (!g2 || reduced) return;
    n = n || 60;
    for (var i = 0; i < n; i++) {
      var a = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.3, sp = 6 + Math.random() * 11;
      var gem = Math.random() < 0.18;
      parts.push({
        x: x, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, r: gem ? 6 + Math.random() * 4 : 7 + Math.random() * 7,
        spin: Math.random() * 6, vs: 0.15 + Math.random() * 0.3, life: 1, gem: gem,
        hue: [350, 140, 215, 190][Math.floor(Math.random() * 4)],
      });
    }
    for (var s = 0; s < 30; s++) {
      var b = Math.random() * Math.PI * 2, v = 2 + Math.random() * 8;
      parts.push({ x: x, y: y, vx: Math.cos(b) * v, vy: Math.sin(b) * v, r: 2 + Math.random() * 4, spark: true, life: 1 });
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
    parts = parts.filter(function (p) { return p.life > 0 && p.y < innerHeight + 40; });
    parts.forEach(function (p) {
      p.x += p.vx; p.y += p.vy; p.vy += p.spark ? 0.08 : 0.38; p.vx *= 0.99;
      p.life -= p.spark ? 0.022 : 0.006;
      c.globalAlpha = Math.max(0, Math.min(1, p.life * 1.5));
      if (p.spark) { c.fillStyle = "#FFF6CC"; star(c, p.x, p.y, p.r * 2); return; }
      p.spin += p.vs;
      var w = Math.abs(Math.cos(p.spin)) * p.r + 1;
      if (p.gem) {
        c.save(); c.translate(p.x, p.y); c.rotate(p.spin);
        c.fillStyle = "hsl(" + p.hue + ",80%,55%)"; c.fillRect(-p.r / 2, -p.r / 2, p.r, p.r);
        c.fillStyle = "rgba(255,255,255,.7)"; c.fillRect(-p.r / 2, -p.r / 2, p.r / 2.5, p.r / 2.5); c.restore();
      } else {
        var gr = c.createLinearGradient(p.x - w, p.y - p.r, p.x + w, p.y + p.r);
        gr.addColorStop(0, "#FFF0B3"); gr.addColorStop(0.5, "#F2C14E"); gr.addColorStop(1, "#A86C14");
        c.fillStyle = gr; c.beginPath(); c.ellipse(p.x, p.y, w, p.r, 0, 0, Math.PI * 2); c.fill();
        c.strokeStyle = "rgba(107,65,8,.8)"; c.lineWidth = 1; c.stroke();
      }
    });
    c.globalAlpha = 1;
    raf = parts.length ? requestAnimationFrame(step) : 0;
    if (!raf) c.clearRect(0, 0, innerWidth, innerHeight);
  }

  // ---------------- Slot reels ----------------
  var SYMBOLS = ["💎", "🪙", "🗝️", "🧭", "⚓", "🦜", "💰", "👑", "🎁", "💍", "🍾", "🏆"];
  var CELL = 128, LOOP = 24;
  var reelEls = Array.prototype.slice.call(document.querySelectorAll(".reel"));
  function cellHTML(sym) {
    return '<div class="cell">' + (sym && sym.img ? '<img src="' + sym.img + '" alt="">' : (sym && sym.e) || sym) + "</div>";
  }
  function randSym() { return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]; }
  function fill(reel, finalSym) {
    var html = "";
    for (var i = 0; i < LOOP; i++) html += cellHTML(randSym());
    html += cellHTML(finalSym || randSym()) + cellHTML(randSym());
    reel.querySelector(".strip").innerHTML = html;
  }
  reelEls.forEach(function (r, i) { fill(r, ["💎", "💰", "👑"][i]); r.querySelector(".strip").style.transform = "translateY(" + (-LOOP * CELL) + "px)"; });

  var spinTimers = [], tickTimer = 0;
  var Reels = {
    start: function () {
      clearInterval(tickTimer);
      if (!reduced) tickTimer = setInterval(SFX.tick, 70);
      reelEls.forEach(function (r, i) {
        var strip = r.querySelector(".strip"), pos = 0;
        r.classList.add("spinning");
        strip.style.transition = "none";
        cancelAnimationFrame(spinTimers[i]);
        (function loop() {
          pos = (pos + (reduced ? 0 : 38 + i * 4)) % (LOOP * CELL);
          strip.style.transform = "translateY(" + (-pos) + "px)";
          spinTimers[i] = requestAnimationFrame(loop);
        })();
      });
    },
    stop: function (finals) {
      return new Promise(function (resolve) {
        reelEls.forEach(function (r, i) {
          setTimeout(function () {
            cancelAnimationFrame(spinTimers[i]);
            var strip = r.querySelector(".strip");
            fill(r, finals[i % finals.length]);
            strip.style.transition = "none";
            strip.style.transform = "translateY(0)";
            void strip.offsetHeight;
            strip.style.transition = reduced ? "none" : "transform .7s cubic-bezier(.2, 1.35, .4, 1)";
            strip.style.transform = "translateY(" + (-LOOP * CELL) + "px)";
            setTimeout(function () { r.classList.remove("spinning"); SFX.thunk(); }, reduced ? 0 : 520);
            if (i === reelEls.length - 1) {
              clearInterval(tickTimer);
              setTimeout(resolve, reduced ? 0 : 800);
            }
          }, (reduced ? 0 : i * 380));
        });
      });
    },
  };

  window.FX = {
    sfx: SFX, burst: burst, reels: Reels,
    get soundOn() { return soundOn; },
    setSound: function (on) {
      soundOn = on;
      try { localStorage.setItem("tg-sound", on ? "on" : "off"); } catch (e) {}
      if (on) SFX.coin();
    },
  };
})();
