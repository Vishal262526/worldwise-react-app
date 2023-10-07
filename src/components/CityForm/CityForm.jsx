import { useEffect, useState } from "react";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import styles from "./CityForm.module.css";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function getFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const CityForm = () => {
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [date, setDate] = useState(() => new Date());
  const [isLoading, setIsloading] = useState(true);
  const [emoji, setEmoji] = useState("");
  const [error, setError] = useState("");
  const [notes,setNotes] = useState("");
  const {addCity} = useCities();
  const navigate = useNavigate();

  const [lat, long] = useUrlPosition();

  console.log(countryName);

  useEffect(() => {
    
    const fetchCityData = async () => {
      setError("");
      setIsloading(true);
      try {
        if (!lat && !long) throw new Error("Please click on the map to choose location");
       
        const res = await fetch(
          `${BASE_URL}?latitude=${lat}&longitude=${long}`
        );
        if (!res.ok) {
          throw new Error("Something went wrong with the API");
        }
        const data = await res.json();

        if (!data.countryCode) {
          throw new Error("Doesn't seem to be a city. Click somewhere else");
        }
        setCityName(data.city || data.locality || "");
        setCountryName(data.countryName || "");
        setEmoji(getFlagEmoji(data.countryCode));
        if(!data.city || !data.countryCode){
          throw new Error("It is not a valid location please click somewhere else");
        }
      } catch (e) {
        console.log(e);
        setError(e.message);
      } finally {
        setIsloading(false);
      }
    };

    fetchCityData();
  }, [lat, long]);


  const handleSubmit = async (event) => {
    setIsloading(true);
    event.preventDefault();
    
    if(!cityName || !date || !countryName){
      setIsloading(false);
      return;
    }
    const newCity = {
      city_name : cityName,
      country_name : countryName,
        emoji,
        date,
        notes,
        position: {lat, long},
    };
    await addCity(newCity);
    navigate("/app/cities");
    setIsloading(false);

    
  }
  
  const handleDateChange = (date) => {
    setDate(date);
  }


  if(isLoading) return <p>Loading...</p>;

  if(error) return <p>{error}</p>;

  
  return (
    <div className={styles.cityForm}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="city-name">City Name</label>

        <div className={styles.flag}>
          <input
            onChange={setCityName}
            value={cityName}
            id="city-name"
            type="text"
          />
          <span data-flag={emoji}></span>
        </div>

        <label htmlFor="date">When did you go to?</label>
        <DatePicker id="date" dateFormat="dd/MM/yyyy" selected={date} value={date} onChange={(date) => handleDateChange(date)}  />
        

        <label htmlFor="about-trip">Notes about your Trip</label>
        {/* <input id="about-trip" type="text" /> */}
        <textarea onChange={(e) => setNotes(e.target.value)} value={notes} id="about-trip" rows="5"></textarea>

        <div className="btn">
          <button className="cta">Add City</button>
        </div>
      </form>
    </div>
  );
};

export default CityForm;
