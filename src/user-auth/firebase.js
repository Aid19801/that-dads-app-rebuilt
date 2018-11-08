import React from 'react';
import firebase from 'firebase';
import { AsyncStorage } from 'react-native';
export const firebaseConfig = {
    apiKey: "AIzaSyCEfHnVHjKNKQqmGcIeONrHFDFVm3t6wyc",
    authDomain: "that-dads-app-1537690533208.firebaseapp.com",
    databaseURL: "https://that-dads-app-1537690533208.firebaseio.com",
    projectId: "that-dads-app-1537690533208",
    storageBucket: "that-dads-app-1537690533208.appspot.com",
    messagingSenderId: "93145385619"
}

export const signUp = async (email, password) => {
    try {
        let user = await firebase.auth().createUserWithEmailAndPassword(email, password);
        console.log('firebase | user created: ', user);
        return user;
    } catch (error) {
        console.log('firebase | signUp | created User ERROR: ', error);
        return error;
    }
}

export const login = async (email, password) => {
    try {
        let loginStatus = await firebase.auth().signInWithEmailAndPassword(email, password);
        console.log('firebase login returned: ', loginStatus);
        return loginStatus;
    } catch (error) {
        return error;
    }
}

export const logout = async () => {
    console.log('AT | logging out of Firebase & Killing AsyncStorage...');
    try {
        await firebase.auth().signOut();
        await destroyAsync();
    } catch (error) {
        console.log('firebase logout error: ', error);
    }
}

export const saveAsync = async (uid) => {
    console.log('AT | save async: ', uid);
    AsyncStorage.setItem('uid', uid);

    setTimeout(() => {
        AsyncStorage.getItem('uid').then(res => {
            console.log('checking uid was saved to async: ', res);
        })
    }, 1000)
}

export const checkAsync = async () => {
    console.log('checking AsyncStorage... ');
    let uid = await AsyncStorage.getItem('uid');
    return uid;
}

export const destroyAsync = async () => {
    console.log('AT | destroying async...');
    AsyncStorage.setItem('uid', '');

    setTimeout(() => {
        AsyncStorage.getItem('uid').then(res => {
            console.log('checking uid was destroyed: ', res);
        })
    }, 1000);
}

const FirebaseFactory = PlatformSpecificComponent => {
    const Firebase = (props) => {
        const allProps = {
            ...props,
            signUp,
            login,
            logout,
            saveAsync,
            checkAsync,
            destroyAsync,
        }
        return <PlatformSpecificComponent {...allProps} />
    }
    return Firebase;
}

export default FirebaseFactory;
