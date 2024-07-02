import HDWalletProvider from '@truffle/hdwallet-provider'
import { Web3 } from 'web3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DEFAULT_ETH_JSONRPC_URL = "https://bsc-testnet-rpc.publicnode.com"
const PRESALE_ADDRESS = "0x1d3F02808920A22e549a9021C4bBcFe64f2dCD01"
const PRESALE_ABI = JSON.parse(fs.readFileSync(__dirname + '/contracts/artifacts/contracts/Presale.sol/Presale.json'))["abi"];
const PRIVATE_KEY_CREATOR = 'a5f6e0a827cc10fee319802a6a08e1ae0af1329fa69cc9a76e815a7692afcc18'
const PUBLIC_KEY_CREATOR = "0x72454D7B1328bDc323c96cd86EAAe6f87Ec598d0"
const provider = new HDWalletProvider(PRIVATE_KEY_CREATOR, DEFAULT_ETH_JSONRPC_URL, 0, 10000);
const web3 = new Web3(provider);

const preSaleContract = new web3.eth.Contract(PRESALE_ABI, PRESALE_ADDRESS);
preSaleContract.setConfig({ contractDataInputFill: "both" })

export {preSaleContract,PUBLIC_KEY_CREATOR}