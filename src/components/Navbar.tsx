/** @jsxImportSource @emotion/react */

import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png";
import getStyles from "./Navbar.styles";

const Navbar = () => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <AppBar position="sticky" enableColorOnDark>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={logo} css={styles.logo} alt="Fight Club logo" />
          <Typography variant="h6" noWrap>
            F I G H T &nbsp; C L U B
          </Typography>
          <Box css={styles.navBox}>
            <Button to="/" color="inherit" component={Link}>
              Home
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;