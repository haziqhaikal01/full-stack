// // SORT DATA USING TAG KEYS (VERSION 2.1)
// import React, { useState } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import Sidebar from "./components/sidebar/Sidebar";
// import GBMap from "./components/map/Map";
// import LiveMeter from "./components/livemeter/LiveMeter";
// import Graph from "./components/graph/GraphPlot";
// import ButtonServer from "./components/download/Download";
// import Events from "./components/events/Events";
// import "./App.css";

// const App: React.FC = () => {
//   const [selectedLocation, setSelectedLocation] =
//     useState<string>("manchester");

//   return (
//     <Router>
//       <div className="app-container">
//         <Sidebar />
//         <div className="content-layout">
//           <GBMap setSelectedLocation={setSelectedLocation} />
//           <Routes>
//             <Route path="/" element={<Navigate to="/location/manchester" />} />
//             <Route
//               path="/location/:id"
//               element={<LiveMeter location={selectedLocation} />}
//             />
//           </Routes>

//           <div className="graph-section">
//             <Graph location={selectedLocation} />
//             <div className="downloadbuton-container">
//               <h1>Download InfluxDB Data</h1>
//               <ButtonServer selectedLocation={selectedLocation} />
//             </div>
//             <Events selectedLocation={selectedLocation} />
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default App;

// REARRANGE WEBSITE LAYOUT (VERSION 2.1, 2.2)
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import GBMap from "./components/map/Map";
import LiveMeter from "./components/livemeter/LiveMeter";
import Graph from "./components/graph/GraphPlot";
import ButtonServer from "./components/download/Download";
import Events from "./components/events/Events";
import "./App.css";

const App: React.FC = () => {
  const [selectedLocation, setSelectedLocation] =
    useState<string>("manchester");

  return (
    <Router>
      <div className="react-app">
        <Sidebar />

        {/* ✅ Two-Column Layout for Left (Map + LiveMeter) and Right (Graph, Events, Downloads) */}
        <div className="main-content">
          {/* ✅ Left Column: Map + LiveMeter */}
          <div className="left-column">
            <GBMap setSelectedLocation={setSelectedLocation} />
            <Routes>
              <Route
                path="/"
                element={<Navigate to="/location/manchester" />}
              />
              <Route
                path="/location/:id"
                element={<LiveMeter location={selectedLocation} />}
              />
            </Routes>
          </div>

          {/* ✅ Right Column: Graph + Events + Download */}
          <div className="right-column">
            <Graph location={selectedLocation} />
            <div className="download-button-container">
              <h1>Download InfluxDB Data</h1>
              <ButtonServer selectedLocation={selectedLocation} />
            </div>
            <Events selectedLocation={selectedLocation} />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
