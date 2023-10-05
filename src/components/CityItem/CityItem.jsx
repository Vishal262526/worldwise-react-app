import PropTypes from "prop-types";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCities } from "../../contexts/CitiesContext";
const CityItem = ({ city }) => {
  const { id, city_name, emoji, position } = city;

  const {currentCity} =  useCities()


  return (
    <li className={`${styles.cityItem} ${ currentCity.id === city.id && styles.active}`}>
      <Link to={`${id}?lat=${position.lat}&long=${position.long}`} >
        <span>{emoji}</span>
        {city_name}
      </Link>
    </li>
  );
}; 

CityItem.propTypes = {
  city: PropTypes.object,
};

export default CityItem;
