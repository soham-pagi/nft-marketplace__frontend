import "../styles/globals.css";

//INTRNAL IMPORT
import { NavBar, Footer } from "../components/componentsindex";

const MyApp = ({ children }) => {
  return (
    <div>
      <main style={{ marginTop: 94 }}>{children}</main>
    </div>
  );
};

export default MyApp;
