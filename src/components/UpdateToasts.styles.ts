import { css } from "@emotion/react";
import { Theme } from "@mui/material";

const getStyles = (theme: Theme) => {
  return {
    toast: css`
      justify-content: space-between;
      align-items: center;
      padding: ${theme.spacing(2)} ${theme.spacing(2.5)};
    `,
    toastButtonStack: css`
      align-items: center;
    `,
  };
};

export default getStyles;
