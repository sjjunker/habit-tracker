import { addDate, removeDate, readCompleted } from "./firestore.mjs";
import { Timestamp } from 'firebase/firestore';

export async function setIsComplete(db, collectionName, habit) {
    //Get today's date
    let todaysDate = new Date();
    todaysDate.setHours(0, 0, 0, 0);
    const current_timestamp = Timestamp.fromDate(todaysDate);
    let completionLength = await readCompleted(db, collectionName, habit).habitId;

    //Check if the habit completed collection has today's date
    if (completionLength > 0) {
        if (habit.completed.some(date => date.isEqual(current_timestamp))) {
            console.log("date found");
            return true;
        } else {
            console.log("date not found");
            return false;
        }
    } else {
        console.log("No currently completed habits.");
        return false;
    }
}

export async function addRemoveToCompletionArray(db, collectionName, habit) {
    //Get the habit checkbox
    const habitCheckbox = document.getElementById(`isCompleted${habit.habitId}`);

    //Get today's date
    let todaysDate = new Date();
    todaysDate.setHours(0, 0, 0, 0);
    const current_timestamp = Timestamp.fromDate(todaysDate)

    if (habitCheckbox.checked == true) {
        await addDate(db, collectionName, habit.habitId, current_timestamp);
        console.log("checked")
    } else {
        await removeDate(db, collectionName, habit.habitId, current_timestamp);
        console.log("unchecked");
    }
}