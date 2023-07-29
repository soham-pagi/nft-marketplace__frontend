import React, { /*useEffect, useState,*/ useContext } from "react";

//INTERNAL IMPORT
import Style from "../styles/upload-nft.module.css";
import { UploadNFT } from "../components/UploadNFT/uploadNFTIndex";

//SMART CONTRACT IMPORT
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const UploadNFTPage = () => {
  const { createNFT } = useContext(NFTMarketplaceContext);

  return (
    <div className={Style.uploadNFT}>
      <div className={Style.uploadNFT_box_heading}>
        <h1>Create New NFT</h1>
        <p>
          You can set preferred display name, create your profile URL and manage
          other personal settings.
        </p>
      </div>

      <div className={Style.uploadNFT_box_title}>
        <h2>Image</h2>
        <p>File types supported: JPG, PNG, Max size: 10 MB</p>
      </div>
      <UploadNFT createNFT={createNFT} />
    </div>
  );
};

export default UploadNFTPage;
