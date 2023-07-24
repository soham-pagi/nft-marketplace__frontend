import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import AboutUs from "./pages/about";
import CollectionPage from "./pages/collection";
import SearchPage from "./pages/searchPage";
import Profile from "./pages/profile";
import ContactUs from "./pages/contact";
import Login from "./pages/login";
import SignUp from "./pages/signUp";
import UploadNFTPage from "./pages/uploadNFTPage";
import Blog from "./pages/blog";
import NFTDetails from "./pages/NFT-details";
import ReSellToken from "./pages/reSellToken";
import SubscriptionPage from "./pages/subscriptionPage";
import PageNotFound from "./pages/PageNotFound";
import { Footer, NavBar } from "./components/componentsindex";

import NFTMarketplaceProvider from "./Context/NFTMarketplaceContext";
import Account from "./pages/account";

const RoutesFile = () => {
  return (
    <NFTMarketplaceProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/searchpage" element={<SearchPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/nft-details" element={<NFTDetails />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/uploadNFT" element={<UploadNFTPage />} />
          <Route path="/reSellToken" element={<ReSellToken />} />
          <Route path="/account" element={<Account />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </Router>
    </NFTMarketplaceProvider>
  );
};

export default RoutesFile;
