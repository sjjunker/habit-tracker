export default function computeStreak(dateArray) {
    //Sort the array
    dateArray.sort((a, b) => new Date(a) - new Date(b));

    let streakNum = 0;
    let currentStreak = 1;
    const MILI_IN_DAY = 86400000;

    if (dateArray.length > 0) {
        for (let index = 0; index < dateArray.length - 1; index++) {
            //Check to see if the dates are 24hrs apart
            const currentDate = new Date(dateArray[index]).getTime();
            const nextDate = new Date(dateArray[index + 1]).getTime();

            const timeInterval = nextDate - currentDate;

            if (timeInterval <= MILI_IN_DAY + 100000 && timeInterval >= MILI_IN_DAY - 100000) {
                currentStreak++;
            } else {
                //Set streak number if it is less
                streakNum = Math.max(streakNum, currentStreak);
                currentStreak = 1;
            }
        }

        streakNum = Math.max(streakNum, currentStreak);
        return streakNum;
    } else {
        return 0;
    }
}