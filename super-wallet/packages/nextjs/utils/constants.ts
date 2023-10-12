
export const WALLET_FACTORY_ADDRESS="0x588fB804d43e5DABeAbABd4805acc1a4d4418331"

export const ENTRY_POINT_ABI = [
    {
      inputs: [
        {
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          internalType: "uint192",
          name: "key",
          type: "uint192",
        },
      ],
      name: "getNonce",
      outputs: [
        {
          internalType: "uint256",
          name: "nonce",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ] as const;

  export const WALLET_FACTORY_ABI = [
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
      name: "createAccount",
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
  ] as const;


  export const WALLET_ABI = [
    {
      inputs: [
        {
          internalType: "address",
          name: "dest",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "func",
          type: "bytes",
        },
      ],
      name: "execute",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ] as const;