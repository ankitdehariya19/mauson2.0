import React, { useEffect, useState } from "react";
import { fetchCityData } from "../../services/cityService";

interface CityDataType {
  datasetid: string;
  fields: {
    admin1_code: string;
    alternate_names: string;
    ascii_name: string;
    coordinates: [number, number];
    cou_name_en: string;
    country_code: string;
    dem: number;
    feature_class: string;
    feature_code: string;
    geoname_id: string;
    label_en: string;
    modification_date: string;
    name: string;
    population: number;
    timezone: string;
  };
  geometry: {
    coordinates: [number, number];
    type: string;
  };
  record_timestamp: string;
  recordid: string;
}

interface TableProps {
  handleSearchHistory:Function
}

const Table: React.FC <TableProps> =( {handleSearchHistory}) => {
  const [cityData, setCityData] = useState<CityDataType[]>([]);
  const [filters, setFilters] = useState({
    city: "",
    country: "",
    timezone: "",
  });
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: "ascending" | "descending";
  }>({
    key: null,
    direction: "ascending",
  });

  const fetchData = async () => {
    try {
      const cityData = await fetchCityData('');
      setCityData(cityData);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  

  const handleViewWeather = (cityName: string) => {
    handleSearchHistory(cityName)
  };

  const filteredData = cityData.filter((item) => {
    const name = item.fields.name ? item.fields.name.toLowerCase() : "";
    const country = item.fields.cou_name_en
      ? item.fields.cou_name_en.toLowerCase()
      : "";
    const timezone = item.fields.timezone
      ? item.fields.timezone.toLowerCase()
      : "";

    return (
      name.includes(filters.city.toLowerCase()) &&
      country.includes(filters.country.toLowerCase()) &&
      timezone.includes(filters.timezone.toLowerCase())
    );
  });

  return (
    <div>
     
      <table className="table-auto w-full border rounded-md bg-black ">
        <thead className="bg-gray-100 border">
          <tr>
            <th className="px-4py-2 text-left font-medium text-gray-800">
              <div className=" flex justify-around items-center ">
                <input
                  type="text"
                  placeholder="Search City"
                  name="city"
                  value={filters.city}
                  onChange={handleFilterChange}
                  className="border rounded-md px-2 py-1"
                />
                <button  onClick={() => handleSort("name")}>Sort</button>
              </div>
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-800">
              <div className=" flex justify-around items-center ">
                <input
                  type="text"
                  placeholder="Search Country"
                  name="country"
                  value={filters.country}
                  onChange={handleFilterChange}
                  className="border rounded-md px-2 py-1"
                />
                <button onClick={() => handleSort("name")}>Sort</button>
              </div>
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-800">
              <div className=" flex justify-around items-center ">
                <input
                  type="text"
                  placeholder="Search Timezone"
                  name="timezone"
                  value={filters.timezone}
                  onChange={handleFilterChange}
                  className="border rounded-md px-2 py-1"
                />
                <button onClick={() => handleSort("name")}>Sort</button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="rounded-md max-h-screen overflow-y-auto">
          {filteredData.map((item, index) => (
            <tr
              key={index}
              onClick={() => handleViewWeather(item.fields.name)}
              className="text-gray-200 border-b hover:bg-gray-800 transition-colors duration-300"
            >
              <td className="px-4 border py-2 text-left">{item.fields.name}</td>
              <td className="px-4 border py-2 text-left">
                {item.fields.cou_name_en}
              </td>
              <td className="px-4 border py-2 text-left">
                {item.fields.timezone}
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
