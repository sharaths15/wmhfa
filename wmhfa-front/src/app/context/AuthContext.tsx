import {
  createContext,
  useState,
  useEffect,
  type ReactNode,
  useCallback,
} from "react";
import { type User } from "../types/user";
import * as authApi from "../api/auth.api";
import { type TLoginSchema } from "../pages/Auth/Login";
import { type TSignupSchema } from "../pages/Auth/Signup";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (data: TLoginSchema) => Promise<void>;
  signup: (data: TSignupSchema) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const checkAuthStatus = useCallback(async () => {
    try {
      const currentUser = await authApi.getMe();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const login = async (data: TLoginSchema) => {
    await authApi.loginUser(data);
    await checkAuthStatus();
    navigate("/dashboard");
  };

  const signup = async (data: TSignupSchema) => {
    const { name, email, password } = data;
    await authApi.signupUser({ fullName: name, email, password });
    navigate("/login");
  };

  const logout = async () => {
    await authApi.logoutUser();
    setUser(null);
    navigate("/login");
  };

  const value = {
    isAuthenticated: !!user,
    user,
    login,
    signup,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
