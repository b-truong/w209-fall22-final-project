/** @jsxImportSource @emotion/react */

import { Container, Stack } from "@mui/material";
import TableauVizBox from "./TableauVizBox";

/**
 * Display analysis of match results
 */
const Matches = () => {
  return (
    <Container maxWidth="md">
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        mt={2}
      >
        <TableauVizBox url="https://public.tableau.com/views/Hypothesis2Project/Dashboard3" />
      </Stack>
    </Container>
  );
};

export default Matches;
