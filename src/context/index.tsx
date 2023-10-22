import { useState, useContext, createContext, ReactNode, useEffect } from "react";
import { BiconomySmartAccountV2, DEFAULT_ENTRYPOINT_ADDRESS } from "@biconomy/account"
import {
  ParticleAuthModule,
  ParticleProvider,
} from "@biconomy/particle-auth";
import { IBundler, Bundler } from '@biconomy/bundler'
import { ChainId } from "@biconomy/core-types"
import {
  IPaymaster,
  BiconomyPaymaster,
  IHybridPaymaster,
  SponsorUserOperationDto,
  PaymasterMode,
} from '@biconomy/paymaster'
import { ECDSAOwnershipValidationModule, DEFAULT_ECDSA_OWNERSHIP_MODULE } from "@biconomy/modules";
import { MultiChainValidationModule, DEFAULT_MULTICHAIN_MODULE } from "@biconomy-devx/modules";
import { ethers } from "ethers";
import { getWalletBalance } from "@/lib/getWalletbalance";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { Transaction } from "@prisma/client";


interface State {
  mainAddress: string | null;
  scwLoading: boolean;
  smartAccounts: BiconomySmartAccountV2[] | null;
  provider: ethers.providers.Provider | null;
  particle: ParticleAuthModule.ParticleNetwork;
  walletBalances: WalletBalances | null;
  transactions:Transaction[] |null;
  connect: () => Promise<void>;
  removeFromLocalStorage: () => void;
  executeSendToken: (receiverWalletAddress: string, chainId: string, tokenAddress: string, amountToSendFromChain1: number, amountToSendFromChain2: number) => Promise<void>;
}


const StateContext = createContext<State | undefined>(undefined);

type StateProviderProps = {
  children: ReactNode;
};



type WalletBalances = {
  ETH: {
    mumbai: number;
    scroll: number;
    avalanche: number;
    mantle: number;
  },
  aUSDC: {
    mumbai: number;
    scroll: number;
    avalanche: number;
    mantle: number;
    totalBalance: number;
  }
}


export function StateContextProvider({ children }: StateProviderProps) {

  const [address, setAddress] = useState<string | null>(null)
  const [scwLoading, setScwLoading] = useState<boolean>(false);
  const [smartAccounts, setSmartAccounts] = useState<BiconomySmartAccountV2[] | null>(null);
  const [provider, setProvider] = useState<ethers.providers.Provider | null>(null);
  const [walletBalances, setWalletBalances] = useState<WalletBalances | null>(null);
  const [transactions,setTransactions]=useState<Transaction[]|null>(null);
  const {toast}=useToast();

  function saveStateToLocalStorage(address: string, smartAccounts: BiconomySmartAccountV2[], provider: ethers.providers.Provider, balances: WalletBalances,transactions:Transaction[]|null) {
    const stateToSave = {
      mainAddress: address,
      smartAccounts,
      provider,
      balances,
      transactions
    };
    localStorage.setItem('appState', JSON.stringify(stateToSave));
  };

  function removeFromLocalStorage() {
    localStorage.removeItem('appState');
    setAddress("");
    setSmartAccounts(null);
    setProvider(null);
  }

  function loadStateFromLocalStorage() {
    const savedState = localStorage.getItem('appState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      setAddress(parsedState.mainAddress);
      setSmartAccounts(parsedState.smartAccounts);
      setProvider(parsedState.provider);
      setWalletBalances(parsedState.balances);
      setTransactions(parsedState.transactions)
    }
  };

  useEffect(() => {
    loadStateFromLocalStorage();
  }, []);


  //////////////////////////////////////////Biconomy Setup////////////////////////////////////////////////////
  const particle = new ParticleAuthModule.ParticleNetwork({
    projectId: process.env.NEXT_PUBLIC_PARTICLE_PROJECT_ID as string,
    clientKey: process.env.NEXT_PUBLIC_PARTICLE_CLIENT_ID as string,
    appId: process.env.NEXT_PUBLIC_PARTICLE_APP_ID as string,
    wallet: {
      displayWalletEntry: true,
      defaultWalletEntryPosition: ParticleAuthModule.WalletEntryPosition.BR,
    },
  });

  const mumbaiBundler: IBundler = new Bundler({
    bundlerUrl: process.env.NEXT_PUBLIC_POLYGON_BICONOMY_BUNDLER as string,
    chainId: ChainId.POLYGON_MUMBAI,
    entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
  })

  const mumbaiPaymaster: IPaymaster = new BiconomyPaymaster({
    paymasterUrl: process.env.NEXT_PUBLIC_POLYGON_BICONOMY_PAYMASTER as string,
  })

  const avalancheBunldler: IBundler = new Bundler({
    bundlerUrl: process.env.NEXT_PUBLIC_AVALANCHE_BICONOMY_BUNDLER as string,
    chainId: ChainId.AVALANCHE_TESTNET,
    entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
  })

  const avalanchePaymaster: IPaymaster = new BiconomyPaymaster({
    paymasterUrl: process.env.NEXT_PUBLIC_AVALANCHE_BICONOMY_PAYMASTER as string,
  })
  //////////////////////////////////////////Biconomy Setup////////////////////////////////////////////////////


  /////////////////////////////////////////Connect Wallet/////////////////////////////////////////////////////
  async function connect() {
    try {

      setScwLoading(true)
      const userInfo = await particle.auth.login();
      console.log("Logged in user:", userInfo);
      const particleProvider = new ParticleProvider(particle.auth);
      const web3Provider = new ethers.providers.Web3Provider(
        particleProvider,
        "any"
      )
      setProvider(web3Provider)
      const module_ = await ECDSAOwnershipValidationModule.create({
        signer: web3Provider.getSigner(),
        moduleAddress: DEFAULT_ECDSA_OWNERSHIP_MODULE
      })


      const multiChainModule = await MultiChainValidationModule.create({
        signer: web3Provider.getSigner(),
        moduleAddress: DEFAULT_MULTICHAIN_MODULE
      })

      // For polygon mumbai
      const biconomySmartAccountConfigMumabi = {
        signer: web3Provider.getSigner(),
        chainId: ChainId.POLYGON_MUMBAI,
        paymaster: mumbaiPaymaster,
        bundler: mumbaiBundler,
        entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
        defaultValidationModule: multiChainModule,
        activeValidationModule: multiChainModule
      };

      // For avalanche fuji
      const biconomySmartAccountConfigAvalanche = {
        signer: web3Provider.getSigner(),
        chainId: ChainId.AVALANCHE_TESTNET,
        paymaster: avalanchePaymaster,
        bundler: avalancheBunldler,
        entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
        defaultValidationModule: multiChainModule,
        activeValidationModule: multiChainModule
      };

      let biconomySmartAccountMumbai = await BiconomySmartAccountV2.create(biconomySmartAccountConfigMumabi)

      let biconomySmartAccountAvalanche = await BiconomySmartAccountV2.create(biconomySmartAccountConfigAvalanche)

      const walletAddressMumbai = await biconomySmartAccountMumbai.getAccountAddress()
      const walletAddressAvalanche = await biconomySmartAccountAvalanche.getAccountAddress()
      console.log(walletAddressMumbai, walletAddressAvalanche);

      const balance = await getWalletBalance(walletAddressMumbai);

      setWalletBalances(balance);
      setAddress(walletAddressMumbai);
      setSmartAccounts([biconomySmartAccountMumbai, biconomySmartAccountAvalanche]);
      setScwLoading(false);
      saveStateToLocalStorage(walletAddressMumbai, [biconomySmartAccountMumbai, biconomySmartAccountAvalanche], web3Provider, balance,transactions);

    } catch (error) {
      console.error("[ERROR_WHILE_CREATING_SMART_ACCOUNT]: ", error);
    }
  };


  async function executeSendToken(receiverWalletAddress: string, chainId: string, tokenAddress: string, amountToSendFromChain1: number, amountToSendFromChain2: number): Promise<any> {

    const particleProvider = new ParticleProvider(particle.auth);

    const web3Provider = new ethers.providers.Web3Provider(
      particleProvider,
      "any"
    )

    const multiChainModule = await MultiChainValidationModule.create({
      signer: web3Provider.getSigner(),
      moduleAddress: DEFAULT_MULTICHAIN_MODULE
    })

    // For polygon mumbai
    const biconomySmartAccountConfigMumabi = {
      signer: web3Provider.getSigner(),
      chainId: ChainId.POLYGON_MUMBAI,
      paymaster: mumbaiPaymaster,
      bundler: mumbaiBundler,
      entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
      defaultValidationModule: multiChainModule,
      activeValidationModule: multiChainModule
    };

    // For avalanche fuji
    const biconomySmartAccountConfigAvalanche = {
      signer: web3Provider.getSigner(),
      chainId: ChainId.AVALANCHE_TESTNET,
      paymaster: avalanchePaymaster,
      bundler: avalancheBunldler,
      entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
      defaultValidationModule: multiChainModule,
      activeValidationModule: multiChainModule
    };

    let biconomySmartAccountMumbai = await BiconomySmartAccountV2.create(biconomySmartAccountConfigMumabi)

    let biconomySmartAccountAvalanche = await BiconomySmartAccountV2.create(biconomySmartAccountConfigAvalanche);

    let paymasterServiceData: SponsorUserOperationDto = {
      mode: PaymasterMode.SPONSORED,
      smartAccountInfo: {
        name: 'BICONOMY',
        version: '2.0.0'
      },
    };

    // Avalanche paymaster
    const avalanchePaymaster_ =
        biconomySmartAccountAvalanche.paymaster as IHybridPaymaster<SponsorUserOperationDto>;

    // Mumbai Paymaster
    const mumbaiPaymaster_ =
        biconomySmartAccountConfigMumabi.paymaster as IHybridPaymaster<SponsorUserOperationDto>;


    // First approve the sender smart contract to use the tokens
    const erc20Interface = new ethers.utils.Interface([
      "function approve(address spender, uint256 value)",
    ])
    const avalancheData1 = erc20Interface.encodeFunctionData("approve", [
      "0xaa38f1eB37C111B4048c19670CBe53081fE058b7",
      amountToSendFromChain1
    ])
    const avalanceTransection1 = {
      to: "0x57F1c63497AEe0bE305B8852b354CEc793da43bB",
      data: avalancheData1
    }
    let avalanchePartialUserOp1 = await biconomySmartAccountAvalanche.buildUserOp([avalanceTransection1]);
    const userOp1PaymasterDataResponse=await avalanchePaymaster_.getPaymasterAndData(
      avalanchePartialUserOp1,
      paymasterServiceData
    );
    avalanchePartialUserOp1.paymasterAndData=userOp1PaymasterDataResponse.paymasterAndData;

    // Call send from source chain (Avalanche)
    const senderInterface = new ethers.utils.Interface([
      "function send(uint256 tokenAmount,address receiver,string memory chain,string memory tokenSymbol)"
    ]);
    const avalancheData2 = senderInterface.encodeFunctionData("send", [
      amountToSendFromChain1,
      "0x0e80c8688B221F3daDE5aCDdd8dB2dEcf553db83",
      "Polygon",
      "aUSDC"
    ]);
    const avalancheTransection2 = {
      to: "0xaa38f1eB37C111B4048c19670CBe53081fE058b7",
      data: avalancheData2
    };
    let avalanchePartialUserOp2 = await biconomySmartAccountAvalanche.buildUserOp([avalancheTransection2]);
    const userOp2PaymasterDataResponse=await avalanchePaymaster_.getPaymasterAndData(
      avalanchePartialUserOp2,
      paymasterServiceData
    );
    avalanchePartialUserOp2.paymasterAndData=userOp2PaymasterDataResponse.paymasterAndData;

    // From the smart contract wallet send the tokens to address.
    
    const erc20InterfaceMumbai = new ethers.utils.Interface([
      "function transfer(address to, uint256 value)"
    ])
    const mumabiData1 = erc20InterfaceMumbai.encodeFunctionData("transfer", [
      receiverWalletAddress,
      amountToSendFromChain2
    ]);
    const mumabiTransection1 = {
      to: "0x2c852e740B62308c46DD29B982FBb650D063Bd07",
      data: mumabiData1
    }
    let mumbaiPartialUserOp = await biconomySmartAccountMumbai.buildUserOp([mumabiTransection1])
    const userOp3PaymasterDataResponse=await mumbaiPaymaster_.getPaymasterAndData(
      mumbaiPartialUserOp,
      paymasterServiceData
    );
    mumbaiPartialUserOp.paymasterAndData=userOp3PaymasterDataResponse.paymasterAndData;

    // Get the transection signed
    const signedUserOps = await multiChainModule.signUserOps([{ userOp: avalanchePartialUserOp1, chainId: 43114 }, { userOp: avalanchePartialUserOp2, chainId: 43114 }, { userOp: mumbaiPartialUserOp, chainId: 80001 }])

    console.log(signedUserOps);
  
    toast({
      title:"Executing the transection..."
    })

    // Send all the transections
    try {
      const userOpResponse1 = await biconomySmartAccountAvalanche.sendSignedUserOp(signedUserOps[0] as any);
      const transactionDetails1 = await userOpResponse1.wait();
      console.log(`transactionDetails: ${JSON.stringify(transactionDetails1, null, "\t")}`);
    } catch (e) {
      console.log("error received ", e);
    }
    toast({
      title:"Approved the sender smart contract!"
    })

    try {
      const userOpResponse2 = await biconomySmartAccountAvalanche.sendSignedUserOp(signedUserOps[1] as any);
      const transactionDetails2 = await userOpResponse2.wait();
      console.log(`transactionDetails: ${JSON.stringify(transactionDetails2, null, "\t")}`);
    } catch (e) {
      console.log("error received ", e);
    }
    toast({
      title:"Transfering the tokens to Polygon Mumbai!"
    })

    // Wait for 2 minutes by default in any case
    await new Promise(resolve => setTimeout(resolve, 120000));

    try {
      const userOpResponse3 = await biconomySmartAccountMumbai.sendSignedUserOp(signedUserOps[2] as any);
      const transactionDetails3 = await userOpResponse3.wait();
      console.log(`transactionDetails: ${JSON.stringify(transactionDetails3, null, "\t")}`);
    } catch (e) {
      console.log("error received ", e);
    }

    try{
      await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/save-transactions`,{
        walletAddress:address,
        receiverAddress:receiverWalletAddress,
        amountSend:amountToSendFromChain2,
      })
    }catch(error){
      console.log("error while saving the transaction: ",error);      
    }
    
    try{
      const response  = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/fetch-transactions`,{
        params:{
          body:{
            walletAddress:address,
          }
        }
      })
      setTransactions(response?.data?.allTransactions);
      saveStateToLocalStorage(address!, [biconomySmartAccountMumbai, biconomySmartAccountAvalanche], web3Provider, walletBalances!,transactions);
    }catch(error){
      console.log(error);
    }

  }

  return (
    <StateContext.Provider
      value={{
        mainAddress: address,
        scwLoading,
        smartAccounts,
        provider,
        particle,
        walletBalances,
        transactions,
        removeFromLocalStorage,
        executeSendToken,
        connect
      }}
    >
      {children}
    </StateContext.Provider>
  )

}

export function useStateContext() {
  return useContext(StateContext) as State;
}