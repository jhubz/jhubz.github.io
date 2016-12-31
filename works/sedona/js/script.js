var mainMenu = document.querySelector(".main-nav");
var mainMenuButton = document.querySelector(".page-header__nav-toggle");
var logo = document.querySelector(".page-header__logo");

mainMenu.classList.remove("main-nav--opened");
mainMenu.classList.add("main-nav--closed");

mainMenuButton.classList.remove("page-header__nav-toggle--close");
mainMenuButton.classList.add("page-header__nav-toggle--open");

logo.classList.remove("page-header__logo--opened-menu");
logo.classList.add("page-header__logo--closed-menu");

mainMenuButton.addEventListener("click", function (event) {
  event.preventDefault();

  if(mainMenuButton.classList.contains("page-header__nav-toggle--open")) {
    console.log("Открытие");
    mainMenuButton.classList.remove("page-header__nav-toggle--open");
    mainMenuButton.classList.add("page-header__nav-toggle--close");

    mainMenu.classList.remove("main-nav--closed");
    mainMenu.classList.add("main-nav--opened");

    logo.classList.remove("page-header__logo--closed-menu");
    logo.classList.add("page-header__logo--opened-menu");

    return;
  }

  if(mainMenuButton.classList.contains("page-header__nav-toggle--close")) {
    console.log("Закрытие");
    mainMenuButton.classList.remove("page-header__nav-toggle--close");
    mainMenuButton.classList.add("page-header__nav-toggle--open");

    mainMenu.classList.remove("main-nav--opened");
    mainMenu.classList.add("main-nav--closed");

    logo.classList.remove("page-header__logo--opened-menu");
    logo.classList.add("page-header__logo--closed-menu");

    return;
  }

});
