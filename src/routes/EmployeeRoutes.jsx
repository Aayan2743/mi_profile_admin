// src/routes/EmployeeRoutes.jsx
import { Routes, Route } from "react-router-dom";
import EmployeeRoute from "./EmployeeRoute";

// ✅ Import your components
import EmployeeLogin from "../pages/auth/EmployeeLogin";
import EmployeeDashboard from "../pages/employee/EmployeeDashboard";
import Organizations from "../pages/employee/Organizations";
import Settings from "../pages/employee/Settings";
// Import other employee pages here as needed...

export default function EmployeeRoutes() {
  return (
    <Routes>
      {/* Public - Employee Login */}
      <Route path="/employee-login" element={<EmployeeLogin />} />

      {/* Protected - Employee Dashboard */}
      <Route
        path="/employee/dashboard"
        element={
          <EmployeeRoute>
            <EmployeeDashboard />
          </EmployeeRoute>
        }
      />

      <Route path="/employee/organizations" element={<Organizations />} />
      <Route path="/employee/settings" element={<Settings />} />

      {/* Add more employee routes here */}
    </Routes>
  );
}
