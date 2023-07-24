import React, { useContext, useEffect, useState } from "react";
import { BsImage } from "react-icons/bs";
import { Link } from "react-router-dom";

//INTERNAL IMPORT
import Style from "./NFTCardTwo.module.css";

import { NFTMarketplaceContext } from "../../../Context/NFTMarketplaceContext";

const NFTCardTwo = ({ fetchType }) => {
  const { fetchNFTs, fetchMyNFTsOrListedNFTs } = useContext(
    NFTMarketplaceContext
  );

  const [nftData, setNftData] = useState([]);

  useEffect(() => {
    if (fetchType === "all") {
      fetchNFTs().then((data) => {
        setNftData(data);
      });
    } else if (fetchType === "listed") {
      fetchMyNFTsOrListedNFTs("fetchItemsListed").then((data) =>
        setNftData(data)
      );
    } else {
      fetchMyNFTsOrListedNFTs("myNFTs").then((data) => setNftData(data));
    }
  }, []);

  return (
    <div className={Style.NFTCardTwo}>
      {nftData.length === 0 && fetchType === "listed" && (
        <h1>You don't have any nft listed</h1>
      )}
      
      {nftData.length === 0 && fetchType === "myNFTs" && (
        <h1>You don't own any NFTs</h1>
      )}

      {nftData &&
        nftData.map((nft, i) => (
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
