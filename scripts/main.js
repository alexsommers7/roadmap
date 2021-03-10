'use strict'

//////////////////////////////
// DETAILS TOGGLE
//////////////////////////////

// dom elements
const msTrigger = document.querySelectorAll(".milestone__trigger");
const msDetails = document.querySelectorAll(".milestone__details");
const msDetailsClose = document.querySelectorAll(".details__close");

// toggle each milestone's details on click of trigger
msTrigger.forEach((trigger, i) => trigger.addEventListener("click", function() {
  msDetails[i].classList.toggle("details--active");
}))

// close each milestone's details on click of "x" button
msDetailsClose.forEach((x, i) => x.addEventListener("click", function() {
  msDetails[i].classList.remove("details--active");
}))


//////////////////////////////
// MILESTONE FILTERING
//////////////////////////////

// dom elements
const milestones = document.querySelectorAll(".milestone");
const milestoneTriggers = document.querySelectorAll(".milestone .milestone__trigger");
const milestonesLeft = document.querySelectorAll(".milestone.left");
const milestonesRight = document.querySelectorAll(".milestone.right");
const filterWrapper = document.querySelector(".filter");
const filterTrigger = document.querySelector(".filter__trigger");
const filterBtns = document.querySelectorAll(".filter__btn");

// filter button functionality
filterBtns.forEach(btn => btn.addEventListener("click", function() {
  const filter = this.getAttribute("data-filter");
  let toShow, toHide, triggers
  if (filter !== "all") {
    toShow = document.querySelectorAll(`.milestone[data-milestone-category='${filter}']`);
    toHide = document.querySelectorAll(`.milestone:not([data-milestone-category='${filter}'])`);
    triggers = document.querySelectorAll(`.milestone[data-milestone-category='${filter}'] .milestone__trigger`);
  } else {
    toShow = document.querySelectorAll(`.milestone`);
    triggers = document.querySelectorAll(`.milestone .milestone__trigger`);
  }
  updateUI(toShow, toHide, triggers);
}))

// function to update roadmap content based on filter
function updateUI(show, hide, triggers) {

  // remove left-right associations from all milestones
  milestones.forEach(m => {
    m.classList.remove("left");
    m.classList.remove("right");
  });

  // hide all elements that do not meet filter criteria
  hide?.forEach(item => item.classList.add("hide"));  

  // display items that do meet filter criteria, add left-right association, adjust trigger #s
  show?.forEach((item, i) => {
    i % 2 === 0 ? item.classList.add("left") : item.classList.add("right");
    triggers[i].textContent = `${i + 1}`;
    item.classList.remove("hide");
  });
}

// dropdown filter for mobile
[...filterBtns, filterTrigger].forEach(btn => btn.addEventListener("click", function() {
  filterBtns.forEach(btn => btn.classList.toggle("visible"));
  filterWrapper.classList.toggle("active");
}))
