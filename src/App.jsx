import axios from 'axios';
import { Routes, Route } from 'react-router';
import { useState,useEffect } from 'react';
import { HomePage } from './pages/home/HomePage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { OrdersPage } from './pages/orders/OrdersPage';
import { TrackingPage } from './pages/TrackingPage';
import './App.css'


function App() {
const [cart, setCart] = useState([]);


          const loadCart = async () => {
          const response = await axios.get('https://react-course-ecommerce-backend-1.onrender.com/api/cart-items?expand=product');
          setCart(response.data);

          };


       useEffect(() => {
         loadCart ();
        } ,[]);

  return (
    <Routes>
 <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
       <Route path="/checkout" element={<CheckoutPage cart={cart} loadCart={loadCart} />}  />
       <Route path="orders" element={<OrdersPage cart={cart} loadCart={loadCart} />} /> 
        <Route path="tracking" element={<TrackingPage cart={cart} loadCart={loadCart}/>}/>


    </Routes>
  
  )
}

export default App
