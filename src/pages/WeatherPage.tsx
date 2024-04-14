import React, { useEffect, useState } from 'react';
import LocationInfo from '../components/element/LocationInfo';
import WeatherDetails from '../components/element/WeatherDetails';
import { useLocation } from 'react-router-dom';
import Header from '../components/common/Headerl';
import Footer from '../components/common/Footer';

const WeatherPage: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const cityName = searchParams.get('city');
    if (cityName) {
      setCity(decodeURIComponent(cityName));
    }
  }, [location]);

  const handleCityChange = (city: string) => {
    setCity(city);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <Header>
        <LocationInfo onCitySelect={handleCityChange} />
      </Header>
      <main className="flex-grow w-full flex flex-col items-center max-w-7xl bg-black">
        <WeatherDetails city={city} />
      </main>
   <Footer/>
    </div>
  );
};

export default WeatherPage;
