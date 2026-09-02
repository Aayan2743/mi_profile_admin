// src/pages/organizations/Notifications.jsx
import { useState } from "react";
import { Bell, Trash2, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";

export default function Notifications() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Support Ticket",
      message: "Organization ABC raised a support ticket",
      ticketId: "TKT-1001",
      time: "2 min ago",
      read: false,
      link: "/admin/support-tickets",
    },
    {
      id: 2,
      title: "Migration Request",
      message: "XYZ Company requested migration to new platform",
      ticketId: "TKT-1002",
      time: "15 min ago",
      read: false,
      link: "/admin/support-tickets",
    },
    {
      id: 3,
      title: "System Maintenance",
      message: "Scheduled maintenance will occur tonight at 11:00 PM",
      time: "1 hour ago",
      read: true,
    },
    {
      id: 4,
      title: "New User Registration",
      message: "John Doe from Acme Corp has registered",
      time: "Yesterday",
      read: true,
      link: "/organizations",
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    if (window.confirm("Clear all notifications?")) {
      setNotifications([]);
    }
  };

  const handleNotificationClick = (notif) => {
    markAsRead(notif.id);
    if (notif.link) navigate(notif.link);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3 text-[hsl(var(--text-primary))]">
              <Bell size={32} />
              All Notifications
            </h1>
            <p className="text-[hsl(var(--text-muted))] mt-1">
              Manage and track all your notifications
            </p>
          </div>

          <div className="flex gap-3">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition"
              >
                <CheckCircle size={18} />
                Mark all read
              </button>
            )}

            <button
              onClick={clearAll}
              className="flex items-center gap-2 px-5 py-2.5 border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 rounded-xl transition"
            >
              <Trash2 size={18} />
              Clear All
            </button>
          </div>
        </div>

        <div className="bg-[hsl(var(--card-bg))] border border-[hsl(var(--border))] rounded-3xl shadow-sm overflow-hidden">
          {notifications.length === 0 ? (
            <div className="p-20 text-center">
              <Bell size={60} className="mx-auto text-[hsl(var(--text-muted))]" />
              <p className="mt-6 text-2xl font-medium">No notifications</p>
              <p className="text-[hsl(var(--text-muted))] mt-2">You're all caught up!</p>
            </div>
          ) : (
            <div className="divide-y divide-[hsl(var(--border))]">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  className={`p-6 hover:bg-[hsl(var(--bg-secondary))] cursor-pointer group flex gap-4 transition-all ${
                    !notif.read ? "bg-blue-50 dark:bg-blue-950/30" : ""
                  }`}
                >
                  <div className="flex-shrink-0 mt-1.5">
                    {!notif.read && <div className="w-3 h-3 bg-blue-500 rounded-full" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <p className="font-semibold text-lg">{notif.title}</p>
                      <span className="text-sm text-[hsl(var(--text-muted))] whitespace-nowrap ml-6">
                        {notif.time}
                      </span>
                    </div>
                    <p className="text-[hsl(var(--text-muted))] mt-1.5 pr-8">
                      {notif.message}
                    </p>
                    {notif.ticketId && (
                      <p className="text-sm text-[hsl(var(--accent))] mt-2 font-medium">
                        {notif.ticketId}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notif.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-xl self-start"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="text-center text-sm text-[hsl(var(--text-muted))] mt-6">
          Showing {notifications.length} notifications
        </p>
      </div>
    </AdminLayout>
  );
}