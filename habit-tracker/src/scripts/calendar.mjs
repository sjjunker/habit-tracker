import { jsCalendar } from "./jsCalendar.mjs";
import { addDate, removeDate, readCompleted } from "./firestore.mjs";
import { Timestamp } from "firebase/firestore";
import computeStreak from "./computeStreak.mjs";

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

export function setEventListeners(db, collection, habitId) {
    let streakElement = document.getElementById("streak-number");

    calendar.onDateClick(function (event, date) {
        let newTimestamp = Timestamp.fromDate(date);

        if (!calendar.isSelected(date)) {
            //If the date is not yet selected then select, and add to firestore
            calendar.select(date);
            addDate(db, collection, habitId, newTimestamp);
        } else {
            //If the date is already selected, unselect it and remove from firestore
            calendar.unselect(date);
            removeDate(db, collection, habitId, newTimestamp);
        }

        //Reset the streak number
        let streak = readCompleted(db, collection, habitId);
        streakElement.innerHTML = computeStreak(streak);
    });
}