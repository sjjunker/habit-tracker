import "../styles/style.css";
import { setDarkMode } from "./darkmode.mjs";
import { loadHeaderFooter } from "./partials.mjs";
import loadLogin from "./authentication.mjs";

setDarkMode();

//Load partials
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