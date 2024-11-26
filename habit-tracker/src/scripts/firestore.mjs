import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { doc, collection, addDoc, getDocs, deleteDoc } from "firebase/firestore";

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
        console.log("Document written with ID: ", docRef.id);
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

    querySnapshot.forEach((doc) => {
        dataArray.push({
            habitName: doc.data().habitName,
            habitCategory: doc.data().habitCategory,
            habitFrequency: doc.data().habitFrequency,
            habitGoal: doc.data().habitGoal,
            setReminder: doc.data().setReminder,
            habitDescription: doc.data().habitDescription,
            events: doc.data().events ?? []
        });
    });
    return dataArray;
}