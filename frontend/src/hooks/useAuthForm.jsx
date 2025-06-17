import { useAuth } from '../context/AuthContext'
import { useState, useCallback } from 'react';
import { useNavigate } from "react-router-dom"; 

// Regex simple para validar email
const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

// Mapeo simple de errores Firebase a mensajes en español
const getErrorMessage = (code) => {
  switch (code) {
    case "auth/email-already-in-use":
      return "Este correo ya está registrado.";

    case "auth/invalid-email":
      return "Correo inválido.";

    case "auth/user-not-found":
      return "Usuario no encontrado.";

    case "auth/wrong-password":
    case "auth/invalid-credential":  
      return "Correo o contraseña incorrectos."; 

    default:
      return "Error inesperado, intenta de nuevo.";
  }
};

export function useAuthForm({ closeModal }) {
  const navigate = useNavigate();
  const { login, signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formUserName, setFormUserName] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState(""); // Error local
  
  const validateSignUp = useCallback(() => {
    if (!isValidEmail(email)) return "Por favor, introduce un email válido.";
    if (formUserName.trim() === "") return "El nombre de usuario no puede estar vacío.";
    if (password.length < 6) return "La contraseña debe tener al menos 6 caracteres.";
    return null;
  }, [email, formUserName, password]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar el error
    setLoading(true); // Inicia el estado de carga

    const validationError = validateSignUp();
    if (validationError) {
      setError(validationError)
      setLoading(false);
      return;
    }

    try {
      const userCredential = await signUp(email, password, formUserName); // Usamos el servicio de registro
      if (userCredential) {
        closeModal(); // Cerrar el modal
        // Al registrar al usuario, redirigir directamente al Dashboard
        navigate("/dashboard"); 
      }
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false); // Detenemos el estado de carga
    }
  };

  // Manejo del inicio de sesión
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevenimos la recarga de la página
    setError(""); // Limpiar error previo
    setLoading(true); // Inicia el estado de carga

    if (!email || !password) {
      setError("Por favor, ingrese su correo y contraseña");
      setLoading(false);
      return;
    }

    try {
    const userCredential = await login(email, password);
    if (userCredential) {
      closeModal();
      navigate("/dashboard");
    } 
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false); // Detenemos el estado de carga
    }
  };


  return {
    email, setEmail,
    password, setPassword,
    formUserName, setFormUserName,
    step, setStep,
    loading,
    error,
    handleSignUp,
    handleLogin
  };
}

