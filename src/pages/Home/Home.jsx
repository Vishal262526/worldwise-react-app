import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import Header from "../../components/Header/Header";

const Home = () => {
  return <>
  <Header />
  <div className={styles.container}>
    <h1>You Travel the World. <br /> Wolrdwise keep tracko of your Adventure</h1>
    <h2>A World map that track your footsteps into every city you can think of. Never forget your wonderful experience, and show your friends how you are wandered the world</h2>
    {/* <button>Start Tracking Now</button> */}
    <Link className="cta" to="/app">Start Tracking Now</Link>
  </div>
  </>
};

export default Home;
