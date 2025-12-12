import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useModal } from "../../context/ModalContext";
import { useNavigate } from "react-router-dom";
import LogoButton from '../ui/Button/LogoButton'

function LoginForm({ 
  isOpen,
  switchToSignUp,
  handleSubmit: handleLogin,
  serverError
 }) {
  const { closeModal } = useModal()
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
      setFocus('email');
    }
  }, [, setFocus])

  const onSubmit = async (data) => {
    const success = await handleLogin('login', data);
    if (success) {
      reset();
      closeModal();
      navigate("/dashboard");
    }
  }

  return (
    <div>
      <h2 className="modal-title login" id="modal-title">
        Login to <LogoButton/>
      </h2>
      <form className="modal-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-field">
          <label className="sr-only" htmlFor="email">Email</label>
          <input 
            id="email"
            type="email"
            {...register('email', {
              required: 'Email es requerido',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Email inválido'
              }
            })}
            placeholder="Email"
            className={errors.email ? "error-input" : ""} 
          />
            {errors.email && <span className="error-auth-message">{errors.email.message}</span>}
        </div>

        <div className="form-field">
          <label className="sr-only" htmlFor="password">Password</label>
          <input 
            id="password"
            type="password"
            placeholder="Password" 
            {...register('password', {
              required: 'Contraseña es requerida'
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
          aria-label="login to your account"
        >
          Login
        </button>
      </form>
        
      <p className="modal-signup">
        Don't have an account?{" "}
        <span className="link-switch" onClick={switchToSignUp}>
          Sign Up
        </span>
      </p>
        
    </div>
  );
}

export default LoginForm;
