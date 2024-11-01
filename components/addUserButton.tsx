// components/AddUserButton.tsx
import React from 'react';
import { useRouter } from 'next/router';

const AddUserButton: React.FC = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/addUserPage');
  };

  return (
    <button onClick={handleRedirect}>
      Cadastro
    </button>
  );
};

export default AddUserButton;
