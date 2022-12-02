import { Theme, css } from "@mui/material";

const getStyles = (theme: Theme) => {
  return {
    box: css`
      padding: ${theme.spacing(2)};
      flex-flow: row nowrap;
      align-items: flex-end;
    `,
    filterBox: css`
      padding: ${theme.spacing(2)};
      flex-flow: column wrap;
      width: 300px;
      max-width: calc(100vw - ${theme.spacing(4)});
    `,
    form: css`
      width: 100%;
    `,
    input: css`
      flex-grow: 1;
    `,
    button: css`
      margin-left: ${theme.spacing(2)};
    `,
    random: css`
      margin-left: ${theme.spacing(2)};
      transition: transform 0.4s ease-out;
      &:active {
        transition: 0s;
        transform: rotate(360deg);
      }
    `,
    sliderBox: css`
      width: 100%;
      padding: ${theme.spacing(2)};
      padding-bottom: 0;
    `,
    resetBox: css`
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;
      padding-top: ${theme.spacing(2)};
      padding-right: ${theme.spacing(1)};
    `,
  };
};

export default getStyles;
