import React, { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";

//INTERNAL  IMPORT
import { NFTMarketplaceAddress, NFTMarketplaceABI } from "./constants";
import images from "../img/index";

// Create context
const NFTMarketplaceContext = createContext();

// COMPONENT STARTS HERE
function NFTMarketplaceProvider({ children }) {
  const [mainNft, setMainNft] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMetamaskConnected, setIsMetamaskConnected] = useState(false);
  const [userProfileData, setUserProfileData] = useState({
    username: "Guest",
    imgUrl: images.randomGuy,
  });

  /// wallet state
  const [currentAccount, setCurrentAccount] = useState("");
  const [balance, setBalance] = useState(0.0);

  //------USESTATE
  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);

  const checkExtension = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", async function() {
        connectWallet();
      });
    }
  }

  const checkMetamaskConnection = async () => {
    const acc = localStorage.getItem("currentAccount");
    if (acc) {
      console.log({acc})
      setCurrentAccount(acc);
      setIsMetamaskConnected(true);
    }
  };

  async function connectWallet() {
    try {
      if (!window.ethereum) {
        return (
          setOpenError(true), setError("Please install Metamask to continue...")
        );
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const acc = await signer.getAddress();
      const unformattedPrice = await signer.getBalance();
      const bal = ethers.utils.formatUnits(
        unformattedPrice.toString(),
        "ether"
      );

      setIsMetamaskConnected(true);
      setCurrentAccount(acc);
      setBalance(bal);
      localStorage.setItem("currentAccount", acc);
    } catch (error) {
      setError("Something wrong while connecting to wallet");
      setOpenError(true);
    }
  }

  const getBalance = async () => {
    if (!window.ethereum) {
      return (
        setOpenError(true), setError("Please install Metamask to continue...")
      );
    }
    
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const unformattedPrice = await signer.getBalance();
    const bal = ethers.utils.formatUnits(
      unformattedPrice.toString(),
      "ether"
    );

    setBalance(bal);
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
    try {
      const formData = new FormData();
      formData.append("file", image);

      const resFile = await axios({
        method: "post",
        // url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        url: `${process.env.REACT_APP_IPFS_URL}`,
        maxBodyLength: "Infinity",
        data: formData,
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          pinata_api_key: `${process.env.REACT_APP_API_KEY}`,
          pinata_secret_api_key: `${process.env.REACT_APP_API_SECRET}`,
          Accept: "text/plain",
        },
      });

      const imageLink = `${process.env.REACT_APP_API_PREFIX}${resFile.data.IpfsHash}`;
      console.log(imageLink);
      return imageLink;
    } catch (error) {
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
      return true;
    } catch (error) {
      setError("Error while creating NFT");
      setOpenError(true);
      return false;
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
      const price = ethers.utils.parseUnits(formInputPrice, "ether");

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

      return item;
    } catch (error) {
      console.log(error);
      setError("Error while fetching NFT");
      setOpenError(true);
    }
  };

  //--FETCHNFTS FUNCTION
  const fetchNFTs = async () => {
    setIsLoading(true);

    try {
      const provider = new ethers.providers.JsonRpcProvider(
        // "http://127.0.0.1:7545"
        "https://polygon-mumbai.g.alchemy.com/v2/m3ZhghonD5KpQKNavSsYtwug5Glsyve2"
      );
      const contract = fetchContract(provider);
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
      console.log(error)
      setOpenError(true);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  //--FETCHING MY NFT OR LISTED NFTs
  const fetchMyNFTsOrListedNFTs = async (type) => {
    setIsLoading(true);

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
      console.log(items);
      return items;
    } catch (error) {
      console.log(error);
      setError("Error while fetching listed NFTs");
      setOpenError(true);
      return [];
    } finally {
      setIsLoading(false);
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

  const getProfile = async (metamaskWalletAddress) => {
    if (metamaskWalletAddress === "") {
      metamaskWalletAddress = "12345";
    }

    const apiUrl = `${process.env.REACT_APP_GET_USER_PROFILE}${metamaskWalletAddress}`;
    const response = await fetch(apiUrl);
    const userPhotoExtensionType = "image/jpeg";

    try {
      if (response.ok) {
        const jsonData = await response.json();
        console.log({ jsonData })

        const imageData = new Uint8Array(jsonData.image.data.data);
        const base64Data = btoa(String.fromCharCode.apply(null, imageData));
        const imgUrl = `data:${userPhotoExtensionType};base64, ${base64Data}`;

        return { username: jsonData.username, imgUrl };
        setUserProfileData({ username: jsonData.username, imgUrl });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const setProfile = async (metamaskWalletAddress, username, imgFile) => {
    if (metamaskWalletAddress === "" && username === "" && !imgFile) return;

    console.log({ metamaskWalletAddress, username, imgFile})

    const formData = new FormData();
    formData.append("metamaskWalletAddress", metamaskWalletAddress);
    formData.append("username", username);
    formData.append("image", imgFile);

    const apiUrl = `${process.env.REACT_APP_SET_USER_PROFILE}`;

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
        setOpenError(true);
        setError("An error occured");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      setOpenError(true);
      setError("Error setting profile. Try again later.");
    }
  };

  useEffect(() => {
    checkExtension();
    checkMetamaskConnection();
  }, []);

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <NFTMarketplaceContext.Provider
      value={{
        balance,
        mainNft,
        setMainNft,
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
        setUserProfileData,
        getProfile,
        setProfile,
        getBalance,
      }}
    >
      {children}
    </NFTMarketplaceContext.Provider>
  );
}

export default NFTMarketplaceProvider;
export { NFTMarketplaceContext };
