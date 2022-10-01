import { createTheme, ThemeOptions } from "@mui/material/styles";

// Custom Material UI
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

export default theme;
