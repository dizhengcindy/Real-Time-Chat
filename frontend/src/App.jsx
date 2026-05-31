import { Loader } from "lucide-react";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import Navbar from "./components/common";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import { SettingsPage } from "./pages/SettingsPage";
import { SignupPage } from "./pages/SignupPage";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";

const ProtectedRoutes = () => {
  const { authUser } = useAuthStore();
  return authUser ? <Outlet /> : <Navigate to="/login" />;
};

const PublicOnlyRoutes = () => {
  const { authUser } = useAuthStore();
  return !authUser ? <Outlet /> : <Navigate to="/" />;
};

const App = () => {
  const { authUser, isCheckingAuth, checkAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  console.log("onlineUsers", onlineUsers);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        <Route element={<PublicOnlyRoutes />}>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route path="/settings" element={<SettingsPage />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
