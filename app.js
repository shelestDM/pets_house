let left_btn = document.getElementById("left");
let right_btn = document.getElementById("right");
let slides = document.querySelectorAll(".slide");

console.log(window.innerWidth);
let correction = 20;
let slider_correction = 0;

if(window.innerWidth>768 &&  window.innerWidth<1280){
  correction = 40;
  slider_correction = 1;
}else if( window.innerWidth>1280){
  correction = 60;
  slider_correction = 2;
}

console.log(correction);
let count = 0;

right_btn.addEventListener("click", () => {
  count++;
  MoveSlides(count);
  console.log('lef');
});

left_btn.addEventListener("click", () => {
  count--;
  MoveSlides(count);
  console.log('right');
});


function MoveSlides(iterator) {
  if (iterator === slides.length - slider_correction) {
    count = 0;
  } else if (iterator < 0) {
    count = slides.length - 1 - slider_correction;
  }
  TranslateSlides();
}

function TranslateSlides() {
  slides.forEach((slide) => {
    slide.style.transform = `translateX(calc( ${-count * 100}% + ${-count*correction}px))`;
  });
}
