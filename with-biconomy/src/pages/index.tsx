import { Inter } from 'next/font/google'
import { useState } from 'react';
import { BiconomySmartAccountV2, DEFAULT_ENTRYPOINT_ADDRESS } from "@biconomy/account"
import { Button } from "@/components/ui/button"
import {
  ParticleAuthModule,
  ParticleProvider,
} from "@biconomy/particle-auth";
import { IBundler, Bundler } from '@biconomy/bundler'
import { ChainId } from "@biconomy/core-types"
import {
  IPaymaster,
  BiconomyPaymaster,
} from '@biconomy/paymaster'
import { ECDSAOwnershipValidationModule, DEFAULT_ECDSA_OWNERSHIP_MODULE } from "@biconomy/modules";
import { ethers } from "ethers";
import Head from "next/head";
import { useStateContext } from "@/context";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  
  const {scwLoading,mainAddress,connect} = useStateContext();

  return (
    <>
      <Head>
        <title>Super Wallet</title>
        <meta name="description" content="A multichain ethereum wallet" />
      </Head>
      <main>
        Multichain Payment Infrastructure
        {!scwLoading && !mainAddress && (
          <Button onClick={connect}>
            Connect Wallet
          </Button>
        )}
        {mainAddress && <h2>Smart Account: {mainAddress}</h2>}
      </main>
    </>
  )
}
