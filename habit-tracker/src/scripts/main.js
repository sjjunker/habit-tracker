import "../styles/style.css";
import { loadHeaderFooter } from './partials.mjs';
import loadLogin from "./Authentication.mjs";
import { startFirestore } from './firestore.mjs';
import displayQuote from "./quotes.mjs";

const db = startFirestore();
const habitDatabaseName = "habits";

loadHeaderFooter();
displayQuote();

window.addEventListener("load", () => {
  setTimeout(() => {
    loadLogin(db, habitDatabaseName);
  }, 3000);
});



