import Navbar from "@/components/navbar"
import { StateContextProvider } from "@/context"
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StateContextProvider>
      <ThemeProvider
        attribute='class' defaultTheme='system' enableSystem
      >
        <Navbar />
        <Component {...pageProps} />
        <Toaster />
      </ThemeProvider>
    </StateContextProvider>
  )
}
