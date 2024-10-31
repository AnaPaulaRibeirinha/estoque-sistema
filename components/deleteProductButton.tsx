// components/DeleteProductButton.tsx
import React from 'react';
import axios from 'axios';

interface DeleteProductButtonProps {
  productId: string;
  onDelete: () => void; // Callback para atualizar a lista após exclusão
}

const DeleteProductButton: React.FC<DeleteProductButtonProps> = ({ productId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`);
      alert(`Produto com ID ${productId} foi removido com sucesso!`);
      onDelete(); // Chama o callback para atualizar a lista de produtos na Dashboard
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      alert('Erro ao remover produto. Tente novamente.');
    }
  };

  return (
    <button onClick={handleDelete} style={styles.button}>
      Deletar Produto
    </button>
  );
};

const styles = {
  button: {
    padding: '5px 10px',
    backgroundColor: 'red',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default DeleteProductButton;
