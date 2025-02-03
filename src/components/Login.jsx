import { useState } from "react";
import authService from "../service/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await authService.signInWithEmail(email);
      setMessage("Verifique seu e-mail para fazer login.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <h4 className="text-center mb-3">Login</h4>
        <div className="mb-3">
          <label className="form-label">E-mail</label>
          <input
            type="email"
            className="form-control"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>
        <button className="btn btn-primary w-100" onClick={handleLogin} disabled={loading}>
          {loading ? <span className="spinner-border spinner-border-sm"></span> : "Enviar Magic Link"}
        </button>
        {message && <p className="mt-3 text-muted text-center">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
