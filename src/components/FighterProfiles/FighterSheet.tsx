/** @jsxImportSource @emotion/react */

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { DSVRowString } from "d3";

interface IFighterSheet {
  selected: DSVRowString;
}

/**
 * Display general information about a fighter
 */
const FighterSheet: React.FC<IFighterSheet> = ({ selected }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Date of Birth</TableCell>
            <TableCell>{selected.DOB || "N/A"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Height</TableCell>
            <TableCell>{selected.Height || "N/A"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Weight</TableCell>
            <TableCell>{selected.Weight || "N/A"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Stance</TableCell>
            <TableCell>{selected.Stance || "N/A"}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FighterSheet;
