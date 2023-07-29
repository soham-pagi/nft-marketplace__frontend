import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

//INTERNAL IMPORT
import { Brand } from "../components/componentsindex";
import NFTDetailsPage from "../components/NFTDetailsPage/NFTDetailsPage";

//IMPORT SMART CONTRACT DATA
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const NFTDetails = () => {
  const { fetchNftWithId } = useContext(NFTMarketplaceContext);

  const location = useLocation();

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
    const parsedQuery = queryString.parse(location.search);
    fetchNftWithId(parsedQuery.tokenId).then((item) => {
      setNft(item[0]);
    });
  }, []);

  return (
    <div style={{ paddingTop: 20}}>
      <NFTDetailsPage nft={nft} />
      <Brand />
    </div>
  );
};

export default NFTDetails;
