import React, { useState } from "react";

//INTERNAL IMPORT
import Style from "../styles/author.module.css";
import { Banner } from "../components/collectionPage/collectionIndex";
import { Brand } from "../components/componentsindex";
import images from "../img";

import {
  AuthorTaps,
  AuthorNFTCardBox,
} from "../components/authorPage/componentIndex";

const MyItems = () => {
  window.scrollTo(0, 0);
  const [collectiables, setCollectiables] = useState(true);
  const [created, setCreated] = useState(false);

  return (
    <div className={Style.author}>
      <Banner bannerImage={images.creatorbackground2} />
      <AuthorTaps setCollectiables={setCollectiables} setCreated={setCreated} />
      <AuthorNFTCardBox collectiables={collectiables} created={created} />
      <Brand />
    </div>
  );
};

export default MyItems;
