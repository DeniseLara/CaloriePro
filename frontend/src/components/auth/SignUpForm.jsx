import PropTypes from "prop-types";

function SignUpForm({ 
  formUserName, 
  setFormUserName,  
  email, 
  setEmail, 
  password, 
  setPassword, 
  handleSignUp, 
  setStep, 
  error,
  loading 
  }) {

  return (
    <div>
      <h2 className="modal-title" id="modal-title">
        Welcome to CaloriePro
      </h2>
      <p className="modal-description" id="modal-desc">
        Create an account to access all features
      </p>
      <form className="modal-form" onSubmit={handleSignUp}>
        <input 
          type="text" 
          placeholder="Username" 
          value={formUserName} 
          onChange={(e) => setFormUserName(e.target.value)}
          required 
        />

        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          required 
        />

        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
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

SignUpForm.propTypes = {
  formUserName: PropTypes.string.isRequired,
  setFormUserName: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleSignUp: PropTypes.func.isRequired,
  setStep: PropTypes.func.isRequired,
  error: PropTypes.string,       
  loading: PropTypes.bool,
};

export default SignUpForm;
