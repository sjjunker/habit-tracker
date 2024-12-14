import { Timestamp } from "firebase/firestore";

export default function renderAchievements(achievements) {
    //Sort the achievements by which ones are completed
    achievements.sort(function (b, a) { return a.isCompleted - b.isCompleted });

    //Get the DOM Element ul
    let achievementsList = document.getElementById("achievements-list");

    achievements.forEach(achievement => {
        //Create the element
        let li = document.createElement("li");
        let liDiv = document.createElement("div");

        //Add classes and id
        li.classList.add("achievement-li");
        li.id = `achievement${achievement.achievementId}`;

        if (!achievement.isCompleted) {
            li.classList.add("incomplete");
        }

        //Set content
        let badge = document.createElement("img");
        badge.src = `/images/badges/${getBadgeImg(achievement.achievementId)}.webp`;
        badge.alt = `Badge for ${getBadgeImg(achievement.achievementId)}`;

        let title = document.createElement("h3");
        title.innerHTML = achievement.achievementName;

        //Add content to div
        liDiv.appendChild(badge);
        liDiv.appendChild(title);

        //Add date separately
        let date;
        if (achievement.dateCompleted != null) {
            date = document.createElement("p");
            date.innerHTML = achievement.dateCompleted.toDate().toDateString();
            liDiv.append(date);
        }

        //Add liDiv to the li, then theli to the ul
        li.appendChild(liDiv);
        achievementsList.appendChild(li);

    });
}

function getBadgeImg(achievementId) {
    switch (achievementId) {
        case "CZTMNDiQU0Jj07lhhiEA": //One Week Wonder
            return "one-week-wonder";
            break;
        case "Jui8iNVnCqZZmieEf4Pr": //Perfect month
            return "perfect-month";
            break;
        case "pUMJHkqU7XxOIj1w4RSp": //Life overhaul
            return "life-overhaul";
            break;
        case "t1BMoID3J6rWWnHy8wLL": //Consistency Champ
            return "consistency-champ";
            break;
        case "wirXo7h83RWA4RE92EsB": //First Step
            return "first-step";
            break;
        default:
            break;
    }
}