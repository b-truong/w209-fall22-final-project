/** @jsxImportSource @emotion/react */

import { Container, Stack } from "@mui/material";
import { DSVRowString } from "d3";
import { useState } from "react";
import FighterSelector from "./FighterSelector";
import FighterSheet from "./FighterSheet";
import FighterMatchOutcomes from "./FighterMatchOutcomes";

/**
 * Fighter data profiles page
 */
const FighterProfiles = () => {
  const [selected, setSelected] = useState<DSVRowString>({});
  return (
    <Container>
      <Stack
        direction="column"
        justifyContent="center"
        height="100%"
        spacing={2}
        mt={8}
      >
        <FighterSelector onChange={setSelected} />
        <FighterSheet selected={selected} />
        <FighterMatchOutcomes selected={selected} />
      </Stack>
    </Container>
  );
};

export default FighterProfiles;
