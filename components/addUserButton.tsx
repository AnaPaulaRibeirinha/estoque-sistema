import React from 'react';
import { useRouter } from 'next/router';

const AddUserButton: React.FC = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/addUserPage');
  };

  return (
    <button className="btn btn-success mt-3" onClick={handleRedirect}>
      Cadastro
    </button>
  );
};

export default AddUserButton;
