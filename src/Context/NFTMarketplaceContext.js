import React, { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios";

//INTERNAL  IMPORT
import { NFTMarketplaceAddress, NFTMarketplaceABI } from "./constants";
import { apiKey, apiSecret } from "../constants";

// Create context
const NFTMarketplaceContext = createContext();

function NFTMarketplaceProvider({ children }) {
  const titleData = "Discover, collect, and sell NFTs";

  /// wallet state
  const [currentAccount, setCurrentAccount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  //------USESTATE
  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);

  async function connectWallet() {
    try {
      if (window.ethereum) {
        console.log("not installed");
        setOpenError(true);
        setError("Install MetaMask");
      } else {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        console.log(accounts);

        if (accounts.length) {
          setCurrentAccount(accounts[0]);
        } else {
          setError("No Account Found");
          setOpenError(true);
        }
      }
    } catch (error) {
      setError("Something wrong while connecting to wallet");
      setOpenError(true);
    }
  }

  //---FETCHING SMART CONTRACT
  const fetchContract = (signerOrProvider) =>
    new ethers.Contract(
      NFTMarketplaceAddress,
      NFTMarketplaceABI,
      signerOrProvider
    );

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

  //---UPLOAD TO IPFS FUNCTION
  const uploadToIPFS = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const resFile = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: `${apiKey}`,
          pinata_secret_api_key: `${apiSecret}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const imageLink = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
      console.log(imageLink);
      return imageLink;
    } catch (error) {
      // console.log("Error sending File to IPFS: ");
      // console.log(error);
      setError("Error Uploading to IPFS");
      setOpenError(true);
    }
  };

  //---CREATENFT FUNCTION
  const createNFT = async (name, price, image, description, router) => {
    if (!name || !description || !price || !image)
      return setError("Data Is Missing"), setOpenError(true);

    const data = JSON.stringify({ name, description, image });
    console.log(data);

    try {
      const url = await uploadToIPFS(image);
      console.log(url);

      await createSale(url, price);
      // router("/searchPage");
    } catch (error) {
      setError("Error while creating NFT");
      setOpenError(true);
    }
  };

  //--- createSale FUNCTION
  const createSale = async (url, formInputPrice, isReselling, id) => {
    try {
      console.log(url, formInputPrice, isReselling, id);
      const price = ethers.utils.parseUnits(formInputPrice, "ether");

      const contract = await connectingWithSmartContract();

      const listingPrice = await contract.getListingPrice();

      const transaction = !isReselling
        ? await contract.createToken(url, price, {
            value: listingPrice.toString(),
          })
        : await contract.resellToken(id, price, {
            value: listingPrice.toString(),
          });

      await transaction.wait();
    } catch (error) {
      setError("error while creating sale");
      setOpenError(true);
    }
  };

  //--FETCHNFTS FUNCTION

  const fetchNFTs = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);

      const data = await contract.fetchMarketItems();
      console.log(data);

      const items = await Promise.all(
        data.map(
          async ({ tokenId, seller, owner, price: unformattedPrice }) => {
            const tokenURI = await contract.tokenURI(tokenId);

            const {
              data: { image, name, description },
            } = await axios.get(tokenURI);
            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
              "ether"
            );

            return {
              price,
              tokenId: tokenId.toNumber(),
              seller,
              owner,
              image,
              name,
              description,
              tokenURI,
            };
          }
        )
      );

      // console.log(items);
      return items;
    } catch (error) {
      setError("Error while fetching NFTS");
      setOpenError(true);
    }
  };

  useEffect(() => {
    fetchNFTs();
  }, []);

  //--FETCHING MY NFT OR LISTED NFTs
  const fetchMyNFTsOrListedNFTs = async (type) => {
    try {
      const contract = await connectingWithSmartContract();

      const data =
        type === "fetchItemsListed"
          ? await contract.fetchItemsListed()
          : await contract.fetchMyNFTs();

      const items = await Promise.all(
        data.map(
          async ({ tokenId, seller, owner, price: unformattedPrice }) => {
            const tokenURI = await contract.tokenURI(tokenId);
            const {
              data: { image, name, description },
            } = await axios.get(tokenURI);
            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
              "ether"
            );

            return {
              price,
              tokenId: tokenId.toNumber(),
              seller,
              owner,
              image,
              name,
              description,
              tokenURI,
            };
          }
        )
      );
      return items;
    } catch (error) {
      setError("Error while fetching listed NFTs");
      setOpenError(true);
    }
  };

  useEffect(() => {
    fetchMyNFTsOrListedNFTs();
  }, []);

  //---BUY NFTs FUNCTION
  const buyNFT = async (nft) => {
    try {
      const contract = await connectingWithSmartContract();
      const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

      const transaction = await contract.createMarketSale(nft.tokenId, {
        value: price,
      });

      await transaction.wait();
      // router("/author");
    } catch (error) {
      setError("Error While buying NFT");
      setOpenError(true);
    }
  };

  return (
    <NFTMarketplaceContext.Provider
      value={{
        connectWallet,
        // checkIfWalletConnected,
        // connectWallet,
        uploadToIPFS,
        createNFT,
        fetchNFTs,
        fetchMyNFTsOrListedNFTs,
        buyNFT,
        createSale,
        currentAccount,
        titleData,
        openError,
        setOpenError,
        error,
        setError,
      }}
    >
      {children}
    </NFTMarketplaceContext.Provider>
  );
}

export default NFTMarketplaceProvider;
export { NFTMarketplaceContext };
