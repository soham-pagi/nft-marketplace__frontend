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
import UploadNFT from "./components/UploadNFT/UploadNFT";
import { Footer, NavBar } from "./components/componentsindex";

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
          {/* <Route path="/index" element={<Home />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/UploadNFT-one" element={<UploadNFTPage />} />
          <Route path="/test" element={<UploadNFT />} />
        </Routes>
        <Footer />
      </Router>
    </NFTMarketplaceProvider>
  );
};

export default RoutesFile;
