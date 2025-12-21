import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // TEMP auth (replace with backend later)
    if (email === "kmandaraaa@gmail.com" && password === "admin123") {
      localStorage.setItem("admin_auth", "true");
      navigate("/admin");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/10 p-8 rounded-2xl border border-white/10 shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 rounded-lg bg-white/20 text-white outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-2 rounded-lg bg-white/20 text-white outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full py-2 rounded-lg bg-white text-black font-semibold hover:opacity-90"
        >
          Login
        </button>
      </div>
    </div>
  );
}
