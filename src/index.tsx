/** @jsxImportSource @emotion/react */

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";

// Bootstrap the React app
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
