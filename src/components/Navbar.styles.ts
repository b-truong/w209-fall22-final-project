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
      @media (max-width: 949px) {
        flex-grow: 1;
        text-align: center;
      }
    `,
    navBox: css`
      color: ${theme.typography.body1.color};
      @media (max-width: 949px) {
        display: none;
      }
    `,
    navButton: css`
      color: white;
      margin-left: 32px;
    `,
    drawerButton: css`
      display: none;
      @media (max-width: 949px) {
        display: initial;
        width: 40px;
        height: 40px;
      }
    `,
    drawerBox: css`
      width: 250px;
    `,
    disabled: css`
      opacity: 1 !important;
      color: white !important;
      background-color: rgba(255, 255, 255, 0.1);
    `,
  };
};

export default getStyles;
