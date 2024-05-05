import React from "react";
import "./index.css";
import App from "./App";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

const rootContainer = document.getElementById("root");
const root = createRoot(rootContainer!);
root.render(
  <Router>
    <App />
  </Router>
    
);
