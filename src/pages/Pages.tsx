import { Route, Routes } from "react-router-dom";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import Home from "./Home";
import MainLayout from "@/components/layout/MainLayout";
import { Toaster } from "sonner";

const Pages = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/sign_up" element={<SignUpPage />} />
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
      <Toaster position="bottom-left" closeButton />
    </>
  );
};

export default Pages;
