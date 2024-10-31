// pages/dashboard.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import AddProductButton from '../components/addProductButton'; // Importe o componente

interface Product {
  id: string;
  nome: string;
  descricao: string;
  valor: number;
  estoque: number;
}

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products'); // Ajuste a URL conforme necessário
        setProducts(response.data);
      } catch (err) {
        setError('Erro ao buscar produtos.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleLogout = () => {
    // Implementa o logout, removendo o token do localStorage
    localStorage.removeItem('token'); // Supondo que você armazena o token no localStorage
    router.push('/login'); // Redireciona para a página de login
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout} style={styles.button}>
        Logout
      </button>
      <AddProductButton /> {/* Usa o componente para cadastrar produtos */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Estoque</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  button: {
    padding: '10px 20px',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    margin: '10px 0', // Adiciona um espaçamento
  },
};

export default Dashboard;
