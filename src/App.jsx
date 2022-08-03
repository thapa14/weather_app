import React, { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import CityDetails from "./Components/CityDetails/CityDetails";
import CityWeather from "./Components/CityWeather/CityWeather";
import Forecast from "./Components/Forecast/Forecast";
import Search from "./Components/Search/Search";
import Cities from "./Components/TopCities/Cities";
import getFormattedWeatherData from "./Services/weatherServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [query, setQuery] = useState({q:"london"});
  const [unit, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    toast.info("Fetching Data");

    const fetchWeather = async () => {
      const data = await getFormattedWeatherData({
         ...query,
        units: unit,
      }).then((data) => setWeather(data));
      // setWeather(data);
    };
    fetchWeather();
  }, [query, unit]);

  return (
    <div>
      <h1 className="head text-uppercase text-center text-light bg-dark p-2">
        weather App
      </h1>
      <div
        className={
          weather
            ? `container weather-app mt-2 py-2 shadow-sm ${weather.details}`
            : `container weather-app mt-2 py-2 shadow-sm`
        }
      >
        <Cities search={setQuery} />
        <Search
          search={setQuery}
          setUnits={setUnits}
          unit={unit}
          weather={weather}
        />
        {weather && (
          <>
            <CityDetails weather={weather} />
            <CityWeather weather={weather} />
            <Forecast key={1}
            weather={weather.hourly} 
            timing="Hourly"/>
            <Forecast key={2}
            weather={weather.daily}
            timing="daily"/>
          </>
        )}

        <ToastContainer autoClose={500} theme="colored" />
      </div>
    </div>
  );
}

export default App;
