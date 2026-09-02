// //src/components/layout/Header.jsx
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// export default function Header() {
//   const { logout, user } = useAuth();
//   const navigate = useNavigate();

//   return (
//     <header className="h-16 bg-white/80 backdrop-blur-md shadow flex items-center justify-between px-6">
//       <h2 className="text-lg font-semibold">
//         Welcome, <span className="text-indigo-600">{user?.name}</span>
//       </h2>

//       <div className="flex items-center gap-4">
//         <button
//           onClick={() => navigate("/settings")}
//           className="text-slate-600 hover:text-indigo-600 text-sm"
//         >
//           Settings
//         </button>

//         <button
//           onClick={() => {
//             logout();
//             navigate("/login");
//           }}
//           className="text-red-500 text-sm font-medium"
//         >
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// }


// // src/components/layout/Header.jsx
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import ThemeToggle from "../ThemeToggle";           // ← add import

// export default function Header() {
//   const { logout, user } = useAuth();
//   const navigate = useNavigate();

//   return (
//     <header className="h-16 bg-white dark:bg-slate-900/90 backdrop-blur-md shadow flex items-center justify-between px-6 border-b dark:border-slate-700">
//       <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
//         Welcome, <span className="text-orange-500">{user?.name}</span>
//       </h2>

//       <div className="flex items-center gap-4">
//         <ThemeToggle />                                 {/* ← add here */}

//         <button
//           onClick={() => navigate("/settings")}
//           className="text-slate-600 dark:text-slate-300 hover:text-orange-500 text-sm"
//         >
//           Settings
//         </button>

//         <button
//           onClick={() => {
//             logout();
//             navigate("/login");
//           }}
//           className="text-red-500 text-sm font-medium"
//         >
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// }


// // src/components/layout/Header.jsx
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import ThemeToggle from "../ThemeToggle";

// export default function Header() {
//   const { logout, user } = useAuth();
//   const navigate = useNavigate();

//   return (
//     <header className="h-16 bg-[var(--bg-primary)] backdrop-blur-md shadow flex items-center justify-between px-6 border-b border-[var(--card-border)]">
//       <h2 className="text-lg font-semibold text-[var(--text-primary)]">
//         Welcome, <span className="text-[var(--accent-orange)]">{user?.name }</span>
//       </h2>

//       <div className="flex items-center gap-5">
//         <ThemeToggle />

//         <button
//           onClick={() => navigate("/settings")}
//           className="text-[var(--text-secondary)] hover:text-[var(--accent-orange)] text-sm font-medium transition"
//         >
//           Settings
//         </button>

//         <button
//           onClick={() => {
//             logout();
//             navigate("/login");
//           }}
//           className="text-red-500 hover:text-red-400 text-sm font-medium transition"
//         >
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// }

// // src/components/layout/Header.jsx
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import ThemeToggle from "../ThemeToggle";
// import { Bell } from "lucide-react";
// import { useState } from "react";

// export default function Header() {
//   const { logout, user } = useAuth();
//   const navigate = useNavigate();
//   const [showNotifications, setShowNotifications] = useState(false);

// const notifications = [
//   {
//     id: 1,
//     title: "New Support Ticket",
//     message: "Organization ABC raised a support ticket",
//     ticketId: "TKT-1001",
//   },
//   {
//     id: 2,
//     title: "Migration Request",
//     message: "XYZ Company requested migration",
//     ticketId: "TKT-1002",
//   },
// ];

//   return (
//     <header className="h-16 bg-[hsl(var(--card-bg))] backdrop-blur-md border-b border-[hsl(var(--border))] shadow-sm flex items-center justify-between px-5 sm:px-6 z-30">
//       <h2 className="text-lg font-semibold text-[hsl(var(--text-primary))]">
//         Welcome,{" "}
//         <span className="text-[hsl(var(--accent))] font-bold">
//           {user?.name || "Admin"}
//         </span>
//       </h2>

//       <div className="flex items-center gap-4 sm:gap-6">
//         <ThemeToggle />
//         <div className="relative">
//   <button
//     onClick={() => setShowNotifications(!showNotifications)}
//     className="relative p-2 rounded-xl hover:bg-[hsl(var(--bg-secondary))]"
//   >
//     <Bell size={22} />

//     <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
//       {notifications.length}
//     </span>
//   </button>

//   {showNotifications && (
//     <div className="absolute right-0 top-12 w-96 bg-[hsl(var(--card-bg))] border border-[hsl(var(--border))] rounded-2xl shadow-2xl z-50">
//       <div className="p-4 border-b">
//         <h3 className="font-semibold">Notifications</h3>
//       </div>

//       {notifications.map((item) => (
//         <button
//           key={item.id}
//           onClick={() => navigate("/admin/support-tickets")}
//           className="w-full text-left p-4 border-b hover:bg-[hsl(var(--bg-secondary))]"
//         >
//           <p className="font-medium">{item.title}</p>
//           <p className="text-sm text-[hsl(var(--text-muted))]">
//             {item.message}
//           </p>
//         </button>
//       ))}
//     </div>
//   )}
// </div>

//         <button
//           onClick={() => navigate("/settings")}
//           className="text-sm font-medium text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--accent))] transition-colors"
//         >
//           Settings
//         </button>

//         <button
//           onClick={() => {
//             logout();
//             navigate("/login");
//           }}
//           className="text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300 transition-colors"
//         >
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// }


// // src/components/layout/Header.jsx
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import ThemeToggle from "../ThemeToggle";
// import { Bell, X } from "lucide-react";
// import { useState, useRef, useEffect } from "react";

// export default function Header() {
//   const { logout, user } = useAuth();
//   const navigate = useNavigate();
  
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [notifications, setNotifications] = useState([
//     {
//       id: 1,
//       title: "New Support Ticket",
//       message: "Organization ABC raised a support ticket",
//       ticketId: "TKT-1001",
//       time: "2 min ago",
//       read: false,
//       type: "ticket",
//     },
//     {
//       id: 2,
//       title: "Migration Request",
//       message: "XYZ Company requested migration",
//       ticketId: "TKT-1002",
//       time: "15 min ago",
//       read: false,
//       type: "migration",
//     },
//   ]);

//   const notificationRef = useRef(null);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (notificationRef.current && 
//           !notificationRef.current.contains(event.target)) {
//         setShowNotifications(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const unreadCount = notifications.filter(n => !n.read).length;

//   const markAsRead = (id) => {
//     setNotifications(prev =>
//       prev.map(notif =>
//         notif.id === id ? { ...notif, read: true } : notif
//       )
//     );
//   };

//   const markAllAsRead = () => {
//     setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
//   };

//   const handleNotificationClick = (item) => {
//     markAsRead(item.id);
//     navigate("/admin/support-tickets");
//     setShowNotifications(false);
//   };

//   return (
//     <header className="h-16 bg-[hsl(var(--card-bg))] backdrop-blur-md border-b border-[hsl(var(--border))] shadow-sm flex items-center justify-between px-5 sm:px-6 z-30">
//       <h2 className="text-lg font-semibold text-[hsl(var(--text-primary))]">
//         Welcome,{" "}
//         <span className="text-[hsl(var(--accent))] font-bold">
//           {user?.name || "Admin"}
//         </span>
//       </h2>

//       <div className="flex items-center gap-4 sm:gap-6">
//         {/* <ThemeToggle /> */}

//         {/* Notifications */}
//         <div className="relative" ref={notificationRef}>
//           <button
//             onClick={() => setShowNotifications(!showNotifications)}
//             className="relative p-2 rounded-xl hover:bg-[hsl(var(--bg-secondary))] transition-colors"
//             aria-label="Notifications"
//           >
//             <Bell size={22} />
            
//             {unreadCount > 0 && (
//               <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-medium">
//                 {unreadCount}
//               </span>
//             )}
//           </button>

//           {showNotifications && (
//             <div className="absolute right-0 top-12 w-96 bg-[hsl(var(--card-bg))] border border-[hsl(var(--border))] rounded-2xl shadow-2xl z-50 overflow-hidden">
//               {/* Header */}
//               <div className="p-4 border-b flex items-center justify-between">
//                 <h3 className="font-semibold text-lg">Notifications</h3>
//                 {unreadCount > 0 && (
//                   <button
//                     onClick={markAllAsRead}
//                     className="text-sm text-[hsl(var(--accent))] hover:underline"
//                   >
//                     Mark all read
//                   </button>
//                 )}
//                 <button
//                   onClick={() => setShowNotifications(false)}
//                   className="text-[hsl(var(--text-muted))] hover:text-[hsl(var(--text-primary))]"
//                 >
//                   <X size={18} />
//                 </button>
//               </div>

//               {/* Notifications List */}
//               <div className="max-h-[420px] overflow-y-auto">
//                 {notifications.length === 0 ? (
//                   <div className="p-8 text-center text-[hsl(var(--text-muted))]">
//                     No new notifications
//                   </div>
//                 ) : (
//                   notifications.map((item) => (
//                     <button
//                       key={item.id}
//                       onClick={() => handleNotificationClick(item)}
//                       className={`w-full text-left p-4 border-b hover:bg-[hsl(var(--bg-secondary))] transition-colors flex gap-3 ${
//                         !item.read ? "bg-[hsl(var(--bg-secondary))]" : ""
//                       }`}
//                     >
//                       <div className="flex-1 min-w-0">
//                         <p className="font-medium text-[hsl(var(--text-primary))]">{item.title}</p>
//                         <p className="text-sm text-[hsl(var(--text-muted))] mt-1">
//                           {item.message}
//                         </p>
//                         <p className="text-xs text-[hsl(var(--text-muted))] mt-2">
//                           {item.time}
//                         </p>
//                       </div>

//                       {!item.read && (
//                         <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
//                       )}
//                     </button>
//                   ))
//                 )}
//               </div>

//               {/* Footer */}
//               <div className="p-3 border-t text-center">
//                 <button
//                   onClick={() => {
//                     navigate("/admin/notifications");
//                     setShowNotifications(false);
//                   }}
//                   className="text-sm text-[hsl(var(--accent))] hover:underline"
//                 >
//                   View all notifications
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         <button
//           onClick={() => navigate("/settings")}
//           className="text-sm font-medium text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--accent))] transition-colors"
//         >
//           Settings
//         </button>

//         <button
//           onClick={() => {
//             logout();
//             navigate("/login");
//           }}
//           className="text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300 transition-colors"
//         >
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// }

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Bell, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  // ============================================
  // ADMIN NAME
  // ============================================

  const getInitialAdminName = () => {
    const savedName =
      localStorage.getItem("admin_name");

    return (
      savedName ||
      user?.name ||
      "Admin"
    );
  };

  const [adminName, setAdminName] =
    useState(getInitialAdminName);

  // ============================================
  // NOTIFICATIONS
  // ============================================

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [notifications, setNotifications] =
    useState([
      {
        id: 1,
        title: "New Support Ticket",
        message:
          "Organization ABC raised a support ticket",
        ticketId: "TKT-1001",
        time: "2 min ago",
        read: false,
        type: "ticket",
      },
      {
        id: 2,
        title: "Migration Request",
        message:
          "XYZ Company requested migration",
        ticketId: "TKT-1002",
        time: "15 min ago",
        read: false,
        type: "migration",
      },
    ]);

  const notificationRef = useRef(null);

  // ============================================
  // UPDATE HEADER WHEN PROFILE CHANGES
  // ============================================

  useEffect(() => {
    const handleProfileUpdated = (event) => {
      const newName =
        event.detail?.name;

      if (newName) {
        setAdminName(newName);
      }
    };

    window.addEventListener(
      "adminProfileUpdated",
      handleProfileUpdated
    );

    return () => {
      window.removeEventListener(
        "adminProfileUpdated",
        handleProfileUpdated
      );
    };
  }, []);

  // ============================================
  // SYNC WITH AUTH USER
  // ============================================

  useEffect(() => {
    const savedName =
      localStorage.getItem("admin_name");

    if (savedName) {
      setAdminName(savedName);
    } else if (user?.name) {
      setAdminName(user.name);
    }
  }, [user?.name]);

  // ============================================
  // CLOSE NOTIFICATION DROPDOWN
  // ============================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(
          event.target
        )
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // ============================================
  // UNREAD COUNT
  // ============================================

  const unreadCount =
    notifications.filter(
      (notification) =>
        !notification.read
    ).length;

  // ============================================
  // MARK AS READ
  // ============================================

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              read: true,
            }
          : notification
      )
    );
  };

  // ============================================
  // MARK ALL AS READ
  // ============================================

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  // ============================================
  // NOTIFICATION CLICK
  // ============================================

  const handleNotificationClick = (
    item
  ) => {
    markAsRead(item.id);

    navigate(
      "/admin/support-tickets"
    );

    setShowNotifications(false);
  };

  // ============================================
  // LOGOUT
  // ============================================

  const handleLogout = () => {
    /*
     * Remove locally saved admin name so
     * another admin does not inherit it.
     */
    localStorage.removeItem(
      "admin_name"
    );

    logout();

    navigate("/login");
  };

  // ============================================
  // UI
  // ============================================

  return (
    <header
      className="
        h-16
        bg-[hsl(var(--card-bg))]
        backdrop-blur-md
        border-b
        border-[hsl(var(--border))]
        shadow-sm
        flex
        items-center
        justify-between
        px-5
        sm:px-6
        z-30
      "
    >

      {/* ========================================
          WELCOME MESSAGE
      ======================================== */}

      <h2
        className="
          text-lg
          font-semibold
          text-[hsl(var(--text-primary))]
        "
      >
        Welcome,{" "}

        <span
          className="
            text-[hsl(var(--accent))]
            font-bold
          "
        >
          {adminName}
        </span>
      </h2>

      {/* ========================================
          RIGHT SIDE
      ======================================== */}

      <div
        className="
          flex
          items-center
          gap-4
          sm:gap-6
        "
      >

        {/* ======================================
            NOTIFICATIONS
        ====================================== */}

        <div
          className="relative"
          ref={notificationRef}
        >

          <button
            type="button"
            onClick={() =>
              setShowNotifications(
                !showNotifications
              )
            }
            className="
              relative
              p-2
              rounded-xl
              hover:bg-[hsl(var(--bg-secondary))]
              transition-colors
            "
            aria-label="Notifications"
          >

            <Bell size={22} />

            {unreadCount > 0 && (
              <span
                className="
                  absolute
                  -top-1
                  -right-1
                  w-5
                  h-5
                  rounded-full
                  bg-red-500
                  text-white
                  text-xs
                  flex
                  items-center
                  justify-center
                  font-medium
                "
              >
                {unreadCount}
              </span>
            )}

          </button>

          {/* ====================================
              NOTIFICATION DROPDOWN
          ==================================== */}

          {showNotifications && (
            <div
              className="
                absolute
                right-0
                top-12
                w-96
                max-w-[calc(100vw-2rem)]
                bg-[hsl(var(--card-bg))]
                border
                border-[hsl(var(--border))]
                rounded-2xl
                shadow-2xl
                z-50
                overflow-hidden
              "
            >

              {/* HEADER */}

              <div
                className="
                  p-4
                  border-b
                  flex
                  items-center
                  justify-between
                  gap-3
                "
              >

                <h3 className="font-semibold text-lg">
                  Notifications
                </h3>

                <div className="flex items-center gap-3">

                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={
                        markAllAsRead
                      }
                      className="
                        text-sm
                        text-[hsl(var(--accent))]
                        hover:underline
                      "
                    >
                      Mark all read
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      setShowNotifications(
                        false
                      )
                    }
                    className="
                      text-[hsl(var(--text-muted))]
                      hover:text-[hsl(var(--text-primary))]
                    "
                  >
                    <X size={18} />
                  </button>

                </div>

              </div>

              {/* NOTIFICATION LIST */}

              <div
                className="
                  max-h-[420px]
                  overflow-y-auto
                "
              >

                {notifications.length === 0 ? (

                  <div
                    className="
                      p-8
                      text-center
                      text-[hsl(var(--text-muted))]
                    "
                  >
                    No new notifications
                  </div>

                ) : (

                  notifications.map(
                    (item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() =>
                          handleNotificationClick(
                            item
                          )
                        }
                        className={`
                          w-full
                          text-left
                          p-4
                          border-b
                          hover:bg-[hsl(var(--bg-secondary))]
                          transition-colors
                          flex
                          gap-3
                          ${
                            !item.read
                              ? "bg-[hsl(var(--bg-secondary))]"
                              : ""
                          }
                        `}
                      >

                        <div
                          className="
                            flex-1
                            min-w-0
                          "
                        >

                          <p
                            className="
                              font-medium
                              text-[hsl(var(--text-primary))]
                            "
                          >
                            {item.title}
                          </p>

                          <p
                            className="
                              text-sm
                              text-[hsl(var(--text-muted))]
                              mt-1
                            "
                          >
                            {item.message}
                          </p>

                          <p
                            className="
                              text-xs
                              text-[hsl(var(--text-muted))]
                              mt-2
                            "
                          >
                            {item.time}
                          </p>

                        </div>

                        {!item.read && (
                          <div
                            className="
                              w-2
                              h-2
                              bg-blue-500
                              rounded-full
                              mt-2
                              flex-shrink-0
                            "
                          />
                        )}

                      </button>
                    )
                  )

                )}

              </div>

              {/* FOOTER */}

              <div
                className="
                  p-3
                  border-t
                  text-center
                "
              >

                <button
                  type="button"
                  onClick={() => {
                    navigate(
                      "/admin/notifications"
                    );

                    setShowNotifications(
                      false
                    );
                  }}
                  className="
                    text-sm
                    text-[hsl(var(--accent))]
                    hover:underline
                  "
                >
                  View all notifications
                </button>

              </div>

            </div>
          )}

        </div>

        {/* ======================================
            SETTINGS
        ====================================== */}

        <button
          type="button"
          onClick={() =>
            navigate("/settings")
          }
          className="
            text-sm
            font-medium
            text-[hsl(var(--text-secondary))]
            hover:text-[hsl(var(--accent))]
            transition-colors
          "
        >
          Settings
        </button>

        {/* ======================================
            LOGOUT
        ====================================== */}

        <button
          type="button"
          onClick={handleLogout}
          className="
            text-sm
            font-medium
            text-red-600
            dark:text-red-400
            hover:text-red-500
            dark:hover:text-red-300
            transition-colors
          "
        >
          Logout
        </button>

      </div>

    </header>
  );
}