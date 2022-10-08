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
      transition: transform 0.4s ease-out;
      &:hover {
        transform: rotate(-20deg);
      }
      &:active {
        transition: 0s;
        transform: rotate(360deg);
      }
    `,
  };
};

export default getStyles;
