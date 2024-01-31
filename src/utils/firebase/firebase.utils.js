import { initializeApp } from 'firebase/app';

import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore';


// App's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDMNilD1ZE6_Tim8X6eDsi1KELMF9mN7-s",
    authDomain: "shopping-site-db-add52.firebaseapp.com",
    projectId: "shopping-site-db-add52",
    storageBucket: "shopping-site-db-add52.appspot.com",
    messagingSenderId: "737763500337",
    appId: "1:737763500337:web:5cf60791ffcac881f25010"
  };
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => 
    signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => 
    signInWithRedirect(auth, googleProvider);

// Initialize Firestore
export const db = getFirestore();

// upload data to firestore database
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    // get collection reference
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log('Done');
}

// get the data from firestore database
export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');

    // can also be done using getDocs(collectionRef). so query() will not be required to fetch all data
    // query(collectionRef, where(condition)) allow to pass a condition to get specific data
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    // Just getting the data. Data will be transformed in categories selector
    return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation = {}
) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    // console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    // console.log(userSnapshot);
    // console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch(error) {
            console.log('error creating the user', error.message)
        }
    }

    return userSnapshot;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    const resp = await createUserWithEmailAndPassword(auth, email, password);
    console.log(resp);
    return resp;
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    
    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => 
    onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth, 
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        )
    })
}






