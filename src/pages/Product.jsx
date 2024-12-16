import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Header from '../components/Header';
import styles from "../styles/product.module.css";

function Product() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsResponse = await axios.get('http://localhost:7000/product/all-products', {
          headers: {
            'Cache-Control': 'no-cache',
          },
        });

        if (Array.isArray(productsResponse.data)) {
          setProducts(productsResponse.data);
          toast.success('Products loaded successfully!');
        } else {
          toast.error('No products found');
        }
      } catch (error) {
        toast.error(`Error fetching products: ${error.message}`);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  if (!filteredProducts.length) {
    return (
      <div>
        <Header onCategoryChange={handleCategoryChange} onSearchChange={handleSearchChange} />
        <p>No products available or loading...</p>
      </div>
    );
  }

  return (
    <div>
      <Header onCategoryChange={handleCategoryChange} onSearchChange={handleSearchChange} />
        <h1 className={styles.product}>Products</h1>
      <div className={styles.productGrid}>
        {filteredProducts.map((product) => (
          <div className={styles.productCard} key={product._id || product.id || product.name} onClick={() => handleProductClick(product._id)}>
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <h1>{product.price}</h1>
            <h3>{product.description}</h3>
            <h3>{product.status}</h3>
            <h3>{product.title}</h3>
            <button>Add to cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
