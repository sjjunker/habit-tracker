import { updatePassword, updateEmail, updateProfile } from "firebase/auth";

//Get DOM selectors
const userNameSelector = document.getElementById("users-name");
const emailSelector = document.getElementById("email");
const passwordSelector = document.getElementById("password");
const submitButton = document.getElementById("user-submit");

export function updateUserProperties(user) {
    //Listen for submit button
    submitButton.addEventListener("click", e => {
        e.preventDefault();

        //User's name change
        if (userNameSelector.value != "") {
            updateUsersName(user, userNameSelector.value);
        }

        //Email change
        if (emailSelector.value != "") {
            updateUsersEmail(user, emailSelector.value);
        }

        //Password change
        //TODO: add a firestore login popup
        if (passwordSelector.value != "") {
            user.updateUsersPassword(user, passwordSelector.value);
        }
    })
}

//Update user's first and last names
function updateUsersName(user, usersName) {
    updateProfile(user, {
        displayName: usersName
    }).then(() => {
        console.log("profile updated");
    }).catch((error) => {
        console.log(user);
        console.log(`Profile not updated. Error: ${error}`);
    });
}

//Update email
function updateUsersEmail(user, email) {
    updateEmail(user, email).then(() => {
        console.log(`Email updated.`);
    }).catch((error) => {
        console.log(`Email not updated. Error: ${error}`);
    });
}


//Update password
function updateUsersPassword(user, password) {
    updatePassword(user, password).then(() => {
        console.log("Password updated.");
    }).catch((error) => {
        console.log(`Password not updated. Error: ${error}`);
    });
}