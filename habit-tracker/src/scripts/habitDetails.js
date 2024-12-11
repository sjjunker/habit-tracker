import getParam from "./getHabit.mjs";
import { loadHeaderFooter } from "./partials.mjs";
import computeStreak from "./computeStreak.mjs";
import { showCalEvents } from "./calendar.mjs";
import "../styles/style.css";
import "../styles/jsCalendar.css";
import "/images/favicon.ico";

loadHeaderFooter();

const HABIT_NAME = getParam("habitName");
const HABIT_CATEGORY = getParam("habitCategory");
const HABIT_DESCRIPTION = getParam("habitDescription");
const HABIT_GOAL = getParam("habitGoal");
const HABIT_FREQUENCY = getParam("habitFrequency");
const SET_REMINDER = getParam("setReminder");
const COMPLETED = getParam("completed");

renderHabitDetails();
showCalEvents(COMPLETED);

function renderHabitDetails() {
    let title = document.getElementById("habit-name");
    let habitCategory = document.getElementById("habit-category-text");
    let habitDescription = document.getElementById("habit-description-text");
    let streakCount = document.getElementById("streak-number");

    title.innerHTML = HABIT_NAME;
    habitCategory.innerHTML = HABIT_CATEGORY;
    habitDescription.innerHTML = HABIT_DESCRIPTION;
    streakCount.innerHTML = computeStreak(COMPLETED);
}