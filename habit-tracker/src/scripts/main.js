import "../styles/style.css";
import { loadHeaderFooter } from './headerFooter.mjs';
import { startFirestore, readData } from './firestore.mjs';

loadHeaderFooter();
const db = startFirestore();
const habitDatabaseName = "habits";

//Get the list of habits
const habitList = readData(db, habitDatabaseName);

//Render the list to the HTML
function renderHabitsList() {
  const habitsList = document.getElementById("habits-list");

  habitList.forEach(habit => {
    let habitLi = document.createElement("li");
    //TODO: Finish rendering the habits list

  });
}



