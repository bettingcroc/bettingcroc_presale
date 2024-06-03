require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    BSCTestnet: {
      url: `https://bsc-testnet.publicnode.com`,
      accounts: ["0xa5f6e0a827cc10fee319802a6a08e1ae0af1329fa69cc9a76e815a7692afcc18"]
    },
    Base:{
      url: `https://mainnet.base.org`,
      accounts: ["0x105cced402deadb60306a6fbeb2adc02f80d8cdfef1a0e8fddb65bb08f645870"]
    }
  }
};
