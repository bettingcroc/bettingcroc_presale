// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
async function main() {
    const currentTimestampInSeconds = Math.round(Date.now() / 1000);
    //const unlockTime = currentTimestampInSeconds + 60;

    //const lockedAmount = hre.ethers.utils.parseEther("0.001");

    const Presale = await hre.ethers.getContractFactory("BettingCrocPresale");
    const presale = await Presale.deploy("0x4dC3dD7FA01d15662b00cD49AE5564955f874833");
    console.log(
        `Presale deployed to ${presale.target}`
    );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
