// src/App.jsx
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AdminRoutes from "./routes/AdminRoutes";
import EmployeeRoutes from "./routes/EmployeeRoutes";
import AffiliateRoutes from "./routes/AffiliateRoutes";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AdminRoutes />
        <EmployeeRoutes />
        <AffiliateRoutes/>
      </BrowserRouter>
    </AuthProvider>
  );
}


