//variable
const courses = document.getElementById("courses-list");
const shoppingCartContent = document.querySelector("#cart-content tbody");
const clrCartBtn = document.getElementById("clear-cart");
//listeners
loadEventListeners();

function loadEventListeners() {
  //when a courses are added
  courses.addEventListener("click", buyCourse);
  //when the remove button is clicked
  shoppingCartContent.addEventListener("click", removeCourse);
  //clear cart button
  clrCartBtn.addEventListener("click", clearCart);
  //Document ready
  document.addEventListener("DOMContentLoaded", getFromLocalStorage);
}
//functions
function buyCourse(e) {
  e.preventDefault();
  // use the delegation to find the course that was added
  if (e.target.classList.contains("add-to-cart")) {
    //read the course values
    const course = e.target.parentElement.parentElement;
    //read the values
    getCourseInfo(course);
  }
}
//Read the info of the selected course
function getCourseInfo(course) {
  const courseInfo = {
    image: course.querySelector("img").src,
    title: course.querySelector("h4").textContent,
    price: course.querySelector(".price span").textContent,
    id: course.querySelector("a").getAttribute("data-id"),
  };
  //console.log(courseInfo);
  //insert to the shopping cart
  addIntoCart(courseInfo);
}
//display the selected course into the shopping cart
function addIntoCart(course) {
  //create a <tr></tr>
  const row = document.createElement("tr");
  //build the template
  row.innerHTML = `
  <tr>
  <td>
  <img src="${course.image}" width=100>
  </td>
  <td>
  ${course.title}
  </td>
  <td>
  ${course.price}
  </td>
  <td>
  <a href="#" class="remove" data-id=${course.id}>X</a>
  </td>
  </tr>
  `;
  //Add into the shopping shoppingCart
  shoppingCartContent.appendChild(row);
  //add course to the local storage
  saveIntoStorage(course);
}
//add courses to the local storage
function saveIntoStorage(course) {
  let courses = getCoursesFromStorage();
  //add courses into array
  courses.push(course);
  //convert JSON into string because storage le chai string ma matra save garx
  localStorage.setItem("courses", JSON.stringify(courses));
}
//get content from storage
function getCoursesFromStorage() {
  let courses;
  //if something exist on storage then we get the value, otherwise create an empty array
  if (localStorage.getItem("courses") === null) {
    courses = [];
  } else {
    courses = JSON.parse(localStorage.getItem("courses"));
  }
  return courses;
}

//remove course from the cart
function removeCourse(e) {
  if (e.target.classList.contains("remove")) {
    e.target.parentElement.parentElement.remove();
    course = e.target.parentElement.parentElement;
    courseId = course.querySelector("a").getAttribute("data-id");
  }
  //remove from the local storage
  removeCourseLocalStorage(courseId);
}
function removeCourseLocalStorage(id) {
  let coursesLS = getCoursesFromStorage();
  //loop through the array and find the index to remove

  coursesLS.forEach(function (courseLS, index) {
    if (courseLS.id === id) {
      courseLS.splice(index, 1);
    }
  });
  //Add the rest of the array
  localStorage.setItem("courses", JSON.stringify(courseLS));
}
//clear the shopping cart

function clearCart() {
  //shoppingCartContent.innerHTML = "";
  while (shoppingCartContent.firstChild) {
    shoppingCartContent.removeChild(shoppingCartContent.firstChild);
  }
  //Clear from the local storage
  clearLocalStorage();
}
//clear the whole local storage
function clearLocalStorage() {
  localStorage.clear();
}

//Load when when document is ready and print courses into shopping cart
function getFromLocalStorage() {
  let coursesLS = getCoursesFromStorage();
  coursesLS.forEach(function (course) {
    //create the <tr></tr>
    const row = document.createElement("tr");
    //build the template
    row.innerHTML = `
  <tr>
  <td>
  <img src="${course.image}" width=100>
  </td>
  <td>
  ${course.title}
  </td>
  <td>
  ${course.price}
  </td>
  <td>
  <a href="#" class="remove" data-id=${course.id}>X</a>
  </td>
  </tr>
  `;
    //Add into the shopping shoppingCart
    shoppingCartContent.appendChild(row);
  });
}
