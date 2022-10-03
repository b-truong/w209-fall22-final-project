/** @jsxImportSource @emotion/react */

import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import FighterProfiles from "./FighterProfiles";
import Home from "./Home";
import Navbar from "./Navbar";
import NotFound from "./NotFound";
import theme from "./theme";

/**
 * App component to instantiate global providers and page routes
 */
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Box height="100vh" paddingTop="64px" boxSizing="border-box">
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/fighters" element={<FighterProfiles />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
