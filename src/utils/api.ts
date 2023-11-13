import { Product } from "./interface";

export async function getSingleProduct(productId: string): Promise<Product | null> {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
      if (!response.ok) {
        throw new Error(`Error al obtener el producto con ID ${productId}`);
      }
      const product = await response.json();
      console.log('Producto obtenido:', product);
      return product;
    } catch (error) {
      console.error(`Error al obtener el producto con ID ${productId}:`, error);
      return null;
    }
  }