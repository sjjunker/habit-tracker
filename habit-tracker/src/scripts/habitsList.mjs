import { readData } from "./firestore.mjs";

//Get the list of habits
export default async function loadHabitList(db, habitDatabaseName) {
    const habitData = await readData(db, habitDatabaseName);
    renderHabitsList(habitData);
}

//Render the list to the HTML
function renderHabitsList(habits) {
    const habitsList = document.getElementById("habits-list");
    habitsList.innerHTML = "";
    let idName = 0;

    habits.forEach(habit => {
        let habitLi = document.createElement("li");
        let habitLiDiv = document.createElement("div");
        let checkBox = document.createElement("input");
        let habitDetailLink = document.createElement("a");
        let habitName = document.createElement("h3");
        let progressBarInner = document.createElement("div");
        let progressBarOutter = document.createElement("div");

        //Set attributes
        habitName.innerHTML = habit.habitName;

        checkBox.type = "checkbox";
        checkBox.name = `isCompleted${idName}`;
        checkBox.id = `isCompleted${idName}`;
        checkBox.className = "checkboxClass";

        progressBarInner.id = "progress-bar-inner";
        progressBarInner.className = "progress-bar-inner-class";
        progressBarOutter.id = "progress-bar-outter";
        progressBarOutter.className = "progress-bar-outter-class";
        progressBarOutter.appendChild(progressBarInner);

        habitDetailLink.innerHTML = habitName;
        habitDetailLink.href = "/"

        //Add to li
        habitLiDiv.appendChild(checkBox);
        habitLiDiv.appendChild(habitDetailLink);
        habitLiDiv.appendChild(progressBarOutter);
        habitLi.appendChild(habitLiDiv);

        //Add to ul
        habitsList.appendChild(habitLi);

        //increment habit id
        idName += 1;
    });
}