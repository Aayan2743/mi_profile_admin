// // src/context/AuthContext.jsx
// import { createContext, useContext, useEffect, useState } from "react";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [userType, setUserType] = useState(null); // "admin" or "employee"
//   const [loading, setLoading] = useState(true);

//   // Load from storage on mount
//   useEffect(() => {
//     const token =
//       localStorage.getItem("token") || sessionStorage.getItem("token");
//     const type = localStorage.getItem("user_type");

//     if (token && type) {
//       const key = type === "admin" ? "admin_user" : "employee_user";
//       const cachedUser = localStorage.getItem(key);

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

//     // Save User Data
//     const userKey = type === "admin" ? "admin_user" : "employee_user";
//     localStorage.setItem(userKey, JSON.stringify(userData));

//     setUser(userData);
//     setUserType(type);

//     console.log(`✅ Logged in as ${type} | Token saved successfully`);
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


import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null); // "admin" | "employee" | "affiliate"
  const [loading, setLoading] = useState(true);

  // Load from storage on mount
  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const type = localStorage.getItem("user_type");

    if (token && type) {
      let userKey = "admin_user";
      if (type === "employee") userKey = "employee_user";
      if (type === "affiliate") userKey = "affiliate_user";

      const cachedUser = localStorage.getItem(userKey);

      if (cachedUser) {
        setUser(JSON.parse(cachedUser));
        setUserType(type);
      }
    }
    setLoading(false);
  }, []);

  const login = (userData, token, type = "admin", remember = false) => {
    const storage = remember ? localStorage : sessionStorage;

    // Save Token
    storage.setItem("token", token);

    // Save User Type
    localStorage.setItem("user_type", type);

    // Save User Data based on type
    let userKey = "admin_user";
    if (type === "employee") userKey = "employee_user";
    if (type === "affiliate") userKey = "affiliate_user";

    localStorage.setItem(userKey, JSON.stringify(userData));

    setUser(userData);
    setUserType(type);

    console.log(`✅ Logged in as ${type}`);
  };

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setUser(null);
    setUserType(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userType,
        isAdmin: userType === "admin",
        isEmployee: userType === "employee",
        isAffiliate: userType === "affiliate",   // ← added
        loading,
        login,
        logout,
        isAuthenticated: !!(
          localStorage.getItem("token") || sessionStorage.getItem("token")
        ),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);