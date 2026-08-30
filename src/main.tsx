import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ProjectProvider } from "./context/ProjectContext";
import App from "./App";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  
  <React.StrictMode>

    <ProjectProvider>

      <BrowserRouter>

        <App />

      </BrowserRouter>

    </ProjectProvider>
    
  </React.StrictMode>
);