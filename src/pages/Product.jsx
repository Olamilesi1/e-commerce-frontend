// import React, { useState, useEffect } from 'react';
// import axios from "axios"
// import { toast } from 'react-toastify';
// import Header from '../components/Header'
// // import style from "../styles/Blog.module.css";

// function Product() {
 
//   const [products, setProducts] = useState([]);
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         // const productsResponse = await axios.get('https://mental-space-foundation-api.onrender.com/api/blogs/all-blogs');
//         const productsResponse = await axios.get('http://localhost:7000/product/all-products');
//         setProducts(productsResponse.data.productData);
//         toast.success('Products loaded successfully!');
//       } else {
//         toast.error('No products found');
//       } catch (error) {
//         toast.error('Error fetching products');
//         console.error('Error fetching products:', error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   if (!products.length) {
//     return <p>Loading products...</p>;
//   }

//     return (
//         <div>
//           <Header/>
//         <div className="product-grid">
//             {products.map((product) => (
//                 <div key={product.id}>
//                     <img src={product.image} alt={product.name} className="product-image" />
//                     <h3>{product.name}</h3>
//                     <h3>{product.status}</h3>
//                     {/* <h3>{product.description}</h3> */}
//                     <h1>NGN {product.price.toLocaleString()}</h1>
//                     <button className="add-to-cart">Add to cart</button>
//                 </div>
//             ))}
//         </div>
//         </div>
//     );
// };

// export default Product;


// import React, { useState, useEffect } from 'react';
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from 'react-toastify';
// import Header from '../components/Header';
// import styles from "../styles/productdetails.module.css";

// function Product() {
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         // Fetching the products from the backend
//         const productsResponse = await axios.get('http://localhost:7000/product/all-products', {
//           headers: {
//             'Cache-Control': 'no-cache',
//           },
//         });

//         console.log('Response Data:', productsResponse.data); // Debugging: Log the response

//         // Setting products directly if the response is an array
//         if (Array.isArray(productsResponse.data)) {
//           setProducts(productsResponse.data);
//           toast.success('Products loaded successfully!');
//         } else {
//           console.warn('Unexpected API response:', productsResponse.data);
//           toast.error('No products found');
//         }
//       } catch (error) {
//         console.error('Error fetching products:', error);
//         toast.error(`Error fetching products: ${error.message}`);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleProductClick = (id) => {
//     navigate(`/product/${id}`); // Navigate to detail page with product ID
//   };

//   // Show loading or empty state if no products are available
//   if (!products.length) {
//     console.log('Products state is empty');
//     return (
//       <div>
//         <Header />
//         <p>No products available or loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <Header />
//       <div>
//         <h1>Products</h1>
//         {products.map((product) => (
//           <div key={product._id || product.id || product.name} onClick={() => handleProductClick(product._id)}>
//             <h3>{product.name}</h3>
//             <h1>{product.price}</h1>
//             <h3>{product.description}</h3>
//             <h3>{product.status}</h3>
//             <h3>{product.title}</h3>
//             <button>Add to cart</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Product;

import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Header from '../components/Header';
import styles from "../styles/productdetails.module.css";

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
      <div>
        <h1>Products</h1>
        {filteredProducts.map((product) => (
          <div key={product._id || product.id || product.name} onClick={() => handleProductClick(product._id)}>
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
