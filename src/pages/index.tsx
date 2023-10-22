import { Inter } from 'next/font/google'
import Head from "next/head";
import { useStateContext } from "@/context";
import Heading from "@/components/heading";
import LoadingComponent from "@/components/loading-component";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const {scwLoading,mainAddress}=useStateContext();

  if (scwLoading) {
    return (
        <LoadingComponent />
    )
}

  return (
    <>
      <Head>
        <title>Super Wallet</title>
        <meta name="description" content="A multichain ethereum wallet" />
      </Head>
      <div className="font-bold py-32 text-center space-y-5">
        <Heading />
      </div>
    </>
  )
}
