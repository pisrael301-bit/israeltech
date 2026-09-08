(function () {
  "use strict";

  // Ano dinâmico no rodapé
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Menu mobile
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menu");
      });
    });
  }

  // Revelação suave dos blocos ao rolar a página
  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Sem suporte a IntersectionObserver: mostra tudo direto
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  // Formulário de orçamento -> mensagem pronta no WhatsApp
  var form = document.getElementById("orcamentoForm");
  var WHATSAPP_NUMBER = "5585998151406";

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var nome = document.getElementById("nome").value.trim();
      var servico = document.getElementById("servico").value;
      var mensagem = document.getElementById("mensagem").value.trim();

      var texto = "Olá! Meu nome é " + (nome || "—") + ".\n" +
        "Tenho interesse em: " + servico + ".\n" +
        (mensagem ? "Detalhes: " + mensagem : "Gostaria de mais informações.");

      var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(texto);
      window.open(url, "_blank", "noopener");
    });
  }

  // Destaca o item de menu correspondente à seção visível
  var sections = document.querySelectorAll("main section[id], header[id]");
  var navLinks = document.querySelectorAll(".main-nav a");

  if ("IntersectionObserver" in window && sections.length && navLinks.length) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute("id");
            navLinks.forEach(function (link) {
              link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
      navObserver.observe(section);
    });
  }

  // Botão voltar ao topo
  var backToTop = document.getElementById("backToTop");

  if (backToTop) {
    window.addEventListener(
      "scroll",
      function () {
        backToTop.classList.toggle("is-visible", window.scrollY > 600);
      },
      { passive: true }
    );

    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
