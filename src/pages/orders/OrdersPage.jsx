import axios from 'axios';
import dayjs from 'dayjs';
import { useState, useEffect, Fragment } from 'react';
import { Header } from '../../components/Header';
import { formatMoney } from '../../utils/money';
import './OrdersPage.css';


export function  OrdersPage ({ cart, loadCart}) {
const [orders, setOrders] = useState([]);
const [quantity] = useState(1);


    useEffect(() => { 
        axios.get('/api/orders?expand=products')
            .then((response) => {
                setOrders(response.data);

            });
    });

    const addToCart = async (productId) => {
    await axios.post('/api/cart-items', {
        productId,
        quantity
    });
    await loadCart();
};







    return (
        <>
            <title>Orders</title>
            <Header cart={cart} />


            <div className="orders-page">
                <div className="page-title">Your Orders</div>

                <div className="orders-grid">
                    {orders.map((order) => {
                        return (
                                        <div key={order.id} className="order-container">

                                        <div className="order-header">
                                        <div className="order-header-left-section">
                                        <div className="order-date">
                                        <div className="order-header-label">Order Placed:</div>
                                        <div>{dayjs(order.orderTimeMs).format('MMMM D')}</div>
                                        </div>
                                        <div className="order-total">
                                        <div className="order-header-label">Total:</div>
                                        <div>{formatMoney(order.totalCostCents)}</div>
                                        </div>
                                        </div>

                                        <div className="order-header-right-section">
                                        <div className="order-header-label">Order ID:</div>
                                        <div>{order.id}</div>
                                        </div>
                                        </div>

                                        <div className="order-details-grid">
                                        {order.products.map((orderproduct) => {
                                        return (
                                        <Fragment key={orderproduct.product.id}>
                                        <div className="product-image-container">
                                        <img src={orderproduct.product.image} />
                                        </div>

                                        <div className="product-details">
                                        <div className="product-name">
                                       {orderproduct.product.name}
                                        </div>
                                        <div className="product-delivery-date">
                                        Arriving on: {dayjs(orderproduct.
                                            estimatedDeliveryTimes).format('MMMM D')}
                                        </div>
                                        <div className="product-quantity">
                                        Quantity: {orderproduct.quantity}
                                        </div>
                                        <button className="buy-again-button button-primary">
                                        <img className="buy-again-icon" src="images/icons/buy-again.png" />
                                      <span className="buy-again-message"
                                       data-testid="add-to-cart-button"
                                             onClick={() => addToCart(orderproduct.product.id)}>
                                         Add to Cart</span>
                                        </button>
                                        </div>

                                        <div className="product-actions">
                                        <a href="/tracking">
                                        <button className="track-package-button button-secondary">
                                        Track package
                                        </button>
                                        </a>
                                        </div>
                                        </Fragment>
                                        );
                                    })}
                               
                               
                                </div>
                            </div>
                        );
                    })}
                   
            </div>
             </div>


        </>
    );
  }
