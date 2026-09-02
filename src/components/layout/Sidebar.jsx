// src/components/layout/Sidebar.jsx
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  ReceiptIndianRupee,
  Ticket,
  Settings,
  Users,
  Handshake,
} from "lucide-react";

const logoLight = "/assets/Logo1 11-06 Png black orange transparent.png";
const logoDark = "/assets/Logo1 11-06 Png black orange transparent.png";

const menu = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Organizations", path: "/organizations", icon: Building2 },
  { name: "Affiliates", path: "/affiliates", icon: Handshake },
  { name: "Transactions", path: "/transactions", icon: ReceiptIndianRupee },
  { name: "Support Tickets", path: "/admin/support-tickets", icon: Ticket },
  { name: "NFC Cards Request", path: "/nfc-cards-request", icon: Ticket },
  { name: "Staff", path: "/staff", icon: Users },
  { name: "Settings", path: "/settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-[hsl(var(--card-bg))] text-[hsl(var(--text-primary))] border-r border-[hsl(var(--border))] shadow-2xl z-40 hidden lg:block">
      <div className="h-full flex flex-col">
        <div className="px-6 py-6 border-b border-[hsl(var(--border))] flex flex-col items-center justify-center">
          <img
            src={logoLight}
            alt="MI PROFILE"
            className="h-20 w-50 object-contain dark:hidden"
          />

          <img
            src={logoDark}
            alt="MI PROFILE"
            className="h-20 w-50 object-contain hidden dark:block"
          />
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-5 py-3.5 rounded-xl transition-all duration-200 font-medium ${
                  isActive
                    ? "bg-[#464243] text-white shadow-md"
                    : "text-[hsl(var(--text-secondary))] hover:bg-[hsl(var(--accent)/0.12)] hover:text-[hsl(var(--accent))] active:bg-[hsl(var(--accent)/0.2)]"
                }`
              }
            >
              <item.icon
                size={22}
                className="opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="px-6 py-4 border-t border-[hsl(var(--border))] text-xs text-[hsl(var(--text-muted))] text-center">
          © {new Date().getFullYear()} MI PROFILE. All rights reserved.
        </div>
      </div>
    </aside>
  );
}
