// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import {IEntryPoint} from "@account-abstraction/contracts/interfaces/IEntryPoint.sol";
import {BaseAccount} from "@account-abstraction/contracts/core/BaseAccount.sol";
import {UserOperation} from "@account-abstraction/contracts/interfaces/UserOperation.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract Wallet is BaseAccount {

    using ECDSA for bytes32;
    address[] public owners;

    address public immutable walletFactory;
    IEntryPoint private immutable entryPointCont;

    constructor(IEntryPoint _entryPoint, address _walletFactory) {
        entryPointCont = _entryPoint;
        walletFactory = _walletFactory;
    }

    function entryPoint() public view override returns(IEntryPoint) {
        return entryPointCont;
    }

    function _validateSignature(
        UserOperation calldata userOp,
        bytes32 userOpHash
    ) internal view override returns(uint256){
        bytes32 hash = userOpHash.toEthSignedMessageHash();
        bytes[] memory signatures = abi.decode(userOp.signature,(bytes[]));

        // To be modified, so that we can validate any number of signature, and not hardcoded to 1.
        bool flag=false;
        for(uint256 i=0;i<owners.length;i++){
            for(uint256 j=0;j<signatures.length;j++){
                if(owners[i]==hash.recover(signatures[j])){
                    flag=true;
                    break;
                }
            }
            if(flag){
                break;
            }
        }

        if(!flag){
            return SIG_VALIDATION_FAILED;
        }

        return 0;
    }

}
