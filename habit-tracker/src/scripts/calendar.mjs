export function createCalendar() {
    let calendarElement = document.getElementById("calendar");
    let calendarInstance = new calendarJs(calendarElement, {
        manualEditingEnabled: true
        // All your options can be set here
    });
}