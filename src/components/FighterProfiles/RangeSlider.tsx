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
  Slider,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useCallback } from "react";
import getStyles from "./RangeSlider.styles";

interface IRangeSlider {
  /** Label of the range slider */
  label: string;
  /** Handler for new value changes */
  onChange: (newValue: [number, number]) => void;
  /** Current value of input */
  value: [number, number];
  /** Formatter for displaying value */
  valueLabelFormat?: (value: number) => string;
  /** Min / max value */
  range: [number, number];
}

/**
 * Custom range slider component
 */
const RangeSlider: React.FC<IRangeSlider> = ({
  label,
  onChange,
  value,
  valueLabelFormat,
  range: [min, max],
}) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const onChangeWrapper = useCallback(
    (event: any, newValue: number | number[]) => {
      onChange(newValue as [number, number]);
    },
    [onChange]
  );
  return (
    <Box css={styles.sliderBox}>
      <Typography variant="caption">{label}</Typography>
      <Stack css={styles.sliderRow}>
        <Slider
          valueLabelDisplay="auto"
          onChange={onChangeWrapper}
          valueLabelFormat={valueLabelFormat}
          value={value}
          min={min}
          max={max}
        />
      </Stack>
    </Box>
  );
};

export default RangeSlider;
