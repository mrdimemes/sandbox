
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



/* general sliders interaction */

var sliderTouchStartX;
var sliderTouchEndX;
var sliderSwipeLength;
var sliderIsTouching;


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

// slider-1 touchscreen interaction

function sliderOneSwipeEnd() {
  if (!sliderTouching) {
    return;
  }


  sliderSwipeLength  = sliderTouchEndX - sliderTouchStartX;

  if (Math.abs(sliderSwipeLength) > (0.33 * document.documentElement.clientWidth)) {
    if (sliderSwipeLength > 0) {
      sliderOneNext();
    } else {
      sliderOnePrevious();
    }
  }

  sliderTouching = false;
}

function sliderOneNext() {
  // Make the current active-marker and its corresponding item inactive
  let activeMarker = sliderOne.querySelector(".slider__marker.active");
  let activeItem = sliderOne.querySelector(".slider__item.active");
  activeMarker.classList.toggle("active");
  activeItem.classList.toggle("active");

  // Get index of next item
  let activeIndex = sliderOneMarkersArray.indexOf(activeMarker);
  let targetIndex = (activeIndex + 1) % sliderOneMarkersArray.length;

  // Make the target marker and its corresponding item active
  let targetMarker = sliderOneMarkersArray[targetIndex];
  let targetItem = sliderOneItemsArray[targetIndex];
  targetMarker.classList.toggle("active");
  targetItem.classList.toggle("active");
}

function sliderOnePrevious() {
  // Make the current active-marker and its corresponding item inactive
  let activeMarker = sliderOne.querySelector(".slider__marker.active");
  let activeItem = sliderOne.querySelector(".slider__item.active");
  activeMarker.classList.toggle("active");
  activeItem.classList.toggle("active");

  // Get index of next item
  let activeIndex = sliderOneMarkersArray.indexOf(activeMarker);
  let targetIndex = (((activeIndex - 1) % sliderOneMarkersArray.length)
    + sliderOneMarkersArray.length) % sliderOneMarkersArray.length;

  // Make the target marker and its corresponding item active
  let targetMarker = sliderOneMarkersArray[targetIndex];
  let targetItem = sliderOneItemsArray[targetIndex];
  targetMarker.classList.toggle("active");
  targetItem.classList.toggle("active");
}


sliderOne.addEventListener("touchstart", sliderSwipeStart);
sliderOne.addEventListener("touchend", sliderOneSwipeEnd);
sliderOne.addEventListener("touchmove", sliderSwipeMove);
sliderOne.addEventListener("touchcancel", sliderSwipeCancel);




/* slider-2 interaction */

var sliderTwo = document.querySelector(".slider-2");
var sliderTwoMarkersArray = Array.from(sliderTwo.querySelectorAll(".slider__marker"));
var sliderTwoItemsArray = Array.from(sliderTwo.querySelectorAll(".slider__item"));
var sliderTwoBackArrow = sliderTwo.querySelector(".slider__back");
var sliderTwoWorwardArrow = sliderTwo.querySelector(".slider__forward");


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

// slider-2 touchscreen interaction

function sliderTwoSwipeEnd() {
  if (!sliderTouching) {
    return;
  }


  sliderSwipeLength  = sliderTouchEndX - sliderTouchStartX;

  if (Math.abs(sliderSwipeLength) > (0.33 * document.documentElement.clientWidth)) {
    if (sliderSwipeLength > 0) {
      sliderTwoNext();
    } else {
      sliderTwoPrevious();
    }
  }

  sliderTouching = false;
}

function sliderTwoNext() {
  // Make the current active-marker and its corresponding item inactive
  let activeMarker = sliderTwo.querySelector(".slider__marker.active");
  let activeItem = sliderTwo.querySelector(".slider__item.active");
  activeMarker.classList.toggle("active");
  activeItem.classList.toggle("active");

  // Get index of next item
  let activeIndex = sliderTwoMarkersArray.indexOf(activeMarker);
  let targetIndex = (activeIndex + 1) % sliderTwoMarkersArray.length;

  // Make the target marker and its corresponding item active
  let targetMarker = sliderTwoMarkersArray[targetIndex];
  let targetItem = sliderTwoItemsArray[targetIndex];
  targetMarker.classList.toggle("active");
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

function sliderTwoPrevious() {
  // Make the current active-marker and its corresponding item inactive
  let activeMarker = sliderTwo.querySelector(".slider__marker.active");
  let activeItem = sliderTwo.querySelector(".slider__item.active");
  activeMarker.classList.toggle("active");
  activeItem.classList.toggle("active");

  // Get index of next item
  let activeIndex = sliderTwoMarkersArray.indexOf(activeMarker);
  let targetIndex = (((activeIndex - 1) % sliderOneMarkersArray.length)
    + sliderOneMarkersArray.length) % sliderOneMarkersArray.length;

  // Make the target marker and its corresponding item active
  let targetMarker = sliderTwoMarkersArray[targetIndex];
  let targetItem = sliderTwoItemsArray[targetIndex];
  targetMarker.classList.toggle("active");
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


sliderTwo.addEventListener("touchstart", sliderSwipeStart);
sliderTwo.addEventListener("touchend", sliderTwoSwipeEnd);
sliderTwo.addEventListener("touchmove", sliderSwipeMove);
sliderTwo.addEventListener("touchcancel", sliderSwipeCancel);

sliderTwoWorwardArrow.addEventListener("click", sliderTwoNext);
sliderTwoBackArrow.addEventListener("click", sliderTwoPrevious);
