import { Theme, css } from "@mui/material";

const getStyles = (theme: Theme) => {
  return {
    pageLoader: css`
      justify-content: center;
      align-items: center;
      height: 100%;
    `,
    paramBox: css`
      flex-direction: row;
      justify-content: space-between;
      padding: ${theme.spacing(2)};
      @media (max-width: 600px) {
        flex-wrap: wrap;
      }
    `,
    class: css`
      flex-basis: 50%;
      @media (max-width: 600px) {
        margin-bottom: ${theme.spacing(2)};
        flex-basis: 100%;
      }
    `,
    rounds: css`
      flex-basis: 25%;
      margin-left: ${theme.spacing(2)};
      @media (max-width: 600px) {
        margin-left: 0;
        flex-basis: calc(50% - ${theme.spacing(1)});
      }
    `,
    bouts: css`
      flex-basis: 25%;
      margin-left: ${theme.spacing(2)};
      @media (max-width: 600px) {
        margin-left: 0;
        flex-basis: calc(50% - ${theme.spacing(1)});
      }
    `,
  };
};

export default getStyles;
