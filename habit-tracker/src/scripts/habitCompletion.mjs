import { addDate, removeDate, readCompletedLength } from "./firestore.mjs";
import { Timestamp } from 'firebase/firestore';

export async function setIsComplete(db, collectionName, habit) {
    //Get today's date
    let todaysDate = new Date();
    todaysDate.setHours(0, 0, 0, 0);
    const current_timestamp = Timestamp.fromDate(todaysDate);
    let completionLength = 0;
    try {
        completionLength = await readCompletedLength(db, collectionName, habit.habitId);
    } catch (err) {
        console.log(err);
    }


    //Check if the habit completed collection has today's date
    if (completionLength > 0) {
        if (habit.completed.some(date => date.isEqual(current_timestamp))) {
            return true;
        } else {
            return false;
        }
    } else {
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

    try {
        if (habitCheckbox.checked == true) {
            await addDate(db, collectionName, habit.habitId, current_timestamp);
        } else {
            await removeDate(db, collectionName, habit.habitId, current_timestamp);
        }
    } catch (err) {
        console.log(err);
    }
}