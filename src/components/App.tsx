/** @jsxImportSource @emotion/react */

import { ThemeProvider } from "@mui/material/styles";
import { Box, CssBaseline } from "@mui/material";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";

import FighterProfiles from "./FighterProfiles";
import Home from "./Home";
import Navbar from "./Navbar";
import NotFound from "./NotFound";
import { materialheme } from "./theme";
import { DataProvider } from "./DataProvider";
import Observer from "./Observer";
import { ServiceWorkerEvents } from "../service-register";
import UpdateToasts from "./UpdateToasts";
import Matches from "./Matches";
import Locations from "./Locations";
import Prediction from "./Prediction";

interface IApp {
  swEventObserver: Observer<ServiceWorkerEvents>;
}

/**
 * App component to instantiate global providers and page routes
 */
const App: React.FC<IApp> = ({ swEventObserver }) => {
  return (
    <ThemeProvider theme={materialheme}>
      <CssBaseline enableColorScheme />
      <DataProvider>
        <HashRouter>
          <UpdateToasts swEventObserver={swEventObserver} />
          <Navbar />
          <Box height="100vh" paddingTop="64px" boxSizing="border-box">
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
              <Route
                path="/fighters/:fighterName"
                element={<FighterProfiles />}
              />
              <Route path="/predict/:fighterName" element={<Prediction />} />
              <Route path="/matches" element={<Matches />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/fighters" element={<FighterProfiles />} />
              <Route path="/predict" element={<Prediction />} />
            </Routes>
          </Box>
        </HashRouter>
      </DataProvider>
    </ThemeProvider>
  );
};

export default App;
