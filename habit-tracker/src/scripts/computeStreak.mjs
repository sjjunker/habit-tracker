export default function computeStreak(completedList) {
    let streakNum = 0;
    let maxCount = 0;
    const MILI_IN_DAY = 86400000;

    completedList.forEach(day, index => {
        //check to make sure there is a next day
        if (index + 1 < completedList.length) {

            //Check to see if the dates are 24hrs apart
            if (day + MILI_IN_DAY == completedList[index]) {
                maxCount += 1;
            } else {
                //Set streak number if it is less
                if (maxCount > streakNum) {
                    streakNum = maxCount;
                    maxCount = 0;
                }
            }
        }
    });

    return streakNum;
}