// src/context/AuthContext.tsx
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  user: { email: string } | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    // Simple demo admin check
    if (email === "admin@gmail.com" && password === "admin123") {
      setUser({ email });
      navigate("/admin", { replace: true });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    navigate("/admin-login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
