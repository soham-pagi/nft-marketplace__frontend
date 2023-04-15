import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import AboutUs from './pages/aboutus';
import Collection from './pages/collection';
import SearchPage from './pages/searchPage';
import Author from './pages/author';
import Account from './pages/account';
import HeroSection from './components/HeroSection/HeroSection'
// import Home from './pages';
import UploadNFT from './components/UploadNFT/UploadNFT'
import Blog from './pages/blog'

const RoutesFile = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/collection' element={<Collection />}/>
                <Route path='/aboutus' element={<AboutUs />}/>
                {/* <Route path='/contactus' element={<Contactus />}/> */}
                <Route path='/searchpage' element={<SearchPage />}/>
                <Route path='/author' element={<Author />}/>
                <Route path='/account' element={<Account />}/>
                {/* <Route path='/connectWallet' element={<ConnectWallet />}/> */}
                <Route path='/index' element={<Home />}/>
                <Route path="/" element={<HeroSection/>} />
                <Route path='/blog' element={<Blog/>} />
                <Route path='/UploadNFT' element={<UploadNFT/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesFile;