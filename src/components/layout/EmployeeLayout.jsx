// // src/components/layout/EmployeeLayout.jsx
// import { useState } from "react";
// import { Home, Building2, Settings, LogOut, Menu, X } from "lucide-react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// export default function EmployeeLayout({ children }) {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user, logout, isEmployee } = useAuth();

//   const menuItems = [
//     { icon: Home, label: "Dashboard", href: "/employee/dashboard" },
//     {
//       icon: Building2,
//       label: "Organizations",
//       href: "/employee/organizations",
//     },
//     { icon: Settings, label: "Settings", href: "/employee/settings" },
//   ];

//   const isActive = (href) => {
//     if (href === "/employee/dashboard") return location.pathname === href;
//     return location.pathname.startsWith(href);
//   };

//   const handleLogout = () => {
//     logout();
//     navigate("/employee-login");
//   };

//   const displayName = user?.name || "Employee";

//   return (
//     <div className="flex h-screen bg-[hsl(var(--background))]">
//       {/* Sidebar */}
//       <div
//         className={`${
//           sidebarOpen ? "w-72" : "w-20"
//         } bg-[hsl(var(--card-bg))] border-r border-[hsl(var(--border))] transition-all duration-300 flex flex-col`}
//       >
//         {/* Logo/Header */}
//         <div className="p-6 border-b border-[hsl(var(--border))] flex items-center gap-3">
//           {sidebarOpen ? (
//             <img
//               src="/assets/Logo1 11-06 Png black orange transparent.png"
//               alt="Mi Profile Logo"
//               className="h-20 w-auto"
//             />
//           ) : (
//             <div className="w-9 h-9 bg-[hsl(var(--accent))] rounded-xl flex items-center justify-center text-white font-bold text-xl">
//               M
//             </div>
//           )}

//           {/* {sidebarOpen && (
//             <div>
//               <h1 className="font-semibold text-xl tracking-tight">
//                 Mi Profile
//               </h1>
//               <p className="text-xs text-[hsl(var(--text-muted))] -mt-1">
//                 Employee Portal
//               </p>
//             </div>
//           )} */}
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
//           {menuItems.map((item, index) => {
//             const active = isActive(item.href);
//             return (
//               <Link
//                 key={index}
//                 to={item.href}
//                 className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all group ${
//                   active
//                     ? "bg-[hsl(var(--accent)/0.1)] text-[hsl(var(--accent))] border border-[hsl(var(--accent)/0.2)]"
//                     : "hover:bg-[hsl(var(--card-bg-hover))]"
//                 }`}
//               >
//                 <item.icon
//                   className={`w-5 h-5 ${active ? "text-[hsl(var(--accent))]" : ""}`}
//                 />
//                 {sidebarOpen && <span>{item.label}</span>}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Footer/User Section */}
//         <div className="p-4 border-t border-[hsl(var(--border))]">
//           <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-[hsl(var(--card-bg-hover))] cursor-pointer">
//             <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
//               {displayName?.charAt(0)?.toUpperCase() || "E"}
//             </div>
//             {sidebarOpen && (
//               <div className="flex-1 min-w-0">
//                 <p className="font-medium truncate">{displayName}</p>
//                 <p className="text-xs text-[hsl(var(--text-muted))]">
//                   {isEmployee ? "Employee" : "User"}
//                 </p>
//               </div>
//             )}
//           </div>

//           <button
//             onClick={handleLogout}
//             className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-2xl transition text-sm font-medium"
//           >
//             <LogOut className="w-4 h-4" />
//             {sidebarOpen && "Logout"}
//           </button>
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <header className="h-16 border-b border-[hsl(var(--border))] bg-[hsl(var(--card-bg))] px-8 flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//               className="p-2 hover:bg-[hsl(var(--card-bg-hover))] rounded-xl transition"
//             >
//               {sidebarOpen ? (
//                 <X className="w-5 h-5" />
//               ) : (
//                 <Menu className="w-5 h-5" />
//               )}
//             </button>

//             <div className="text-lg font-semibold text-[hsl(var(--text-primary))]">
//               {location.pathname.includes("organizations")
//                 ? "Organizations"
//                 : location.pathname.includes("dashboard")
//                   ? "Dashboard"
//                   : location.pathname.includes("settings")
//                     ? "Settings"
//                     : "Employee Portal"}
//             </div>
//           </div>

//           <div className="flex items-center gap-6">
//             <div className="relative cursor-pointer">
//               <div className="w-5 h-5 bg-amber-500 rounded-full absolute -top-1 -right-1 flex items-center justify-center text-[10px] text-white font-medium">
//                 3
//               </div>
//               <div className="w-8 h-8 rounded-2xl bg-[hsl(var(--card-bg-hover))] flex items-center justify-center">
//                 🔔
//               </div>
//             </div>

//             <div className="flex items-center gap-3 cursor-pointer">
//               <div className="text-right">
//                 <p className="text-sm font-medium">{displayName}</p>
//                 <p className="text-xs text-green-600">Online</p>
//               </div>
//               <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white text-sm font-medium">
//                 {displayName?.charAt(0)?.toUpperCase() || "JD"}
//               </div>
//             </div>
//           </div>
//         </header>

//         <main className="flex-1 overflow-auto p-8">{children}</main>
//       </div>
//     </div>
//   );
// }


// src/components/layout/EmployeeLayout.jsx

import { useEffect, useState } from "react";
import {
  Bell,
  Building2,
  ChevronLeft,
  ChevronRight,
  Home,
  LogOut,
  Menu,
  Settings,
  UserRound,
  X,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function EmployeeLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isEmployee } = useAuth();

  const menuItems = [
    {
      icon: Home,
      label: "Dashboard",
      href: "/employee/dashboard",
    },
    {
      icon: Building2,
      label: "Organizations",
      href: "/employee/organizations",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/employee/settings",
    },
  ];

  const isActive = (href) => {
    if (href === "/employee/dashboard") {
      return location.pathname === href;
    }

    return location.pathname.startsWith(href);
  };

  const handleLogout = () => {
    logout();
    navigate("/employee-login");
  };

  const displayName = user?.name || "Employee";
  const displayEmail = user?.email || "";
  const profileInitial = displayName?.charAt(0)?.toUpperCase() || "E";

  const pageTitle = location.pathname.includes("organizations")
    ? "Organizations"
    : location.pathname.includes("dashboard")
      ? "Dashboard"
      : location.pathname.includes("settings")
        ? "Settings"
        : "Employee Portal";

  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (mobileSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileSidebarOpen]);

  const SidebarContent = ({ mobile = false }) => (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div
        className={`flex min-h-[96px] items-center border-b border-[#f1e8e1] ${
          sidebarOpen || mobile ? "justify-between px-5" : "justify-center px-3"
        }`}
      >
        {(sidebarOpen || mobile) && (
          <div className="flex min-w-0 items-center">
            <img
              src="/assets/Logo1 11-06 Png black orange transparent.png"
              alt="Mi Profile"
              className="h-14 w-auto max-w-[175px] object-contain"
            />
          </div>
        )}

        {!sidebarOpen && !mobile && (
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff7b22] to-[#f4510b] text-xl font-black text-white shadow-[0_10px_24px_rgba(255,100,24,0.3)]">
            M
          </div>
        )}

        {mobile && (
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(false)}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition hover:border-orange-200 hover:bg-orange-50 hover:text-[#ff6418]"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Employee Portal Label */}
      {(sidebarOpen || mobile) && (
        <div className="px-5 pt-5">
          <div className="rounded-2xl border border-[#FC6C26] bg-gradient-to-br from-[#fff8f2] to-[#fff1e6] px-4 py-3">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#ff6418]">
              Mi Profile
            </p>

            <p className="mt-1 text-sm font-extrabold text-[#2b2521]">
              Employee Portal
            </p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav
        className={`flex-1 overflow-y-auto py-5 ${
          sidebarOpen || mobile ? "px-4" : "px-3"
        }`}
      >
        {(sidebarOpen || mobile) && (
          <p className="mb-3 px-3 text-[10px] font-extrabold uppercase tracking-[0.18em] text-gray-400">
            Main Menu
          </p>
        )}

        <div className="space-y-2">
          {menuItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                to={item.href}
                title={!sidebarOpen && !mobile ? item.label : undefined}
                className={`group relative flex min-h-[52px] items-center rounded-2xl transition-all duration-200 ${
                  sidebarOpen || mobile
                    ? "gap-3 px-4"
                    : "justify-center px-2"
                } ${
                  active
                    ? "bg-gradient-to-r from-[#ff6418] to-[#f4510b] text-white shadow-[0_12px_25px_rgba(255,100,24,0.25)]"
                    : "text-[#6f6863] hover:bg-[#fff4ec] hover:text-[#ff6418]"
                }`}
              >
                <div
                  className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl transition ${
                    active
                      ? "bg-white/15 text-white"
                      : "bg-[#f7f3f0] text-[#837a74] group-hover:bg-white group-hover:text-[#ff6418]"
                  }`}
                >
                  <Icon size={19} strokeWidth={2.2} />
                </div>

                {(sidebarOpen || mobile) && (
                  <span className="text-sm font-bold">{item.label}</span>
                )}

                {active && (sidebarOpen || mobile) && (
                  <div className="ml-auto h-2 w-2 rounded-full bg-white shadow-sm" />
                )}

                {!sidebarOpen && !mobile && (
                  <div className="pointer-events-none absolute left-[68px] z-[80] hidden whitespace-nowrap rounded-xl bg-[#27221f] px-3 py-2 text-xs font-bold text-white shadow-xl group-hover:block">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Profile */}
    /<div
  className={`border-t border-[#f1e8e1] ${
    sidebarOpen || mobile ? "p-4" : "p-3"
  }`}
>
  <div
    className={`rounded-[22px] border border-[#eee6e0] bg-gradient-to-br from-white to-[#fff9f5] ${
      sidebarOpen || mobile ? "p-3" : "p-2"
    }`}
  >
    {/* <div
      className={`flex items-center ${
        sidebarOpen || mobile ? "gap-3" : "justify-center"
      }`}
    > */}
      {/* <div className="relative flex-shrink-0">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff7c27] to-[#ef4f0b] text-sm font-extrabold text-white shadow-[0_8px_18px_rgba(255,100,24,0.25)]">
          {profileInitial}
        </div>

        <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500" />
      </div> */}

      {/* {(sidebarOpen || mobile) && (
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-extrabold text-[#2a2522]">
            {displayName}
          </p>

          <p className="mt-0.5 truncate text-[11px] text-gray-400">
            {displayEmail || (isEmployee ? "Employee" : "User")}
          </p>

          <p className="mt-1 text-[10px] font-bold text-emerald-600">
            Online
          </p>
        </div>
      )} */}
    {/* </div> */}

    <button
      type="button"
      onClick={handleLogout}
      title={!sidebarOpen && !mobile ? "Logout" : undefined}
      className={`group mt-3 flex min-h-[44px] w-full items-center rounded-xl text-sm font-bold text-red-500 transition hover:bg-red-50 ${
        sidebarOpen || mobile
          ? "justify-center gap-2 px-4"
          : "justify-center px-2"
      }`}
    >
      <LogOut size={17} />
      {(sidebarOpen || mobile) && <span>Logout</span>}
    </button>

    {(sidebarOpen || mobile) && (
      <div className="mt-5 border-t border-[#f3e7df] pt-4 text-center">
        <p className="text-[11px] leading-5 text-gray-400">
          © 2026 <span className="font-bold text-[#ff6418]">MI PROFILE</span>
          <br />
          All rights reserved.
        </p>
      </div>
    )}
  </div>
</div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f7f5]">
      {/* Desktop Sidebar */}
      <aside
        className={`relative z-40 hidden flex-shrink-0 border-r border-[#eee7e2] bg-white shadow-[8px_0_35px_rgba(15,23,42,0.03)] transition-all duration-300 lg:block ${
          sidebarOpen ? "w-[280px]" : "w-[88px]"
        }`}
      >
        <SidebarContent />

        {/* Collapse Button */}
        <button
          type="button"
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="absolute -right-4 top-[112px] z-50 flex h-8 w-8 items-center justify-center rounded-full border border-[#FC6C26] bg-white text-[#ff6418] shadow-[0_8px_18px_rgba(15,23,42,0.12)] transition hover:scale-105 hover:bg-[#ff6418] hover:text-white"
          title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {sidebarOpen ? (
            <ChevronLeft size={17} />
          ) : (
            <ChevronRight size={17} />
          )}
        </button>
      </aside>

      {/* Mobile Overlay */}
      {mobileSidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 z-[90] bg-black/45 backdrop-blur-[2px] lg:hidden"
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-[100] w-[290px] border-r border-[#eee7e2] bg-white shadow-2xl transition-transform duration-300 lg:hidden ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent mobile />
      </aside>

      {/* Main Area */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="relative z-30 flex h-[76px] flex-shrink-0 items-center justify-between border-b border-[#eee7e2] bg-white/95 px-4 shadow-[0_5px_25px_rgba(15,23,42,0.03)] backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            {/* Mobile Menu */}
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-orange-200 hover:bg-orange-50 hover:text-[#ff6418] lg:hidden"
            >
              <Menu size={21} />
            </button>

            {/* Desktop Collapse */}
            {/* <button
              type="button"
              onClick={() => setSidebarOpen((prev) => !prev)}
              className="hidden h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-orange-200 hover:bg-orange-50 hover:text-[#ff6418] lg:flex"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button> */}

            <div className="min-w-0">
              {/* <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#ff6418]">
                Employee Portal
              </p>

              <h1 className="truncate text-lg font-black text-[#292522] sm:text-xl">
                {pageTitle}
              </h1> */}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Notification */}
            <button
              type="button"
              className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:border-orange-200 hover:bg-orange-50 hover:text-[#ff6418]"
            >
              <Bell size={20} />

              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-[#ff6418] px-1 text-[9px] font-extrabold text-white">
                3
              </span>
            </button>

            {/* Desktop Profile */}
            <div className="hidden items-center gap-3 rounded-2xl border border-gray-100 bg-[#fcfaf8] py-2 pl-3 pr-2 sm:flex">
              <div className="text-right">
                <p className="max-w-[145px] truncate text-sm font-extrabold text-[#292522]">
                  {displayName}
                </p>

                <p className="mt-0.5 flex items-center justify-end gap-1 text-[10px] font-bold text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Online
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff7c27] to-[#ef4f0b] text-sm font-extrabold text-white shadow-[0_8px_18px_rgba(255,100,24,0.22)]">
                {profileInitial}
              </div>
            </div>

            {/* Mobile Profile */}
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff7c27] to-[#ef4f0b] text-sm font-extrabold text-white shadow-[0_8px_18px_rgba(255,100,24,0.22)] sm:hidden">
              {profileInitial}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[#f8f7f5] p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-[1600px]">{children}</div>
        </main>
      </div>
    </div>
  );
}