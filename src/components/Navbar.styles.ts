import { css } from "@emotion/react";
import { Theme } from "@mui/material";

const getStyles = (theme: Theme) => {
  return {
    logo: css`
      height: ${theme.typography.h6.fontSize};
      width: ${theme.typography.h6.fontSize};
      margin-right: 10px;
    `,
    title: css`
      color: white;
      @media (width < ${theme.breakpoints.values.sm}px) {
        margin-right: 40px;
        flex-grow: 1;
        text-align: center;
      }
    `,
    navBox: css`
      color: ${theme.typography.body1.color};
      @media (width < ${theme.breakpoints.values.sm}px) {
        display: none;
      }
    `,
    navButton: css`
      color: white;
      margin-left: 32px;
    `,
    drawerButton: css`
      @media (width >= ${theme.breakpoints.values.sm}px) {
        display: none;
      }
    `,
    drawerBox: css`
      width: 250px;
    `,
  };
};

export default getStyles;
