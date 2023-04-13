import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import Style from "../styles/index.module.css";
import {
  HeroSection,
  Service,
  BigNFTSilder,
  Subscribe,
  Title,
  Category,
  Filter,
  NFTCard,
  Collection,
  AudioLive,
  FollowerTab,
  Slider,
  Brand,
  Video,
  Loader,
} from "../components/componentsindex";
 
import { getTopCreators } from "../components/TopCreators/TopCreators";

//IMPORTING CONTRCT DATA
// import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const Home = () => {
  // const { checkIfWalletConnected } = useContext(NFTMarketplaceContext);
  // const { checkIfWalletConnected } = useContext([]);
  
  // useEffect(() => {
  //   checkIfWalletConnected();
  // }, []);

  // const { fetchNFTs } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([{image: "nft_image_1"}]);
  const [nftsCopy, setNftsCopy] = useState([]);

  // useEffect(() => {
  //   fetchNFTs().then((items) => {
  //     setNfts(items.reverse());
  //     setNftsCopy(items);
  //   });
  // }, []);

  //CREATOR LIST
  const creators = getTopCreators(nfts);
  console.log(creators);

  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Service />
      <BigNFTSilder />
      <Title
        heading="Image Collection"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />

      {/* <AudioLive /> */}

      {creators.length == 0 ? (
        // <Loader />
        <h1></h1> // Loader
      ) : (
        <FollowerTab TopCreator={creators} />
      )}

      {/* <Slider /> */}
      <Collection />

      <Title
        heading="Featured NFTs"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      <Filter />
      {nfts.length == 0 ? <Loader /> : <NFTCard NFTData={nfts} />}

      <Title
        heading="Browse by category"
        paragraph="Explore the NFTs in the most featured categories."
      />
      <Category />
      <Subscribe />
      <Brand />
    </div>
  );
};

export default Home;
