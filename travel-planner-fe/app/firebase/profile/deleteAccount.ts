import { FirebaseError } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import firebase_app from '../config';
import { initializeApp } from "firebase/app";

initializeApp(firebase_app);

const db = getFirestore();

export default async function DeleteAccount(uid: string) {
  try {

console.log(db)

   const docRef = doc(db, "users", uid);

   deleteDoc(docRef)
    .then(() => {
        console.log("User deleted successfully")
    })
   
    
    }catch(err) {
    const error = err as FirebaseError;
    return { error, result: null };
    }

}




// const storage = getStorage();

    // // Create a reference to the file to delete
    // const desertRef = ref(storage, 'images/desert.jpg');

    // // Delete the file
    // deleteObject(desertRef).then(() => {
    // // File deleted successfully
    // }).catch((error) => {
    // // Uh-oh, an error occurred!
    // });



