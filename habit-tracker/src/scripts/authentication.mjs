import { signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserLocalPersistence, onAuthStateChanged } from "firebase/auth";
import addHabit from "./addHabits.mjs";
import loadHabitList from "./habitsList.mjs";

let isLoggedIn = false;

//Login Modal
export default async function loadLogin(db, habitDatabaseName, auth) {

    //Login DOM elements
    var modal = document.getElementById("login-modal");
    var showButton = document.getElementById("show-login");
    var submitButton = document.getElementById("login-submit");

    //Signup DOM elements
    var signupModal = document.getElementById("signup-modal");
    var showSignupButton = document.getElementById("show-sign-up");
    var signupSubmitButton = document.getElementById("signup-submit");

    //Open the login modal on click
    showButton.addEventListener("click", () => {
        modal.style.display = "block";
    });

    //Open the signup modal on click
    showSignupButton.addEventListener("click", () => {
        signupModal.style.display = "block";
    });

    //Close the login modal on click
    submitButton.addEventListener("click", async (event) => {
        event.preventDefault();

        //Login
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        try {
            await login(email, password, auth);

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

    //Close the signup modal on click
    signupSubmitButton.addEventListener("click", async (event) => {
        event.preventDefault();

        //Signup
        const email = document.getElementById("signup-email").value;
        const password = document.getElementById("signup-password").value;

        try {
            await newUser(email, password, auth)
                .then(() => {
                    //Close the modal
                    modal.style.display = "none";
                });
        } catch (error) {
            console.error("Error:", error);
            alert("Signup Failed");
        }
    });

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener("click", (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
        if (event.target == signupModal) {
            signupModal.style.display = "none"
        }
    });
}

//Create a new account
async function newUser(email, password, auth) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        localStorage.setItem("user", JSON.stringify(user));
        alert("User created. Please sign in.");
    } catch (error) {
        console.error(`Error creating user: ${error.code} - ${error.message}`);
    }
}

//Sign in a user
async function login(email, password, auth) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        localStorage.setItem("user", JSON.stringify(user));
        isLoggedIn = true;
    } catch (error) {
        console.error(`Error signing in: ${error.code} - ${error.message}`);
        isLoggedIn = false; // Ensure isLoggedIn is reset on failure
    }
}

//Sign out a user: a TODO for later
async function logout(auth) {
    signOut(auth).then(() => {
        // Sign-out successful.
        alert("Logout sucessful.");
    }).catch((error) => {
        console.log(error);
    });
}