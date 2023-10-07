import PropTypes from "prop-types";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCities } from "../../contexts/CitiesContext";
const CityItem = ({ city }) => {
  const { id, city_name, emoji, position } = city;

  const { currentCity, deleteCity } = useCities();

  const handleDelete = (e) => {
    e.preventDefault();

    deleteCity(id);
  }

  return (
    <li
      className={`${styles.cityItem} ${
        currentCity.id === city.id && styles.active
      }`}
    >
      <Link to={`${id}?lat=${position.lat}&long=${position.long}`}>
        <div>
          <span>{emoji}</span>
          {city_name}
        </div>
        <div>
          <span>22/12/2023</span>
          <button onClick={handleDelete} className="cta">X</button>
        </div>
      </Link>
    </li>
  );
};

CityItem.propTypes = {
  city: PropTypes.object,
};

export default CityItem;
