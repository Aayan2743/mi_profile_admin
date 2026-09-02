// import { Routes, Route } from "react-router-dom";
// import AffiliateRoute from "./AffiliateRoute";

// // Auth pages
// import AffiliateLogin from "../pages/auth/AffiliateLogin";
// import AffiliateRegister from "../pages/auth/AffiliateRegister";

// // Affiliate pages (you will create these)
// import AffiliateDashboard from "../pages/affiliate/AffiliateDashboard";
// import MyReferredOrganizations from "../pages/affiliate/MyReferredOrganizations";
// import AffiliateProfile from "../pages/affiliate/AffiliateProfile";
// import AffiliateSettings from "../pages/affiliate/AffiliateSettings";
// import AffiliateTransactions from "../pages/affiliate/AffiliateTransactions";
// import AffiliateWallet from "../pages/affiliate/AffiliateWallet";

// export default function AffiliateRoutes() {
//   return (
//     <Routes>
//       {/* Public */}
//       <Route path="/affiliate-login" element={<AffiliateLogin />} />
//       <Route path="/affiliate-register" element={<AffiliateRegister />} />

//       {/* Protected Affiliate Routes */}
//       <Route
//         path="/affiliate/dashboard"
//         element={
//           <AffiliateRoute>
//             <AffiliateDashboard />
//           </AffiliateRoute>
//         }
//       />

//       <Route
//         path="/affiliate/referred-organizations"
//         element={
//           <AffiliateRoute>
//             <MyReferredOrganizations />
//           </AffiliateRoute>
//         }
//       />

//       <Route
//         path="/affiliate/wallet"
//         element={
//           <AffiliateRoute>
//             <AffiliateWallet />
//           </AffiliateRoute>
//         }
//       />

//       <Route
//         path="/affiliate/transactions"
//         element={
//           <AffiliateRoute>
//             <AffiliateTransactions />
//           </AffiliateRoute>
//         }
//       />

//       <Route
//         path="/affiliate/profile"
//         element={
//           <AffiliateRoute>
//             <AffiliateProfile />
//           </AffiliateRoute>
//         }
//       />

//       <Route
//         path="/affiliate/settings"
//         element={
//           <AffiliateRoute>
//             <AffiliateSettings />
//           </AffiliateRoute>
//         }
//       />
//     </Routes>
//   );
// }

// import { Routes, Route } from "react-router-dom";
// import AffiliateRoute from "./AffiliateRoute";
// import AffiliateLayout from "../components/layout/AffiliateLayout";

// import AffiliateLogin from "../pages/auth/AffiliateLogin";
// import AffiliateRegister from "../pages/auth/AffiliateRegister";
// import AffiliateDashboard from "../pages/affiliate/AffiliateDashboard";
// import MyReferredOrganizations from "../pages/affiliate/MyReferredOrganizations";
// import AffiliateWallet from "../pages/affiliate/AffiliateWallet";
// import AffiliateTransactions from "../pages/affiliate/AffiliateTransactions";
// import AffiliateProfile from "../pages/affiliate/AffiliateProfile";
// import AffiliateSettings from "../pages/affiliate/AffiliateSettings";

// export default function AffiliateRoutes() {
//   return (
//     <Routes>
//       {/* Public routes */}
//       <Route path="/affiliate-login" element={<AffiliateLogin />} />
//       <Route path="/affiliate-register" element={<AffiliateRegister />} />

//       {/* Protected routes with Layout */}
//       <Route
//         path="/affiliate"
//         element={
//           <AffiliateRoute>
//             <AffiliateLayout />
//           </AffiliateRoute>
//         }
//       >
//         <Route path="dashboard" element={<AffiliateDashboard />} />
//         <Route path="referred-organizations" element={<MyReferredOrganizations />} />
//         <Route path="wallet" element={<AffiliateWallet />} />
//         <Route path="transactions" element={<AffiliateTransactions />} />
//         <Route path="profile" element={<AffiliateProfile />} />
//         <Route path="settings" element={<AffiliateSettings />} />
        
//       </Route>
//     </Routes>
//   );
// }


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