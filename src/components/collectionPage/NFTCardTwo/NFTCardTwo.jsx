import React, { useContext, useEffect, useState } from "react";
import { BsImage } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdVerified, MdTimer } from "react-icons/md";
import { Link } from "react-router-dom";

//INTERNAL IMPORT
import Style from "./NFTCardTwo.module.css";
import { LikeProfile } from "../../componentsindex";

import { NFTMarketplaceContext } from "../../../Context/NFTMarketplaceContext";

const NFTCardTwo = ({ fetchType }) => {
  const { fetchNFTs, fetchMyNFTsOrListedNFTs } = useContext(
    NFTMarketplaceContext
  );

  const [like, setLike] = useState(false);
  const [likeInc, setLikeInc] = useState(21);
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

  const likeNFT = () => {
    if (!like) {
      setLike(true);
      setLikeInc(23);
    } else {
      setLike(false);
      setLikeInc(23 + 1);
    }
  };

  return (
    <div className={Style.NFTCardTwo}>
      {nftData.map((nft, i) => (
        <Link to={`/nft-details?tokenId=${nft.tokenId}`} key={i}>
          <div className={Style.NFTCardTwo_box} key={i}>
            <div className={Style.NFTCardTwo_box_like}>
              <div className={Style.NFTCardTwo_box_like_box}>
                <div className={Style.NFTCardTwo_box_like_box_box}>
                  <BsImage className={Style.NFTCardTwo_box_like_box_box_icon} />
                  <p onClick={() => likeNFT()}>
                    {like ? <AiOutlineHeart /> : <AiFillHeart />}
                    <span>{likeInc + 1}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className={Style.NFTCardTwo_box_img}>
              <img
                src={nft.tokenURI}
                alt="NFT"
                width={400}
                height={400}
                className={Style.NFTCardTwo_box_img_img}
              />
            </div>

            <div className={Style.NFTCardTwo_box_info}>
              <div className={Style.NFTCardTwo_box_info_left}>
                <LikeProfile />
                <p>{nft.name}</p>
              </div>
              <small>4{i + 2}</small>
            </div>

            <div className={Style.NFTCardTwo_box_price}>
              <div className={Style.NFTCardTwo_box_price_box}>
                <small>Current Bid</small>
                <p>{nft.price || i + 4} ETH</p>
              </div>
              <p className={Style.NFTCardTwo_box_price_stock}>
                <MdTimer /> <span>{i + 1} hours left</span>
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default NFTCardTwo;
