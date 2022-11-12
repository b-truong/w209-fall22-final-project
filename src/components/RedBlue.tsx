/** @jsxImportSource @emotion/react */

import { Container, Stack } from "@mui/material";
import TableauVizBox from "./TableauVizBox";

/**
 * Display aggregate performance data for Red / Blue fighters
 */
const RedBlue = () => {
  return (
    <Container maxWidth="md">
      <Stack direction="column" justifyContent="center" alignItems="center">
        <TableauVizBox url="https://public.tableau.com/views/w209_Project_EDA/Dashboard1" />
      </Stack>
    </Container>
  );
};

export default RedBlue;
