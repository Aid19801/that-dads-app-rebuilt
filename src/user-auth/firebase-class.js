import { AsyncStorage } from 'react-native';
import firebase from 'firebase';

class Firebase {

    // *ASYNC STORAGE* reading, writing AsyncStorage information (id's)
    async getAsyncUid() { // basic user auth ID
        console.log('retrieving AsyncStorage: User Authentication uid...');
		let uid = await AsyncStorage.getItem('uid');
        return uid;
    }
    async getAsyncObjId() { // proper likes/tagline user obj id
        console.log('retrieving AsyncStorage: User Details Object Id...');
        let id = await AsyncStorage.getItem('id');
        console.log('id retrieved was: ', id);
        return id;
    }
    async setAsyncUid(uid) { // setting user auth id
        console.log('setting AsyncStorage: User Auth uid...');
        AsyncStorage.setItem('uid', uid);

        setTimeout(() => {
            AsyncStorage.getItem('uid').then(res => {
                console.log('checking uid was saved to async: ', res);
            })
        }, 1000)
    }
    async setAsyncObjId(id) { // setting user auth id
        console.log('setting AsyncStorage: User Details Object Id...');
        AsyncStorage.setItem('id', id);

        setTimeout(() => {
            AsyncStorage.getItem('id').then(res => {
                console.log('checking id was saved to async: ', res);
            })
        }, 1000)
    }
    async clearAsyncStorage() { // wipe storage to nothing
        console.log('destroying async...');
        AsyncStorage.setItem('uid', '');
        AsyncStorage.setItem('id', '');

    setTimeout(() => {
        AsyncStorage.getItem('uid').then(res => {
            console.log('checking uid was destroyed: ', res);
        })
        AsyncStorage.getItem('id').then(res => {
            console.log('checking id was destroyed: ', res);
        })
    }, 1000);
    }

    // *FIRESTORE USER DETAILS*
    async getUserDetailsObject(id) {
        return new Promise((resolve, reject) => {
            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
            }
            var db = firebase.firestore();
            db.settings({
                timestampsInSnapshots: true
            });
            db.collection("users").get()
                .then(querySnapshot => {
                    querySnapshot.forEach((doc) => {
                        if (doc.id === id) {
                            resolve(doc.data())
                        }
                    });
                })
                .catch(err => {
                    console.log('firebase | couldnt get user deets object | err: ', err);
                    reject(err);
                })
        })
    }


    // *USER AUTHENTICATION* reading, writing email/pw accounts
    async registerUser(email, password) {
        try {
            let user = await firebase.auth().createUserWithEmailAndPassword(email, password);
            console.log('user created created in Firebase user auth: ', user);
            return user;
        } catch (error) {
            console.log('user auth sign up error: ', error);
            return error;
        }
    }

    async login(email, password) {
        try {
            let user = await firebase.auth().signInWithEmailAndPassword(email, password);
            console.log('user logged in with Firebase user auth: ', user);
            return;
        } catch (error) {
            console.log('user auth Login error: ', error);
            return;
        }
    }
}

export default Firebase;