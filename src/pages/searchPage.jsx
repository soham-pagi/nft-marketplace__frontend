import React, { useEffect, useState, useContext } from "react";

//INTRNAL IMPORT
import Style from "../styles/searchPage.module.css";
import Brand from "../components/Brand/Brand";
import SearchBar from "../components/SearchPage/SearchBar/SearchBar";
import { Filter } from "../components/componentsindex";

import {
  NFTCardTwo,
  Banner,
} from "../components/collectionPage/collectionIndex";
import images from "../img";

//SMART CONTRACT IMPORT
import {
  NFTMarketplaceContext,
} from "../Context/NFTMarketplaceContext";

const SearchPage = () => {
  const { mainNft, setMainNft, fetchNFTs } = useContext(
    NFTMarketplaceContext
  );

  const [nfts, setNfts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNft, setFilteredNft] = useState([]);

  useEffect(() => {
    fetchNFTs().then(data => {
      setNfts(data);
      console.log({data});
    });
  }, []);

  const handleSearch = (value) => {
    setSearchQuery(value);
    console.log(value);

    const filteredNft = nfts.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
    setMainNft(filteredNft);
  };

  return (
    <div className={Style.searchPage}>
      {/* <Banner bannerImage={images.creatorbackground2} /> */}
      <SearchBar
        searchQuery={searchQuery}
        handleSearch={handleSearch}
      />
      <Filter />
      <NFTCardTwo fetchType="all" nfts={nfts}/>
      <Brand />
    </div>
  );
};

export default SearchPage;
