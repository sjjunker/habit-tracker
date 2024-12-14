import getParam from "./getHabit.mjs";
import { loadHeaderFooter } from "./partials.mjs";
import computeStreak from "./computeStreak.mjs";
import { showCalEvents } from "./calendar.mjs";
import { startFirestore, getDocument } from './firestore.mjs';
import { setEventListeners } from "./calendar.mjs";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { setDarkMode } from "./darkmode.mjs";
import loadLogin from "./authentication.mjs";
import "../styles/style.css";
import "../styles/jsCalendar.css";
import "/images/favicon.ico";

setDarkMode();

const app = startFirestore();
const db = getFirestore(app);
const auth = getAuth();
const habitDatabaseName = "habits";

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


    } else {
        console.log("No user is signed in.");
    }
});