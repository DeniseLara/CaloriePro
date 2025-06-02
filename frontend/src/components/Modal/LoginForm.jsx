function LoginForm({ email, setEmail, password, setPassword, handleLogin, setStep, error }) {
  return (
    <div>
      <h2 className="modal-title login">Login to CaloriePro</h2>
      <form className="modal-form" onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="btn" aria-label="login to your account">Login</button>
      </form>
      <p className="modal-signup">
        Don't have an account?{" "}
        <span className="link-switch" onClick={() => setStep(1)}>Sign Up</span>
      </p>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
export default LoginForm;
