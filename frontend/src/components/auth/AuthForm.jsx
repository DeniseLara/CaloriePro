import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useModal } from "../../context/ModalContext";
import { useNavigate } from "react-router-dom";
import LogoButton from '../ui/Button/LogoButton';
import { FORM_CONFIG } from "../../utils/authFormConfig";

function AuthForm({ 
  type = 'login', // 'login' o 'signup'
  onSwitch,
  isOpen,
  serverError,
  handleSubmit: handleAuthSubmit
}) {
  const { closeModal } = useModal();
  const { 
    register, 
    handleSubmit: formHandleSubmit, 
    formState: { errors }, 
    reset,
    setFocus
  } = useForm();
  const navigate = useNavigate();

  const config = FORM_CONFIG[type];
  const isLogin = type === 'login';

  // Enfocar el primer campo
  useEffect(() => {
    if (isOpen && config.fields[0]) {
      setFocus(config.fields[0].name);
    }
  }, [isOpen, setFocus, config.fields]);

  const onSubmit = async (data) => {
    const success = await handleAuthSubmit(type, data);
    if (success) {
      reset();
      closeModal();
      navigate("/dashboard");
    }
  };

  return (
    <div>
      <h2 className={`modal-title ${isLogin ? 'login' : ''}`} id="modal-title">
        {config.title} <LogoButton/>
      </h2>
      
      {config.description && (
        <p className="modal-description" id="modal-desc">
          {config.description}
        </p>
      )}

      <form className="modal-form" onSubmit={formHandleSubmit(onSubmit)}>
        {config.fields.map(field => (
          <div className="form-field" key={field.name}>
            <label className="sr-only" htmlFor={field.name}>
              {field.placeholder}
            </label>
            <input 
              id={field.name}
              type={field.type}
              placeholder={field.placeholder}
              autoComplete={field.autoComplete}
              {...register(field.name, field.validation)}
              className={errors[field.name] ? "error-input" : ""}
            />
            {errors[field.name] && (
              <span className="error-auth-message">
                {errors[field.name].message}
              </span>
            )}
          </div>
        ))}

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
          aria-label={`${config.buttonText.toLowerCase()} to your account`}
        >
          {config.buttonText}
        </button>
      </form>
        
      <p className={`modal-${isLogin ? 'signup' : 'login'}`}>
        {config.switchLabel}{" "}
        <span className="link-switch" onClick={onSwitch}>
          {config.switchText}
        </span>
      </p>
    </div>
  );
}

export default AuthForm;