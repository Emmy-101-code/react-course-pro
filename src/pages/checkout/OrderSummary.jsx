import axios from 'axios';
import dayjs from 'dayjs';
import { useState } from 'react';
import { formatMoney } from '../../utils/money';
import { DeliveryOption } from './DeliveryOptions';

export function OrderSummary({ cart, deliveryOptions, loadCart }) {
  const [editingItemId, setEditingItemId] = useState(null);
  const [newQuantity, setNewQuantity] = useState(1);

  const deleteCartItem = async (productId) => {
    await axios.delete(`https://react-course-ecommerce-backend-1.onrender.com/api/cart-items/${productId}`);
    await loadCart();
  };

  const updateCartItem = async (cartItem) => {
   await axios.put(`https://react-course-ecommerce-backend-1.onrender.com/api/cart-items/${cartItem.productId}`, {
      productId: cartItem.productId,
      quantity: Number(newQuantity),
      deliveryOptionId: cartItem.deliveryOptionId,
    });
    setEditingItemId(null); // stop editing
    await loadCart();
  };

  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          const selectedDeliveryOption = deliveryOptions.find(
            (deliveryOption) => deliveryOption.id === cartItem.deliveryOptionId
          );

          return (
            <div key={cartItem.productId} className="cart-item-container">
              <div className="delivery-date">
                Delivery date:{" "}
                {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
                  'dddd, MMMM D'
                )}
              </div>

              <div className="cart-item-details-grid">
                <img
                  className="product-image"
                  src={cartItem.product.image}
                  alt={cartItem.product.name}
                />

                <div className="cart-item-details">
                  <div className="product-name">{cartItem.product.name}</div>
                  <div className="product-price">
                    {formatMoney(cartItem.product.priceCents)}
                  </div>

                  <div className="product-quantity">
                    {editingItemId === cartItem.productId ? (
                      <>
                        <input
                          type="number"
                          min="1"
                          value={newQuantity}
                          onChange={(e) => setNewQuantity(e.target.value)}
                        />
                        <button onClick={() => updateCartItem(cartItem)}>
                          Save
                        </button>
                      </>
                    ) : (
                      <>
                        <span>
                          Quantity:{" "}
                          <span className="quantity-label">
                            {cartItem.quantity}
                          </span>
                        </span>
                        <span
                          className="update-quantity-link link-primary"
                          onClick={() => {
                            setEditingItemId(cartItem.productId);
                            setNewQuantity(cartItem.quantity);
                          }}
                        >
                          Update
                        </span>
                        <span
                          className="delete-quantity-link link-primary"
                          onClick={() => deleteCartItem(cartItem.productId)}
                        >
                          Delete
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <DeliveryOption
                  cartItem={cartItem}
                  deliveryOptions={deliveryOptions}
                  loadCart={loadCart}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}

