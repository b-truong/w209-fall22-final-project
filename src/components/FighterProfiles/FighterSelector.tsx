/** @jsxImportSource @emotion/react */

import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Box,
  Card,
  debounce,
  TextField,
  useTheme,
} from "@mui/material";
import { DSVRowString } from "d3";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFighterList } from "../DataProvider";
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
      }, 100),
    []
  );

  // Handle option selection
  const [selected, setSelected] = useState<DSVRowString>({});
  const onSelectFighter = useCallback(
    (event: any, newSelection: DSVRowString | null) => {
      if (newSelection) {
        setSelected(newSelection);
        onChange?.(newSelection);
      }
    },
    [onChange]
  );

  // Select a random fighter by default
  useEffect(() => {
    if (!selected.fighter && fightersList.length) {
      const randomIndex = Math.floor(Math.random() * fightersList.length);
      const fighter = fightersList[randomIndex];
      setSelected(fighter);
      onChange?.(fighter);
    }
  }, [selected, fightersList, onChange]);

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

  // Check if options match
  const isOptionEqualToValue = useCallback(
    (option: DSVRowString, value: DSVRowString) => {
      return option.fighter === value.fighter;
    },
    []
  );

  return (
    <Card>
      <Box css={styles.box}>
        <Autocomplete
          value={selected}
          filterOptions={noop}
          options={filteredList}
          onChange={onSelectFighter}
          onInputChange={onInputChange}
          loading={!selected.fighter}
          getOptionLabel={getOptionLabel}
          renderInput={renderInput}
          isOptionEqualToValue={isOptionEqualToValue}
          disableClearable
        />
      </Box>
    </Card>
  );
};

export default FighterSelector;
