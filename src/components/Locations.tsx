/** @jsxImportSource @emotion/react */

import { Container, Stack } from "@mui/material";
import { useEffect } from "react";
import TableauVizBox from "./TableauVizBox";

/**
 * Display analysis of match locations
 */
const Locations = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <Container maxWidth="md">
      <Stack direction="column" justifyContent="center" alignItems="center">
        <TableauVizBox url="https://public.tableau.com/views/UFCEvents/UFCEvents" />
      </Stack>
    </Container>
  );
};

export default Locations;
