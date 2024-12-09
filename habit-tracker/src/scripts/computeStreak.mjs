

export default function computeStreak(dateString) {
    let streakNum = 0;
    let maxCount = 1;
    const MILI_IN_DAY = 86400000;
    let completedList = dateString ? dateString : [];


    if (completedList.length > 0) {

        completedList.forEach((completedDay, index) => {
            //check to make sure there is a next day
            if (index + 1 < completedList.length) {

                //Check to see if the dates are 24hrs apart
                let firstDay = new Date(completedList[index + 1]).getTime();
                let nextDay = new Date(completedDay).getTime();
                let timeInterval = firstDay - nextDay;
                if (timeInterval <= MILI_IN_DAY + 100000 && timeInterval >= MILI_IN_DAY - 100000) {
                    maxCount += 1;
                } else {
                    //Set streak number if it is less
                    if (maxCount > streakNum) {
                        streakNum = maxCount;
                        maxCount = 1;
                    }
                }
            }
        });

        streakNum = Math.max(streakNum, maxCount);
        return streakNum;
    } else {
        return 0;
    }
}