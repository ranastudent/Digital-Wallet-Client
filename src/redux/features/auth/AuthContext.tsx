/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, type ReactNode } from "react";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "@/redux/store";
import { setCredentials, logout as logoutAction } from "@/redux/features/auth/authSlice";

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  loading: boolean;
  login: (token: string, userData: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch(); // ✅ make sure useDispatch is imported
  const { user, token, loading } = useSelector((state: RootState) => state.auth);

  // Implement login properly
  const login = (token: string, userData: any) => {
    dispatch(setCredentials({ token, user: userData })); // ✅ dispatch slice action
  };

  const logout = () => {
    dispatch(logoutAction()); // ✅ dispatch logout action
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
