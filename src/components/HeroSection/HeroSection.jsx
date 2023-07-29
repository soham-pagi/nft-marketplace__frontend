import React from "react";
import { useNavigate } from "react-router-dom";

//INTERNAL IMPORT
import Style from "./HeroSection.module.css";
import images from "../../img";
import Button from "../Button/Button";


const HeroSection = () => {
  window.scrollTo(0, 0);
  const navigate = useNavigate();

  return (
    <div className={Style.heroSection}>
      <div className={Style.heroSection_box}>
        <div className={Style.heroSection_box_left}>
          <h1>Discover, Collect and Sell</h1>
          <p>
            Discover the most outstanding NTFs in all topics of life. Creative
            your NTFs and sell them
          </p>
          <Button
            btnName="Start Your Search"
            handleClick={() => navigate("/searchPage")}
          />
        </div>
        <div className={Style.heroSection_box_right}>
          <img src={images.hero} alt="Hero section" width={600} height={600} />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
