import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomDropdown from './CustomDropdown';

interface CountryData {
  country: string;
  cities: string[];
}

interface LocationInfoProps {
  onCitySelect: (city: string) => void;
}

const LocationInfo: React.FC<LocationInfoProps> = ({ onCitySelect }) => {
  const [countriesData, setCountriesData] = useState<CountryData[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [cities, setCities] = useState<string[]>([]);
  const [searchTerm] = useState<string>('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get<{ data: CountryData[] }>('https://countriesnow.space/api/v0.1/countries');
        setCountriesData(response.data.data);
      } catch (error) {
        console.error('Error fetching countries data:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    const selectedCountryData = countriesData.find(data => data.country === country);
    if (selectedCountryData) {
      setCities(selectedCountryData.cities);
      setSelectedCity(null); 
    } else {
      setCities([]);
    }
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    onCitySelect(city);
  };


  const filteredCities = cities.filter(city =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col ">
      <div className=" lg:flex  rounded-lg  ">
      <div className=" ">
        <CustomDropdown
          options={countriesData.map(data => data.country)}
          selectedOption={selectedCountry}
          onSelectOption={handleCountryChange}
          placeholder="Select a country"
        />
      </div>
      {selectedCountry && (
        <CustomDropdown
          options={filteredCities}
          selectedOption={selectedCity}
          onSelectOption={handleCitySelect}
          placeholder="Select a city"
        />
      )}
      </div>
      
    </div>
  );
};

export default LocationInfo;
//clear