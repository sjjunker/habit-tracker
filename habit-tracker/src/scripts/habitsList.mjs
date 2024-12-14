import { readData, deleteData, readCompletedLength, readAchievements } from "./firestore.mjs";
import updateHabit from "./updateHabits.mjs";
import setProgressBar from "./progressBar.mjs";
import { setIsComplete } from "./habitCompletion.mjs";
import { addRemoveToCompletionArray } from "./habitCompletion.mjs";

//Get the list of habits
export default async function loadHabitList(db, habitDatabaseName) {
    try {
        const habitData = await readData(db, habitDatabaseName);
        //TODO: Update habit # achievements
        await renderHabitsList(db, habitDatabaseName, habitData);
    } catch (err) {
        console.log(err);
    }
}

//Render the list to the HTML
async function renderHabitsList(db, habitDatabaseName, habits) {
    const habitsList = document.getElementById("habits-list");
    habitsList.innerHTML = "";

    try {
        for await (let habit of habits) {
            let habitLi = document.createElement("li");
            let habitLiDiv = document.createElement("div");
            let myCheckbox = document.createElement("input");
            let checkboxLabel = document.createElement("label");
            let habitDetailLink = document.createElement("a");
            let progressBarInner = document.createElement("div");
            let progressBarOutter = document.createElement("div");
            let editButton = document.createElement("button");
            let deleteButton = document.createElement("button");

            //Get number completed goals
            const numCompleted = await readCompletedLength(db, habitDatabaseName, habit.habitId);

            //Set attributes
            checkboxLabel.setAttribute("for", myCheckbox);
            myCheckbox.type = "checkbox";
            myCheckbox.name = `isCompleted${habit.habitId}`;
            myCheckbox.id = `isCompleted${habit.habitId}`;
            myCheckbox.className = "checkboxClass";
            myCheckbox.checked = await setIsComplete(db, habitDatabaseName, habit);

            //Set event listener for checkbox
            myCheckbox.addEventListener("change", async () => {
                try {
                    await addRemoveToCompletionArray(db, habitDatabaseName, habit);
                } catch (err) {
                    console.log(err);
                }

                let eventNumCompleted;

                try {
                    eventNumCompleted = await readCompletedLength(db, habitDatabaseName, habit.habitId);
                } catch (err) {
                    eventNumCompleted = 0;
                    console.log(err);
                }
                setProgressBar(habit.habitGoal, eventNumCompleted, progressBarInner);
            });

            //Progress bar
            progressBarInner.id = "progress-bar-inner";
            progressBarInner.className = "progress-bar-inner-class";
            progressBarOutter.id = "progress-bar-outter";
            progressBarOutter.className = "progress-bar-outter-class";
            progressBarOutter.appendChild(progressBarInner);
            setProgressBar(habit.habitGoal, numCompleted, progressBarInner);

            habitDetailLink.innerHTML = habit.habitName;
            habitDetailLink.href = `/habitDetailView/index.html?habitId=${habit.habitId}`;

            //Edit event
            editButton.innerHTML = `<img src="../images/edit.svg" alt="edit icon"/>`;
            editButton.id = "edit-button";
            editButton.addEventListener("click", () => {
                //Open Modal
                let modal = document.getElementById("add-habit-modal");
                modal.style.display = "block";

                //Default Properties
                document.getElementById("habitName").value = habit.habitName;
                document.getElementById("habitCategory").value = habit.habitCategory;
                document.getElementById("habitName").value = habit.habitName;
                document.getElementById("habitGoal").value = habit.habitGoal;
                document.forms["add-habit-form"][`${habit.habitFrequency}`].checked = true;
                document.getElementById("habitDescription").value = habit.habitDescription;
                document.getElementById("setReminder").value = habit.setReminder;

                //Call update function
                updateHabit(db, habitDatabaseName, habit.habitId);
            });

            //Delete event
            deleteButton.innerHTML = `<img src="../images/delete.svg" alt="edit icon"/>`;
            deleteButton.id = "delete-button";
            deleteButton.addEventListener("click", async () => {
                try {
                    await deleteData(db, habitDatabaseName, habit.habitId);
                } catch (err) {
                    console.log(err);
                }

                loadHabitList(db, habitDatabaseName);
            });

            //Add to li
            habitLiDiv.appendChild(myCheckbox);
            habitLiDiv.appendChild(habitDetailLink);
            habitLiDiv.appendChild(progressBarOutter);
            habitLiDiv.appendChild(editButton);
            habitLiDiv.appendChild(deleteButton);
            habitLi.appendChild(habitLiDiv);

            //Add to ul
            habitsList.appendChild(habitLi);
        }
    } catch (err) {
        console.log(err);
    }
}