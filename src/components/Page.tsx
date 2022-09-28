/** @jsxImportSource @emotion/react */

import React from "react";
import { Box, Divider, Typography, useTheme } from "@mui/material";

import getStyles from "./Page.styles";

/**
 * Page wrapper component to provide headers, footers, etc.
 */
const Page: React.FC<React.PropsWithChildren> = ({ children }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <Box>
      <Typography variant="h3" css={styles.header}>
        Fight Club
      </Typography>
      <Divider css={styles.divider} />
      {children}
    </Box>
  );
};

export default Page;
