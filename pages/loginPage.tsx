// pages/login.tsx
import React, { useState } from 'react';
import api from '../api';
import { useRouter } from 'next/router';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await api.post('http://localhost:5000/api/login', { email, senha });
      const { token, user } = response.data;

      // Salva o token e dados do usuário no localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Redireciona para o dashboard após login bem-sucedido
      router.push('/dashboard');
    } catch (err) {
      setError('Email ou senha incorretos');
      console.error('Erro ao realizar login:', err);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button onClick={handleLogin}>Entrar</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;
