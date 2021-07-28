import firebase from 'firebase/app';
import "firebase/firestore";
import 'firebase/auth';
// import "firebase/database"

const config = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DB,
    projectId: process.env.REACT_APP_PID,
    storageBucket: process.env.REACT_APP_SB,
    messagingSenderId: process.env.REACT_APP_SID,
    appId: process.env.REACT_APP_APPID,
    measurementId: process.env.REACT_APP_MID
};
firebase.initializeApp(config);
// const databaseRef = firebase.database().ref();
// export const todosRef = databaseRef.child("todos")
export default firebase;


export const auth = firebase.auth();
export const firestore = firebase.firestore();


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
    promt: "select_account",
});

// Check if user exists if not create a user
export const createUserProfileDocument = async (userAuth: any, additionalData?: any) => {
    if (!userAuth) return;

    const userReference = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userReference.get();
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userReference.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log(error)
        }
    }
    return userReference;
}

// const settings = { timestampsInSnapshots: true };
// firestore.settings(settings);

export function addTodo(collection: string, id: string | undefined, data: firebase.firestore.DocumentData) {
    return firestore
        .collection(collection)
        .doc(id)
        .set(data);
}

export function getTodos(collection: string) {
    return firestore.collection(collection).get();
}

export function updateTodo(collection: string, id: string | undefined, data: firebase.firestore.UpdateData) {
    return firestore
        .collection(collection)
        .doc(id)
        .update(data);
}

export function deleteTodo(collection: string, id: string | undefined) {
    return firestore
        .collection(collection)
        .doc(id)
        .delete();
}


export const createTodo = async (additionalData?: any) => {

    const todoReference = firestore.doc(`todo/`);
    const snapShot = await todoReference.get();
    if (!snapShot.exists) {
        // const { displayName, email } = additionalData;
        // const createdAt = new Date();
        try {
            console.log("snapShot")
            // await todoReference.set({
            //     // displayName,
            //     // email,
            //     createdAt,
            //     ...additionalData
            // })
        } catch (error) {
            console.log(error)
        }
    }
    return todoReference;
}
// export const signInWithGoogle = () => auth.signInWithPopup(provider);
