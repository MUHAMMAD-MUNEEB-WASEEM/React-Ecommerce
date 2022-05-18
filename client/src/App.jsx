import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Routes,
} from "react-router-dom";
import Pay from "./pages/Pay";
import Success from "./pages/Success";

const App = () => (
  
  <div>
    <Router>
      <Routes>
        <Route path="/pay" element={<Pay/>}/>
        <Route path="/success" element={<Success/>}/>
      </Routes>
    </Router>
  </div>
);

export default App;