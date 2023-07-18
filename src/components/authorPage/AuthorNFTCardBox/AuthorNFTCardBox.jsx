import React, { useState } from "react";

//INTERNAL IMPORT
import Style from "./AuthorNFTCardBox.module.css";
import { NFTCardTwo } from "../../collectionPage/collectionIndex";

const AuthorNFTCardBox = ({ collectiables, created }) => {
  return (
    <div className={Style.AuthorNFTCardBox}>
      {collectiables && <NFTCardTwo fetchType={"listed"} />}
      {created && <NFTCardTwo fetchType={"myNFTs"} />}
    </div>
  );
};

export default AuthorNFTCardBox;
