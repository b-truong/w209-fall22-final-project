/** @jsxImportSource @emotion/react */

import { Stack } from "@mui/material";
import TableauVizBox from "./TableauVizBox";

/**
 * Display analysis of match results
 */
const Matches = () => {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
    >
      <TableauVizBox url="https://public.tableau.com/views/Hypothesis2Project/Dashboard3" />
    </Stack>
  );
};

export default Matches;
