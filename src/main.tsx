import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvidor } from "./context/AuthContext.tsx";
import { TodoGroupContextProvidor } from "./context/TodoGroupContext.tsx";
import { TodoContextProvider } from "./context/TodosContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvidor>
        <TodoGroupContextProvidor>
          <TodoContextProvider>
            <App />
          </TodoContextProvider>
        </TodoGroupContextProvidor>
      </AuthContextProvidor>
    </BrowserRouter>
  </StrictMode>
);
