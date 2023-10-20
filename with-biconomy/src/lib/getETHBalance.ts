import { ethers } from "ethers";

const scrollProvider = "https://sepolia-rpc.scroll.io"
const mantleProvider = "https://rpc.testnet.mantle.xyz"
const polygonMumbaiProvider = `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
const avalancheProvider = "https://api.avax-test.network/ext/bc/C/rpc"


export async function getETHBalance(chainId: number, walletAddress: string) {
    let provider;
    switch (chainId) {
        case 534351:
            provider = new ethers.providers.JsonRpcProvider(scrollProvider);
            break;
        case 80001:
            provider = new ethers.providers.JsonRpcProvider(polygonMumbaiProvider);
            break;
        case 43114:
            provider = new ethers.providers.JsonRpcProvider(avalancheProvider)
            break;
        case 5001:
            provider = new ethers.providers.JsonRpcProvider(mantleProvider);
            break;
        default:
            throw new Error("Invalid ChainID");
    }
    
    const balance = ethers.utils.formatEther((await provider.getBalance(walletAddress)));
    return balance;
}

getETHBalance(80001,"0x4BF20785a0B2E6a375B1d49Ba64c6145AC50AAD6");