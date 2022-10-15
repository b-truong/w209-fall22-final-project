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

/**
 * App component to instantiate global providers and page routes
 */
const App = () => {
  return (
    <ThemeProvider theme={materialheme}>
      <CssBaseline enableColorScheme />
      <DataProvider>
        <BrowserRouter>
          <Navbar />
          <Box height="100vh" paddingTop="64px" boxSizing="border-box">
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<Home />} />
              <Route
                path="/fighters/:fighterName"
                element={<FighterProfiles />}
              />
              <Route path="/fighters" element={<FighterProfiles />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </DataProvider>
    </ThemeProvider>
  );
};

export default App;
