


import { Routes, Route, Navigate } from "react-router-dom";

import AffiliateRoute from "./AffiliateRoute";
import AffiliateLayout from "../components/layout/AffiliateLayout";

// Auth
import AffiliateLogin from "../pages/auth/AffiliateLogin";
import AffiliateRegister from "../pages/auth/AffiliateRegister";

// Affiliate Pages
import AffiliateDashboard from "../pages/affiliate/AffiliateDashboard";
import MyReferredOrganizations from "../pages/affiliate/MyReferredOrganizations";
import AffiliateWallet from "../pages/affiliate/AffiliateWallet";
import AffiliateTransactions from "../pages/affiliate/AffiliateTransactions";
import AffiliateProfile from "../pages/affiliate/AffiliateProfile";
import AffiliateSettings from "../pages/affiliate/AffiliateSettings";
import AffiliateSettingsLayout from "../pages/affiliate/AffiliateSettingsLayout";

export default function AffiliateRoutes() {
  return (
    <Routes>

      {/* ================= PUBLIC ROUTES ================= */}

      <Route
        path="/affiliate-login"
        element={<AffiliateLogin />}
      />

      <Route
        path="/affiliate-register"
        element={<AffiliateRegister />}
      />


      {/* ================= PROTECTED ROUTES ================= */}

      <Route
        path="/affiliate"
        element={
          <AffiliateRoute>
            <AffiliateLayout />
          </AffiliateRoute>
        }
      >

        {/* Dashboard */}
        <Route
          path="dashboard"
          element={<AffiliateDashboard />}
        />

        {/* Referred Organizations */}
        <Route
          path="referred-organizations"
          element={<MyReferredOrganizations />}
        />

        {/* Wallet */}
        <Route
          path="wallet"
          element={<AffiliateWallet />}
        />

        {/* Transactions */}
        <Route
          path="transactions"
          element={<AffiliateTransactions />}
        />


        {/* ================= SETTINGS ================= */}

        <Route
          path="settings"
          element={<AffiliateSettingsLayout />}
        >

          {/* /affiliate/settings */}
          <Route
            index
            element={
              <Navigate
                to="/affiliate/settings/profile"
                replace
              />
            }
          />

          {/* /affiliate/settings/profile */}
          <Route
            path="profile"
            element={<AffiliateProfile />}
          />

          {/* /affiliate/settings/bank-details */}
          <Route
            path="bank-details"
            element={<AffiliateSettings />}
          />

        </Route>

      </Route>

    </Routes>
  );
}