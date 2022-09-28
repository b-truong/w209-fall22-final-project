/** @jsxImportSource @emotion/react */

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./Home";
import NotFound from "./NotFound";

const App = () => {
  return (
    <ThemeProvider theme={createTheme()}>
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
