import "../styles/style.css";
import { loadHeaderFooter } from './partials.mjs';
import { startFirestore, readData } from './firestore.mjs';
import { login } from "./Authentication.mjs";

loadHeaderFooter();
loadLogin();
const db = startFirestore();
const habitDatabaseName = "habits";
let habitList;

//Get the list of habits
async function loadHabitList() {
  habitList = await readData(db, habitDatabaseName);
  console.log(habitList);
  renderHabitsList(habitList);
}


//Render the list to the HTML
function renderHabitsList(habits) {
  const habitsList = document.getElementById("habits-list");
  let idName = 0;

  habits.forEach(habit => {
    let habitLi = document.createElement("li");
    let habitLiDiv = document.createElement("div");
    let checkBox = document.createElement("input");
    let habitName = document.createElement("h3");
    let progressBarInner = document.createElement("div");
    let progressBarOutter = document.createElement("div");

    //Set attributes
    habitName.innerHTML = habit.habitName;

    checkBox.type = "checkbox";
    checkBox.name = `isCompleted${idName}`;
    checkBox.id = `isCompleted${idName}`;
    checkBox.className = "checkboxClass";

    progressBarInner.id = "progress-bar-inner";
    progressBarInner.className = "progress-bar-inner-class";
    progressBarOutter.id = "progress-bar-outter";
    progressBarOutter.className = "progress-bar-outter-class";
    progressBarOutter.appendChild(progressBarInner);

    //Add to li
    habitLiDiv.appendChild(checkBox);
    habitLiDiv.appendChild(habitName);
    habitLiDiv.appendChild(progressBarOutter);
    habitLi.appendChild(habitLiDiv);

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
  submitButton.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
    console.log(email);
    modal.style.display = "none";
    try {
      loadHabitList();
    } catch (error) {
      console.error("Error:", error);
    }
  });

  // When the user clicks anywhere outside of the modal, close it
  window.addEventListener("click", (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
}



