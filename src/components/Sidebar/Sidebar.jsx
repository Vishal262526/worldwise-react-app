import { Outlet } from "react-router-dom";
import styles from "./Sidebar.module.css";
import AppHeader from "../AppHeader/AppHeader";
const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h1 className={styles.logo}>WorldWise</h1>
      <AppHeader />
      <Outlet />
    </div>
  );
};

export default Sidebar;
