import { ethers } from "ethers";

const scrollProvider = "https://sepolia-rpc.scroll.io"
const mantleProvider = "https://rpc.testnet.mantle.xyz"
const polygonMumbaiProvider = `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
const avalancheProvider = "https://api.avax-test.network/ext/bc/C/rpc"

const ERC20ABI = [
    {
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
        ],
        name: 'balanceOf',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
];



export async function getWalletBalance(walletAddress: string): Promise<any> {
    const scrollProvider_ = new ethers.providers.JsonRpcProvider(scrollProvider);
    const mantleProvider_ = new ethers.providers.JsonRpcProvider(mantleProvider);
    const polygonMumbaiProvider_ = new ethers.providers.JsonRpcProvider(
        polygonMumbaiProvider
    );
    const avalancheProvider_ = new ethers.providers.JsonRpcProvider(
        avalancheProvider
    );
    
    const tokenAddressMumbai = '0x2c852e740B62308c46DD29B982FBb650D063Bd07';
    const tokenAddressScroll = '0x254d06f33bDc5b8ee05b2ea472107E300226659A';
    const tokenAddressAvalanche = '0x57F1c63497AEe0bE305B8852b354CEc793da43bB';
    const tokenAddressMantle = '0x254d06f33bDc5b8ee05b2ea472107E300226659A';

    const ETHbalanceOnMumabi = parseFloat(ethers.utils.formatEther(await polygonMumbaiProvider_.getBalance(walletAddress))).toFixed(2);
    const ETHbalanceOnScroll = parseFloat(ethers.utils.formatEther(await scrollProvider_.getBalance(walletAddress))).toFixed(2);
    const ETHbalanceOnAvalanche = parseFloat(ethers.utils.formatEther(await avalancheProvider_.getBalance(walletAddress))).toFixed(2);
    const ETHbalanceOnMantle = parseFloat(ethers.utils.formatEther(await mantleProvider_.getBalance(walletAddress))).toFixed(2);

    const tokenContractMumbai = new ethers.Contract(
        tokenAddressMumbai,
        ERC20ABI,
        polygonMumbaiProvider_
    );
    const tokenContractScroll = new ethers.Contract(
        tokenAddressScroll,
        ERC20ABI,
        scrollProvider_
    );
    const tokenContractAvalanche = new ethers.Contract(
        tokenAddressAvalanche,
        ERC20ABI,
        avalancheProvider_
    );
    const tokenContractMantle = new ethers.Contract(
        tokenAddressMantle,
        ERC20ABI,
        mantleProvider_
    );

    const balances = await Promise.all([
        tokenContractMumbai.balanceOf(walletAddress),
        tokenContractScroll.balanceOf(walletAddress),
        tokenContractAvalanche.balanceOf(walletAddress),
        tokenContractMantle.balanceOf(walletAddress)
    ]);

    const balanceMumbaiAdjusted = balances[0] / 1000000;
    const balanceScrollAdjusted = balances[1] / 1000000;
    const balanceAvalancheAdjusted = balances[2] / 1000000;
    const balanceMantleAdjusted = balances[3] / 1000000;

    const balanceObj = {
        ETH:{
            mumbai: ETHbalanceOnMumabi,
            scroll: ETHbalanceOnScroll,
            avalanche: ETHbalanceOnAvalanche,
            mantle: ETHbalanceOnMantle,
        },
        aUSDC: {
            mumbai: balanceMumbaiAdjusted,
            scroll: balanceScrollAdjusted,
            avalanche: balanceAvalancheAdjusted,
            mantle: balanceMantleAdjusted,
            totalBalance: balanceMumbaiAdjusted + balanceScrollAdjusted + balanceAvalancheAdjusted + balanceMantleAdjusted
        }
    }
    return balanceObj;
}


