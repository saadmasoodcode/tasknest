import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const { user, initializing } = useAuth();

  return !initializing && user?.id ? <MainLayout /> : <Navigate to={"/"} />;
};

export default PrivateRoutes;
