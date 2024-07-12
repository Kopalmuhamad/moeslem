import { useState, useEffect } from "react";

const useGeolocation = () => {
  const [location, setLocation] = useState<{
    latitude: any;
    longitude: any;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    const handleSuccess = (position: GeolocationPosition) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    };

    const handleError = (error: GeolocationPositionError) => {
      setError(error.message);
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  return { location, error };
};

export default useGeolocation;
