import { settingsEventListeners } from "./updateSettings.mjs";
import { setSettingsCheckboxes } from "./updateSettings.mjs";
import { loadHeaderFooter } from "./partials.mjs";
import { startFirestore } from "./firestore.mjs";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { updateUserProperties } from "./updateUser.mjs";
import "../styles/style.css";

const app = startFirestore();
const db = getFirestore(app);
const auth = getAuth(app);

//Check for user
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        console.log("user signed in");

        //Update the user properties
        updateUserProperties(user);

    } else {
        // User is signed out
        console.log("user is signed out");
    }
});

loadHeaderFooter();
settingsEventListeners();
setSettingsCheckboxes();