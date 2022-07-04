import firebase from 'firebase/compat/app';
import 'firebase/compat/database';


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID ,
  appId: process.env.REACT_APP_FIREBASE_API_ID 
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
