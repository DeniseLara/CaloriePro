import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

// Configuración de Firebase 
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Función para cerrar sesión (Logout)
export const logout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    throw new Error(error.message);
  }
};

// Función para obtener el nombre de usuario desde Firestore
export const getUserName = async (userId) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().userName;  // Retorna el nombre de usuario
    } else {
      console.error('El documento de usuario no existe');
    }
  } catch (error) {
    console.error('Error al obtener el nombre de usuario:', error);
  }
};
