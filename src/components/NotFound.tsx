/** @jsxImportSource @emotion/react */

import { Typography } from "@mui/material";

import Page from "./Page";

/**
 * Page to display if users enter a bad URL
 */
const NotFound = () => {
  return (
    <Page>
      <Typography>Page not found!</Typography>
    </Page>
  );
};

export default NotFound;
