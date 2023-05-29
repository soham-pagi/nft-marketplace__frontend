import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import queryString from "query-string";

//INTERNAL IMPORT
import Style from "../styles/reSellToken.module.css";
import formStyle from "../components/AccountPage/Form/Form.module.css";
import { Button } from "../components/componentsindex";

//IMPORT SMART CONTRACT
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const ReSellToken = () => {
  const { createSale } = useContext(NFTMarketplaceContext);

  const location = useLocation();
  const navigate = useNavigate();

  const [nft, setNft] = useState({
    tokenURI: "",
    id: "",
    price: "",
  });
  const [newPrice, setPrice] = useState();

  useEffect(() => {
    const parsedQuery = queryString.parse(location.search);
    console.log(parsedQuery);
    setNft(parsedQuery);
  }, []);

  const resell = async () => {
    try {
      const { tokenURI, price, id, name, description } = nft;
      await createSale(tokenURI, newPrice, name, description, true, id);
      navigate("/author");
    } catch (error) {
      console.log("Error while resell", error);
    }
  };

  return (
    <div className={Style.reSellToken}>
      <div className={Style.reSellToken_box}>
        <h1>ReSell Your Token, Set Price</h1>
        <div className={formStyle.Form_box_input}>
          <label htmlFor="name">Price</label>
          <input
            type="number"
            min={1}
            placeholder="New price"
            className={formStyle.Form_box_input_userName}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className={Style.reSellToken_box_image}>
          <img src={nft.tokenURI} alt="resell nft" width={400} height={400} />
        </div>

        <div className={Style.reSellToken_box_btn}>
          <Button btnName="Resell NFT" handleClick={() => resell()} />
        </div>
      </div>
    </div>
  );
};

export default ReSellToken;
