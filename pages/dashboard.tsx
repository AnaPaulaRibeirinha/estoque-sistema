// pages/dashboard.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import AddProductButton from '../components/addProductButton';
import UpdateProductButton from '../components/updateProductButton';
import DeleteProductButton from '../components/deleteProductButton';
import AddUserButton from '../components/addUserButton';
import LoginButton from '../components/loginButton';
import LogoutButton from '../components/logoutButton';

interface Product {
  id: string;
  nome: string;
  descricao: string;
  valor: number;
  estoque: number;
}

interface User {
  id: string;
  nome: string;
  email: string;
}

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (err) {
      setError('Erro ao buscar produtos.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Verifica se o usuário está autenticado
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/loginPage'); // Redireciona para o login se não estiver autenticado
    } else {
      setUser(JSON.parse(userData) as User);
    }
  }, [router]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <>
          <p>Olá, {user.nome}!</p>
          <LogoutButton />
        </>
      ) : (
        <>
          <p>Você não está logado.</p>
          <LoginButton />
        </>
      )}
      <AddProductButton />
      <AddUserButton />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Estoque</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.nome}</td>
              <td>{product.descricao}</td>
              <td>{product.valor}</td>
              <td>{product.estoque}</td>
              <td>
                <UpdateProductButton productId={product.id} />
                <DeleteProductButton
                  productId={product.id}
                  onDelete={fetchProducts} // Atualiza a lista após exclusão
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
