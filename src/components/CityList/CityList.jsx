// esline-disable
import styles from "./CityList.module.css";
import CityItem from "../CityItem/CityItem";
import { useCities } from "../../contexts/CitiesContext";

const CityList = () => {
  const { cities, isLoading } = useCities();

  if (isLoading) return <p>Loading....</p>;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
};

export default CityList;
