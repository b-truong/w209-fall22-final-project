import { css, Theme } from "@mui/material";

const getStyles = (theme: Theme) => {
  return {
    title: css`
      margin: ${theme.spacing(2)};
      margin-bottom: 0;
    `,
    stack: css`
      width: 100%;
      height: 290px;
      align-items: center;
      justify-content: center;
    `,
    empty: css`
      font-style: italic;
    `,
  };
};

export default getStyles;
