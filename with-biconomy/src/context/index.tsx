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
} from '@biconomy/paymaster'
import { ECDSAOwnershipValidationModule, DEFAULT_ECDSA_OWNERSHIP_MODULE } from "@biconomy/modules";
import { MultiChainValidationModule, DEFAULT_MULTICHAIN_MODULE } from "@biconomy-devx/modules";
import { ethers } from "ethers";

interface State {
    mainAddress: string;
    scwLoading: boolean;
    smartAccounts: BiconomySmartAccountV2[] | null;
    provider: ethers.providers.Provider | null;
    particle: ParticleAuthModule.ParticleNetwork;
    connect: () => Promise<void>;
    removeFromLocalStorage: () => void;
}


const StateContext = createContext<State | undefined>(undefined);

type StateProviderProps = {
    children: ReactNode;
};


export function StateContextProvider({ children }: StateProviderProps) {

    const [address, setAddress] = useState<string>("")
    const [scwLoading, setScwLoading] = useState<boolean>(false);
    const [smartAccounts, setSmartAccounts] = useState<BiconomySmartAccountV2[] | null>(null);
    const [provider, setProvider] = useState<ethers.providers.Provider | null>(null)

    function saveStateToLocalStorage(address: string, smartAccounts: BiconomySmartAccountV2[], provider: ethers.providers.Provider) {
        const stateToSave = {
            mainAddress: address,
            smartAccounts,
            provider,
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
        }
    };

    useEffect(() => {
        loadStateFromLocalStorage();
    }, []);


    //////////////////////////////////////////Biconomy Setup//////////////////////////////////////////////////////////
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
    //////////////////////////////////////////Biconomy Setup//////////////////////////////////////////////////////////


    /////////////////////////////////////////Connect Wallet///////////////////////////////////////////////////////////
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
            const module = await ECDSAOwnershipValidationModule.create({
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

            // For biconomy
            const biconomySmartAccountConfigAvalanche = {
                signer: web3Provider.getSigner(),
                chainId: ChainId.AVALANCHE_TESTNET,
                paymaster: avalanchePaymaster,
                bundler: avalancheBunldler,
                entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
                defaultValidationModule: multiChainModule,
                activeValidationModule: multiChainModule
            };


            let biconomySmartAccountMumabi = await BiconomySmartAccountV2.create(biconomySmartAccountConfigMumabi)

            let biconomySmartAccountAvalanche = await BiconomySmartAccountV2.create(biconomySmartAccountConfigAvalanche)

            const walletAddressMumbai = await biconomySmartAccountMumabi.getAccountAddress()
            const walletAddressAvalanche = await biconomySmartAccountAvalanche.getAccountAddress()
            console.log(walletAddressMumbai,walletAddressAvalanche);
            
            setAddress(walletAddressMumbai);
            setSmartAccounts([biconomySmartAccountMumabi,biconomySmartAccountAvalanche]);
            setScwLoading(false);
            saveStateToLocalStorage(walletAddressMumbai, [biconomySmartAccountMumabi,biconomySmartAccountAvalanche], web3Provider);

        } catch (error) {
            console.error("[ERROR_WHILE_CREATING_SMART_ACCOUNT]: ", error);
        }
    };


    return (
        <StateContext.Provider
            value={{
                mainAddress: address,
                scwLoading,
                smartAccounts,
                provider,
                particle,
                removeFromLocalStorage,
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