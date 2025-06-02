import { useAuth } from '../context/authContext'
import { useState } from 'react';

export function useAuthForm({ closeModal, navigate }) {
  const { login, signUp, error, setError } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [step, setStep] = useState(1);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar el error
    setLoading(true); // Inicia el estado de carga

    // Validaciones
    if (!email.includes("@") || !email.includes(".")) {
      setError("Por favor, introduce un email válido.");
      setLoading(false);
      return;
    }

    if (userName.trim() === "") {
      setError("El nombre de usuario no puede estar vacío.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      setLoading(false); // Detenemos el estado de carga
      return;
    }

    try {
      const userCredential = await signUp(email, password, userName); // Usamos el servicio de registro

      if (userCredential) {
        closeModal(); // Cerrar el modal
        // Al registrar al usuario, redirigir directamente al Dashboard
        navigate("/dashboard"); 
      }
    } catch (err) {
      console.error("Error en registro:", err);
      setError(err.message); // Mostramos el error de Firebase
    } finally {
      setLoading(false); // Detenemos el estado de carga
    }
  };

  // Manejo del inicio de sesión
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevenimos la recarga de la página
    setLoading(true); // Inicia el estado de carga
    setError(""); // Limpiar error previo

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
      setError("Error al iniciar sesión. Verifique sus credenciales.");
    } finally {
      setLoading(false); // Detenemos el estado de carga
    }
  };


  return {
    email, setEmail,
    password, setPassword,
    userName, setUserName,
    step, setStep,
    loading,
    error,
    handleSignUp,
    handleLogin
  };
}

