/** @jsxImportSource @emotion/react */

import { ThemeProvider, createTheme, ThemeOptions } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./Home";
import NotFound from "./NotFound";

const theme: ThemeOptions = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#303030",
      paper: "#424242",
    },
    primary: {
      main: "#c62828",
    },
    secondary: {
      main: "#9e9e9e",
    },
    error: {
      main: "#f50057",
    },
  },
  typography: {
    fontFamily: "Roboto Flex",
    h1: {
      fontFamily: "Oswald",
    },
    h2: {
      fontFamily: "Oswald",
    },
    h3: {
      fontFamily: "Oswald",
    },
    h4: {
      fontFamily: "Oswald",
    },
    h5: {
      fontFamily: "Oswald",
    },
    h6: {
      fontFamily: "Oswald",
    },
    button: {
      fontFamily: "Oswald",
    },
    overline: {
      fontFamily: "Oswald",
    },
  },
});

/**
 * App component to instantiate global providers and page routes
 */
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
