import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth'; 
import { 
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
  orderBy 
} from 'firebase/firestore'; 
import { auth, db } from './firebaseConfig';
import { getUserDocData, updateUserDoc, getFoodHistoryCollectionRef } from './firestoreHelpers';


// Función para obtener el perfil del usuario desde Firestore
export const getUserProfileFromFirestore = async (userUid) => {
  return await getUserDocData(userUid, {});
};


// Función para obtener las calorías consumidas de Firestore
export const getCaloriesFromFirestore = async (userUid) => {
  const data = await getUserDocData(userUid, { caloriesConsumed: 0 });
  return data.caloriesConsumed || 0;
};


// Función para guardar las calorías consumidas en Firestore
export const saveCaloriesToFirestore = async (userUid, calories) => {
  return updateUserDoc(userUid, { caloriesConsumed: calories });
};


// guardar macros en firestore
export const saveMacrosToFirestore = async (userUid, newMacros) => {
  return updateUserDoc(userUid, {
    protein: newMacros.protein,
    carbs: newMacros.carbs,
    fats: newMacros.fats,
  });
};


// Función para escuchar el estado de autenticación
export const listenAuthState = (callback) => {
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
  if (!userUid) return [];

  try {
    const q = query(getFoodHistoryCollectionRef(userUid), orderBy('date', 'desc'), limit(20));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  } catch {
    return [];
  }
};


export const addFoodItemToHistory = async (userUid, newFoodItem, caloriesConsumed) => {
  if (!userUid) return { success: false, id: null };

  try {
    // Referencia a la subcolección foodHistory dentro del usuario
    const docRef = await addDoc(getFoodHistoryCollectionRef(userUid), newFoodItem);

    return {
      success: true,
      id: docRef.id,
      foodItem: { id: docRef.id, ...newFoodItem }
    }
  } catch {
    return { success: false, id: null };
  }
};


// Función para guardar o actualizar el perfil del usuario en Firestore
export const saveUserProfileToFirestore = async (userProfileData) => {
  const userUid = auth.currentUser?.uid; 
  if (!userUid || !userProfileData || typeof userProfileData !== 'object' || Object.keys(userProfileData).length === 0) {
    return false;
  }

  return updateUserDoc(userUid, userProfileData);
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
