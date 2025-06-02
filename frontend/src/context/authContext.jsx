import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseconfig/firebase';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';  // Importamos Firestore
import { useNavigate } from 'react-router-dom';

// Inicializamos Firestore
const db = getFirestore();

// Creamos el contexto de autenticación
const AuthContext = createContext();

// Hook personalizado para usar la autenticación
export const useAuth = () => {
  return useContext(AuthContext);
};

// Componente que provee el contexto
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);  // Añadimos el estado de error
  const [userName, setUserName] = useState(null);  // Nuevo estado para guardar el nombre de usuario
  const navigate = useNavigate();


  // Función para iniciar sesión
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
      setUser(userCredential.user); // Guardamos al usuario autenticado
      setError(null);  // Limpiamos el error

      // Ahora obtenemos el nombre de usuario desde Firestore
      await fetchUserName(userCredential.user.uid);  // Llamamos para obtener el nombre
      navigate('/dashboard'); // Redirige al dashboard después de iniciar sesión

    } catch (err) {
      setError("Error al iniciar sesión: contraseña o correo electrónico incorrecto " /*+ err.message*/); // Guardamos el mensaje de error
      setIsAuthenticated(false);
    }
  };

   //Función para registrar un nuevo usuario
  const signUp = async (email, password, userName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
      setUser(userCredential.user); // Guardamos al usuario autenticado
      setError(null);  // Limpiamos el error

      // Guardamos el nombre de usuario en Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        userName: userName,  // Guardamos el nombre del usuario en Firestore
        email: userCredential.user.email
      });

      // Después de registrar, obtenemos el nombre del usuario
      await fetchUserName(userCredential.user.uid);  // Llamamos para obtener el nombre
      navigate('/dashboard'); // Redirige al dashboard después de registrarse

    } catch (err) {
      setError("Error al registrarse: " + err.message); // Guardamos el mensaje de error
      setIsAuthenticated(false);
    }
  };

  // Función para obtener el nombre de usuario desde Firestore
  const fetchUserName = async (userId) => {
    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserName(docSnap.data().userName);  // Establece el nombre del usuario en el estado
      }
    } catch (error) {
      console.error('Error al obtener el nombre del usuario:', error);
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    try {
      await auth.signOut();
      setIsAuthenticated(false);
      setUser(null);  // Elimina el usuario
      setUserName(null);  // Elimina el nombre del usuario
    } catch (err) {
      setError("Error al cerrar sesión: " + err.message);
    }
  };


  // Efecto que escucha el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);  // Guarda el usuario si está autenticado
        await fetchUserName(user.uid);
      } else {
        setIsAuthenticated(false);
        setUser(null);  // Elimina el usuario si no está autenticado
        setUserName(null);  // Elimina el nombre del usuario
      }
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
      setError, 
      setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
