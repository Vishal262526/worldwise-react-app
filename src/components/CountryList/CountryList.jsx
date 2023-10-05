import { useCities } from "../../contexts/CitiesContext";
import CountryItem from "../CountryItem/CountryItem";
import styles from "./CountryList.module.css";

const CountryList = () => {
  const {cities, isLoading} = useCities();

  const countries = cities.reduce((arr, curr) => {
    if (!arr.map((el) => el.country_name).includes(curr.country_name)) {
      return [
        ...arr,
        { country_name: curr.country_name, id: curr.id, emoji: curr.emoji },
      ];
    } else {
      return arr;
    }
  }, []);

  console.log(countries);

  if (isLoading) return <p>Loading...</p>;

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.id} country={country} />
      ))}
    </ul>
  );
};


export default CountryList;
