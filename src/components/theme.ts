import { createTheme, Theme, ThemeOptions } from "@mui/material/styles";
import { FontWeight } from "vega";
import { TopLevelSpec } from "vega-lite";

// Custom Material UI
export const materialheme: ThemeOptions = createTheme({
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

// Vega configuration
export const getVegaConfig = (theme: Theme): TopLevelSpec["config"] => {
  const fontSettings = {
    labelFont: theme.typography.fontFamily,
    titleFont: theme.typography.fontFamily,
    labelColor: "white",
    titleColor: "white",
    labelFontSize: 10,
    titleFontSize: 14,
    titleFontWeight: "normal" as FontWeight,
  };
  return {
    axis: {
      ...fontSettings,
      tickColor: "rgba(255, 255, 255, 0.2)",
      gridColor: "rgba(255, 255, 255, 0.2)",
      domainColor: "rgba(255, 255, 255, 0.2)",
    },
    legend: {
      ...fontSettings,
    },
    header: {
      ...fontSettings,
    },
    mark: {
      font: theme.typography.fontFamily,
      color: theme.palette.primary.main,
    },
    title: {
      font: theme.typography.fontFamily,
      subtitleFont: theme.typography.fontFamily,
    },
  };
};
