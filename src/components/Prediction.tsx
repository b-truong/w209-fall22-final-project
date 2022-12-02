/** @jsxImportSource @emotion/react */

import {
  Box,
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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DSVRowString } from "d3";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useFighterList, useIsDataLoading } from "./DataProvider";
import FighterSelector from "./FighterProfiles/FighterSelector";
import { camelPad } from "./FighterProfiles/FighterSheet.utils";
import FighterSheetCompare from "./FighterProfiles/FighterSheetCompare";
import getStyles from "./Prediction.styles";

const boutTypes = ["Non Title", "Title"];
const roundsOptions = [3, 5];

/**
 * Predict which fighter will win
 */
const Prediction = () => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const isDataLoading = useIsDataLoading();
  const smallViewport = useMediaQuery("(max-width: 500px)");
  const {
    ranges: { weightClasses },
  } = useFighterList();

  const [red, setRed] = useState<DSVRowString>({});
  const [blue, setBlue] = useState<DSVRowString>({});

  // Get current fighters and class from URL
  const navigate = useNavigate();
  const location = useLocation();
  const { fighterName } = useParams();
  const secondFighterName = useMemo(
    () => new URLSearchParams(location.search).get("other"),
    [location]
  );

  const weightClass = useMemo(
    () => new URLSearchParams(location.search).get("class"),
    [location]
  );
  const [selectedWeightClass, setWeightClass] = useState<string>(
    weightClass ?? "Middleweight"
  );

  // Set current fighters and class to URL
  useEffect(() => {
    if (red?.fighter) {
      const urlSelection = red.fighter.replaceAll(" ", "");
      const secondFighterQuery = blue.fighter
        ? "?other=" + blue.fighter.replaceAll(" ", "")
        : "";
      const classQuery = selectedWeightClass
        ? "&class=" + selectedWeightClass
        : "";
      navigate(
        `/fightclub/predict/${urlSelection}${secondFighterQuery}${classQuery}`
      );
    }
  }, [red, blue, selectedWeightClass, navigate]);

  // Manage weight class state
  const onChangeWeightClass = useCallback(
    (event: SelectChangeEvent<string>) => {
      const newWeightClass = event.target.value;
      setWeightClass(newWeightClass);
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
          onChange={setRed}
          weightClass={selectedWeightClass}
          fighterName={red.fighter?.replaceAll(" ", "") ?? fighterName}
        />
        <FighterSelector
          onChange={setBlue}
          weightClass={selectedWeightClass}
          fighterName={blue.fighter?.replaceAll(" ", "") ?? secondFighterName}
        />
        {red.fighter && blue.fighter && (
          <FighterSheetCompare selected={red} secondSelected={blue} />
        )}
      </Stack>
    </Container>
  );
};

export default Prediction;
