import { useAuth } from '../context/AuthContext'
import { useState, useCallback } from 'react';
import { useModal } from '../context/ModalContext';
import { useNavigate } from 'react-router-dom';

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

export function useAuthForm() {
  const { closemodal } = useModal()
  const { login, signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const navigate = useNavigate()
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value}));
  }
  
  // función para validar credenciales
  const validateSignUp = useCallback(() => {
    if (!isValidEmail(formData.email)) return "Por favor, introduce un email válido.";
    if (formData.username.trim() === "") return "El nombre de usuario no puede estar vacío.";
    if (formData.password.length < 6) return "La contraseña debe tener al menos 6 caracteres.";
    return null;
  }, [formData]);


  // Manejo de formulario de registro
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(""); 
    setLoading(true); 

    const validationError = validateSignUp();
    if (validationError) {
      setError(validationError)
      setLoading(false);
      return;
    }

    try {
      const userCredential = await signUp(
        formData.username, 
        formData.email,
        formData.password,
      ); 
      if (userCredential) {
        setFormData({ username: "", email: "", password: "" })
      }
      closemodal()
      navigate("/dashboard")
    } catch (err) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false); 
    }
  };


  // Manejo del inicio de sesión
  const handleLogin = async (e) => {
    e.preventDefault(); 
    setError(""); 
    setLoading(true); 

    if (!formData.email || !formData.password) {
      setError("Por favor, ingrese su correo y contraseña");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await login(formData.email, formData.password);
        if (userCredential) {
          setFormData({ email: "", password: ""})
        } 
        closemodal()
        navigate("/dashboard")
      } catch (err) {
        setError(getErrorMessage(err.code));
      } finally {
        setLoading(false); 
    }
  };

  // Función controlada para cambiar de paso
  const switchToLogin = () => setStep(2);
  const switchToSignUp = () => setStep(1);

  return {
    handleChange,
    formData,
    step,
    switchToLogin,
    switchToSignUp,
    loading,
    error,
    handleSignUp,
    handleLogin
  };
}

