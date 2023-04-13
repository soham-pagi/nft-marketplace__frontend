import React from "react";

//INTERNAL IMPORT
import Style from "../styles/collection.module.css";
import images from "../img";
// import {
//   Banner,
//   CollectionProfile,
//   NFTCardTwo,
// } from "../components/collectionPage";

import { Banner } from "../components/collectionPage/collectionIndex";
import CollectionProfile from "../components/collectionPage/collectionProfile/collectionProfile";
// import NFTCardTwo from "../components/collectionPage/collectionIndex";
import NFTCardTwo from "../components/collectionPage/NFTCardTwo/NFTCardTwo";

import { Slider, Brand } from "../components/componentsindex";
import Filter from "../components/Filter/Filter";

const collection = () => {
  const collectionArray = [
    {
      image: images.nft_image_1,
    },
    {
      image: images.nft_image_2,
    },
    {
      image: images.nft_image_3,
    }
  ];

  // repeating the collectionArray for testing
  const repeatedArr = Array.from({ length: 10 }, () => collectionArray).flat();
  
  return (
    <div className={Style.collection}>
      <Banner bannerImage={images.creatorbackground1} />
      <CollectionProfile />
      <Filter />
      <NFTCardTwo NFTData={repeatedArr} />
      {/* <Slider /> */}
      <Brand />
    </div>
  );
};

export default collection;
