/** @jsxImportSource @emotion/react */

import React from "react";
import { Box, Divider, Paper, useTheme } from "@mui/material";

import getStyles from "./Page.styles";
import Navbar from "./Navbar";

/**
 * Page wrapper component to provide headers, footers, etc.
 */
const Page: React.FC<React.PropsWithChildren> = ({ children }) => {
  const styles = getStyles();
  return (
    <>
      <Navbar />
      <Box css={styles.page}>{children}</Box>
    </>
  );
};

export default Page;
