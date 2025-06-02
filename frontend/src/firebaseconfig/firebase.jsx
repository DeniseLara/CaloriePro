import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'; 
import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, getDocs } from 'firebase/firestore'; 

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

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);

// Inicializamos Auth y Firestore
const auth = getAuth(app);
const db = getFirestore(app);


// Función para obtener el perfil del usuario desde Firestore
export const getUserProfileFromFirestore = async () => {
  const userUid = auth.currentUser?.uid;
  if (userUid) {
    try {
      const docRef = doc(db, "users", userUid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data(); 
      } else {
        console.warn('El perfil no existe.');
      }
    } catch (error) {
      console.error('Error al obtener los datos del perfil:', error);
    }
  }
  return {};  // Retornamos un objeto vacío si no hay perfil
};

// Función para obtener el historial de alimentos del usuario desde Firestore
export const getFoodHistoryFromFirestore = async (userUid) => {
  
  if (!userUid) {
    console.error('User ID no proporcionado');
    return [];
  }
  try {
    const userDocRef = doc(db, 'users', userUid);  // Refiere al documento del usuario en Firestore
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      // Retorna el historial de alimentos o un array vacío si no existe
      return docSnap.data().foodHistory || [];  
    } else {
      console.error('No se encontró el documento del usuario');
      return [];
    }
  } catch (error) {
    console.error('Error al obtener el historial de alimentos:', error);
    return [];
  }
};

// Función para obtener las calorías consumidas de Firestore
export const getCaloriesFromFirestore = async (userUid) => {
  if (!userUid) {
    console.error('User ID no proporcionado');
    return 0;
  }
  try {
    const docRef = doc(db, "users", userUid); // Referencia al documento del usuario
    const docSnap = await getDoc(docRef); // Obtener el documento

    if (docSnap.exists()) {
      return docSnap.data().caloriesConsumed || 0;  // Retorna las calorías consumidas o 0 si no existe
    } else {
      console.error("No se encontró el documento del usuario.");
      return 0;  // Si no existe el documento, retornamos 0
    }
  } catch (error) {
    console.error("Error al obtener las calorías consumidas:", error);
    return 0;  // En caso de error, retornar 0
  }
};


// Función para guardar las calorías consumidas en Firestore
export const saveCaloriesToFirestore = async (userUid, calories) => {
  try {
    const docRef = doc(db, "users", userUid); // Referencia al documento del usuario
    await updateDoc(docRef, { caloriesConsumed: calories }); // Actualizamos las calorías en Firestore
  } catch (error) {
    console.error("Error al guardar las calorías en Firestore:", error);
  }
};


// Función para escuchar el estado de autenticación
export const listenAuthState = (auth, callback) => {
  const unsubscribe = onAuthStateChanged(auth, callback);
  return unsubscribe; // Retorna la función unsubscribe
};

// Función para cerrar sesión
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};

// Función para obtener el saludo personalizado al ingresar
export const getGreeting = async () => {
  const userProfile = await getUserProfileFromFirestore();
  if (userProfile && userProfile.userName) {
    return `¡Hola, ${userProfile.userName}! Bienvenido de nuevo.`; 
  } else {
    return '¡Bienvenido!';
  }
};

// Función para guardar o actualizar el historial de alimentos en Firestore
export const saveFoodHistoryToFirestore = async (userUid, foodHistory, caloriesConsumed) => {
  try {
    const userDocRef = doc(db, 'users', userUid); // Referencia al documento del usuario en Firestore

    // Actualizar el historial de alimentos y las calorías consumidas
    await updateDoc(userDocRef, {
      foodHistory: foodHistory,  // Guardamos el historial actualizado
      caloriesConsumed: caloriesConsumed // Actualizamos las calorías consumidas
    });

  } catch (error) {
    console.error("Error al guardar el historial de alimentos:", error);
  }
};


// Función para guardar o actualizar el perfil del usuario en Firestore
export const saveUserProfileToFirestore = async (userProfileData) => {
  try {
    const userUid = auth.currentUser?.uid; // Obtiene el UID directamente desde auth
    if (!userUid) {
      console.error("No se pudo obtener el usuario autenticado.");
      return;
    }

    const userDocRef = doc(db, 'users', userUid);

    if (userProfileData && typeof userProfileData === 'object' && Object.keys(userProfileData).length > 0) {
      await updateDoc(userDocRef, userProfileData);  // Solo llamamos a updateDoc una vez
    } else {
      console.error("Datos del perfil no válidos:", userProfileData);
    }
    
  } catch (error) {
    console.error("Error al guardar el perfil del usuario:", error);
  }
};


// Exportamos las funciones necesarias
export { 
  auth, 
  db, 
  signInWithEmailAndPassword, 
  signOut, 
  doc, 
  setDoc,
  getDoc,
  updateDoc,
  onAuthStateChanged,
};
