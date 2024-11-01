import Link from 'next/link';
import React from 'react';

interface UpdateProductButtonProps {
  productId: string;
}

const UpdateProductButton: React.FC<UpdateProductButtonProps> = ({ productId }) => {
  return (
    <Link href={`/updateProduct?id=${productId}`} passHref>
      <button className="btn btn-warning">Atualizar Produto</button>
    </Link>
  );
};

export default UpdateProductButton;