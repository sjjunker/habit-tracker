import getParam from "./getHabit.mjs";
import { loadHeaderFooter } from "./partials.mjs";
//import { createCalendar } from "./calendar.mjs";
import computeStreak from "./computeStreak.mjs";
import "../styles/style.css";
import "../../node_modules/simple-jscalendar/source/jsCalendar.css";
import "../../node_modules/simple-jscalendar/source/jsCalendar.js";
import "/images/favicon.ico?url";

loadHeaderFooter();
//createCalendar();

const HABIT_NAME = getParam("habitName");
const HABIT_CATEGORY = getParam("habitCategory");
const HABIT_DESCRIPTION = getParam("habitDescription");
const HABIT_GOAL = getParam("habitGoal");
const HABIT_FREQUENCY = getParam("habitFrequency");
const SET_REMINDER = getParam("setReminder");
const COMPLETED = getParam("completed");

renderHabitDetails();

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