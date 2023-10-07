import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import PropTypes from "prop-types";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useGeoLocation } from "../../hooks/useLocation";

import { useCities } from "../../contexts/CitiesContext";
import { useUrlPosition } from "../../hooks/useUrlPosition";

const Map = () => {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { cities } = useCities();
  const {
    position: locationPosition,
    isLoading: locationLoading,
    getPosition,
  } = useGeoLocation();

  const [lat, long] = useUrlPosition();





  useEffect(() => {
    if (lat && long) setMapPosition([lat, long]);
  }, [lat, long]);

  useEffect(() => {
    if (locationPosition) {
      setMapPosition([locationPosition.lat, locationPosition.long]);
    }
  }, [locationPosition]);

  return (
    <div className={styles.mapContainer}>
      <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.long]}
          >
            <Popup>
              {city.emoji} {city.city_name}
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetechClick />
        {!locationPosition && (
          <button className="btn" onClick={getPosition}>
            {locationLoading ? "loading..." : "Get your Position"}
          </button>
        )}
      </MapContainer>
    </div>
  );
};

const ChangeCenter = ({ position }) => {
  const currentMap = useMap();
  currentMap.setView(position);
  return null;
};

const DetechClick = () => {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&long=${e.latlng.lng}`),
  });
};

ChangeCenter.propTypes = {
  position: PropTypes.array.isRequired,
};

export default Map;
