import getParam from "./getHabit.mjs";
import { loadHeaderFooter } from "./partials.mjs";
import computeStreak from "./computeStreak.mjs";
import { showCalEvents } from "./calendar.mjs";
import { startFirestore, getDocument } from './firestore.mjs';
import { setEventListeners } from "./calendar.mjs";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { setDarkMode } from "./darkmode.mjs";
import loadLogin from "./authentication.mjs";
import "../styles/style.css";
import "../styles/jsCalendar.css";
import "/images/favicon.ico";

setDarkMode();

const app = startFirestore();
const db = getFirestore(app);
const auth = getAuth(app);
const habitDatabaseName = "habits";

async function loadPartialsAndLogin() {
    try {
        await loadHeaderFooter();
    } catch (err) {
        console.log(err);
    }

    try {
        await loadLogin(auth);
    } catch (err) {
        console.log(err);
    }
}
loadPartialsAndLogin();

onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log("User is signed in:", user);

        //Get the habit details from the URL
        const HABIT_ID = getParam("habitId");

        try {
            const habit = await getDocument(db, habitDatabaseName, HABIT_ID);
            renderHabitDetails(habit);
            showCalEvents(habit.completed);
            setEventListeners(db, habitDatabaseName, HABIT_ID);
        } catch (err) {
            console.log(err);
        }
    } else {
        alert("No user is signed in.");
    }
});

//Render the habit details to the DOM
function renderHabitDetails(habit) {
    let title = document.getElementById("habit-name");
    let habitCategory = document.getElementById("habit-category-text");
    let habitDescription = document.getElementById("habit-description-text");
    let streakCount = document.getElementById("streak-number");

    if (habit.completed != null) {
        let mappedArray = habit.completed.map(day => day.toDate());
        mappedArray.sort();
        streakCount.innerHTML = computeStreak(mappedArray);
    } else {
        streakCount.innerHTML = 0;
    }

    title.innerHTML = habit.habitName;
    habitCategory.innerHTML = habit.habitCategory;
    habitDescription.innerHTML = habit.habitDescription;
}