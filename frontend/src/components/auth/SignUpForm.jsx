import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useModal } from "../../context/ModalContext";
import { useNavigate } from "react-router-dom";
import LogoButton from "../ui/Button/LogoButton";

function SignUpForm({ 
  isOpen,
  switchToLogin,
  handleSubmit: handleSignup,
  serverError
  }) {
  const { closeModal } = useModal();
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset,
    setFocus
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setFocus('username');
    }
  }, [isOpen, setFocus])

  const onSubmit = async (data) => {
    const success = await handleSignup('signup', data);
    if (success) {
      reset();
      closeModal();
      navigate("/dashboard");
    } 
  }

  return (
    <div>
      <h2 className="modal-title" id="modal-title">
        Welcome to <LogoButton/>
      </h2>
      <p className="modal-description" id="modal-desc">
        Create an account to access all features
      </p>

      <form className="modal-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-field">
          <label className="sr-only" htmlFor="username"></label>
          <input 
            id="username"
            type="text" 
            placeholder="Username"
            {...register('username', { 
              required: 'Nombre de usuario es requerido',
              minLength: {
                value: 3,
                message: 'Mínimo 3 caracteres'
              }
            })}
            className={errors.username ? "error-input" : ""}
          />
            {errors.username && <span className="error-auth-message">{errors.username.message}</span>}
        </div>

        <div className="form-field">
          <label className="sr-only" htmlFor="email"></label>
          <input 
            id="email"
            type="email" 
            placeholder="Email" 
            {...register('email', {
              required: 'Email es requerido',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Email inválido'
              }
            })}
            className={errors.email ? "error-input" : ""}
          />
            {errors.email && <span className="error-auth-message">{errors.email.message}</span>}
        </div>
        
        <div className="form-field">
          <label className="sr-only" htmlFor="password"></label>
          <input 
            id="password"
            type="password" 
            placeholder="Password" 
            {...register('password', {
              required: 'Contraseña es requerida',
              minLength: {
                value: 6,
                message: 'Mínimo 6 caracteres'
              }
            })}
            className={errors.password ? "error-input" : ""}
          />
            {errors.password && <span className="error-auth-message">{errors.password.message}</span>}
        </div>

        {serverError && (
          <div className="form-field">
            <span className="error-auth-message server-error">
              {serverError}
            </span>
          </div>
        )}

        <button 
          type="submit" 
          className="btn" 
          aria-label="sign up to your account"
        >
          Sign Up
        </button>
      </form>
        
      <p className="modal-login">
        Already have an account?{" "}
        <span className="link-switch" onClick={switchToLogin}>
        Login
        </span>
      </p>
        
    </div>
  );
}

export default SignUpForm;
