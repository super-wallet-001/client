const contracts = {
  31337: [
    {
      chainId: "31337",
      name: "localhost",
      contracts: {
        WalletFactory: {
          address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
          abi: [
            {
              inputs: [
                {
                  internalType: "contract IEntryPoint",
                  name: "entryPoint",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [
                {
                  internalType: "address[]",
                  name: "owners",
                  type: "address[]",
                },
                {
                  internalType: "uint256",
                  name: "salt",
                  type: "uint256",
                },
              ],
              name: "createNewSmartContractWallet",
              outputs: [
                {
                  internalType: "contract Wallet",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address[]",
                  name: "owners",
                  type: "address[]",
                },
                {
                  internalType: "uint256",
                  name: "salt",
                  type: "uint256",
                },
              ],
              name: "getAddress",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "walletImplementation",
              outputs: [
                {
                  internalType: "contract Wallet",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
      },
    },
  ],
  80001: [
    {
      chainId: "80001",
      name: "polygonMumbai",
      contracts: {
        WalletFactory: {
          address: "0x588fB804d43e5DABeAbABd4805acc1a4d4418331",
          abi: [
            {
              inputs: [
                {
                  internalType: "contract IEntryPoint",
                  name: "entryPoint",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [
                {
                  internalType: "address[]",
                  name: "owners",
                  type: "address[]",
                },
                {
                  internalType: "uint256",
                  name: "salt",
                  type: "uint256",
                },
              ],
              name: "createNewSmartContractWallet",
              outputs: [
                {
                  internalType: "contract Wallet",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address[]",
                  name: "owners",
                  type: "address[]",
                },
                {
                  internalType: "uint256",
                  name: "salt",
                  type: "uint256",
                },
              ],
              name: "getAddress",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "walletImplementation",
              outputs: [
                {
                  internalType: "contract Wallet",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
