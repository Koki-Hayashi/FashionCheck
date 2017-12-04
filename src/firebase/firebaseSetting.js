import * as firebase from 'firebase';

if (!firebase.apps.length) { // if not initialized
  firebase.initializeApp({
	apiKey: "your app key",
	authDomain: "your auth domain",
	databaseURL: "your database url",
	projectId: "your project id",
	storageBucket: "your storage bucket",
	messagingSenderId: "your messaging sender id"
  });
}

export default firebase;