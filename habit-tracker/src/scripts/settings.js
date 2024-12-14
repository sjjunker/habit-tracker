import { settingsEventListeners } from "./updateSettings.mjs";
import { setSettingsCheckboxes } from "./updateSettings.mjs";
import { loadHeaderFooter } from "./partials.mjs";
import { startFirestore } from "./firestore.mjs";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { updateUserProperties } from "./updateUser.mjs";
import "../styles/style.css";

try {
    await loadHeaderFooter();
} catch (err) {
    console.log(err);
}

const app = startFirestore();
const db = getFirestore(app);
const auth = getAuth();

settingsEventListeners();
setSettingsCheckboxes();

onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log("User is signed in:", user);
        //Update the user properties
        updateUserProperties(user);
    } else {
        console.log("No user is signed in.");
    }
});