import { css } from "@emotion/react";
import { Theme } from "@mui/material";

const getStyles = (theme: Theme) => ({
  header: css`
    margin: ${theme.spacing(2)} 0;
  `,
  divider: css`
    margin-bottom: ${theme.spacing(2)};
  `,
});

export default getStyles;
