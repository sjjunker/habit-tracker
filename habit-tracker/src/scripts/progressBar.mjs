export default function setProgressBar(goal, numCompleted, progressBar) {
    console.log(progressBar.style.width);

    const percentComplete = numCompleted / goal * 100;

    progressBar.style.width = `${percentComplete}%`;
}