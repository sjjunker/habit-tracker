import { settingsEventListeners } from "./updateSettings.mjs";
import { setSettingsCheckboxes } from "./updateSettings.mjs";
import { loadHeaderFooter } from "./partials.mjs";
import "../styles/style.css";

loadHeaderFooter();
settingsEventListeners();
setSettingsCheckboxes();