import { Theme, keyframes, css } from "@mui/material";

const getStyles = (theme: Theme) => {
  const fadeIn = keyframes`
    0% {opacity: 0;}
    100% {opacity: 1;}
  `;
  return {
    videoContainer: css`
      z-index: -1;
      position: fixed;
      overflow: hidden;
      left: 0;
      top: 0;
      height: 100vh;
      width: 100vw;
      background-color: black;
    `,
    videoLoading: css`
      display: none;
    `,
    video: css`
      height: 100%;
      width: 100%;
      object-fit: cover;
      filter: blur(10px) grayscale(80%) contrast(120%) brightness(50%);
      animation: ${fadeIn} 4s ease;
    `,
    splashTextStack: css`
      flex-flow: column nowrap;
      justify-content: center;
      height: 100%;
    `,
    splashTextLarge: css`
      text-align: center;
      color: white;
      margin: ${theme.spacing(4)};
      @media (max-width: ${theme.breakpoints.values.sm}px) {
        display: none;
      }
    `,
    splashTextSmall: css`
      display: none;
      text-align: center;
      color: white;
      margin: ${theme.spacing(4)};
      @media (max-width: ${theme.breakpoints.values.sm}px) {
        display: initial;
      }
    `,
    buttons: css`
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      color: white;
      margin-top: ${theme.spacing(6)};
      @media (max-width: ${theme.breakpoints.values.sm}px) {
        margin-top: 0;
      }
    `,
  };
};

export default getStyles;
