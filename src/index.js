import "./styles.css";

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.js";

import themes from "devextreme/ui/themes";

const root = ReactDOM.createRoot(document.getElementById("root"));

themes.initialized(() => root.render(<App />));
