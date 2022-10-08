import { Theme, css } from "@mui/material";

const getStyles = (theme: Theme) => {
  return {
    box: css`
      padding: ${theme.spacing(2)};
      flex-flow: row nowrap;
      align-items: flex-end;
    `,
    input: css`
      flex-grow: 1;
    `,
    button: css`
      margin-left: ${theme.spacing(2)};
    `,
  };
};

export default getStyles;
