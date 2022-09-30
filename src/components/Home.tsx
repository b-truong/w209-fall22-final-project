/** @jsxImportSource @emotion/react */

import { Box, Container, Stack, Typography, useTheme } from "@mui/material";

import getStyles from "./Home.styles";
import Page from "./Page";
import video from "../assets/boxing.mp4";

/**
 * Home page for the project
 */
const Home = () => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <Page>
      <video autoPlay muted loop css={styles.video}>
        <source src={video} type="video/mp4" />
      </video>
      <Container css={styles.stretch}>
        <Stack direction="column" justifyContent="center" css={styles.stretch}>
          <Typography variant="h1" textAlign="center" color="white">
            WELCOME TO FIGHT CLUB
          </Typography>
        </Stack>
      </Container>
    </Page>
  );
};

export default Home;
