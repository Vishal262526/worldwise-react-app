import { NavLink } from "react-router-dom"
import styles from './AppHeader.module.css';
const AppHeader = () => {
  return (
    <nav className={styles.appHeader}>
      <ul>
        <li>
          <NavLink to="cities" >Cities</NavLink>
        </li>
        <li>
          <NavLink to="countries" >Countries</NavLink>
        </li>
        
      </ul>
    </nav>
  )
}

export default AppHeader
