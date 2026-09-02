// src/routes/EmployeeRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function EmployeeRoute({ children }) {
  const { isEmployee, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isEmployee) {
    if (isAdmin) {
      return <Navigate to="/" replace />; // Admin trying to access employee area
    }
    return <Navigate to="/employee-login" replace />;
  }

  return children;
}
