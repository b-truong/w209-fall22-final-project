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
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useFighterList, useIsDataLoading } from "./DataProvider";
import FighterSelector from "./FighterProfiles/FighterSelector";
import { camelPad } from "./FighterProfiles/FighterSheet.utils";
import FighterSheetCompare from "./FighterProfiles/FighterSheetCompare";

/**
 * Predict which fighter will win
 */
const Prediction = () => {
  const isDataLoading = useIsDataLoading();
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
