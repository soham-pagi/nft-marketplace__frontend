import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import Style from "../styles/connectWallet.module.css";
import images from "../img";

//IMPORT FROM SMART CONTRACT
// import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const ConnectWallet = () => {
  const [activeBtn, setActiveBtn] = useState(1);
  // const { currentAccount, connectWallet } = useContext(NFTMarketplaceContext);

  const connectWallet = () => {
    alert('Clicked Connect Wallet');
  }

  const providerArray = [
    {
      provider: images.provider1,
      name: "Metamask",
    },
    {
      provider: images.provider2,
      name: "walletConnect",
    },
    {
      provider: images.provider3,
      name: "walletlink",
    },
  ];

  return (
    <div className={Style.connectWallet} style={{marginTop: 94}}>
      <div className={Style.connectWallet_box}>
        <h1>Connect your wallet</h1>
        <p className={Style.connectWallet_box_para}>
          Connect with one of our avaliabl wallet providers or create a new one
        </p>

        <div className={Style.connectWallet_box_provider}>
          {providerArray.map((el, i) => (
            <div
              className={`${Style.connectWallet_box_provider_item} ${
                activeBtn == i + 1 ? Style.active : ""
              }`}
              key={i + 1}
              onClick={() => (setActiveBtn(i + 1), connectWallet())}
            >
              <img
                src={el.provider}
                alt={el.provider}
                width={50}
                height={50}
                className={Style.connectWallet_box_provider_item_img}
              />
              <p>{el.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;
