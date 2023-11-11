import React, { useEffect, useState } from 'react';

interface Producto {
  id: number;
  title: string;
  // Agrega otros campos según la estructura de tu API
}

async function obtenerProductos(): Promise<Producto[]> {
  const res = await fetch("https://fakestoreapi.com/products");
  const datos: Producto[] = await res.json();

  return datos;
}

function Page() {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productosData = await obtenerProductos();
        setProductos(productosData);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchData();
  }, []); // un array de dependencias vacío significa que este efecto se ejecuta una vez al montar el componente

  return (
    <div>
      <h1>Lista de Productos</h1>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            {producto.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Page;
