import { AsyncStorage } from 'react-native';
import firebase from 'firebase';
import { firebaseConfig } from './firebase';
import '@firebase/firestore';

class Firebase {

    // *ASYNC STORAGE* reading, writing AsyncStorage information (id's)
    async getAsyncUid() { // basic user auth ID or 'uid'
        console.log('retrieving AsyncStorage: User Authentication uid...');
		let uid = await AsyncStorage.getItem('uid');
        return uid;
    }
    async getAsyncObjId() { // proper likes/tagline user obj id or 'id'
        console.log('retrieving AsyncStorage: User Details Object Id...');
        let id = await AsyncStorage.getItem('id');
        console.log('id retrieved was: ', id);
        return id;
    }
    async setAsyncUid(uid) { // setting user-auth-id or 'uid'
        console.log('setting AsyncStorage: User Auth uid...');
        AsyncStorage.setItem('uid', uid);

        setTimeout(() => {
            AsyncStorage.getItem('uid').then(res => {
                console.log('checking uid was saved to async: ', res);
            })
        }, 1000)
    }
    async setAsyncObjId(id) { // setting user auth id or 'id'
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
        AsyncStorage.setItem('isLoggedIn', 'false');

        setTimeout(() => {
            AsyncStorage.getItem('uid').then(res => {
                console.log('checking uid was destroyed: ', res);
            })
            AsyncStorage.getItem('id').then(res => {
                console.log('checking id was destroyed: ', res);
            })
            AsyncStorage.getItem('isLoggedIn').then(res => {
                console.log('checking isLoggedIn is false: ', res);
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

    async setUserDetailsObject(userName, tagline, likes, dislikes, uid) {
        return new Promise((resolve, reject) => {
            
            let uniqueFireStoreDocumentReference = `${Date.now()}_${userName}_${uid}`;
            console.log('AT | uniqueFireStoreDocumentReference: ', uniqueFireStoreDocumentReference);
            AsyncStorage.setItem('id', uniqueFireStoreDocumentReference);

            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
            }

            var db = firebase.firestore();
            db.settings({
                timestampsInSnapshots: true,
            })

            db.collection("users").doc(uniqueFireStoreDocumentReference).set({
                userName,
                tagline,
                likes,
                dislikes,
                uid,
            })
            .then((res) => {
                resolve(uniqueFireStoreDocumentReference)
            })
            .catch((err) => {
                console.error("Error writing document: ", err);
                reject(err);
            });

        })
    }

    async useUIDtoSetID(uid) {
        console.log(' foo 1');
        return new Promise((resolve, reject) => {
            console.log(' foo 2');
        // loop through all docs and retrieve the doc id we want:
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        var db = firebase.firestore();

        console.log(' foo 3');
        db.settings({
            timestampsInSnapshots: true
        });
        console.log(' foo 4');
        let foo;
        console.log(' foo 5');
        db.collection("users").get()
            .then(querySnapshot => {
                console.log(' foo 6');
                querySnapshot.forEach((doc) => {
                    console.log(' foo 7');
                    let userDataObject = doc.data();
                    if (uid === userDataObject.uid) {
                        console.log(' foo 8');
                        // if the user-auth uid from Firebase Authentication
                        // matches one of the Firestore document uid keys
                        // store the doc.id in async storage. Because this is the 'id' we
                        // use in Profile Page to retrieve Firestore details.
                        AsyncStorage.setItem('id', doc.id);
                        foo = doc.id;
                        setTimeout(() => {
                            AsyncStorage.getItem('id').then(res => {
                                console.log('checking `id` was saved to async: ', res);
                            })
                        }, 1000);
                    }
                });
            console.log('foo: ', foo);
            resolve(foo);
            })
            .catch(err => {
                console.log('firebase | couldnt get user deets object or id | err: ', err);
                reject(err);
            });
        })
    }
    
    // *USER AUTHENTICATION* reading, writing email/pw accounts
    async registerUser(email, password) {
        try {
            const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
            console.log('user created created in Firebase user auth: ', user);
            return user;
        } catch (error) {
            console.log('user auth sign up error: ', error);
            return error;
        }
    }

    async login(email, password) {


        console.log('FIREBASE HAS FIRED, AID ', email, password);
        try {
            // clearing Async first because youre logging in afresh
            console.log('destroying async...');
            AsyncStorage.setItem('uid', '');
            AsyncStorage.setItem('id', '');
            AsyncStorage.setItem('isLoggedIn', 'false');
    
            setTimeout(() => {
                AsyncStorage.getItem('uid').then(res => {
                    console.log('checking uid was destroyed: ', res);
                })
                AsyncStorage.getItem('id').then(res => {
                    console.log('checking id was destroyed: ', res);
                })
                AsyncStorage.getItem('isLoggedIn').then(res => {
                    console.log('checking isLoggedIn is false: ', res);
                })
            }, 1000);
            // ^^ clearing Async first because youre logging in afresh ^^ 

            // USER AUTH LOGIN
            let user = await firebase.auth().signInWithEmailAndPassword(email, password);
            console.log('user logged in with Firebase user auth: ', user);
            
            console.log('AT 1');
            if(user && user.uid) {
                // loop through all docs and retrieve the doc id we want:
                console.log('AT 2');
                if (!firebase.apps.length) {
                    firebase.initializeApp(firebaseConfig);
                }
                var db = firebase.firestore();
                console.log('AT 3');
                db.settings({
                    timestampsInSnapshots: true
                });
                console.log('AT 4');
                db.collection("users").get()
                    .then(querySnapshot => {
                        console.log('AT 5 querySnapshot ', querySnapshot);
                        querySnapshot.forEach((doc) => {
                            console.log('AT 6 doc ', doc.data());
                            let userDataObject = doc.data();
                            console.log('AT 7');
                            if (user.uid === userDataObject.uid) {
                                console.log('AT 8 ', doc.id);
                                // if the user-auth uid from Firebase Authentication
                                // matches one of the Firestore document uid keys
                                // store the doc.id in async storage. Because this is the 'id' we
                                // use in Profile Page to retrieve Firestore details.
                                AsyncStorage.setItem('id', doc.id);

                                setTimeout(() => {
                                    AsyncStorage.getItem('id').then(res => {
                                        console.log('checking `id` was saved to async: ', res);
                                    })
                                }, 1000);
                            }
                        });
                    })
                    .catch(err => {
                        console.log('firebase | couldnt get user deets object | err: ', err);
                        reject(err);
                    });
            }
            return user;
        } catch (error) {
            console.log('user auth Login error: ', error);
            return;
        }
    }


}

export default Firebase;