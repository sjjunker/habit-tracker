import getParam from "./getHabit.mjs";
import { loadHeaderFooter } from "./partials.mjs";
import computeStreak from "./computeStreak.mjs";
import { showCalEvents } from "./calendar.mjs";
import { startFirestore, getHabit } from './firestore.mjs';
import { setEventListeners } from "./calendar.mjs";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "../styles/style.css";
import "../styles/jsCalendar.css";
import "/images/favicon.ico";

const app = startFirestore();
const auth = getAuth();
const habitDatabaseName = "habits";

try {
    await loadHeaderFooter();
} catch (err) {
    console.log(err);
}

//Load the database
const db = getFirestore(app);

//Get the habit details from the URL
const HABIT_ID = getParam("habitId");

try {
    const habit = await getHabit(db, habitDatabaseName, HABIT_ID);
    renderHabitDetails(habit);
    showCalEvents(habit.completed);
    setEventListeners(db, habitDatabaseName, HABIT_ID);
} catch (err) {
    console.log(err);
}

//Render the habit details to the DOM
function renderHabitDetails(habit) {
    let title = document.getElementById("habit-name");
    let habitCategory = document.getElementById("habit-category-text");
    let habitDescription = document.getElementById("habit-description-text");
    let streakCount = document.getElementById("streak-number");
    let mappedArray = habit.completed.map(day => day.toDate());

    title.innerHTML = habit.habitName;
    habitCategory.innerHTML = habit.habitCategory;
    habitDescription.innerHTML = habit.habitDescription;
    streakCount.innerHTML = computeStreak(mappedArray);
}