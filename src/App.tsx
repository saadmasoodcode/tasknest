import Pages from "./pages/Pages";
import "./App.css";
import { useEffect } from "react";
import { useAuth } from "./context/AuthContext";

function App() {
  const { getAccessToken } = useAuth();

  useEffect(() => {
    const refresh_token = localStorage.getItem("refreshToken");
    if (refresh_token) {
      getAccessToken({ refresh_token });
    }
  }, []);

  return (
    <>
      <Pages />
    </>
  );
}

export default App;
