import { useEffect, useRef } from "react";
import LogoButton from "../ui/Button/LogoButton";

function SignUpForm({ 
  formData,
  handleChange,
  handleSignUp, 
  setStep, 
  error,
  loading,
  isOpen, 
  }) {

  const userNameRef = useRef(null);

  useEffect(() => {
    if (isOpen && userNameRef.current) {
      userNameRef.current.focus()
    }
  }, [isOpen])

  return (
    <div>
      <h2 className="modal-title" id="modal-title">
        Welcome to <LogoButton/>
      </h2>
      <p className="modal-description" id="modal-desc">
        Create an account to access all features
      </p>

      <form className="modal-form" onSubmit={handleSignUp}>
        <label className="sr-only" htmlFor="username"></label>
        <input 
          id="username"
          name="username"
          type="text" 
          placeholder="Username"
          ref={userNameRef} 
          value={formData.username} 
          onChange={handleChange}
          required 
        />

        <label className="sr-only" htmlFor="email"></label>
        <input 
          id="email"
          name="email"
          type="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange}
          required 
        />
        
        <label className="sr-only" htmlFor="password"></label>
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
          aria-label="sign up to your account"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
        
      <p className="modal-login">
        Already have an account?{" "}
        <span className="link-switch" onClick={() => setStep(2)}>
        Login
        </span>
      </p>
        
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default SignUpForm;
