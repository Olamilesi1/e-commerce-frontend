// function Header() {
//   return (
//     <div>
//       <h1>Welcome To GText E-Commerce Page!</h1>

//       <div>
//         <h1>GTEXT LOGO</h1>

//         <span>
//           <select name="" id="">
//             <option value="">All categories</option>
//             <option value="">Food</option>
//             <option value="">Cloth</option>
//           </select>

//           <input type="search" name="" id="" placeholder="Search here..." />
//         </span>

//         <button>cart</button>
//       </div>
//     </div>
//   );
// }

// export default Header;


function Header({ onCategoryChange, onSearchChange }) {
  return (
    <div>
      <h1>Welcome To GText E-Commerce Page!</h1>

      <div>
        <h1>GTEXT LOGO</h1>

        <span>
          <select onChange={(e) => onCategoryChange(e.target.value)} id="category">
            <option value="">All categories</option>
            <option value="food">Food</option>
            <option value="cloth">Cloth</option>
          </select>

          <input
            type="search"
            placeholder="Search here..."
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </span>

        <button>cart</button>
      </div>
    </div>
  );
}

export default Header;
