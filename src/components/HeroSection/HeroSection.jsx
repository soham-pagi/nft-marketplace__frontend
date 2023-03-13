import React, { useState, useEffect, useContext } from "react";
// import { useRouter } from "next/router";

//INTERNAL IMPORT
import Style from "./HeroSection.module.css";
import images from "../../img";
// import { Button } from "../componentsindex";

//SMART CONTRACT IMPORT
// import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

const HeroSection = () => {
  // const { titleData } = useContext(NFTMarketplaceContext);
  // const router = useRouter();

  return (
    <div className={Style.heroSection}>
      <div className={Style.heroSection_box}>
        <div className={Style.heroSection_box_left}>
          {/* <h1>{titleData} 🖼️</h1> */}
          <h1>Discover Collect and Sell</h1>
          <p>
            Discover the most outstanding NTFs in all topics of life. Creative
            your NTFs and sell them
          </p>
          {/* <Button
            btnName="Start your search"
            handleClick={() => router.push("/searchPage")}
          /> */}
        </div>
        <div className={Style.heroSection_box_right}>
          <img
            src={images.hero}
            alt="Hero section"
            width={600}
            height={600}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
