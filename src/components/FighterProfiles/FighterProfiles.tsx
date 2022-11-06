/** @jsxImportSource @emotion/react */

import { CircularProgress, Container, Stack, Tab, Tabs } from "@mui/material";
import { DSVRowString } from "d3";
import { useCallback, useState } from "react";
import FighterSelector from "./FighterSelector";
import FighterSheet from "./FighterSheet";
import FighterMatchOutcomes from "./FighterMatchOutcomes";
import FighterStrikes from "./FighterStrikes";
import { useIsDataLoading } from "../DataProvider";
import FighterStrikesSummary from "./FighterStrikesSummary";
import FighterMatchOutcomeSummary from "./FighterMatchOutcomeSummary";

/**
 * Fighter data profiles page
 */
const FighterProfiles = () => {
  const isDataLoading = useIsDataLoading();
  const [selected, setSelected] = useState<DSVRowString>({});

  const [tab, setTab] = useState("Summary");
  const onChangeTab = useCallback((event: any, newTab: string) => {
    setTab(newTab);
  }, []);

  if (isDataLoading) {
    return (
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <Container>
      <Stack justifyContent="center" height="100%" spacing={2} mt={2} pb={2}>
        <FighterSelector onChange={setSelected} />
        <FighterSheet selected={selected} />
        <Tabs centered onChange={onChangeTab} value={tab}>
          <Tab value="Summary" label="Summary" />
          <Tab value="History" label="History" />
        </Tabs>
        {tab === "Summary" && (
          <Stack spacing={2}>
            <FighterMatchOutcomeSummary selected={selected} />
            <FighterStrikesSummary selected={selected} />
            <FighterStrikesSummary selected={selected} taken />
          </Stack>
        )}
        {tab === "History" && (
          <Stack spacing={2}>
            <FighterMatchOutcomes selected={selected} />
            <FighterStrikes selected={selected} />
            <FighterStrikes selected={selected} taken />
          </Stack>
        )}
      </Stack>
    </Container>
  );
};

export default FighterProfiles;
