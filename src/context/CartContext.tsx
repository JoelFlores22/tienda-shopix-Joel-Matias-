import { createContext, useState } from "react";

let initialCart = {
  products: [],
  totalPrice: 0,
};

export const CartContext = createContext(initialCart);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState(initialCart);

  return (
    //@ts-ignore
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}