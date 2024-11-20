import "../styles/style.css";
import { loadHeaderFooter } from './partials.mjs';
import { startFirestore, readData } from './firestore.mjs';
import { login } from "./Authentication.mjs";

loadHeaderFooter();
loadLogin();
const db = startFirestore();
const habitDatabaseName = "habits";

//Get the list of habits
const habitList = await readData(db, habitDatabaseName);
console.log(habitList);
renderHabitsList()

//Render the list to the HTML
function renderHabitsList() {
  const habitsList = document.getElementById("habits-list");
  let idName = 0;

  habitList.forEach(habit => {
    let habitLi = document.createElement("li");
    let checkBox = document.createElement("input");
    let habitName = document.createElement("h3");
    let progressBarInner = document.createElement("div");
    let progressBarOutter = document.createElement("div");

    //Set attributes
    habitName.innerHTML = habit.name;

    checkBox.type = "checkbox";
    checkBox.name = `isCompleted${idName}`;
    checkBox.id = `isCompleted${idName}`;
    checkBox.className("checkbox");

    progressBarInner.class = "progress-bar-inner";
    progressBarOutter.class = "progress-bar-outter";
    progressBarOutter.appendChild(progressBarInner);

    //Add to li
    habitLi.appendChild(checkBox);
    habitLi.appendChild(habitName);
    habitLi.appendChild(progressBarOutter);

    //Add to ul
    habitsList.appendChild(habitLi);

    //increment habit id
    idName += 1;
  });
}


//Login Modal
export function loadLogin() {
  var modal = document.getElementById("loginModal");
  var showButton = document.getElementById("show-login");
  var submitButton = document.getElementById("login-submit");

  //Open the modal on click
  showButton.addEventListener("click", () => {
    modal.style.display = "block";
  });

  //Close the modal on click
  submitButton.addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
    console.log(email);
    modal.style.display = "none";
  });

  // When the user clicks anywhere outside of the modal, close it
  window.addEventListener("click", (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
}



