import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

//INTERNAL IMPORT
import { Brand } from "../components/componentsindex";
import NFTDetailsPage from "../components/NFTDetailsPage/NFTDetailsPage";

const NFTDetails = () => {

  const location = useLocation();

  // useEffect(() => {
  //   const parsedQuery = queryString.parse(location.search);
  // }, []);

  return (
    <div style={{ paddingTop: 20}}>
      <NFTDetailsPage id={queryString.parse(location.search).tokenId || 1} />
      <Brand />
    </div>
  );
};

export default NFTDetails;
