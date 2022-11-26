/** @jsxImportSource @emotion/react */

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { DSVRowString } from "d3";
import { useMemo } from "react";
import { getStats } from "./FighterSheet.utils";

interface IFighterSheet {
  /** The selected fighter to display information about */
  selected: DSVRowString;

  /** Optional second fighter to compare with */
  secondSelected: DSVRowString;
}

/**
 * Display general information about a fighter
 */
const FighterSheetCompare: React.FC<IFighterSheet> = ({
  selected,
  secondSelected,
}) => {
  const stats1 = getStats(selected);
  const stats2 = getStats(secondSelected);

  const rows = useMemo(() => {
    // Set up key-value mapping
    const mapping = [
      ["Age", stats1.age, stats2.age],
      ["Height", stats1.height, stats2.height],
      ["Weight", stats1.weight, stats2.weight],
      ["Weight Class", stats1.weightClass, stats2.weightClass],
      ["Reach", stats1.reach, stats2.reach],
      ["Stance", stats1.stance, stats2.stance],
    ];

    // Generate table row elements
    return mapping.map(([key, value1, value2]) => (
      <TableRow key={key}>
        <TableCell width="33%">{key}</TableCell>
        <TableCell width="33%">{value1}</TableCell>
        <TableCell width="33%">{value2}</TableCell>
      </TableRow>
    ));
  }, [stats1, stats2]);

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell width="33%" />
            <TableCell width="33%">{selected.fighter}</TableCell>
            <TableCell width="33%">{secondSelected.fighter}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{rows}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default FighterSheetCompare;
