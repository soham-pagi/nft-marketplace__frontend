import "../styles/globals.css";
import Footer from './Footer/Footer';
import NavBar from "./NavBar/NavBar";
import HeroSection from "./HeroSection/HeroSection";
import Collection from './Collection/Collection'
import BigNFTSilder from './BigNFTSilder/BigNFTSilder'
import Category from './Category/Category'



const App = () => {
    return (
        <>
        <NavBar/>
        <HeroSection/>
        <BigNFTSilder/>
        <Collection/>
        <Category/>
        <Footer/>
        </>
    );
}


// const App = ({ Component, pageProps }) => (
//     <div>
//       {/* <NFTMarketplaceProvider> */}
//         <NavBar />
//         <Component {...pageProps} />
//         <Footer />
//       {/* </NFTMarketplaceProvider> */}
//     </div>
//   );

export default App;