import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvidor } from "./context/AuthContext.tsx";
import { TodoGroupContextProvidor } from "./context/TodoGroupContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvidor>
        <TodoGroupContextProvidor>
          <App />
        </TodoGroupContextProvidor>
      </AuthContextProvidor>
    </BrowserRouter>
  </StrictMode>
);
