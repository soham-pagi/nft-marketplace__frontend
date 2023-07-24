import React from "react";
import { Link } from "react-router-dom";

//INTERNAL IMPORT
import Style from "./Discover.module.css";

const Discover = ({setDiscover}) => {
  const discover = [
    {
      name: "Collection",
      link: "collection",
    },
    {
      name: "NFT Generator",
      link: "generator",
    },
    {
      name: "Upload NFT",
      link: "uploadNFT",
    },
    {
      name: "Subscription",
      link: "subscription",
    },
  ];

  return (
    <div>
      {discover.map((el, i) => (
        <div key={i} className={Style.discover}>
          <Link onClick={() => {
            setDiscover(false);
          }} to={el.link}>{el.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default Discover;
