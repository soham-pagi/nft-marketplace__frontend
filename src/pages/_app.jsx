import "../styles/globals.css";

//INTRNAL IMPORT
import { NavBar, Footer } from "../components/componentsindex";

const MyApp = ({ children }) => {
  return (
    <div>
      <NavBar />
      <main style={{marginTop: 94}}>
        {children}
      </main>
      <Footer />  
    </div>
  );
}

export default MyApp;
