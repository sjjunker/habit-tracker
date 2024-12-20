import { updatePassword, updateProfile } from "firebase/auth";

//Get DOM selectors
const userNameSelector = document.getElementById("users-name");
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

        //Password change
        //TODO: add a firestore login popup
        if (passwordSelector.value != "") {
            updateUsersPassword(user, passwordSelector.value);
        }
    })
}

//Update user's first and last names
function updateUsersName(user, usersName) {
    updateProfile(user, {
        displayName: usersName
    }).then(() => {
        alert("profile updated");
    }).catch((error) => {
        alert(`Profile not updated. Error: ${error}`);
    });
}

//Update password
function updateUsersPassword(user, password) {
    updatePassword(user, password).then(() => {
        alert("Password updated.");
    }).catch((error) => {
        alert(`Password not updated. Error: ${error}`);
    });
}