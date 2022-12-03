/** @jsxImportSource @emotion/react */

import {
  Button,
  Card,
  CircularProgress,
  Container,
  FormControl,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  useTheme,
} from "@mui/material";
import { DSVRowString } from "d3";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useFighterList, useIsDataLoading } from "./DataProvider";
import FighterSelector from "./FighterProfiles/FighterSelector";
import { camelPad } from "./FighterProfiles/FighterSheet.utils";
import FighterSheetCompare from "./FighterProfiles/FighterSheetCompare";
import FightPrediction from "./FightPrediction";
import getStyles from "./Prediction.styles";
import usePrediction from "./usePrediction";

const boutTypes = ["Title", "Non Title"];
const roundsOptions = [5, 3];

/**
 * Predict which fighter will win
 */
const Prediction = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  const theme = useTheme();
  const styles = getStyles(theme);

  const isDataLoading = useIsDataLoading();
  const {
    ranges: { weightClasses },
  } = useFighterList();

  // Get parameters from URL
  const navigate = useNavigate();
  const location = useLocation();

  const { fighterName: fighterNameUrl } = useParams();
  const secondFighterNameUrl = useMemo(
    () => new URLSearchParams(location.search).get("other"),
    [location.search]
  );
  const weightClass = useMemo(
    () => new URLSearchParams(location.search).get("class"),
    [location]
  );

  // Manage current state
  const [red, setRed] = useState<DSVRowString>({});
  const [blue, setBlue] = useState<DSVRowString>({});
  const [selectedWeightClass, setWeightClass] = useState<string>(
    weightClass ?? "Middleweight"
  );

  // Update the URL as necessary
  const [shouldUpdateUrl, setShouldUpdateUrl] = useState(false);
  useEffect(() => {
    if (!shouldUpdateUrl) {
      return;
    }

    if (red.fighter && blue.fighter && selectedWeightClass) {
      const urlSelection = red.fighter?.replaceAll(" ", "");
      const secondFighterQuery = blue.fighter
        ? "?other=" + blue.fighter.replaceAll(" ", "")
        : "";
      const classQuery = selectedWeightClass
        ? `&class=${selectedWeightClass}`
        : "";
      const newPath = `/predict/${urlSelection}${secondFighterQuery}${classQuery}`;
      if (location.pathname + location.search !== newPath) {
        navigate(newPath);
      }
      setShouldUpdateUrl(false);
    }
  }, [
    red,
    blue,
    selectedWeightClass,
    navigate,
    location.pathname,
    location.search,
    shouldUpdateUrl,
  ]);

  // Pass red fighter name to selectors
  const [redName, setRedName] = useState(fighterNameUrl);
  useEffect(() => {
    if (fighterNameUrl) {
      setRedName(fighterNameUrl);
    }
  }, [fighterNameUrl]);

  const onRedChange = useCallback((newSelected: DSVRowString) => {
    setRed(newSelected);
    setRedName(newSelected.fighter?.replaceAll(" ", ""));
    setShouldUpdateUrl(true);
  }, []);

  // Pass blue fighter name to selectors
  const [blueName, setBlueName] = useState(secondFighterNameUrl);
  useEffect(() => {
    if (secondFighterNameUrl) {
      setBlueName(secondFighterNameUrl);
    }
  }, [secondFighterNameUrl]);

  const onBlueChange = useCallback((newSelected: DSVRowString) => {
    setBlue(newSelected);
    setBlueName(newSelected.fighter?.replaceAll(" ", "") ?? null);
    setShouldUpdateUrl(true);
  }, []);

  // Manage weight class state
  const onChangeWeightClass = useCallback(
    (event: SelectChangeEvent<string>) => {
      const newWeightClass = event.target.value;
      setWeightClass(newWeightClass);
      setShouldUpdateUrl(true);
    },
    []
  );

  // Manage rounds state
  const [rounds, setRounds] = useState(roundsOptions[0]);
  const onChangeRounds = useCallback((event: SelectChangeEvent<number>) => {
    const newRounds = event.target.value;
    setRounds(Number(newRounds));
  }, []);

  // Manage bout type state
  const [boutType, setBoutType] = useState(boutTypes[0]);
  const onChangeBoutType = useCallback((event: SelectChangeEvent<string>) => {
    const newBoutType = event.target.value;
    setBoutType(newBoutType);
  }, []);

  // Make prediction
  const options = useMemo(
    () => ({
      red: red.fighter,
      blue: blue.fighter,
      rounds,
      boutType,
      class: weightClass ?? undefined,
    }),
    [red.fighter, blue.fighter, rounds, boutType, weightClass]
  );
  const { result, isLoading, errorMessage, retry } = usePrediction(options);

  if (isDataLoading) {
    return (
      <Stack css={styles.pageLoader}>
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <Container>
      <Stack justifyContent="center" height="100%" spacing={2} mt={2} pb={2}>
        <Card>
          <Stack css={styles.paramBox}>
            <FormControl css={styles.class}>
              <InputLabel id="wc-label" variant="standard">
                Weight Class
              </InputLabel>
              <Select
                labelId="wc-label"
                value={selectedWeightClass}
                onChange={onChangeWeightClass}
                input={<Input name="Weight Class" />}
                fullWidth
              >
                {weightClasses.map((weightClass) => {
                  return (
                    <MenuItem key={weightClass} value={weightClass}>
                      <ListItemText primary={camelPad(weightClass)} />
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl css={styles.rounds}>
              <InputLabel id="nr-label" variant="standard">
                Rounds
              </InputLabel>
              <Select
                labelId="nr-label"
                value={rounds}
                onChange={onChangeRounds}
                input={<Input name="Rounds" />}
                fullWidth
              >
                {roundsOptions.map((r) => {
                  return (
                    <MenuItem key={r} value={r}>
                      <ListItemText primary={`${r} Rounds`} />
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl css={styles.bouts}>
              <InputLabel id="bt-label" variant="standard">
                Bout Type
              </InputLabel>
              <Select
                labelId="bt-label"
                value={boutType}
                onChange={onChangeBoutType}
                input={<Input name="Bout Type" />}
                fullWidth
              >
                {boutTypes.map((bout) => {
                  return (
                    <MenuItem key={bout} value={bout}>
                      <ListItemText primary={bout} />
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Stack>
        </Card>
        <FighterSelector
          onChange={onRedChange}
          weightClass={selectedWeightClass}
          fighterName={redName}
        />
        <FighterSelector
          onChange={onBlueChange}
          weightClass={selectedWeightClass}
          fighterName={blueName}
        />
        <FightPrediction
          isLoading={isLoading}
          errorMessage={errorMessage}
          onRetry={retry}
          redFighter={red.fighter}
          redChance={result?.red}
          blueFighter={blue.fighter}
          blueChance={result?.blue}
        />
        {red.fighter && blue.fighter && (
          <FighterSheetCompare selected={red} secondSelected={blue} />
        )}
        {redName && blueName && (
          <Stack css={styles.comparisonBox}>
            <Button
              variant="outlined"
              color="secondary"
              component={Link}
              to={`/fighters/${redName}?other=${blueName}`}
            >
              See detailed comparison
            </Button>
          </Stack>
        )}
      </Stack>
    </Container>
  );
};

export default Prediction;
