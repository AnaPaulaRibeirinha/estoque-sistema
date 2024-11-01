// components/LogoutButton.tsx
import React from 'react';
import { useRouter } from 'next/router';

const LogoutButton: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Remove o token do localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/loginPage'); // Redireciona para a página de login após o logout
  };

  return (
    <button onClick={handleLogout}>
      Sair
    </button>
  );
};

export default LogoutButton;
