import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import HomePage from "./pages/home";
import AdminLogin from "./pages/adminlogin";
import AdminPage from "./pages/adminpage";
import Navbar from "./components/Navbar";

// ✅ Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuth = localStorage.getItem("admin_auth") === "true";
  return isAuth ? <>{children}</> : <Navigate to="/admin-login" replace />;
}

// ✅ Layout wrapper that conditionally hides Navbar
function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  // Routes where Navbar should be hidden
  const hideNavbarOn = ["/admin", "/admin-login"];
  const shouldHideNavbar = hideNavbarOn.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      {children}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* Protected admin route */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
