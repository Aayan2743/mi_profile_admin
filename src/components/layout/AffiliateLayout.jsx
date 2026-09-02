// import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import {
//   LayoutDashboard,
//   Users,
//   Wallet,
//   ArrowLeftRight,
//   User,
//   Settings,
//   LogOut,
//   Link as LinkIcon,
// } from "lucide-react";

// export default function AffiliateLayout() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/affiliate-login");
//   };

//   const menuItems = [
//     { name: "Dashboard", path: "/affiliate/dashboard", icon: LayoutDashboard },
//     { name: "My Referred Orgs", path: "/affiliate/referred-organizations", icon: Users },
//     { name: "Wallet", path: "/affiliate/wallet", icon: Wallet },
//     { name: "Transactions", path: "/affiliate/transactions", icon: ArrowLeftRight },
//     { name: "Profile", path: "/affiliate/profile", icon: User },
//     { name: "Settings", path: "/affiliate/settings", icon: Settings },
//   ];

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* ========== SIDEBAR ========== */}
//       <aside className="w-64 bg-[#1f1712] text-white flex flex-col">
//         {/* Logo / Brand */}
//         <div className="p-5 border-b border-white/10">
//           <h1 className="text-xl font-bold text-[#FC6C26]">Mi Profile</h1>
//           <p className="text-xs text-gray-400 mt-1">Affiliate Panel</p>
//         </div>

//         {/* User Info */}
//         <div className="p-4 border-b border-white/10">
//           <p className="font-semibold text-sm truncate">{user?.name || "Affiliate"}</p>
//           <p className="text-xs text-gray-400 truncate">{user?.email}</p>
//         </div>

//         {/* Menu */}
//         <nav className="flex-1 p-3 space-y-1">
//           {menuItems.map((item) => (
//             <NavLink
//               key={item.path}
//               to={item.path}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
//                   isActive
//                     ? "bg-[#FC6C26] text-white"
//                     : "text-gray-300 hover:bg-white/10 hover:text-white"
//                 }`
//               }
//             >
//               <item.icon size={18} />
//               {item.name}
//             </NavLink>
//           ))}
//         </nav>

//         {/* Logout */}
//         <div className="p-3 border-t border-white/10">
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition"
//           >
//             <LogOut size={18} />
//             Logout
//           </button>
//         </div>
//       </aside>

//       {/* ========== MAIN CONTENT ========== */}
//       <main className="flex-1 overflow-auto">
//         <Outlet />
//       </main>
//     </div>
//   );
// }

// import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import {
//   LayoutDashboard,
//   Users,
//   Wallet,
//   ArrowLeftRight,
//   User,
//   Settings,
//   LogOut,
// } from "lucide-react";

// export default function AffiliateLayout() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/affiliate-login");
//   };

//   const menuItems = [
//     { name: "Dashboard", path: "/affiliate/dashboard", icon: LayoutDashboard },
//     { name: "My Referred Orgs", path: "/affiliate/referred-organizations", icon: Users },
  
//     { name: "Transactions", path: "/affiliate/transactions", icon: ArrowLeftRight },
//     { name: "Profile", path: "/affiliate/profile", icon: User },
//     { name: "Settings", path: "/affiliate/settings", icon: Settings },
//   ];

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <aside className="w-64 bg-[#1f1712] text-white flex flex-col shrink-0">
//         <div className="p-5 border-b border-white/10">
//           <h1 className="text-xl font-bold text-[#FC6C26]">Mi Profile</h1>
//           <p className="text-xs text-gray-400 mt-1">Affiliate Panel</p>
//         </div>

//         <div className="p-4 border-b border-white/10">
//           <p className="font-semibold text-sm truncate">{user?.name || "Affiliate"}</p>
//           <p className="text-xs text-gray-400 truncate">{user?.email}</p>
//         </div>

//         <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
//           {menuItems.map((item) => (
//             <NavLink
//               key={item.path}
//               to={item.path}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
//                   isActive
//                     ? "bg-[#FC6C26] text-white"
//                     : "text-gray-300 hover:bg-white/10 hover:text-white"
//                 }`
//               }
//             >
//               <item.icon size={18} />
//               {item.name}
//             </NavLink>
//           ))}
//         </nav>

//         <div className="p-3 border-t border-white/10">
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition"
//           >
//             <LogOut size={18} />
//             Logout
//           </button>
//         </div>
//       </aside>

//       {/* Main Content - THIS IS REQUIRED */}
//       <main className="flex-1 overflow-auto">
//         <Outlet />
//       </main>
//     </div>
//   );
// }


// import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// import {
//   LayoutDashboard,
//   Users,
//   ArrowLeftRight,
//   Settings,
//   LogOut,
// } from "lucide-react";

// export default function AffiliateLayout() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/affiliate-login");
//   };

//   const menuItems = [
//     {
//       name: "Dashboard",
//       path: "/affiliate/dashboard",
//       icon: LayoutDashboard,
//     },
//     {
//       name: "My Referred Orgs",
//       path: "/affiliate/referred-organizations",
//       icon: Users,
//     },
//     {
//       name: "Transactions",
//       path: "/affiliate/transactions",
//       icon: ArrowLeftRight,
//     },
//     {
//       name: "Settings",
//       path: "/affiliate/settings/profile",
//       icon: Settings,
//     },
//   ];

//   return (
//     <div className="flex min-h-screen bg-gray-50">

//       {/* ================= MAIN SIDEBAR ================= */}
//       <aside className="w-64 bg-[#1f1712] text-white flex flex-col shrink-0">

//         {/* Logo / Title */}
//         <div className="p-5 border-b border-white/10">
//           <h1 className="text-xl font-bold text-[#FC6C26]">
//             Mi Profile
//           </h1>

//           <p className="text-xs text-gray-400 mt-1">
//             Affiliate Panel
//           </p>
//         </div>

//         {/* User */}
//         <div className="p-4 border-b border-white/10">
//           <p className="font-semibold text-sm truncate">
//             {user?.name || "Affiliate"}
//           </p>

//           <p className="text-xs text-gray-400 truncate">
//             {user?.email}
//           </p>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 p-3 space-y-1 overflow-y-auto">

//           {menuItems.map((item) => (
//             <NavLink
//               key={item.path}
//               to={item.path}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
//                   isActive
//                     ? "bg-[#FC6C26] text-white"
//                     : "text-gray-300 hover:bg-white/10 hover:text-white"
//                 }`
//               }
//             >
//               <item.icon size={18} />
//               {item.name}
//             </NavLink>
//           ))}

//         </nav>

//         {/* Logout */}
//         <div className="p-3 border-t border-white/10">
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition"
//           >
//             <LogOut size={18} />
//             Logout
//           </button>
//         </div>

//       </aside>

//       {/* ================= MAIN CONTENT ================= */}
//       <main className="flex-1 overflow-auto">
//         <Outlet />
//       </main>

//     </div>
//   );
// }

// import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// import {
//   LayoutDashboard,
//   Users,
//   ArrowLeftRight,
//   Settings,
//   LogOut,
// } from "lucide-react";

// // ================= LOGO =================
// import logo from "../../assets/Logo 11-06 Png Transparent.png";

// export default function AffiliateLayout() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/affiliate-login");
//   };

//   const menuItems = [
//     {
//       name: "Dashboard",
//       path: "/affiliate/dashboard",
//       icon: LayoutDashboard,
//     },
//     {
//       name: "My Referred Orgs",
//       path: "/affiliate/referred-organizations",
//       icon: Users,
//     },
//     {
//       name: "Transactions",
//       path: "/affiliate/transactions",
//       icon: ArrowLeftRight,
//     },
//     {
//       name: "Settings",
//       path: "/affiliate/settings/profile",
//       icon: Settings,
//     },
//   ];

//   return (
//     <div className="flex min-h-screen bg-gray-50">

//       {/* =====================================================
//           SIDEBAR
//       ====================================================== */}
//       <aside className="w-64 bg-[#1f1712] text-white flex flex-col shrink-0">

//         {/* =================================================
//             LOGO
//         ================================================== */}
//         <div className="h-[94px] px-5 flex items-center border-b border-white/10">
//           <img
//             src={logo}
//             alt="Mi Profile"
//             className="w-full max-w-[190px] h-auto object-contain"
//           />
//         </div>

//         {/* =================================================
//             USER INFORMATION
//         ================================================== */}
//         <div className="p-4 border-b border-white/10">
//           <p className="font-semibold text-sm truncate">
//             {user?.name || "Affiliate"}
//           </p>

//           <p className="text-xs text-gray-400 truncate mt-1">
//             {user?.email || "affiliate@example.com"}
//           </p>
//         </div>

//         {/* =================================================
//             NAVIGATION
//         ================================================== */}
//         <nav className="flex-1 p-3 space-y-1 overflow-y-auto">

//           {menuItems.map((item) => {
//             const Icon = item.icon;

//             return (
//               <NavLink
//                 key={item.path}
//                 to={item.path}
//                 className={({ isActive }) =>
//                   `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
//                     isActive
//                       ? "bg-[#FC6C26] text-white"
//                       : "text-gray-300 hover:bg-white/10 hover:text-white"
//                   }`
//                 }
//               >
//                 <Icon size={18} />
//                 <span>{item.name}</span>
//               </NavLink>
//             );
//           })}

//         </nav>

//         {/* =================================================
//             LOGOUT
//         ================================================== */}
//         <div className="p-3 border-t border-white/10">

//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition"
//           >
//             <LogOut size={18} />
//             <span>Logout</span>
//           </button>

//         </div>

//       </aside>

//       {/* =====================================================
//           MAIN CONTENT
//       ====================================================== */}
//       <main className="flex-1 min-w-0 overflow-auto">
//         <Outlet />
//       </main>

//     </div>
//   );
// }


// import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// import {
//   LayoutDashboard,
//   Users,
//   ArrowLeftRight,
//   Settings,
//   LogOut,
// } from "lucide-react";

// // Logo
// import logo from "../../assets/Logo1 11-06 Png black orange transparent.png";

// export default function AffiliateLayout() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/affiliate-login");
//   };

//   const menuItems = [
//     {
//       name: "Dashboard",
//       path: "/affiliate/dashboard",
//       icon: LayoutDashboard,
//     },
//     {
//       name: "My Referred Orgs",
//       path: "/affiliate/referred-organizations",
//       icon: Users,
//     },
//     {
//       name: "Transactions",
//       path: "/affiliate/transactions",
//       icon: ArrowLeftRight,
//     },
//     {
//       name: "Settings",
//       path: "/affiliate/settings/profile",
//       icon: Settings,
//     },
//   ];

//   return (
//     <div className="flex min-h-screen bg-gray-50">

//       {/* =====================================================
//           SIDEBAR
//       ====================================================== */}
//       <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shrink-0">

//         {/* =================================================
//             LOGO
//         ================================================== */}
//         <div className="h-[94px] px-5 flex items-center border-b border-gray-200">
//           <img
//             src={logo}
//             alt="Mi Profile"
//             className="w-full max-w-[190px] h-auto object-contain"
//           />
//         </div>

//         {/* =================================================
//             USER INFORMATION
//         ================================================== */}
//         <div className="p-10 border-b border-gray-200">
//           <p className="font-semibold text-sm text-gray-900 truncate">
//             {user?.name || "Affiliate"}
//           </p>

//           <p className="text-xs text-gray-500 truncate mt-1">
//             {user?.email || "affiliate@example.com"}
//           </p>
//         </div>

//         {/* =================================================
//             NAVIGATION
//         ================================================== */}
//         <nav className="flex-1 p-3 space-y-2 overflow-y-auto">

//           {menuItems.map((item) => {
//             const Icon = item.icon;

//             return (
//               <NavLink
//                 key={item.path}
//                 to={item.path}
//                 className={({ isActive }) =>
//                   `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
//                     isActive
//                       ? "bg-[#FC6C26] text-white shadow-sm"
//                       : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
//                   }`
//                 }
//               >
//                 <Icon size={19} strokeWidth={2} />

//                 <span>{item.name}</span>
//               </NavLink>
//             );
//           })}

//         </nav>

//         {/* =================================================
//             LOGOUT
//         ================================================== */}
//         <div className="p-3 border-t border-gray-200">

//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-500 transition-all duration-200"
//           >
//             <LogOut size={19} />

//             <span>Logout</span>
//           </button>

//         </div>

//       </aside>

//       {/* =====================================================
//           MAIN CONTENT
//       ====================================================== */}
//       <main className="flex-1 min-w-0 overflow-auto bg-gray-50">
//         <Outlet />
//       </main>

//     </div>
//   );
// }


// // src/components/layout/AffiliateLayout.jsx

// import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// import {
//   LayoutDashboard,
//   Users,
//   ArrowLeftRight,
//   Settings,
//   LogOut,
// } from "lucide-react";

// // Logo
// import logo from "../../assets/Logo1 11-06 Png black orange transparent.png";

// const PRIMARY = "#fe7f2d";
// const DARK = "#464243";

// export default function AffiliateLayout() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/affiliate-login");
//   };

//   const menuItems = [
//     {
//       name: "Dashboard",
//       path: "/affiliate/dashboard",
//       icon: LayoutDashboard,
//     },
//     {
//       name: "My Referred Orgs",
//       path: "/affiliate/referred-organizations",
//       icon: Users,
//     },
//     {
//       name: "Transactions",
//       path: "/affiliate/transactions",
//       icon: ArrowLeftRight,
//     },
//     {
//       name: "Settings",
//       path: "/affiliate/settings/profile",
//       icon: Settings,
//     },
//   ];

//   return (
//     <div className="flex min-h-screen bg-[#F7F7F5]">
//       {/* =====================================================
//           SIDEBAR
//       ====================================================== */}
//       <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shrink-0">
//         {/* =================================================
//             LOGO
//         ================================================== */}
//         <div className="h-[124px] px-5 flex items-center justify-center border-b border-gray-200">
//           <img
//             src={logo}
//             alt="Mi Profile"
//             className="w-full max-w-[230px] h-auto object-contain"
//           />
//         </div>

//         {/* =================================================
//             USER INFORMATION
//         ================================================== */}
//         <div className="px-7 py-6 border-b border-gray-200">
//           <p className="font-semibold text-sm text-[#464243] truncate">
//             {user?.name || "Affiliate"}
//           </p>

//           <p className="text-xs text-gray-500 truncate mt-1">
//             {user?.email || "affiliate@example.com"}
//           </p>
//         </div>

//         {/* =================================================
//             NAVIGATION
//         ================================================== */}
//         <nav className="flex-1 px-3 py-5 space-y-2 overflow-y-auto">
//           {menuItems.map((item) => {
//             const Icon = item.icon;

//             return (
//               <NavLink
//                 key={item.path}
//                 to={item.path}
//                 className={({ isActive }) =>
//                   `
//                   group
//                   flex items-center gap-3
//                   w-full
//                   px-4 py-3
//                   rounded-xl
//                   text-sm
//                   font-medium
//                   transition-all
//                   duration-200
//                   ${
//                     isActive
//                       ? "bg-[#464243] text-white shadow-md"
//                       : "text-[#464243] hover:bg-gray-100 hover:text-[#464243]"
//                   }
//                   `
//                 }
//               >
//                 {({ isActive }) => (
//                   <>
//                     <Icon
//                       size={19}
//                       strokeWidth={2}
//                       className={
//                         isActive
//                           ? "text-white"
//                           : "text-[#464243] group-hover:text-[#464243]"
//                       }
//                     />

//                     <span>{item.name}</span>
//                   </>
//                 )}
//               </NavLink>
//             );
//           })}
//         </nav>

//         {/* =================================================
//             LOGOUT
//             Moved slightly upward
//         ================================================== */}
//         <div className="px-3 pb-5 pt-2 border-t border-gray-200">
//           <button
//             onClick={handleLogout}
//             className="
//               flex items-center gap-3
//               w-full
//               px-4 py-3
//               rounded-xl
//               text-sm
//               font-medium
//               text-[#464243]
//               hover:bg-red-50
//               hover:text-red-500
//               transition-all
//               duration-200
//             "
//           >
//             <LogOut size={19} strokeWidth={2} />

//             <span>Logout</span>
//           </button>
//         </div>
//       </aside>

//       {/* =====================================================
//           MAIN CONTENT
//       ====================================================== */}
//       <main className="flex-1 min-w-0 overflow-auto bg-[#F7F7F5]">
//         <Outlet />
//       </main>
//     </div>
//   );
// }

// // src/components/layout/AffiliateLayout.jsx

// import { useState } from "react";
// import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// import {
//   LayoutDashboard,
//   Users,
//   ArrowLeftRight,
//   Settings,
//   LogOut,
//   Menu,
//   X,
// } from "lucide-react";

// // Logo
// import logo from "../../assets/Logo1 11-06 Png black orange transparent.png";

// const PRIMARY = "#fe7f2d";
// const DARK = "#464243";

// export default function AffiliateLayout() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   // Mobile sidebar state
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const handleLogout = () => {
//     setSidebarOpen(false);
//     logout();
//     navigate("/affiliate-login");
//   };

//   const menuItems = [
//     {
//       name: "Dashboard",
//       path: "/affiliate/dashboard",
//       icon: LayoutDashboard,
//     },
//     {
//       name: "My Referred Orgs",
//       path: "/affiliate/referred-organizations",
//       icon: Users,
//     },
//     {
//       name: "Transactions",
//       path: "/affiliate/transactions",
//       icon: ArrowLeftRight,
//     },
//     {
//       name: "Settings",
//       path: "/affiliate/settings/profile",
//       icon: Settings,
//     },
//   ];

//   return (
//     <div className="flex min-h-screen bg-[#F7F7F5]">

//       {/* =====================================================
//           MOBILE OVERLAY
//       ====================================================== */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-40 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* =====================================================
//           SIDEBAR
//       ====================================================== */}
//       <aside
//         className={`
//           fixed
//           lg:static
//           inset-y-0
//           left-0
//           z-50
//           w-64
//           bg-white
//           border-r
//           border-gray-200
//           flex
//           flex-col
//           shrink-0

//           transform
//           transition-transform
//           duration-300
//           ease-in-out

//           ${
//             sidebarOpen
//               ? "translate-x-0"
//               : "-translate-x-full lg:translate-x-0"
//           }
//         `}
//       >

//         {/* =================================================
//             LOGO
//         ================================================== */}
//         <div className="h-[124px] px-5 flex items-center justify-center border-b border-gray-200 relative">

//           <img
//             src={logo}
//             alt="Mi Profile"
//             className="w-full max-w-[230px] h-auto object-contain"
//           />

//           {/* MOBILE CLOSE BUTTON */}
//           <button
//             type="button"
//             onClick={() => setSidebarOpen(false)}
//             className="
//               lg:hidden
//               absolute
//               top-4
//               right-4
//               w-9
//               h-9
//               rounded-lg
//               flex
//               items-center
//               justify-center
//               text-[#464243]
//               hover:bg-gray-100
//               transition
//             "
//             aria-label="Close menu"
//           >
//             <X size={21} strokeWidth={2} />
//           </button>

//         </div>

//         {/* =================================================
//             USER INFORMATION
//         ================================================== */}
//         <div className="px-7 py-6 border-b border-gray-200">

//           <p className="font-semibold text-sm text-[#464243] truncate">
//             {user?.name || "Affiliate"}
//           </p>

//           <p className="text-xs text-gray-500 truncate mt-1">
//             {user?.email || "affiliate@example.com"}
//           </p>

//         </div>

//         {/* =================================================
//             NAVIGATION
//         ================================================== */}
//         <nav className="flex-1 px-3 py-5 space-y-2 overflow-y-auto">

//           {menuItems.map((item) => {
//             const Icon = item.icon;

//             return (
//               <NavLink
//                 key={item.path}
//                 to={item.path}
//                 onClick={() => setSidebarOpen(false)}
//                 className={({ isActive }) =>
//                   `
//                   group
//                   flex
//                   items-center
//                   gap-3
//                   w-full
//                   px-4
//                   py-3
//                   rounded-xl
//                   text-sm
//                   font-medium
//                   transition-all
//                   duration-200

//                   ${
//                     isActive
//                       ? "bg-[#464243] text-white shadow-md"
//                       : "text-[#464243] hover:bg-gray-100 hover:text-[#464243]"
//                   }
//                   `
//                 }
//               >
//                 {({ isActive }) => (
//                   <>
//                     <Icon
//                       size={19}
//                       strokeWidth={2}
//                       className={
//                         isActive
//                           ? "text-white"
//                           : "text-[#464243]"
//                       }
//                     />

//                     <span>{item.name}</span>
//                   </>
//                 )}
//               </NavLink>
//             );
//           })}

//         </nav>

//         {/* =================================================
//             LOGOUT
//         ================================================== */}
//         <div className="px-3 pb-5 pt-2 border-t border-gray-200">

//           <button
//             type="button"
//             onClick={handleLogout}
//             className="
//               flex
//               items-center
//               gap-3
//               w-full
//               px-4
//               py-3
//               rounded-xl
//               text-sm
//               font-medium
//               text-[#464243]
//               hover:bg-red-50
//               hover:text-red-500
//               transition-all
//               duration-200
//             "
//           >
//             <LogOut
//               size={19}
//               strokeWidth={2}
//             />

//             <span>Logout</span>
//           </button>

//         </div>

//       </aside>

//       {/* =====================================================
//           MAIN AREA
//       ====================================================== */}
//       <div className="flex-1 min-w-0 flex flex-col">

//         {/* =================================================
//             MOBILE TOP BAR
//         ================================================== */}
//         <header
//           className="
//             lg:hidden
//             h-16
//             bg-white
//             border-b
//             border-gray-200
//             flex
//             items-center
//             px-4
//             sticky
//             top-0
//             z-30
//           "
//         >

//           {/* HAMBURGER */}
//           <button
//             type="button"
//             onClick={() => setSidebarOpen(true)}
//             className="
//               w-10
//               h-10
//               rounded-lg
//               flex
//               items-center
//               justify-center
//               text-[#464243]
//               hover:bg-gray-100
//               transition
//             "
//             aria-label="Open menu"
//           >
//             <Menu
//               size={24}
//               strokeWidth={2}
//             />
//           </button>

//           {/* MOBILE LOGO */}
//           <div className="flex-1 flex justify-center pr-10">

//             <img
//               src={logo}
//               alt="Mi Profile"
//               className="h-9 w-auto object-contain"
//             />

//           </div>

//         </header>

//         {/* =================================================
//             PAGE CONTENT
//         ================================================== */}
//         <main className="flex-1 min-w-0 overflow-auto bg-[#F7F7F5]">
//           <Outlet />
//         </main>

//       </div>

//     </div>
//   );
// }

// src/components/layout/AffiliateLayout.jsx

import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
  LayoutDashboard,
  Users,
  ArrowLeftRight,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

// Logo
import logo from "../../assets/Logo1 11-06 Png black orange transparent.png";

const PRIMARY = "#fe7f2d";
const DARK = "#464243";

export default function AffiliateLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Mobile sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // =========================================================
  // LOGOUT
  // =========================================================
  const handleLogout = () => {
    setSidebarOpen(false);
    logout();
    navigate("/affiliate-login");
  };

  // =========================================================
  // MENU ITEMS
  // =========================================================
  const menuItems = [
    {
      name: "Dashboard",
      path: "/affiliate/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "My Referred Orgs",
      path: "/affiliate/referred-organizations",
      icon: Users,
    },
    {
      name: "Transactions",
      path: "/affiliate/transactions",
      icon: ArrowLeftRight,
    },
    {
      name: "Settings",
      path: "/affiliate/settings/profile",
      icon: Settings,
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F7F7F5]">

      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* =====================================================
          SIDEBAR
      ====================================================== */}
      <aside
        className={`
          fixed
          lg:static
          inset-y-0
          left-0
          z-50
          w-64
          bg-white
          border-r
          border-gray-200
          flex
          flex-col
          shrink-0

          transform
          transition-transform
          duration-300
          ease-in-out

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >

        {/* =================================================
            LOGO
        ================================================== */}
        <div className="h-[124px] px-5 flex items-center justify-center border-b border-gray-200 relative">

          <img
            src={logo}
            alt="Mi Profile"
            className="w-full max-w-[230px] h-auto object-contain"
          />

          {/* MOBILE CLOSE BUTTON */}
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="
              lg:hidden
              absolute
              top-4
              right-4
              w-9
              h-9
              rounded-lg
              flex
              items-center
              justify-center
              text-[#464243]
              hover:bg-gray-100
              transition
            "
            aria-label="Close menu"
          >
            <X
              size={21}
              strokeWidth={2}
            />
          </button>

        </div>

        {/* =================================================
            USER INFORMATION
        ================================================== */}
        <div className="px-7 py-6 border-b border-gray-200">

          <p className="font-semibold text-sm text-[#464243] truncate">
            {user?.name || "Affiliate"}
          </p>

          <p className="text-xs text-gray-500 truncate mt-1">
            {user?.email || "affiliate@example.com"}
          </p>

        </div>

        {/* =================================================
            NAVIGATION
        ================================================== */}
        <nav className="flex-1 px-3 py-5 space-y-2 overflow-y-auto">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `
                  group
                  flex
                  items-center
                  gap-3
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  text-sm
                  font-medium
                  transition-all
                  duration-200

                  ${
                    isActive
                      ? "bg-[#464243] text-white shadow-md"
                      : "text-[#464243] hover:bg-gray-100 hover:text-[#464243]"
                  }
                  `
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={19}
                      strokeWidth={2}
                      className={
                        isActive
                          ? "text-white"
                          : "text-[#464243]"
                      }
                    />

                    <span>{item.name}</span>
                  </>
                )}
              </NavLink>
            );
          })}

        </nav>

        {/* =================================================
            BOTTOM SECTION
        ================================================== */}
        <div className="border-t border-gray-200">

          {/* =================================================
              COPYRIGHT
          ================================================== */}
          <div className="px-4 pt-4 pb-2 text-center">

            <p className="text-[11px] leading-relaxed text-gray-400">
              © 2026 MI PROFILE.
            </p>

            <p className="text-[11px] leading-relaxed text-gray-400">
              All rights reserved.
            </p>

          </div>

          {/* =================================================
              LOGOUT
          ================================================== */}
          <div className="px-3 pb-5 pt-1">

            <button
              type="button"
              onClick={handleLogout}
              className="
                flex
                items-center
                gap-3
                w-full
                px-4
                py-3
                rounded-xl
                text-sm
                font-medium
                text-[#464243]
                hover:bg-red-50
                hover:text-red-500
                transition-all
                duration-200
              "
            >
              <LogOut
                size={19}
                strokeWidth={2}
              />

              <span>Logout</span>
            </button>

          </div>

        </div>

      </aside>

      {/* =====================================================
          MAIN AREA
      ====================================================== */}
      <div className="flex-1 min-w-0 flex flex-col">

        {/* =================================================
            MOBILE TOP BAR
        ================================================== */}
        <header
          className="
            lg:hidden
            h-16
            bg-white
            border-b
            border-gray-200
            flex
            items-center
            px-4
            sticky
            top-0
            z-30
          "
        >

          {/* HAMBURGER */}
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="
              w-10
              h-10
              rounded-lg
              flex
              items-center
              justify-center
              text-[#464243]
              hover:bg-gray-100
              transition
            "
            aria-label="Open menu"
          >
            <Menu
              size={24}
              strokeWidth={2}
            />
          </button>

          {/* MOBILE LOGO */}
          <div className="flex-1 flex justify-center pr-10">

            <img
              src={logo}
              alt="Mi Profile"
              className="h-9 w-auto object-contain"
            />

          </div>

        </header>

        {/* =================================================
            PAGE CONTENT
        ================================================== */}
        <main className="flex-1 min-w-0 overflow-auto bg-[#F7F7F5]">
          <Outlet />
        </main>

      </div>

    </div>
  );
}