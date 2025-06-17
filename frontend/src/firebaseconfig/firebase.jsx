import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'; 
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  collection, 
  onSnapshot, 
  getDocs,
  query, 
  limit,
  addDoc,
  orderBy } from 'firebase/firestore'; 

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
const auth = getAuth(app);
const db = getFirestore(app);


// Función para obtener el perfil del usuario desde Firestore
export const getUserProfileFromFirestore = async (userUid) => {
  if (!userUid) return {};

  try {
      const docRef = doc(db, "users", userUid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data(); 
      } else {
      }
    } catch (error) {
    }
  
  return {};  // Retornamos un objeto vacío si no hay perfil

};


// Función para obtener las calorías consumidas de Firestore
export const getCaloriesFromFirestore = async (userUid) => {
  if (!userUid) {
    return 0;
  }
  try {
    const docRef = doc(db, "users", userUid); // Referencia al documento del usuario
    const docSnap = await getDoc(docRef); // Obtener el documento

    if (docSnap.exists()) {
      return docSnap.data().caloriesConsumed || 0;  // Retorna las calorías consumidas o 0 si no existe
    } else {
      return 0;  // Si no existe el documento, retornamos 0
    }
  } catch (error) {
    return 0;  // En caso de error, retornar 0
  }
};


// Función para guardar las calorías consumidas en Firestore
export const saveCaloriesToFirestore = async (userUid, calories) => {
  try {
    const docRef = doc(db, "users", userUid); // Referencia al documento del usuario
    await updateDoc(docRef, { caloriesConsumed: calories }); // Actualizamos las calorías en Firestore
  } catch (error) {
  }
};


// Función para escuchar el estado de autenticación
export const listenAuthState = (auth, callback) => {
  const unsubscribe = onAuthStateChanged(auth, callback);
  return unsubscribe; // Retorna la función unsubscribe
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


export const getFoodHistoryFromFirestore = async (userUid) => {
  if (!userUid) {
    return [];
  }

  try {
    const foodHistoryRef = collection(db, 'users', userUid, 'foodHistory');
    const q = query(foodHistoryRef, orderBy('date', 'desc'), limit(20));
    const snapshot = await getDocs(q);

    const foodHistory = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return foodHistory;
  } catch (error) {
    return [];
  }
};


export const addFoodItemToHistory = async (userUid, newFoodItem, caloriesConsumed) => {
  try {
    // Referencia a la subcolección foodHistory dentro del usuario
    const foodHistoryCollectionRef = collection(db, 'users', userUid, 'foodHistory');

    // Agregar nuevo documento con el alimento consumido
    await addDoc(foodHistoryCollectionRef, newFoodItem);

    // Actualizar total de calorías en documento usuario
    const userDocRef = doc(db, 'users', userUid);
    await updateDoc(userDocRef, {
      caloriesConsumed: caloriesConsumed,
    });

  } catch (error) {
  }
};


// Función para guardar o actualizar el perfil del usuario en Firestore
export const saveUserProfileToFirestore = async (userProfileData) => {
  try {
    const userUid = auth.currentUser?.uid; // Obtiene el UID directamente desde auth
    if (!userUid) {
      return;
    }

    const userDocRef = doc(db, 'users', userUid);

    if (userProfileData && typeof userProfileData === 'object' && Object.keys(userProfileData).length > 0) {
      await updateDoc(userDocRef, userProfileData);  // Solo llamamos a updateDoc una vez
    } else {
    }
    
  } catch (error) {
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
  collection,
  onSnapshot,
  getDocs,
  limit,
  orderBy,
  query,
  addDoc,
  onAuthStateChanged,
};
