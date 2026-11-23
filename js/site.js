/* Shared site behavior: images, nav, glossary tooltips, cards and the zoomable viewer. */
(function () {
  "use strict";

  /* ---------------- Images ----------------
     A bare file name ("powell%201.jpg") means images/projects/.
     Anything with a slash ("plans/my-plan/a1.jpg") is used as-is.
     Missing files in images/projects/ fall back to the old site's copy. */
  var IMG_DIR = "images/projects/";
  var FALLBACK = "https://www.jlangford.com/images/";

  var imgSrc = window.imgSrc = function (file) {
    if (!file) return "";
    return /[\/:]/.test(file) ? file : IMG_DIR + file;
  };
  var isPdf = window.isPdf = function (file) { return /\.pdf($|\?)/i.test(file || ""); };

  function fallBack(img) {
    if (img.tagName !== "IMG" || img.dataset.fellBack) return;
    var src = img.getAttribute("src") || "";
    if (src.indexOf(IMG_DIR) === 0) {
      img.dataset.fellBack = "1";
      img.src = FALLBACK + src.slice(IMG_DIR.length);
    }
  }
  document.addEventListener("error", function (e) { fallBack(e.target); }, true);
  Array.prototype.forEach.call(document.images, function (img) {
    if (img.complete && img.naturalWidth === 0) fallBack(img);
  });

  /* ---------------- Helpers ---------------- */
  var esc = window.esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  };
  var slugify = window.slugify = function (s) {
    return String(s).toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  };
  window.fmtNum = function (n) { return Number(n).toLocaleString("en-US"); };
  function imgFile(entry) { return typeof entry === "string" ? entry : entry.src; }
  function imgCaption(entry) { return typeof entry === "string" ? "" : (entry.caption || ""); }
  function categoryLabel(slug) {
    var c = (window.CATEGORIES || []).filter(function (c) { return c.slug === slug; })[0];
    return c ? c.label : "";
  }

  (window.PROJECTS || []).forEach(function (p) { p.id = p.id || slugify(p.name); });
  (window.PLANS || []).forEach(function (p) { p.id = p.id || slugify(p.name); p.specs = p.specs || {}; });

  window.planForProject = function (projectId) {
    return (window.PLANS || []).filter(function (p) { return p.project === projectId; })[0];
  };
  window.projectById = function (id) {
    return (window.PROJECTS || []).filter(function (p) { return p.id === id; })[0];
  };

  /* ---------------- Mobile nav ---------------- */
  var toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.classList.contains("nav-open")) {
        document.body.classList.remove("nav-open"); toggle.setAttribute("aria-expanded", false); toggle.focus();
      }
    });
  }

  /* ---------------- Scroll reveal ---------------- */
  var ticking = false;
  window.reveal = function () {
    var limit = window.innerHeight * 0.95;
    document.querySelectorAll(".reveal:not(.is-in)").forEach(function (el) {
      if (el.getBoundingClientRect().top < limit) el.classList.add("is-in");
    });
  };
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { ticking = false; window.reveal(); });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  window.reveal();

  /* ---------------- Glossary tooltips ----------------
     <span class="term" data-term="icf">ICF</span>  — or call termify(label) to
     wrap a label automatically if it matches a glossary entry. */
  var G = window.GLOSSARY || {};
  window.findTerm = function (text) {
    var t = String(text).toLowerCase();
    for (var k in G) {
      var names = [G[k].term].concat(G[k].match || []);
      for (var i = 0; i < names.length; i++) if (names[i].toLowerCase() === t) return k;
    }
    return null;
  };
  window.termify = function (label, key) {
    key = key || window.findTerm(label);
    return key && G[key] ? '<span class="term" data-term="' + key + '">' + esc(label) + "</span>" : esc(label);
  };

  var tip = null, tipFor = null;
  function showTip(el) {
    var g = G[el.getAttribute("data-term")];
    if (!g) return;
    if (!tip) {
      tip = document.createElement("div");
      tip.className = "tip"; tip.setAttribute("role", "tooltip"); tip.id = "glossary-tip";
      document.body.appendChild(tip);
    }
    tip.innerHTML = "<strong>" + esc(g.term) + "</strong>" + esc(g.def) +
      '<a href="glossary.html#' + el.getAttribute("data-term") + '">Glossary →</a>';
    tip.classList.add("is-on");
    el.setAttribute("aria-describedby", "glossary-tip");
    tipFor = el;
    var r = el.getBoundingClientRect(), tw = Math.min(320, window.innerWidth - 24);
    tip.style.width = tw + "px";
    var left = Math.max(12, Math.min(r.left + r.width / 2 - tw / 2, window.innerWidth - tw - 12));
    var below = r.bottom + 10 + tip.offsetHeight < window.innerHeight;
    tip.style.left = left + "px";
    tip.style.top = (below ? r.bottom + 8 : r.top - tip.offsetHeight - 8) + "px";
  }
  function hideTip() {
    if (tip) tip.classList.remove("is-on");
    if (tipFor) tipFor.removeAttribute("aria-describedby");
    tipFor = null;
  }
  function prepTerms(root) {
    (root || document).querySelectorAll(".term:not([tabindex])").forEach(function (el) {
      el.setAttribute("tabindex", "0");
      el.setAttribute("role", "button");
    });
  }
  window.prepTerms = prepTerms;
  prepTerms();
  var hoverCapable = window.matchMedia("(hover: hover)").matches;
  document.addEventListener("mouseover", function (e) {
    if (!hoverCapable) return;
    var t = e.target.closest && e.target.closest(".term");
    if (t) showTip(t);
  });
  document.addEventListener("mouseout", function (e) {
    if (!hoverCapable) return;
    var t = e.target.closest && e.target.closest(".term");
    if (t && !(e.relatedTarget && tip && tip.contains(e.relatedTarget))) hideTip();
  });
  document.addEventListener("click", function (e) {
    var t = e.target.closest && e.target.closest(".term");
    if (t) { e.preventDefault(); tipFor === t ? hideTip() : showTip(t); return; }
    if (tip && !tip.contains(e.target)) hideTip();
  });
  document.addEventListener("focusin", function (e) { if (e.target.classList && e.target.classList.contains("term")) showTip(e.target); });
  document.addEventListener("focusout", function (e) { if (e.target.classList && e.target.classList.contains("term")) setTimeout(function () { if (!tip || !tip.contains(document.activeElement)) hideTip(); }, 0); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") hideTip();
    if ((e.key === "Enter" || e.key === " ") && e.target.classList && e.target.classList.contains("term")) { e.preventDefault(); showTip(e.target); }
  });
  window.addEventListener("scroll", hideTip, { passive: true });

  /* ---------------- Cards ---------------- */
  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    for (var k in attrs || {}) {
      if (k === "text") n.textContent = attrs[k];
      else if (k === "html") n.innerHTML = attrs[k];
      else n.setAttribute(k, attrs[k]);
    }
    (children || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }
  window.el = el;

  window.projectCard = function (p) {
    var cover = p.cover || imgFile(p.images[0]);
    var btn = el("button", { class: "card reveal", type: "button", "aria-label": "View " + p.name + " (" + p.images.length + " photos)" }, [
      el("div", { class: "card__img" }, [
        el("img", { src: imgSrc(cover), alt: "", loading: "lazy" }),
        el("span", { class: "card__count", text: p.images.length + (p.images.length === 1 ? " photo" : " photos") })
      ]),
      el("div", { class: "card__body" }, [
        el("h3", { class: "card__title", text: p.name }),
        el("div", { class: "card__meta", text: [categoryLabel(p.category), p.location].filter(Boolean).join(" · ") })
      ])
    ]);
    btn.addEventListener("click", function () { openProject(p, 0); });
    return btn;
  };

  // "3 bd · 2.5 ba · 2,165 sq ft"
  window.planStats = function (p) {
    var s = p.specs || {}, out = [];
    if (s.beds) out.push(s.beds + " bd");
    if (s.baths) out.push(s.baths + " ba");
    if (s.heated) out.push(fmtNum(s.heated) + " sq ft");
    if (s.stories) out.push(s.stories + (s.stories === 1 ? " story" : " stories"));
    if (s.width && s.depth) out.push(s.width + " × " + s.depth);
    return out;
  };
  window.planCover = function (p) {
    if (p.cover) return p.cover;
    var order = ["Rendering", "Elevation", "Photo", "Site Plan", "Floor Plan"];
    for (var i = 0; i < order.length; i++) {
      var s = (p.sheets || []).filter(function (x) { return x.type === order[i] && !isPdf(x.src); })[0];
      if (s) return s.src;
    }
    var any = (p.sheets || []).filter(function (x) { return !isPdf(x.src) || x.thumb; })[0];
    return any ? (any.thumb || any.src) : "";
  };
  window.planCard = function (p, overrideSrc) {
    var cover = overrideSrc || planCover(p);
    var coverSheet = (p.sheets || []).filter(function (s) { return s.src === cover; })[0];
    var drawing = !coverSheet || ["Photo", "Rendering"].indexOf(coverSheet.type) < 0;
    var a = el("a", { class: "card plan-card reveal", href: "plan.html?id=" + encodeURIComponent(p.id) }, [
      el("div", { class: "card__img" + (drawing ? " card__img--sheet" : "") }, [
        cover ? el("img", { src: overrideSrc || imgSrc(cover), alt: "", loading: "lazy" }) : el("span", { class: "card__noimg", text: "No drawing yet" }),
        el("span", { class: "card__count", text: (p.sheets || []).length + ((p.sheets || []).length === 1 ? " sheet" : " sheets") })
      ]),
      el("div", { class: "card__body" }, [
        el("div", { class: "card__meta", text: [p.type, p.location].filter(Boolean).join(" · ") }),
        el("h3", { class: "card__title", text: p.name }),
        el("div", { class: "card__stats", text: planStats(p).join("  ·  ") })
      ])
    ]);
    return a;
  };

  /* ---------------- Viewer (lightbox with zoom) ----------------
     Viewer.open({ items: [{src, title, caption}], start, info: "<html>",
                   light: true, hash: "project=xyz" }) */
  var ICON = {
    prev: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15 5l-7 7 7 7"/></svg>',
    next: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 5l7 7-7 7"/></svg>',
    close: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 5l14 14M19 5L5 19"/></svg>',
    plus: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 5v14M5 12h14"/></svg>',
    minus: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 12h14"/></svg>',
    fit: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>'
  };

  var lb, stage, stageImg, counter, caption, thumbs, info, zoomBar, opts, index = 0, lastFocus, hashOpen = false;
  var z = { s: 1, x: 0, y: 0 }, MAXZ = 6;

  function buildViewer() {
    lb = el("div", { class: "lb", role: "dialog", "aria-modal": "true", "aria-label": "Image viewer" });
    lb.innerHTML =
      '<div class="lb__stage">' +
        '<img class="lb__img" alt="" draggable="false">' +
        '<button class="lb__btn lb__prev" type="button" aria-label="Previous">' + ICON.prev + "</button>" +
        '<button class="lb__btn lb__next" type="button" aria-label="Next">' + ICON.next + "</button>" +
      "</div>" +
      '<div class="lb__bar">' +
        '<span class="lb__counter"></span>' +
        '<span class="lb__caption"></span>' +
        '<span class="lb__zoom">' +
          '<button type="button" data-z="out" aria-label="Zoom out">' + ICON.minus + "</button>" +
          '<button type="button" data-z="fit" aria-label="Fit to screen">' + ICON.fit + "</button>" +
          '<button type="button" data-z="in" aria-label="Zoom in">' + ICON.plus + "</button>" +
        "</span>" +
      "</div>" +
      '<div class="lb__thumbs"></div>' +
      '<aside class="lb__info"></aside>' +
      '<button class="lb__info-toggle" type="button" aria-expanded="false">Details</button>' +
      '<button class="lb__close" type="button" aria-label="Close">' + ICON.close + "</button>";
    document.body.appendChild(lb);

    stage = lb.querySelector(".lb__stage");
    stageImg = lb.querySelector(".lb__img");
    counter = lb.querySelector(".lb__counter");
    caption = lb.querySelector(".lb__caption");
    thumbs = lb.querySelector(".lb__thumbs");
    info = lb.querySelector(".lb__info");
    zoomBar = lb.querySelector(".lb__zoom");

    lb.querySelector(".lb__prev").addEventListener("click", function () { go(index - 1); });
    lb.querySelector(".lb__next").addEventListener("click", function () { go(index + 1); });
    lb.querySelector(".lb__close").addEventListener("click", function () { close(); });
    zoomBar.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      var r = stage.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      if (b.dataset.z === "in") zoomAt(z.s * 1.6, cx, cy);
      else if (b.dataset.z === "out") zoomAt(z.s / 1.6, cx, cy);
      else resetZoom();
    });
    var infoBtn = lb.querySelector(".lb__info-toggle");
    infoBtn.addEventListener("click", function () {
      var open = lb.classList.toggle("info-open");
      infoBtn.setAttribute("aria-expanded", open);
      infoBtn.textContent = open ? "Hide details" : "Details";
    });
    stageImg.addEventListener("load", function () { fitImage(); stageImg.classList.remove("is-loading"); });
    window.addEventListener("resize", function () { if (lb.classList.contains("is-open")) fitImage(); });

    // Wheel / trackpad zoom
    stage.addEventListener("wheel", function (e) {
      e.preventDefault();
      zoomAt(z.s * Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.0025)), e.clientX, e.clientY);
    }, { passive: false });

    // Double-click / double-tap zoom
    stage.addEventListener("dblclick", function (e) {
      if (e.target !== stageImg) return;
      z.s > 1.05 ? resetZoom() : zoomAt(2.5, e.clientX, e.clientY);
    });

    // Pointer: drag to pan when zoomed, pinch to zoom, swipe to change image
    var pts = {}, start = null, pinch = null, lastTap = 0;
    stage.addEventListener("pointerdown", function (e) {
      if (e.target.closest("button")) return;
      stage.setPointerCapture(e.pointerId);
      pts[e.pointerId] = { x: e.clientX, y: e.clientY };
      var ids = Object.keys(pts);
      if (ids.length === 1) {
        start = { x: e.clientX, y: e.clientY, zx: z.x, zy: z.y, t: Date.now() };
        if (e.pointerType === "touch" && Date.now() - lastTap < 300 && e.target === stageImg) {
          z.s > 1.05 ? resetZoom() : zoomAt(2.5, e.clientX, e.clientY);
          start = null;
        }
        lastTap = Date.now();
      } else if (ids.length === 2) {
        var a = pts[ids[0]], b = pts[ids[1]];
        pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), s: z.s };
        start = null;
      }
    });
    stage.addEventListener("pointermove", function (e) {
      if (!pts[e.pointerId]) return;
      pts[e.pointerId] = { x: e.clientX, y: e.clientY };
      var ids = Object.keys(pts);
      if (ids.length === 2 && pinch) {
        var a = pts[ids[0]], b = pts[ids[1]];
        zoomAt(pinch.s * Math.hypot(a.x - b.x, a.y - b.y) / pinch.d, (a.x + b.x) / 2, (a.y + b.y) / 2);
      } else if (start && z.s > 1.01) {
        z.x = start.zx + (e.clientX - start.x);
        z.y = start.zy + (e.clientY - start.y);
        applyZoom(); stage.classList.add("is-dragging");
      }
    });
    function up(e) {
      if (!pts[e.pointerId]) return;
      if (start && z.s <= 1.01 && Object.keys(pts).length === 1) {
        var dx = e.clientX - start.x, dy = e.clientY - start.y;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.2) go(index + (dx < 0 ? 1 : -1));
        else if (Math.abs(dx) < 6 && Math.abs(dy) < 6 && e.target === stage && e.pointerType === "mouse") close();
      }
      delete pts[e.pointerId];
      if (Object.keys(pts).length < 2) pinch = null;
      start = null;
      stage.classList.remove("is-dragging");
    }
    stage.addEventListener("pointerup", up);
    stage.addEventListener("pointercancel", up);

    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "ArrowRight") go(index + 1);
      else if (e.key === "ArrowLeft") go(index - 1);
      else if (e.key === "Escape") close();
      else if (e.key === "+" || e.key === "=") zoomBar.querySelector('[data-z="in"]').click();
      else if (e.key === "-") zoomBar.querySelector('[data-z="out"]').click();
      else if (e.key === "0") resetZoom();
      else if (e.key === "Tab") trapFocus(e);
    });
    window.addEventListener("popstate", function () {
      if (hashOpen && lb.classList.contains("is-open")) close(true);
    });
  }

  function fitImage() {
    var nw = stageImg.naturalWidth, nh = stageImg.naturalHeight;
    if (!nw) return;
    var cs = getComputedStyle(stage);
    var w = stage.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    var h = stage.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    var k = Math.min(w / nw, h / nh);
    stageImg.style.width = Math.round(nw * k) + "px";
    stageImg.style.height = Math.round(nh * k) + "px";
  }
  function applyZoom() {
    var maxX = stageImg.offsetWidth * (z.s - 1) / 2 + 40, maxY = stageImg.offsetHeight * (z.s - 1) / 2 + 40;
    if (z.s <= 1) { z.x = 0; z.y = 0; }
    z.x = Math.max(-maxX, Math.min(maxX, z.x));
    z.y = Math.max(-maxY, Math.min(maxY, z.y));
    stageImg.style.transform = "translate(" + z.x + "px," + z.y + "px) scale(" + z.s + ")";
    lb.classList.toggle("is-zoomed", z.s > 1.01);
  }
  function zoomAt(s, cx, cy) {
    s = Math.max(1, Math.min(MAXZ, s));
    var r = stage.getBoundingClientRect();
    var px = cx - (r.left + r.width / 2), py = cy - (r.top + r.height / 2);
    z.x = px - (px - z.x) * (s / z.s);
    z.y = py - (py - z.y) * (s / z.s);
    z.s = s;
    applyZoom();
  }
  function resetZoom() { z = { s: 1, x: 0, y: 0 }; applyZoom(); }

  function trapFocus(e) {
    var f = Array.prototype.filter.call(lb.querySelectorAll("button, a[href], .term"), function (n) { return n.offsetParent !== null && !n.hidden; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
    else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
  }

  function go(i) {
    var items = opts.items, n = items.length;
    index = (i + n) % n;
    var it = items[index];
    resetZoom();
    stageImg.classList.add("is-loading");
    delete stageImg.dataset.fellBack;
    stageImg.src = imgSrc(it.src);
    stageImg.alt = it.title || (opts.label + " — image " + (index + 1) + " of " + n);
    counter.textContent = n > 1 ? (index + 1) + " / " + n : "";
    caption.textContent = [it.title, it.caption].filter(Boolean).join(" — ");
    thumbs.querySelectorAll(".lb__thumb").forEach(function (t, k) {
      t.setAttribute("aria-current", k === index ? "true" : "false");
      if (k === index) t.scrollIntoView({ block: "nearest", inline: "center" });
    });
    [index + 1, index - 1].forEach(function (k) { new Image().src = imgSrc(items[(k + n) % n].src); });
  }

  var Viewer = window.Viewer = {
    open: function (o) {
      if (!lb) buildViewer();
      opts = o;
      lastFocus = document.activeElement;
      lb.classList.toggle("lb--light", !!o.light);
      lb.classList.toggle("lb--noinfo", !o.info);
      info.innerHTML = o.info || "";
      prepTerms(info);
      var single = o.items.length < 2;
      lb.querySelector(".lb__prev").hidden = single;
      lb.querySelector(".lb__next").hidden = single;
      thumbs.hidden = single;
      thumbs.innerHTML = "";
      o.items.forEach(function (it, k) {
        var t = el("button", { class: "lb__thumb", type: "button", "aria-label": "Show " + (it.title || "image " + (k + 1)) }, [
          el("img", { src: imgSrc(it.thumb || it.src), alt: "", loading: "lazy" })
        ]);
        t.addEventListener("click", function () { go(k); });
        thumbs.appendChild(t);
      });
      lb.classList.remove("info-open");
      lb.querySelector(".lb__info-toggle").textContent = "Details";
      document.body.classList.add("lb-lock");
      lb.classList.add("is-open");
      go(o.start || 0);
      hashOpen = false;
      if (o.hash) { history.pushState({ lb: true }, "", "#" + o.hash); hashOpen = true; }
      lb.querySelector(".lb__close").focus();
    },
    close: function () { close(); }
  };

  function close(fromHistory) {
    lb.classList.remove("is-open");
    document.body.classList.remove("lb-lock");
    hideTip();
    if (!fromHistory && hashOpen) history.back();
    hashOpen = false;
    if (lastFocus) lastFocus.focus();
  }

  /* ---------------- Portfolio project in the viewer ---------------- */
  function projectInfo(p) {
    var html = '<p class="eyebrow">' + esc(categoryLabel(p.category)) + "</p><h2>" + esc(p.name) + "</h2>";
    if (p.location) html += '<p class="lb__loc">' + esc(p.location) + "</p>";
    if (p.description) html += '<p class="lb__desc">' + esc(p.description) + "</p>";
    if (p.details && p.details.length) {
      html += '<dl class="lb__details">' + p.details.map(function (d) {
        return "<div><dt>" + termify(d[0]) + "</dt><dd>" + esc(d[1]) + "</dd></div>";
      }).join("") + "</dl>";
    }
    var plan = planForProject(p.id);
    if (plan) html += '<a class="lb__plan" href="plan.html?id=' + encodeURIComponent(plan.id) + '">View the drawings &amp; specs →</a>';
    if (p.links && p.links.length) {
      html += '<div class="lb__links">' + p.links.map(function (l) {
        return '<a href="' + esc(l[1]) + '" target="_blank" rel="noopener">' + esc(l[0]) + " ↗</a>";
      }).join("") + "</div>";
    }
    return html;
  }
  var openProject = window.openProject = function (p, start) {
    Viewer.open({
      items: p.images.map(function (e) { return { src: imgFile(e), caption: imgCaption(e) }; }),
      start: start, info: projectInfo(p), label: p.name, hash: "project=" + p.id
    });
  };

  // page.html#project=powell-building opens that project
  window.openFromHash = function () {
    var m = location.hash.match(/^#project=(.+)$/);
    if (!m) return;
    var p = projectById(m[1]);
    if (p && !(lb && lb.classList.contains("is-open"))) {
      history.replaceState(null, "", location.pathname + location.search);
      openProject(p, 0);
    }
  };
  window.addEventListener("hashchange", function () { window.openFromHash(); });
})();
