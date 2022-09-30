import { css } from "@emotion/react";
import { Theme } from "@mui/material";

const getStyles = (theme: Theme) => {
  return {
    logo: css`
      height: ${theme.typography.h6.fontSize};
      width: ${theme.typography.h6.fontSize};
      margin-right: 10px;
    `,
    navBox: css`
      color: ${theme.typography.body1.color};
      margin-left: 32px;
    `,
  };
};

export default getStyles;
