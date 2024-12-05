import { readData, deleteData } from "./firestore.mjs";
import updateHabit from "./updateHabits.mjs";

//Get the list of habits
export default async function loadHabitList(db, habitDatabaseName) {
    const habitData = await readData(db, habitDatabaseName);
    renderHabitsList(db, habitDatabaseName, habitData);
}

//Render the list to the HTML
function renderHabitsList(db, habitDatabaseName, habits) {
    const habitsList = document.getElementById("habits-list");
    habitsList.innerHTML = "";
    let idName = 0;

    habits.forEach(habit => {
        console.log(habit);
        let habitLi = document.createElement("li");
        let habitLiDiv = document.createElement("div");
        let checkBox = document.createElement("input");
        let habitDetailLink = document.createElement("a");
        let progressBarInner = document.createElement("div");
        let progressBarOutter = document.createElement("div");
        let editButton = document.createElement("button");
        let deleteButton = document.createElement("button");

        //Set attributes
        checkBox.type = "checkbox";
        checkBox.name = `isCompleted${idName}`;
        checkBox.id = `isCompleted${idName}`;
        checkBox.className = "checkboxClass";

        progressBarInner.id = "progress-bar-inner";
        progressBarInner.className = "progress-bar-inner-class";
        progressBarOutter.id = "progress-bar-outter";
        progressBarOutter.className = "progress-bar-outter-class";
        progressBarOutter.appendChild(progressBarInner);

        habitDetailLink.innerHTML = habit.habitName;;
        habitDetailLink.href = `/habitDetailView/index.html?habitId=${habit.habitId}&habitName=${habit.habitName}&habitCategory=${habit.habitCategory}&habitDescription=${habit.habitDescription}&habitGoal=${habit.habitGoal}$habitFrequency=${habit.habitFrequency}&setReminder=${habit.setReminder}`;

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
        deleteButton.addEventListener("click", () => {
            deleteData(db, habitDatabaseName, habit.habitId);
            loadHabitList(db, habitDatabaseName);
        });

        //Add to li
        habitLiDiv.appendChild(checkBox);
        habitLiDiv.appendChild(habitDetailLink);
        habitLiDiv.appendChild(progressBarOutter);
        habitLiDiv.appendChild(editButton);
        habitLiDiv.appendChild(deleteButton);
        habitLi.appendChild(habitLiDiv);

        //Add to ul
        habitsList.appendChild(habitLi);

        //increment habit id
        idName += 1;
    });
}