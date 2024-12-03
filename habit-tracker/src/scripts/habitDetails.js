import getParam from "./getHabit.mjs";
import { loadHeaderFooter } from "./partials.mjs";
import { createCalendar } from "./calendar.mjs";
import "../styles/style.css";
import "../../node_modules/jcalendar.js/dist/calendar.js.css";

loadHeaderFooter();
createCalendar();

const HABIT_NAME = getParam("habitName");
const HABIT_CATEGORY = getParam("habitCategory");
const HABIT_DESCRIPTION = getParam("habitDescription");
const HABIT_GOAL = getParam("habitGoal");
const HABIT_FREQUENCY = getParam("habitFrequency");
const SET_REMINDER = getParam("setReminder");

renderHabitDetails();

function renderHabitDetails(HABIT) {
    let title = document.getElementById("habit-name");
    let habitCategory = document.getElementById("habit-category-text");
    let habitDescription = document.getElementById("habit-description-text");

    title.innerHTML = HABIT_NAME;
    habitCategory.innerHTML = HABIT_CATEGORY;
    habitDescription.innerHTML = HABIT_DESCRIPTION;
}