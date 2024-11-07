const myFullpage = new fullpage("#fullpage", {
  //options here
  licenseKey: "A_ONE",
  autoScrolling: true,
  scrollHorizontally: true,
  anchors: [
    "intro",
    "east_course",
    "south_course",
    "west_course",
    "family_site",
  ],
  onLeave: function (origin, destination, direction) {
    const beforeAnchor = origin.anchor;
    const nowAnchor = destination.anchor;
    const beforeNavList = document.querySelector(
      `#global_nav .${beforeAnchor}_list`
    );
    const activeNavList = document.querySelector(
      `#global_nav .${nowAnchor}_list`
    );
    const header = document.querySelector("#header");
    const rightNav = document.querySelector("#global_nav");
    beforeNavList.classList.remove("active_now");
    activeNavList.classList.add("active_now");

    if (beforeAnchor !== "family_site") {
      const beforeText = document.querySelector(
        `#fullpage .section.${beforeAnchor} .animation_text`
      );
      beforeText.classList.remove("active_now");
    }
    if (nowAnchor !== "family_site") {
      const activeText = document.querySelector(
        `#fullpage .section.${nowAnchor} .animation_text`
      );
      activeText.classList.add("active_now");
    }

    if (beforeAnchor === "family_site") {
      header.classList.remove("white_bg");
      rightNav.classList.remove("white_bg");
    }
    if (nowAnchor === "family_site") {
      header.classList.add("white_bg");
      rightNav.classList.add("white_bg");
    }

    // 퀵메뉴
    const quickMenu = document.querySelector("#quick_menu");
    if (nowAnchor === "family_site") {
      quickMenu.classList.add("family_site");
    } else {
      quickMenu.classList.remove("family_site");
    }
  },
});

const globalNavInit = () => {
  const activeSection = myFullpage.getActiveSection();
  const anchor = activeSection.anchor;
  const activeNavList = document.querySelector(`#global_nav .${anchor}_list`);
  activeNavList.classList.add("active_now");
};
const aniTextInit = () => {
  const activeSection = myFullpage.getActiveSection();
  const anchor = activeSection.anchor;
  if (anchor === "family_site") return;
  const activeText = document.querySelector(
    `#fullpage .section.${anchor} .animation_text`
  );
  activeText.classList.add("active_now");
};
const quickMenuInit = () => {
  const activeSection = myFullpage.getActiveSection();
  const anchor = activeSection.anchor;
  const btn = document.querySelector("#quick_menu .slide_btn");
  const quickMenu = document.querySelector("#quick_menu");
  const menu = document.querySelector("#quick_menu .menu");

  btn.addEventListener("click", () => {
    btn.classList.toggle("clicked");
    menu.classList.toggle("clicked");
  });

  if (anchor === "family_site") {
    quickMenu.classList.add("family_site");
  }
};
const calendarInit = () => {
  flatpickr("#datepicker", {
    inline: true,
    locale: "ko",
    defaultDate: new Date(),
    onDayCreate: function (dObj, dStr, fp, dayElem) {
      const date = dayElem.dateObj; // 날짜 객체

      // 특정 날짜 목록
      const specialDates = [
        1, 2, 3, 4, 5, 6, 10, 11, 12, 13, 14, 15, 18, 21, 23, 24, 26, 27, 28,
        29, 30,
      ];

      // 11월의 특정 날짜에 클래스 추가
      if (date.getMonth() === 10 && specialDates.includes(date.getDate())) {
        dayElem.classList.add("highlighted"); // 클래스 추가
      }
    },
  });
  const select = document.querySelector(
    "#pc_pop_up .flatpickr-monthDropdown-months"
  );
  select.disabled = true;
};
// const mobileCaledarInit = () => {
//   flatpickr("#mobile_datepicker", {
//     inline: true,
//     locale: "ko",
//     defaultDate: new Date(),
//     onDayCreate: function (dObj, dStr, fp, dayElem) {
//       const date = dayElem.dateObj; // 날짜 객체

//       // 특정 날짜 목록
//       const specialDates = [
//         1, 2, 3, 4, 5, 6, 10, 11, 12, 13, 14, 15, 18, 21, 23, 24, 26, 27, 28,
//         29, 30,
//       ];

//       // 11월의 특정 날짜에 클래스 추가
//       if (date.getMonth() === 10 && specialDates.includes(date.getDate())) {
//         dayElem.classList.add("highlighted"); // 클래스 추가
//       }
//     },
//   });
//   const select = document.querySelector(
//     "#mobile_pop_up .flatpickr-monthDropdown-months"
//   );
//   select.disabled = true;
// };
const popupInit = () => {
  const popupBtn = document.querySelector("#quick_menu .menu .reserv button");
  const popupBg = document.querySelector("#pc_pop_up .bg");
  const mobilePopupBg = document.querySelector("#pc_pop_up .mobile_bg");
  const closeBtn = document.querySelector(
    "#pc_pop_up .pop_up_content > .header > button"
  );
  const mobileCloseBtn = document.querySelector(
    "#pc_pop_up .mobile_header button"
  );
  const popup = document.querySelector("#pc_pop_up");
  const popupContent = document.querySelector("#pc_pop_up .pop_up_content");
  const reservBtns = document.querySelectorAll(
    "#pc_pop_up .pop_up_content .content .tab_time_table .time_table table tbody tr td button"
  );
  const reservInfoCheck = document.querySelector(".reserv_info_check");
  const reservInfoCheckClose = document.querySelector(
    ".reserv_info_check .header button"
  );
  const reservInfoCheckCancel = document.querySelector(
    "#pc_pop_up .reserv_info_check .content .btns button.cancel_btn"
  );
  const reservInfoCheckBtn = document.querySelector(
    "#pc_pop_up .reserv_info_check .content .btns button.reserv_btn"
  );
  const reservComplete = document.querySelector("#pc_pop_up .reserv_complete");
  const reservCompleteClose = document.querySelector(
    "#pc_pop_up .reserv_complete .header button"
  );
  const reservCompleteCheck = document.querySelector(
    "#pc_pop_up .reserv_complete .btn_container button"
  );
  const mobileFloatBtn = document.querySelector("#mobile_float_btn");
  const mobileBg = document.querySelector("#pc_pop_up .mobile_bg");

  popupBtn.addEventListener("click", () => {
    popup.classList.add("active_now");
    myFullpage.setAllowScrolling(false);
  });
  popupBg.addEventListener("click", () => {
    popup.classList.remove("active_now");
    reservInfoCheck.classList.remove("active_now");
    reservComplete.classList.remove("active_now");
    if (!popupContent.classList.contains("active_now")) {
      popupContent.classList.add("active_now");
    }
    myFullpage.setAllowScrolling(true);
  });
  closeBtn.addEventListener("click", () => {
    popup.classList.remove("active_now");
    myFullpage.setAllowScrolling(true);
  });
  reservBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!reservInfoCheck.classList.contains("active_now")) {
        reservInfoCheck.classList.add("active_now");

        if (window.innerWidth <= 1000) {
          mobileBg.classList.add("active_now");
        }
      }
    });
  });
  reservInfoCheckClose.addEventListener("click", () => {
    reservInfoCheck.classList.remove("active_now");
    if (window.innerWidth <= 1000) {
      mobileBg.classList.remove("active_now");
    }
  });
  reservInfoCheckCancel.addEventListener("click", () => {
    reservInfoCheck.classList.remove("active_now");
    if (window.innerWidth <= 1000) {
      mobileBg.classList.remove("active_now");
    }
  });
  reservInfoCheckBtn.addEventListener("click", () => {
    reservInfoCheck.classList.remove("active_now");
    popupContent.classList.remove("active_now");
    reservComplete.classList.add("active_now");
  });
  reservCompleteClose.addEventListener("click", () => {
    reservComplete.classList.remove("active_now");
    popup.classList.remove("active_now");
    popupContent.classList.add("active_now");
    if (window.innerWidth <= 1000) {
      mobileBg.classList.remove("active_now");
    }
    myFullpage.setAllowScrolling(true);
  });
  reservCompleteCheck.addEventListener("click", () => {
    reservComplete.classList.remove("active_now");
    popup.classList.remove("active_now");
    popupContent.classList.add("active_now");
    if (window.innerWidth <= 1000) {
      mobileBg.classList.remove("active_now");
    }
    myFullpage.setAllowScrolling(true);
  });
  mobileFloatBtn.addEventListener("click", () => {
    popup.classList.add("active_now");
    myFullpage.setAllowScrolling(false);
  });
  mobileCloseBtn.addEventListener("click", () => {
    popup.classList.remove("active_now");
    myFullpage.setAllowScrolling(true);
  });
  mobilePopupBg.addEventListener("click", () => {
    mobilePopupBg.classList.remove("active_now");
    if (reservInfoCheck.classList.contains("active_now")) {
      reservInfoCheck.classList.remove("active_now");
    }
    if (reservComplete.classList.remove("active_now")) {
      reservComplete.classList.remove("active_now");
      popup.classList.remove("active_now");
    }
    if (!popupContent.classList.contains("active_now")) {
      popupContent.classList.add("active_now");
    }
    myFullpage.setAllowScrolling(true);
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth <= 1000) {
      if (
        reservInfoCheck.classList.contains("active_now") ||
        reservComplete.classList.contains("active_now")
      ) {
        mobileBg.classList.add("active_now");
      }
    }
    if (window.innerWidth > 1000) {
      mobileBg.classList.remove("active_now");
    }
  });
};
const popupTabInit = () => {
  const btns = document.querySelectorAll(
    "#pc_pop_up .pop_up_content .content .tab_time_table .tab li button"
  );

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!btn.classList.contains("active_now")) {
        const activeBtn = document.querySelector(
          "#pc_pop_up .pop_up_content .content .tab_time_table .tab li button.active_now"
        );
        activeBtn.classList.remove("active_now");
        btn.classList.add("active_now");
      }
    });
  });
};
// const mobilePopupInit = () => {
//   const btn = document.querySelector("#mobile_float_btn");
//   const popup = document.querySelector("#mobile_pop_up");
//   const closeBtn = document.querySelector("#mobile_pop_up .close_btn");
//   const reservBtns = document.querySelectorAll(
//     "#mobile_pop_up .tab_table .time_table table tbody tr td button"
//   );
//   const mobileReservInfoCheck = document.querySelector(
//     "#mobile_reserv_info_check"
//   );
//   const mobileReservInfoCheckBg = document.querySelector(
//     "#mobile_reserv_info_check .bg"
//   );
//   const mobileReservInfoCheckClose = document.querySelector(
//     "#mobile_reserv_info_check .header button"
//   );
//   const mobileReservInfoCheckBtn = document.querySelector(
//     "#mobile_reserv_info_check .btns_container .reserv_btn"
//   );
//   const mobileReservInfoCheckCancel = document.querySelector(
//     "#mobile_reserv_info_check .btns_container .cancel_btn"
//   );
//   const mobileComplete = document.querySelector("#mobile_reserv_complete");
//   const mobileCompleteBg = document.querySelector(
//     "#mobile_reserv_complete .bg"
//   );
//   const mobileCompleteClose = document.querySelector(
//     "#mobile_reserv_complete .header button"
//   );
//   const mobileCompleteCheckBtn = document.querySelector(
//     "#mobile_reserv_complete .btns_container .reserv_check"
//   );

//   btn.addEventListener("click", () => {
//     popup.classList.add("active_now");
//     myFullpage.setAllowScrolling(false);
//   });
//   closeBtn.addEventListener("click", () => {
//     popup.classList.remove("active_now");
//     myFullpage.setAllowScrolling(true);
//   });
//   reservBtns.forEach((btn) => {
//     btn.addEventListener("click", () => {
//       if (!mobileReservInfoCheck.classList.contains("active_now")) {
//         mobileReservInfoCheck.classList.add("active_now");
//       }
//     });
//   });
//   mobileReservInfoCheckBg.addEventListener("click", () => {
//     mobileReservInfoCheck.classList.remove("active_now");
//   });
//   mobileReservInfoCheckClose.addEventListener("click", () => {
//     mobileReservInfoCheck.classList.remove("active_now");
//   });
//   mobileReservInfoCheckCancel.addEventListener("click", () => {
//     mobileReservInfoCheck.classList.remove("active_now");
//   });
//   mobileReservInfoCheckBtn.addEventListener("click", () => {
//     mobileReservInfoCheck.classList.remove("active_now");
//     mobileComplete.classList.add("active_now");
//   });
//   mobileCompleteBg.addEventListener("click", () => {
//     mobileComplete.classList.remove("active_now");
//   });
//   mobileCompleteClose.addEventListener("click", () => {
//     mobileComplete.classList.remove("active_now");
//   });
//   mobileCompleteCheckBtn.addEventListener("click", () => {
//     mobileComplete.classList.remove("active_now");
//   });
// };
// const mobilePopupTabInit = () => {
//   const btns = document.querySelectorAll(
//     "#mobile_pop_up .tab_table .tab button"
//   );

//   btns.forEach((btn) => {
//     btn.addEventListener("click", () => {
//       if (!btn.classList.contains("active_now")) {
//         const activeBtn = document.querySelector(
//           "#mobile_pop_up .tab_table .tab button.active_now"
//         );
//         activeBtn.classList.remove("active_now");
//         btn.classList.add("active_now");
//       }
//     });
//   });
// };
const removeWaterMark = () => {
  const waterMark = document.querySelector(".fp-watermark");
  waterMark.remove();
};
const initialInit = () => {
  globalNavInit();
  aniTextInit();
  quickMenuInit();
  calendarInit();
  popupInit();
  popupTabInit();
  removeWaterMark();
};

initialInit();
