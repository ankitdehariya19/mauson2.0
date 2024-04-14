import React, { useState, useEffect } from "react";

import Header from "../components/common/Headerl";
import Footer from "../components/common/Footer";
import WeatherDetails from "../components/element/WeatherDetails";
import { fetchCityName } from "../services/geocodeService";
import LocationInfo from "../components/element/LocationInfo";
import DataTable from "../components/DataTable/DataTable";
import Loader from "../components/element/Loader";
import SearchHistory from "../components/common/SearchHistory";
import Modal from "../components/common/Modal";
import { HiMenuAlt3 } from "react-icons/hi";

const Home: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [loading] = useState<boolean>(false);
  const [error] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const handleSearchHistory = (city: string) => {
    const existingHistoryJSON = localStorage.getItem("cities");
    const existingHistory: string[] = existingHistoryJSON
      ? JSON.parse(existingHistoryJSON)
      : [];
    const isInHistory = existingHistory.includes(city);
    if (!isInHistory) {
      const updatedHistory = [...existingHistory, city];
      setSearchHistory(updatedHistory);
      localStorage.setItem("cities", JSON.stringify(updatedHistory));
    }
    setCity(city);
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("cities");
  };

  useEffect(() => {
    const fetchUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const cityName = await fetchCityName(latitude, longitude);
            setCity(cityName);
          },
          (error) => {
            console.error("Error getting user location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    fetchUserLocation();
  }, []);

  useEffect(() => {
    const cities = localStorage.getItem("cities") || "[]";
    const history =
      (searchHistory.length && searchHistory) || JSON.parse(cities);
    setSearchHistory(history);
  }, [searchHistory]);

  return (
    <div className=" relative min-h-screen max-h-full max-w-7xl mx-auto bg-black rounded-md flex flex-col items-center border">
      <Header>
      <button
          onClick={() => setIsModalOpen(true)}
          className="flex  rounded-md  gap-x-2 text-black text-xs p-3 mr-10 my-4  shadow-md duration-300 ease-in-out bg-white hover:bg-black hover:text-gray-100 focus:outline-none"
        >
          <HiMenuAlt3 />
        </button>
      </Header>
      <div className="w-full bg-black  rounded-md shadow-md p-4 sm:p-8  min-h-screen max-h-full">
        {loading ? (
          <Loader />
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <div>
            <div className="pb-4 rounded-md  ">
          
              <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <LocationInfo onCitySelect={handleSearchHistory} />
                <SearchHistory
                  searchHistory={searchHistory}
                  setCity={setCity}
                  clearSearchHistory={clearSearchHistory}
                />
              </Modal>
              <WeatherDetails city={city} />
            </div>
            {/* <div className="overflow-x-auto ">
              <DataTable handleSearchHistory={handleSearchHistory} />
            </div> */}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
// clear