// TIME-BASED DATA PLOT (VERSION 3.1)
import React from "react";
import { useLiveFrequency } from "../../dataquery/LongPolling"; // ✅ Fetch live frequency
import GaugeChart from "react-gauge-chart";
import "../../App.css";

const LiveMeter = ({ location }: { location: string }) => {
  const { latestData, loading } = useLiveFrequency(location, 1); // ✅ Destructure correctly

  // ✅ Check if we have data
  const latestFrequency =
    latestData.length > 0 ? latestData[latestData.length - 1].frequency : null;

  // ✅ Ensure frequency is always a valid number
  const displayFrequency =
    typeof latestFrequency === "number" && !isNaN(latestFrequency)
      ? latestFrequency.toFixed(3)
      : "Waiting...";

  // ✅ Normalize frequency for gauge chart
  const minFreq = 49.8;
  const maxFreq = 50.2;
  const normalizedValue =
    latestFrequency !== null && typeof latestFrequency === "number"
      ? (latestFrequency - minFreq) / (maxFreq - minFreq)
      : 0.5; // Default to mid-range if undefined

  return (
    <div className="live-meter-container">
      <h2 className="meter-title">
        Live Frequency Meter - {location.toUpperCase()}
      </h2>
      {loading ? (
        <div className="loading-message">⏳ Loading...</div>
      ) : (
        <GaugeChart
          id="gauge-chart"
          nrOfLevels={20}
          percent={Math.min(Math.max(normalizedValue, 0), 1)}
          colors={["#ff0000", "#00ff00", "#ff0000"]}
          arcWidth={0.3}
          textColor="#fff"
          needleColor="#000"
          formatTextValue={() => displayFrequency}
        />
      )}
    </div>
  );
};

export default LiveMeter;
