//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { AxelarExecutable } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/executable/AxelarExecutable.sol';
import { IAxelarGateway } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGateway.sol';
import { IAxelarGasService } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGasService.sol';

contract SenderReceiver is AxelarExecutable {
    address public owner;
    string public value;
    string public sourceChain;
    string public sourceAddress;
    IAxelarGasService gasService;

    event Executed();

    constructor(address _gateway, address _gasReceiver)
    AxelarExecutable(_gateway)
    {
        gasService = IAxelarGasService(_gasReceiver);
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }


    // Call this function to update the value of this contract along with all its siblings'.
    function setRemoteValue(
        string memory destinationChain,
        string memory destinationAddress,
        string calldata message
    ) external payable {
        require(msg.value > 0, 'Gas payment is required');

        bytes memory payload = abi.encodePacked(message);
        gasService.payNativeGasForContractCall{value: msg.value}(
            address(this),
            destinationChain,
            destinationAddress,
            payload,
            msg.sender
        );
        gateway.callContract(destinationChain, destinationAddress, payload);
    }

    // Handles calls created by setAndSend. Updates this contract's value
    function _execute(
        string calldata sourceChain_,
        string calldata sourceAddress_,
        bytes calldata payload_
    ) internal override {
        (value) = abi.decode(payload_, (string));
        sourceChain = sourceChain_;
        sourceAddress = sourceAddress_;

        emit Executed();
    }

    // Polygon Mumbai 0x72f9b0ADe272a558D59f7fa1d1EC61020D5Ed5c7
    // AVALANCHE 0x0dBe4322D1A631Dc54441c4B43cd3d209Df3aC2A


    function withdraw(uint256 amount) external onlyOwner {
        payable(owner).transfer(amount);
    }
}
