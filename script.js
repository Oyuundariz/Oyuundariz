
/* =========================================
   UPDATE МЭРГЭЖИЛ СУРГАЛТЫН ТӨВ
   JavaScript ажиллагаа
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* 1. Гар утасны цэс */

  const menuButton = document.querySelector(
    ".menu-toggle, .hamburger, .nav-toggle"
  );

  const nav = document.querySelector(
    "nav, .nav-links, .navbar"
  );

  if (menuButton && nav) {

    menuButton.setAttribute("aria-expanded", "false");

    menuButton.addEventListener("click", () => {

      const list = nav.matches("ul")
        ? nav
        : nav.querySelector("ul");

      const target = list || nav;

      const isOpen = target.classList.toggle("open");

      nav.classList.toggle("active", isOpen);

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    });

    nav.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        const list = nav.matches("ul")
          ? nav
          : nav.querySelector("ul");

        if (list) {
          list.classList.remove("open");
        }

        nav.classList.remove("active");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

  }


  /* 2. Дэлгэрэнгүй цонх нээх */

  const openers = document.querySelectorAll(
    "[data-modal-target], " +
    "[data-detail-target], " +
    ".details-btn, " +
    ".detail-btn, " +
    "[data-open-modal]"
  );

  const closeModal = modal => {

    modal.classList.remove("active", "show");

    document.body.classList.remove("modal-open");

  };


  openers.forEach(button => {

    button.addEventListener("click", () => {

      const selector =
        button.getAttribute("data-modal-target") ||
        button.getAttribute("data-detail-target") ||
        button.getAttribute("data-open-modal");

      let modal = null;

      if (selector) {

        try {
          modal = document.querySelector(selector);
        } catch (error) {
          console.warn("Modal selector алдаатай байна:", selector);
        }

      }

      if (!modal && button.dataset.detail) {

        modal = document.querySelector(
          "#details-modal, .details-modal, #detailModal, .modal"
        );

        const body = modal?.querySelector(
          ".modal-body, .details-content, [data-modal-body]"
        );

        if (body) {
          body.textContent = button.dataset.detail;
        }

      }

      if (modal) {

        modal.classList.add("active", "show");

        document.body.classList.add("modal-open");

      }

    });

  });


  /* 3. Дэлгэрэнгүй цонх хаах */

  document.querySelectorAll(
    ".modal, .details-modal, .popup, [data-modal]"
  ).forEach(modal => {

    modal.querySelectorAll(
      ".modal-close, .close-modal, .popup-close, [data-close-modal]"
    ).forEach(button => {

      button.addEventListener("click", () => {
        closeModal(modal);
      });

    });


    // Цонхны гадна хэсэг дээр дарахад хаана

    modal.addEventListener("click", event => {

      if (event.target === modal) {
        closeModal(modal);
      }

    });

  });


  /* 4. ESC товчоор цонх хаах */

  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

      document.querySelectorAll(
        ".modal.active, " +
        ".modal.show, " +
        ".details-modal.active, " +
        ".popup.active"
      ).forEach(closeModal);

    }

  });


  /* 5. Одоогийн оныг автоматаар харуулах */

  document.querySelectorAll(".current-year").forEach(element => {

    element.textContent = new Date().getFullYear();

  });


  /* 6. Хэсэг рүү зөөлөн гүйлгэх */

  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const id = link.getAttribute("href");

      if (!id || id === "#") {
        return;
      }

      const target = document.querySelector(id);

      if (target) {

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    });

  });

});
