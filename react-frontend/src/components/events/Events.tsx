// // TRIGGERING AN ALERT AT TOP (VERSION 2.1)
// import React, { useState, useEffect } from "react";
// import { useLiveFrequency } from "../../dataquery/LongPolling";
// import "../../App.css"; // Import external CSS

// interface FrequencyData {
//   time: string;
//   frequency: number;
// }

// const Events: React.FC = () => {
//   const [location, setLocation] = useState<string>("manchester"); // Default location
//   const liveData: FrequencyData[] = useLiveFrequency(location); // Fetch data from LongPolling.tsx
//   const [alertTriggered, setAlertTriggered] = useState<boolean>(false); // Prevent duplicate alerts

//   // Monitor frequency changes
//   useEffect(() => {
//     if (liveData.length > 0) {
//       const latestFrequency = liveData[liveData.length - 1].frequency;

//       if (
//         (latestFrequency > 50.2 || latestFrequency < 49.8) &&
//         !alertTriggered
//       ) {
//         alert(`⚠️ Alert! Frequency out of range: ${latestFrequency} Hz`);
//         setAlertTriggered(true); // Avoid continuous alerts
//       } else if (latestFrequency >= 49.8 && latestFrequency <= 50.2) {
//         setAlertTriggered(false); // Reset alert trigger when frequency is back to normal
//       }
//     }
//   }, [liveData, alertTriggered]);

//   return (
//     <div className="events-container">
//       <h1>Live Frequency Data</h1>

//       {/* ✅ Added a label to fix the accessibility issue */}
//       <label htmlFor="location-select" className="location-label">
//         Select Location:
//       </label>
//       <select
//         id="location-select"
//         className="location-select"
//         value={location}
//         onChange={(e) => setLocation(e.target.value)}
//       >
//         <option value="manchester">Manchester</option>
//         <option value="scotland">Scotland</option>
//       </select>

//       <ul className="frequency-list">
//         {liveData.map((item, index) => (
//           <li key={index} className="frequency-item">
//             {item.time} - {item.frequency} Hz
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Events;

// CONTAINS A BOX SECTION DISPLAYING THE ALERTS (VERSION 2.1)
// import React, { useEffect, useState } from "react";
// import { useLiveFrequency } from "../../dataquery/LongPolling";
// import "../../App.css"; // Import external CSS

// interface FrequencyData {
//   time: string;
//   frequency: number;
// }

// // Function to format time as HH:MM:SS:SS
// const formatTime = (isoTime: string): string => {
//   const date = new Date(isoTime);
//   const hours = date.getHours().toString().padStart(2, "0");
//   const minutes = date.getMinutes().toString().padStart(2, "0");
//   const seconds = date.getSeconds().toString().padStart(2, "0");
//   const milliseconds = (date.getMilliseconds() / 10)
//     .toFixed(0)
//     .padStart(2, "0"); // Convert to 2-digit format

//   return `${hours}:${minutes}:${seconds}:${milliseconds}`;
// };

// const Events: React.FC<{ selectedLocation: string }> = ({
//   selectedLocation,
// }) => {
//   const liveData: FrequencyData[] = useLiveFrequency(selectedLocation); // Fetch data based on map selection
//   const [outOfRangeFrequency, setOutOfRangeFrequency] =
//     useState<FrequencyData | null>(null);

//   // Monitor frequency changes
//   useEffect(() => {
//     if (liveData.length > 0) {
//       const latestData = liveData[liveData.length - 1];

//       if (latestData.frequency > 50.2 || latestData.frequency < 49.8) {
//         setOutOfRangeFrequency(latestData);
//       } else {
//         setOutOfRangeFrequency(null); // Reset when within range
//       }
//     }
//   }, [liveData]);

//   return (
//     <div className="events-container">
//       <h1>Live Frequency Data</h1>

//       {/* Show Selected Location */}
//       <p className="selected-location">Current Location: {selectedLocation}</p>

//       {/* Frequency List */}
//       <ul className="frequency-list">
//         {liveData.map((item, index) => (
//           <li key={index} className="frequency-item">
//             {formatTime(item.time)} - {item.frequency} Hz
//           </li>
//         ))}
//       </ul>

//       {/* Alert Box for Out of Range Frequencies */}
//       {outOfRangeFrequency && (
//         <div className="alert-box">
//           <p>
//             <strong>⚠️ Frequency Alert!</strong>
//           </p>
//           <p>Time: {formatTime(outOfRangeFrequency.time)}</p>
//           <p>Frequency: {outOfRangeFrequency.frequency} Hz</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Events;

// EVENTS DISPLAY A LIST OF FREQUENCY READINGS + INDEX NUMBER (VERSION 2.2)
import React, { useEffect, useState } from "react";
import { useLiveFrequency } from "../../dataquery/LongPolling";
import "../../App.css"; // Import external CSS

interface FrequencyData {
  time: string;
  frequency: number;
}

// Function to format time as HH:MM:SS:SS
const formatTime = (isoTime: string): string => {
  const date = new Date(isoTime);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const milliseconds = (date.getMilliseconds() / 10)
    .toFixed(0)
    .padStart(2, "0"); // Convert to 2-digit format

  return `${hours}:${minutes}:${seconds}:${milliseconds}`;
};

const Events: React.FC<{ selectedLocation: string }> = ({
  selectedLocation,
}) => {
  const liveData: FrequencyData[] = useLiveFrequency(selectedLocation); // Fetch data based on map selection
  const [outOfRangeFrequency, setOutOfRangeFrequency] =
    useState<FrequencyData | null>(null);

  // Monitor frequency changes
  useEffect(() => {
    if (liveData.length > 0) {
      const latestData = liveData[liveData.length - 1];

      if (latestData.frequency > 50.2 || latestData.frequency < 49.8) {
        setOutOfRangeFrequency(latestData);
      } else {
        setOutOfRangeFrequency(null); // Reset when within range
      }
    }
  }, [liveData]);

  return (
    <div className="events-container">
      <h1>Live Frequency Data</h1>

      {/* Show Selected Location */}
      <p className="selected-location">Current Location: {selectedLocation}</p>

      {/* Total Readings Display */}
      <p className="total-readings">
        📊 Total Readings Displayed: <strong>{liveData.length}</strong>
      </p>

      {/* Frequency List with Index Numbers */}
      <ul className="frequency-list">
        {liveData.map((item, index) => (
          <li key={index} className="frequency-item">
            <strong>#{index + 1}</strong> → {formatTime(item.time)} -{" "}
            {item.frequency} Hz
          </li>
        ))}
      </ul>

      {/* Alert Box for Out of Range Frequencies */}
      {outOfRangeFrequency && (
        <div className="alert-box">
          <p>
            <strong>⚠️ Frequency Alert!</strong>
          </p>
          <p>Time: {formatTime(outOfRangeFrequency.time)}</p>
          <p>Frequency: {outOfRangeFrequency.frequency} Hz</p>
        </div>
      )}
    </div>
  );
};

export default Events;
