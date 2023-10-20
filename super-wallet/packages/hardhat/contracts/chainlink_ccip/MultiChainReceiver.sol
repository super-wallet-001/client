// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

contract MultiChainReceiver {

    address public owner;

    // Mapping of user address to a mapping of token addresses to balances
    mapping(address => mapping(address => uint256)) public balances;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    function deposit() external payable {
        balances[msg.sender][address(0)] += msg.value;  // 'address(0)' represents native ETH
    }

    function depositToken(address tokenAddress, uint256 amount) external {
        require(IERC20(tokenAddress).transferFrom(msg.sender, address(this), amount), "Token transfer failed");
        balances[msg.sender][tokenAddress] += amount;
    }

    function receiveCrossChainData(address sender, address tokenAddress, uint256 amount) external onlyOwner {
        balances[sender][tokenAddress] += amount;
    }

    function withdraw(uint256 amount) external {
        require(balances[msg.sender][address(0)] >= amount, "Insufficient ETH balance");
        balances[msg.sender][address(0)] -= amount;
        payable(msg.sender).transfer(amount);
    }

    function withdrawToken(address tokenAddress, uint256 amount) external {
        require(balances[msg.sender][tokenAddress] >= amount, "Insufficient token balance");
        balances[msg.sender][tokenAddress] -= amount;
        require(IERC20(tokenAddress).transfer(msg.sender, amount), "Token transfer failed");
    }
}
