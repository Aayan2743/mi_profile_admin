// src/routes/AffiliateRoute.jsx

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AffiliateRoute({ children }) {
    const {
        user,
        userType,
        loading,
        isAuthenticated,
    } = useAuth();

    console.log("========== AFFILIATE ROUTE ==========");
    console.log("loading:", loading);
    console.log("isAuthenticated:", isAuthenticated);
    console.log("userType:", userType);
    console.log("user:", user);
    console.log("token:", localStorage.getItem("token"));
    console.log("stored type:", localStorage.getItem("user_type"));
    console.log("=====================================");

    // ---------------------------------------------------------
    // WAIT FOR AUTH CONTEXT
    // ---------------------------------------------------------
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F7F7F5]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#fe7f2d] mx-auto" />

                    <p className="mt-3 text-sm text-gray-500">
                        Loading...
                    </p>
                </div>
            </div>
        );
    }

    // ---------------------------------------------------------
    // CHECK TOKEN
    // ---------------------------------------------------------
    const token = localStorage.getItem("token");

    if (!token) {
        console.log("❌ NO TOKEN");

        return (
            <Navigate
                to="/affiliate-login"
                replace
            />
        );
    }

    // ---------------------------------------------------------
    // CHECK USER TYPE
    // ---------------------------------------------------------
    if (userType !== "affiliate") {
        console.log(
            "❌ WRONG USER TYPE:",
            userType
        );

        return (
            <Navigate
                to="/affiliate-login"
                replace
            />
        );
    }

    // ---------------------------------------------------------
    // CHECK USER
    // ---------------------------------------------------------
    if (!user) {
        console.log("❌ USER DATA NOT FOUND");

        return (
            <Navigate
                to="/affiliate-login"
                replace
            />
        );
    }

    // ---------------------------------------------------------
    // SUCCESS
    // ---------------------------------------------------------
    console.log("✅ AFFILIATE ACCESS GRANTED");

    return children;
}