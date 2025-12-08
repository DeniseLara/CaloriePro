import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseconfig/firebase';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'; 

const db = getFirestore();

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);  
  const [userName, setUserName] = useState(() => {
    // Intentar obtener userName cacheado en sessionStorage al iniciar 
    return sessionStorage.getItem('userName') || null;
  });  
  const [loading, setLoading] = useState(true);
  
  // Función para obtener el nombre de usuario desde Firestore
  const fetchUserName = async (userId) => {
    if (sessionStorage.getItem('userName')) {
      return;
    }
    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const name = docSnap.data().userName;
        setUserName(name);  // Establece el nombre del usuario en el estado
        sessionStorage.setItem('userName', name); // Guardar en cache
        } else {
        setUserName(null);
        sessionStorage.removeItem('userName');
        }
      } catch (error) {
    }
  };

  // Función para iniciar sesión
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
      setUser(userCredential.user); // Guardamos al usuario autenticado
      setError(null); 
      await fetchUserName(userCredential.user.uid);
      return userCredential.user;
    } catch (err) {
      setError("Error al iniciar sesión: contraseña o correo electrónico incorrecto"); 
      setIsAuthenticated(false);
      throw err;
    }
  };

  // Función para registrar un nuevo usuario
  const signUp = async (userName, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
      setUser(userCredential.user); // Guardamos al usuario autenticado
      setError(null);  

      // Guardamos el nombre de usuario en Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        userName: userName,  // Guardamos el nombre del usuario en Firestore
        email: userCredential.user.email
      });

      setUserName(userName);
      sessionStorage.setItem('userName', userName);
      
      return userCredential;
      
    } catch (err) {
      setError("Error al registrarse: " + err.message); 
      setIsAuthenticated(false);
      throw err;
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    try {
      await auth.signOut();
      setIsAuthenticated(false);
      setUser(null);  
      setUserName(null);  
      sessionStorage.removeItem('userName'); // Limpieza explícita
    } catch (err) {
      setError("Error al cerrar sesión: " + err.message);
    }
  };


  // Efecto que escucha el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);  // Guarda el usuario si está autenticado
        await fetchUserName(user.uid);
        setIsAuthenticated(true);
      } else {
        setUser(null);  // Elimina el usuario si no está autenticado
        setUserName(null);  
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();  // Limpiar el listener al desmontar el componente
  }, []);


  // limpia el error automáticamente
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
      setError(null);
    }, 5000); // oculta el error después de 5 segundos

    return () => clearTimeout(timer); // limpia el timeout si el error cambia antes
    }
  }, [error]);


  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      userName, 
      login, 
      signUp, 
      logout, 
      error, 
      loading 
      }}>
      {children}
    </AuthContext.Provider>
  );
};
