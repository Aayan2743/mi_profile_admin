


// import { createContext, useContext, useEffect, useState } from "react";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [userType, setUserType] = useState(null); // "admin" | "employee" | "affiliate"
//   const [loading, setLoading] = useState(true);

//   // Load from storage on mount
//   useEffect(() => {
//     const token =
//       localStorage.getItem("token") || sessionStorage.getItem("token");
//     const type = localStorage.getItem("user_type");

//     if (token && type) {
//       let userKey = "admin_user";
//       if (type === "employee") userKey = "employee_user";
//       if (type === "affiliate") userKey = "affiliate_user";

//       const cachedUser = localStorage.getItem(userKey);

//       if (cachedUser) {
//         setUser(JSON.parse(cachedUser));
//         setUserType(type);
//       }
//     }
//     setLoading(false);
//   }, []);

//   const login = (userData, token, type = "admin", remember = false) => {
//     const storage = remember ? localStorage : sessionStorage;

//     // Save Token
//     storage.setItem("token", token);

//     // Save User Type
//     localStorage.setItem("user_type", type);

//     // Save User Data based on type
//     let userKey = "admin_user";
//     if (type === "employee") userKey = "employee_user";
//     if (type === "affiliate") userKey = "affiliate_user";

//     localStorage.setItem(userKey, JSON.stringify(userData));

//     setUser(userData);
//     setUserType(type);

//     console.log(`✅ Logged in as ${type}`);
//   };

//   const logout = () => {
//     localStorage.clear();
//     sessionStorage.clear();
//     setUser(null);
//     setUserType(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         userType,
//         isAdmin: userType === "admin",
//         isEmployee: userType === "employee",
//         isAffiliate: userType === "affiliate",   // ← added
//         loading,
//         login,
//         logout,
//         isAuthenticated: !!(
//           localStorage.getItem("token") || sessionStorage.getItem("token")
//         ),
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);



// src/context/AuthContext.jsx

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [userType, setUserType] = useState(null);
    const [loading, setLoading] = useState(true);

    // =========================================================
    // LOAD AUTH DATA FROM LOCAL STORAGE
    // =========================================================
    useEffect(() => {
        try {
            const token = localStorage.getItem("token");
            const type = localStorage.getItem("user_type");

            if (token && type) {
                let userKey = "admin_user";

                if (type === "employee") {
                    userKey = "employee_user";
                }

                if (type === "affiliate") {
                    userKey = "affiliate_user";
                }

                const cachedUser = localStorage.getItem(userKey);

                if (cachedUser) {
                    setUser(JSON.parse(cachedUser));
                    setUserType(type);
                } else {
                    // Token exists but user data doesn't
                    localStorage.removeItem("token");
                    localStorage.removeItem("user_type");
                }
            }
        } catch (error) {
            console.error("Auth restore error:", error);

            localStorage.removeItem("token");
            localStorage.removeItem("user_type");
            localStorage.removeItem("admin_user");
            localStorage.removeItem("employee_user");
            localStorage.removeItem("affiliate_user");

            setUser(null);
            setUserType(null);
        } finally {
            setLoading(false);
        }
    }, []);

    // =========================================================
    // LOGIN
    // =========================================================
    const login = (userData, token, type = "admin") => {
        if (!token) {
            console.error("Login failed: Token is missing.");
            return false;
        }

        if (!userData) {
            console.error("Login failed: User data is missing.");
            return false;
        }

        try {
            // -------------------------------------------------
            // SAVE JWT TOKEN
            // -------------------------------------------------
            localStorage.setItem("token", token);

            // -------------------------------------------------
            // SAVE USER TYPE
            // -------------------------------------------------
            localStorage.setItem("user_type", type);

            // -------------------------------------------------
            // DETERMINE USER STORAGE KEY
            // -------------------------------------------------
            let userKey = "admin_user";

            if (type === "employee") {
                userKey = "employee_user";
            }

            if (type === "affiliate") {
                userKey = "affiliate_user";
            }

            // -------------------------------------------------
            // SAVE USER DATA
            // -------------------------------------------------
            localStorage.setItem(
                userKey,
                JSON.stringify(userData)
            );

            // -------------------------------------------------
            // UPDATE REACT STATE
            // -------------------------------------------------
            setUser(userData);
            setUserType(type);

            console.log("=================================");
            console.log("LOGIN SUCCESS");
            console.log("User Type:", type);
            console.log("User:", userData);
            console.log("Token Saved:", !!localStorage.getItem("token"));
            console.log("=================================");

            return true;
        } catch (error) {
            console.error("Login storage error:", error);
            return false;
        }
    };

    // =========================================================
    // LOGOUT
    // =========================================================
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user_type");

        localStorage.removeItem("admin_user");
        localStorage.removeItem("employee_user");
        localStorage.removeItem("affiliate_user");

        sessionStorage.removeItem("token");

        setUser(null);
        setUserType(null);

        console.log("Logged out successfully.");
    };

    // =========================================================
    // AUTH STATUS
    // =========================================================
    const isAuthenticated = !!localStorage.getItem("token");

    // =========================================================
    // ROLE CHECKS
    // =========================================================
    const isAdmin = userType === "admin";
    const isEmployee = userType === "employee";
    const isAffiliate = userType === "affiliate";

    // =========================================================
    // PROVIDER
    // =========================================================
    return (
        <AuthContext.Provider
            value={{
                // User
                user,
                userType,

                // Role checks
                isAdmin,
                isEmployee,
                isAffiliate,

                // Authentication
                isAuthenticated,
                loading,

                // Functions
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// =============================================================
// CUSTOM HOOK
// =============================================================
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside an AuthProvider"
        );
    }

    return context;
};