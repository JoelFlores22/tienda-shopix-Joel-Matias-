"use client"
import { GetServerSideProps, NextPage } from 'next';
import { getSingleProduct } from '../../utils/api';
import Image from 'next/image';
import { Product } from '@/utils/interface';
import Stars from '@/components/Star';
import { CartContext } from '@/context/CartContext';
import { useContext } from 'react';

interface ProductPageProps {
  product: Product | null;
}

const ProductPage: NextPage<ProductPageProps> = ({ product }) => {

   //@ts-ignore
   const { cart, setCart } = useContext(CartContext);
  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
      <div className='flex flex-col justify-center items-center'>
        <h1>{product.title}</h1>
        <Image src={product.image} alt={product.title} width={300} height={200} />
        <p>Descripción: {product.description}</p>
        <p>Precio: ${product.price}</p>
        <p>Categoría: {product.category}</p>
        <p className='flex flex-row'>
          <Stars rate={product.rating.rate} />
        </p>
        <p>
          Rating: {product.rating.rate} ({product.rating.count} reseñas)
        </p>
        <button
              className="bg-black text-white"
              onClick={() => {
                setCart({
                  products: [...cart.products, product],
                  totalPrice: cart.totalPrice + product.price,
                });
                console.log(cart)
              }}
            >
              Agregar al carrito
            </button>

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
