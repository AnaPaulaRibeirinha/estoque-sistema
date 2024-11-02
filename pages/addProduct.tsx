import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const AddProduct: React.FC = () => {
  const [productData, setProductData] = useState({
    nome: '',
    descricao: '',
    valor: '',
    estoque: '',
    imagem: null as File | null, 
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
        imagem: file, 
      }));
    }
  };

  const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2 MB

  const handleAddProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("nome", productData.nome);
      formData.append("descricao", productData.descricao);
      formData.append("valor", productData.valor);
      formData.append("estoque", productData.estoque);

      if (productData.imagem) {
        if (productData.imagem.size > MAX_IMAGE_SIZE) {
          alert('O arquivo da imagem é muito grande. O tamanho máximo permitido é de 2 MB.');
          return; 
        }
        formData.append("imagem", productData.imagem);
      }

      const response = await axios.post('http://localhost:5000/api/products', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log('Produto adicionado com sucesso!', response.data);
      router.push('/dashboard');
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Cadastrar Produto</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">Nome do Produto</label>
          <input
            type="text"
            name="nome"
            id="nome"
            className="form-control"
            placeholder="Nome do Produto"
            value={productData.nome}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="descricao" className="form-label">Descrição do Produto</label>
          <input
            type="text"
            name="descricao"
            id="descricao"
            className="form-control"
            placeholder="Descrição do Produto"
            value={productData.descricao}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="valor" className="form-label">Valor do Produto</label>
          <input
            type="number"
            name="valor"
            id="valor"
            className="form-control"
            placeholder="Valor do Produto"
            value={productData.valor}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="estoque" className="form-label">Quantidade em Estoque</label>
          <input
            type="number"
            name="estoque"
            id="estoque"
            className="form-control"
            placeholder="Quantidade em Estoque"
            value={productData.estoque}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="imagem" className="form-label">Imagem do Produto</label>
          <input
            type="file"
            name="imagem"
            id="imagem"
            className="form-control"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAddProduct}
        >
          Cadastrar Produto
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
