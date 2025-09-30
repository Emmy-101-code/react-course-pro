import axios from 'axios';
import { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { formatMoney } from '../../utils/money';
import './TrackingPage.css';

export function TrackingPage({ cart, loadCart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => { 
    axios.get('axios.get(`https://react-course-ecommerce-backend-1.onrender.com/api/orders/track/${orderId}`)
')
      .then((response) => {
        setOrders(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <title>Tracking</title>
      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <a className="back-to-orders-link link-primary" href="/orders">
            View all orders
          </a>

          <div className="delivery-date">
            Arriving on Monday, June 13
          </div>

          <div className="product-info">
            Black and Gray Athletic Cotton Socks - 6 Pairs
          </div>

          <div className="product-info">
            Quantity: 1
          </div>

          <div className="product-info">
            Price: {formatMoney(1999)}
          </div>

          <img
            className="product-image"
            src="images/products/athletic-cotton-socks-6-pairs.jpg"
            alt="Product"
          />

          <div className="progress-labels-container">
            <div className="progress-label">Preparing</div>
            <div className="progress-label current-status">Shipped</div>
            <div className="progress-label">Delivered</div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar"></div>
          </div>
        </div>
      </div>
    </>
  );
}
