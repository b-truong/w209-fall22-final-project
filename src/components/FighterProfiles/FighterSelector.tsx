/** @jsxImportSource @emotion/react */

import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Box,
  Button,
  Card,
  debounce,
  FormControl,
  IconButton,
  InputLabel,
  ListItemText,
  Menu,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { DSVRowString } from "d3";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { IFighterListOptions, useFighterList } from "../DataProvider";
import CasinoIcon from "@mui/icons-material/Casino";
import CloseIcon from "@mui/icons-material/Close";
import getStyles from "./FighterSelector.styles";
import FilterListIcon from "@mui/icons-material/FilterList";
import { camelPad, cmsToImperial } from "./FighterSheet.utils";
import RangeSlider from "./RangeSlider";

interface IFighterSelector {
  /** Callback to handle selections */
  onChange?: (selected: DSVRowString) => void;
  /** Callback for removal button; button is hidden if not provided */
  onRemove?: () => void;
  /** Set weight class filter; removes weight class filtering option */
  weightClass?: string;
  /** Currently selected fighter name */
  fighterName?: string | null;
}

/**
 * Allow users to select a fighter
 */
const FighterSelector: React.FC<IFighterSelector> = ({
  fighterName,
  onChange,
  onRemove,
  weightClass,
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  // Set up filtering
  const [filterElement, setFilterElement] = useState<HTMLElement | null>(null);
  const isFilterMenuOpen = Boolean(filterElement);
  const showFilterMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterElement(event.currentTarget);
  };
  const closeFilterMenu = () => {
    setFilterElement(null);
  };

  // Set up debounced filter application
  const [shouldApplyFilter, setShouldApplyFilter] = useState(false);
  const timeoutRef = useRef<string | number | NodeJS.Timeout | undefined>();
  const applyFilter = useCallback(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShouldApplyFilter(true), 300);
  }, []);

  // Set up filtering for weight class
  const [selectedWeightClass, setWeightClass] = useState<string>(
    weightClass ?? "All"
  );
  const onChangeWeightClass = (event: SelectChangeEvent<string>) => {
    setWeightClass(event.target.value);
    applyFilter();
  };

  // Set up filtering for weight range
  const [selectedWeightRange, setWeightRange] = useState<[number, number]>([
    0,
    Infinity,
  ]);
  const onChangeWeightRange = (newValue: [number, number]) => {
    setWeightRange(newValue);
    applyFilter();
  };
  const formatWeightLabel = (value: number) => {
    return `${value} lbs`;
  };

  // Set up filtering for height range
  const [selectedHeightRange, setHeightRange] = useState<[number, number]>([
    0,
    Infinity,
  ]);
  const onChangeHeightRange = (newValue: [number, number]) => {
    setHeightRange(newValue);
    applyFilter();
  };
  const formatHeightLabel = (value: number) => {
    const { feet, inches } = cmsToImperial(value);
    return `${feet}' ${inches}"`;
  };

  // Set up filtering for age range
  const [selectedAgeRange, setAgeRange] = useState<[number, number]>([
    0,
    Infinity,
  ]);
  const onChangeAgeRange = (newValue: [number, number]) => {
    setAgeRange(newValue);
    applyFilter();
  };

  // Create filter options
  const [filter, setFilter] = useState<IFighterListOptions>({
    weightClass:
      selectedWeightClass !== "All" ? selectedWeightClass : undefined,
  });

  const { fightersList, ranges } = useFighterList(filter);

  // Reset filters to default values
  const resetFilters = useCallback(() => {
    if (!weightClass) {
      setWeightClass("All");
    }
    setWeightRange([0, Infinity]);
    setHeightRange([0, Infinity]);
    setAgeRange([0, Infinity]);
    applyFilter();
  }, [applyFilter, weightClass]);

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
  const [selected, setSelected] = useState<DSVRowString>({});
  const onSelectFighter = useCallback(
    (event: any, newSelection: DSVRowString | null) => {
      if (!newSelection?.fighter) {
        return;
      }

      setSelected(newSelection ?? {});
      onChange?.(newSelection ?? {});
    },
    [onChange]
  );

  // Randomly select fighter
  const onSelectRandomFighter = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * fightersList.length);
    onSelectFighter(null, fightersList[randomIndex]);
  }, [onSelectFighter, fightersList]);

  // Select a fighter from URL
  useEffect(() => {
    if (fightersList.length) {
      if (!fighterName) {
        onSelectRandomFighter();
      }
      if (selected.fighter?.replaceAll(" ", "") !== fighterName) {
        const fighter = fightersList.find(
          (row) => row?.fighter?.replaceAll(" ", "") === fighterName
        );
        if (fighter) {
          setSelected(fighter);
          onChange?.(fighter);
        } else {
          onSelectRandomFighter();
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

  // Apply given weight class and select a random fighter within if needed
  const [shouldChooseRandomFighter, setChooseRandomeFighter] = useState(false);
  useEffect(() => {
    if (weightClass) {
      setWeightClass(weightClass);
      setShouldApplyFilter(true);
      if (
        selected.fighter?.replaceAll(" ", "") === fighterName &&
        weightClass !== selected.weight_class
      ) {
        setChooseRandomeFighter(true);
      }
    }
  }, [selected, weightClass, fighterName]);
  useEffect(() => {
    if (shouldChooseRandomFighter && !shouldApplyFilter) {
      setChooseRandomeFighter(false);
      onSelectRandomFighter();
    }
  }, [shouldChooseRandomFighter, shouldApplyFilter, onSelectRandomFighter]);

  // Apply filters
  useEffect(() => {
    if (shouldApplyFilter) {
      setShouldApplyFilter(false);
      setFilter({
        weightClass:
          selectedWeightClass !== "All" ? selectedWeightClass : undefined,
        weightRange:
          selectedWeightRange[1] !== Infinity ? selectedWeightRange : undefined,
        heightRange:
          selectedHeightRange[1] !== Infinity ? selectedHeightRange : undefined,
        ageRange:
          selectedAgeRange[1] !== Infinity ? selectedAgeRange : undefined,
      });
    }
  }, [
    shouldApplyFilter,
    selectedWeightClass,
    selectedWeightRange,
    selectedHeightRange,
    selectedAgeRange,
  ]);

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
          loadingText="No options"
          getOptionLabel={getOptionLabel}
          renderInput={renderInput}
          isOptionEqualToValue={isOptionEqualToValue}
          disableClearable
          css={styles.input}
        />
        <Tooltip title="Apply filters" placement="top">
          <Box>
            <IconButton css={styles.button} onClick={showFilterMenu}>
              <FilterListIcon />
            </IconButton>
          </Box>
        </Tooltip>
        <Tooltip title="Select random fighter" placement="top">
          {/* Need to use Box here as tooltip 
              does not work on disabled elements */}
          <Box>
            <IconButton
              css={styles.random}
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
              <IconButton css={styles.button} onClick={onRemove}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Tooltip>
        )}
      </Stack>
      <Menu
        anchorEl={filterElement}
        open={isFilterMenuOpen}
        onClose={closeFilterMenu}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Stack css={styles.filterBox}>
          {!weightClass && (
            <FormControl css={styles.form}>
              <InputLabel id="wc-label">Weight Class</InputLabel>
              <Select
                labelId="wc-label"
                value={selectedWeightClass}
                onChange={onChangeWeightClass}
                input={<OutlinedInput label="Weight Class" />}
                fullWidth
              >
                <MenuItem key="All" value="All">
                  <ListItemText primary="All" />
                </MenuItem>
                {ranges.weightClasses.map((weightClass) => {
                  return (
                    <MenuItem key={weightClass} value={weightClass}>
                      <ListItemText primary={camelPad(weightClass)} />
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          )}
          <RangeSlider
            label="Weight Range"
            valueLabelFormat={formatWeightLabel}
            onChange={onChangeWeightRange}
            value={selectedWeightRange}
            range={ranges.weightRange}
          />
          <RangeSlider
            label="Height Range"
            valueLabelFormat={formatHeightLabel}
            onChange={onChangeHeightRange}
            value={selectedHeightRange}
            range={ranges.heightRange}
          />
          <RangeSlider
            label="Age Range"
            onChange={onChangeAgeRange}
            value={selectedAgeRange}
            range={ranges.ageRange}
          />
          <Stack css={styles.resetBox}>
            <Button variant="contained" onClick={resetFilters}>
              Clear filters
            </Button>
            <Typography>{fightersList.length} results</Typography>
          </Stack>
        </Stack>
      </Menu>
    </Card>
  );
};

export default FighterSelector;
