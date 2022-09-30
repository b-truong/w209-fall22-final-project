import { css } from "@emotion/react";
import { Theme } from "@mui/material";

const getStyles = (theme: Theme) => ({
  paper: css`
    height: 100%;
  `,
  divider: css`
    margin-bottom: ${theme.spacing(2)};
  `,
});

export default getStyles;
