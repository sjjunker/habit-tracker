const darkMode = document.getElementById("dark-mode");
const notifications = document.getElementById("notifications");
const quotes = document.getElementById("quotes");

export function setDefaultSettings() {
    if (localStorage.getItem("dark-mode") == null) {
        localStorage.setItem("dark-mode", false);
    }
    if (localStorage.getItem("notifications") == null) {
        localStorage.setItem("notifications", true);
    }
    if (localStorage.getItem("quotes") == null) {
        localStorage.setItem("quotes", true);
    }
}

export function setSettingsCheckboxes() {
    darkMode.checked = localStorage.getItem("dark-mode") === "true";
    notifications.checked = localStorage.getItem("notifications") === "true";
    quotes.checked = localStorage.getItem("quotes") === "true";
}

export function settingsEventListeners() {

    darkMode.addEventListener("change", () => {
        if (darkMode.checked == true) {
            localStorage.setItem("dark-mode", true);
        } else {
            localStorage.setItem("dark-mode", false);
        }
    });

    notifications.addEventListener("change", () => {
        if (notifications.checked == true) {
            localStorage.setItem("notifications", true);
        } else {
            localStorage.setItem("notifications", false);
        }
    });

    quotes.addEventListener("change", () => {
        if (quotes.checked == true) {
            localStorage.setItem("quotes", true);
        } else {
            localStorage.setItem("quotes", false);
        }
    });
}