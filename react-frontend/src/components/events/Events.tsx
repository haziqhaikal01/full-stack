// TIME-BASED DATA PLOT (VERSION 3.1)
import React, { useEffect, useState } from "react";
import { useLiveFrequency } from "../../dataquery/LongPolling";
import "../../App.css";

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
  const milliseconds = Math.floor(date.getMilliseconds() / 10)
    .toString()
    .padStart(2, "0"); // Convert to 2-digit format
  return `${hours}:${minutes}:${seconds}:${milliseconds}`;
};

const Events: React.FC<{ selectedLocation: string; totalReadings: number }> = ({
  selectedLocation,
  totalReadings,
}) => {
  // ✅ Fix: Destructure correctly
  const { latestData, loading } = useLiveFrequency(selectedLocation, 1);
  const [outOfRangeFrequency, setOutOfRangeFrequency] =
    useState<FrequencyData | null>(null);

  // Monitor frequency changes for out-of-range alerts
  useEffect(() => {
    if (latestData.length > 0) {
      const latestDataPoint = latestData[latestData.length - 1];
      if (
        latestDataPoint.frequency > 50.2 ||
        latestDataPoint.frequency < 49.8
      ) {
        setOutOfRangeFrequency(latestDataPoint);
      } else {
        setOutOfRangeFrequency(null); // Reset when back in range
      }
    }
  }, [latestData]);

  return (
    <div className="events-container">
      <h1>Live Frequency Data</h1>

      {/* Show Selected Location */}
      <p className="selected-location">Current Location: {selectedLocation}</p>

      {/* Show loading state */}
      {loading ? (
        <p className="loading-message">⏳ Loading data...</p>
      ) : (
        <>
          {/* Total Readings Display */}
          <p className="total-readings">
            📊 Total Readings Displayed: <strong>{totalReadings}</strong>
          </p>

          {/* Frequency List with Index Numbers */}
          <ul className="frequency-list">
            {latestData.length > 0
              ? latestData.map((item, index) => (
                  <li key={index} className="frequency-item">
                    <strong>#{index + 1}</strong> → {formatTime(item.time)} -{" "}
                    {item.frequency} Hz
                  </li>
                ))
              : null}
          </ul>

          {/* No data available message */}
          {latestData.length === 0 && <p>⚠️ No data available...</p>}

          {/* Alert Box for Out-of-Range Frequencies */}
          {outOfRangeFrequency && (
            <div className="alert-box">
              <p>
                <strong>⚠️ Frequency Alert!</strong>
              </p>
              <p>Time: {formatTime(outOfRangeFrequency.time)}</p>
              <p>Frequency: {outOfRangeFrequency.frequency} Hz</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Events;
