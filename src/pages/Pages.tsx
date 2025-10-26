import { Navigate, Route, Routes } from "react-router-dom";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import Home from "./Home";
import { Toaster } from "sonner";
import { useAuth } from "@/context/AuthContext";
import Loading from "./Loading";
import PrivateRoutes from "./PrivateRoutes";
import TodosPage from "./TodosPage";

const Pages = () => {
  const { user, initializing } = useAuth();

  if (initializing) return <Loading />;

  return (
    <>
      <Routes>
        {/* Public routes */}
        {!user?.id && (
          <>
            <Route path="/" element={<SignInPage />} />
            <Route path="/sign_up" element={<SignUpPage />} />
          </>
        )}

        {/* Private routes */}
        {user && (
          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<Home />} />
            <Route path="/group/:id" element={<TodosPage />} />
            {/* fallback */}
            <Route path="*" element={<Navigate to="/home" />} />
          </Route>
        )}

        {/* fallback: if not matched */}
        {!user?.id && <Route path="*" element={<Navigate to="/" />} />}
      </Routes>

      <Toaster position="bottom-left" />
    </>
  );
};

export default Pages;
