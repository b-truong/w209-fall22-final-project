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
import { useData } from "../DataProvider";

/**
 * Fighter selector card
 */
const FighterSelector = () => {
  const theme = useTheme();
  const { fightersList } = useData();

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
  const onChange = useCallback(
    (event: any, newSelection: DSVRowString | null) => {
      if (newSelection) {
        setSelected(newSelection);
      }
    },
    []
  );

  // Select a random fighter by default
  useEffect(() => {
    if (!selected.fighter && fightersList.length) {
      const randomIndex = Math.floor(Math.random() * fightersList.length);
      setSelected(fightersList[randomIndex]);
    }
  }, [selected, fightersList.length]);

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
  }, [inputValue]);

  return (
    <Card>
      <Box padding={theme.spacing(4)}>
        <Autocomplete
          value={selected}
          filterOptions={noop}
          options={filteredList}
          onChange={onChange}
          onInputChange={onInputChange}
          loading={!selected.fighter}
          getOptionLabel={getOptionLabel}
          renderInput={renderInput}
        />
      </Box>
    </Card>
  );
};

export default FighterSelector;
