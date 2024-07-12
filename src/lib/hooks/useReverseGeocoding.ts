import { useState, useEffect } from "react";
import axios from "axios";

const useReverseGeocoding = (latitude?: number, longitude?: number) => {
  const [locationName, setLocationName] = useState<string>("Loading...");

  useEffect(() => {
    if (latitude && longitude) {
      const fetchLocationName = async () => {
        try {
          const response = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=39f540ce77454842b7ee7797e2e65158`
          );
          const data = response.data;
          if (data.results && data.results.length > 0) {
            setLocationName(data.results[0].formatted);
          } else {
            setLocationName("Location not found");
          }
        } catch (error) {
          setLocationName("Error fetching location");
        }
      };

      fetchLocationName();
    }
  }, [latitude, longitude]);

  return locationName;
};

export default useReverseGeocoding;
