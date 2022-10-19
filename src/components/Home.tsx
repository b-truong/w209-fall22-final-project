/** @jsxImportSource @emotion/react */

import { Box, Button, Stack, Typography, useTheme } from "@mui/material";

import getStyles from "./Home.styles";
import video from "../assets/boxing.mp4";
import { Link } from "react-router-dom";
import { useCallback, useState } from "react";

/**
 * Home page for the project
 */
const Home = () => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const onVideoLoad = useCallback(() => {
    setIsVideoLoading(false);
  }, []);

  return (
    <>
      <Box css={styles.videoContainer}>
        <video
          playsInline
          autoPlay
          muted
          loop
          onLoadedData={onVideoLoad}
          css={isVideoLoading ? styles.videoLoading : styles.video}
        >
          <source src={video} type="video/mp4" />
        </video>
      </Box>
      <Stack css={styles.splashTextStack}>
        <Box css={styles.splashTextLarge}>
          <Typography variant="h1">WELCOME TO FIGHT CLUB</Typography>
          <Typography variant="h4" mt={4}>
            Explore 28 years of MMA data
          </Typography>
        </Box>
        <Box css={styles.splashTextSmall}>
          <Typography variant="h2">WELCOME TO FIGHT CLUB</Typography>
          <Typography variant="h5" mt={3}>
            Explore 28 years of MMA data
          </Typography>
        </Box>
        <Stack justifyContent="center" alignItems="center" mt={6}>
          <Button variant="contained" component={Link} to="/fightclub/fighters">
            VIEW FIGHTER PROFILES
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default Home;
