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
import { ethers } from "ethers";

interface State {
    mainAddress: string;
    scwLoading: boolean;
    smartAccount: BiconomySmartAccountV2 | null;
    provider: ethers.providers.Provider | null;
    particle: ParticleAuthModule.ParticleNetwork;
    connect: () => Promise<void>;
}


const StateContext = createContext<State | undefined>(undefined);

type StateProviderProps = {
    children: ReactNode;
};


export function StateContextProvider({ children }: StateProviderProps) {

    const [address, setAddress] = useState<string>("")
    const [scwLoading, setScwLoading] = useState<boolean>(false);
    const [smartAccount, setSmartAccount] = useState<BiconomySmartAccountV2 | null>(null);
    const [provider, setProvider] = useState<ethers.providers.Provider | null>(null)

    function saveStateToLocalStorage(address: string, smartAccount: BiconomySmartAccountV2, provider: ethers.providers.Provider) {
        const stateToSave = {
            mainAddress: address,
            smartAccount,
            provider,
        };
        localStorage.setItem('appState', JSON.stringify(stateToSave));
    };

    function loadStateFromLocalStorage() {
        const savedState = localStorage.getItem('appState');
        if (savedState) {
            const parsedState = JSON.parse(savedState);
            setAddress(parsedState.mainAddress);
            setSmartAccount(parsedState.smartAccount);
            setProvider(parsedState.provider);
        }
    };

    useEffect(() => {
        loadStateFromLocalStorage();
    }, []);

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
        bundlerUrl: process.env.NEXT_PUBLIC_BICONOMY_BUNDLER as string,
        chainId: ChainId.BASE_GOERLI_TESTNET,
        entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
    })

    const mumbaiPaymaster: IPaymaster = new BiconomyPaymaster({
        paymasterUrl: process.env.NEXT_PUBLIC_BICONOMY_PAYMASTER as string,
    })

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

            let biconomySmartAccount = await BiconomySmartAccountV2.create({
                chainId: ChainId.BASE_GOERLI_TESTNET,
                bundler: mumbaiBundler,
                paymaster: mumbaiPaymaster,
                entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
                defaultValidationModule: module,
                activeValidationModule: module
            })
            const walletAddress = await biconomySmartAccount.getAccountAddress()
            setAddress(walletAddress);
            setSmartAccount(biconomySmartAccount);
            setScwLoading(false);
            saveStateToLocalStorage(walletAddress, biconomySmartAccount, web3Provider);
        } catch (error) {
            console.error("[ERROR_WHILE_CREATING_SMART_ACCOUNT]: ", error);
        }
    };


    return (
        <StateContext.Provider
            value={{
                mainAddress: address,
                scwLoading,
                smartAccount,
                provider,
                particle,
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