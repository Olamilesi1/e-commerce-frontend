import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "../styles/productdetails.module.css";

function ProductDetailPage() {
  const { id } = useParams(); // Extract product ID from URL
  const navigate = useNavigate(); // For navigation to cart page
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/product/one-product/${id}`);
        setProduct(response.data);
        toast.success("Product details loaded successfully!");
      } catch (error) {
        toast.error("Error fetching product details");
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);


  // Handle adding product to cart
  const handleAddToCart = async () => {
    try {
      // Send add-to-cart request to backend
      const cartData = {
        productId: id,
        quantity,
      };

      await axios.post("http://localhost:7000/cart/add", cartData);
      toast.success(`${product.name} added to cart!`);

      // Navigate to the cart page
      navigate("/cart");
    } catch (error) {
      toast.error("Failed to add product to cart");
      console.error("Error adding product to cart:", error);
    }
  };


  if (!product) {
    return <div className={styles.loading}>Loading product details...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.name} className={styles.productImage} />
      </div>
      <div className={styles.detailsContainer}>
        <h1>{product.name}</h1>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.price}>Price: NGN {product.price.toLocaleString()}</p>
        <p className={styles.stockStatus}>
          {/* {product.status === "in stock" ? "In Stock" : "Out of Stock"} */}
          {product.status}
        </p>

        <div className={styles.quantityContainer}>
          <button onClick={() => setQuantity((q) => Math.max(q - 1, 1))}>-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity((q) => q + 1)}>+</button>
        </div>

        {/* <button className={styles.addToCartButton} disabled={product.status !== "in stock"}> */}
        <button  onClick={handleAddToCart} className={styles.addToCartButton}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetailPage;
