// // SORT DATA USING TAG KEYS 10 READINGS (VERSION 2.1)
// import { useEffect, useState } from "react";

// const locationMapping: { [key: string]: string } = {
//   manchester: "M13 9PL",
//   scotland: "S23 9RW",
// };

// export const useLiveFrequency = (location: string = "manchester") => {
//   const [latestData, setLatestData] = useState<
//     { time: string; frequency: number }[]
//   >([]);

//   useEffect(() => {
//     const fetchFrequency = async () => {
//       try {
//         // ✅ Ensure we always send the correct tag key format
//         const influxLocation =
//           locationMapping[location.toLowerCase().trim()] || location;

//         console.log(`📡 Sending request for location: ${influxLocation}`); // ✅ Debugging log

//         const response = await fetch(
//           `http://127.0.0.1:5000/frequency/${encodeURIComponent(
//             influxLocation
//           )}`
//         );

//         if (!response.ok) {
//           if (response.status === 400) {
//             console.warn(
//               `⚠️ Invalid location requested: ${location} (${influxLocation})`
//             );
//           } else if (response.status === 404) {
//             console.warn(
//               `⚠️ No data available for ${location} (${influxLocation})`
//             );
//           }
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log(
//           `📡 Polled Frequency Data for ${location} (${influxLocation}):`,
//           data
//         );

//         if (!Array.isArray(data) || data.length === 0) {
//           console.warn(`⚠️ No data received for ${location}.`);
//           return;
//         }

//         const validatedData = data
//           .filter((item) => item.time && item.frequency !== undefined)
//           .map((item) => ({
//             time: new Date(item.time).toISOString(),
//             frequency: parseFloat(item.frequency) || 0,
//           }))
//           .reverse();

//         setLatestData(validatedData.slice(-10));
//       } catch (error) {
//         console.error(`❌ Error fetching frequency for ${location}:`, error);
//       }
//     };

//     const interval = setInterval(fetchFrequency, 1000);
//     return () => clearInterval(interval);
//   }, [location]);

//   return latestData;
// };

// // SORT DATA USING TAG KEYS 10 READINGS (VERSION 2.1)
// import { useEffect, useState } from "react";

// const locationMapping: { [key: string]: string } = {
//   manchester: "M13 9PL",
//   scotland: "S23 9RW",
// };

// export const useLiveFrequency = (location: string = "manchester") => {
//   const [latestData, setLatestData] = useState<
//     { time: string; frequency: number }[]
//   >([]);

//   useEffect(() => {
//     const fetchFrequency = async () => {
//       try {
//         // ✅ Ensure we always send the correct tag key format
//         const influxLocation =
//           locationMapping[location.toLowerCase().trim()] || location;

//         console.log(`📡 Sending request for location: ${influxLocation}`); // ✅ Debugging log

//         const response = await fetch(
//           `http://127.0.0.1:5000/frequency/${encodeURIComponent(
//             influxLocation
//           )}`
//         );

//         if (!response.ok) {
//           if (response.status === 400) {
//             console.warn(
//               `⚠️ Invalid location requested: ${location} (${influxLocation})`
//             );
//           } else if (response.status === 404) {
//             console.warn(
//               `⚠️ No data available for ${location} (${influxLocation})`
//             );
//           }
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log(
//           `📡 Polled Frequency Data for ${location} (${influxLocation}):`,
//           data
//         );

//         if (!Array.isArray(data) || data.length === 0) {
//           console.warn(`⚠️ No data received for ${location}.`);
//           return;
//         }

//         const validatedData = data
//           .filter((item) => item.time && item.frequency !== undefined)
//           .map((item) => ({
//             time: new Date(item.time).toISOString(),
//             frequency: parseFloat(item.frequency) || 0,
//           }))
//           .reverse();

//         setLatestData(validatedData.slice(-100));
//       } catch (error) {
//         console.error(`❌ Error fetching frequency for ${location}:`, error);
//       }
//     };

//     const interval = setInterval(fetchFrequency, 1000);
//     return () => clearInterval(interval);
//   }, [location]);

//   return latestData;
// };

// // TIME-BASED DATA LONGPOLLING (VERSION 2.2)
// import { useEffect, useState } from "react";

// const locationMapping: { [key: string]: string } = {
//   manchester: "M13 9PL",
//   scotland: "S23 9RW",
// };

// export const useLiveFrequency = (location: string = "manchester") => {
//   const [latestData, setLatestData] = useState<
//     { time: string; frequency: number }[]
//   >([]);

//   useEffect(() => {
//     const fetchFrequency = async () => {
//       try {
//         const influxLocation = locationMapping[location.toLowerCase().trim()];
//         if (!influxLocation) {
//           console.warn(`⚠️ Invalid location: ${location}`);
//           return;
//         }

//         const encodedLocation = encodeURIComponent(influxLocation); // ✅ Encode properly
//         const apiUrl = `http://127.0.0.1:5000/frequency/${encodedLocation}`;

//         console.log(`🔎 Fetching API: ${apiUrl}`); // ✅ Log the request URL

//         const response = await fetch(apiUrl);

//         if (!response.ok) {
//           console.warn(
//             `⚠️ API returned ${response.status} for location ${encodedLocation}`
//           );
//           return;
//         }

//         const data = await response.json();
//         if (!Array.isArray(data) || data.length === 0) {
//           return;
//         }

//         const validatedData = data.map((item) => ({
//           time: new Date(item.time).toISOString(),
//           frequency: parseFloat(item.frequency) || 0,
//         }));

//         setLatestData(validatedData);
//       } catch (error) {
//         console.error(`❌ Error fetching frequency data:`, error);
//       }
//     };

//     const interval = setInterval(fetchFrequency, 1000);
//     return () => clearInterval(interval);
//   }, [location]);

//   return latestData;
// };

// TIME-BASED DATA LONGPOLLING + REFRESH GRAPH PLOT FOR NEW DATA (VERSION 2.2)
import { useEffect, useState } from "react";

const locationMapping: { [key: string]: string } = {
  manchester: "M13 9PL",
  scotland: "S23 9RW",
};

export const useLiveFrequency = (location: string = "manchester") => {
  const [latestData, setLatestData] = useState<
    { time: string; frequency: number }[]
  >([]);

  useEffect(() => {
    let isActive = true; // ✅ Used to prevent updating state after unmount

    const fetchFrequency = async () => {
      try {
        const influxLocation = locationMapping[location.toLowerCase().trim()];
        if (!influxLocation) {
          console.warn(`⚠️ Invalid location: ${location}`);
          return;
        }

        const encodedLocation = encodeURIComponent(influxLocation);
        const apiUrl = `http://127.0.0.1:5000/frequency/${encodedLocation}`;

        console.log(`🔎 Fetching API: ${apiUrl}`);

        const response = await fetch(apiUrl);

        if (!response.ok) {
          console.warn(
            `⚠️ API returned ${response.status} for location ${encodedLocation}`
          );
          return;
        }

        const data = await response.json();
        if (!Array.isArray(data) || data.length === 0) {
          return;
        }

        const validatedData = data.map((item) => ({
          time: new Date(item.time).toISOString(),
          frequency: parseFloat(item.frequency) || 0,
        }));

        if (isActive) {
          setLatestData(validatedData); // ✅ Reset with new data (does not merge)
        }
      } catch (error) {
        console.error(`❌ Error fetching frequency data:`, error);
      }
    };

    fetchFrequency(); // Fetch immediately when location changes
    const interval = setInterval(fetchFrequency, 1000);

    return () => {
      isActive = false; // ✅ Prevent state update if component unmounts
      clearInterval(interval);
    };
  }, [location]);

  return latestData;
};
