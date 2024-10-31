import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('/api/register', { name, email, password });
      // Redirecionamento após o cadastro bem-sucedido
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
    }
  };

  return (
    <div>
      <h1>Cadastro</h1>
      <input 
        type="text" 
        placeholder="Nome" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Senha" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={handleRegister}>Cadastrar</button>
    </div>
  );
}
