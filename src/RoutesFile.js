import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import AboutUs from "./pages/aboutus";
import Collection from "./pages/collection";
import SearchPage from "./pages/searchPage";
import Author from "./pages/author";
import Account from "./pages/account";
import ContactUs from "./pages/contactus";
import Login from "./pages/login";
import SignUp from "./pages/signUp";
import HeroSection from "./components/HeroSection/HeroSection";
// import Home from './pages';
import UploadNFTPage from "./pages/uploadNFTPage";
import Blog from "./pages/blog";

const RoutesFile = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/collection" element={<Collection />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/contactus" element={<ContactUs />}/>
        <Route path="/searchpage" element={<SearchPage />} />
        <Route path="/author" element={<Author />} />
        <Route path="/account" element={<Account />} />
        {/* <Route path='/connectWallet' element={<ConnectWallet />}/> */}
        {/* <Route path="/index" element={<Home />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/UploadNFT-one" element={<UploadNFTPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesFile;
