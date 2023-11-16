export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface UserData {
  nombre: string;
  email: string;
  edad: number;
  password: string;
}

export interface ApiResponse {
  products: Product[];
}
