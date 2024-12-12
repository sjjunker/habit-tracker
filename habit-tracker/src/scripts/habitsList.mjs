import { readData, deleteData, readCompletedLength } from "./firestore.mjs";
import updateHabit from "./updateHabits.mjs";
import setProgressBar from "./progressBar.mjs";
import { setIsComplete } from "./habitCompletion.mjs";
import { addRemoveToCompletionArray } from "./habitCompletion.mjs";

//Get the list of habits
export default async function loadHabitList(db, habitDatabaseName) {
    const habitData = await readData(db, habitDatabaseName);
    await renderHabitsList(db, habitDatabaseName, habitData);
}

//Render the list to the HTML
async function renderHabitsList(db, habitDatabaseName, habits) {
    const habitsList = document.getElementById("habits-list");
    habitsList.innerHTML = "";

    for await (let habit of habits) {
        let habitLi = document.createElement("li");
        let habitLiDiv = document.createElement("div");
        let myCheckbox = document.createElement("input");
        let habitDetailLink = document.createElement("a");
        let progressBarInner = document.createElement("div");
        let progressBarOutter = document.createElement("div");
        let editButton = document.createElement("button");
        let deleteButton = document.createElement("button");

        //Get number completed goals
        const numCompleted = await readCompletedLength(db, habitDatabaseName, habit.habitId);

        //Set attributes
        myCheckbox.type = "checkbox";
        myCheckbox.name = `isCompleted${habit.habitId}`;
        myCheckbox.id = `isCompleted${habit.habitId}`;
        myCheckbox.className = "checkboxClass";
        myCheckbox.checked = await setIsComplete(db, habitDatabaseName, habit);

        //Set event listener for checkbox
        myCheckbox.addEventListener("change", async () => {
            await addRemoveToCompletionArray(db, habitDatabaseName, habit);
            const eventNumCompleted = await readCompletedLength(db, habitDatabaseName, habit.habitId);
            setProgressBar(habit.habitGoal, eventNumCompleted, progressBarInner);
        });

        progressBarInner.id = "progress-bar-inner";
        progressBarInner.className = "progress-bar-inner-class";
        progressBarOutter.id = "progress-bar-outter";
        progressBarOutter.className = "progress-bar-outter-class";
        progressBarOutter.appendChild(progressBarInner);
        setProgressBar(habit.habitGoal, numCompleted, progressBarInner);

        habitDetailLink.innerHTML = habit.habitName;
        let mappedArray = habit.completed.map(day => day.toDate());
        let completedArray = JSON.stringify(mappedArray);
        habitDetailLink.href = `/habitDetailView/index.html?habitId=${habit.habitId}&habitName=${habit.habitName}&habitCategory=${habit.habitCategory}&habitDescription=${habit.habitDescription}&habitGoal=${habit.habitGoal}$habitFrequency=${habit.habitFrequency}&setReminder=${habit.setReminder}&completed=${completedArray}`;

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
            await deleteData(db, habitDatabaseName, habit.habitId);
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
}