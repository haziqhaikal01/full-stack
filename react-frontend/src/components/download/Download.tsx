// DOWNLOAD DATA FOR A SPECIFIC PERIOD OF TIME (VERSION 2.1, 2.2)
import React, { useState, useEffect } from "react";
import "../../app.css"; // Import external CSS file

type DownloadProps = {
  selectedLocation: string;
};

const Download: React.FC<DownloadProps> = ({ selectedLocation }) => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    setErrorMessage(""); // Reset error when location changes
  }, [selectedLocation]);

  const fetchDataLongPolling = async () => {
    if (!startDate || !endDate || !selectedLocation) {
      setErrorMessage("Please select a start date, end date, and location.");
      return;
    }

    setIsDownloading(true);
    setErrorMessage("");

    const startFormatted = new Date(startDate).toISOString();
    const endFormatted = new Date(endDate).toISOString();

    const url = `http://127.0.0.1:5000/fetch-data?start=${encodeURIComponent(
      startFormatted
    )}&end=${encodeURIComponent(endFormatted)}&location=${encodeURIComponent(
      selectedLocation
    )}`;

    try {
      console.log(`📡 Sending request to: ${url}`);

      const response = await fetch(url);

      if (response.ok) {
        console.log("✅ Data found! Downloading...");
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", `influx-data-${selectedLocation}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setIsDownloading(false);
        return;
      } else if (response.status === 404) {
        console.warn("⚠️ No data found for the selected range.");
        setErrorMessage("No data found for the selected range and location.");
        setIsDownloading(false);
      } else {
        console.error("❌ Server error occurred.");
        setErrorMessage("An error occurred while fetching data.");
        setIsDownloading(false);
      }
    } catch (error) {
      console.error("❌ Fetch failed:", error);
      setErrorMessage("Failed to fetch data. Please try again.");
      setIsDownloading(false);
    }
  };

  return (
    <div className="container">
      <h2>
        Selected Location:{" "}
        {selectedLocation ? selectedLocation.toUpperCase() : "None"}
      </h2>

      <div className="input-container">
        <label htmlFor="start-date">Start date and time:</label>
        <input
          id="start-date"
          type="datetime-local"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="input-field"
          required
        />
      </div>

      <div className="input-container">
        <label htmlFor="end-date">End date and time:</label>
        <input
          id="end-date"
          type="datetime-local"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="input-field"
          required
        />
      </div>

      <button
        onClick={fetchDataLongPolling}
        className="download-button"
        disabled={isDownloading}
      >
        {isDownloading ? "Downloading..." : "Download Data"}
      </button>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Download;
