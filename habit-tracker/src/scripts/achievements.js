import "../styles/style.css";
import { loadHeaderFooter } from './partials.mjs';
import loadLogin from "./authentication.mjs";
import { startFirestore } from './firestore.mjs';
import { setDarkMode } from "./darkmode.mjs";
import setProgressBar from "./progressBar.mjs";
import { readAchievements } from "./firestore.mjs";
import renderAchievements from "./achievementsList.mjs";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

setDarkMode();

const app = startFirestore();
const db = getFirestore(app);
const auth = getAuth();
const collection = "achievements";

try {
    await loadHeaderFooter();
} catch (err) {
    console.log(err);
}

try {
    await loadLogin(auth);
} catch (err) {
    console.log(err);
}

onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log("User is signed in:", user);

        let achievements = await readAchievements(db, collection);
        console.log(achievements);
        renderAchievements(achievements);

    } else {
        console.log("No user is signed in.");
    }
});