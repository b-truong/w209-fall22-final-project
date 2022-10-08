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
 * Split PascalCase text into separate words
 * From: https://stackoverflow.com/a/26188910
 */
const camelPad = (str: string) => {
  return (
    str
      // Look for long acronyms and filter out the last letter
      .replace(/([A-Z]+)([A-Z][a-z])/g, " $1 $2")
      // Look for lower-case letters followed by upper-case letters
      .replace(/([a-z\d])([A-Z])/g, "$1 $2")
      // Look for lower-case letters followed by numbers
      .replace(/([a-zA-Z])(\d)/g, "$1 $2")
      .replace(/^./, function (str) {
        return str.toUpperCase();
      })
      // Remove any white space left around the word
      .trim()
  );
};

/**
 * Display general information about a fighter
 */
const FighterSheet: React.FC<IFighterSheet> = ({ selected }) => {
  const age = Math.round(Number(selected.age)) || "N/A";

  let height = "N/A";
  if (selected.Height_cms) {
    const heightInches = Number(selected.Height_cms) / 2.54;
    const heightFeet = Math.floor(heightInches / 12);
    const heightInchesRemainder = heightInches % 12;
    height = `${heightFeet}' ${heightInchesRemainder}"`;
  }

  let weight = "N/A";
  if (selected.Weight_lbs) {
    weight = `${selected.Weight_lbs} lbs.`;
  }

  let weightClass = "N/A";
  if (selected.weight_class) {
    weightClass = camelPad(selected.weight_class);
  }

  const stance = selected.Stance || "N/A";

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Age</TableCell>
            <TableCell>{age}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Height</TableCell>
            <TableCell>{height}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Weight</TableCell>
            <TableCell>{weight}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Weight Class</TableCell>
            <TableCell>{weightClass}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Stance</TableCell>
            <TableCell>{stance}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FighterSheet;
