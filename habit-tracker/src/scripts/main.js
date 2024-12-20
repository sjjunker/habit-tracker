import "../styles/style.css";
import { loadHeaderFooter } from './partials.mjs';
import { startFirestore } from './firestore.mjs';
import displayQuote from "./quotes.mjs";
import { setDefaultSettings } from "./updateSettings.mjs";
import { getFirestore } from "firebase/firestore";
import { getAuth, setPersistence, browserLocalPersistence, onAuthStateChanged } from "firebase/auth";
import loadLogin from "./authentication.mjs";
import { setDarkMode } from "./darkmode.mjs";
import loadHabitList from "./habitsList.mjs";
import addHabit from "./addHabits.mjs";

setDarkMode();

const app = startFirestore();
const db = getFirestore(app);
const auth = getAuth(app);
const habitDatabaseName = "habits";

setDefaultSettings();

//Load partials
async function loadPartialsAndLogin() {
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
  if (localStorage.getItem("quotes")) {
    try {
      await displayQuote();
    } catch (err) {
      console.log(err);
    }
  }
}
loadPartialsAndLogin();

// Ensure persistence is set once (before any login attempt)
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    //Set state change listener
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("User is signed in:", user);

        //Load and render list of habits
        await loadHabitList(db, habitDatabaseName);

        //Listen for adding habits
        addHabit(db, habitDatabaseName, true);

      } else {
        alert("No user is signed in.");
        document.getElementById("habits-list").innerHtml = "";
      }
    });
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });





