import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import AdminLogin from "./pages/adminpage";
import Navbar from "./components/Navbar"; // 👈 adjust path if needed

export default function App() {
  return (
    <BrowserRouter>
      {/* Global Navbar */}
      <Navbar />

      {/* Pages */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
}
