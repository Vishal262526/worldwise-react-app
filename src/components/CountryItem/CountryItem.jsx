import styles from "./CountryItem.module.css";
import PropTypes from "prop-types";
const CountryItem = ({ country }) => {
  const { country_name, emoji } = country;

  return (
    <li className={styles.countryItem}>
      <span>{emoji}</span>
      {country_name}
    </li>
  );
};

CountryItem.propTypes = {
  country: PropTypes.object.isRequired,
};

export default CountryItem;
