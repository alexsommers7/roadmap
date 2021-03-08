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
const btnOpenFilter = document.querySelector(".filter__trigger");
const filterWrapper = document.querySelector(".filter");
const btnCourses = document.querySelector("[data-filter='courses']");
const btnBooks = document.querySelector("[data-filter='books']");
const btnProjects = document.querySelector("[data-filter='projects']");
const btnsFilter = [btnCourses, btnBooks, btnProjects]; // add any new buttons here and create query above
const btnShowAll = document.querySelector("[data-filter='all']");

// filter button functionality
btnsFilter.forEach(btn => btn.addEventListener("click", function() {
  const filter = this.getAttribute("data-filter");
  const toShow = document.querySelectorAll(`.milestone[data-milestone-category='${filter}']`);
  const toHide = document.querySelectorAll(`.milestone:not([data-milestone-category='${filter}'])`);
  const triggers = document.querySelectorAll(`.milestone[data-milestone-category='${filter}'] .milestone__trigger`);
  updateUI(toShow, toHide, triggers);
}))

// show all button functionality
btnShowAll.addEventListener("click", function() {
  updateUI(milestones, null, milestoneTriggers);
})

// function to update roadmap content based on filter
function updateUI(show, hide, triggers) {

  // remove left-right associations from all milestones
  milestones.forEach(m => {
    m.classList.remove("left");
    m.classList.remove("right");
  });

  // hide all elements that do not meet filter criteria
  hide?.forEach(item => item.classList.add("hide"));  

  // display items that do meet filter criteria, add left-right association, adjust trigger #
  show.forEach((item, i) => {
    i % 2 === 0 ? item.classList.add("left") : item.classList.add("right");
    triggers[i].textContent = `${i + 1}`;
    item.classList.remove("hide");
  });
}

// filter button for mobile
btnOpenFilter.addEventListener("click", function() {
  btnsFilter.forEach(btn => btn.classList.toggle("visible"));
  btnShowAll.classList.toggle("visible");
  filterWrapper.classList.toggle("active");
})
