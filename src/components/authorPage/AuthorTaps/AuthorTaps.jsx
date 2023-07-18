import React, { useState } from "react";

//INTERNAL IMPORT
import Style from "./AuthorTaps.module.css";

const AuthorTaps = ({ setCollectiables, setCreated }) => {
  const [activeBtn, setActiveBtn] = useState(1);

  const openTab = (e) => {
    const btnText = e.target.innerText;

    if (btnText === "My Listed NFTs") {
      setCollectiables(true);
      setCreated(false);
      setActiveBtn(1);
    } else if (btnText === "Owned NFT") {
      setCollectiables(false);
      setCreated(true);
      setActiveBtn(2);
    }
  };

  return (
    <div className={Style.AuthorTaps}>
      <div className={Style.AuthorTaps_box}>
        <div className={Style.AuthorTaps_box_left}>
          <div className={Style.AuthorTaps_box_left_btn}>
            <button
              className={`${activeBtn === 1 ? Style.active : ""}`}
              onClick={(e) => openTab(e)}
            >
              My Listed NFTs
            </button>
            <button
              className={`${activeBtn === 2 ? Style.active : ""}`}
              onClick={(e) => openTab(e)}
            >
              Owned NFT
            </button>
          </div>
        </div>
      </div>

      <hr className={Style.ruler} />
    </div>
  );
};

export default AuthorTaps;
