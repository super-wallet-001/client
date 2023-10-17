import Navbar from "@/components/navbar"
import { StateContextProvider } from "@/context"
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from "@/components/ui/toaster"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StateContextProvider>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </StateContextProvider>
  )
}
