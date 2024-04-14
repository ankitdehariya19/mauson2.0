
export async function fetchCityData(query: string): Promise<any> {
    const url = `https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&q=${query}&rows=1000&sort=name&facet=cou_name_en`;
  
    try {
      const response = await fetch(url);
      const json = await response.json();
      return json.records;
    } catch (error) {
      throw new Error('Error fetching city data');
    }
  }
  