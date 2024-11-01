import { useRouter } from 'next/router';

const AddProductButton = () => {
  const router = useRouter();

  const handleAddProduct = () => {
    router.push('/addProduct');
  };

  return (
    <button onClick={handleAddProduct} style={styles.button}>
      Cadastrar Produto
    </button>
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
  },
};

export default AddProductButton;