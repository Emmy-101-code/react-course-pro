import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { formatMoney } from "../utils/money";
import "./TrackingPage.css";

export function TrackingPage() {
  const { orderId } = useParams();
  const [tracking, setTracking] = useState(null);

  useEffect(() => {
    const getTrackingData = async () => {
      try {
        const response = await axios.get(
          `https://react-course-ecommerce-backend-1.onrender.com/api/orders/track/${orderId}`
        );
        setTracking(response.data);
      } catch (error) {
        console.error("Error fetching tracking:", error);
      }
    };
    getTrackingData();
  }, [orderId]);

  if (!tracking) return <p>Loading tracking info...</p>;

  return (
    <>
      <title>Tracking</title>
      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            Arriving on {tracking.deliveryDate}
          </div>

          <div className="product-info">{tracking.productName}</div>
          <div className="product-info">Quantity: {tracking.quantity}</div>
          <div className="product-info">
            Price: {formatMoney(tracking.price)}
          </div>

          <img
            className="product-image"
            src={tracking.imageUrl}
            alt={tracking.productName}
          />

          <div className="progress-labels-container">
            <div className={`progress-label ${tracking.status === "Preparing" ? "current-status" : ""}`}>
              Preparing
            </div>
            <div className={`progress-label ${tracking.status === "Shipped" ? "current-status" : ""}`}>
              Shipped
            </div>
            <div className={`progress-label ${tracking.status === "Delivered" ? "current-status" : ""}`}>
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar"></div>
          </div>
        </div>
      </div>
    </>
  );
}
