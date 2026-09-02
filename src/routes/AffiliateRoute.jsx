import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AffiliateRoute({ children }) {
  const { isAffiliate, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isAffiliate) {
    if (isAdmin) {
      return <Navigate to="/" replace />;
    }
    return <Navigate to="/affiliate-login" replace />;
  }

  return children;
}