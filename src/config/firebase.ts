import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { sendNotification } from '../utilities/helper';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_API_ID,
};

firebase.initializeApp(firebaseConfig);
const databaseRef = firebase.database().ref();
export const songsRef = databaseRef.child('songs');

export const addSong = async (spotifyId: string, imageUrl: string, name: string, trackUri: string) => {
  const data = {
    spotifyId,
    imageUrl,
    name,
    trackUri,
  };
  const query = songsRef.orderByChild('trackUri').equalTo(trackUri);
  query.once('value')
    .then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const childData = childSnapshot.val();
          if (childData.spotifyId === spotifyId) {
            sendNotification('info', `${name} already in Library`);
          } else {
            songsRef.push(data);
            sendNotification('success', `${name} added to Library`);
          }
        });
      } else if (!snapshot.exists()) {
        songsRef.push(data);
        sendNotification('success', `${name} added to Library`);
      } else {
        sendNotification('error', 'An Error Occured');
      }
    }).catch((error) => {
      sendNotification('error', `${error.message}`);
    });
};

export const deleteSong = (trackUri: string, name: string) => {
  const query = songsRef.orderByChild('trackUri').equalTo(trackUri);
  query.once('child_added', (snapshot) => {
    snapshot.ref.remove();
    sendNotification('success', `${name} removed from Library`);
  });
};
