// pages/addUser.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const AddUserPage: React.FC = () => {
  const [userData, setUserData] = useState({
    nome: '',
    email: '',
    senha: '',
  });
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/api/users', userData);
      console.log('Usuário cadastrado com sucesso!');
      alert("Cadastro realizado com sucesso!");
      router.push('/dashboard'); // Redireciona para o dashboard após o cadastro
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }
  };

  return (
    <div>
      <h1>Cadastrar Usuário</h1>
      <input
        type="text"
        name="nome"
        placeholder="Nome"
        value={userData.nome}
        onChange={handleInputChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={userData.email}
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="senha"
        placeholder="Senha"
        value={userData.senha}
        onChange={handleInputChange}
      />
      <button onClick={handleRegister}>Cadastrar</button>
    </div>
  );
};

export default AddUserPage;
