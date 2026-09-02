// src/pages/auth/EmployeeLogin.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { successAlert, errorAlert } from "../../utils/alert";
import Loader from "../../components/Loader";
import api from "../../services/api";
import { Eye, EyeOff } from "lucide-react";

export default function EmployeeLogin() {
  const { login, isEmployee } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (isEmployee) {
      navigate("/employee/dashboard");
    }
  }, [isEmployee, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/employee-login", {
        email,
        password,
      });

      if (res.data.success) {
        login(res.data.employee, res.data.token, "employee", rememberMe);

        successAlert("Login Successful", `Welcome, ${res.data.employee.name}!`);

        setTimeout(() => {
          navigate("/employee/dashboard");
        }, 800);
      }
    } catch (err) {
      console.error("Employee Login error:", err);

      let message = "Login failed – please try again";

      if (err.response) {
        const { status, data } = err.response;
        if (status === 401) {
          message = "Invalid email or password";
        } else if (status === 403) {
          message = "Account is inactive. Contact Admin.";
        } else if (status === 422) {
          message = data.message || "Validation error";
        }
      }

      errorAlert("Login Failed", message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate("/forget-password"); // ← Goes to Forgot Password page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--bg-primary))] px-4 py-12">
      <Loader show={loading} text="Signing you in..." />

      <div className="w-full max-w-md bg-[hsl(var(--card-bg))] rounded-2xl shadow-2xl p-8 md:p-10 border border-[hsl(var(--border))]">
        <div className="text-center mb-8">
          <h1 className="font-bold text-3xl text-[hsl(var(--text-primary))] mb-2">
            Employee Login
          </h1>
          <p className="text-[hsl(var(--text-muted))]">
            Sign in to access your workspace
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[hsl(var(--text-muted))] mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-[hsl(var(--border))] focus:ring-2 focus:ring-[hsl(var(--accent))] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[hsl(var(--text-muted))] mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-[hsl(var(--border))] focus:ring-2 focus:ring-[hsl(var(--accent))] outline-none pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>

            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-[hsl(var(--accent))] hover:underline font-medium"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-dark))] text-white font-semibold rounded-xl transition disabled:opacity-70"
          >
            {loading ? "Signing In..." : "Sign In as Employee"}
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-[hsl(var(--text-muted))]">
          <button
            onClick={() => navigate("/login")}
            className="text-[hsl(var(--accent))] hover:underline"
          >
            ← Back to Admin Login
          </button>
        </div>
      </div>
    </div>
  );
}
