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
  Navigate,
} from "react-router-dom";
import Pay from "./pages/Pay";
import Success from "./pages/Success";
import { useState } from "react";
import { useSelector } from "react-redux";

const App = () => {
  
  const user = useSelector(state=>state.user.currentUser);
 return (
  <div>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products/:category' element={<ProductList/>}/>
        <Route path='/product/:id' element={<Product/>}/>
        <Route path="/cart" element={<Cart/>}/>

  

        <Route path="/login" element={user ? <Navigate to="/"/> : <Login/>}/>
        <Route path="/register" element={user ? <Navigate to="/"/> : <Register/>}/>
        <Route path="/pay" element={<Pay/>}/>
        <Route path="/success" element={<Success/>}/>
      </Routes>
    </Router>
  </div>
)};

export default App;