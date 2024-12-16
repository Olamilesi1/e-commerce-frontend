import React, { useState } from "react";
import styles from "../styles/cart.module.css";


function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Product 1",
      price: 5000,
      quantity: 1,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Product 2",
      price: 3000,
      quantity: 1,
      image: "https://via.placeholder.com/150",
    },
  ]);

  // Function to increase quantity
  const increaseQuantity = (id) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Function to decrease quantity
  const decreaseQuantity = (id) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className={styles.container}>
      <h1>Shopping Cart</h1>
      <div className={styles.cartContainer}>
        {/* Cart Items */}
        <div className={styles.cartItems}>
          {cartItems.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <img src={item.image} alt={item.name} className={styles.image} />
              <div className={styles.itemDetails}>
                <h2>{item.name}</h2>
                <p>Price: NGN {item.price.toLocaleString()}</p>
                <div className={styles.quantityContainer}>
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className={styles.quantityButton}
                  >
                    -
                  </button>
                  <span className={styles.quantity}>{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className={styles.quantityButton}
                  >
                    +
                  </button>
                </div>
                <p>
                  Subtotal: NGN{" "}
                  {(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className={styles.cartSummary}>
          <h2>Cart Summary</h2>
          <p>Total Items: {cartItems.length}</p>
          <p>
            Total Price: NGN {calculateTotalPrice().toLocaleString()}
          </p>
          <button className={styles.checkoutButton}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;

