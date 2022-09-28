/** @jsxImportSource @emotion/react */

import { useTheme } from "@mui/material";

import getStyles from "./Home.styles";
import Page from "./Page";

const Home = () => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <Page>
      <div css={styles.body}>
        Welcome to Fight Club.
        <ul>
          <li>
            The first rule of Fight Club is: you do not talk about Fight Club.
          </li>
          <li>
            The second rule of Fight Club is: you DO NOT talk about Fight Club!
          </li>
        </ul>
      </div>
    </Page>
  );
};

export default Home;
