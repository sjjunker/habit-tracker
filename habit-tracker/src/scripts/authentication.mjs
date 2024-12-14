import { signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

let isLoggedIn = false;

//Login Modal
export default async function loadLogin(auth) {

    //Login DOM elements
    let modal = document.getElementById("login-modal");
    let showButton = document.getElementById("show-login");
    let submitButton = document.getElementById("login-submit");

    //Signup DOM elements
    let signupModal = document.getElementById("signup-modal");
    let showSignupButton = document.getElementById("show-sign-up");
    let signupSubmitButton = document.getElementById("signup-submit");

    //Logout DOM Element
    let logoutButton = document.getElementById("logout-button");


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

            //Close the modal
            modal.style.display = "none";

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

    //Log the user out
    logoutButton.addEventListener("click", async () => {
        await logout(auth);
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

        //Send email verification
        sendEmailVerification(auth.currentUser)
            .then(() => {
                alert("Verification email sent.");
            });

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