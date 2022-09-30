/** @jsxImportSource @emotion/react */

import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

import getStyles from "./Home.styles";
import video from "../assets/boxing.mp4";
import { Link } from "react-router-dom";

/**
 * Home page for the project
 */
const Home = () => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <>
      <Box css={styles.videoContainer}>
        <video autoPlay muted loop css={styles.video}>
          <source src={video} type="video/mp4" />
        </video>
      </Box>
      <Stack direction="column" justifyContent="center" height="100%">
        <Typography variant="h1" textAlign="center" color="white">
          WELCOME TO FIGHT CLUB
        </Typography>
        <Typography variant="h4" textAlign="center" color="white" mt={4}>
          Explore 28 years of MMA data
        </Typography>
        <Stack justifyContent="center" alignItems="center" mt={6}>
          <Button variant="contained" component={Link} to="/fighters">
            VIEW FIGHTER PROFILES
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default Home;
