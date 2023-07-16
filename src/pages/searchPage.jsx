import React, { useEffect, useState, useContext } from "react";

//INTRNAL IMPORT
import Style from "../styles/searchPage.module.css";
import Slider from "../components/Slider/Slider";
import Brand from "../components/Brand/Brand";
import Loader from "../components/Loader/Loader";
import SearchBar from "../components/SearchPage/SearchBar/SearchBar";
import { Filter } from "../components/componentsindex";

import {
  NFTCardTwo,
  Banner,
} from "../components/collectionPage/collectionIndex";
import images from "../img";

//SMART CONTRACT IMPORT
// import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";
import {
  mainNft,
  setMainNft,
  NFTMarketplaceContext,
} from "../Context/NFTMarketplaceContext";

const SearchPage = () => {
  const { mainNft, setMainNft, fetchNFTs, setError } = useContext(
    NFTMarketplaceContext
  );
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);

  function check() {}

  useEffect(() => {
    try {
      fetchNFTs().then((items) => {
        setMainNft(items);
        setNftsCopy(items);
        console.log(items);
      });
    } catch (error) {
      setError("Please reload the browser");
    }
  }, []);

  const onHandleSearch = (value) => {
    const filteredNFTS = nfts.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredNFTS.length === 0) {
      setNfts(nftsCopy);
    } else {
      setNfts(filteredNFTS);
    }
  };

  const onClearSearch = () => {
    if (nfts.length && nftsCopy.length) {
      setNfts(nftsCopy);
    }
  };

  return (
    <div className={Style.searchPage}>
      <Banner bannerImage={images.creatorbackground2} />
      <SearchBar
        onHandleSearch={onHandleSearch}
        onClearSearch={onClearSearch}
      />
      <Filter />
      <button onClick={check}>Click</button>
      {nftsCopy.length === 0 ? <Loader /> : <NFTCardTwo fetchType="all" />}
      {/* <Slider /> */}
      <Brand />
    </div>
  );
};

export default SearchPage;
