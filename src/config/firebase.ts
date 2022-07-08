import firebase from "firebase/compat/app";
import "firebase/compat/database";
import {
  CHILD_TYPE,
  DATABASE_TABLE_NAME,
  MESSAGES,
  NOTIFICATION_TYPE,
} from "../utilities/constants";
import { sendNotification } from "../utilities/helper";

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
export const songsRef = databaseRef.child(DATABASE_TABLE_NAME);

export const addSong = async (
  spotifyId: string,
  imageUrl: string,
  name: string,
  trackUri: string
) => {
  const data = {
    spotifyId,
    imageUrl,
    name,
    trackUri,
  };
  const query = songsRef.orderByChild(CHILD_TYPE.TRACK_URI).equalTo(trackUri);
  query
    .once("value")
    .then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const childData = childSnapshot.val();
          if (childData.spotifyId === spotifyId) {
            sendNotification(
              NOTIFICATION_TYPE.INFO,
              `${name} ${MESSAGES.ALREADY_IN_LIBRARY}`
            );
          } else {
            songsRef.push(data);
            sendNotification(
              NOTIFICATION_TYPE.SUCCESS,
              `${name} ${MESSAGES.SONG_ADDED_SUCCESS}`
            );
          }
        });
      } else if (!snapshot.exists()) {
        songsRef.push(data);
        sendNotification(
          NOTIFICATION_TYPE.SUCCESS,
          `${name} ${MESSAGES.SONG_ADDED_SUCCESS}`
        );
      } else {
        sendNotification(NOTIFICATION_TYPE.ERROR, MESSAGES.ERROR);
      }
    })
    .catch((error) => {
      sendNotification(NOTIFICATION_TYPE.ERROR, `${error.message}`);
    });
};

export const deleteSong = (trackUri: string, name: string) => {
  const query = songsRef.orderByChild(CHILD_TYPE.TRACK_URI).equalTo(trackUri);
  query
    .once("child_added", (snapshot) => {
      snapshot.ref.remove();
      sendNotification("success", `${name} ${MESSAGES.SONG_REMOVED_SUCCESS}`);
    })
    .catch((error) => {
      sendNotification(NOTIFICATION_TYPE.ERROR, `${error.message}`);
    });
};
