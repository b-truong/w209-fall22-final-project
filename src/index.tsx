/** @jsxImportSource @emotion/react */

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { register, ServiceWorkerEvents } from "./service-register";
import Observer from "./components/Observer";

// Register the service worker
const swEventObserver = new Observer<ServiceWorkerEvents>();
register(swEventObserver);

// Bootstrap the React app
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App swEventObserver={swEventObserver} />
  </React.StrictMode>
);
