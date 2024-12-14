import "../styles/style.css";
import { loadHeaderFooter } from './partials.mjs';
import loadLogin from "./authentication.mjs";
import { startFirestore } from './firestore.mjs';
import { setDarkMode } from "./darkmode.mjs";
import setProgressBar from "./progressBar.mjs";

const db = startFirestore();
const habitDatabaseName = "habits";

loadHeaderFooter();
setDarkMode();

window.addEventListener("load", () => {
    setTimeout(() => {
        loadLogin(db, habitDatabaseName);
    }, 3000);
});