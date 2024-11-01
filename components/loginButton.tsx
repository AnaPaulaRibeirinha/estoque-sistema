import React from 'react';
import { useRouter } from 'next/router';

const LoginButton: React.FC = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/loginPage');
  };

  return (
    <button onClick={handleRedirect}>
      Login
    </button>
  );
};

export default LoginButton;