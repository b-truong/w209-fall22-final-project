/** @jsxImportSource @emotion/react */

import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import CloseIcon from "@mui/icons-material/Close";
import SportsMmaIcon from "@mui/icons-material/SportsMma";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png";
import getStyles from "./Navbar.styles";
import { useMemo, useState } from "react";

const Navbar = () => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setIsDrawerOpen(open);
    };

  const links = useMemo(() => {
    return [
      {
        icon: <HomeIcon />,
        text: "Home",
        path: "/fightclub/",
      },
      {
        icon: <SportsMmaIcon />,
        text: "Fighters",
        path: "/fightclub/fighters",
      },
    ];
  }, []);

  return (
    <>
      <AppBar position="fixed" enableColorOnDark>
        <Container>
          <Toolbar disableGutters>
            <IconButton onClick={toggleDrawer(true)} css={styles.drawerButton}>
              <MenuIcon />
            </IconButton>
            <Button
              to="/fightclub"
              component={Link}
              css={styles.title}
              disableRipple
            >
              <Typography variant="h6" noWrap>
                <img src={logo} css={styles.logo} alt="Fight Club logo" />F I G
                H T &nbsp; C L U B
              </Typography>
            </Button>
            <Box css={styles.navBox}>
              {links.map((link) => (
                <Button
                  key={link.text}
                  to={link.path}
                  component={Link}
                  css={styles.navButton}
                >
                  {link.text}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <Box css={styles.drawerBox}>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={toggleDrawer(false)}>
                <ListItemIcon>
                  <CloseIcon />
                </ListItemIcon>
                <ListItemText primary="Close" />
              </ListItemButton>
            </ListItem>
            <Divider />
            {links.map((link) => (
              <ListItem disablePadding key={link.text}>
                <ListItemButton
                  component={Link}
                  to={link.path}
                  onClick={toggleDrawer(false)}
                >
                  <ListItemIcon>{link.icon}</ListItemIcon>
                  <ListItemText primary={link.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
