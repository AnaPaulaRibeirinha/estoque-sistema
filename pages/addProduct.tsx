import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const AddProduct: React.FC = () => {
  const [productData, setProductData] = useState({
    nome: '',
    descricao: '',
    valor: '',
    estoque: '',
    imagem: null as File | null, // Campo para armazenar o arquivo da imagem
  });
  const router = useRouter();

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
        imagem: file, // Armazena o arquivo BLOB diretamente
      }));
    }
  };

  const handleAddProduct = async () => {
    try {
      // Cria o FormData para enviar os dados
      const formData = new FormData();
      formData.append("nome", productData.nome);
      formData.append("descricao", productData.descricao);
      formData.append("valor", productData.valor);
      formData.append("estoque", productData.estoque);

      if (productData.imagem) {
        formData.append("imagem", productData.imagem); // Adiciona o arquivo BLOB da imagem
      }

      // Envia os dados via axios com multipart/form-data
      const response = await axios.post('http://localhost:5000/api/products', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log('Produto adicionado com sucesso!', response.data);
      router.push('/dashboard'); // Redireciona para a dashboard após o sucesso
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
    }
  };

  return (
    <div>
      <h1>Cadastrar Produto</h1>
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
      <button onClick={handleAddProduct}>Cadastrar Produto</button>
    </div>
  );
};

export default AddProduct;
