import React from 'react';
import { useRouter } from 'next/router';

const LogoutButton: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/loginPage'); 
  };

  return (
    <button className="btn btn-danger" onClick={handleLogout}>
      Sair
    </button>
  );
};

export default LogoutButton;
