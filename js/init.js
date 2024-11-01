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
  const select = document.querySelector(".flatpickr-monthDropdown-months");
  select.disabled = true;
};
const popupInit = () => {
  const reservBtn = document.querySelector("#quick_menu .menu .reserv button");
  const popupBg = document.querySelector("#pc_pop_up .bg");
  const closeBtn = document.querySelector(
    "#pc_pop_up .window > .header > button"
  );
  const popup = document.querySelector("#pc_pop_up");

  reservBtn.addEventListener("click", () => {
    popup.classList.add("active_now");
    myFullpage.setAllowScrolling(false);
  });
  popupBg.addEventListener("click", () => {
    popup.classList.remove("active_now");
    myFullpage.setAllowScrolling(true);
  });
  closeBtn.addEventListener("click", () => {
    popup.classList.remove("active_now");
    myFullpage.setAllowScrolling(true);
  });
};
const popupTabInit = () => {
  const btns = document.querySelectorAll(
    "#pc_pop_up .window .content .tab_time_table .tab li button"
  );

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!btn.classList.contains("active_now")) {
        const activeBtn = document.querySelector(
          "#pc_pop_up .window .content .tab_time_table .tab li button.active_now"
        );
        activeBtn.classList.remove("active_now");
        btn.classList.add("active_now");
      }
    });
  });
};
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
