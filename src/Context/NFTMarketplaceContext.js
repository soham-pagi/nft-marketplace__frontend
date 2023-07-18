import React, { createContext, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
// import Buffer from "buffer";

//INTERNAL  IMPORT
import { NFTMarketplaceAddress, NFTMarketplaceABI } from "./constants";
import { apiKey, apiSecret } from "../constants";
import images from "../img/index";

// Create context
const NFTMarketplaceContext = createContext();

// COMPONENT STARTS HERE
function NFTMarketplaceProvider({ children }) {
  const [mainNft, setMainNFt] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMetamaskConnected, setIsMetamaskConnected] = useState(false);
  const [userProfileData, setUserProfileData] = useState({
    username: "Guest",
    imgUrl: images.randomGuy,
  });

  /// wallet state
  const [currentAccount, setCurrentAccount] = useState("");
  const [balance, setBalance] = useState(0);

  //------USESTATE
  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);

  const checkMetamaskConnection = async () => {
    if (window.ethereum && window.ethereum.isConnected()) {
      setIsMetamaskConnected(true);

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const bal = await provider.getBalance(accounts[0]);
        const formattedBalance = ethers.utils.formatEther(bal);
        const trimmedBalance = parseFloat(formattedBalance).toFixed(3);
        setCurrentAccount(accounts[0]);
        setBalance(trimmedBalance);
      } catch (error) {
        console.log("Something went wrong", error);
      }

      console.log({ currentAccount });
    }
  };

  async function connectWallet() {
    try {
      if (!window.ethereum)
        return (
          setOpenError(true), setError("Please install Metamask to continue...")
        );

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const unformattedBalance = await provider.getBalance(accounts[0]);
        const balance = ethers.utils.formatEther(unformattedBalance);
        setCurrentAccount(accounts[0]);
        setBalance(balance);
      } else {
        setError("No Account Found");
        setOpenError(true);
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
  const uploadToIPFS = async (image) => {
    console.log("In uploadToIPFS");

    try {
      console.log("In try block", image);
      const formData = new FormData();

      // formData.append("pinataMetadata", JSON.stringify(metadata));
      formData.append("file", image);

      console.log("above axios");
      const resFile = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        maxBodyLength: "Infinity",
        data: formData,
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          pinata_api_key: `${apiKey}`,
          pinata_secret_api_key: `${apiSecret}`,
          Accept: "text/plain",
        },
      });

      console.log("res.data", resFile.data);

      const imageLink = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
      console.log(imageLink);
      return imageLink;
    } catch (error) {
      console.log("Error sending File to IPFS: ");
      console.log(error);
      setError("Error Uploading to IPFS");
      setOpenError(true);
    }
  };

  //---CREATENFT FUNCTION
  const createNFT = async (name, price, image, description) => {
    if (!name || !description || !price || !image) {
      setError("Data Is Missing");
      setOpenError(true);
      return false;
    }

    try {
      setIsLoading(true);
      const url = await uploadToIPFS(image);
      setIsLoading(false);
      console.log(url);

      await createSale(url, price, name, description);
      console.log({ url, price });
      // navigate("/collection");
    } catch (error) {
      setError("Error while creating NFT");
      setOpenError(true);
    }
  };

  //--- createSale FUNCTION
  const createSale = async (
    url,
    formInputPrice,
    name,
    description,
    isReselling,
    id
  ) => {
    try {
      console.log({ url, formInputPrice, isReselling, id });

      const price = ethers.utils.parseUnits(formInputPrice, "ether");
      console.log({ price });

      const contract = await connectingWithSmartContract();

      const listingPrice = await contract.getListingPrice();

      const transaction = !isReselling
        ? await contract.createToken(url, price, name, description, {
            value: listingPrice.toString(),
          })
        : await contract.resellToken(id, price, {
            value: listingPrice.toString(),
          });

      const receipt = await transaction.wait();
      console.log({ receipt });
      return true;
    } catch (error) {
      setError("error while creating sale");
      setOpenError(true);
      return false;
    }
  };

  // Return single nft
  const fetchNftWithId = async (tokenId) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const contract = fetchContract(provider);

      const data = await contract.fetchItemWithId(+tokenId);

      const item = await Promise.all(
        [data].map(
          async ({
            name,
            description,
            tokenId,
            seller,
            owner,
            price: unformattedPrice,
          }) => {
            const tokenURI = await contract.tokenURI(tokenId);
            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
              "ether"
            );

            return {
              name,
              description,
              tokenURI,
              price,
              tokenId: tokenId.toNumber(),
              seller,
              owner,
            };
          }
        )
      );

      console.log(item);
      return item;
    } catch (error) {
      console.log(error);
      setError("Error while fetching NFT");
      setOpenError(true);
    }
  };

  //--FETCHNFTS FUNCTION
  const fetchNFTs = async () => {
    try {
      // const provider = new ethers.providers.JsonRpcProvider(
      //   "http://127.0.0.1:7545"
      // );
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const contract = fetchContract(provider);
      window.c = contract;
      window.f = fetchNftWithId;

      const data = await contract.fetchMarketItems();

      const items = await Promise.all(
        data.map(
          async ({
            name,
            description,
            tokenId,
            seller,
            owner,
            price: unformattedPrice,
          }) => {
            const tokenURI = await contract.tokenURI(tokenId);
            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
              "ether"
            );

            return {
              name,
              description,
              tokenURI,
              price,
              tokenId: tokenId.toNumber(),
              seller,
              owner,
            };
          }
        )
      );

      console.log(items);
      return items;
    } catch (error) {
      setError("Error while fetching NFTS");
      setOpenError(true);
    }
  };

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
          async ({
            name,
            description,
            tokenId,
            seller,
            owner,
            price: unformattedPrice,
          }) => {
            const tokenURI = await contract.tokenURI(tokenId);
            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
              "ether"
            );

            return {
              name,
              description,
              tokenURI,
              price,
              tokenId: tokenId.toNumber(),
              seller,
              owner,
            };
          }
        )
      );
      // console.log(items);
      return items;
    } catch (error) {
      console.log(error);
      setError("Error while fetching listed NFTs");
      setOpenError(true);
    }
  };

  //---BUY NFTs FUNCTION
  const buyNFT = async (nft) => {
    try {
      console.log(nft);
      const contract = await connectingWithSmartContract();
      const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

      const transaction = await contract.createMarketSale(nft.tokenId, {
        value: price,
      });

      const receipt = await transaction.wait();
      console.log(receipt);
    } catch (error) {
      setError("Error While buying NFT");
      setOpenError(true);
    }
  };

  const getProfile = async (metamaskWalletAddress = "12345") => {
    if (metamaskWalletAddress === "") {
      return;
    }

    const apiUrl = `http://localhost:5000/api/users/${metamaskWalletAddress}`;
    const userPhotoExtensionType = "image/jpeg";

    try {
      const response = await fetch(apiUrl);
      const jsonData = await response.json();

      const imageData = new Uint8Array(jsonData.image.data.data);
      const base64Data = btoa(String.fromCharCode.apply(null, imageData));
      const imgUrl = `data:${userPhotoExtensionType};base64, ${base64Data}`;

      setUserProfileData({ username: jsonData.username, imgUrl });
    } catch (error) {
      console.log("Failed to fetch");
    }
  };

  const setProfile = async (metamaskWalletAddress, username, imgFile) => {
    if (metamaskWalletAddress === "" && username === "" && !imgFile) return;

    const formData = new FormData();
    formData.append("metamaskWalletAddress", metamaskWalletAddress);
    formData.append("username", username);
    formData.append("image", imgFile);

    const apiUrl = `http://localhost:5000/api/users/`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User created:", data);
        getProfile(currentAccount);
      } else {
        console.error("Error creating user:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      setOpenError(true);
      setError("Error setting profile. Try again later.");
    }
  };

  return (
    <NFTMarketplaceContext.Provider
      value={{
        balance,
        mainNft,
        setMainNFt,
        userProfileData,
        setUserProfileData,
        isMetamaskConnected,
        checkMetamaskConnection,
        connectWallet,
        uploadToIPFS,
        createNFT,
        fetchNftWithId,
        fetchNFTs,
        fetchMyNFTsOrListedNFTs,
        buyNFT,
        createSale,
        currentAccount,
        openError,
        setOpenError,
        error,
        setError,
        isLoading,
        setIsLoading,
        getProfile,
        setProfile,
      }}
    >
      {children}
    </NFTMarketplaceContext.Provider>
  );
}

export default NFTMarketplaceProvider;
export { NFTMarketplaceContext };
