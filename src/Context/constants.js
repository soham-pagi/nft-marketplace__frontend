///0x5FbDB2315678afecb367f032d93F642f64180aa3
//0x5FbDB2315678afecb367f032d93F642f64180aa3

import transferFunds from "./TransferFunds.json";

import NFTMarketplace from "../abis/NFTMarketplace.json";

//NFT MARKETPLACE
// const NFTMarketplaceAddress = "0x5A1699f8c4a717378a8b613d03F478DcFFE73b62";
const NFTMarketplaceAddress = NFTMarketplace.networks[5777].address;
const NFTMarketplaceABI = NFTMarketplace.abi;

//TRANSFER FUNDS
const transferFundsAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const transferFundsABI = transferFunds.abi;

export {
  NFTMarketplaceAddress,
  NFTMarketplaceABI,
  transferFundsAddress,
  transferFundsABI,
};
