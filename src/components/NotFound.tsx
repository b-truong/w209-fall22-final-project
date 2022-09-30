/** @jsxImportSource @emotion/react */

import { Stack, Typography } from "@mui/material";

/**
 * Page to display if users enter a bad URL
 */
const NotFound = () => {
  return (
    <Stack direction="column" justifyContent="center" height="100%">
      <Typography variant="h1" textAlign="center" color="white">
        404
      </Typography>
      <Typography variant="h4" textAlign="center" color="white" mt={4}>
        PAGE NOT FOUND
      </Typography>
    </Stack>
  );
};

export default NotFound;
