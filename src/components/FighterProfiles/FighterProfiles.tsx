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
  Tooltip,
} from "@mui/material";
import { DSVRowString } from "d3";
import { useCallback, useEffect, useMemo, useState } from "react";
import FighterSelector from "./FighterSelector";
import FighterSheet from "./FighterSheet";
import FighterMatchOutcomes from "./FighterMatchOutcomes";
import FighterStrikes from "./FighterStrikes";
import { useIsDataLoading } from "../DataProvider";
import FighterStrikesSummary from "./FighterStrikesSummary";
import FighterMatchOutcomeSummary from "./FighterMatchOutcomeSummary";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import FighterSheetCompare from "./FighterSheetCompare";

/**
 * Fighter data profiles page
 */
const FighterProfiles = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  const isDataLoading = useIsDataLoading();
  const [selected, setSelected] = useState<DSVRowString>({});
  const [selectedComparison, setSelectedComparison] = useState<DSVRowString>(
    {}
  );

  // Set current fighters to URL
  const location = useLocation();
  const navigate = useNavigate();
  const [shouldUpdateUrl, setShouldUpdateUrl] = useState(false);
  useEffect(() => {
    if (!shouldUpdateUrl) {
      return;
    }

    if (selected?.fighter) {
      const urlSelection = selected.fighter.replaceAll(" ", "");
      const secondFighterQuery = selectedComparison.fighter
        ? "?other=" + selectedComparison.fighter.replaceAll(" ", "")
        : "";
      const newPath = `/fightclub/fighters/${urlSelection}${secondFighterQuery}`;
      if (location.pathname + location.search !== newPath) {
        navigate(newPath);
      }
      setShouldUpdateUrl(false);
    }
  }, [
    shouldUpdateUrl,
    selected,
    selectedComparison,
    navigate,
    location.pathname,
    location.search,
  ]);

  // Get current fighters from URL
  const { fighterName: fighterNameUrl } = useParams();
  const secondFighterNameUrl = useMemo(
    () => new URLSearchParams(location.search).get("other"),
    [location.search]
  );

  // Pass fighter name to selectors
  const [fighterName, setFighterName] = useState(fighterNameUrl);
  useEffect(() => {
    if (fighterNameUrl) {
      setFighterName(fighterNameUrl);
    }
  }, [fighterNameUrl]);

  const onFighterChange = useCallback((newSelected: DSVRowString) => {
    setSelected(newSelected);
    setFighterName(newSelected.fighter?.replaceAll(" ", ""));
    setShouldUpdateUrl(true);
  }, []);

  // Set comparison mode
  const [comparing, setComparing] = useState(!!secondFighterNameUrl);
  const onAddComparison = useCallback(() => {
    setComparing(true);
  }, []);
  const onRemoveComparison = useCallback(() => {
    setComparing(false);
    setSelectedComparison({});
    navigate(location.pathname);
  }, [navigate, location]);

  // Pass second fighter name
  const [secondFighterName, setSecondFighterName] =
    useState(secondFighterNameUrl);
  useEffect(() => {
    if (!secondFighterNameUrl) {
      setComparing(false);
      return;
    }
    setSecondFighterName(secondFighterNameUrl);
    setComparing(true);
  }, [secondFighterNameUrl]);

  const onSecondFighterChange = useCallback((newSelected: DSVRowString) => {
    setSelectedComparison(newSelected);
    setSecondFighterName(newSelected.fighter?.replaceAll(" ", "") ?? null);
    setShouldUpdateUrl(true);
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
        <FighterSelector onChange={onFighterChange} fighterName={fighterName} />
        {!comparing && (
          <Stack justifyContent="center" alignItems="center">
            <Button
              onClick={onAddComparison}
              color="secondary"
              variant="outlined"
            >
              Add Comparison
            </Button>
          </Stack>
        )}
        {comparing && (
          <FighterSelector
            onChange={onSecondFighterChange}
            onRemove={onRemoveComparison}
            fighterName={secondFighterName}
          />
        )}
        {comparing && (
          <Stack justifyContent="center" alignItems="center">
            <Tooltip
              title="Predict a winner for fighters in the same weight class"
              placement="top"
            >
              <Box>
                <Button
                  variant="contained"
                  component={Link}
                  disabled={
                    !(
                      fighterName &&
                      secondFighterName &&
                      selected.weight_class === selectedComparison.weight_class
                    )
                  }
                  to={`/fightclub/predict/${fighterName}?other=${secondFighterName}&class=${selected.weight_class}`}
                >
                  Predict winner
                </Button>
              </Box>
            </Tooltip>
          </Stack>
        )}
        {comparing && selectedComparison ? (
          <FighterSheetCompare
            selected={selected}
            secondSelected={selectedComparison}
          />
        ) : (
          <FighterSheet selected={selected} />
        )}
        <Tabs centered onChange={onChangeTab} value={tab}>
          <Tab value="Summary" label="Summary" />
          <Tab value="History" label="History" />
        </Tabs>
        {tab === "Summary" && (
          <Stack spacing={2}>
            <FighterMatchOutcomeSummary
              selected={selected}
              displayName={comparing}
            />
            {comparing && (
              <FighterMatchOutcomeSummary
                selected={selectedComparison}
                displayName
              />
            )}
            <FighterStrikesSummary
              selected={selected}
              displayName={comparing}
            />
            {comparing && (
              <FighterStrikesSummary
                selected={selectedComparison}
                displayName
              />
            )}
            <FighterStrikesSummary
              selected={selected}
              displayName={comparing}
              taken
            />
            {comparing && (
              <FighterStrikesSummary
                selected={selectedComparison}
                displayName
                taken
              />
            )}
          </Stack>
        )}
        {tab === "History" && (
          <Stack spacing={2}>
            <FighterMatchOutcomes selected={selected} displayName={comparing} />
            {comparing && (
              <FighterMatchOutcomes selected={selectedComparison} displayName />
            )}
            <FighterStrikes selected={selected} displayName={comparing} />
            {comparing && (
              <FighterStrikes selected={selectedComparison} displayName />
            )}
            <FighterStrikes selected={selected} displayName={comparing} taken />
            {comparing && (
              <FighterStrikes selected={selectedComparison} displayName taken />
            )}
          </Stack>
        )}
      </Stack>
    </Container>
  );
};

export default FighterProfiles;
