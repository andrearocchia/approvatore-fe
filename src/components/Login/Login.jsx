import { useState } from 'react';
import { loginRequest } from '../../api/apiClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './Login.scss';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginRequest(username, password);

      // Salvare token
      localStorage.setItem("token", data.access_token);

      // User che serve nel token lo recupero dallo decode JWT
      onLogin({ username });

    } catch (error) {
      alert("Credenziali non valide");
      console.error(error);
    }
  };

  return (
    <div className="login-page">
      <form className="login-container" onSubmit={handleSubmit}>
        <h2 className="login-title">
          <FontAwesomeIcon
          icon={faUser}
          className="icon-user"
          />Login
        </h2>
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
