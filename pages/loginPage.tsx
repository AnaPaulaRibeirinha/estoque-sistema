// pages/login.tsx
import React, { useState } from 'react';
import api from '../api';
import { useRouter } from 'next/router';
import AddUserButton from '../components/addUserButton';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await api.post('http://localhost:5000/api/login', { email, senha });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      router.push('/dashboard');
    } catch (err) {
      setError('Email ou senha incorretos');
      console.error('Erro ao realizar login:', err);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Login</h1>
      <input
        type="email"
        className="form-control mb-3"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="form-control mb-3"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <div className="d-flex align-items-center mt-3">
        <button className="btn btn-primary" onClick={handleLogin}>
          Entrar
        </button>
        {error && <p className="text-danger mb-0 ms-3">{error}</p>}
      </div>
      <AddUserButton />
    </div>
  );
};

export default LoginPage;
