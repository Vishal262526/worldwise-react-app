import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

const CitiesProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity ,setCurrentCity] = useState({});


  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        if (!res.ok) {
          throw new Error("Something went Wrong");
        }
        const data = await res.json();
        setCities(data);
      } catch (e) {
        alert(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCities();
  }, []);


  const getCurrentCity = async (id) => {
    try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        if (!res.ok) {
          throw new Error("Something went Wrong");
        }
        const data = await res.json();
        setCurrentCity(data);
      } catch (e) {
        alert(e);
      } finally {
        setIsLoading(false);
      }
  }


  return <CitiesContext.Provider value={{
    cities, isLoading, currentCity,getCurrentCity
  }}>{children}</CitiesContext.Provider>;
};

CitiesProvider.propTypes = {
    children : PropTypes.node.isRequired,
};


const useCities = () => {
    const context = useContext(CitiesContext);
    if(context === undefined) throw new Error("Cities Context is used outside of CitiesProvider");
    return context;
}


export {CitiesProvider, useCities};