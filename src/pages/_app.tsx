import FooterFront from '@/components/Footer'
import Header from '@/components/header'
import { UserProvider } from '@/context/UseContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
  <UserProvider>
    <Header />
    <Component {...pageProps} />
    <FooterFront />
  </UserProvider>
  
  )
}
