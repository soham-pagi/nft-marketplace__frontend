import React, { useContext } from "react";

//INTERNAL IMPORT
import Style from "../styles/collection.module.css";
import images from "../img";
import { Banner } from "../components/collectionPage/collectionIndex";
import CollectionProfile from "../components/collectionPage/collectionProfile/collectionProfile";
import NFTCardTwo from "../components/collectionPage/NFTCardTwo/NFTCardTwo";

import { Brand } from "../components/componentsindex";
import Filter from "../components/Filter/Filter";

import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const CollectionPage = () => {
  window.scrollTo(0, 0);

  const { fetchNFTs } = useContext(NFTMarketplaceContext);

  return (
    <div className={Style.collection}>
      <Banner bannerImage={images.creatorbackground1} />
      <CollectionProfile />
      <Filter />
      <hr className={Style.ruler} />
      <NFTCardTwo fetchType={"all"} />
      <Brand />
    </div>
  );
};

export default CollectionPage;
