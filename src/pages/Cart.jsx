import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "../styles/cart.module.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart items from the backend
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:7000/cart");
        setCartItems(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch cart items");
        console.error("Error fetching cart items:", error);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  // Function to increase quantity
  const increaseQuantity = async (id) => {
    try {
      const updatedItem = await axios.put(
        `http://localhost:7000/cart/increase/${id}`
      );
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.id === id ? updatedItem.data : item
        )
      );
    } catch (error) {
      toast.error("Failed to increase quantity");
      console.error("Error increasing quantity:", error);
    }
  };

  // Function to decrease quantity
  const decreaseQuantity = async (id) => {
    try {
      const updatedItem = await axios.put(
        `http://localhost:7000/cart/decrease/${id}`
      );
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.id === id ? updatedItem.data : item
        )
      );
    } catch (error) {
      toast.error("Failed to decrease quantity");
      console.error("Error decreasing quantity:", error);
    }
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  if (loading) {
    return <div className={styles.loading}>Loading your cart...</div>;
  }

  if (!cartItems.length) {
    return <div className={styles.emptyCart}>Your cart is empty!</div>;
  }

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
