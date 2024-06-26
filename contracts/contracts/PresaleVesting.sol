// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

abstract contract IBCROC {
    function transfer(
        address recipient,
        uint256 amount
    ) external virtual returns (bool);
    function burn(uint256) external virtual;
    function balanceOf(address) external view virtual returns (uint256);
}

contract PresaleVesting {
    address payable public owner;
    uint256 public presalePrice;
    uint256 public totalPresaleTokensRemaining;
    uint256 public maxTokenPerUser;
    bool public isPreSaleLive;
    IBCROC public token;
    mapping(address => uint256) public balances;

    uint256 public vestingStartTime;
    uint256 public vestingDuration;
    mapping(address => uint256) tokensVested;
    mapping(address => uint256) tokensReleased;

    constructor(address _tokenAddress) {
        owner = payable(msg.sender);
        token = IBCROC(_tokenAddress);
        presalePrice = 400000;
        totalPresaleTokensRemaining = 300000000 * 10 ** 18;
        maxTokenPerUser = 3000000 * 10 ** 18;
        isPreSaleLive = false;
        vestingStartTime = block.timestamp;
        vestingDuration = 7776000;
    }

    function getTotalPresaleTokensRemaining() public view returns (uint256) {
        return totalPresaleTokensRemaining;
    }
    function getBalance(address _address) public view returns (uint256) {
        return balances[_address];
    }

    function getIsPreSaleLive() public view returns (bool) {
        return isPreSaleLive;
    }

    function getTokensVested(address wallet) public view returns (uint256) {
        return tokensVested[wallet];
    }
    function getTokensReleased(address wallet) public view returns (uint256) {
        return tokensReleased[wallet];
    }
    function getVestingStartTime() public view returns (uint256) {
        return vestingStartTime;
    }
    function getVestingDuration() public view returns (uint256) {
        return vestingDuration;
    }

    function togglePreSaleStatus() public {
        require(msg.sender == owner, "Only the owner can toggle presale");
        isPreSaleLive = !isPreSaleLive;
    }

    function withdraw() public {
        require(msg.sender == owner, "Only the owner can withdraw funds");
        owner.transfer(address(this).balance);
    }

    function buyTokens(uint256 _amount) public payable {
        require(isPreSaleLive, "presale is not live");
        require(
            msg.value * presalePrice == _amount,
            "Amount must be equal to the product of the amount of tokens and the presale price"
        );
        require(
            balances[msg.sender] + _amount <= maxTokenPerUser,
            "Exceeded the total amount of tokens for sale"
        );
        require(
            totalPresaleTokensRemaining - _amount > 0,
            "Not enough tokens remaining"
        );
        totalPresaleTokensRemaining -= _amount;
        balances[msg.sender] += _amount;
        uint256 quarterAmount = _amount / 4;
        tokensVested[msg.sender] = quarterAmount * 3;
        token.transfer(msg.sender, quarterAmount);
    }

    function burnRemainingTokens() public {
        require(msg.sender == owner, "Only the owner can burn tokens");
        require(!isPreSaleLive, "PreSale is live");
        token.burn(token.balanceOf(address(this)));
    }

    function release() public {
        uint256 elapsedTime = block.timestamp - vestingStartTime;
        uint256 toRelease = ((elapsedTime * tokensVested[msg.sender]) /
            vestingDuration) - tokensReleased[msg.sender];
        tokensReleased[msg.sender] += toRelease;
        token.transfer(msg.sender, toRelease);
    }
}
