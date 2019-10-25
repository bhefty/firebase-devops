// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from 'firebase/app';

// Add the Firebase services that you want to use
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB_2YRhVbEDU3KxwSQLp_2EK41MYT0qHbs',
  authDomain: 'rmm-bill.firebaseapp.com',
  databaseURL: 'https://rmm-bill.firebaseio.com',
  projectId: 'rmm-bill',
  storageBucket: 'rmm-bill.appspot.com',
  messagingSenderId: '153488626323',
  appId: '1:153488626323:web:9e521c414d78a3c7bab366',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
