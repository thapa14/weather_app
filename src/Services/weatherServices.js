import { DateTime } from "luxon";

const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "a5ebdc78154946c275a4e32259bb6cc7";

const getWeatherData = (inputType, searchParams) => {
  const url = new URL(BASE_URL + "/" + inputType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url)
    .then(async (response) => {
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      const data = isJson ? await response.json() : null;
      if (!response.ok) {
        // get error message from body or default to response status
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
      } else return data;
    })
    .catch((error) => {
      // console.error(error);
    });
};

const formatCurrentData = (data) => {
  if (data) {
    const {
      coord: { lat, lon },
      dt,
      main: { humidity, temp, feels_like, temp_max, temp_min },
      name,
      sys: { country, sunrise, sunset },
      wind: { speed },
      weather,
    } = data;
    const { main: details, icon } = weather[0];

    return {
      lat,
      lon,
      dt,
      humidity,
      temp,
      feels_like,
      temp_max,
      temp_min,
      name,
      country,
      sunrise,
      sunset,
      speed,
      icon,
      details,
    };
  }
};

const formatForecastData = (d) => {
  let { timezone, daily, hourly } = d;
  daily = daily.slice(1, 6).map((value) => {
    return {
      title: formatToLocalTime(value.dt, timezone, "ccc"),
      temp: value.temp.day,
      icon: value.weather[0].icon,
    };
  });

  hourly = hourly.slice(1, 6).map((value) => {
    return {
      title: formatToLocalTime(value.dt, timezone, "hh:mm a"),
      temp: value.temp,
      icon: value.weather[0].icon,
    };
  });
  return { timezone, daily, hourly };
};

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentData);
  if (formattedCurrentWeather) {
    let { lat, lon } = formattedCurrentWeather;

    const formattedWeatherForecast = await getWeatherData("onecall", {
      lat,
      lon,
      exclude: "minutely, current,alerts",
      units: searchParams.units,
    }).then(formatForecastData);

    return { ...formattedCurrentWeather, ...formattedWeatherForecast };
  }
};

const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | local time: 'hh:mm a "
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
const iconUrlFromCode = (code) =>
  `https://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;
export { iconUrlFromCode, formatToLocalTime };
