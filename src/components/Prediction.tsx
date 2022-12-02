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
} from "@mui/material";
import { DSVRowString } from "d3";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useFighterList, useIsDataLoading } from "./DataProvider";
import FighterSelector from "./FighterProfiles/FighterSelector";
import { camelPad } from "./FighterProfiles/FighterSheet.utils";
import FighterSheetCompare from "./FighterProfiles/FighterSheetCompare";

/**
 * Predict which fighter will win
 */
const Prediction = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isDataLoading = useIsDataLoading();
  const {
    ranges: { weightClasses },
  } = useFighterList();

  // Handle setting weight class logically and to/from URL
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
  const onChangeWeightClass = useCallback(
    (event: SelectChangeEvent<string>) => {
      const newWeightClass = event.target.value;
      setWeightClass(newWeightClass);
    },
    []
  );

  // Append weight class to URL with debounce
  const timeout = useRef<string | number | NodeJS.Timeout | undefined>();
  useEffect(() => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      if (fighterName && secondFighterName) {
        navigate(
          `${location.pathname}?other=${secondFighterName}&class=${selectedWeightClass}`
        );
      }
    }, 0);
  }, [
    location.pathname,
    secondFighterName,
    selectedWeightClass,
    fighterName,
    navigate,
  ]);

  const [red, setRed] = useState<DSVRowString>({});
  const [blue, setBlue] = useState<DSVRowString>({});

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
        <Card>
          <Box p={2}>
            <FormControl fullWidth>
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
          </Box>
        </Card>
        <FighterSelector
          onChange={setRed}
          basePath="/fightclub/predict"
          weightClass={selectedWeightClass}
        />
        {red.fighter && (
          <FighterSelector
            onChange={setBlue}
            basePath="/fightclub/predict"
            weightClass={selectedWeightClass}
            isOther
          />
        )}
        {red.fighter && blue.fighter && (
          <FighterSheetCompare selected={red} secondSelected={blue} />
        )}
      </Stack>
    </Container>
  );
};

export default Prediction;
