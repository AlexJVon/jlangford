/* Shared site behavior: nav, images, project cards, and the gallery viewer. */
(function () {
  "use strict";

  // Photos are served from images/projects/. Until they're all copied there,
  // any missing file falls back to the copy on the old site.
  var IMG_DIR = "images/projects/";
  var FALLBACK = "https://www.jlangford.com/images/";

  window.imgSrc = function (file) { return IMG_DIR + file; };

  function fallBack(img) {
    if (img.tagName !== "IMG" || img.dataset.fellBack) return;
    var src = img.getAttribute("src") || "";
    if (src.indexOf(IMG_DIR) === 0) {
      img.dataset.fellBack = "1";
      img.src = FALLBACK + src.slice(IMG_DIR.length);
    }
  }
  document.addEventListener("error", function (e) { fallBack(e.target); }, true);
  // Images that already failed before this script ran
  Array.prototype.forEach.call(document.images, function (img) {
    if (img.complete && img.naturalWidth === 0) fallBack(img);
  });

  // ---------- Mobile nav ----------
  var toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open);
    });
  }

  // ---------- Footer year ----------
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // ---------- Scroll reveal ----------
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

  // ---------- Helpers ----------
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
  function slugify(s) { return s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
  function imgFile(entry) { return typeof entry === "string" ? entry : entry.src; }
  function imgCaption(entry) { return typeof entry === "string" ? "" : (entry.caption || ""); }
  function categoryLabel(slug) {
    var c = (window.CATEGORIES || []).filter(function (c) { return c.slug === slug; })[0];
    return c ? c.label : "";
  }

  (window.PROJECTS || []).forEach(function (p) { p.id = p.id || slugify(p.name); });

  // ---------- Project card ----------
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
    btn.addEventListener("click", function () { openGallery(p, 0); });
    return btn;
  };

  // ---------- Gallery viewer (lightbox) ----------
  var ICON = {
    prev: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15 5l-7 7 7 7"/></svg>',
    next: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 5l7 7-7 7"/></svg>',
    close: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 5l14 14M19 5L5 19"/></svg>'
  };

  var lb, stageImg, counter, caption, thumbs, info, current, index = 0, lastFocus;

  function buildLightbox() {
    lb = el("div", { class: "lb", role: "dialog", "aria-modal": "true", "aria-label": "Project gallery" });
    lb.innerHTML =
      '<div class="lb__stage">' +
        '<span class="lb__counter"></span>' +
        '<img class="lb__img" alt="">' +
        '<button class="lb__btn lb__prev" type="button" aria-label="Previous photo">' + ICON.prev + '</button>' +
        '<button class="lb__btn lb__next" type="button" aria-label="Next photo">' + ICON.next + '</button>' +
        '<div class="lb__caption"></div>' +
      '</div>' +
      '<div class="lb__thumbs"></div>' +
      '<aside class="lb__info"></aside>' +
      '<button class="lb__info-toggle" type="button" aria-expanded="false">About this project</button>' +
      '<button class="lb__close" type="button" aria-label="Close gallery">' + ICON.close + '</button>';
    document.body.appendChild(lb);

    stageImg = lb.querySelector(".lb__img");
    counter = lb.querySelector(".lb__counter");
    caption = lb.querySelector(".lb__caption");
    thumbs = lb.querySelector(".lb__thumbs");
    info = lb.querySelector(".lb__info");

    lb.querySelector(".lb__prev").addEventListener("click", function () { go(index - 1); });
    lb.querySelector(".lb__next").addEventListener("click", function () { go(index + 1); });
    lb.querySelector(".lb__close").addEventListener("click", function () { closeGallery(); });
    var infoBtn = lb.querySelector(".lb__info-toggle");
    infoBtn.addEventListener("click", function () {
      var open = lb.classList.toggle("info-open");
      infoBtn.setAttribute("aria-expanded", open);
      infoBtn.textContent = open ? "Hide details" : "About this project";
    });
    stageImg.addEventListener("load", function () { stageImg.classList.remove("is-loading"); });

    // Click on empty stage area closes (desktop)
    lb.querySelector(".lb__stage").addEventListener("click", function (e) {
      if (e.target === e.currentTarget) closeGallery();
    });

    // Swipe
    var x0 = null, y0 = null;
    var stage = lb.querySelector(".lb__stage");
    stage.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    stage.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(index + (dx < 0 ? 1 : -1));
      x0 = null;
    });

    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "ArrowRight") go(index + 1);
      else if (e.key === "ArrowLeft") go(index - 1);
      else if (e.key === "Escape") closeGallery();
      else if (e.key === "Tab") trapFocus(e);
    });

    window.addEventListener("popstate", function () {
      if (lb.classList.contains("is-open") && location.hash.indexOf("#project=") !== 0) closeGallery(true);
    });
  }

  function trapFocus(e) {
    var f = lb.querySelectorAll("button:not([hidden]), a[href]");
    f = Array.prototype.filter.call(f, function (n) { return n.offsetParent !== null; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
    else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
  }

  function renderInfo(p) {
    var html = '<p class="eyebrow">' + esc(categoryLabel(p.category)) + "</p><h2>" + esc(p.name) + "</h2>";
    if (p.location) html += '<p class="lb__loc">' + esc(p.location) + "</p>";
    if (p.description) html += '<p class="lb__desc">' + esc(p.description) + "</p>";
    if (p.details && p.details.length) {
      html += '<dl class="lb__details">' + p.details.map(function (d) {
        return "<div><dt>" + esc(d[0]) + "</dt><dd>" + esc(d[1]) + "</dd></div>";
      }).join("") + "</dl>";
    }
    if (p.links && p.links.length) {
      html += '<div class="lb__links">' + p.links.map(function (l) {
        return '<a href="' + esc(l[1]) + '" target="_blank" rel="noopener">' + esc(l[0]) + " ↗</a>";
      }).join("") + "</div>";
    }
    info.innerHTML = html;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function go(i) {
    var n = current.images.length;
    index = (i + n) % n;
    var entry = current.images[index];
    stageImg.classList.add("is-loading");
    delete stageImg.dataset.fellBack;
    stageImg.src = imgSrc(imgFile(entry));
    stageImg.alt = current.name + " — photo " + (index + 1) + " of " + n;
    counter.textContent = (index + 1) + " / " + n;
    caption.textContent = imgCaption(entry);
    thumbs.querySelectorAll(".lb__thumb").forEach(function (t, k) {
      t.setAttribute("aria-current", k === index ? "true" : "false");
      if (k === index) t.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
    });
    // Preload neighbours
    [index + 1, index - 1].forEach(function (k) { new Image().src = imgSrc(imgFile(current.images[(k + n) % n])); });
  }

  window.openGallery = function (p, start, skipHistory) {
    if (!lb) buildLightbox();
    current = p;
    lastFocus = document.activeElement;
    renderInfo(p);
    var single = p.images.length < 2;
    lb.querySelector(".lb__prev").hidden = single;
    lb.querySelector(".lb__next").hidden = single;
    thumbs.hidden = single;
    thumbs.innerHTML = "";
    p.images.forEach(function (entry, k) {
      var t = el("button", { class: "lb__thumb", type: "button", "aria-label": "Show photo " + (k + 1) }, [
        el("img", { src: imgSrc(imgFile(entry)), alt: "", loading: "lazy" })
      ]);
      t.addEventListener("click", function () { go(k); });
      thumbs.appendChild(t);
    });
    lb.classList.remove("info-open");
    document.body.classList.add("lb-lock");
    lb.classList.add("is-open");
    go(start || 0);
    if (!skipHistory) history.pushState({ lb: true }, "", "#project=" + p.id);
    lb.querySelector(".lb__close").focus();
  };

  function closeGallery(fromHistory) {
    lb.classList.remove("is-open");
    document.body.classList.remove("lb-lock");
    if (!fromHistory && location.hash.indexOf("#project=") === 0) history.back();
    if (lastFocus) lastFocus.focus();
  }

  // Deep link: page.html#project=powell-building opens that project
  window.openFromHash = function () {
    var m = location.hash.match(/^#project=(.+)$/);
    if (!m) return;
    var p = (window.PROJECTS || []).filter(function (p) { return p.id === m[1]; })[0];
    if (p && !(lb && lb.classList.contains("is-open") && current === p)) {
      history.replaceState(null, "", location.pathname + location.search);
      openGallery(p, 0);
    }
  };
  window.addEventListener("hashchange", function () { window.openFromHash(); });
})();
