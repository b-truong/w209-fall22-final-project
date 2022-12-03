/** @jsxImportSource @emotion/react */

import { Container, Stack } from "@mui/material";
import { useEffect } from "react";
import TableauVizBox from "./TableauVizBox";

/**
 * Display analysis of match results
 */
const Matches = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <Container maxWidth="md">
      <Stack direction="column" justifyContent="center" alignItems="center">
        <TableauVizBox url="https://public.tableau.com/views/Hypothesis2Project/Dashboard4" />
      </Stack>
    </Container>
  );
};

export default Matches;
