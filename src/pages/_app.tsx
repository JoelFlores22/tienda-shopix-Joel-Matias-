import CartButton from '@/components/CartButton'
import FooterFront from '@/components/Footer'
import Header from '@/components/header'
import { CartProvider } from '@/context/CartContext'
import { UserProvider } from '@/context/UseContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
  <UserProvider>
    <CartProvider>
      <Header />
      <CartButton />
      <Component {...pageProps} />
      <FooterFront />
    </CartProvider>
  </UserProvider>
  
  )
}
