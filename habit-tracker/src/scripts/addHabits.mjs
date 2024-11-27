import { addData } from "./firestore.mjs";
import loadHabitList from "./habitsList.mjs";

export default function addHabit(db, collectionName, isLoggedIn) {
    var modal = document.getElementById("add-habit-modal");
    var addButton = document.getElementById("add-habit-button");
    var submitButton = document.getElementById("add-habit-submit");

    //Open the modal on click
    addButton.addEventListener("click", () => {
        if (isLoggedIn) {
            modal.style.display = "block";
        }
    });

    //Close the modal on click
    submitButton.addEventListener("click", () => {
        //Get form values
        const name = document.getElementById("habitName").value;
        const category = document.getElementById("habitCategory").value;
        const frequency = document.querySelector("input[name=habitFrequency]:checked").value;
        const description = document.getElementById("habitDescription").value;
        const reminder = document.getElementById("setReminder").value;
        const goal = document.getElementById("habitGoal").value;

        //Add to firestore
        let habitProperties = {
            habitCategory: category,
            habitDescription: description,
            habitFrequency: frequency,
            habitGoal: goal,
            habitName: name,
            setReminder: reminder
        }
        addData(db, collectionName, habitProperties);

        //Reload habits list
        document.getElementById("habits-list").innerHTML = "";
        loadHabitList(db, collectionName);

        //Hide modal
        modal.style.display = "none";
    });

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener("click", (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
}