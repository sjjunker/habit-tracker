import { addData } from "./firestore.mjs";
import loadHabitList from "./habitsList.mjs";

export default async function addHabit(db, collectionName, isLoggedIn) {
    var modal = document.getElementById("add-habit-modal");
    var addButton = document.getElementById("add-habit-button");
    var submitButton = document.getElementById("add-habit-submit");

    //Open the modal on click
    addButton.addEventListener("click", () => {
        if (isLoggedIn) {
            modal.style.display = "block";

            //Clear defaults
            document.getElementById("habitName").value = null;
            document.getElementById("habitCategory").value = null;
            document.getElementById("habitGoal").value = null;
            document.getElementById("habitDescription").value = null;
            document.getElementById("setReminder").value = null;
        }

        //Close the modal on click
        submitButton.addEventListener("click", setData);
    });

    async function setData() {
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

        try {
            await addData(db, collectionName, habitProperties);
        } catch (err) {
            console.log(`Couldn't activate add habits button ${err}`);
        }

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