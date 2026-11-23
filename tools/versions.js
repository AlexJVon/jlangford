/* Demo version switcher — added to every page by tools/build-versions.sh.
   Lists every published branch and links to the same page in that version. */
(function () {
  var me = document.currentScript;
  if (!me) return;
  var base = me.src.replace(/versions\.js(\?.*)?$/, "");

  fetch(base + "versions.json", { cache: "no-store" }).then(function (r) { return r.json(); }).then(function (list) {
    if (!list || list.length < 2) return;
    var here = location.href.split("#")[0];
    var current = list.filter(function (v) { return here.indexOf(base + v.path) === 0; })
      .sort(function (a, b) { return b.path.length - a.path.length; })[0] || list[0];
    var page = here.slice((base + current.path).length) || "index.html";

    var css = document.createElement("style");
    css.textContent =
      ".vsw{position:fixed;left:12px;bottom:calc(12px + env(safe-area-inset-bottom));z-index:90;font:500 13px/1.3 system-ui,-apple-system,'Segoe UI',sans-serif}" +
      ".vsw>button{display:flex;align-items:center;gap:8px;background:#2f4a63;color:#fff;border:0;border-radius:999px;padding:9px 14px;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,.25);font:inherit;min-height:40px}" +
      ".vsw>button b{font-weight:600}" +
      ".vsw ul{position:absolute;left:0;bottom:calc(100% + 8px);margin:0;padding:6px;list-style:none;background:#fff;color:#262523;border:1px solid #d9d4c9;box-shadow:0 10px 30px rgba(0,0,0,.18);width:min(320px,calc(100vw - 24px));max-height:60vh;overflow:auto}" +
      ".vsw li a{display:block;padding:10px 12px;text-decoration:none;color:inherit;border-radius:4px}" +
      ".vsw li a:hover,.vsw li a:focus{background:#e6ecf1}" +
      ".vsw li a[aria-current]{background:#2f4a63;color:#fff}" +
      ".vsw small{display:block;opacity:.7;font-weight:400;margin-top:2px}" +
      "body.lb-lock .vsw,body.nav-open .vsw{display:none}" +
      "@media print{.vsw{display:none}}";
    document.head.appendChild(css);

    var box = document.createElement("div");
    box.className = "vsw";
    box.innerHTML = '<button type="button" aria-expanded="false" aria-haspopup="true">Version: <b></b> ▾</button><ul hidden></ul>';
    box.querySelector("b").textContent = current.main ? current.name + " (latest)" : current.name;
    var ul = box.querySelector("ul");
    list.forEach(function (v) {
      var li = document.createElement("li"), a = document.createElement("a");
      a.href = base + v.path + page;
      if (v === current) a.setAttribute("aria-current", "page");
      // Older versions may not have this page — fall back to their home page
      a.addEventListener("click", function (e) {
        if (v === current) return;
        e.preventDefault();
        fetch(a.href.split("?")[0], { method: "HEAD" }).then(function (r) {
          location.href = r.ok ? a.href : base + v.path;
        }, function () { location.href = a.href; });
      });
      a.textContent = v.main ? v.name + " (latest)" : v.name;
      var s = document.createElement("small");
      s.textContent = v.date + " — " + v.note;
      a.appendChild(s); li.appendChild(a); ul.appendChild(li);
    });
    var btn = box.querySelector("button");
    btn.addEventListener("click", function () {
      ul.hidden = !ul.hidden; btn.setAttribute("aria-expanded", !ul.hidden);
    });
    document.addEventListener("click", function (e) { if (!box.contains(e.target)) { ul.hidden = true; btn.setAttribute("aria-expanded", false); } });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !ul.hidden) { ul.hidden = true; btn.setAttribute("aria-expanded", false); btn.focus(); } });
    document.body.appendChild(box);
  }).catch(function () {});
})();
