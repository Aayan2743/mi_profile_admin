// // src/pages/organizations/AddOrganization.jsx
// import { useState } from "react";
// import { X } from "lucide-react";
// import { errorAlert } from "../../utils/alert";
// import Loader from "../../components/Loader";
// export default function AddOrganization({ onClose, onSave }) {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [errors, setErrors] = useState({});

//   const saveOrg = async () => {
//     if (loading) return;

//     setLoading(true);
//     setErrors({});

//     try {
//       await Promise.all([
//         onSave({
//           id: Date.now(),
//           name: name.trim(),
//           email: email.trim(),
//           phone: phone.trim(),
//           cards: 0,
//           status: "Active",
//         }),
//         new Promise((resolve) => setTimeout(resolve, 2000)),
//       ]);

//       onClose();
//     } catch (err) {
//       if (err.response?.status === 422) {
//         const data = err.response.data;

//         const validationErrors = data.error || data.errors || {};
//         setErrors(validationErrors);

//         if (data.message) {
//           errorAlert("Error", data.message);
//         }

//         return;
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//        <Loader show={loading} text="Creating Organization..." />

//       <div
//         className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
//         onClick={loading ? undefined : onClose}
//       />

//       <div className="fixed right-0 top-0 h-full w-full sm:w-[420px] md:w-[460px] bg-[hsl(var(--card-bg))] text-[hsl(var(--text-primary))] z-50 shadow-2xl flex flex-col transition-all duration-300">
//         <div className="px-5 sm:px-6 py-5 border-b border-[hsl(var(--border))] flex justify-between items-start gap-4 shrink-0">
//           <div className="min-w-0">
//             <h3 className="text-xl font-semibold text-[hsl(var(--text-primary))]">
//               Add New Organization
//             </h3>
//             <p className="text-sm text-[hsl(var(--text-muted))] mt-0.5">
//               Create a new organization profile
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
//               Organization Name <span className="text-red-500">*</span>
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
//             onClick={saveOrg}
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
//               "Create Organization"
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

// src/pages/organizations/AddOrganization.jsx

import { useState } from "react";
import { X } from "lucide-react";
import { errorAlert } from "../../utils/alert";
import Loader from "../../components/Loader";

export default function AddOrganization({ onClose, onSave }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const saveOrg = async () => {
    if (loading) return;

    setLoading(true);
    setErrors({});

    try {
      await Promise.all([
        onSave({
          id: Date.now(),
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          cards: 0,
          status: "Active",
        }),

        // Keep the loader visible for at least 2 seconds
        new Promise((resolve) => setTimeout(resolve, 2000)),
      ]);

      // No success alert
      onClose();
    } catch (err) {
      const responseData = err.response?.data;

      if (err.response?.status === 422) {
        const validationErrors =
          responseData?.error || responseData?.errors || {};

        setErrors(validationErrors);

        if (responseData?.message) {
          errorAlert("Error", responseData.message);
        }

        return;
      }

      errorAlert(
        "Error",
        responseData?.message ||
          err.message ||
          "Unable to create organization. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Full-screen loader */}
      <Loader show={loading} text="Creating Organization..." />

      {/* Drawer background */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={loading ? undefined : onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 z-50 flex h-full w-full flex-col bg-[hsl(var(--card-bg))] text-[hsl(var(--text-primary))] shadow-2xl transition-all duration-300 sm:w-[420px] md:w-[460px]">
        {/* Header */}
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-[hsl(var(--border))] px-5 py-5 sm:px-6">
          <div className="min-w-0">
            <h3 className="text-xl font-semibold text-[hsl(var(--text-primary))]">
              Add New Organization
            </h3>

            <p className="mt-0.5 text-sm text-[hsl(var(--text-muted))]">
              Create a new organization profile
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="shrink-0 rounded-full p-2 text-[hsl(var(--text-secondary))] transition hover:bg-[hsl(var(--accent)/0.15)] disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form fields */}
        <div className="flex-1 space-y-6 overflow-y-auto px-5 py-6 pb-28 sm:space-y-7 sm:px-6 sm:py-8 sm:pb-8">
          {/* Organization name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[hsl(var(--text-muted))]">
              Organization Name <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);

                if (errors.organization_name) {
                  setErrors((prev) => ({
                    ...prev,
                    organization_name: null,
                  }));
                }
              }}
              disabled={loading}
              placeholder="Enter organization name"
              className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card-bg))] px-4 py-3.5 text-[hsl(var(--text-primary))] outline-none transition placeholder:text-[hsl(var(--text-muted))] focus:border-[hsl(var(--accent))] focus:ring-2 focus:ring-[hsl(var(--accent)/0.4)] disabled:cursor-not-allowed disabled:opacity-60"
            />

            {errors.organization_name && (
              <p className="mt-1 text-sm text-red-500">
                {Array.isArray(errors.organization_name)
                  ? errors.organization_name[0]
                  : errors.organization_name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[hsl(var(--text-muted))]">
              Official Email <span className="text-red-500">*</span>
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);

                if (errors.email) {
                  setErrors((prev) => ({
                    ...prev,
                    email: null,
                  }));
                }
              }}
              disabled={loading}
              placeholder="Enter official email address"
              className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card-bg))] px-4 py-3.5 text-[hsl(var(--text-primary))] outline-none transition placeholder:text-[hsl(var(--text-muted))] focus:border-[hsl(var(--accent))] focus:ring-2 focus:ring-[hsl(var(--accent)/0.4)] disabled:cursor-not-allowed disabled:opacity-60"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {Array.isArray(errors.email)
                  ? errors.email[0]
                  : errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[hsl(var(--text-muted))]">
              Contact Phone Number <span className="text-red-500">*</span>
            </label>

            <div className="flex w-full">
              <div className="flex shrink-0 items-center rounded-l-xl border border-r-0 border-[hsl(var(--border))] bg-[#E8EDF2] px-4 font-medium text-[hsl(var(--text-muted))]">
                +91
              </div>

              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 10);

                  setPhone(value);

                  if (errors.phone) {
                    setErrors((prev) => ({
                      ...prev,
                      phone: null,
                    }));
                  }
                }}
                maxLength={10}
                disabled={loading}
                placeholder="Enter 10-digit phone number"
                className="w-full min-w-0 rounded-r-xl border border-[hsl(var(--border))] bg-[hsl(var(--card-bg))] px-4 py-3.5 text-[hsl(var(--text-primary))] outline-none transition placeholder:text-[hsl(var(--text-muted))] focus:border-[hsl(var(--accent))] focus:ring-2 focus:ring-[hsl(var(--accent)/0.4)] disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">
                {Array.isArray(errors.phone)
                  ? errors.phone[0]
                  : errors.phone}
              </p>
            )}

            <p className="mt-1.5 text-xs leading-relaxed text-[hsl(var(--text-muted))]">
              Enter your 10-digit mobile number. Country code (+91) is added
              automatically.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-16 flex shrink-0 gap-3 border-t border-[hsl(var(--border))] bg-[hsl(var(--card-bg))] px-5 py-4 sm:bottom-0 sm:gap-4 sm:px-6 sm:py-5">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className={`flex-1 rounded-xl border border-[hsl(var(--border))] py-3 font-medium text-[hsl(var(--text-secondary))] transition ${
              loading
                ? "cursor-not-allowed opacity-60"
                : "hover:bg-[hsl(var(--accent)/0.1)]"
            }`}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={saveOrg}
            disabled={loading}
            className={`flex flex-1 items-center justify-center rounded-xl py-3 font-semibold text-white shadow-md transition ${
              loading
                ? "cursor-not-allowed bg-[hsl(var(--accent)/0.7)]"
                : "bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-dark))] active:bg-[hsl(var(--accent-dark)/0.9)]"
            }`}
          >
            {loading ? "Creating..." : "Create Organization"}
          </button>
        </div>
      </div>
    </>
  );
}