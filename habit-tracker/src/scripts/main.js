import "../styles/style.css";
import { loadHeaderFooter } from './partials.mjs';
import loadLogin from "./authentication.mjs";
import { startFirestore } from './firestore.mjs';
import displayQuote from "./quotes.mjs";
import { setDefaultSettings } from "./updateSettings.mjs";

const db = startFirestore();
const habitDatabaseName = "habits";

loadHeaderFooter();
setDefaultSettings();

window.addEventListener("load", () => {
  setTimeout(async () => {
    loadLogin(db, habitDatabaseName);
    if (localStorage.getItem("quotes")) {
      await displayQuote();
    }
  }, 500);
});



