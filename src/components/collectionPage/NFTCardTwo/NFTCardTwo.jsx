import React, { useContext, useEffect, useState } from "react";
import { BsImage } from "react-icons/bs";
import { Link } from "react-router-dom";

//INTERNAL IMPORT
import Style from "./NFTCardTwo.module.css";

import { NFTMarketplaceContext } from "../../../Context/NFTMarketplaceContext";

const NFTCardTwo = ({ fetchType, nfts }) => {
  const { mainNft, setMainNft, fetchNFTs, fetchMyNFTsOrListedNFTs } = useContext(
    NFTMarketplaceContext
  );

  // useEffect(() => {
  //   setMainNft(nfts);
  // }, [nfts])

  useEffect(() => {
    if (nfts) {
      setMainNft(nfts);
    }
    else if (fetchType === "all") {
      fetchNFTs().then((data) => {
        setMainNft(data);
        console.log("here")
      });
    } else if (fetchType === "listed") {
      fetchMyNFTsOrListedNFTs("fetchItemsListed").then((data) =>
      setMainNft(data)
      );
      console.log("listed")
    } else {
      fetchMyNFTsOrListedNFTs("myNFTs").then((data) => setMainNft(data));
      console.log("my")
    }
  }, [nfts]);

  return (
    <div className={Style.NFTCardTwo}>
      {mainNft.length === 0 && fetchType === "listed" && (
        <h1>You don't have any nft listed</h1>
      )}
      
      {mainNft.length === 0 && fetchType === "myNFTs" && (
        <h1>You don't own any NFTs</h1>
      )}

      {mainNft &&
        mainNft.map((nft, i) => (
          <Link to={`/nft-details?tokenId=${nft.tokenId}`} key={i}>
            <div className={Style.NFTCardTwo_box} key={i}>
              <div className={Style.NFTCardTwo_box_like}>
                <div className={Style.NFTCardTwo_box_like_box}>
                  <div className={Style.NFTCardTwo_box_like_box_box}>
                    <BsImage
                      className={Style.NFTCardTwo_box_like_box_box_icon}
                    />
                  </div>
                </div>
              </div>

              <div className={Style.NFTCardTwo_box_img}>
                <img
                  src={nft.tokenURI}
                  alt="NFT"
                  width={405}
                  height={400}
                  className={Style.NFTCardTwo_box_img_img}
                />
              </div>

              <div className={Style.NFTCardTwo_box_info}>
                <div className={Style.NFTCardTwo_box_info_left}>
                  <p>{nft.name}</p>
                </div>
              </div>

              <div className={Style.NFTCardTwo_box_price}>
                <div className={Style.NFTCardTwo_box_price_box}>
                  <small>Current Price</small>
                  <p>{nft.price || i + 4} ETH</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default NFTCardTwo;
