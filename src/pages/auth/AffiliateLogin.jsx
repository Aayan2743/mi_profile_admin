import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { successAlert, errorAlert } from "../../utils/alert";
import Loader from "../../components/Loader";

export default function AffiliateLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // ========== STATIC LOGIN (for testing) ==========
    setTimeout(() => {
      if (
        (username === "affiliate@test.com" || username === "9876543210") &&
        password === "123456"
      ) {
        // Fake user data
        const userData = {
          id: 1,
          name: "Test Affiliate",
          email: "affiliate@test.com",
          phone: "9876543210",
          role: "affiliate",
        };

        login(userData, "fake-affiliate-token", "affiliate");
        successAlert("Login Successful", `Welcome ${userData.name}!`);
        navigate("/affiliate/dashboard");
      } else {
        errorAlert("Login Failed", "Invalid email/phone or password");
      }
      setLoading(false);
    }, 800);
    // ================================================
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Loader show={loading} text="Signing in..." />

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-center mb-2">Affiliate Login</h1>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Sign in to your affiliate dashboard
        </p>

        {/* Test credentials hint */}
        <div className="mb-5 p-3 bg-orange-50 border border-orange-100 rounded-xl text-sm text-orange-700">
          <p className="font-medium">Test Credentials:</p>
          <p>Email: <b>affiliate@test.com</b></p>
          <p>Phone: <b>9876543210</b></p>
          <p>Password: <b>123456</b></p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Email / Phone
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full border rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              placeholder="email@example.com or 9876543210"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In as Affiliate"}
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/affiliate-register")}
            className="text-orange-500 font-medium hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}