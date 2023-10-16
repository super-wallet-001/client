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
import {ethers} from "ethers";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [address, setAddress] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false);
  const [smartAccount, setSmartAccount] = useState<BiconomySmartAccountV2 | null>(null);
  const [provider, setProvider] = useState<ethers.providers.Provider | null>(null)

  const particle = new ParticleAuthModule.ParticleNetwork({
    projectId: process.env.NEXT_PUBLIC_PARTICLE_PROJECT_ID as string,
    clientKey: process.env.NEXT_PUBLIC_PARTICLE_CLIENT_ID as string,
    appId: process.env.NEXT_PUBLIC_PARTICLE_APP_ID as string,
    wallet: {
      displayWalletEntry: true,
      defaultWalletEntryPosition: ParticleAuthModule.WalletEntryPosition.BR,
    },
  });

  const connect = async () => {
    try {
      setLoading(true)
      const userInfo = await particle.auth.login();
      console.log("Logged in user:", userInfo);
      const particleProvider = new ParticleProvider(particle.auth);
      const web3Provider = new ethers.providers.Web3Provider(
        particleProvider,
        "any"
      )
      setProvider(web3Provider)
      const module = await ECDSAOwnershipValidationModule.create({
        signer:web3Provider.getSigner(),
        moduleAddress:DEFAULT_ECDSA_OWNERSHIP_MODULE
      })

      let biconomySmartAccount = await BiconomySmartAccountV2.create({
        chainId:ChainId.BASE_GOERLI_TESTNET,
        bundler:bundler,
        paymaster:paymaster,
        entryPointAddress:DEFAULT_ENTRYPOINT_ADDRESS,
        defaultValidationModule:module,
        activeValidationModule:module
      })
      const walletAddress = await biconomySmartAccount.getAccountAddress()
      setAddress(walletAddress);
      setLoading(false);
    } catch (error) {
      console.error("[ERROR_WHILE_CREATING_SMART_ACCOUNT]: ",error);
    }
  };

  const bundler: IBundler = new Bundler({
    bundlerUrl:process.env.NEXT_PUBLIC_BICONOMY_BUNDLER as string,    
    chainId: ChainId.BASE_GOERLI_TESTNET,
    entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
  })
  
  const paymaster: IPaymaster = new BiconomyPaymaster({
    paymasterUrl: process.env.NEXT_PUBLIC_BICONOMY_PAYMASTER as string,
  })

  console.log(address);

  return (
    <main>
      Multichain Payment Infrastructure
      {!loading && !address && (
      <Button onClick={connect}>
        Connect Wallet
      </Button>
      )}
      {address && <h2>Smart Account: {address}</h2>}
    </main>
  )
}
