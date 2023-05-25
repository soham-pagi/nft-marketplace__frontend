import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import AboutUs from "./pages/aboutus";
import CollectionPage from "./pages/collection";
import SearchPage from "./pages/searchPage";
import Author from "./pages/author";
import Account from "./pages/account";
import ContactUs from "./pages/contactus";
import Login from "./pages/login";
import SignUp from "./pages/signUp";
import UploadNFTPage from "./pages/uploadNFTPage";
import Blog from "./pages/blog";
import NFTDetails from "./pages/NFT-details";
import ReSellToken from "./pages/reSellToken";

import { Footer, NavBar } from "./components/componentsindex";
import { Error } from "./components/componentsindex";

import NFTMarketplaceProvider from "./Context/NFTMarketplaceContext";

const RoutesFile = () => {
  return (
    <NFTMarketplaceProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/searchpage" element={<SearchPage />} />
          <Route path="/author" element={<Author />} />
          <Route path="/account" element={<Account />} />
          {/* <Route path='/connectWallet' element={<ConnectWallet />}/> */}
          <Route path="/nft-details" element={<NFTDetails />} />
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/uploadNFT" element={<UploadNFTPage />} />
          <Route path="/reSellToken" element={<ReSellToken />} />
          <Route path="/test" element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </NFTMarketplaceProvider>
  );
};

export default RoutesFile;
