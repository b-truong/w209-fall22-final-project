/** @jsxImportSource @emotion/react */

import { ThemeProvider } from "@mui/material/styles";
import { Box, CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import FighterProfiles from "./FighterProfiles";
import Home from "./Home";
import Navbar from "./Navbar";
import NotFound from "./NotFound";
import { materialheme } from "./theme";
import { DataProvider } from "./DataProvider";
import Observer from "./Observer";
import { ServiceWorkerEvents } from "../service-register";
import UpdateToasts from "./UpdateToasts";
import RedBlue from "./RedBlue";
import Matches from "./Matches";
import Locations from "./Locations";

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
        <BrowserRouter>
          <UpdateToasts swEventObserver={swEventObserver} />
          <Navbar />
          <Box height="100vh" paddingTop="64px" boxSizing="border-box">
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path="/fightclub" element={<Home />} />
              <Route
                path="/fightclub/fighters/:fighterName"
                element={<FighterProfiles />}
              />
              <Route path="/fightclub/matches" element={<Matches />} />
              <Route path="/fightclub/locations" element={<Locations />} />
              <Route path="/fightclub/corners" element={<RedBlue />} />
              <Route path="/fightclub/fighters" element={<FighterProfiles />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </DataProvider>
    </ThemeProvider>
  );
};

export default App;
