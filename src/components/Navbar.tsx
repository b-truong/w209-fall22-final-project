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
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import CloseIcon from "@mui/icons-material/Close";
import SportsMmaIcon from "@mui/icons-material/SportsMma";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link, useLocation } from "react-router-dom";

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

  const location = useLocation();

  const links = useMemo(() => {
    return [
      {
        icon: <HomeIcon />,
        text: "Home",
        path: "/home",
      },
      {
        icon: <SportsMmaIcon />,
        text: "Fighters",
        path: "/fighters",
      },
      {
        icon: <QueryStatsIcon />,
        text: "Predict Winner",
        path: "/predict",
      },
      {
        icon: <AccountTreeIcon />,
        text: "Match Results",
        path: "/matches",
      },
      {
        icon: <LocationOnIcon />,
        text: "Match Locations",
        path: "/locations",
      },
    ];
  }, []);

  return (
    <>
      <AppBar position="fixed" enableColorOnDark>
        <Container>
          <Toolbar disableGutters>
            <Tooltip title="View navigation options" placement="right">
              <IconButton
                onClick={toggleDrawer(true)}
                css={styles.drawerButton}
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>
            <Stack direction="row" alignItems="center" flexGrow={1}>
              <Button to="/" component={Link} css={styles.title} disableRipple>
                <Typography variant="h6" noWrap>
                  <img src={logo} css={styles.logo} alt="Fight Club logo" />F I
                  G H T &nbsp; C L U B
                </Typography>
              </Button>
              <Box css={styles.navBox}>
                {links.map((link) => {
                  const isDisabled = location.pathname.includes(link.path);
                  return (
                    <Button
                      key={link.text}
                      to={link.path}
                      component={Link}
                      css={[
                        styles.navButton,
                        isDisabled ? styles.disabled : null,
                      ]}
                      disabled={isDisabled}
                    >
                      {link.text}
                    </Button>
                  );
                })}
              </Box>
            </Stack>
            <Tooltip title="View source code" placement="left">
              <IconButton
                href="https://github.com/b-truong/w209-fall22-final-project"
                target="_blank"
              >
                <GitHubIcon />
              </IconButton>
            </Tooltip>
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
            {links.map((link) => {
              const isDisabled = location.pathname.includes(link.path);
              return (
                <ListItem disablePadding key={link.text}>
                  <ListItemButton
                    component={Link}
                    to={link.path}
                    onClick={toggleDrawer(false)}
                    css={isDisabled ? styles.disabled : null}
                    disabled={isDisabled}
                  >
                    <ListItemIcon>{link.icon}</ListItemIcon>
                    <ListItemText primary={link.text} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
