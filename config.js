import HDWalletProvider from '@truffle/hdwallet-provider'
import { Web3 } from 'web3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DEFAULT_ETH_JSONRPC_URL = "https://bsc-dataseed.bnbchain.org"
const PRESALE_ADDRESS = "0xd36496A919AF2cE414bc0cD084B66E96d89D99B2"
const PRESALE_ABI = JSON.parse(fs.readFileSync(__dirname + '/contracts/artifacts/contracts/Presale.sol/BettingCrocPresale.json'))["abi"];
const PRIVATE_KEY_CREATOR = 'a45fe19bfd60a077a5e306bfe5d47c991222b4ef7ad09479b45fa5df9fbaa61f'
const PUBLIC_KEY_CREATOR = "0xf19B84D9a81765FC47F231F9363a4e00A796A585"
const provider = new HDWalletProvider(PRIVATE_KEY_CREATOR, DEFAULT_ETH_JSONRPC_URL, 0, 10000);
const web3 = new Web3(provider);

const preSaleContract = new web3.eth.Contract(PRESALE_ABI, PRESALE_ADDRESS);
preSaleContract.setConfig({ contractDataInputFill: "both" })

export {preSaleContract,PUBLIC_KEY_CREATOR}