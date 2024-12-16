import { initializeApp } from 'firebase/app';
import { Timestamp } from 'firebase/firestore';
import { doc, collection, addDoc, getDocs, deleteDoc, setDoc, updateDoc, getDoc } from "firebase/firestore";

export function startFirestore() {
    const app = initializeApp({
        apiKey: "AIzaSyDgaza9auYuZZ1YoeXNwBHWlmXfy8aOVHA",
        authDomain: "habit-tracker-b03e0.firebaseapp.com",
        projectId: "habit-tracker-b03e0",
        storageBucket: "habit-tracker-b03e0.firebasestorage.app",
        messagingSenderId: "966706756752",
        appId: "1:966706756752:web:2a6ec91a49515dfa646c15"
    });

    return app;
}

//Add data
export async function addData(db, collectionName, documentProperties) {
    try {
        const docRef = await addDoc(collection(db, collectionName), documentProperties);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

//Update data
export async function updateData(db, collectionName, documentId, docData) {
    try {
        await setDoc(doc(db, collectionName, documentId), docData);
    } catch (err) {
        console.log(err);
    }
}

//Delete Data
export async function deleteData(db, collectionName, documentId) {
    try {
        await deleteDoc(doc(db, collectionName, documentId));
    } catch (err) {
        console.log(err);
    }

}

//Read data
export async function readData(db, collectionName) {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        let dataArray = [];

        querySnapshot.forEach(doc => {
            dataArray.push({
                habitId: doc.id,
                habitName: doc.data().habitName,
                habitCategory: doc.data().habitCategory,
                habitFrequency: doc.data().habitFrequency,
                habitGoal: doc.data().habitGoal,
                setReminder: doc.data().setReminder,
                habitDescription: doc.data().habitDescription,
                completed: doc.data().completed ? doc.data().completed : []
            });
        });

        return dataArray;
    } catch (err) {
        console.log(err);
    }
}

export async function getDocument(db, collectionName, documentId) {
    // Get the document reference, snapshot
    try {
        const documentRef = doc(db, collectionName, documentId);
        const documentSnapshot = await getDoc(documentRef);
        let document;

        //Return the habit data
        if (documentSnapshot.exists()) {
            document = documentSnapshot.data();
        } else {
            document = null;
        }

        return document;
    } catch (err) {
        console.log(err);
    }
}

//Read habit completed array length
export async function readCompletedLength(db, collectionName, habitId) {
    try {
        // Get the document reference
        const habitRef = doc(db, collectionName, habitId);

        // Retrieve the document snapshot
        const habitSnapshot = await getDoc(habitRef);

        if (habitSnapshot.exists()) {
            // Access the data and return the completed array length
            const habitData = habitSnapshot.data();
            return habitData.completed ? habitData.completed.length : 0;
        } else {
            console.error(`Habit with ID ${habitId} does not exist.`);
            return 0;
        }
    } catch (error) {
        console.error("Error reading completed array:", error);
        return 0;
    }
}

export async function readCompletedArray(db, collectionName, habitId) {
    try {
        // Get the document reference
        const habitRef = doc(db, collectionName, habitId);

        // Retrieve the document snapshot
        const habitSnapshot = await getDoc(habitRef);

        if (habitSnapshot.exists()) {
            // Access the data and return the completed array length
            const habitData = habitSnapshot.data();
            return habitData.completed ? habitData.completed : [];
        } else {
            console.error(`Habit with ID ${habitId} does not exist.`);
            return [];
        }
    } catch (error) {
        console.error("Error reading completed array:", error);
        return [];
    }
}

//Add date to completion array
export async function addDate(db, collectionName, habitId, habitCompletionDate) {
    try {
        // Validate input
        if (!(habitCompletionDate instanceof Timestamp)) {
            throw new Error("Invalid habitCompletionDate. Must be a Firestore Timestamp.");
        }

        // Get the habit reference
        const habitRef = doc(db, collectionName, habitId);

        // Fetch the latest habit data
        const habitSnapshot = await getDoc(habitRef);
        if (!habitSnapshot.exists()) {
            console.error(`Habit with ID ${habitId} not found.`);
            return;
        }

        const habitData = habitSnapshot.data();
        const habitCompletionArray = habitData.completed || [];

        // Prevent duplicates
        if (habitCompletionArray.some(date => date.isEqual(habitCompletionDate))) {
            alert("Date already exists.");
        } else {
            // Add the new date
            await updateDoc(habitRef, {
                completed: [...habitCompletionArray, habitCompletionDate],
            });

            alert(`Date added.`);
        }
    } catch (err) {
        console.error("Error adding date:", err);
    }
}

//Remove date from completion array
export async function removeDate(db, collectionName, habitId, habitUncompletedDate) {
    try {
        // Validate input
        if (!(habitUncompletedDate instanceof Timestamp)) {
            throw new Error("Invalid habitUncompletedDate. Must be a Firestore Timestamp.");
        }

        // Get the habit reference
        const habitRef = doc(db, collectionName, habitId);

        // Fetch the latest habit data
        const habitSnapshot = await getDoc(habitRef);
        if (!habitSnapshot.exists()) {
            console.error(`Habit with ID ${habitId} not found.`);
        } else {
            const habitData = habitSnapshot.data();
            const habitCompletionArray = habitData.completed || [];

            // Filter out the date to remove
            const updatedCompletionArray = habitCompletionArray.filter(
                (elem) => !elem.isEqual(habitUncompletedDate)
            );

            // Update Firestore document
            await updateDoc(habitRef, { completed: updatedCompletionArray });

            alert(`Date removed.`);
        }
    } catch (error) {
        console.error("Error removing date:", error);
    }
}

export async function readAchievements(db, collectionName) {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        let dataArray = [];

        querySnapshot.forEach(doc => {
            dataArray.push({
                achievementId: doc.id,
                achievementName: doc.data().achievementName,
                achievementDescription: doc.data().achievementDescription,
                isCompleted: doc.data().isCompleted,
                dateCompleted: doc.data().achievementDate ? doc.data().achievementDate : null,
                achievementGoal: doc.data().achievementGoal ? doc.data().achievementGoal : null,
                achievementProgress: doc.data().achievementProgress ? doc.data().achicevementProgress : null
            });
        });

        return dataArray;
    } catch (err) {
        console.log(err);
    }
}

//Update document
export async function updateAchievementProgress(db, collection, achievementId, progressData) {
    const achievementRef = db.collection(collection).doc(achievementId);

    const res = await achievementRef.update({ achievementProgress: progressData });
}