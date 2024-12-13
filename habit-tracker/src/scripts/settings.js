import { settingsEventListeners } from "./updateSettings.mjs";
import { setSettingsCheckboxes } from "./updateSettings.mjs";
import { loadHeaderFooter } from "./partials.mjs";
import { startFirestore } from "./firestore.mjs";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { updateUserProperties } from "./updateUser.mjs";
import "../styles/style.css";

try {
    await loadHeaderFooter();
} catch (err) {
    console.log(err);
}

const app = startFirestore();
const db = getFirestore(app);
const auth = getAuth(app);
const user = auth.currentUser;

settingsEventListeners();
setSettingsCheckboxes();

//Update the user properties
updateUserProperties(user);