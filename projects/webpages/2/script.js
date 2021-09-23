// Burger
let headerBurger = document.querySelector(".header__burger");
let headerNav = document.querySelector(".header__nav");
let mainScreen = document.querySelector(".main-screen");

function toggleBurger() {
  headerBurger.classList.toggle("active");
  headerNav.classList.toggle("active");
  mainScreen.classList.toggle("active");
}

headerBurger.addEventListener("click", toggleBurger);



//slider

//marker interaction
let sliderMarkers = document.querySelectorAll(".slider__marker");

function toggleSlider() {
  if (this.classList.contains("active")) {
    return;
  }

  let activeMarker = document.querySelector(".slider__marker.active");
  let activeItem = document.querySelector(".slider__item.active");

  if (this.classList.contains("slider__marker-1")) {
    let targetItem = document.querySelector(".slider__item-1");
    targetItem.classList.toggle("active");
  } else if (this.classList.contains("slider__marker-2")) {
    let targetItem = document.querySelector(".slider__item-2");
    targetItem.classList.toggle("active");
  } else {
    let targetItem = document.querySelector(".slider__item-3");
    targetItem.classList.toggle("active");
  }

  activeMarker.classList.toggle("active");
  activeItem.classList.toggle("active");

  this.classList.toggle("active");
}

for (let marker of sliderMarkers) {
  marker.addEventListener("click", toggleSlider);
}

//touchscreen interaction
let slider = document.querySelector(".slider");

var sliderTouchStartX;
var sliderTouchEndX;
var sliderSwipeLength;
var sliderIsTouching;


function sliderNext() {
  let activeMarker = document.querySelector(".slider__marker.active");
  let activeItem = document.querySelector(".slider__item.active");

  if (activeMarker.classList.contains("slider__marker-1")) {
    document.querySelector(".slider__marker-2").classList.toggle("active");
    document.querySelector(".slider__item-2").classList.toggle("active");
  } else if (activeMarker.classList.contains("slider__marker-2")) {
    document.querySelector(".slider__marker-3").classList.toggle("active");
    document.querySelector(".slider__item-3").classList.toggle("active");
  } else {
    document.querySelector(".slider__marker-1").classList.toggle("active");
    document.querySelector(".slider__item-1").classList.toggle("active");
  }

  activeMarker.classList.toggle("active");
  activeItem.classList.toggle("active");
}

function sliderPrevious() {
  let activeMarker = document.querySelector(".slider__marker.active");
  let activeItem = document.querySelector(".slider__item.active");

  if (activeMarker.classList.contains("slider__marker-1")) {
    document.querySelector(".slider__marker-3").classList.toggle("active");
    document.querySelector(".slider__item-3").classList.toggle("active");
  } else if (activeMarker.classList.contains("slider__marker-2")) {
    document.querySelector(".slider__marker-1").classList.toggle("active");
    document.querySelector(".slider__item-1").classList.toggle("active");
  } else {
    document.querySelector(".slider__marker-2").classList.toggle("active");
    document.querySelector(".slider__item-2").classList.toggle("active");
  }

  activeMarker.classList.toggle("active");
  activeItem.classList.toggle("active");
}


function sliderSwipeStart() {
  sliderTouchStartX = event.touches[0].clientX;
  sliderTouching = true;
}

function sliderSwipeMove() {
  sliderTouchEndX = event.touches[0].clientX;
}

function sliderSwipeCancel() {
  sliderTouching = false;
}

function sliderSwipeEnd() {
  if (!sliderTouching) {
    return;
  }


  sliderSwipeLength  = sliderTouchEndX - sliderTouchStartX;

  if (Math.abs(sliderSwipeLength) > (0.33 * document.documentElement.clientWidth)) {
    if (sliderSwipeLength > 0) {
      sliderNext();
    } else {
      sliderPrevious();
    }
  }

  sliderTouching = false;
}


slider.addEventListener("touchstart", sliderSwipeStart);
slider.addEventListener("touchend", sliderSwipeEnd);
slider.addEventListener("touchmove", sliderSwipeMove);
slider.addEventListener("touchcancel", sliderSwipeCancel);




//Mailing form decoration
let mailingButton = document.querySelector(".mailing__button");

function mailingButtonHover() {
  document.querySelector(".mailing__invite").classList.toggle("active");
}

mailingButton.addEventListener("mouseover", mailingButtonHover);
mailingButton.addEventListener("mouseout", mailingButtonHover);
