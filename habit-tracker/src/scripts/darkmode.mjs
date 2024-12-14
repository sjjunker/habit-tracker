export function setDarkMode() {
    let darkMode = localStorage.getItem("dark-mode");

    if (darkMode === "true") {
        document.querySelector("body").classList.add("dark-mode");
    } else {
        document.querySelector("body").classList.remove("dark-mode");
    }
}