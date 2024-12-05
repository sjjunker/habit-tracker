import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import addHabit from "./addHabits.mjs";
import loadHabitList from "./habitsList.mjs";

let isLoggedIn = false;

//Login Modal
export default function loadLogin(db, habitDatabaseName) {
    var modal = document.getElementById("login-modal");
    var showButton = document.getElementById("show-login");
    var submitButton = document.getElementById("login-submit");

    //Open the modal on click
    showButton.addEventListener("click", () => {
        modal.style.display = "block";
    });

    //Close the modal on click
    submitButton.addEventListener("click", async (event) => {
        event.preventDefault();

        //Login
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            await login(email, password);
            console.log(isLoggedIn);

            if (isLoggedIn) {
                //Listen for adding habits
                addHabit(db, habitDatabaseName, isLoggedIn);

                //Close the modal
                modal.style.display = "none";

                //Load and render list of habits
                await loadHabitList(db, habitDatabaseName);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Login Failed");
        }
    });

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener("click", (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
}

//Create a new account
async function newUser(email, password) {
    const auth = getAuth();
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        localStorage.setItem("user", JSON.stringify(user));
        isLoggedIn = true;
    } catch (error) {
        console.error(`Error creating user: ${error.code} - ${error.message}`);
    }
}

//Sign in a user
async function login(email, password) {
    const auth = getAuth();
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        localStorage.setItem("user", JSON.stringify(user));
        isLoggedIn = true;
    } catch (error) {
        console.error(`Error signing in: ${error.code} - ${error.message}`);
        isLoggedIn = false; // Ensure isLoggedIn is reset on failure
        throw error; // Propagate the error for the caller to handle
    }
}

//Sign out a user
async function logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        console.log(error);
    });
}