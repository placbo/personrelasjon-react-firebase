import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { addDoc, collection, getDocs, getFirestore, query, where, doc, setDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { Person } from '../types/person';

export const PERSONS_COLLECTION_NAME = 'persons';
export const COMMUNITY_COLLECTION_NAME = 'communities';

const firebaseConfig = {
  apiKey: 'AIzaSyBlc-9cBQVLLXdLxYfVpgh8I3iFALoQ7E0',
  authDomain: 'todo-2ac34.firebaseapp.com',
  databaseURL: 'https://todo-2ac34.firebaseio.com',
  projectId: 'todo-2ac34',
  storageBucket: 'todo-2ac34.appspot.com',
  messagingSenderId: '144767486267',
  appId: '1:144767486267:web:53c6a77d36c83e42db4f1e',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage();

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

export const personsRef = collection(db, PERSONS_COLLECTION_NAME);
export const communityRef = collection(db, COMMUNITY_COLLECTION_NAME);

export const updatePerson = async (person: Person) => {
  if (person.id) await setDoc(doc(db, PERSONS_COLLECTION_NAME, person.id), person);
};

// const getPerson = async (id: string = '0ttbjQBY2GOnc4QFg4ey') => {
//   const personRef = doc(db, PERSONS_COLLECTION_NAME, id);
//   const personSnap = await getDoc(personRef);
//   if (personSnap.exists()) {
//     console.log('Data:', personSnap.data().name);
//   } else {
//     console.log('No such person!');
//   }
// };

// const get3PersonsSorted = async () => {
//   const q = query(personsRef, orderBy('name'), limit(3));
//   const querySnapshot = await getDocs(q);
//   querySnapshot.forEach((doc) => {
//     console.log(doc.id, ' => ', doc.data().name);
//   });
// };
