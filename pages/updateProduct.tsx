import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface Product {
  id: string;
  nome: string;
  descricao: string;
  valor: number;
  estoque: number;
  imagem?: File;
}

const UpdateProduct: React.FC = () => {
  const [productData, setProductData] = useState<Product>({
    id: '',
    nome: '',
    descricao: '',
    valor: 0,
    estoque: 0,
    imagem: undefined,
  });
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    // Só busca o produto se o ID estiver definido
    const fetchProduct = async () => {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:5000/api/products/${id}`);
          setProductData(response.data);
        } catch (error) {
          console.error('Erro ao buscar produto:', error);
        }
      }
    };

    fetchProduct();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProductData((prevData) => ({
        ...prevData,
        imagem: file,
      }));
    }
  };

  const handleUpdateProduct = async () => {
    if (!id) return; // Verifica se o ID está disponível antes de prosseguir

    const formData = new FormData();

    if (productData.descricao !== undefined) { 
        formData.append('descricao', productData.descricao);
    }

    if (productData.nome !== undefined) { 
        formData.append('nome', productData.nome);
    }

    if (productData.valor !== undefined) { 
        formData.append('valor', productData.valor.toString());
    }
    
    if (productData.estoque !== undefined) { 
        formData.append('estoque', productData.estoque.toString());
    }

    if (productData.imagem) {
      formData.append('imagem', productData.imagem);
    }

    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Produto atualizado com sucesso!');
      router.push('/dashboard');
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
    }
  };

  return (
    <div>
      <h1>Atualizar Produto</h1>
      <input
        type="text"
        name="nome"
        placeholder="Nome do Produto"
        value={productData.nome}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="descricao"
        placeholder="Descrição do Produto"
        value={productData.descricao}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="valor"
        placeholder="Valor do Produto"
        value={productData.valor}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="estoque"
        placeholder="Quantidade em Estoque"
        value={productData.estoque}
        onChange={handleInputChange}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      <button onClick={handleUpdateProduct}>Atualizar Produto</button>
    </div>
  );
};

export default UpdateProduct;
