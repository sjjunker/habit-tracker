import { initializeApp } from 'firebase/app';
import { getFirestore, Timestamp } from 'firebase/firestore';
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

    return getFirestore(app);
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
    await setDoc(doc(db, collectionName, documentId), docData);
}

//Delete Data
export async function deleteData(db, collectionName, documentId) {
    await deleteDoc(doc(db, collectionName, documentId));
}

//Read data
export async function readData(db, collectionName) {
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
            completed: doc.data().completed
        });
    });

    return dataArray;
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
            console.log("Date already exists.");
        } else {
            // Add the new date
            await updateDoc(habitRef, {
                completed: [...habitCompletionArray, habitCompletionDate],
            });

            console.log(`Date added.`);
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

            console.log(`Date removed.`);
        }
    } catch (error) {
        console.error("Error removing date:", error);
    }
}