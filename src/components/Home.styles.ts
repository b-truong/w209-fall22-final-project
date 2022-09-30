import { Theme, keyframes, css } from "@mui/material";

const getStyles = (theme: Theme) => {
  const fadeIn = keyframes`
    0% {opacity: 0;}
    100% {opacity: 1;}
  `;
  return {
    video: css`
      z-index: -1;
      position: fixed;
      overflow: hidden;
      left: 0;
      top: 0;
      height: 100vh;
      width: 100vw;
      object-fit: cover;
      filter: blur(10px) grayscale(80%) contrast(120%) brightness(50%);
      animation: ${fadeIn} 4s ease;
    `,
    stretch: css`
      height: 90%;
      box-sizing: border-box;
    `,
  };
};

export default getStyles;
