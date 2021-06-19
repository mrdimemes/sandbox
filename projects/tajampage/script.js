
/* slider-1 interaction */

var sliderOne = document.querySelector(".slider-1");
var sliderOneMarkersArray = Array.from(sliderOne.querySelectorAll(".slider__marker"));
var sliderOneItemsArray = Array.from(sliderOne.querySelectorAll(".slider__item"));


//slider-1 marker click handler
function toggleSliderOne() {
  // Active-marker interaction will not processing
  if (this.classList.contains("active")) {
    return;
  }

  // Make the current marker and its corresponding item inactive
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
  marker.addEventListener("click", toggleSliderOne);
}
