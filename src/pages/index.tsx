import { ApiResponse, Product } from "@/utils/interface";
import Image from 'next/image';
import Link from "next/link";


export async function getProduct(): Promise<ApiResponse> {
  const products = await fetch(
    "https://fakestoreapi.com/products/",{
      method: "GET",
      headers:{
       "Content-Type": "application/json"
      }
    }
  )
  const datos = await products.json();

  return datos;
}

//@ts-ignore
export default function Page({ product }: { product: Product[] }) {
  console.log(product);

  return (
    <>
      {product.map((p: Product) => (
        <div key={p.id} className="py-20 w-96 flex flex-col">
          <h1>{p.title}</h1>
          <p>Price: ${p.price}</p>
          <p>Description: {p.description}</p>
          <p>Category: {p.category}</p>
          <Link href={`/product/${p.id}`}>
            <Image src={p.image} alt={p.title} width={300} height={200} />
          </Link>
          <p>Rating: {p.rating.rate} ({p.rating.count} reviews)</p>
        </div>
      ))}
    </>
  );
}

export async function getServerSideProps() {
  try {
    const product = await getProduct();
    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return {
      props: {
        product: null,
      },
    };
  }
}
