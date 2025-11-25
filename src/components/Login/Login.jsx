import { useState } from 'react';
import './Login.css';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!username || !password) {
      setError('Inserire username e password');
      return;
    }

    if (username === 'admin' && password === 'password') {
      onLogin && onLogin({ username, token: 'mock-token-123' });
      setUsername('');
      setPassword('');
    } else {
      setError('Credenziali non valide (usa admin / password)');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-field">
          <label className="login-label">Username</label>
          <input
            className="login-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </div>

        <div className="login-field">
          <label className="login-label">Password</label>
          <input
            className="login-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>

        {error && <div className="login-error">{error}</div>}

        <button type="submit" className="login-button">
          Accedi
        </button>
      </form>
    </div>
  );
}
