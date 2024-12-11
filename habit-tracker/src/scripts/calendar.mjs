import { jsCalendar } from "./jsCalendar.mjs";

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