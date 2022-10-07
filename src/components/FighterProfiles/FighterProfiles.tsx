/** @jsxImportSource @emotion/react */

import { Container, Stack } from "@mui/material";
import { useData } from "../DataProvider";
import FighterSelector from "./FighterSelector";

/**
 * Fighter data profiles page
 */
const FighterProfiles = () => {
  const data = useData();
  return (
    <Stack direction="column" justifyContent="center" height="100%">
      <Container>
        <FighterSelector />
      </Container>
    </Stack>
  );
};

export default FighterProfiles;
