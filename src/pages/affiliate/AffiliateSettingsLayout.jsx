// import { NavLink, Outlet } from "react-router-dom";

// import {
//   User,
//   Building2,
// } from "lucide-react";

// export default function AffiliateSettingsLayout() {
//   const settingsMenu = [
//     {
//       name: "Profile",
//       path: "/affiliate/settings/profile",
//       icon: User,
//     },
//     {
//       name: "Bank Details",
//       path: "/affiliate/settings/bank-details",
//       icon: Building2,
//     },
//   ];

//   return (
//     <div className="p-6 lg:p-8">

//       {/* ================= HEADER ================= */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900">
//           Settings
//         </h1>

//         <p className="text-gray-500 mt-1">
//           Manage your account and payment information
//         </p>
//       </div>

//       {/* ================= SETTINGS AREA ================= */}
//       <div className="flex flex-col lg:flex-row gap-7">

//         {/* ================= SETTINGS SIDEBAR ================= */}
//         <aside className="w-full lg:w-72 shrink-0">

//           <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3">

//             {settingsMenu.map((item) => (
//               <NavLink
//                 key={item.path}
//                 to={item.path}
//                 className={({ isActive }) =>
//                   `flex items-center gap-3 px-5 py-4 rounded-xl mb-1 text-sm font-medium transition ${
//                     isActive
//                       ? "bg-gray-100 text-gray-900 shadow-sm"
//                       : "text-gray-400 hover:bg-gray-50 hover:text-gray-700"
//                   }`
//                 }
//               >
//                 <item.icon size={19} />
//                 {item.name}
//               </NavLink>
//             ))}

//           </div>

//         </aside>

//         {/* ================= SETTINGS CONTENT ================= */}
//         <section className="flex-1 min-w-0">
//           <Outlet />
//         </section>

//       </div>

//     </div>
//   );
// }

import { NavLink, Outlet } from "react-router-dom";
import {
  User,
  Building2,
} from "lucide-react";

export default function AffiliateSettingsLayout() {
  const settingsMenu = [
    {
      name: "Profile",
      path: "/affiliate/settings/profile",
      icon: User,
    },
    {
      name: "Bank Details",
      path: "/affiliate/settings/bank-details",
      icon: Building2,
    },
  ];

  return (
    <div className="w-full p-6 lg:p-8">

      {/* =====================================================
          SETTINGS HEADER
      ====================================================== */}
      <div className="mb-7">
        <h1 className="text-3xl font-bold text-gray-900">
          Settings
        </h1>

        <p className="text-gray-500 mt-1">
          Manage your account and payment information
        </p>
      </div>


      {/* =====================================================
          SETTINGS MAIN AREA
      ====================================================== */}
      <div className="flex flex-col lg:flex-row gap-7 w-full">


        {/* ===================================================
            SETTINGS SUB SIDEBAR
        ==================================================== */}
        <aside className="w-full lg:w-72 shrink-0">

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3">

            {settingsMenu.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-5 py-4 rounded-xl mb-1 text-sm font-medium transition ${
                    isActive
                      ? "bg-gray-100 text-gray-900 shadow-sm"
                      : "text-gray-400 hover:bg-gray-50 hover:text-gray-700"
                  }`
                }
              >
                <item.icon size={19} />

                <span>
                  {item.name}
                </span>
              </NavLink>
            ))}

          </div>

        </aside>


        {/* ===================================================
            WIDE CONTENT AREA
        ==================================================== */}
        <section className="flex-1 min-w-0 w-full">

          <Outlet />

        </section>

      </div>

    </div>
  );
}