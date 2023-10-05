import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCities } from "../../contexts/CitiesContext";

const City = () => {
  const { id } = useParams();

  const {getCurrentCity, currentCity, isLoading} = useCities();

  const {city_name} = currentCity;
  
  
  useEffect(() => {
    getCurrentCity(id);
  
  }, [id]);


  if(isLoading) return <p>Loading...</p>;

  return <h1>{city_name}</h1>;
};

export default City;
