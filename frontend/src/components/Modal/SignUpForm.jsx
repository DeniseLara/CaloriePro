function SignUpForm({ userName, setUserName, email, setEmail, password, setPassword, handleSignUp, setStep, error }) {
  return (
    <div>
      <h2 className="modal-title">Welcome to CaloriePro</h2>
      <p className="modal-description">Create an account to access all features</p>
      <form className="modal-form" onSubmit={handleSignUp}>
        <input type="text" placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="btn" aria-label="sign up to your account">Sign Up</button>
      </form>
      <p className="modal-login">
        Already have an account?{" "}
        <span className="link-switch" onClick={() => setStep(2)}>Login</span>
      </p>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
export default SignUpForm;
