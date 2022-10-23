/** @jsxImportSource @emotion/react */

import { Box, Stack, Typography, useTheme } from "@mui/material";

import getStyles from "./Home.styles";
import video from "../assets/boxing.mp4";
import { useCallback, useState } from "react";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import SportsMmaIcon from "@mui/icons-material/SportsMma";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeButton from "./HomeButton";

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
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          mt={6}
          spacing={2}
        >
          <HomeButton
            icon={<SportsMmaIcon fontSize="large" />}
            text="Fighter profiles"
            to="/fightclub/fighters"
          />
          <HomeButton
            icon={<SportsKabaddiIcon fontSize="large" />}
            text="Red vs. Blue fighters"
            to="/fightclub/corners"
          />
          <HomeButton
            icon={<AccountTreeIcon fontSize="large" />}
            text="Match Results"
            to="/fightclub/matches"
          />
          <HomeButton
            icon={<LocationOnIcon fontSize="large" />}
            text="Match Locations"
            to="/fightclub/locations"
          />
        </Stack>
      </Stack>
    </>
  );
};

export default Home;
