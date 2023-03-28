import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import AboutUs from './pages/aboutus';
import Collection from './pages/collection';
import SearchPage from './pages/searchPage';
import Author from './pages/author';
import Account from './pages/account';

const RoutesFile = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/collection' element={<Collection />}/>
                <Route path='/aboutus' element={<AboutUs />}/>
                <Route path='/searchpage' element={<SearchPage />}/>
                <Route path='/author' element={<Author />}/>
                <Route path='/account' element={<Account />}/>
                <Route path='/index' element={<Home />}/>
                <Route path="/home" element={<Home/>} />
                <Route path="/" element={<Home/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesFile;