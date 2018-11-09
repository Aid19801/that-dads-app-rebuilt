import firebase from 'firebase';
import '@firebase/firestore'

import { firebaseConfig } from './firebase';

export const addToDatabase = async (email, password, likes, dislikes, tagline, userName, uid) => {

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
        email,
        password,
        likes,
        dislikes,
        tagline,
        userName,
        uid,
    })
    .then(function(docRef) {
        return docRef.id;
    })
    .catch(function(error) {
        return error;
    });

}