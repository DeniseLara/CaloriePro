import { useState } from "react";
import { useAuth } from '../context/AuthContext'

export function useAuthForm() {
  const { login, signUp } = useAuth();
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (type, data) => {
    setLoading(true);
    setServerError(null);
    
    try {
      if (type === 'login') {
        await login(data.email, data.password);
      } else if (type === 'signup') {
        await signUp(data.username, data.email, data.password);
      }      
    } catch (err) {
      const errorMap = {
        'auth/invalid-credential': 'Correo o contraseña incorrectos',
        'auth/email-already-in-use': 'Este email ya está registrado',
        'auth/weak-password': 'La contraseña es demasiado débil (min 6 caracteres)',
        'auth/network-request-failed': 'Error de conexión. Revisa tu internet.',
      };
      
      const errorMessage = errorMap[err.code] || 'Error desconocido en la autenticación';
      setServerError(errorMessage);
      throw new Error(errorMessage);

    } finally {
      setLoading(false);
    }    
  };

  return {
    serverError,
    loading,
    handleSubmit,
  };
}