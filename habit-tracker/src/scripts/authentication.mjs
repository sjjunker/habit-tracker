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
    submitButton.addEventListener("click", async () => {
        //Login
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        isLoggedIn = login(email, password);

        //Listen for adding habits
        addHabit(db, habitDatabaseName, isLoggedIn);

        //Close the modal
        modal.style.display = "none";

        //Load and render list of habits
        try {
            loadHabitList(db, habitDatabaseName);
        } catch (error) {
            console.error("Error:", error);
        }

        return isLoggedIn;
    });

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener("click", (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
}

//Create a new account
async function newUser() {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            localStorage.setItem("user", user);
            return true;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`${errorCode}: ${errorMessage}`);
            return false;
        });
}

//Sign in a user
async function login(email, password) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            localStorage.setItem("user", user);
            return true;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`${errorCode}: ${errorMessage}`);
            return false;
        });
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