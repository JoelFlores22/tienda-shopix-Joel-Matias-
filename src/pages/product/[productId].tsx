// pages/product/[productId].tsx
import { GetServerSideProps, NextPage } from 'next';
import { getSingleProduct } from '../../utils/api';
import Image from 'next/image';
import { Product } from '@/utils/interface';

interface ProductPageProps {
  product: Product | null;
}

const ProductPage: NextPage<ProductPageProps> = ({ product }) => {
  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <p>Price: ${product.price}</p>
      <p>Description: {product.description}</p>
      <p>Category: {product.category}</p>
      <Image src={product.image} alt={product.title} width={300} height={200} />
      <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
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
