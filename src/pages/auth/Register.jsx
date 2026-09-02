
// // src/pages/auth/Register.jsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../services/api";
// import { successAlert, errorAlert } from "../../utils/alert";
// import Loader from "../../components/Loader";
// import Footer from "../../components/Footer";

// export default function Register() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [fieldErrors, setFieldErrors] = useState({}); // per-field errors from backend

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value.trim() }));
//     setFieldErrors((prev) => ({ ...prev, [name]: "" })); // clear error on change
//   };

//   const validateClientSide = () => {
//     const errors = {};

//     if (!formData.name.trim()) errors.name = "Name is required";
//     else if (formData.name.trim().length > 255) errors.name = "Name too long (max 255)";

//     if (!formData.email.trim()) errors.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) errors.email = "Invalid email format";

//     if (!formData.password.trim()) errors.password = "Password is required";
//     else if (formData.password.length < 6) errors.password = "Password must be at least 6 characters";

//     if (!formData.phone.trim()) errors.phone = "Phone number is required";
//     else if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
//       errors.phone = "Phone must be 10 digits starting with 6-9";
//     }

//     setFieldErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Client-side validation
//     if (!validateClientSide()) {
//       errorAlert("Validation Error", "Please fix the highlighted fields");
//       return;
//     }

//     setLoading(true);
//     setFieldErrors({}); // clear previous backend errors

//     try {
//       const payload = {
//         name: formData.name.trim(),
//         email: formData.email.trim(),
//         password: formData.password.trim(),
//         phone: formData.phone.trim(),
//       };

//       console.log("Sending registration payload:", payload); // ← for debugging

//       const res = await api.post("/auth/admin-register", payload);

//       const { success, token, user } = res.data;

//       if (!success || !token || !user?.id) {
//         throw new Error("Invalid registration response");
//       }

//       // Store token & user (same as login)
//       localStorage.setItem("token", token);
//       localStorage.setItem("admin_user", JSON.stringify(user));
//       localStorage.setItem("remember_me", "true");

//       successAlert("Success", `Account created! Welcome, ${user.name || "Admin"}`);

//       setTimeout(() => {
//         navigate("/");
//       }, 1500);

//     } catch (err) {
//       console.error("Registration error:", err);

//       let mainMessage = "Registration failed – please try again";

//       if (err.response?.status === 422) {
//         const backendErrors = err.response.data.errors || {};

//         // Map backend errors to per-field state
//         const newErrors = {};
//         Object.keys(backendErrors).forEach((field) => {
//           newErrors[field] = backendErrors[field][0]; // take first message
//         });

//         setFieldErrors(newErrors);

//         // Show main alert with first error
//         if (Object.keys(newErrors).length > 0) {
//           const firstError = Object.values(newErrors)[0];
//           mainMessage = firstError;
//         } else {
//           mainMessage = err.response.data.message || "Validation failed";
//         }
//       } else if (err.response) {
//         mainMessage = err.response.data.message || `Server error (${err.response.status})`;
//       } else if (err.request) {
//         mainMessage = "No response from server – check internet connection";
//       } else {
//         mainMessage = err.message || "An unexpected error occurred";
//       }

//       errorAlert("Registration Failed", mainMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 px-4">
//       <Loader show={loading} text="Creating your account..." />

//       <div className="w-full max-w-md bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/30">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-white shadow-lg flex items-center justify-center overflow-hidden">
//             <img src="/logo.jpeg" alt="Logo" className="h-10 w-10 object-contain" />
//           </div>
//           <h1 className="text-2xl font-bold text-white">Create Admin Account</h1>
//           <p className="text-white/80 text-sm mt-1">
//             Register to manage the digital card platform
//           </p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Name */}
//           <div>
//             <label className="text-white text-sm mb-1 block font-medium">
//               Full Name <span className="text-red-300">*</span>
//             </label>
//             <input
//               name="name"
//               type="text"
//               placeholder="John Doe"
//               value={formData.name}
//               onChange={handleChange}
//               className={`w-full px-4 py-3 rounded-xl bg-white/90 outline-none transition text-gray-900 border ${
//                 fieldErrors.name ? "border-red-500 ring-2 ring-red-300" : "border-transparent focus:ring-indigo-400"
//               }`}
//             />
//             {fieldErrors.name && (
//               <p className="text-red-300 text-xs mt-1">{fieldErrors.name}</p>
//             )}
//           </div>

//           {/* Email */}
//           <div>
//             <label className="text-white text-sm mb-1 block font-medium">
//               Email Address <span className="text-red-300">*</span>
//             </label>
//             <input
//               name="email"
//               type="email"
//               placeholder="admin@example.com"
//               value={formData.email}
//               onChange={handleChange}
//               className={`w-full px-4 py-3 rounded-xl bg-white/90 outline-none transition text-gray-900 border ${
//                 fieldErrors.email ? "border-red-500 ring-2 ring-red-300" : "border-transparent focus:ring-indigo-400"
//               }`}
//             />
//             {fieldErrors.email && (
//               <p className="text-red-300 text-xs mt-1">{fieldErrors.email}</p>
//             )}
//           </div>

//           {/* Phone */}
//           <div>
//             <label className="text-white text-sm mb-1 block font-medium">
//               Phone Number <span className="text-red-300">*</span>
//             </label>
//             <input
//               name="phone"
//               type="tel"
//               placeholder="9876543210"
//               value={formData.phone}
//               onChange={handleChange}
//               maxLength={15}
//               className={`w-full px-4 py-3 rounded-xl bg-white/90 outline-none transition text-gray-900 border ${
//                 fieldErrors.phone ? "border-red-500 ring-2 ring-red-300" : "border-transparent focus:ring-indigo-400"
//               }`}
//             />
//             {fieldErrors.phone && (
//               <p className="text-red-300 text-xs mt-1">{fieldErrors.phone}</p>
//             )}
//           </div>

//           {/* Password */}
//           <div>
//             <label className="text-white text-sm mb-1 block font-medium">
//               Password <span className="text-red-300">*</span>
//             </label>
//             <input
//               name="password"
//               type="password"
//               placeholder="••••••••"
//               value={formData.password}
//               onChange={handleChange}
//               minLength={6}
//               className={`w-full px-4 py-3 rounded-xl bg-white/90 outline-none transition text-gray-900 border ${
//                 fieldErrors.password ? "border-red-500 ring-2 ring-red-300" : "border-transparent focus:ring-indigo-400"
//               }`}
//             />
//             {fieldErrors.password && (
//               <p className="text-red-300 text-xs mt-1">{fieldErrors.password}</p>
//             )}
//             <p className="text-white/70 text-xs mt-1">
//               Minimum 6 characters
//             </p>
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-3 rounded-xl font-semibold text-white shadow-lg transition-all
//               ${loading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]"}`}
//           >
//             {loading ? (
//               <span className="flex items-center justify-center gap-2">
//                 <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
//                 Creating Account...
//               </span>
//             ) : (
//               "Register"
//             )}
//           </button>
//         </form>

//         {/* Login link */}
//         <div className="text-center mt-6 text-white/80 text-sm">
//           Already have an account?{" "}
//           <button
//             onClick={() => navigate("/login")}
//             className="text-indigo-300 hover:text-indigo-200 font-medium underline"
//           >
//             Sign in here
//           </button>
//         </div>

//         <Footer />
//       </div>
//     </div>
//   );
// }

// src/pages/auth/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { successAlert, errorAlert } from "../../utils/alert";
import Loader from "../../components/Loader";
import Footer from "../../components/Footer";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value.trim() }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateClientSide = () => {
    const errors = {};

    if (!formData.name.trim()) errors.name = "Name is required";
    else if (formData.name.trim().length > 255) errors.name = "Name too long";

    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) errors.email = "Invalid email";

    if (!formData.password.trim()) errors.password = "Password is required";
    else if (formData.password.length < 6) errors.password = "Min 6 characters";

    if (!formData.phone.trim()) errors.phone = "Phone is required";
    else if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      errors.phone = "10 digits starting with 6-9";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateClientSide()) {
      errorAlert("Validation Error", "Please fix the highlighted fields");
      return;
    }

    setLoading(true);
    setFieldErrors({});

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password.trim(),
        phone: formData.phone.trim(),
      };

      const res = await api.post("/auth/admin-register", payload);

      const { success, token, user } = res.data;

      if (success && token && user?.id) {
        localStorage.setItem("token", token);
        localStorage.setItem("admin_user", JSON.stringify(user));
        localStorage.setItem("remember_me", "true");

        successAlert("Success", `Account created! Welcome, ${user.name || "Admin"}`);

        setTimeout(() => navigate("/"), 1500);
      }
    } catch (err) {
      console.error("Registration error:", err);

      let mainMessage = "Registration failed – please try again";

      if (err.response?.status === 422) {
        const backendErrors = err.response.data.errors || {};
        const newErrors = {};
        Object.keys(backendErrors).forEach((field) => {
          newErrors[field] = backendErrors[field][0];
        });
        setFieldErrors(newErrors);
        mainMessage = Object.values(newErrors)[0] || "Validation failed";
      } else if (err.response) {
        mainMessage = err.response.data.message || `Server error (${err.response.status})`;
      } else if (err.request) {
        mainMessage = "No response from server – check connection";
      }

      errorAlert("Registration Failed", mainMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-8">
      <Loader show={loading} text="Creating your account..." />

      <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-7 md:p-9 border border-white/50">
        {/* Header - Compact */}
        <div className="text-center mb-7">
          <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-white shadow-lg flex items-center justify-center overflow-hidden">
            <img
              src="../assets/31.svg"
              alt="Logo"
              className="h-30 w-30 object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Create Account
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Register to manage the digital card platform
          </p>
        </div>

        {/* Form - Slightly Smaller */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-2xl border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all text-sm
                ${fieldErrors.name ? "border-red-500 ring-2 ring-red-200" : "border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"}`}
            />
            {fieldErrors.name && <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="admin@example.com"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-2xl border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all text-sm
                ${fieldErrors.email ? "border-red-500 ring-2 ring-red-200" : "border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"}`}
            />
            {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              name="phone"
              type="tel"
              placeholder="9876543210"
              value={formData.phone}
              onChange={handleChange}
              maxLength={15}
              className={`w-full px-4 py-3 rounded-2xl border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all text-sm
                ${fieldErrors.phone ? "border-red-500 ring-2 ring-red-200" : "border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"}`}
            />
            {fieldErrors.phone && <p className="text-red-500 text-xs mt-1">{fieldErrors.phone}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Role <span className="text-red-500">*</span>
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={`w-full px-5 py-3.5 rounded-2xl border bg-white text-gray-900 focus:outline-none transition-all
                ${fieldErrors.role ? "border-red-500 ring-2 ring-red-200" : "border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"}`}
            >
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
              <option value="manager">Manager</option>
              {/* Add more roles if needed */}
            </select>
            {fieldErrors.role && <p className="text-red-500 text-xs mt-1">{fieldErrors.role}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              minLength={6}
              className={`w-full px-4 py-3 rounded-2xl border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all text-sm
                ${fieldErrors.password ? "border-red-500 ring-2 ring-red-200" : "border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"}`}
            />
            {fieldErrors.password && <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>}
            <p className="text-gray-500 text-xs mt-1">Minimum 6 characters</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 rounded-2xl font-semibold text-white shadow-lg transition-all duration-200 text-base
              ${loading
                ? "bg-orange-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 active:scale-[0.98]"}`}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-6 text-gray-600 text-sm">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-orange-600 font-medium hover:text-orange-700 underline-offset-2 hover:underline"
          >
            Sign in here
          </button>
        </div>

        <Footer />
      </div>
    </div>
  );
}