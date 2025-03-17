// // SORT DATA USING TAG KEYS 10 READINGS (VERSION 2.1)
// import React from "react";
// import { Line } from "react-chartjs-2";
// import { useLiveFrequency } from "../../dataquery/LongPolling"; // ✅ Fetch live frequency
// import "../../App.css";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler,
// } from "chart.js";

// // ✅ Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// );

// const Plot = ({ location }: { location: string }) => {
//   const dataList = useLiveFrequency(location).slice(-10).reverse(); // ✅ Reverse to ensure right-to-left plotting

//   if (dataList.length === 0) {
//     return <div className="loading-message">⏳ Loading frequency data...</div>;
//   }

//   // ✅ Extract time and frequency for chart display
//   const labels = dataList.map((entry) =>
//     entry.time.includes("T")
//       ? entry.time.split("T")[1].split(".")[0]
//       : "No Time"
//   );
//   const values = dataList.map((entry) => entry.frequency);

//   const chartData = {
//     labels,
//     datasets: [
//       {
//         label: `Live Frequency (Hz) - ${location.toUpperCase()}`,
//         data: values,
//         borderColor: "#00FFCC",
//         backgroundColor: "rgba(0, 255, 204, 0.2)",
//         borderWidth: 2,
//         fill: true, // ✅ Fill under the line for better visibility
//         pointBackgroundColor: "#FFCC00",
//         pointBorderColor: "#FFFFFF",
//         tension: 0.4, // ✅ Smooth scrolling effect
//       },
//     ],
//   };

//   return (
//     <div className="graph-container">
//       <h2 className="graph-title">
//         Live Frequency Graph for {location.toUpperCase()}
//       </h2>
//       <div className="graph-wrapper">
//         <Line
//           data={chartData}
//           options={{
//             animation: { duration: 0 },
//             responsive: true,
//             maintainAspectRatio: false,
//             elements: { line: { tension: 0.4 } },
//             interaction: {
//               mode: "nearest", // ✅ Always show nearest tooltip
//               intersect: false, // ✅ Allow hovering anywhere
//             },
//             plugins: {
//               legend: { labels: { color: "white" } },
//               tooltip: {
//                 enabled: true, // ✅ Enable tooltips anywhere
//                 mode: "index", // ✅ Show all tooltips when hovering
//                 intersect: false, // ✅ Make tooltips trigger anywhere on the graph
//                 position: "nearest", // ✅ Show tooltip for nearest data point
//                 callbacks: {
//                   label: (tooltipItem) => {
//                     const index = tooltipItem.dataIndex;
//                     return `Time: ${labels[index]}, Frequency: ${values[index]} Hz`;
//                   },
//                 },
//               },
//             },
//             scales: {
//               x: {
//                 reverse: true, // ✅ Flips the x-axis for right-to-left scrolling
//                 ticks: { color: "white" },
//                 grid: { color: "rgba(255,255,255,0.2)" },
//               },
//               y: {
//                 ticks: { color: "white" },
//                 grid: { color: "rgba(255,255,255,0.2)" },
//                 title: {
//                   display: true,
//                   text: "Frequency (Hz)",
//                   color: "white",
//                 },
//                 suggestedMin: 47,
//                 suggestedMax: 52,
//               },
//             },
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default Plot;

// // SORT DATA USING TAG KEYS 100 READINGS (VERSION 2.1)
// import React from "react";
// import { Line } from "react-chartjs-2";
// import { useLiveFrequency } from "../../dataquery/LongPolling"; // ✅ Fetch live frequency
// import "../../App.css";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler,
//   ChartOptions,
//   ChartData,
//   TooltipItem,
// } from "chart.js";

// // ✅ Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// );

// const GraphPlot = ({ location }: { location: string }) => {
//   const dataList = useLiveFrequency(location).slice(-100).reverse(); // ✅ Ensure last 100 readings

//   if (dataList.length === 0) {
//     return <div className="loading-message">⏳ Loading frequency data...</div>;
//   }

//   // ✅ Extract time and frequency for chart display
//   const labels: string[] = dataList.map((entry) =>
//     entry.time.includes("T")
//       ? entry.time.split("T")[1].split(".")[0]
//       : "No Time"
//   );
//   const values: number[] = dataList.map((entry) => entry.frequency);

//   // ✅ Chart data configuration with proper types
//   const chartData: ChartData<"line"> = {
//     labels,
//     datasets: [
//       {
//         label: `Live Frequency (Hz) - ${location.toUpperCase()}`,
//         data: values,
//         borderColor: "#00FFCC",
//         backgroundColor: "rgba(0, 255, 204, 0.2)",
//         borderWidth: 2,
//         fill: true, // ✅ Fill under the line for better visibility
//         pointBackgroundColor: "#FFCC00",
//         pointBorderColor: "#FFFFFF",
//         tension: 0.4, // ✅ Smooth scrolling effect
//       },
//     ],
//   };

// // ✅ Correctly typed Chart.js options
// const chartOptions: ChartOptions<"line"> = {
//   animation: { duration: 0 },
//   responsive: true,
//   maintainAspectRatio: false,
//   elements: { line: { tension: 0.4 } },
//   interaction: {
//     mode: "index", // ✅ Updated for Chart.js v4
//     intersect: false,
//   },
//   plugins: {
//     legend: {
//       labels: {
//         color: "white",
//       },
//     },
//     tooltip: {
//       enabled: true,
//       mode: "index",
//       intersect: false,
//       position: "nearest",
//       callbacks: {
//         label: (context: TooltipItem<"line">) => {
//           const index = context.dataIndex;
//           return `Time: ${labels[index]}, Frequency: ${values[index]} Hz`;
//         },
//       },
//     },
//   },
//   scales: {
//     x: {
//       reverse: true, // ✅ Correct fix (instead of `rtl`)
//       ticks: { color: "white" },
//       grid: { color: "rgba(255,255,255,0.2)" },
//     },
//     y: {
//       ticks: { color: "white" },
//       grid: { color: "rgba(255,255,255,0.2)" },
//       title: {
//         display: true,
//         text: "Frequency (Hz)",
//         color: "white",
//       },
//       suggestedMin: 47,
//       suggestedMax: 52,
//     },
//   },
// };

//   return (
//     <div className="graph-container">
//       <h2 className="graph-title">
//         Live Frequency Graph for {location.toUpperCase()}
//       </h2>
//       <div className="graph-wrapper">
//         <Line data={chartData} options={chartOptions} />
//       </div>
//     </div>
//   );
// };

// export default GraphPlot;

// // TIME-BASED GRAPH PLOTTING (VERSION 2.2)
// import React from "react";
// import { Line } from "react-chartjs-2";
// import { useLiveFrequency } from "../../dataquery/LongPolling"; // ✅ Fetch live frequency
// import "../../App.css";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler,
//   ChartOptions,
//   ChartData,
//   TooltipItem,
// } from "chart.js";

// // ✅ Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// );

// const GraphPlot = ({ location }: { location: string }) => {
//   const dataList = useLiveFrequency(location);

//   if (dataList.length === 0) {
//     return <div className="loading-message">⏳ Loading frequency data...</div>;
//   }

//   // ✅ Extract time (HH:MM:SS) for X-axis
//   const labels: string[] = dataList.map((entry) =>
//     new Date(entry.time).toLocaleTimeString("en-GB", { hour12: false })
//   );

//   const values: number[] = dataList.map((entry) => entry.frequency);

//   // ✅ Chart data with gradient background
//   const chartData: ChartData<"line"> = {
//     labels,
//     datasets: [
//       {
//         label: `Live Frequency (Hz) - ${location.toUpperCase()}`,
//         data: values,
//         borderColor: "#00FFCC",
//         backgroundColor: "rgba(0, 255, 204, 0.4)", // ✅ Smoother gradient effect
//         borderWidth: 3,
//         fill: true,
//         pointRadius: 3,
//         pointHoverRadius: 5,
//         pointBackgroundColor: "#FFCC00",
//         pointBorderColor: "#FFFFFF",
//         tension: 0.35, // ✅ Even smoother line movement
//       },
//     ],
//   };

//   // ✅ Smooth animation and enhanced UI settings
//   const chartOptions: ChartOptions<"line"> = {
//     animation: {
//       duration: 0, // ✅ Smooth updates instead of instant jumps
//       easing: "easeInOutQuad", // ✅ More natural motion
//     },
//     responsive: true,
//     maintainAspectRatio: false,
//     elements: {
//       line: { tension: 0.35 }, // ✅ Smooth curves
//     },
//     interaction: {
//       mode: "index", // ✅ Show all data points on hover
//       intersect: false,
//     },
//     plugins: {
//       legend: {
//         labels: {
//           color: "white",
//           font: {
//             size: 14,
//             weight: "bold",
//           },
//         },
//       },
//       tooltip: {
//         enabled: true,
//         mode: "index",
//         intersect: false,
//         backgroundColor: "rgba(0, 0, 0, 0.8)",
//         titleColor: "white",
//         bodyColor: "#00FFCC",
//         padding: 10,
//         borderColor: "#00FFCC",
//         borderWidth: 1,
//         callbacks: {
//           label: (context: TooltipItem<"line">) => {
//             const index = context.dataIndex;
//             return `Time: ${labels[index]}, Frequency: ${values[index]} Hz`;
//           },
//         },
//       },
//     },
//     scales: {
//       x: {
//         type: "category",
//         ticks: {
//           color: "white",
//           font: {
//             size: 12,
//           },
//           maxRotation: 45,
//           minRotation: 45,
//         },
//         grid: {
//           color: "rgba(255,255,255,0.1)",
//         },
//       },
//       y: {
//         ticks: {
//           color: "white",
//           font: {
//             size: 12,
//           },
//         },
//         grid: {
//           color: "rgba(255,255,255,0.1)",
//         },
//         title: {
//           display: true,
//           text: "Frequency (Hz)",
//           color: "#00FFCC",
//           font: {
//             size: 14,
//             weight: "bold",
//           },
//         },
//         suggestedMin: 47,
//         suggestedMax: 52,
//       },
//     },
//   };

//   return (
//     <div className="graph-container">
//       <h2 className="graph-title">
//         Live Frequency Graph for {location.toUpperCase()}
//       </h2>
//       <div className="graph-wrapper">
//         <Line data={chartData} options={chartOptions} />
//       </div>
//     </div>
//   );
// };

// export default GraphPlot;

// TIME-BASED DATA LONGPOLLING + REFRESH GRAPH PLOT FOR NEW DATA (VERSION 2.2)
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useLiveFrequency } from "../../dataquery/LongPolling"; // ✅ Fetch live frequency
import "../../App.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  ChartData,
  TooltipItem,
} from "chart.js";

// ✅ Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const GraphPlot = ({ location }: { location: string }) => {
  const [graphData, setGraphData] = useState<{
    labels: string[];
    values: number[];
  }>({
    labels: [],
    values: [],
  });

  const dataList = useLiveFrequency(location);

  useEffect(() => {
    // ✅ Reset graph data when location changes
    setGraphData({ labels: [], values: [] });

    if (dataList.length > 0) {
      const labels = dataList.map((entry) =>
        new Date(entry.time).toLocaleTimeString("en-GB", { hour12: false })
      );

      const values = dataList.map((entry) => entry.frequency);

      setGraphData({ labels, values });
    }
  }, [location, dataList]);

  if (graphData.labels.length === 0) {
    return <div className="loading-message">⏳ Loading frequency data...</div>;
  }

  const chartData: ChartData<"line"> = {
    labels: graphData.labels,
    datasets: [
      {
        label: `Live Frequency (Hz) - ${location.toUpperCase()}`,
        data: graphData.values,
        borderColor: "#00FFCC",
        backgroundColor: "rgba(0, 255, 204, 0.4)", // ✅ Smoother gradient effect
        borderWidth: 3,
        fill: true,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: "#FFCC00",
        pointBorderColor: "#FFFFFF",
        tension: 0.35, // ✅ Even smoother line movement
      },
    ],
  };

  const chartOptions: ChartOptions<"line"> = {
    animation: {
      duration: 0,
      easing: "easeInOutQuad",
    },
    responsive: true,
    maintainAspectRatio: false,
    elements: { line: { tension: 0.35 } },
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        labels: {
          color: "white",
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "white",
        bodyColor: "#00FFCC",
        padding: 10,
        borderColor: "#00FFCC",
        borderWidth: 1,
        callbacks: {
          label: (context: TooltipItem<"line">) => {
            const index = context.dataIndex;
            return `Time: ${graphData.labels[index]}, Frequency: ${graphData.values[index]} Hz`;
          },
        },
      },
    },
    scales: {
      x: {
        type: "category",
        ticks: {
          color: "white",
          font: {
            size: 12,
          },
          maxRotation: 45,
          minRotation: 45,
        },
        grid: {
          color: "rgba(255,255,255,0.1)",
        },
      },
      y: {
        ticks: {
          color: "white",
          font: {
            size: 12,
          },
        },
        grid: {
          color: "rgba(255,255,255,0.1)",
        },
        title: {
          display: true,
          text: "Frequency (Hz)",
          color: "#00FFCC",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        suggestedMin: 47,
        suggestedMax: 52,
      },
    },
  };

  return (
    <div className="graph-container">
      <h2 className="graph-title">
        Live Frequency Graph for {location.toUpperCase()}
      </h2>
      <div className="graph-wrapper">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default GraphPlot;
