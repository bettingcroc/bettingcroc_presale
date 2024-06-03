import { Web3 } from 'web3';
const DEFAULT_ETH_JSONRPC_URL = "https://bsc-testnet.blockpi.network/v1/rpc/public"

const web3 = new Web3(DEFAULT_ETH_JSONRPC_URL);

console.log(web3.eth.accounts.wallet.create(2))