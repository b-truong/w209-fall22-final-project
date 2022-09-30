/** @jsxImportSource @emotion/react */

import React from "react";
import { Box, Divider, Paper, useTheme } from "@mui/material";

import getStyles from "./Page.styles";
import Navbar from "./Navbar";

/**
 * Page wrapper component to provide headers, footers, etc.
 */
const Page: React.FC<React.PropsWithChildren> = ({ children }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <Paper elevation={0} square css={styles.paper}>
      <Navbar />
      <Divider css={styles.divider} />
      {children}
    </Paper>
  );
};

export default Page;
