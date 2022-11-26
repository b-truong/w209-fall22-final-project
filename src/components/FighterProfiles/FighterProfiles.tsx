/** @jsxImportSource @emotion/react */

import {
  Box,
  Button,
  CircularProgress,
  Container,
  css,
  Stack,
  Tab,
  Tabs,
} from "@mui/material";
import { DSVRowString } from "d3";
import { useCallback, useEffect, useState } from "react";
import FighterSelector from "./FighterSelector";
import FighterSheet from "./FighterSheet";
import FighterMatchOutcomes from "./FighterMatchOutcomes";
import FighterStrikes from "./FighterStrikes";
import { useIsDataLoading } from "../DataProvider";
import FighterStrikesSummary from "./FighterStrikesSummary";
import FighterMatchOutcomeSummary from "./FighterMatchOutcomeSummary";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Fighter data profiles page
 */
const FighterProfiles = () => {
  const isDataLoading = useIsDataLoading();
  const [selected, setSelected] = useState<DSVRowString>({});
  const [selectedComparison, setSelectedComparison] = useState<DSVRowString>(
    {}
  );

  const navigate = useNavigate();
  const location = useLocation();

  const [comparing, setComparing] = useState(false);
  const onAddComparison = useCallback(() => {
    setComparing(true);
  }, []);
  const onRemoveComparison = useCallback(() => {
    setComparing(false);
    setSelectedComparison({});
    navigate(location.pathname);
  }, []);

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
        {!comparing && (
          <Stack justifyContent="center" alignItems="center">
            <Button
              css={css`
                color: white;
              `}
              onClick={onAddComparison}
            >
              Add Comparison
            </Button>
          </Stack>
        )}
        {comparing && (
          <FighterSelector
            onChange={setSelectedComparison}
            onRemove={onRemoveComparison}
          />
        )}
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
