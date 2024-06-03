/* global BigInt */

import Web3 from "web3";
import { EthereumProvider } from '@walletconnect/ethereum-provider'
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import ConnectMetamask from '../ConnectMetamask/ConnectMetamask';
import ConnectWc from '../ConnectWC/ConnectWC';
import ConnectCb from '../ConnectCB/ConnectCB';
import React, { useState, useEffect } from 'react';
import closeImage from "../../assets/close.png"
import "./PreSale.css"
const DEFAULT_ETH_JSONRPC_URL = "https://mainnet.base.org"
const PRESALE_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_tokenAddress",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "balances",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "burnRemainingTOkens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "buyTokens",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "getBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getIsPreSaleLive",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTotalPresaleTokensRemaining",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "isPreSaleLive",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "maxTokenPerUser",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address payable",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "presalePrice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "togglePreSaleStatus",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "token",
    "outputs": [
      {
        "internalType": "contract ISTINKAT",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalPresaleTokensRemaining",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
const PRESALE_ADDRESS = "0x6e4782e06632967D5260355Aa0963BcB1DaB7fA3"
const PreSale = (props) => {
  const [web3, setWeb3] = useState(new Web3(DEFAULT_ETH_JSONRPC_URL))
  const [defaultAccount, setDefaultAccount] = useState()
  const [ethBalance, setEthBalance] = useState()
  const [preSaleContract, setPreSaleContract] = useState()
  const [tokensRemaining, setTokensRemaining] = useState()
  const [balance, setBalance] = useState()
  const [ethToBuy, setEthToBuy] = useState(0)
  const [stinkatToBuy, setStinkatToBuy] = useState(0)
  const [packsToBuy, setPacksToBuy] = useState(0)
  const [isPreSaleLive, setIsPreSaleLive] = useState()

  function decimalsConverter(numberToConvert) {
    return Math.pow(numberToConvert, 18)
  }
  function weiconvert(number) { return BigInt(number * decimalsConverter(10)); }
  function changePacks(packs) {
    setPacksToBuy(packs)
    setStinkatToBuy(660 * packs)
    setEthToBuy(parseFloat(0.0003 * packs).toPrecision(2))
  }
  function disconnect() {
    console.log("disconnecting wallet")
    setDefaultAccount(undefined)
    web3.setProvider(DEFAULT_ETH_JSONRPC_URL)
    localStorage.clear();
  }
  function buyTokens() {
    let amountOfTokens = BigInt((660 * packsToBuy).toString() + "000000000000000000")
    let amountOfEth = BigInt((ethToBuy * 1000000).toString() + "000000000000")
    console.log(amountOfTokens)

    console.log(amountOfEth)
    console.log(2200000 * parseInt(amountOfEth))
    console.log(amountOfTokens == weiconvert(2200000 * parseInt(amountOfEth)))
    preSaleContract.methods
      .buyTokens(amountOfTokens)
      .send({ from: defaultAccount, value: amountOfEth })
      .once('receipt', (receipt) => {
        console.log("buy success")
      })
      .once('error', (error) => {
        console.log(error)
      })

  }
  useEffect(() => {
    let walletType = localStorage.getItem("walletType")
    if (walletType === "Metamask") {
      web3.setProvider(window.ethereum)
    }
    else {
      web3.setProvider(DEFAULT_ETH_JSONRPC_URL)
    }
    let getAccounts = async () => {
      const accounts = await web3.eth.getAccounts();
      if (accounts[0] !== undefined) {
        setDefaultAccount(accounts[0]);
      }
    }
    getAccounts()
    setPreSaleContract(new web3.eth.Contract(PRESALE_ABI, PRESALE_ADDRESS));

  }, [])
  useEffect(() => {
    if (preSaleContract !== undefined) {
      preSaleContract.methods.getTotalPresaleTokensRemaining().call().then((result) => { setTokensRemaining(parseFloat(result) / 10 ** 18) })
      preSaleContract.methods.getIsPreSaleLive().call().then((result) => { setIsPreSaleLive(result) })

    }
  }, [preSaleContract])
  useEffect(() => {
    if (defaultAccount !== undefined) {
      web3.eth.getBalance(defaultAccount).then((result) => setEthBalance(parseFloat(result) / 10 ** 18));
      preSaleContract.methods.getBalance(defaultAccount).call().then((result) => { setBalance(parseFloat(result) / 10 ** 18) })

    }
  }, [defaultAccount])
  return (
    <div id="presale">
      <p className="whiteP titleBox">PRESALE</p>
      <div id="boxPreSale">
      {defaultAccount === undefined ? 
        <div id="connecterDiv">

          <p id="chooseYourProvider" className="whiteP">Connect your wallet</p>

          <div id="line2Modal">
            <ConnectMetamask web3={web3} setDefaultAccount={setDefaultAccount} ></ConnectMetamask>

            <ConnectWc web3={web3} setDefaultAccount={setDefaultAccount}></ConnectWc>
          </div>

        </div> :
         <div id="boxConnected">
          <p id="chooseYourProvider" className="whiteP">Connected as {defaultAccount.substring(0, 5) + "..." + defaultAccount.substring(39)}</p>
          <p className="whiteP">Balance : {ethBalance} BNB</p>
          <button id="disconnect" onClick={(e) => { disconnect() }}>Disconnect</button></div>
        }
        
        <div id="buyBox">
          <p id="chooseYourProvider" className="whiteP">Select a number of packs :</p>
          <input id="packsToBuyInput" type="number" placeholder="Packs to buy" min="0" max="300" value={packsToBuy} onChange={(e) => changePacks(e.target.value)}></input>
          <input className="packsToBuyInput2" type="text" placeholder="0 BNB" value={ethToBuy + " BNB"} readOnly></input>
          <input className="packsToBuyInput2" type="text" placeholder="0 BETTINGCROC" value={stinkatToBuy + " BETTINGCROC"} readOnly></input>
          <button id="buyStinkat" onClick={(e) => buyTokens()}>BUY $BETTINGCROC</button>
        </div>
        <div id="infosPreSale">
          <p className="whiteP" id="chooseYourProvider">{isPreSaleLive ? "PreSale is live" : "PreSale is off"}</p>
          {/*<p className="whiteP">Tokens remaining : {tokensRemaining}</p>*/}
          {balance !== undefined && <p className="whiteP" id="chooseYourProvider">Tokens remaining for your wallet : {198000 - balance}</p>}
        </div>
      </div>




    </div>
  )
}

export default PreSale;
