/** @jsxImportSource @emotion/react */

import { Stack } from "@mui/material";
import TableauVizBox from "./TableauVizBox";

/**
 * Display aggregate performance data for Red / Blue fighters
 */
const RedBlue = () => {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
    >
      <TableauVizBox url="https://public.tableau.com/views/w209_Project_EDA/Dashboard1" />
    </Stack>
  );
};

export default RedBlue;
