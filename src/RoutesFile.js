import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import AboutUs from './pages/aboutus';
import Collection from './pages/collection';
import SearchPage from './pages/searchPage';
import Author from './pages/author';
import Account from './pages/account';
<<<<<<< HEAD
import Home from './pages';
import Blog from './pages/blog'
=======
import SignUp from './pages/signUp';
import Login from './pages/login';
import SubscriptionPage from './pages/subscriptionPage';
import Contactus from './pages/contactus';
import ConnectWallet from './pages/connectWallet';
>>>>>>> f80e01e628427a7ebadf4258989c91b256ffaae4

const RoutesFile = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/collection' element={<Collection />}/>
                <Route path='/aboutus' element={<AboutUs />}/>
                <Route path='/contactus' element={<Contactus />}/>
                <Route path='/searchpage' element={<SearchPage />}/>
                <Route path='/author' element={<Author />}/>
                <Route path='/account' element={<Account />}/>
                <Route path='/connectWallet' element={<ConnectWallet />}/>
                <Route path='/index' element={<Home />}/>
<<<<<<< HEAD
                <Route path="/" element={<HeroSection/>} />
                <Route path='/blog' element={<Blog/>} />
=======
                <Route path='/subscription' element={<SubscriptionPage />}/>
                <Route path='/signup' element={<SignUp />}/>
                <Route path='/login' element={<Login />}/>
                <Route path="/home" element={<Home/>} />
                <Route path="/" element={<Home/>} />
>>>>>>> f80e01e628427a7ebadf4258989c91b256ffaae4
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesFile;