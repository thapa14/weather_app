import React from "react";
import "./Search.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { positions } from "@mui/system";

function Search(props) {
  // states
  const [cityName, changeCityName] = useState("");
  const [buttonStyle, changeButtonStyle] = useState("metric");
  const { setUnits, unit, search, weather } = props;

  const searchCity = (e) => {
    e.preventDefault();
    if (cityName) {
      search({q:cityName});
      changeCityName("");
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((positions) => {
        let lat = positions.coords.latitude;
        let lon = positions.coords.longitude;
        search({
          lat,
          lon,
        });
      });
    }
  };

  const tempratureUnitChange = (e) => {
    if (weather) {
      if (e.target.name !== unit) {
        setUnits(e.target.name);
        changeButtonStyle(e.target.name);
      }
    }
  };

  return (
    <>
      <div className="d-flex flex-row justify-content-center align-items-center my-3">
        <div className="d-flex flex-row align-items-center justify-content-center  search-div">
          <form onSubmit={searchCity}>
            <input
              type="text"
              placeholder="search city"
              onChange={(e) => {
                changeCityName(e.target.value);
              }}
              value={cityName}
            />

            <SearchIcon
              className="hoverEffects"
              type="submit"
              style={{
                color: "white",
                margin: "0px 8px 0 6px",
                fontSize: "20px",
              }}
              onClick={searchCity}
            />
          <LocationOnIcon
            className="hoverEffects"
            style={{ color: "white", fontSize: "20px" }}
            onClick={getLocation}
            />
            </form>
        </div>
        <div className="d-flex flex-row align-items-center justify-content-center gap-2 text-white temprature-div">
          <button
            className={
              buttonStyle === "metric"
                ? "temp-btn text-white button-style"
                : "temp-btn text-white"
            }
            name="metric"
            onClick={tempratureUnitChange}
          >
            °C
          </button>

          <button
            className={
              buttonStyle === "imperial"
                ? "temp-btn text-white button-style"
                : "temp-btn text-white"
            }
            name="imperial"
            onClick={tempratureUnitChange}
          >
            °F
          </button>
        </div>
      </div>
    </>
  );
}

export default Search;
