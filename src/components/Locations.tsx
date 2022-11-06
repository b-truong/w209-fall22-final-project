/** @jsxImportSource @emotion/react */

import { Container, Stack, Tab, Tabs } from "@mui/material";
import { useCallback, useState } from "react";
import TableauVizBox from "./TableauVizBox";

/**
 * Display analysis of match locations
 */
const Locations = () => {
  const [tab, setTab] = useState(0);
  const onTabChange = useCallback(
    (e: any, newTab: number) => setTab(newTab),
    []
  );

  return (
    <Container maxWidth="md">
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        mt={2}
        spacing={2}
      >
        <Tabs
          value={tab}
          onChange={onTabChange}
          aria-label="basic tabs example"
        >
          <Tab label="Country-wise" />
          <Tab label="Bubble" />
          <Tab label="History" />
        </Tabs>
        {tab === 0 && (
          <TableauVizBox url="https://public.tableau.com/views/Hypothesis1_v1/Dashboard1" />
        )}
        {tab === 1 && (
          <TableauVizBox url="https://public.tableau.com/views/Hypothesis1_v2/Dashboard2" />
        )}
        {tab === 2 && (
          <TableauVizBox url="https://public.tableau.com/views/Hypothesis1_v3/Dashboard3" />
        )}
      </Stack>
    </Container>
  );
};

export default Locations;