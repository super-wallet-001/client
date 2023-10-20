// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {IAxelarGateway} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGateway.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Sender {

    IAxelarGateway public immutable gateway;
    IERC20 public immutable token;

    constructor(address _gateway,address _token){
        gateway=IAxelarGateway(_gateway);
        token=IERC20(_token);
    }

    function send(uint256 tokenAmount,address receiver) public {
        // TODO: Transefer the tokens from msg.sender to self
        uint256 amount = tokenAmount * 10 ** 6;
        token.approve(address(gateway),amount);
        gateway.sendToken(
            "Polygon",
            Strings.toHexString(uint256(uint160(receiver)), 20),
            "aUSDC",
            amount
        );
    }

}
