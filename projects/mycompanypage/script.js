// burger menu
let headerBurgerIcon = document.querySelector(".header__burger-icon");

function toggleBurger() {
  headerBurgerIcon.classList.toggle("active");
}

headerBurgerIcon.addEventListener("click", toggleBurger);