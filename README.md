# Super Wallet

Welcome to Super Wallet, a revolutionary platform that enables users to create and manage smart contract wallets across various blockchain networks. With Super Wallet, you can easily hop on board through social logins and experience the world of blockchains.

Project Demo Link : https://drive.google.com/file/d/1tQcE-7mDqt_hijvBHLKAeQgfRM05BUEP/view?usp=share_link
Deployment link : https://super-wallet.vercel.app/

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [UX Optimizaion](#ux-optimization)
4. [Flow](#flow)
5. [Technology Stack](#technology-stack)
6. [Supported Networks](#supported-networks)

---

## Introduction

Super Wallet is a cutting-edge platform that empowers users to manage their digital assets across different blockchain networks. Here's what you can do with Super Wallet:

- **Social Logins**: You can hop on board effortlessly using your favorite social login platforms.

- **Smart Contract Wallets**: Create smart contract wallets on various blockchain chains.

- **Cross-Chain Transactions**: Super Wallet allows you to receive funds on any blockchain network and easily combine assets from multiple chains for transactions. For example, you can combine 2 aUSDC from Avalanche and 5 aUSDC from Polygon to make a payment of 7 aUSDC on Mantle.

- **Single Signature Transactions**: Thanks to smart contract wallets, all transactions can be executed with just one user signature, making the user experience seamless and efficient.

## Features

- **Cross-Chain Functionality**: Super Wallet leverages Axelar GMP to implement cross-chain functionality, allowing you to interact seamlessly with different blockchain networks. [Learn more](https://docs.axelar.dev/dev/general-message-passing/overview).

- **Account Abstraction**: We use Biconomy SDK V2 for account abstraction, simplifying the interaction with blockchain accounts.

- **Social Logins**: Super Wallet is integrated with the Particle Network for social logins, providing a user-friendly onboarding process.

- **Client-Side Development**: Our client-side application is built using Next.js.

- **Smart Contracts**: Solidity is used to develop the super wallet bridge smart contracts that power Super Wallet.

## UX Optimization
We've significantly improved user experience by implementing account abstraction in Super Wallet. To achieve this, we're utilizing Biconomy's Account Abstraction SDK v2.

The Super Wallet lets users to transfer and receive assets on multiple blockchain. However, a issue arises as simply sending ERC20 tokens to another chain, involves three transactions:

1. First, there's a need to approve our Super Wallet bridge smart contract to utilize the tokens for transferring them to another chain.

2. Next, you must trigger the send function on super wallet bridge contract to initiate the multi-chain transaction.

3. Finally, on the recipient's end, when the tokens are received into the smart contract wallet on the recipient's chain, another transaction is required to transfer the tokens to the recipient.

To put it simply, performing such a transfer conventionally would demand three different signatures on more than one chains, which is not very user-friendly. However, we have improved this user experience by integrating Biconomy's Multi-Chain Validator Module. This module creates a Merkle tree comprising multiple userOps across various chains and allows the user to sign that Merkle tree instead of handling individual transactions on each chain.

This enhancement significantly streamlines the user experience, and the concept can be extended in Super Wallets to eventually enable more complex transactions with a single click. This eliminates a major user obstacle and simplifies the process to just signing one transaction, enabling seamless transactions across multiple chains. For more details about how the multichain validation takes place, refer to Biconomy's Multi-Chain Validator Module [here](https://forum.biconomy.io/t/biconomy-multichain-validator-module/509/2).

![mcv](https://github.com/super-wallet-001/.github/assets/93488388/856bb9e1-ca5b-404f-8821-43dfccf2da27)
(credit biconomy)

## Flow
![ProjectFlow](https://github.com/super-wallet-001/.github/assets/93488388/cf24c57a-6978-4d3d-88a7-8852c6f40d94)

## Technology Stack

- **Client**: Next.js
- **Smart Contracts**: Solidity
- **Cross-Chain**: [Axelar GMP](https://docs.axelar.dev/dev/general-message-passing/overview)
- **Account Abstraction**: Biconomy SDK V2
- **Social Logins**: Particle Network

## Supported Networks

Super Wallet is currently live on the following testnet networks:

1. Scroll Sepoli Testnet
2. Polygon Mumbai Testnet
3. Avalanche Testnet
4. Mantle Testnet

Feel free to explore and experiment with Super Wallet on these testnet networks.

# Account Abstraction 

We've significantly improved user experience by implementing account abstraction in Super Wallet. To achieve this, we're utilizing Biconomy's Account Abstraction SDK v2.

The Super Wallet lets users to transfer and receive assets on multiple blockchain. However, a issue arises as simply sending ERC20 tokens to another chain, involves three transactions:

1. First, there's a need to approve our Super Wallet bridge smart contract to utilize the tokens for transferring them to another chain.

2. Next, you must trigger the send function on super wallet bridge contract to initiate the multi-chain transaction.

3. Finally, on the recipient's end, when the tokens are received into the smart contract wallet on the recipient's chain, another transaction is required to transfer the tokens to the recipient.

To put it simply, performing such a transfer conventionally would demand three different signatures on more than one chains, which is not very user-friendly. However, we have improved this user experience by integrating Biconomy's Multi-Chain Validator Module. This module creates a Merkle tree comprising multiple userOps across various chains and allows the user to sign that Merkle tree instead of handling individual transactions on each chain.

This enhancement significantly streamlines the user experience, and the concept can be extended in Super Wallets to eventually enable more complex transactions with a single click. This eliminates a major user obstacle and simplifies the process to just signing one transaction, enabling seamless transactions across multiple chains. For more details about how the multichain validation takes place, refer to Biconomy's Multi-Chain Validator Module [here](https://forum.biconomy.io/t/biconomy-multichain-validator-module/509/2).
