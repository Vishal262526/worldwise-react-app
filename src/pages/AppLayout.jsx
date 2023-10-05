import Map from "../components/Map/Map";
import Sidebar from "../components/Sidebar/Sidebar"
// import styles from './AppLayout.css';

const AppLayout = () => {
  return (
    <div className='app'>
      {/* <AppHeader /> */}
      <Sidebar />
      <Map />

    </div>
  )
}

export default AppLayout
