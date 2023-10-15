import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Button } from "@/components/ui/button"
import {
  ParticleAuthModule,
  ParticleProvider,
} from "@biconomy/particle-auth";
import ethers from "ethers";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

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
      const userInfo = await particle.auth.login();
      console.log("Logged in user:", userInfo);
      const particleProvider = new ParticleProvider(particle.auth);
      console.log({particleProvider})
      const web3Provider = new ethers.providers.Web3Provider(
        particleProvider,
        "any"
      );
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <main>
      Multichain Payment Infrastructure
      <Button onClick={connect}>
        Connect Wallet
      </Button>
    </main>
  )
}
