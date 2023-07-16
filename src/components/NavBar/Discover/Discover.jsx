import React from "react";
import { Link } from "react-router-dom";

//INTERNAL IMPORT
import Style from "./Discover.module.css";

const Discover = () => {
  const discover = [
    {
      name: "Collection",
      link: "collection",
    },
    {
      name: "Upload NFT",
      link: "uploadNFT",
    },
    {
      name: "Subscription",
      link: "subscription",
    },
    {
      name: "Blog",
      link: "blog",
    },
  ];

  return (
    <div>
      {discover.map((el, i) => (
        <div key={i} className={Style.discover}>
          <Link to={el.link}>{el.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default Discover;
