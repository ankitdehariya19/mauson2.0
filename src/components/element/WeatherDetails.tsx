import React, { useState, useEffect } from "react";
import {
  getWeatherData,
  WeatherData,
  ForecastDay,
} from "../../services/WeatherService";
import { BsDropletFill } from "react-icons/bs";
import { GiPaperWindmill } from "react-icons/gi";
import { MdMoreTime } from "react-icons/md";
import { FaCompressArrowsAlt } from "react-icons/fa";
import ForecastWeatherCart from "../cart/ForecastWeatherCart";
import Loader from "./Loader";
import { WEATHER_API_KEY } from "../../services/ApiKey";

interface WeatherDisplayProps {
  city: string;
}

const API_KEY = WEATHER_API_KEY;
const WeatherDetails: React.FC<WeatherDisplayProps> = ({ city }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await getWeatherData(city, API_KEY);
        setWeatherData(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError("failed to fetch weather data. at that time please change location or Please try again later.");
        setWeatherData(null);
      }
    };

    fetchWeatherData();
  }, [city]);

  if (error) {
    return <div className="text-gray-400 text-center py-4">{error}</div>;
  }

  if (!weatherData) {
    return (
      <Loader />
    );
  }

  return (
    <div className="w-full flex flex-col justify-center items-center max-w-7xl  p-5 h-full rounded-md "  style={{ backgroundImage: weatherData?.backgroundImage , backgroundSize: 'cover',}}>
       
     
    <div className="flex flex-col w-full">
      <div className="rounded-lg bg-opacity-46 p-6 my-5 w-full flex flex-col justify-between items-center md:flex-row">
     
        <div className="bg-opacity-50 m-2 flex flex-col justify-center  p-3 rounded-md">
        <h1 className="text-4xl font-bold  text-start text-gray-800 ">{weatherData?.city}</h1>
          <h2 className="text-4xl font-semibold mb-4 text-gray-800">Current Weather</h2>
          <div className="flex items-center mb-4">
            <img src={weatherData?.weatherIcon} alt={weatherData?.weatherDescription} className="w-16 h-16 mr-4" />
            <p className="text-5xl font-bold text-gray-800">{weatherData?.temperature}°C</p>
          </div>
          <p className="text-gray-900 font-bold text-lg mb-2">Description: {weatherData?.weatherDescription}</p>
        </div>
        <div className="flex flex-wrap font-semibold justify-between items-center w-full p-3 rounded-md bg-opacity-50">
          <div className="flex items-center ">
            <BsDropletFill className="mx-2" />
            <p className="text-lg">Humidity:</p>
            <p className="text-lg mx-2">{weatherData?.humidity}%</p>
          </div>
          <div className="flex items-center">
            <GiPaperWindmill className="mx-2" />
            <p className="text-lg">Wind:</p>
            <p className="text-lg mx-2">{weatherData?.windSpeed} m/s</p>
          </div>
          <div className="flex items-center">
            <MdMoreTime className="mx-2" />
            <p className="text-lg">Timezone:</p>
            <p className="text-lg mx-2">GMT +{weatherData?.timezone / 3600}</p>
          </div>
          <div className="flex items-center">
            <FaCompressArrowsAlt className="mx-2" />
            <p className="text-lg">Pressure:</p>
            <p className="text-lg mx-2">{weatherData?.pressure} hPa</p>
          </div>
        </div>
      </div>
      <div className="rounded-lg p-6 bg-opacity-46">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Forecast</h2>
        <div className="flex flex-wrap gap-5 justify-center">
          {weatherData?.forecast.map((day: ForecastDay, index: number) => (
            <ForecastWeatherCart key={index} day={day} />
          ))}
        </div>
      </div>
    </div>
  </div>
  );
};

export default WeatherDetails;
