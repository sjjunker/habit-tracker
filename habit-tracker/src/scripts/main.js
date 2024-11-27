import "../styles/style.css";
import { loadHeaderFooter } from './partials.mjs';
import loadLogin from "./Authentication.mjs";
import { startFirestore } from './firestore.mjs';

const db = startFirestore();
const habitDatabaseName = "habits";

loadHeaderFooter();

window.addEventListener("load", () => {
  setTimeout(() => {
    loadLogin(db, habitDatabaseName);
  }, 3000);
});



