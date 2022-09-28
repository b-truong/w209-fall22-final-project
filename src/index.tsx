/** @jsxImportSource @emotion/react */

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { register } from "./service-register";

// Bootstrap the React app
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register the service worker
register();
