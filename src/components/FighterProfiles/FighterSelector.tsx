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
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useFighterList } from "../DataProvider";
import CasinoIcon from "@mui/icons-material/Casino";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import getStyles from "./FighterSelector.styles";

interface IFighterSelector {
  /** Callback to handle selections */
  onChange?: (selected: DSVRowString) => void;
  /** Callback for removal button; button is hidden if not provided */
  onRemove?: () => void;
}

/**
 * Allow users to select a fighter
 */
const FighterSelector: React.FC<IFighterSelector> = ({
  onChange,
  onRemove,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const fightersList = useFighterList();

  const location = useLocation();
  const { fighterName } = useParams();
  const secondFighterName = useMemo(
    () => new URLSearchParams(location.search).get("other"),
    [location]
  );

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

      if (!onRemove) {
        const secondFighterQuery = secondFighterName
          ? "?other=" + secondFighterName.replaceAll(" ", "")
          : "";
        if (newSelection?.fighter) {
          navigate(
            `/fightclub/fighters/${newSelection.fighter.replaceAll(
              " ",
              ""
            )}${secondFighterQuery}`
          );
        } else {
          navigate(`/fightclub/fighters${secondFighterQuery}`);
        }
      } else {
        if (newSelection?.fighter) {
          navigate(
            `${location.pathname}?other=${newSelection.fighter.replaceAll(
              " ",
              ""
            )}`
          );
        } else {
          navigate(location.pathname);
        }
      }
    },
    [onChange, navigate, secondFighterName, onRemove, location.pathname]
  );

  // Randomly select fighter
  const onSelectRandomFighter = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * fightersList.length);
    onSelectFighter(null, fightersList[randomIndex]);
  }, [onSelectFighter, fightersList]);

  // Select a fighter from URL
  useEffect(() => {
    if (fightersList.length) {
      if (!fighterName || (onRemove && !secondFighterName)) {
        onSelectRandomFighter();
      }
      const name = onRemove ? secondFighterName : fighterName;
      if (selected.fighter !== name) {
        const fighter = fightersList.find(
          (row) => row?.fighter?.replaceAll(" ", "") === name
        );
        if (fighter) {
          setSelected(fighter);
          onChange?.(fighter);
        }
      }
    }
  }, [
    onRemove,
    selected,
    fightersList,
    onChange,
    fighterName,
    secondFighterName,
    onSelectRandomFighter,
  ]);

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
        {onRemove && (
          <Tooltip title="Remove comparison" placement="top">
            <Box>
              <IconButton
                css={styles.button}
                onClick={onRemove}
                disabled={!fightersList.length}
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
            </Box>
          </Tooltip>
        )}
      </Stack>
    </Card>
  );
};

export default FighterSelector;
