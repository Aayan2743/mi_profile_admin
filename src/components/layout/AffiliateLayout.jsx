
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