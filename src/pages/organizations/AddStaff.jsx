// // src/pages/organizations/AddOrganization.jsx
// import { useState } from "react";
// import { X } from "lucide-react";
// import { errorAlert } from "../../utils/alert";

// export default function AddStaff({ onClose, onSave }) {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [errors, setErrors] = useState({});

//   const saveStaff = async () => {
//     if (loading) return;

//     setLoading(true);
//     setErrors({});

//     try {
//       const payload = {
//         name: name.trim(),
//         email: email.trim(),
//         // password: password.trim(),
//         phone: phone.trim(),
//       };

//       const response = await axios.post(
//         `${import.meta.env.VITE_API_URL}/auth/employee-register`, // or your exact route
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Send current admin token
//             "Content-Type": "application/json",
//           },
//         },
//       );

//       if (response.data.success) {
//         successAlert("Success", "Staff member created successfully!");

//         // Pass data back to parent
//         onSave({
//           id: response.data.employee?.id || Date.now(),
//           name: response.data.employee?.name,
//           email: response.data.employee?.email,
//           phone: response.data.employee?.phone,
//           designation: response.data.employee?.designation,
//           department: response.data.employee?.department,
//           status: "Active",
//         });

//         onClose();
//       }
//     } catch (err) {
//       console.error(err);

//       if (err.response?.status === 422) {
//         const data = err.response.data;
//         setErrors(data.errors || data.error || {});

//         if (data.message) {
//           errorAlert("Validation Error", data.message);
//         }
//       } else {
//         errorAlert(
//           "Error",
//           err.response?.data?.message || "Failed to create staff member",
//         );
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div
//         className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
//         onClick={loading ? undefined : onClose}
//       />

//       <div className="fixed right-0 top-0 h-full w-full sm:w-[420px] md:w-[460px] bg-[hsl(var(--card-bg))] text-[hsl(var(--text-primary))] z-50 shadow-2xl flex flex-col transition-all duration-300">
//         <div className="px-5 sm:px-6 py-5 border-b border-[hsl(var(--border))] flex justify-between items-start gap-4 shrink-0">
//           <div className="min-w-0">
//             <h3 className="text-xl font-semibold text-[hsl(var(--text-primary))]">
//               Add New Staff Member
//             </h3>
//             <p className="text-sm text-[hsl(var(--text-muted))] mt-0.5">
//               Create a new Staff profile
//             </p>
//           </div>

//           <button
//             onClick={onClose}
//             disabled={loading}
//             className="p-2 rounded-full hover:bg-[hsl(var(--accent)/0.15)] text-[hsl(var(--text-secondary))] transition disabled:opacity-50 shrink-0"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-7 pb-28 sm:pb-8">
//           <div>
//             <label className="block text-sm font-medium text-[hsl(var(--text-muted))] mb-2">
//               Staff Name <span className="text-red-500">*</span>
//             </label>

//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               disabled={loading}
//               className="w-full px-4 py-3.5 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card-bg))] text-[hsl(var(--text-primary))] placeholder-[hsl(var(--text-muted))] focus:ring-2 focus:ring-[hsl(var(--accent)/0.4)] focus:border-[hsl(var(--accent))] outline-none transition disabled:opacity-60 disabled:cursor-not-allowed"
//             />

//             {errors.organization_name && (
//               <p className="mt-1 text-sm text-red-500">
//                 {errors.organization_name[0]}
//               </p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-[hsl(var(--text-muted))] mb-2">
//               Official Email <span className="text-red-500">*</span>
//             </label>

//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               disabled={loading}
//               className="w-full px-4 py-3.5 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card-bg))] text-[hsl(var(--text-primary))] placeholder-[hsl(var(--text-muted))] focus:ring-2 focus:ring-[hsl(var(--accent)/0.4)] focus:border-[hsl(var(--accent))] outline-none transition disabled:opacity-60 disabled:cursor-not-allowed"
//             />

//             {errors.email && (
//               <p className="mt-1 text-sm text-red-500">{errors.email[0]}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-[hsl(var(--text-muted))] mb-2">
//               Contact Phone Number <span className="text-red-500">*</span>
//             </label>

//             <div className="flex w-full">
//               <div className="px-4 flex items-center rounded-l-xl border border-r-0 border-[hsl(var(--border))] bg-[#E8EDF2] text-[hsl(var(--text-muted))] font-medium shrink-0">
//                 +91
//               </div>

//               <input
//                 type="tel"
//                 value={phone}
//                 onChange={(e) =>
//                   setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
//                 }
//                 maxLength={10}
//                 disabled={loading}
//                 className="w-full min-w-0 px-4 py-3.5 rounded-r-xl border border-[hsl(var(--border))] bg-[hsl(var(--card-bg))] text-[hsl(var(--text-primary))] placeholder-[hsl(var(--text-muted))] focus:ring-2 focus:ring-[hsl(var(--accent)/0.4)] focus:border-[hsl(var(--accent))] outline-none transition disabled:opacity-60 disabled:cursor-not-allowed"
//               />
//             </div>

//             {errors.phone && (
//               <p className="mt-1 text-sm text-red-500">{errors.phone[0]}</p>
//             )}

//             <p className="mt-1.5 text-xs text-[hsl(var(--text-muted))] leading-relaxed">
//               Enter your 10-digit mobile number. Country code (+91) is added
//               automatically.
//             </p>
//           </div>
//         </div>

//         <div className="shrink-0 sticky bottom-16 sm:bottom-0 bg-[hsl(var(--card-bg))] px-5 sm:px-6 py-4 sm:py-5 border-t border-[hsl(var(--border))] flex gap-3 sm:gap-4">
//           <button
//             onClick={onClose}
//             disabled={loading}
//             className={`flex-1 py-3 rounded-xl border border-[hsl(var(--border))] text-[hsl(var(--text-secondary))] font-medium transition ${
//               loading
//                 ? "opacity-60 cursor-not-allowed"
//                 : "hover:bg-[hsl(var(--accent)/0.1)]"
//             }`}
//           >
//             Cancel
//           </button>

//           <button
//             onClick={saveStaff}
//             disabled={loading}
//             className={`flex-1 py-3 rounded-xl text-white font-semibold transition shadow-md flex items-center justify-center gap-2 ${
//               loading
//                 ? "bg-[hsl(var(--accent)/0.7)] cursor-not-allowed"
//                 : "bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-dark))] active:bg-[hsl(var(--accent-dark)/0.9)]"
//             }`}
//           >
//             {loading ? (
//               <>
//                 <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 Creating...
//               </>
//             ) : (
//               "Create Staff Member"
//             )}
//           </button>
//         </div>

//         {loading && (
//           <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] flex items-center justify-center pointer-events-none z-10">
//             <div className="bg-[hsl(var(--card-bg))] border border-[hsl(var(--border))] rounded-2xl px-6 py-4 shadow-2xl flex items-center gap-3">
//               <div className="h-5 w-5 border-2 border-[hsl(var(--accent))] border-t-transparent rounded-full animate-spin" />
//               <span className="text-sm font-medium text-[hsl(var(--text-primary))]">
//                 Creating organization...
//               </span>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// src/pages/staff/AddStaff.jsx
import { useState } from "react";
import { X } from "lucide-react";
import axios from "axios"; // ← Add this
import { errorAlert, successAlert } from "../../utils/alert"; // ← Add successAlert

export default function AddStaff({ onClose, onSave }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState(""); // ← Add this
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Get token from your auth context / localStorage / wherever you store it
  const token = localStorage.getItem("token"); // or useContext, etc.

  const saveStaff = async () => {
    if (loading) return;

    setLoading(true);
    setErrors({});

    try {
      const payload = {
        name: name.trim(),
        email: email.trim(),
        // password: password.trim(), // ← Important
        phone: phone.trim(),
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/employee-register`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data.success) {
        successAlert("Success", "Staff member created successfully!");

        onSave({
          id: response.data.employee?.id || Date.now(),
          name: response.data.employee?.name,
          email: response.data.employee?.email,
          phone: response.data.employee?.phone,
          designation: response.data.employee?.designation,
          department: response.data.employee?.department,
          status: "Active",
        });

        onClose();
      }
    } catch (err) {
      console.error("Staff creation error:", err);

      if (err.response?.status === 422) {
        const data = err.response.data;
        setErrors(data.errors || {});

        errorAlert("Validation Error", data.message || "Please check the form");
      } else {
        errorAlert(
          "Error",
          err.response?.data?.message || "Failed to create staff member",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={loading ? undefined : onClose}
      />

      <div className="fixed right-0 top-0 h-full w-full sm:w-[420px] md:w-[460px] bg-[hsl(var(--card-bg))] text-[hsl(var(--text-primary))] z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-5 sm:px-6 py-5 border-b border-[hsl(var(--border))] flex justify-between items-start gap-4 shrink-0">
          <div>
            <h3 className="text-xl font-semibold">Add New Staff Member</h3>
            <p className="text-sm text-[hsl(var(--text-muted))] mt-0.5">
              Create a new Staff profile
            </p>
          </div>

          <button
            onClick={onClose}
            disabled={loading}
            className="p-2 rounded-full hover:bg-[hsl(var(--accent)/0.15)]"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-6 sm:py-8 space-y-6 pb-28 sm:pb-8">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-[hsl(var(--text-muted))] mb-2">
              Staff Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3.5 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card-bg))] focus:ring-2 focus:ring-[hsl(var(--accent)/0.4)] outline-none"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name[0]}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[hsl(var(--text-muted))] mb-2">
              Official Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3.5 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card-bg))] focus:ring-2 focus:ring-[hsl(var(--accent)/0.4)] outline-none"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email[0]}</p>
            )}
          </div>

          {/* Password */}
            
          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-[hsl(var(--text-muted))] mb-2">
              Contact Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="flex w-full">
              <div className="px-4 flex items-center rounded-l-xl border border-r-0 border-[hsl(var(--border))] bg-[#E8EDF2] font-medium shrink-0">
                +91
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                }
                maxLength={10}
                disabled={loading}
                className="w-full px-4 py-3.5 rounded-r-xl border border-[hsl(var(--border))] bg-[hsl(var(--card-bg))] focus:ring-2 focus:ring-[hsl(var(--accent)/0.4)] outline-none"
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone[0]}</p>
            )}
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="shrink-0 sticky bottom-0 bg-[hsl(var(--card-bg))] px-5 sm:px-6 py-4 border-t border-[hsl(var(--border))] flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-3 rounded-xl border border-[hsl(var(--border))] hover:bg-[hsl(var(--accent)/0.1)]"
          >
            Cancel
          </button>

          <button
            onClick={saveStaff}
            disabled={loading}
            className="flex-1 py-3 rounded-xl bg-[hsl(var(--accent))] text-white font-semibold hover:bg-[hsl(var(--accent-dark))]"
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block mr-2" />
                Creating...
              </>
            ) : (
              "Create Staff Member"
            )}
          </button>
        </div>
      </div>
    </>
  );
}
