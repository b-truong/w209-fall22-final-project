import { Theme, css } from "@mui/material";

const getStyles = (theme: Theme) => {
  return {
    sliderBox: css`
      width: 100%;
      padding: ${theme.spacing(2)};
      padding-top: 0;
    `,
    sliderRow: css`
      flex-flow: row nowrap;
      justify-content: space-between;
    `,
  };
};

export default getStyles;
