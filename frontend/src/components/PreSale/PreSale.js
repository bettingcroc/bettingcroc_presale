/* global BigInt */

import Web3 from "web3";
import { EthereumProvider } from '@walletconnect/ethereum-provider'
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import ConnectMetamask from '../ConnectMetamask/ConnectMetamask';
import ConnectWc from '../ConnectWC/ConnectWC';
import ConnectCb from '../ConnectCB/ConnectCB';
import React, { useState, useEffect } from 'react';
import closeImage from "../../assets/close.png"
import arrowDown from "../../assets/arrowDown.png"
import bnb from "../../assets/bnb.webp"
import bcroc from "../../assets/Logo-05.png"
import "./PreSale.css"
import cadenasClosed from "../../assets/cadenas.png"
import cadenasOpen from "../../assets/cadenas-ouvert.png"


import { PRESALE_ABI, PRESALE_ADDRESS } from "../../config.js";
const DEFAULT_ETH_JSONRPC_URL = "https://bsc-dataseed.bnbchain.org"

const PreSale = (props) => {
  const [web3, setWeb3] = useState(new Web3(DEFAULT_ETH_JSONRPC_URL))
  const [defaultAccount, setDefaultAccount] = useState()
  const [ethBalance, setEthBalance] = useState()
  const [preSaleContract, setPreSaleContract] = useState()
  const [tokensRemaining, setTokensRemaining] = useState()
  const [balance, setBalance] = useState()
  const [bcrocToBuy, setBcrocToBuy] = useState(60000)
  const [bnbToBuy, setBnbToBuy] = useState(0.05)
  const [isPreSaleLive, setIsPreSaleLive] = useState()
  const [tokensTotal, setTokensTotal] = useState(0)
  const [tokensReleased, setTokensReleased] = useState(0)
  const [tokensReleasables, setTokensReleasables] = useState(0)
  const [vestingEnd, setVestingEnd] = useState()
  const [bnbPrice, setBnbPrice] = useState()
  const [areTokensClaimable, setAreTokensClaimable] = useState()
  const [alertMsg, setAlertMsg] = useState("invisible")
  const [textMsg, setTextMsg] = useState("")
  function decimalsConverter(numberToConvert) {
    return Math.pow(numberToConvert, 18)
  }
  function weiconvert(number) { return BigInt(number * decimalsConverter(10)); }
  function changePacks(packs) {
    if (getDecimalPlaces(packs) > 3) {
      return
    }
    setBnbToBuy(packs)
    setBcrocToBuy(Math.round(1200000 * packs))
  }
  function getDecimalPlaces(number) {
    const decimalPart = String(number).split('.')[1];
    return decimalPart ? decimalPart.length : 0;
  }
  function disconnect() {
    console.log("disconnecting wallet")
    setDefaultAccount(undefined)
    web3.setProvider(DEFAULT_ETH_JSONRPC_URL)
    localStorage.clear();
  }
  function buyTokens() {
    if (!isPreSaleLive) {
      return
    }
    if (defaultAccount === undefined) {
      setAlertMsg("alertMsg")
      setTextMsg("Connect your wallet to buy some $BCROC")
      setTimeout(() => {
        setAlertMsg("invisible")
        setTextMsg("")

      }, 5000);
      return
    }
    let amountOfTokens = BigInt((bcrocToBuy * 1000000).toString() + "000000000000")
    let amountOfEth = BigInt((bnbToBuy * 1000000).toString() + "000000000000")
    console.log(amountOfTokens)
    console.log(amountOfEth)
    let approveToast = props.toast.loading("Buying " + bcrocToBuy + " $BCROC", { closeButton: true, position: "top-center" })
    try {
      preSaleContract.methods
        .buyTokens(amountOfTokens)
        .send({ from: defaultAccount, value: amountOfEth })
        .once('receipt', (receipt) => {
          props.toast.update(approveToast, { render: bcrocToBuy + " $BCROC are yours ! 🐊", type: "success", isLoading: false, closeButton: true, autoClose: 7000 });

          console.log("buy success")
          updateBcrocBalance()
        })
        .once('error', (error) => {
          console.log(error)
          props.toast.update(approveToast, { render: "Error " + error.code, type: "error", isLoading: false, closeButton: true, autoClose: 7000 });

        })
        .catch(e => {
          console.log(e)
          props.toast.update(approveToast, { render: "Something went wrong.. ", type: "error", isLoading: false, closeButton: true, autoClose: 7000 });

        })
    } catch (e) { console.log(e) }
  }
  function claimTokens() {
    preSaleContract.methods
      .claimTokens()
      .send({ from: defaultAccount })
      .once('receipt', (receipt) => {
        console.log("claimTokens success")
        updateBcrocBalance()
      })
      .once('error', (error) => {
        console.log(error)
      })
  }
  function togglePreSale() {
    preSaleContract.methods
      .togglePreSaleStatus()
      .send({ from: defaultAccount })
      .once('receipt', (receipt) => {
        console.log("release success")
      })
      .once('error', (error) => {
        console.log(error)
      })
  }
  function updateBcrocBalance() {
    preSaleContract.methods.getBalance(defaultAccount).call().then((result) => { setBalance(Math.round(parseFloat(result) / 10 ** 18)) })

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
        setDefaultAccount(accounts[0].toLowerCase());
      }
    }
    getAccounts()
    setPreSaleContract(new web3.eth.Contract(PRESALE_ABI, PRESALE_ADDRESS));
    fetch("https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDC").then(res => res.json().then(data => { console.log(data); setBnbPrice(parseFloat(data.price)) }))
  }, [])
  useEffect(() => {
    if (preSaleContract !== undefined) {
      preSaleContract.methods.getTotalPresaleTokensRemaining().call().then((result) => { console.log(result); setTokensRemaining(Math.round(parseFloat(result) / 10 ** 18)) })
      preSaleContract.methods.getIsPreSaleLive().call().then((result) => { console.log(result); setIsPreSaleLive(result) })
      preSaleContract.methods.getAreTokensClaimable().call().then((result) => { console.log(result); setAreTokensClaimable(result) })

    }
  }, [preSaleContract])
  useEffect(() => {
    if (defaultAccount !== undefined) {
      web3.eth.getBalance(defaultAccount).then((result) => setEthBalance(parseFloat(result) / 10 ** 18));
      updateBcrocBalance()
    }
  }, [defaultAccount])
  return (
    <div id="presale">
      <div id="boxPreSale1">

        <p className="whiteP" id="contractAddressP">Presale contract address : <strong id="contractAddress">0xd36496A919AF2cE414bc0cD084B66E96d89D99B2</strong></p>
        <p className="whiteP" id="contractAddressP">Connect your wallet and buy tokens or send any amount of BNB to the contract address</p>
        <p className="whiteP" id="contractAddressP">Presale price : 0.0005 $</p>
        <p className="whiteP" id="contractAddressP">Listing price : 0.001 $</p>
      </div>
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
          <p id="chooseYourProvider" className="whiteP">Buy</p>
          <div id="interfaceBuyToken">
            <div className="divToken">
              <div id="pricesBox">
                <input className="bnbToBuyInput" type="text" placeholder="0" value={bnbToBuy} onChange={(e) => changePacks(e.target.value)}></input>
                <p id="usdPrice">≈ {(bnbToBuy * bnbPrice).toFixed(1)} USDC</p>
              </div>

              <div className="tokenNameBox">
                <img src={bnb}></img>
                <p>BNB</p>
              </div>
            </div>
            <img id="arrowDown" src={arrowDown}></img>
            <div className="divToken">
              <input className="bnbToBuyInput2" type="text" placeholder="0" value={bcrocToBuy} readOnly></input>
              <div className="tokenNameBox">
                <img src={bcroc}></img>
                <p>BCROC</p>
              </div>
            </div>
          </div>


          <button className={isPreSaleLive ? "activeButton" : "inactiveButton"} onClick={(e) => buyTokens()}>BUY $BCROC</button>
          <p className={alertMsg}>{textMsg}</p>
        </div>
        <div id="infosPreSale">
          {//<p className="whiteP rightBoxP" >{isPreSaleLive ? "PreSale is live" : "PreSale is off"}</p>
          }<p className="whiteP rightBoxP" >Presale raise : 250 BNB</p>
          {balance !== undefined && <p className="whiteP rightBoxP" >My tokens locked : {balance}</p>}
          {//<p className="whiteP rightBoxP" id="tokensRemainingP" >Tokens remaining : {tokensRemaining}</p>
          }
          {areTokensClaimable ?
            <div id="tokensClaimableBox">
              {defaultAccount === undefined || balance === 0 && <p className="whiteP">Tokens are claimable</p>}
              {defaultAccount !== undefined && <button className="activeButton" onClick={(e) => claimTokens()}><p>Claim {balance} Tokens</p><img id="cadenasOpen" src={cadenasOpen}></img></button>
              }            </div> :

            <div id="tokensLockedDivP"><p className="whiteP rightBoxP">Tokens are locked</p><img id="cadenasOpen" src={cadenasClosed}></img></div>
          }


          {/*balance !== undefined && <p className="whiteP" id="chooseYourProvider">Tokens remaining for your wallet : {198000 - balance}</p>*/}
        </div>
      </div>

      {/* defaultAccount !== "0x72454d7b1328bdc323c96cd86eaae6f87ec598d0".toLowerCase() ? null :

        <div id="boxAdmin">
          <button onClick={togglePreSale}>TogglePreSale</button>
        </div>*/
      }


    </div>
  )
}

export default PreSale;
