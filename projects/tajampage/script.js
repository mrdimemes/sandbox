
/* header burger menu interaction */

var headerBurger = document.querySelector(".header__burger");
var headerNav = document.querySelector(".header__nav");
var headerNavBackground = document.querySelector(".header__nav-background");

function toggleHeaderBurger() {
  headerNav.classList.toggle("active");
  headerBurger.classList.toggle("active");
  headerNavBackground.classList.toggle("active");
}

headerBurger.addEventListener("click", toggleHeaderBurger);



/* slider-1 interaction */

var sliderOne = document.querySelector(".slider-1");
var sliderOneMarkersArray = Array.from(sliderOne.querySelectorAll(".slider__marker"));
var sliderOneItemsArray = Array.from(sliderOne.querySelectorAll(".slider__item"));


//slider-1 marker click handler
function toggleSliderOneByMarker() {
  // Active-marker interaction will not processing
  if (this.classList.contains("active")) {
    return;
  }

  // Make the current active-marker and its corresponding item inactive
  let activeMarker = sliderOne.querySelector(".slider__marker.active");
  let activeItem = sliderOne.querySelector(".slider__item.active");
  activeMarker.classList.toggle("active");
  activeItem.classList.toggle("active");

  // Make the clicked marker and its corresponding item active
  let targetIndex = sliderOneMarkersArray.indexOf(this);
  let targetItem = sliderOneItemsArray[targetIndex];
  this.classList.toggle("active");
  targetItem.classList.toggle("active");
}


for (let marker of sliderOneMarkersArray) {
  marker.addEventListener("click", toggleSliderOneByMarker);
}



/* slider-2 interaction */

var sliderTwo = document.querySelector(".slider-2");
var sliderTwoMarkersArray = Array.from(sliderTwo.querySelectorAll(".slider__marker"));
var sliderTwoItemsArray = Array.from(sliderTwo.querySelectorAll(".slider__item"));

//slider-2 marker click handler
function toggleSliderTwoByMarker() {
  // Active-marker interaction will not processing
  if (this.classList.contains("active")) {
    return;
  }

  // Make the current active-marker and its corresponding item inactive
  let activeMarker = sliderTwo.querySelector(".slider__marker.active");
  let activeItem = sliderTwo.querySelector(".slider__item.active");
  activeMarker.classList.toggle("active");
  activeItem.classList.toggle("active");

  // Make the clicked marker and its corresponding item active
  let targetIndex = sliderTwoMarkersArray.indexOf(this);
  let targetItem = sliderTwoItemsArray[targetIndex];
  this.classList.toggle("active");
  targetItem.classList.toggle("active");

  // Clear all marker position classes
  for (let marker of sliderTwoMarkersArray) {
    if (marker.classList.contains("first")) {
      marker.classList.remove("first");
    } else if (marker.classList.contains("second")) {
      marker.classList.remove("second");
    } else if (marker.classList.contains("third")) {
      marker.classList.remove("third");
    } else if (marker.classList.contains("fourth")) {
      marker.classList.remove("fourth");
    }
  }

  // Set new marker position classes
  let markersArrayCopy = sliderTwoMarkersArray.slice();
  markersArrayCopy.splice(targetIndex, 1);
  markersArrayCopy[0].classList.add("first");
  markersArrayCopy[1].classList.add("second");
  markersArrayCopy[2].classList.add("third");
  markersArrayCopy[3].classList.add("fourth");
}


for (let marker of sliderTwoMarkersArray) {
  marker.addEventListener("click", toggleSliderTwoByMarker);
}
