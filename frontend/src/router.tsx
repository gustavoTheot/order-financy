import { Route, Routes, Navigate } from "react-router-dom";
import { Sign } from "./pages/signin";
import { Signup } from "./pages/signup";
import { CategoryPage } from "./pages/category";
import { TransactionsPage } from "./pages/transactions";
import { DashboardPage } from "./pages/dashboard";
import { SettingsPage } from "./pages/settings";
import { PrivateRoute } from "./components/PrivateRoute";
import { useAuthStore } from "@/hooks/useSessionStore";

export function Router() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Sign />
          )
        }
      />

      <Route
        path="/sign"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Sign />
        }
      />
      <Route
        path="/signup"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Signup />
        }
      />

      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      <Route
        path="*"
        element={
          <Navigate to={isAuthenticated ? "/dashboard" : "/"} replace />
        }
      />
    </Routes>
  );
}