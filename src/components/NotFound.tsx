/** @jsxImportSource @emotion/react */

import { Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

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
      <Stack justifyContent="center" alignItems="center" mt={6}>
        <Button variant="contained" component={Link} to="/fightclub">
          GO TO HOME
        </Button>
      </Stack>
    </Stack>
  );
};

export default NotFound;
