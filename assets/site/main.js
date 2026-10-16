/* ============================================================
   zewang.uk — hand-built interaction layer. No dependencies.
   Only motion that serves reading: typing, reveals, nav state.
   ============================================================ */
(() => {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Typewriter — greeting, erase, then research fields ---------- */
  const typedEl = document.getElementById("typed");
  const prefixEl = document.getElementById("prefix");
  const GREET = "Hello, I am Ze Wang";
  const WORK = "I work on ";
  const FIELDS = [
    "Cognitive Economics",
    "AI Safety & Alignment",
    "Experimental Economics",
    "Algorithmic Fairness",
    "the Future of Work",
    "LLM Evaluation",
  ];

  // type `text` into `el` one char at a time, then call done()
  const typeInto = (el, text, speed, done) => {
    let i = 0;
    const step = () => {
      i++;
      el.textContent = text.slice(0, i);
      if (i < text.length) return setTimeout(step, speed + Math.random() * 40);
      done && done();
    };
    step();
  };
  // erase `el` back to empty, then call done()
  const eraseFrom = (el, speed, done) => {
    const step = () => {
      const txt = el.textContent;
      if (!txt.length) return done && done();
      el.textContent = txt.slice(0, -1);
      setTimeout(step, speed);
    };
    step();
  };

  const cycleFields = () => {
    let fi = 0, ci = 0, deleting = false;
    const tick = () => {
      const word = FIELDS[fi];
      if (!deleting) {
        ci++;
        typedEl.textContent = word.slice(0, ci);
        if (ci === word.length) { deleting = true; return setTimeout(tick, 2200); }
        return setTimeout(tick, 54 + Math.random() * 64);
      }
      ci--;
      typedEl.textContent = word.slice(0, ci);
      if (ci === 0) { deleting = false; fi = (fi + 1) % FIELDS.length; return setTimeout(tick, 380); }
      return setTimeout(tick, 24);
    };
    tick();
  };

  if (typedEl && prefixEl) {
    if (prefersReduced) {
      prefixEl.textContent = WORK;
      typedEl.textContent = FIELDS.join(" · ");
    } else {
      // Phase 1: type greeting · Phase 2: erase it · Phase 3: type "I work on " then cycle fields.
      setTimeout(() => {
        typeInto(typedEl, GREET, 52, () => {
          setTimeout(() => {
            eraseFrom(typedEl, 26, () => {
              typeInto(prefixEl, WORK, 48, () => cycleFields());
            });
          }, 1100);
        });
      }, 900);
    }
  }

  /* ---------- 1b. Starfield — a living cosmos with many rare phenomena ---------- */
  const starCanvas = document.getElementById("stars");
  const sctx = starCanvas ? starCanvas.getContext("2d") : null;
  if (sctx) {
    let W = 0, H = 0, DPR = 1, stars = [], events = [], rafId = null, t = 0, nextSpawn = 120;
    const scrollY = () => window.scrollY || 0;
    const rand = (a, b) => a + Math.random() * (b - a);
    const pick = (arr) => arr[(Math.random() * arr.length) | 0];

    // Stellar palette — mostly warm white, with amber / blue / cyan / violet accents.
    const PALETTE = [
      [255, 252, 244], [255, 252, 244], [255, 252, 244],
      [255, 221, 158], [170, 200, 255], [150, 225, 230], [210, 180, 255],
    ];
    const WARM = [[255, 252, 244], [255, 236, 200], [255, 221, 158]];

    const build = () => {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      starCanvas.width = W * DPR;
      starCanvas.height = H * DPR;
      sctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const count = Math.min(260, Math.floor((W * H) / 6500));
      stars = Array.from({ length: count }, () => {
        const depth = Math.random();
        const ang = Math.random() * Math.PI * 2;
        const spd = 0.015 + depth * 0.05;
        return {
          x: Math.random() * W, y: Math.random() * H,
          r: 0.3 + depth * 1.5, base: 0.22 + Math.random() * 0.6,
          tw: Math.random() * Math.PI * 2, tws: 0.5 + Math.random() * 1.7,
          vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd,
          col: pick(PALETTE), depth,
        };
      });
    };

    const dot = (x, y, r, col, a) => {
      sctx.beginPath();
      sctx.arc(x, y, r, 0, Math.PI * 2);
      sctx.fillStyle = `rgba(${col[0]}, ${col[1]}, ${col[2]}, ${Math.max(0, a).toFixed(3)})`;
      sctx.fill();
    };
    const glow = (x, y, r, col, a) => {
      const g = sctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `rgba(${col[0]}, ${col[1]}, ${col[2]}, ${Math.max(0, a).toFixed(3)})`);
      g.addColorStop(1, `rgba(${col[0]}, ${col[1]}, ${col[2]}, 0)`);
      sctx.fillStyle = g;
      sctx.beginPath();
      sctx.arc(x, y, r, 0, Math.PI * 2);
      sctx.fill();
    };

    // ---- phenomenon factories: each returns step(ctx) => alive? ----
    const makers = {
      // 1 · fast meteor with a short tail
      meteor() {
        const L = Math.random() > 0.5;
        let x = L ? -40 : W + 40, y = rand(0, H * 0.55);
        const vx = (L ? 1 : -1) * rand(7, 10), vy = rand(1.4, 2.8);
        let life = 0; const max = rand(42, 66), col = pick(WARM);
        return () => {
          life++; x += vx; y += vy;
          const k = 1 - life / max; if (k <= 0) return false;
          const g = sctx.createLinearGradient(x, y, x - vx * 6, y - vy * 6);
          g.addColorStop(0, `rgba(${col[0]},${col[1]},${col[2]},${(0.75 * k).toFixed(3)})`);
          g.addColorStop(1, "rgba(255,255,255,0)");
          sctx.strokeStyle = g; sctx.lineWidth = 1.4;
          sctx.beginPath(); sctx.moveTo(x, y); sctx.lineTo(x - vx * 6, y - vy * 6); sctx.stroke();
          return true;
        };
      },
      // 2 · slow comet — bright head, long glowing tail
      comet() {
        const L = Math.random() > 0.5;
        let x = L ? -60 : W + 60, y = rand(H * 0.1, H * 0.6);
        const vx = (L ? 1 : -1) * rand(1.6, 2.4), vy = rand(0.3, 0.9);
        let life = 0; const max = rand(260, 420), col = pick(WARM);
        return () => {
          life++; x += vx; y += vy;
          const k = Math.min(1, Math.min(life, max - life) / 60); if (life >= max) return false;
          const g = sctx.createLinearGradient(x, y, x - vx * 40, y - vy * 40);
          g.addColorStop(0, `rgba(${col[0]},${col[1]},${col[2]},${(0.5 * k).toFixed(3)})`);
          g.addColorStop(1, "rgba(255,255,255,0)");
          sctx.strokeStyle = g; sctx.lineWidth = 2;
          sctx.beginPath(); sctx.moveTo(x, y); sctx.lineTo(x - vx * 40, y - vy * 40); sctx.stroke();
          glow(x, y, 6, col, 0.5 * k); dot(x, y, 1.4, col, 0.9 * k);
          return true;
        };
      },
      // 3 · supernova — a point flares, an expanding ring, then fades
      supernova() {
        const x = rand(W * 0.1, W * 0.9), y = rand(H * 0.1, H * 0.8);
        let life = 0; const max = 150, col = pick(PALETTE);
        return () => {
          life++; const p = life / max; if (p >= 1) return false;
          const flare = Math.sin(Math.min(1, p * 3) * Math.PI / 2) * (1 - p);
          glow(x, y, 4 + 60 * p, col, 0.28 * (1 - p));
          dot(x, y, 1.6, col, flare);
          sctx.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},${(0.22 * (1 - p)).toFixed(3)})`;
          sctx.lineWidth = 1; sctx.beginPath();
          sctx.arc(x, y, 70 * p, 0, Math.PI * 2); sctx.stroke();
          return true;
        };
      },
      // 4 · pulsar — a fixed star pulses several times
      pulsar() {
        const x = rand(0, W), y = rand(0, H); let life = 0;
        const max = rand(150, 240), col = pick(PALETTE), freq = rand(6, 10);
        return () => {
          life++; const p = life / max; if (p >= 1) return false;
          const env = Math.sin(p * Math.PI);
          const a = env * (0.4 + 0.6 * Math.abs(Math.sin(p * freq * Math.PI)));
          glow(x, y, 7, col, a * 0.5); dot(x, y, 1.3, col, a);
          return true;
        };
      },
      // 5 · nebula — a soft coloured cloud drifts in and out
      nebula() {
        let x = rand(0, W), y = rand(0, H * 0.9);
        const vx = rand(-0.12, 0.12), vy = rand(-0.06, 0.06);
        const R = rand(120, 240), col = pick([[120, 150, 220], [150, 110, 190], [90, 160, 170], [200, 140, 110]]);
        let life = 0; const max = rand(500, 900);
        return () => {
          life++; x += vx; y += vy; const p = life / max; if (p >= 1) return false;
          const k = Math.sin(p * Math.PI) * 0.06;
          glow(x, y, R, col, k);
          return true;
        };
      },
      // 6 · satellite — a dim dot crosses slowly and steadily
      satellite() {
        const L = Math.random() > 0.5;
        let x = L ? -20 : W + 20, y = rand(0, H);
        const vx = (L ? 1 : -1) * rand(0.7, 1.1), vy = rand(-0.2, 0.2);
        const col = pick(WARM);
        return () => {
          x += vx; y += vy;
          if (x < -25 || x > W + 25) return false;
          const a = 0.5 + 0.3 * Math.sin(t * 4 + x * 0.05);
          dot(x, y, 0.9, col, a);
          return true;
        };
      },
      // 7 · sparkle cluster — a few points flash in sequence
      sparkle() {
        const cx = rand(0, W), cy = rand(0, H), n = 4 + (Math.random() * 3 | 0);
        const pts = Array.from({ length: n }, () => ({ x: cx + rand(-26, 26), y: cy + rand(-26, 26), ph: Math.random() * Math.PI * 2, col: pick(PALETTE) }));
        let life = 0; const max = 110;
        return () => {
          life++; const p = life / max; if (p >= 1) return false;
          const env = Math.sin(p * Math.PI);
          for (const q of pts) { const a = env * Math.max(0, Math.sin(t * 7 + q.ph)); dot(q.x, q.y, 1.1, q.col, a); }
          return true;
        };
      },
      // 8 · ripple — a faint expanding circle (gravitational ring)
      ripple() {
        const x = rand(W * 0.15, W * 0.85), y = rand(H * 0.15, H * 0.85);
        let life = 0; const max = 130, col = pick(PALETTE);
        return () => {
          life++; const p = life / max; if (p >= 1) return false;
          sctx.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},${(0.2 * (1 - p)).toFixed(3)})`;
          sctx.lineWidth = 1; sctx.beginPath();
          sctx.arc(x, y, 6 + 90 * p, 0, Math.PI * 2); sctx.stroke();
          return true;
        };
      },
      // 9 · drifting mote — a large soft coloured particle floats up
      mote() {
        let x = rand(0, W), y = H + 20; const vy = -rand(0.15, 0.4), vx = rand(-0.1, 0.1);
        const R = rand(2.5, 5), col = pick(PALETTE); let life = 0; const max = rand(500, 800);
        return () => {
          life++; x += vx; y += vy; const p = life / max; if (p >= 1 || y < -20) return false;
          glow(x, y, R * 3, col, 0.08 * Math.sin(p * Math.PI)); dot(x, y, R * 0.4, col, 0.3 * Math.sin(p * Math.PI));
          return true;
        };
      },
      // 10 · binary — two close stars shimmer and slowly orbit
      binary() {
        const cx = rand(W * 0.1, W * 0.9), cy = rand(H * 0.1, H * 0.9);
        const rad = rand(5, 11), c1 = pick(PALETTE), c2 = pick(PALETTE);
        let life = 0; const max = rand(200, 320), sp = rand(0.03, 0.06);
        return () => {
          life++; const p = life / max; if (p >= 1) return false;
          const env = Math.sin(p * Math.PI), ang = life * sp;
          dot(cx + Math.cos(ang) * rad, cy + Math.sin(ang) * rad, 1.2, c1, env * 0.9);
          dot(cx - Math.cos(ang) * rad, cy - Math.sin(ang) * rad, 1.0, c2, env * 0.8);
          return true;
        };
      },
    };

    // weighted pool — calm phenomena favoured, meteors kept rare
    const POOL = [
      ["meteor", 6], ["comet", 4], ["supernova", 5], ["pulsar", 9], ["nebula", 10],
      ["satellite", 8], ["sparkle", 11], ["ripple", 7], ["mote", 10], ["binary", 8],
    ];
    const WSUM = POOL.reduce((s, p) => s + p[1], 0);
    const spawn = () => {
      let r = Math.random() * WSUM;
      for (const [name, w] of POOL) { r -= w; if (r <= 0) { events.push(makers[name]()); return; } }
    };

    const draw = () => {
      t += 0.016;
      sctx.clearRect(0, 0, W, H);
      const parY = scrollY() * 0.04;

      for (const s of stars) {
        s.x += s.vx; s.y += s.vy;
        if (s.x < -4) s.x = W + 4; else if (s.x > W + 4) s.x = -4;
        if (s.y < -4) s.y = H + 4; else if (s.y > H + 4) s.y = -4;
        const wrapY = (((s.y - parY * (0.4 + s.depth)) % H) + H) % H;
        const a = s.base * (0.5 + 0.5 * Math.sin(t * s.tws + s.tw));
        dot(s.x, wrapY, s.r, s.col, a);
        if (s.depth > 0.8) glow(s.x, wrapY, s.r * 3, s.col, a * 0.1);
      }

      for (let i = events.length - 1; i >= 0; i--) {
        if (!events[i]()) events.splice(i, 1);
      }

      // schedule next phenomenon — average every ~2.5s, capped concurrency
      if (--nextSpawn <= 0) {
        if (events.length < 5) spawn();
        nextSpawn = 90 + (Math.random() * 150 | 0);
      }

      rafId = requestAnimationFrame(draw);
    };

    const start = () => { if (!rafId && !prefersReduced) rafId = requestAnimationFrame(draw); };
    const stop = () => { if (rafId) cancelAnimationFrame(rafId); rafId = null; };

    build();
    if (prefersReduced) { draw(); stop(); } else { start(); }
    window.addEventListener("resize", build, { passive: true });
    document.addEventListener("visibilitychange", () => { document.hidden ? stop() : start(); });
  }

  /* ---------- 2. Split-character headings ---------- */
  document.querySelectorAll("[data-split]").forEach((el) => {
    const text = el.textContent;
    el.setAttribute("aria-label", text);
    el.textContent = "";
    [...text].forEach((ch, i) => {
      const s = document.createElement("span");
      s.className = "ch";
      s.style.setProperty("--ci", i);
      s.textContent = ch === " " ? " " : ch;
      s.setAttribute("aria-hidden", "true");
      el.appendChild(s);
    });
  });

  /* ---------- 3. Scroll reveals ---------- */
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add(e.target.hasAttribute("data-split") ? "split-in" : "in");
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }
  );
  // Stagger siblings within a list for a gentle cascade.
  const groups = [".news-list", ".strands", ".pubs"];
  groups.forEach((sel) => {
    document.querySelectorAll(sel).forEach((list) => {
      [...list.children].forEach((child, i) => {
        if (child.classList.contains("reveal")) child.style.transitionDelay = `${i * 70}ms`;
      });
    });
  });
  document.querySelectorAll(".reveal, [data-split]").forEach((el) => io.observe(el));

  /* ---------- 3b. News filter ---------- */
  const filterBtns = [...document.querySelectorAll(".filter-btn")];
  const newsItems = [...document.querySelectorAll(".news-item")];
  if (filterBtns.length && newsItems.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const f = btn.dataset.filter;
        filterBtns.forEach((b) => {
          const on = b === btn;
          b.classList.toggle("active", on);
          b.setAttribute("aria-selected", on ? "true" : "false");
        });
        newsItems.forEach((item) => {
          const show = f === "all" || item.dataset.cat === f;
          item.classList.toggle("hidden", !show);
        });
      });
    });
  }

  /* ---------- 4. Nav: border on scroll + hide on scroll-down ---------- */
  const nav = document.querySelector(".nav");
  let lastY = 0;
  const onScroll = () => {
    const y = window.scrollY;
    if (nav) {
      nav.classList.toggle("scrolled", y > 8);
      if (y > lastY && y > 320) nav.classList.add("nav-hidden");
      else nav.classList.remove("nav-hidden");
    }
    lastY = y;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- 5. Active section in nav ---------- */
  const links = new Map(
    [...document.querySelectorAll(".nav-links a[data-section]")].map((a) => [a.dataset.section, a])
  );
  const sectionIO = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        const link = links.get(e.target.id);
        if (link && e.isIntersecting) {
          links.forEach((l) => l.classList.remove("active"));
          link.classList.add("active");
        }
      }
    },
    { rootMargin: "-42% 0px -52% 0px" }
  );
  ["home", "about", "news", "experience", "education", "publications", "contact"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) sectionIO.observe(el);
  });

  /* ---------- 6. Year ---------- */
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
