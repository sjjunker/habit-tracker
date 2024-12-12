import "../styles/style.css";
import { loadHeaderFooter } from './partials.mjs';
import loadLogin from "./authentication.mjs";
import { startFirestore } from './firestore.mjs';
import setProgressBar from "./progressBar.mjs";

const db = startFirestore();
const habitDatabaseName = "habits";

loadHeaderFooter();

window.addEventListener("load", () => {
    setTimeout(() => {
        loadLogin(db, habitDatabaseName);
    }, 3000);
});