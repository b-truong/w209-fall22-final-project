/** @jsxImportSource @emotion/react */

import { Container, Stack } from "@mui/material";
import TableauVizBox from "./TableauVizBox";

/**
 * Predict which fighter will win
 */
const Prediction = () => {
  return (
    <Container maxWidth="md">
      <Stack direction="column" justifyContent="center" alignItems="center">
        <TableauVizBox url="https://public.tableau.com/views/tausif_final_prediction/FightPrediction" />
      </Stack>
    </Container>
  );
};

export default Prediction;
