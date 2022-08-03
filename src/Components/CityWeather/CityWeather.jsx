import React from "react";
import "./CityWeather.css";
import CloudIcon from "@mui/icons-material/Cloud";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import AirIcon from "@mui/icons-material/Air";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {
  formatToLocalTime,
  iconUrlFromCode,
} from "../../Services/weatherServices";

function CityWeather(props) {
  const {
    temp,
    humidity,
    feels_like,
    speed,
    timezone,
    sunrise,
    sunset,
    temp_max,
    temp_min,
    icon,
  } = props.weather;
  return (
    <>
      <div className="d-flex flex-column">
        <div className="d-flex flex-row justify-content-between align-items-center">
          {/* <img src="https://openweathermap.org/img/wn/04d@2x.png" alt="icon" style={{width: 60}}/> */}
          <img src={iconUrlFromCode(icon)} alt="icon" style={{ width: 60 }} />
          {/* <CloudIcon style={{ color: "white", fontSize: 30 }} /> */}
          <span className="fs-1 text-white">{temp.toFixed()}°</span>
          <div className="d-flex flex-column align-items-center fade-white">
            <div className="mb-1">
              <DeviceThermostatIcon style={{ fontSize: 15 }} />
              Real Feel:
              <span className="text-white"> {feels_like.toFixed()}°</span>
            </div>
            <div className="mb-1">
              <InvertColorsIcon style={{ fontSize: 15 }} />
              Humidity:
              <span className="text-white"> {humidity.toFixed()}%</span>
            </div>
            <div className="mb-1">
              <AirIcon style={{ fontSize: 15 }} />
              Wind:
              <span className="text-white"> {speed.toFixed()} km/h</span>
            </div>
          </div>
        </div>

        <div
          className="d-flex justify-content-between align-items-center fade-white mt-3"
          style={{ fontSize: "12px" }}
        >
          <div>
            <WbSunnyIcon
              style={{ fontSize: 20, marginRight: "4px", color: "white" }}
            />
            Rise:
            <span className="text-white ">
              {" "}
              {formatToLocalTime(sunrise, timezone, "hh:mm a")}
            </span>
          </div>
          <span>|</span>
          <div>
            <WbTwilightIcon
              style={{ fontSize: 20, marginRight: "4px", color: "white" }}
            />
            Set:
            <span className="text-white ">
              {" "}
              {formatToLocalTime(sunset, timezone, "hh:mm a")}
            </span>
          </div>
          <span>|</span>
          <div>
            <ArrowUpwardIcon
              style={{ fontSize: 20, marginRight: "4px", color: "white" }}
            />
            Max:
            <span className="text-white "> {temp_max.toFixed()}</span>
          </div>
          <span>|</span>
          <div>
            <ArrowDownwardIcon
              style={{ fontSize: 20, marginRight: "4px", color: "white" }}
            />
            Min:
            <span className="text-white "> {temp_min.toFixed()}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default CityWeather;
