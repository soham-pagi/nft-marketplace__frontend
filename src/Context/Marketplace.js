import { ethers } from "ethers";
import axios from "axios";

//INTERNAL  IMPORT
import { NFTMarketplaceAddress, NFTMarketplaceABI } from "./constants";
import { apiKey, apiSecret } from "../constants";

function fetchContract(signerOrProvider) {
  return ethers.Contract(
    NFTMarketplaceAddress,
    NFTMarketplaceABI,
    signerOrProvider
  );
}

export function isWalletConnected(connection) {
  if (connection) {
    return true;
  }

  return false;
}

function checkForWallet() {
  try {
  } catch (error) {}
}

//---CONNECTING WITH SMART CONTRACT

const connectingWithSmartContract = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    return contract;
  } catch (error) {
    console.log("Something went wrong while connecting with contract");
    alert("error in connect with smart contract");
  }
};
