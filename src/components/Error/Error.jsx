import React, { useState, useEffect, useContext } from "react";
// import Image from "next/image";

//INTERNAL IMPORT
import Style from "./Error.module.css";
import images from "../../img";

//SMAFRT CONTRCAT IMPORT CONTEXT
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

const Error = () => {
  const { error, setOpenError } = useContext(NFTMarketplaceContext);

  return (
    <div className={Style.Error} onClick={() => setOpenError(false)}>
      <div className={Style.Error_box}>
        <div className={Style.Error_box_info}>
          <img
            alt="error"
            src={images.dinoRefresh}
            width={150}
            height={150}
            style={{ objectFit: "cover" }}
          />
          <p>{error}</p>
        </div>
      </div>
    </div>
  );
};

export default Error;
