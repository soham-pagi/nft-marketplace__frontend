import "../styles/globals.css";

//INTRNAL IMPORT
import { NavBar, Footer } from "../components/componentsindex";
// import { NFTMarketplaceProvider } from "../Context/NFTMarketplaceContext";
// import Footer from '../components/Footer/Footer';
// import NavBar from "../components/NavBar/NavBar";

const MyApp = ({ children }) => {
  return (
    <div>
      <NavBar />
      <main>
        {children}
      </main>
      <Footer />  
    </div>
  );
}

export default MyApp;
