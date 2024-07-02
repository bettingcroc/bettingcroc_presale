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

contract BettingCrocPresale {
    address payable public owner;
    uint256 public presalePrice;
    uint256 public totalPresaleTokensRemaining;
    bool public isPreSaleLive;
    bool public areTokensClaimable;
    IBCROC public token;
    mapping(address => uint256) public balances;

    constructor(address _tokenAddress) {
        owner = payable(msg.sender);
        presalePrice = 1200000;
        totalPresaleTokensRemaining = 300000000 * 10 ** 18;
        isPreSaleLive = false;
        areTokensClaimable = false;
        token = IBCROC(_tokenAddress);
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
    function getAreTokensClaimable() public view returns (bool) {
        return areTokensClaimable;
    }

    function togglePreSaleStatus() public {
        require(
            msg.sender == owner,
            "Only the owner can toggle presale status"
        );
        isPreSaleLive = !isPreSaleLive;
    }

    function withdraw() public {
        require(msg.sender == owner, "Only the owner can withdraw funds");
        owner.transfer(address(this).balance);
    }

    function toggleAreTokensClaimable() public {
        require(
            msg.sender == owner,
            "Only the owner can toggle tokens claimability"
        );
        areTokensClaimable = !areTokensClaimable;
    }
    
    function buyTokens(uint256 _amount) public payable {
        require(isPreSaleLive, "presale is not live");
        require(
            msg.value * presalePrice == _amount,
            "Amount must be equal to the product of the amount of tokens and the presale price"
        );
        require(
            totalPresaleTokensRemaining - _amount > 0,
            "Not enough tokens remaining"
        );
        totalPresaleTokensRemaining -= _amount;
        balances[msg.sender] += _amount;
    }

    function burnRemainingTokens() public {
        require(msg.sender == owner, "Only the owner can burn tokens");
        require(!isPreSaleLive, "PreSale is live");
        token.burn(token.balanceOf(address(this)));
    }

    function claimTokens() public {
        require(areTokensClaimable, "Tokens are not claimables yet");
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        bool success = token.transfer(msg.sender, amount);
        require(success, "Tokens transfer failed");
    }
}