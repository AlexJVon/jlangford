/*
  SITE INFO — change contact details, links and the menu here.
  Every page's header and footer is built from this one file.
*/
window.SITE = {
  name: "Jennifer Langford",
  letters: "AIA · CNU · PA",
  fullName: "Jennifer Langford, AIA, CNU, PA",
  tagline: "Architecture · Town Planning · New Urban Design",
  address: ["5208 SW 91st Way, Suite 110", "Gainesville, FL 32608"],
  phone: "352.371.7187",
  email: "jennifer@jlangford.com",
  licenses: "FL AR#16554 · GA RA#12597 · SC #10227",
  social: {
    facebook: "https://www.facebook.com/jlangfordarchitect",
    linkedin: "http://www.linkedin.com/pub/jennifer-langford/14/43/b",
    houzz: "http://www.houzz.com/pro/aiacnupa/jennifer-langford-aia-cnu-pa"
  },
  // [menu label, file, page key]
  nav: [
    ["Portfolio", "portfolio.html", "portfolio"],
    ["Plan Library", "plans.html", "plans"],
    ["Services", "services.html", "services"],
    ["Philosophy", "philosophy.html", "philosophy"],
    ["About", "credentials.html", "about"],
    ["Contact", "contact.html", "contact"]
  ]
};

(function () {
  var S = window.SITE;
  var header = document.querySelector(".site-header");
  var current = header && header.getAttribute("data-current");
  var brand =
    '<a class="brand" href="index.html" aria-label="' + S.name + ' — home">' +
      '<span class="brand__mark" aria-hidden="true">JL</span>' +
      '<span class="brand__name"><strong>' + S.name + '</strong><span>' + S.letters + '</span></span>' +
    '</a>';

  if (header) {
    header.innerHTML =
      '<a class="skip" href="#main">Skip to content</a>' +
      '<div class="wrap">' + brand +
        '<button class="nav-toggle" type="button" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
        '<nav class="nav" aria-label="Main">' +
          S.nav.map(function (n) {
            return '<a href="' + n[1] + '"' + (n[2] === current ? ' aria-current="page"' : "") + ">" + n[0] + "</a>";
          }).join("") +
        "</nav>" +
      "</div>";
  }

  var ICONS = {
    facebook: '<path d="M13.5 22v-8.2h2.8l.4-3.2h-3.2V8.5c0-.9.3-1.6 1.6-1.6h1.7V4.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.3v3.2h2.8V22h3.4z"/>',
    linkedin: '<path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.2c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4z"/>',
    houzz: '<path d="M6 2h4v5.5l8 2.3V22h-5.5v-6h-3v6H6z"/>'
  };

  function renderFooter() {
    var footer = document.querySelector(".site-footer");
    if (!footer) return;
    var tel = "+1" + S.phone.replace(/\D/g, "");
    footer.innerHTML =
      '<div class="wrap">' +
        '<div class="footer-grid">' +
          "<div>" + brand + "<p>" + S.tagline + "</p></div>" +
          "<div><h4>Studio</h4><p>" + S.address.join("<br>") + "<br>" +
            '<a href="tel:' + tel + '">' + S.phone + "</a><br>" +
            '<a href="mailto:' + S.email + '">' + S.email + "</a></p></div>" +
          "<div><h4>Explore</h4><p>" +
            '<a href="plans.html">Plan Library</a><br>' +
            '<a href="services.html#process">How a project works</a><br>' +
            '<a href="glossary.html">Glossary of terms</a><br>' +
            '<a href="services.html#builders">For builders</a></p></div>' +
          '<div><h4>Follow</h4><div class="social">' +
            Object.keys(S.social).map(function (k) {
              return '<a href="' + S.social[k] + '" aria-label="' + k + '" target="_blank" rel="noopener"><svg viewBox="0 0 24 24">' + ICONS[k] + "</svg></a>";
            }).join("") +
          "</div></div>" +
        "</div>" +
        '<div class="footer-bottom">' +
          "<span>© " + new Date().getFullYear() + " " + S.fullName + "</span>" +
          "<span>" + S.licenses + "</span>" +
        "</div>" +
      "</div>";
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", renderFooter);
  else renderFooter();
})();
