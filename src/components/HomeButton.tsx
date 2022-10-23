/** @jsxImportSource @emotion/react */

import { Button, Stack, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

interface IHomeButton {
  /** Button icon */
  icon: React.ReactNode;
  /** Button text */
  text: string;
  /** Page link */
  to: string;
}

/**
 * Display analysis of match results
 */
const HomeButton: React.FC<IHomeButton> = ({ icon, text, to }) => {
  const theme = useTheme();
  return (
    <Button
      variant="contained"
      css={{ width: "128px", height: "128px", margin: theme.spacing(1) }}
      component={Link}
      to={to}
    >
      <Stack height="100%" spacing={1} pt={1}>
        {icon}
        <Typography variant="button">{text}</Typography>
      </Stack>
    </Button>
  );
};

export default HomeButton;
