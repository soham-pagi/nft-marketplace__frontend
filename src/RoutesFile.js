import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import AboutUs from "./pages/about";
import CollectionPage from "./pages/collection";
import SearchPage from "./pages/searchPage";
import ContactUs from "./pages/contact";
import UploadNFTPage from "./pages/uploadNFTPage";
import Blog from "./pages/blog";
import NFTDetails from "./pages/NFT-details";
import ReSellToken from "./pages/reSellToken";
import SubscriptionPage from "./pages/subscriptionPage";
import PageNotFound from "./pages/PageNotFound";
import Generator from "./pages/generator";
import { Footer, NavBar } from "./components/componentsindex";
import MyItems from "./pages/myitems";
import Profile from "./pages/profile";

import NFTMarketplaceProvider from "./Context/NFTMarketplaceContext";

const RoutesFile = () => {
  return (
    <NFTMarketplaceProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/generator" element={<Generator />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/searchpage" element={<SearchPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/nft-details" element={<NFTDetails />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/uploadNFT" element={<UploadNFTPage />} />
          <Route path="/reSellToken" element={<ReSellToken />} />
          <Route path="/my-items" element={<MyItems />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </Router>
    </NFTMarketplaceProvider>
  );
};

export default RoutesFile;
