
// //src/components/layout/BottomNav.jsx
// import { NavLink } from "react-router-dom";

// export default function BottomNav() {
//   return (
//     <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t shadow z-50">
//       <div className="flex justify-around py-2 text-xs">
//         <NavLink to="/" className="flex flex-col items-center">
//           🏠
//           <span>Home</span>
//         </NavLink>

//         <NavLink to="/organizations" className="flex flex-col items-center">
//           🏢
//           <span>Orgs</span>
//         </NavLink>

//         <NavLink to="/plans" className="flex flex-col items-center">
//           📦
//           <span>Plans</span>
//         </NavLink>

//         <NavLink to="/settings" className="flex flex-col items-center">
//           ⚙️
//           <span>Settings</span>
//         </NavLink>
//       </div>
//     </div>
//   );
// }

// // src/components/layout/BottomNav.jsx
// import { NavLink } from "react-router-dom";

// export default function BottomNav() {
//   return (
//     <div className="lg:hidden fixed bottom-0 left-0 right-0 w-full bg-[hsl(var(--card-bg)/0.92)] backdrop-blur-lg border-t border-[hsl(var(--border))] shadow-lg z-50">
//       <div className="flex justify-around items-center py-2.5 text-xs">
//         <NavLink
//           to="/"
//           className={({ isActive }) =>
//             `flex flex-col items-center gap-1 transition-colors duration-200 ${
//               isActive
//                 ? "text-[hsl(var(--accent))] font-medium"
//                 : "text-[hsl(var(--text-muted))] hover:text-[hsl(var(--accent))]/90"
//             }`
//           }
//         >
//           🏠
//           <span>Home</span>
//         </NavLink>

//         <NavLink
//           to="/organizations"
//           className={({ isActive }) =>
//             `flex flex-col items-center gap-1 transition-colors duration-200 ${
//               isActive
//                 ? "text-[hsl(var(--accent))] font-medium"
//                 : "text-[hsl(var(--text-muted))] hover:text-[hsl(var(--accent))]/90"
//             }`
//           }
//         >
//           🏢
//           <span>Orgs</span>
//         </NavLink>

//         <NavLink
//           to="/plans"
//           className={({ isActive }) =>
//             `flex flex-col items-center gap-1 transition-colors duration-200 ${
//               isActive
//                 ? "text-[hsl(var(--accent))] font-medium"
//                 : "text-[hsl(var(--text-muted))] hover:text-[hsl(var(--accent))]/90"
//             }`
//           }
//         >
//           📦
//           <span>Plans</span>
//         </NavLink>

//         <NavLink
//           to="/settings"
//           className={({ isActive }) =>
//             `flex flex-col items-center gap-1 transition-colors duration-200 ${
//               isActive
//                 ? "text-[hsl(var(--accent))] font-medium"
//                 : "text-[hsl(var(--text-muted))] hover:text-[hsl(var(--accent))]/90"
//             }`
//           }
//         >
//           ⚙️
//           <span>Settings</span>
//         </NavLink>
//       </div>
//     </div>
//   );
// }
// divya
// src/components/layout/BottomNav.jsx
import { NavLink } from "react-router-dom";
import {
  Home,
  Building2,
  ReceiptIndianRupee,
  Ticket,
  Settings,
} from "lucide-react";

const bottomMenu = [
  { name: "Home", path: "/", icon: Home },
  { name: "Orgs", path: "/organizations", icon: Building2 },
  { name: "Trans", path: "/transactions", icon: ReceiptIndianRupee },
  { name: "Support", path: "/admin/support-tickets", icon: Ticket },
  { name: "Settings", path: "/settings", icon: Settings },
];

export default function BottomNav() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 w-full bg-[hsl(var(--card-bg)/0.96)] backdrop-blur-lg border-t border-[hsl(var(--border))] shadow-lg z-50">
      <div className="grid grid-cols-5 items-center px-1 py-2 text-[10px] xs:text-xs">
        {bottomMenu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 rounded-xl py-1.5 transition-colors duration-200 ${
                isActive
                  ? "text-[hsl(var(--accent))] font-semibold"
                  : "text-[hsl(var(--text-muted))] hover:text-[hsl(var(--accent))]/90"
              }`
            }
          >
            <item.icon size={20} strokeWidth={2.2} />
            <span className="leading-none truncate max-w-full">
              {item.name}
            </span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}