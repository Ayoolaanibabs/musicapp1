import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const FIREBASE_API_KEY: string = (process.env.FIREBASE_API_KEY as string);
const FIREBASE_AUTH_DOMAIN: string = (process.env.FIREBASE_AUTH_DOMAIN as string)
const FIREBASE_DATABASE_URL: string = (process.env.FIREBASE_DATABASE_URL as string)
const FIREBASE_PROJECT_ID: string = (process.env.FIREBASE_PROJECT_ID as string)
const FIREBASE_STORAGE_BUCKET: string = (process.env.FIREBASE_STORAGE_BUCKET as string)
const FIREBASE_MESSAGING_SENDER_ID: string = (process.env.FIREBASE_MESSAGING_SENDER_ID as string)
const FIREBASE_API_ID: string = (process.env.FIREBASE_API_ID as string)

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_API_ID
};


firebase.initializeApp(firebaseConfig);
const databaseRef = firebase.database().ref();
export const songsRef = databaseRef.child("songs");

export const addSong = (spotifyId: string, imageUrl: string, name: string, songUri: string) => {
  // e.preventDefault();
  const data = {
    spotifyId,
    imageUrl,
    name,
    songUri
  }
  songsRef.push(data);
} 

// export const getSongsBySpotifyId = (spotifyId: string) => {
//   songsRef.get().then((snapshot) => {
//     if (snapshot.exists()) {
//       console.log(snapshot.val());
//     } else {
//       console.log("No data available");
//     }
//   })
// }
