import { useState } from "react";

export const useGeoLocation = (defaultPosition = null) => {
  const [position, setPosition] = useState(defaultPosition);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getPosition = () => {
    if(!navigator.geolocation){
        return setError("Your browser does not support GeoLocation")
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition((pos) => {
        setPosition({
            lat:pos.coords.latitude,
            long: pos.coords.longitude,
        });
        setIsLoading(false);
    }, (err) => {
        setError(err.message);
        setIsLoading(false);
    })
  };

  return {getPosition, isLoading, position, error};
};


