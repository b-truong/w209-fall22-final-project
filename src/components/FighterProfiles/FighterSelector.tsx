/** @jsxImportSource @emotion/react */

import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Box,
  Card,
  debounce,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  useTheme,
} from "@mui/material";
import { DSVRowString } from "d3";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFighterList } from "../DataProvider";
import CasinoIcon from "@mui/icons-material/Casino";
import getStyles from "./FighterSelector.styles";

interface IFighterSelector {
  /** Callback to handle selections */
  onChange?: (selected: DSVRowString) => void;
}

/**
 * Allow users to select a fighter
 */
const FighterSelector: React.FC<IFighterSelector> = ({ onChange }) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const fightersList = useFighterList();

  // Prepare fighter select box
  const getOptionLabel = useCallback(
    (option: DSVRowString) => option.fighter ?? "",
    []
  );
  const renderInput = useCallback(
    (params: AutocompleteRenderInputParams) => (
      <TextField {...params} label="Name" variant="standard" />
    ),
    []
  );

  // Handle text input changes with debounce
  const [inputValue, setInputValue] = useState<string>("");
  const onInputChange = useMemo(
    () =>
      debounce((event: any, newValue: string | null) => {
        setInputValue(newValue ?? "");
      }, 250),
    []
  );

  // Handle option selection
  const navigate = useNavigate();
  const [selected, setSelected] = useState<DSVRowString>({});
  const onSelectFighter = useCallback(
    (event: any, newSelection: DSVRowString | null) => {
      setSelected(newSelection ?? {});
      onChange?.(newSelection ?? {});
      if (newSelection?.fighter) {
        navigate(
          `/fightclub/fighters/${newSelection.fighter.replaceAll(" ", "")}`
        );
      } else {
        navigate("/fightclub/fighters");
      }
    },
    [onChange, navigate]
  );

  // Randomly select fighter
  const onSelectRandomFighter = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * fightersList.length);
    onSelectFighter(null, fightersList[randomIndex]);
  }, [onSelectFighter, fightersList]);

  // Select a fighter from URL
  const { fighterName } = useParams();
  useEffect(() => {
    if (fightersList.length) {
      if (!fighterName) {
        onSelectRandomFighter();
      }
      if (selected.fighter !== fighterName) {
        const fighter = fightersList.find(
          (row) => row?.fighter?.replaceAll(" ", "") === fighterName
        );
        if (fighter) {
          setSelected(fighter);
          onChange?.(fighter);
        }
      }
    }
  }, [selected, fightersList, onChange, fighterName, onSelectRandomFighter]);

  // Filter fighter list by search input
  const noop = useCallback((x: any) => x, []);
  const filteredList = useMemo(() => {
    if (inputValue) {
      return fightersList.filter((row) => {
        return row.fighter
          ?.toLocaleLowerCase()
          ?.includes(inputValue.toLocaleLowerCase());
      });
    }
    return fightersList;
  }, [inputValue, fightersList]);

  // Reset filter on opening the autocomplete
  const onOpen = useCallback(() => {
    setInputValue("");
  }, []);

  // Check if options match
  const isOptionEqualToValue = useCallback(
    (option: DSVRowString, value: DSVRowString) => {
      return option.fighter === value.fighter;
    },
    []
  );

  return (
    <Card>
      <Stack css={styles.box}>
        <Autocomplete
          value={selected}
          filterOptions={noop}
          options={filteredList}
          onChange={onSelectFighter}
          onInputChange={onInputChange}
          onOpen={onOpen}
          loading={!fightersList.length}
          getOptionLabel={getOptionLabel}
          renderInput={renderInput}
          isOptionEqualToValue={isOptionEqualToValue}
          disableClearable
          css={styles.input}
        />
        <Tooltip title="Select random fighter" placement="top">
          {/* Need to use Box here as tooltip 
              does not work on disabled elements */}
          <Box>
            <IconButton
              css={styles.button}
              onClick={onSelectRandomFighter}
              disabled={!fightersList.length}
            >
              <CasinoIcon />
            </IconButton>
          </Box>
        </Tooltip>
      </Stack>
    </Card>
  );
};

export default FighterSelector;
