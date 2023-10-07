import { createContext, useContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

const initState = {
  cities: [],
  isLoading: false,
  currentCity: [],
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "currentCity/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "cities/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
      };

    case "cities/deleted":
      return {
        ...state,
        isLoading: false,
        cities: [
          ...state.cities.map((citiesData) =>
            citiesData.filter((city) => city.id !== action.payload)
          ),
        ],
      };

    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("Unknown action");
  }
};

const CitiesProvider = ({ children }) => {
  const [{ cities, currentCity, isLoading, error }, dispatch] = useReducer(
    reducer,
    initState
  );
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    dispatch({ type: "loading" });
    const fetchCities = async () => {
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        if (!res.ok) {
          throw new Error("Something went Wrong");
        }
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (e) {
        dispatch({ type: "rejected", payload: e.message });
      }
    };
    fetchCities();
  }, []);

  const getCurrentCity = async (id) => {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      if (!res.ok) {
        throw new Error("Something went Wrong");
      }
      const data = await res.json();
      dispatch({ type: "currentCity/loaded", payload: data });
    } catch (e) {
      alert(e);
    }
  };

  const addCity = async (newCity) => {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Something went Wrong");
      }
      const data = await res.json();
      dispatch({ type: "cities/created", payload: data });

      // setCities((oldCities) => [...oldCities, data]);
    } catch (e) {
      dispatch({ type: "rejected", payload: e.message });
    }
  };

  const deleteCity = async (id) => {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Something went Wrong with server while deleting city");
      }
      dispatch({ type: "cities/deleted", payload: id });
      // setCities((citiesData) => citiesData.filter((city) => city.id !== id));
    } catch (e) {
      dispatch({ type: "rejected", payload: e.message });
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCurrentCity,
        addCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

CitiesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Cities Context is used outside of CitiesProvider");
  return context;
};

export { CitiesProvider, useCities };
  