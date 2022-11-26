/** @jsxImportSource @emotion/react */

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { DSVRowString } from "d3";
import { useMemo } from "react";
import { getStats } from "./FighterSheet.utils";

interface IFighterSheet {
  /** The selected fighter to display information about */
  selected: DSVRowString;
}

/**
 * Display general information about a fighter
 */
const FighterSheet: React.FC<IFighterSheet> = ({ selected }) => {
  const { age, height, weight, weightClass, stance, reach } =
    getStats(selected);

  const rows = useMemo(() => {
    // Set up key-value mapping
    const mapping = [
      ["Age", age],
      ["Height", height],
      ["Weight", weight],
      ["Weight Class", weightClass],
      ["Reach", reach],
      ["Stance", stance],
    ];

    // Generate table row elements
    return mapping.map(([key, value]) => (
      <TableRow key={key}>
        <TableCell width="50%">{key}</TableCell>
        <TableCell width="50%">{value}</TableCell>
      </TableRow>
    ));
  }, [selected]);

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableBody>{rows}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default FighterSheet;
