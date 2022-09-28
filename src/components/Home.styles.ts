import { css } from "@emotion/react";
import { Theme } from "@mui/material";

const getStyles = (theme: Theme) => {
  const typeface = theme.typography.body1;
  return {
    body: css`
      font-family: ${typeface.fontFamily};
      font-weight: ${typeface.fontWeight};
      font-size: ${typeface.fontSize};
      line-height: ${typeface.lineHeight};
      letter-spacing: ${typeface.fontFamily};
    `,
  };
};

export default getStyles;
