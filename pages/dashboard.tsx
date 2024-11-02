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
  imagem: string; // Nova propriedade para a URL da imagem
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
      
      // Converter o Buffer da imagem para uma string base64
      const productsWithImages = response.data.map((product: Product) => ({
        ...product,
        imagem: `data:image/jpeg;base64,${Buffer.from(product.imagem).toString('base64')}`, // Ajuste o tipo conforme necessário
      }));
  
      setProducts(productsWithImages);
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
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/loginPage');
    } else {
      setUser(JSON.parse(userData) as User);
    }
  }, [router]);

  if (loading) return <div className="text-center">Carregando...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Dashboard</h1>
      {user ? (
        <div className="d-flex justify-content-between align-items-center">
          <p>Olá, <strong>{user.nome}</strong>!</p>
          <LogoutButton />
        </div>
      ) : (
        <div className="d-flex justify-content-between align-items-center">
          <p>Você não está logado.</p>
          <LoginButton />
        </div>
      )}

      <div className="d-flex justify-content-end mb-3">
        <AddProductButton />
        {!user && <AddUserButton />}
      </div>

      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Estoque</th>
            <th>Imagem</th> {/* Nova coluna para a imagem */}
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
                <img src={product.imagem} alt={product.nome} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
              </td>
              <td className="d-flex gap-2">
                <UpdateProductButton productId={product.id} />
                <DeleteProductButton productId={product.id} onDelete={fetchProducts} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
