import "../styles/style.css";
import { loadHeaderFooter } from './partials.mjs';
import loadLogin from "./authentication.mjs";
import { startFirestore } from './firestore.mjs';
import displayQuote from "./quotes.mjs";
import { setDefaultSettings } from "./updateSettings.mjs";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

await loadHeaderFooter();

const app = startFirestore();
const db = getFirestore(app);
const habitDatabaseName = "habits";

setDefaultSettings();

if (localStorage.getItem("quotes")) {
  await displayQuote();
}

await loadLogin(db, habitDatabaseName);



