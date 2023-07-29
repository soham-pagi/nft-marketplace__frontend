import React, { useContext } from "react";

//INTERNAL IMPORT
import Style from "../styles/collection.module.css";
import images from "../img";
import { Banner } from "../components/collectionPage/collectionIndex";
import NFTCardTwo from "../components/collectionPage/NFTCardTwo/NFTCardTwo";

import { Brand } from "../components/componentsindex";
import Filter from "../components/Filter/Filter";


const CollectionPage = () => {
  window.scrollTo(0, 0);

  return (
    <div className={Style.collection}>
      <Banner bannerImage={images.creatorbackground1} />
      <Filter />
      <NFTCardTwo fetchType={"all"} />
      <Brand />
    </div>
  );
};

export default CollectionPage;
