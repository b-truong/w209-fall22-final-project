import { css, Theme } from "@mui/material";

const getStyles = (theme: Theme, minHeight: number = 250) => {
  return {
    title: css`
      margin: ${theme.spacing(2)};
      margin-bottom: 0;
      flex-flow: row wrap;
      justify-content: space-between;
      align-items: center;
    `,
    stack: css`
      width: 100%;
      min-height: ${minHeight + 7}px;
      align-items: center;
      justify-content: center;
    `,
    empty: css`
      font-style: italic;
    `,
  };
};

export default getStyles;
