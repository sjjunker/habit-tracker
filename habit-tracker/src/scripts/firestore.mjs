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
export async function addData(db, databaseName, objectProperties) {
    try {
        const docRef = await addDoc(collection(db, databaseName/*"users"*/), {
            objectProperties
            /*first: "Ada",
            last: "Lovelace",
            born: 1815*/
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

//Update data
export async function updateData(db, databaseName, documentId, docData) {
    await setDoc(doc(db, databaseName, documentId), docData);
}

//Delete Data
export async function deleteData(db, databaseName, documentId) {
    await deleteDoc(doc(db, databaseName, documentId));
}

//Read data
export async function readData(db, databaseName) {
    const querySnapshot = await getDocs(collection(db, databaseName));
    let dataArray = [];

    querySnapshot.forEach((doc) => {
        dataArray.push(`${doc.id} => ${doc.data()}`);
    });

    return dataArray;
}