// NEO — interacciones del sitio (sin dependencias)
(function () {
  var WA = "5493424628122";

  // Menú en celular
  var btn = document.querySelector(".menu-btn");
  if (btn) btn.addEventListener("click", function () {
    var open = document.body.classList.toggle("menu-open");
    btn.setAttribute("aria-expanded", open);
  });

  // Fotos: cada recuadro con data-img busca su archivo en assets/img/ (jpg, webp o png).
  // Si no está, queda el recuadro gris que dice qué foto va.
  var EXT = ["jpg", "webp", "png", "jpeg"];
  function loadImg(el) {
    var base = el.dataset.img, k = 0;
    var old = el.querySelector(":scope > img.ph-img");
    if (old) old.remove();
    el.classList.remove("has-img");
    (function next() {
      if (k >= EXT.length) return;
      var img = new Image();
      img.className = "ph-img";
      img.alt = el.getAttribute("aria-label") || "";
      img.onload = function () {
        if (el.dataset.img !== base) return; // el visor ya pasó a otra foto
        el.insertBefore(img, el.firstChild);
        el.classList.add("has-img");
      };
      img.onerror = next;
      img.src = "/assets/img/" + base + "." + EXT[k++];
    })();
  }
  var phs = document.querySelectorAll("[data-img]");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { io.unobserve(e.target); loadImg(e.target); } });
    }, { rootMargin: "400px" });
    phs.forEach(function (el) { io.observe(el); });
  } else phs.forEach(loadImg);

  // Filas de tabla que llevan a una ficha
  document.querySelectorAll("tr[data-href]").forEach(function (tr) {
    tr.addEventListener("click", function () { location.href = tr.dataset.href; });
  });

  // Filtros por estado (Obras) y por edificio (Bitácora)
  document.querySelectorAll("[data-filter-group]").forEach(function (group) {
    var target = document.querySelector(group.dataset.filterGroup);
    group.querySelectorAll("[data-filter]").forEach(function (b) {
      b.addEventListener("click", function () {
        group.querySelectorAll("[data-filter]").forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
        var f = b.dataset.filter;
        target.querySelectorAll("[data-cat]").forEach(function (el) {
          el.hidden = !(f === "all" || el.dataset.cat.split(" ").indexOf(f) > -1);
        });
      });
    });
  });

  // Vistas imagen / lista / mapa
  document.querySelectorAll("[data-views]").forEach(function (seg) {
    seg.querySelectorAll("button").forEach(function (b) {
      b.addEventListener("click", function () {
        seg.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
        document.querySelectorAll(".view").forEach(function (v) { v.classList.toggle("on", v.id === b.dataset.view); });
      });
    });
  });

  // Mapa: tarjeta del edificio al tocar un punto
  document.querySelectorAll(".map").forEach(function (map) {
    var card = map.querySelector(".map-card");
    map.querySelectorAll(".pin").forEach(function (p) {
      p.addEventListener("click", function () {
        if (!card) return;
        card.innerHTML = "<b>" + p.dataset.name + "</b>" + p.dataset.info +
          (p.dataset.href ? '<br><a class="link" href="' + p.dataset.href + '">Ver edificio</a>' : "");
        card.hidden = false;
      });
    });
  });

  // Visor de fotos (ficha entregada)
  var viewer = document.querySelector("[data-viewer]");
  if (viewer) {
    var total = +viewer.dataset.total, i = 1;
    var label = document.querySelectorAll("[data-viewer-count]");
    var caption = viewer.querySelector(".ph-what");
    var thumbs = document.querySelectorAll(".thumbs button");
    var names = JSON.parse(viewer.dataset.names);
    var frame = viewer.querySelector(".ph");
    var folder = location.pathname.split("/").pop().replace(/\.html$/, "") || "neo-18";
    var show = function (n) {
      i = (n - 1 + total) % total + 1;
      label.forEach(function (l) { l.textContent = String(i).padStart(2, "0") + " / " + total; });
      caption.textContent = names[i - 1];
      frame.setAttribute("aria-label", names[i - 1]);
      frame.dataset.img = folder + "/foto-" + String(i).padStart(2, "0");
      loadImg(frame);
      thumbs.forEach(function (t, k) { t.setAttribute("aria-current", k === i - 1); });
    };
    document.querySelectorAll("[data-prev]").forEach(function (b) { b.addEventListener("click", function () { show(i - 1); }); });
    document.querySelectorAll("[data-next]").forEach(function (b) { b.addEventListener("click", function () { show(i + 1); }); });
    thumbs.forEach(function (t, k) { t.addEventListener("click", function () { show(k + 1); }); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") show(i - 1);
      if (e.key === "ArrowRight") show(i + 1);
    });
    show(1);
  }

  // Formulario: mientras no esté conectado Formspree/Web3Forms, la consulta sale por WhatsApp
  var form = document.querySelector("form[data-wa]");
  if (form) form.addEventListener("submit", function (e) {
    if (form.getAttribute("action")) return; // ya conectado a un servicio de formularios
    e.preventDefault();
    var d = new FormData(form);
    var msg = "Hola NEO, soy " + d.get("nombre") + " (tel. " + d.get("telefono") + "). " +
      "Me interesa " + d.get("edificio") + ". " + (d.get("mensaje") || "");
    window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
  });
})();
