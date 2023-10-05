import { Link,NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        Worldwise
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink  to="/pricing">Pricing</NavLink>
          </li>
          <li>
            <NavLink  to="/product">Product</NavLink>
          </li>
          <li>
            <Link className="cta" to='/login'  >LOG IN</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
