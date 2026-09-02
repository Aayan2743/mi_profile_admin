// // src/pages/auth/Login.jsx
// // src/pages/auth/Login.jsx
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { successAlert, errorAlert } from "../../utils/alert";
// import Loader from "../../components/Loader";
// import api from "../../services/api";
// import Footer from "../../components/Footer";

// // const { isAdmin } = useAuth();

// export default function Login() {
//   const { login, isAdmin } = useAuth();
//   const navigate = useNavigate();

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [rememberMe, setRememberMe] = useState(
//     localStorage.getItem("remember_me") === "true",
//   );

  

//   useEffect(() => {
//     if (isAdmin) {
//       navigate("/", { replace: true }); // replace = don't keep login in history
//     }
//   }, [isAdmin, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await api.post("/auth/admin-login", {
//         username,
//         password,
//       });

//       if (res.data.success) {
//         const userData = res.data.user || res.data.admin || res.data.employee;

//         login(
//           userData,
//           res.data.token,
//           "admin", // ← This was missing
//           rememberMe,
//         );

//         successAlert(
//           "Login Successful",
//           `Welcome back, ${userData?.name || "Admin"}!`,
//         );

//         // setTimeout(() => {
//         //   navigate("/");
//         // }, 800);
//       }
//     } catch (error) {
//       console.error("Login error:", error);

//       let message = "Login failed – please try again";

//       if (error.response) {
//         const { status, data } = error.response;
//         if (status === 401) message = "Invalid username or password";
//         else if (status === 422) message = data.message || "Validation error";
//         else if (status === 403) message = "Access forbidden";
//         else message = data.message || "Server error";
//       }

//       errorAlert("Login Failed", message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--bg-primary))] px-4 py-12">
//       <Loader show={loading} text="Signing you in..." />

//       <div className="w-full max-w-md bg-[hsl(var(--card-bg))] backdrop-blur-xl rounded-2xl shadow-2xl p-8 md:p-10 border border-[hsl(var(--border))]">
//         <div className="text-center mb-8">
//           <h1 className="font-bold text-2xl md:text-3xl text-[hsl(var(--text-primary))]">
//             Admin Login
//           </h1>
//           <p className="text-[hsl(var(--text-muted))] text-sm md:text-base mt-2">
//             Sign in to manage your dashboard
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
//           <div>
//             <label className="text-sm font-medium text-[hsl(var(--text-muted))] mb-2 block">
//                Email / Phone
//             </label>
//             <input
//               type="text"
//               placeholder="admin@example.com or 9876543210"
//               value={username}
//               onChange={(e) => setUsername(e.target.value.trim())}
//               required
//               className="w-full px-4 py-3 rounded-xl bg-[hsl(var(--card-bg))] border border-[hsl(var(--border))] focus:border-[hsl(var(--accent))] focus:ring-2 focus:ring-[hsl(var(--accent)/0.3)] outline-none transition-all"
//             />
//           </div>

//           <div>
//             <label className="text-sm font-medium text-[hsl(var(--text-muted))] mb-2 block">
//               Password
//             </label>
//             <input
//               type="password"
//               placeholder="••••••••"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full px-4 py-3 rounded-xl bg-[hsl(var(--card-bg))] border border-[hsl(var(--border))] focus:border-[hsl(var(--accent))] focus:ring-2 focus:ring-[hsl(var(--accent)/0.3)] outline-none transition-all"
//             />
//           </div>

//           <div className="flex items-center justify-between text-sm">
//             <label className="flex items-center gap-2 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={rememberMe}
//                 onChange={(e) => setRememberMe(e.target.checked)}
//               />
//               Remember me
//             </label>

//             <button
//               type="button"
//               onClick={() => navigate("/forget-password")}
//               className="text-[hsl(var(--accent))] hover:underline"
//             >
//               Forgot password?
//             </button>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-3 rounded-xl font-semibold text-white transition-all
//               ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-dark))]"}`}
//           >
//             {loading ? "Signing In..." : "Sign In as Admin"}
//           </button>
//         </form>

//         <Footer />
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { successAlert, errorAlert } from "../../utils/alert";
import Loader from "../../components/Loader";
import api from "../../services/api";
import Footer from "../../components/Footer";

export default function Login() {
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(
    localStorage.getItem("remember_me") === "true",
  );

  useEffect(() => {
    if (isAdmin) {
      navigate("/", { replace: true });
    }
  }, [isAdmin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/admin-login", {
        username,
        password,
      });

      if (res.data.success) {
        const userData = res.data.user || res.data.admin || res.data.employee;

        login(
          userData,
          res.data.token,
          "admin",
          rememberMe,
        );

        successAlert(
          "Login Successful",
          `Welcome back, ${userData?.name || "Admin"}!`,
        );
      }
    } catch (error) {
      console.error("Login error:", error);

      let message = "Login failed – please try again";

      if (error.response) {
        const { status, data } = error.response;
        if (status === 401) message = "Invalid username or password";
        else if (status === 422) message = data.message || "Validation error";
        else if (status === 403) message = "Access forbidden";
        else message = data.message || "Server error";
      }

      errorAlert("Login Failed", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--bg-primary))] px-4 py-12">
      <Loader show={loading} text="Signing you in..." />

      <div className="w-full max-w-md bg-[hsl(var(--card-bg))] backdrop-blur-xl rounded-2xl shadow-2xl p-8 md:p-10 border border-[hsl(var(--border))]">
        <div className="text-center mb-8">
          <h1 className="font-bold text-2xl md:text-3xl text-[hsl(var(--text-primary))]">
            Admin Login
          </h1>
          <p className="text-[hsl(var(--text-muted))] text-sm md:text-base mt-2">
            Sign in to manage your dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
          <div>
            <label className="text-sm font-medium text-[hsl(var(--text-muted))] mb-2 block">
               Email 
            </label>
            <input
              type="text"
              placeholder="admin@example.com or 9876543210"
              value={username}
              onChange={(e) => setUsername(e.target.value.trim())}
              required
              className="w-full px-4 py-3 rounded-xl bg-[hsl(var(--card-bg))] border border-[hsl(var(--border))] focus:border-[hsl(var(--accent))] focus:ring-2 focus:ring-[hsl(var(--accent)/0.3)] outline-none transition-all"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[hsl(var(--text-muted))] mb-2 block">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-[hsl(var(--card-bg))] border border-[hsl(var(--border))] focus:border-[hsl(var(--accent))] focus:ring-2 focus:ring-[hsl(var(--accent)/0.3)] outline-none transition-all"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>

            <button
              type="button"
              onClick={() => navigate("/forget-password")}
              className="text-[hsl(var(--accent))] hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-white transition-all
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-dark))]"}`}
          >
            {loading ? "Signing In..." : "Sign In as Admin"}
          </button>
        </form>

        {/* ========== AFFILIATE ACCOUNT LINK ========== */}
        <div className="mt-6 pt-5 border-t border-[hsl(var(--border))] text-center">
          <p className="text-sm text-[hsl(var(--text-muted))]">
            Want to join as an Affiliate?
          </p>
          <button
            type="button"
            onClick={() => navigate("/affiliate-register")}   // ← change this route if needed
            className="mt-2 text-[hsl(var(--accent))] font-semibold hover:underline"
          >
            Create Affiliate Account
          </button>
        </div>

        <Footer />
      </div>
    </div>
  );
}