import firebase from 'firebase';
import '@firebase/firestore'

import { firebaseConfig } from './firebase';

export const addToDatabase = () => {

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }

    // Initialize Cloud Firestore through Firebase
    var db = firebase.firestore();

    // Disable deprecated features
    db.settings({
    timestampsInSnapshots: true
    });


    db.collection("users").add({
        uid: "58578",
        userName: "falloo",
    })
    .then(function(docRef) {
        return docRef.id;
    })
    .catch(function(error) {
        return error;
    });

}