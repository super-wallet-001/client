// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";

contract CustomCCIPReceiver is CCIPReceiver {
    address public router;

    // Events
    event ReceivedData(bytes data);

    /**
     * @notice Constructor initializes the CCIPReceiver with the router address.
     * @param _router Address of the router.
     */
    constructor(address _router) CCIPReceiver(_router) {
        router = _router;
    }

    /**
     * @notice Function to receive data from Chainlink CCIP.
     * @param data Bytes data received.
     */
    function receiveData(bytes memory data) external onlyRouter {
        emit ReceivedData(data);
        // Handle the received data as needed.
    }

    // Add other necessary functions or modifiers below.

    modifier onlyRouter() {
        require(msg.sender == router, "Only the router can call this function.");
        _;
    }
}
