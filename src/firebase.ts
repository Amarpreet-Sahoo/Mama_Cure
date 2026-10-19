import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDEypUP6UY1dGHQbYQAm2vAsfBPGHTvnVI',
  authDomain: 'pp-care.firebaseapp.com',
  projectId: 'pp-care',
  storageBucket: 'pp-care.firebasestorage.app',
  messagingSenderId: '262729633730',
  appId: '1:262729633730:web:ec062b91e202542b9c905b',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
