import React, { useEffect, useState, useContext } from "react";

//INTERNAL IMPORT
import { NFTDescription, NFTDetailsImg } from "./NFTDetailsIndex";
import Style from "./NFTDetailsPage.module.css";

import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

const NFTDetailsPage = ({ id }) => {
  const { fetchNftWithId } = useContext(NFTMarketplaceContext);

  useEffect(() => {
    console.log("here", id)
  }, [])

  const [nft, setNft] = useState({
    description: "",
    name: "",
    owner: "",
    price: "",
    seller: "",
    tokenId: "",
    tokenURI: "",
  });

  useEffect(() => {
    console.log({id})
    fetchNftWithId(id).then((item) => {
      setNft(item[0]);
    });
  }, [])

  return (
    <div className={Style.NFTDetailsPage}>
      <div className={Style.NFTDetailsPage_box}>
        <NFTDetailsImg nft={nft} />
        <NFTDescription nft={nft} />
      </div>
    </div>
  );
};

export default NFTDetailsPage;
