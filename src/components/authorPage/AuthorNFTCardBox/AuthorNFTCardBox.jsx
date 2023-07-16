import React, { useState } from "react";

//INTERNAL IMPORT
import Style from "./AuthorNFTCardBox.module.css";
import images from "../../../img";
import { NFTCardTwo } from "../../collectionPage/collectionIndex";
import FollowerTabCard from "../../FollowerTab/FollowerTabCard/FollowerTabCard";
// import Loader from "../../Loader/Loader";

const AuthorNFTCardBox = ({
  collectiables,
  created,
  like,
  follower,
  following,
}) => {
  const followerArray = [];
  const followingArray = [];

  return (
    <div className={Style.AuthorNFTCardBox}>
      {collectiables && <NFTCardTwo fetchType={"listed"} />}
      {created && <NFTCardTwo fetchType={"myNFTs"} />}
    </div>
  );
};

export default AuthorNFTCardBox;
