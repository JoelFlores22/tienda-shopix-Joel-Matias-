import { GetServerSideProps, NextPage } from 'next';
import { getSingleProduct } from '../../utils/api';
import Image from 'next/image';
import { Product } from '@/utils/interface';
import { useEffect, useContext, useState } from 'react';
import { UserContext } from '@/context/UseContext';
import paymentMercadoPagoHandler, { PaymentResponse } from '../api/checkout';

interface ProductPageProps {
  product: Product | null;
}


const ProductPage: NextPage<ProductPageProps> = ({ product }) => {
  const { user } = useContext(UserContext);
  console.log(user)

  const handleBuyClick = async () => {

    const simulatedUser = {
      name: 'Usuario de Prueba',
      email: 'test@example.com',
      edad: 22,
      password: 'Patito123'
    };

    console.log("Empezo todo pa")
    if (simulatedUser && product) {
      console.log('Enviando datos al servidor:', { simulatedUser, product });
      try {
        const response = await fetch(`/api/checkout`, {
          method: 'POST',
          body: JSON.stringify({ simulatedUser, product }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        console.log('Respuesta del pago:', data);
      } catch (error) {
        console.error('Error al procesar el pago:', error);
      }
    }
    console.log("se salto el")
  };

  useEffect(() => {
    console.log('Usuario actualizado:', user);
  }, [user]);

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <Image src={product.image} alt={product.title} width={300} height={200} />
      <p>Descripción: {product.description}</p>
      <p>Precio: ${product.price}</p>
      <p>Categoría: {product.category}</p>
      <p>Rating: {product.rating.rate} ({product.rating.count} reseñas)</p>
      <button onClick={handleBuyClick}>Comprar</button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const productId = params?.productId as string;
  const product = await getSingleProduct(productId);

  return {
    props: {
      product,
    },
  };
};

export default ProductPage;
