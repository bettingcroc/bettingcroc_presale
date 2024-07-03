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
    const presale = await Presale.deploy("0x2fBc924faB9fa5d9E609d695943595E1CBB32258");
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
