import { useState } from 'react';
import { loginRequest } from '../../api/apiClient';
import './Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginRequest(username, password);

      // Salvare token (lo useremo in step 2)
      localStorage.setItem("token", data.access_token);

      // Non abbiamo il “user” nel token, ma lo recupereremo dallo decode JWT in step 2
      onLogin({ username });

    } catch (error) {
      alert("Credenziali non valide");
      console.error(error);
    }
  };

  return (
    <div className="login-page">
      <form className="login-container" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>

        <label>Username</label>
        <input
          type="text"
          placeholder="Inserisci username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Inserisci password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="login-button">Accedi</button>
      </form>
    </div>
  );
}

export default Login;
