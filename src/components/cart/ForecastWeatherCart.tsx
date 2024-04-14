import React from 'react';
import { ForecastDay } from '../../services/WeatherService';

interface ForecastWeatherCartProps {
  day: ForecastDay;
}

const ForecastWeatherCart: React.FC<ForecastWeatherCartProps> = ({ day }) => {
  return (
    <div className="rounded-lg font-semibold overflow-hidden border hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105" >
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-900">{day?.date}</h3>
        <div className="flex items-center mb-3">
          <img
            src={day.weatherIcon}
            alt={day.weatherDescription}
            className="w-8 h-8 mr-2"
          />
          <p className="text-gray-900 text-sm">{day?.weatherDescription}</p>
        </div>
        <p className="text-gray-900 text-sm">High: {day?.temperatureHigh}°C</p>
        <p className="text-gray-900 text-sm">Low: {day?.temperatureLow}°C</p>
        <p className="text-gray-900 text-sm">Precipitation Chance: {day?.precipitationChance}%</p>
      </div>
    </div>
  );
};

export default ForecastWeatherCart;
