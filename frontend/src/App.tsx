import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import HomePage from "./pages/home";
import AdminLogin from "./pages/adminlogin";
import AdminPage from "./pages/adminpage";
import Navbar from "./components/Navbar";

// ✅ Protected Route
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuth = localStorage.getItem("admin_auth") === "true";
  return isAuth ? <>{children}</> : <Navigate to="/admin-login" replace />;
}

// ✅ Layout (hide navbar on admin pages)
function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const hideNavbarOn = ["/admin", "/admin-login"];

  return (
    <>
      {!hideNavbarOn.includes(location.pathname) && <Navbar />}
      {children}
    </>
  );
}

export default function App() {
  // ✅ FIX GitHub Pages refresh + direct URL
  useEffect(() => {
    const redirect = sessionStorage.redirect;
    if (redirect) {
      sessionStorage.removeItem("redirect");
      window.history.replaceState(null, "", redirect);
    }
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Public */}
          <Route path="/" element={<HomePage />} />
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* Protected */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
