/** @jsxImportSource @emotion/react */

import { CircularProgress, Container, Stack } from "@mui/material";
import { DSVRowString } from "d3";
import { useState } from "react";
import FighterSelector from "./FighterSelector";
import FighterSheet from "./FighterSheet";
import FighterMatchOutcomes from "./FighterMatchOutcomes";
import FighterStrikes from "./FighterStrikes";
import { useIsDataLoading } from "../DataProvider";

/**
 * Fighter data profiles page
 */
const FighterProfiles = () => {
  const isDataLoading = useIsDataLoading();
  const [selected, setSelected] = useState<DSVRowString>({});
  if (isDataLoading) {
    return (
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <Container>
      <Stack
        direction="column"
        justifyContent="center"
        height="100%"
        spacing={2}
        mt={2}
        pb={2}
      >
        <FighterSelector onChange={setSelected} />
        <FighterSheet selected={selected} />
        <FighterMatchOutcomes selected={selected} />
        <FighterStrikes selected={selected} />
        <FighterStrikes selected={selected} taken />
      </Stack>
    </Container>
  );
};

export default FighterProfiles;
