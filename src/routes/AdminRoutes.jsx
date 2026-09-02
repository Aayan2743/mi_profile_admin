//src/routes/AdminRoutes.jsx
import { Routes, Route } from "react-router-dom";
// import AdminRoute from "./AdminRoute";
import AdminRoute from "./AdminRoute";

/* =====================
   Direct Imports
===================== */

import Dashboard from "../pages/dashboard/Dashboard";
import OrganizationList from "../pages/organizations/OrganizationList";
import OrganizationView from "../pages/organizations/OrganizationView";
import AddOrganization from "../pages/organizations/AddOrganization";
import CardsView from "../pages/organizations/CardsView";
import CardsView1 from "../pages/organizations/CardsView1";
import AddPlan from "../pages/plans/AddPlan";
import Settings from "../pages/settings/Settings";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import PaymentTransactions from "../pages/organizations/PaymentTransactions";
import OrganizationAccessSettings from "../pages/organizations/OrganizationAccessSettings";
import CardTemplate from "../pages/organizations/CardTemplate";
import CardPreview from "../pages/organizations/CardPreview";
import ShowCard from "../pages/organizations/ShowCard";
import AllAssignedCards from "../pages/organizations/AllAssignedCards";
import Register from "../pages/auth/Register";
import AdminSupportTickets from "../pages/organizations/AdminSupportTickets";
import Notifications from "../pages/organizations/Notifications";
import AdminNfcRequests from "../pages/organizations/AdminNfcRequests";
import Staff from "../pages/organizations/Staff";
import EmployeeLogin from "../pages/auth/EmployeeLogin";
import Affiliates from "../pages/organizations/Affiliates";
export default function AdminRoutes() {
  return (
    <Routes>
      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      {/* <Route path="/employee-login" element={<EmployeeLogin />} /> */}
      <Route path="/register" element={<Register />} />
      <Route path="/forget-password" element={<ForgotPassword />} />

      {/* DASHBOARD */}
      <Route
        path="/"
        element={
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        }
      />

      {/* ORGANIZATIONS */}
      <Route
        path="/organizations"
        element={
          <AdminRoute>
            <OrganizationList />
          </AdminRoute>
        }
      />

      <Route
        path="/staff"
        element={
          <AdminRoute>
            <Staff />
          </AdminRoute>
        }
      />

      <Route
        path="/nfc-cards-request"
        element={
          <AdminRoute>
            <AdminNfcRequests />
          </AdminRoute>
        }
      />

      <Route
        path="/organizations/add"
        element={
          <AdminRoute>
            <AddOrganization />
          </AdminRoute>
        }
      />

      <Route
        path="/organizations/:id"
        element={
          <AdminRoute>
            <OrganizationView />
          </AdminRoute>
        }
      />

      <Route
        path="/organizations/cards/:id"
        element={
          <AdminRoute>
            <CardsView />
          </AdminRoute>
        }
      />

      <Route
        path="/organizations/cards/:cardId/view"
        element={
          <AdminRoute>
            <ShowCard />
          </AdminRoute>
        }
      />

      <Route
        path="/organizations/:orgid/cards/:cardid"
        element={
          <AdminRoute>
            <AllAssignedCards />
          </AdminRoute>
        }
      />

      <Route
        path="/organizations/templates"
        element={
          <AdminRoute>
            <CardsView1 />
          </AdminRoute>
        }
      />

      <Route
        path="/organizations/cardstemplate"
        element={
          <AdminRoute>
            <CardTemplate />
          </AdminRoute>
        }
      />

      {/* CARD PREVIEW */}
      <Route
        path="/card-preview"
        element={
          <AdminRoute>
            <CardPreview />
          </AdminRoute>
        }
      />

      {/* TRANSACTIONS */}
      <Route
        path="/transactions"
        element={
          <AdminRoute>
            <PaymentTransactions />
          </AdminRoute>
        }
      />

      {/* ACCESS SETTINGS */}
      <Route
        path="/admin/organizations/:orgid/access-settings"
        element={
          <AdminRoute>
            <OrganizationAccessSettings />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/notifications"
        element={
          <AdminRoute>
            <Notifications />
          </AdminRoute>
        }
      />
      {/* PLANS */}
      <Route
        path="/plans"
        element={
          <AdminRoute>
            <AddPlan />
          </AdminRoute>
        }
      />

      {/* SETTINGS */}
      <Route
        path="/settings"
        element={
          <AdminRoute>
            <Settings />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/support-tickets"
        element={
          <AdminRoute>
            <AdminSupportTickets />
          </AdminRoute>
        }
      />
      <Route
  path="/affiliates"
  element={
    <AdminRoute>
      <Affiliates />
    </AdminRoute>
  }
/>
    </Routes>
  );
}
