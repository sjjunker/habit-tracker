import { jsCalendar } from "./jsCalendar.mjs";
import { addDate, removeDate } from "./firestore.mjs";
import { Timestamp } from "firebase/firestore";
import computeStreak from "./computeStreak.mjs";
import { readCompletedArray } from "./firestore.mjs";

let calendarDiv = document.getElementById("calendar");
let calendar = jsCalendar.new(calendarDiv);

export function showCalEvents(completedDates) {
    //Set the completedDates array elements to dates
    let dateArray = [];

    completedDates.forEach(element => {
        let dateElement = new Date(element);
        dateArray.push(dateElement);
    });

    //Select the completed dates
    calendar.select(dateArray);
}

export async function setEventListeners(db, collection, habitId) {
    let streakElement = document.getElementById("streak-number");
    let completed;

    calendar.onDateClick(async function (event, date) {
        let newTimestamp = Timestamp.fromDate(date);

        if (!calendar.isSelected(date)) {
            //If the date is not yet selected then select, and add to firestore
            calendar.select(date);
            await addDate(db, collection, habitId, newTimestamp);
            completed = await readCompletedArray(db, collection, habitId);
        } else {
            //If the date is already selected, unselect it and remove from firestore
            calendar.unselect(date);
            await removeDate(db, collection, habitId, newTimestamp);
            completed = await readCompletedArray(db, collection, habitId);
        }

        //set the completed array to an array of strings
        let mappedArray = completed.map(day => day.toDate());

        //Reset the streak number
        streakElement.innerHTML = computeStreak(mappedArray);
    });
}