import { doc, getDoc, updateDoc, collection } from 'firebase/firestore';
import { db } from './firebaseConfig';

export const getUserDocData = async (userUid, defaultValue = {}) => {
    if (!userUid) return defaultValue;

    try {
        const docSnap = await getDoc(doc(db, 'users', userUid));
        if (!docSnap.exists()) return defaultValue;
        return docSnap.data();
    } catch {
        return defaultValue;
    }
};

export const updateUserDoc = async (userUid, data) => {
    if (!userUid) return false;

    try {
        await updateDoc(doc(db, 'users', userUid), data);
        return true;
    } catch {
        return false;
    }
};

export const getFoodHistoryCollectionRef = (userUid) => {
    return collection(db, "users", userUid, "foodHistory");
}