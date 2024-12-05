import { updateData } from "./firestore.mjs";
import loadHabitList from "./habitsList.mjs";

export default function updateHabit(db, collectionName, documentId) {
    let submitButton = document.getElementById("add-habit-submit");
    let modal = document.getElementById("add-habit-modal");

    //Close the modal on click
    submitButton.addEventListener("click", setData);

    function setData() {
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

        updateData(db, collectionName, documentId, habitProperties);

        //Reload habits list
        document.getElementById("habits-list").innerHTML = "";

        loadHabitList(db, collectionName);

        //Hide modal and remove event listener
        submitButton.removeEventListener("click", setData);
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener("click", (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
}