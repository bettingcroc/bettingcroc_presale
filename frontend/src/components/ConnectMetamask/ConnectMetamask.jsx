import React from "react";
import metamaskImage from "./metamask.png"
//import PropTypes from "prop-types";
import Web3 from "web3";

function ConnectMetamask(props) {
  async function connectMetamask() {
    if (window.ethereum && window.ethereum.isMetaMask) {
      //console.log("MetaMask Here!");

      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          props.web3.setProvider(window.ethereum)
          props.setDefaultAccount(result[0]);
          localStorage.setItem("walletType", "Metamask")
        })
        .catch((error) => {
        });
    } else {
      console.log("Need to install MetaMask");
    }
  };
  return (
    <button id="metamaskConnecterDiv" className="buttonTransparent buttonTransparentModal" onClick={connectMetamask}>
      <img src={metamaskImage} alt="metamaskImage" className='walletsImage'></img>
      <p className='walletName'>Metamask Web Extension</p>
    </button>
  );

}

ConnectMetamask.propTypes = {};

ConnectMetamask.defaultProps = {};

export default ConnectMetamask;
