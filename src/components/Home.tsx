/** @jsxImportSource @emotion/react */

import { Container, useTheme } from "@mui/material";

import getStyles from "./Home.styles";
import Page from "./Page";

/**
 * Home page for the project
 */
const Home = () => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <Page>
      <Container>
        <div css={styles.body}>
          Welcome to Fight Club.
          <ul>
            <li>
              The first rule of Fight Club is: you do not talk about Fight Club.
            </li>
            <li>
              The second rule of Fight Club is: you DO NOT talk about Fight
              Club!
            </li>
          </ul>
        </div>
      </Container>
    </Page>
  );
};

export default Home;
