require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ledger");
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    BSCTestnet: {
      url: `https://bsc-testnet.publicnode.com`,
      accounts: ["a45fe19bfd60a077a5e306bfe5d47c991222b4ef7ad09479b45fa5df9fbaa61f"]
    },
    Base:{
      url: `https://mainnet.base.org`,
      accounts: ["0x105cced402deadb60306a6fbeb2adc02f80d8cdfef1a0e8fddb65bb08f645870"]
    },
    BNBChain:{
      url: `https://bsc-dataseed.bnbchain.org/`,
      ledgerAccounts: ["0x557A170644C99eb27B22545625fe97Ac4CA6E07C"]
    }
  }
};
