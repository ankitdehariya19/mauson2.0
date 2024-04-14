import { weatherBackgrounds } from '../components/element/weatherBackgrounds';

export interface WeatherData {
  city: string;
  temperature: number;
  weatherDescription: string;
  weatherIcon: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  forecast: ForecastDay[];
  timezone: number;
  backgroundImage: string;
}

export interface ForecastDay {
  date: string;
  temperatureHigh: number;
  temperatureLow: number;
  weatherDescription: string;
  weatherIcon: string;
  precipitationChance: number;
}

export const getWeatherData = async (
  city: string,
  apiKey: string | undefined
): Promise<WeatherData> => {
  if (!apiKey) {
    throw new Error('API key is not provided');
  }

  try {
    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      ),
      fetch(
        `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      ),
    ]);

    if (!currentResponse.ok) {
      throw new Error(
        `Error fetching current weather data: ${currentResponse.status} - ${currentResponse.statusText}`
      );
    }

    if (!forecastResponse.ok) {
      throw new Error(
        `Error fetching weather forecast data: ${forecastResponse.status} - ${forecastResponse.statusText}`
      );
    }

    const [currentData, forecastData] = await Promise.all([
      currentResponse.json(),
      forecastResponse.json(),
    ]);

    if (!currentData.weather || !forecastData.list) {
      throw new Error('Unexpected API response format');
    }

    const iconUrl = `http://openweathermap.org/img/w/${currentData.weather[0].icon}.png`;
    const backgroundImage =
      weatherBackgrounds[currentData.weather[0].description.toLowerCase()] ||
      'url(https://images.unsplash.com/photo-1529528744093-6f8abeee511d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)';

    return {
      city: currentData.name,
      temperature: currentData.main.temp,
      weatherDescription: currentData.weather[0].description,
      weatherIcon: iconUrl,
      humidity: currentData.main.humidity,
      windSpeed: currentData.wind.speed,
      pressure: currentData.main.pressure,
      timezone: currentData.timezone,
      forecast: forecastData.list
        .filter((item: any, index: number) => index % 8 === 0)
        .map((item: any) => ({
          date: new Date(item.dt * 1000).toISOString().slice(0, 10),
          temperatureHigh: item.main.temp_max,
          temperatureLow: item.main.temp_min,
          weatherDescription: item.weather[0].description,
          weatherIcon: `http://openweathermap.org/img/w/${item.weather[0].icon}.png`,
          precipitationChance: item.pop * 100,
        })),
      backgroundImage: backgroundImage,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching weather data:');
    } else {
      console.error('Unexpected error fetching weather data:', );
    }
    throw error;
  }
};