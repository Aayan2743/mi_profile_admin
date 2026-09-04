// src/pages/auth/AffiliateLogin.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { successAlert, errorAlert } from "../../utils/alert";
import Loader from "../../components/Loader";
import api from "../../services/api";

export default function AffiliateLogin() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            errorAlert(
                "Required",
                "Please enter your email."
            );
            return;
        }

        if (!password) {
            errorAlert(
                "Required",
                "Please enter your password."
            );
            return;
        }

        setLoading(true);

        try {
            // =====================================================
            // LOGIN API
            // =====================================================
            const res = await api.post(
                "/affiliate/login",
                {
                    email: email.trim(),
                    password: password,
                }
            );

            console.log(
                "Affiliate Login Response:",
                res.data
            );

            // =====================================================
            // SUCCESS
            // =====================================================
          if (res.data.status === true) {
    const userData = res.data.data;
    const token = res.data.token;

    const loginSuccess = login(
        userData,
        token,
        "affiliate"
    );

    if (!loginSuccess) {
        errorAlert(
            "Login Failed",
            "Unable to save login session."
        );
        return;
    }

    console.log("LOGIN COMPLETE");
    console.log("TOKEN:", localStorage.getItem("token"));
    console.log(
        "USER TYPE:",
        localStorage.getItem("user_type")
    );

    setLoading(false);

    navigate("/affiliate/dashboard", {
        replace: true,
    });

    setTimeout(() => {
        successAlert(
            "Login Successful",
            `Welcome ${userData.name}!`
        );
    }, 100);

    return;
}

            // =====================================================
            // API RETURNED FALSE
            // =====================================================
            setLoading(false);

            errorAlert(
                "Login Failed",
                res.data.message ||
                    "Unable to login."
            );

        } catch (error) {

            console.error(
                "Affiliate Login Error:",
                error
            );

            console.error(
                "Status:",
                error.response?.status
            );

            console.error(
                "Response:",
                error.response?.data
            );

            const status =
                error.response?.status;

            const data =
                error.response?.data;

            // =====================================================
            // VALIDATION ERROR
            // =====================================================
            if (status === 422) {

                errorAlert(
                    "Validation Failed",
                    data?.message ||
                        "Please enter valid login details."
                );

                return;
            }

            // =====================================================
            // INVALID LOGIN
            // =====================================================
            if (status === 401) {

                errorAlert(
                    "Login Failed",
                    data?.message ||
                        "Invalid email or password."
                );

                return;
            }

            // =====================================================
            // ACCESS DENIED
            // =====================================================
            if (status === 403) {

                errorAlert(
                    "Access Denied",
                    data?.message ||
                        "Your affiliate account is not allowed to login."
                );

                return;
            }

            // =====================================================
            // OTHER ERROR
            // =====================================================
            errorAlert(
                "Login Failed",
                data?.message ||
                    "Unable to login. Please try again."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

            <Loader
                show={loading}
                text="Signing in..."
            />

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

                {/* =================================================
                    HEADER
                ================================================= */}
                <h1 className="text-2xl font-bold text-center mb-2">
                    Affiliate Login
                </h1>

                <p className="text-center text-gray-500 mb-6 text-sm">
                    Sign in to your affiliate dashboard
                </p>

                {/* =================================================
                    LOGIN FORM
                ================================================= */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    {/* EMAIL */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                            autoComplete="email"
                            className="w-full border rounded-xl px-4 py-3 outline-none focus:border-orange-500"
                            placeholder="email@example.com"
                        />
                    </div>

                    {/* PASSWORD */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                            autoComplete="current-password"
                            className="w-full border rounded-xl px-4 py-3 outline-none focus:border-orange-500"
                            placeholder="••••••••"
                        />
                    </div>

                    {/* LOGIN BUTTON */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 disabled:opacity-60"
                    >
                        {loading
                            ? "Signing In..."
                            : "Sign In as Affiliate"}
                    </button>

                </form>

                {/* =================================================
                    REGISTER
                ================================================= */}
                <p className="text-center text-sm mt-6">
                    Don't have an account?{" "}

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/affiliate-register"
                            )
                        }
                        className="text-orange-500 font-medium hover:underline"
                    >
                        Register
                    </button>
                </p>

            </div>
        </div>
    );
}