// TIME-BASED DATA PLOT (VERSION 3.1)
import { useEffect, useState } from "react";

const locationMapping: { [key: string]: string } = {
  manchester: "M13 9PL",
  scotland: "S23 9RW",
};

export const useLiveFrequency = (
  location: string = "manchester",
  minutes: number = 1
) => {
  const [latestData, setLatestData] = useState<
    { time: string; frequency: number }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;
    setLoading(true);

    const fetchFrequency = async () => {
      try {
        const influxLocation = locationMapping[location.toLowerCase().trim()];
        if (!influxLocation) return;

        const encodedLocation = encodeURIComponent(influxLocation);
        const apiUrl = `http://127.0.0.1:5000/frequency/${encodedLocation}?minutes=${minutes}`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
          console.warn(`⚠️ API returned ${response.status}`);
          setLatestData([]); // ✅ Ensure empty array is set
          setLoading(false);
          return;
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          console.error("❌ Received invalid JSON data", data);
          setLatestData([]);
          setLoading(false);
          return;
        }

        // ✅ Filter out invalid data points
        const validatedData = data
          .filter(
            (item) =>
              typeof item.frequency === "number" && !isNaN(item.frequency)
          )
          .map((item) => ({
            time: new Date(item.time).toISOString(),
            frequency: item.frequency,
          }));

        if (isActive) {
          setLatestData(validatedData);
          setLoading(false);
        }
      } catch (error) {
        console.error(`❌ Error fetching frequency data:`, error);
        setLatestData([]);
        setLoading(false);
      }
    };

    fetchFrequency();
    const interval = setInterval(fetchFrequency, 1000);

    return () => {
      isActive = false;
      clearInterval(interval);
    };
  }, [location, minutes]);

  return { latestData, loading };
};
