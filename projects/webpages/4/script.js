// burger menu
let headerBurgerIcon = document.querySelector(".header__burger-icon");
let headerNav = document.querySelector(".header__nav");

function toggleBurger() {
  headerBurgerIcon.classList.toggle("active");
  headerNav.classList.toggle("active");
}

headerBurgerIcon.addEventListener("click", toggleBurger);