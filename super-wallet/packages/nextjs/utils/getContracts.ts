import {Contract,providers} from "ethers";
import { Constants } from "userop";
import { ENTRY_POINT_ABI, WALLET_ABI, WALLET_FACTORY_ABI, WALLET_FACTORY_ADDRESS } from "./constants";

export const provider = new providers.JsonRpcProvider(process.env.NEXT_PUBLIC_STACKUP_API_ENDPOINT);

console.log(provider);

export const entryPointContract = new Contract(
    Constants.ERC4337.EntryPoint,
    ENTRY_POINT_ABI,
    provider
);

export const walletFactoryContract = new Contract(
    WALLET_FACTORY_ADDRESS,
    WALLET_FACTORY_ABI,
    provider
)

export const getWalletContract = (walletAddress:string) => {
    return new Contract(walletAddress,WALLET_ABI,provider);
}