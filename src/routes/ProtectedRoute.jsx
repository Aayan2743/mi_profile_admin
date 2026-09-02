// // src/routes/ProtectedRoute.jsx
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function ProtectedRoute({ children }) {
//   const { user, loading } = useAuth();

//   // ⏳ Wait for auth check
//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center">
//         <span>Loading...</span>
//       </div>
//     );
//   }

//   // 🔐 Not authenticated
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }

// src/routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({
  children,
  allowedRoles = ["admin", "employee"],
}) {
  const { user, userType, loading, isAdmin, isEmployee } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[hsl(var(--bg-primary))]">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-[hsl(var(--accent))] border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check role permission
  const hasAccess =
    (allowedRoles.includes("admin") && isAdmin) ||
    (allowedRoles.includes("employee") && isEmployee);

  if (!hasAccess) {
    // Redirect to appropriate login or dashboard
    return (
      <Navigate to={isEmployee ? "/employee/dashboard" : "/login"} replace />
    );
  }

  return children;
}
