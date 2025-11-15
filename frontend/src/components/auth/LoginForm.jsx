import { useEffect, useRef } from "react";
import LogoButton from '../ui/Button/LogoButton'

function LoginForm({ 
  formData,
  handleChange,
  handleLogin, 
  setStep, 
  error,
  isOpen,
 }) {

  const emailRef = useRef(null);

  useEffect(() => {
    if (isOpen && emailRef.current) {
      emailRef.current.focus()
    }
  }, [isOpen])

  return (
    <div>
      <h2 className="modal-title login" id="modal-title">
        Login to <LogoButton/>
      </h2>
      <form className="modal-form" onSubmit={handleLogin}>
        <label className="sr-only" htmlFor="email">Email</label>
        <input 
          id="email"
          name="email"
          type="email"
          ref={emailRef} 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange} 
          required
        />

        <label className="sr-only" htmlFor="password">Password</label>
        <input 
          id="password"
          name="password"
          type="password" 
          placeholder="Password" 
          value={formData.password} 
          onChange={handleChange} 
          required 
        />
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
          <span className="link-switch" onClick={() => setStep(1)}>
            Sign Up
          </span>
        </p>
        {error && <p className="error">{error}</p>}
    </div>
  );
}

export default LoginForm;
