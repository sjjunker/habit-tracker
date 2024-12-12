export default function setProgressBar(goal, numCompleted, progressBar) {
    const percentComplete = numCompleted / goal * 100;

    if (percentComplete >= 100) {
        //If completed
        progressBar.style.width = `100%`;
        progressBar.classList.add("habitFinished");
    } else if (percentComplete < 100) {
        //If not completed
        progressBar.style.width = `${percentComplete}%`;
        progressBar.classList.remove("habitFinished");
    }
}