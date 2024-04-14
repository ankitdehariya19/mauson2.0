
import axios from 'axios';

const NOMINATIM_API_URL = 'https://nominatim.openstreetmap.org/reverse';

export const fetchCityName = async (latitude: number, longitude: number): Promise<string> => {
  try {
    const response = await axios.get(`${NOMINATIM_API_URL}?format=json&lat=${latitude}&lon=${longitude}&zoom=10`);
    const { display_name } = response.data;
    const cityName = display_name.split(',')[0];
    return cityName;
  } catch (error) {
    console.error('Error fetching city name:', error);
    return 'Delhi'; 
  }
};