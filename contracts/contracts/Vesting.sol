pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenVesting {
    IERC20 public token;
    address public beneficiary;
    uint256 public vestingStartTime;
    uint256 public vestingDuration;
    uint256 public totalTokens;
    
    constructor(
        IERC20 _token,
        address _beneficiary,
        uint256 _vestingStartTime,
        uint256 _vestingDuration,
        uint256 _totalTokens
    ) {
        token = _token;
        beneficiary = _beneficiary;
        vestingStartTime = _vestingStartTime;
        vestingDuration = _vestingDuration;
        totalTokens = _totalTokens;
    }

    function release() public {
        require(block.timestamp >= vestingStartTime, "Vesting has not started yet");
        
        uint256 elapsedTime = block.timestamp - vestingStartTime;
        uint256 vestedTokens = (elapsedTime * totalTokens) / vestingDuration;
        require(vestedTokens <= totalTokens, "All tokens have already vested");
        
        uint256 unreleasedTokens = totalTokens - vestedTokens;
        require(unreleasedTokens > 0, "No tokens left to release");
        
        token.transfer(beneficiary, unreleasedTokens);
    }
}