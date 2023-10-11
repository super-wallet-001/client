import { HardhatUserConfig } from "hardhat/config";
import '@typechain/hardhat';
import "dotenv/config";
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import 'hardhat-deploy-tenderly';


const PRIVATE_KEY = process.env.PRIVATE_KEY;
const POLYGON_RPC_URL = process.env.POLYGON_RPC_URL;
const POLYSCAN_API_KEY = process.env.POLYSCAN_API_KEY;

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  defaultNetwork: "hardhat",
  networks: {
    mumbai: {
      url: POLYGON_RPC_URL || "",
      accounts: [PRIVATE_KEY || ""]
    },
    hardhat: {
      chainId: 1337,
    },
    localhost: {
      chainId: 1337,
    },
  },
  // @ts-ignore
  namedAccounts: {
    deployer: {
      default: 0,
    },
    alice: {
      default: 1,
    },
    ravi: {
      default: 2,
    },
    bob: {
      default: 3,
    },
  }
};

export default config;
