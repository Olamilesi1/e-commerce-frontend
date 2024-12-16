import styles from "../styles/header.module.css";

function Header({ onCategoryChange, onSearchChange }) {
  return (
    <div className={styles.headbody}>
      <h1 className={styles.head}>Welcome To GText E-Commerce Page!</h1>

      <div className={styles.nav}>
        <h1 className={styles.logo}>GTEXT LOGO</h1>

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
