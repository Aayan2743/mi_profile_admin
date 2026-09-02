// // src/pages/employee/Settings.jsx
// import { useState, useEffect } from "react";
// import EmployeeLayout from "../../components/layout/EmployeeLayout";
// import api from "../../services/api";
// import Swal from "sweetalert2";
// import { Eye, EyeOff } from "lucide-react";

// export default function Settings() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     newPassword: "",
//     confirmPassword: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   // Load current user data
//   const fetchUserData = async () => {
//     try {
//       const res = await api.get("/employee/profile");
//       const user = res.data.data || res.data.user || res.data;

//       setFormData({
//         name: user.name || "",
//         email: user.email || "",
//         newPassword: "",
//         confirmPassword: "",
//       });
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     // Clear error when user types
//     if (errors[e.target.name]) {
//       setErrors({ ...errors, [e.target.name]: null });
//     }
//   };

//   const handleSave = async () => {
//     setSaving(true);
//     setErrors({});

//     try {
//       const payload = {
//         name: formData.name,
//         email: formData.email,
//       };

//       if (formData.newPassword) {
//         payload.new_password = formData.newPassword;
//       }

//       await api.put("/employee/profile", payload);

//       Swal.fire({
//         icon: "success",
//         title: "Profile Updated",
//         text: "Your information has been saved successfully",
//         timer: 2000,
//       });

//       // Clear password fields after success
//       setFormData((prev) => ({
//         ...prev,
//         newPassword: "",
//         confirmPassword: "",
//       }));
//     } catch (err) {
//       const errorResponse = err.response?.data;

//       if (errorResponse?.errors) {
//         setErrors(errorResponse.errors);
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Update Failed",
//           text: errorResponse?.message || "Something went wrong",
//         });
//       }
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) {
//     return (
//       <EmployeeLayout>
//         <div className="text-center py-20">Loading profile...</div>
//       </EmployeeLayout>
//     );
//   }

//   return (
//     <EmployeeLayout>
//       <div className="max-w-3xl mx-auto">
//         <div className="mb-10">
//           <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
//           <p className="text-lg text-gray-600 mt-2">
//             Manage your account and personal information
//           </p>
//         </div>

//         <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
//           <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-10 text-white">
//             <div className="flex items-center gap-5">
//               <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center text-5xl shadow-inner">
//                 👤
//               </div>
//               <div>
//                 <h2 className="text-3xl font-semibold">Profile Settings</h2>
//                 <p className="opacity-90 mt-1">
//                   Keep your information up to date
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="p-10 space-y-8">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="w-full px-5 py-4 text-lg rounded-2xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full px-5 py-4 text-lg rounded-2xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   New Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showNewPassword ? "text" : "password"}
//                     name="newPassword"
//                     value={formData.newPassword}
//                     onChange={handleChange}
//                     placeholder="Leave blank to keep current"
//                     className="w-full px-5 py-4 text-lg rounded-2xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowNewPassword(!showNewPassword)}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
//                   >
//                     {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                   </button>
//                 </div>
//                 {errors.new_password && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.new_password[0]}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Confirm New Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     placeholder="Confirm new password"
//                     className="w-full px-5 py-4 text-lg rounded-2xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
//                   >
//                     {showConfirmPassword ? (
//                       <EyeOff size={20} />
//                     ) : (
//                       <Eye size={20} />
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="px-8 py-6 border-t border-gray-100 bg-gray-50 flex justify-end">
//             <button
//               onClick={handleSave}
//               disabled={saving}
//               className="[#FC6C26]0 hover:bg-orange-600 disabled:bg-orange-400 text-white px-10 py-4 rounded-2xl font-semibold text-lg flex items-center gap-3 transition-all active:scale-95 shadow-lg shadow-orange-500/30"
//             >
//               {saving ? "Saving..." : "💾 Save Profile"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </EmployeeLayout>
//   );
// }

// src/pages/employee/Settings.jsx

import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  LockKeyhole,
  Mail,
  Save,
  Settings2,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import EmployeeLayout from "../../components/layout/EmployeeLayout";
import api from "../../services/api";
import Swal from "sweetalert2";

export default function Settings() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Load current user data
  const fetchUserData = async () => {
    try {
      const res = await api.get("/employee/profile");
      const user = res.data.data || res.data.user || res.data;

      setFormData({
        name: user.name || "",
        email: user.email || "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }

    if (name === "newPassword" && errors.new_password) {
      setErrors((prev) => ({
        ...prev,
        new_password: null,
      }));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setErrors({});

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
      };

      if (formData.newPassword) {
        payload.new_password = formData.newPassword;
      }

      await api.put("/employee/profile", payload);

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your information has been saved successfully",
        timer: 2000,
      });

      // Clear password fields after success
      setFormData((prev) => ({
        ...prev,
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (err) {
      const errorResponse = err.response?.data;

      if (errorResponse?.errors) {
        setErrors(errorResponse.errors);
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: errorResponse?.message || "Something went wrong",
        });
      }
    } finally {
      setSaving(false);
    }
  };

  const displayInitial = formData.name?.trim()?.charAt(0)?.toUpperCase() || "E";

  if (loading) {
    return (
      <EmployeeLayout>
        <div className="flex min-h-[65vh] items-center justify-center">
          <div className="flex flex-col items-center text-center">
            <div className="relative flex h-20 w-20 items-center justify-center rounded-[26px] border border-[#FC6C26] bg-white shadow-[0_18px_45px_rgba(255,100,24,0.15)]">
              <Loader size={34} className="animate-spin text-[#ff6418]" />
            </div>

            <h2 className="mt-5 text-lg font-black text-[#292522]">
              Loading profile
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              Please wait while we prepare your settings.
            </p>
          </div>
        </div>
      </EmployeeLayout>
    );
  }

  return (
    <EmployeeLayout>
      <Loader show={saving} text="Saving Profile..." />
      <div className="mx-auto w-full max-w-[1200px] space-y-6 pb-10">
        {/* Premium Header */}

        {/* Profile Card */}
        <section className="overflow-hidden rounded-[30px] border border-gray-100 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.07)]">
          {/* Profile Banner */}
          <div className="relative overflow-hidden bg-white/10 px-5 py-7 sm:px-8 sm:py-9">
            <div className="pointer-events-none absolute -right-12 -top-16 h-52 w-52 rounded-full bg-white/10" />
            <div className="pointer-events-none absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-black/5" />
            <div className="pointer-events-none absolute right-1/3 top-4 h-28 w-28 rounded-full bg-amber-300/10 blur-2xl" />

            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="relative flex-shrink-0">
                <div className="flex h-20 w-20 items-center justify-center rounded-[26px] border border-white/25 bg-white/20 text-3xl font-black text-gray-500 shadow-[0_16px_35px_rgba(115,38,0,0.2)] backdrop-blur-md sm:h-24 sm:w-24 sm:text-4xl">
                  {displayInitial}
                </div>
              </div>

              <div className="min-w-0 text-black">
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-gray-400 /70">
                  Employee Profile
                </p>

                <h2 className="mt-2 truncate text-2xl font-black sm:text-3xl">
                  {formData.name || "Employee"}
                </h2>

                <p className="mt-1 break-all text-sm font-medium text-gray-400/80">
                  {formData.email || "No email available"}
                </p>

                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold text-gray-400  backdrop-blur-sm">
                  <ShieldCheck size={14} />
                  Employee account
                </div>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-5 sm:p-7 lg:p-9">
            <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.35fr_0.65fr]">
              {/* Main Form */}
              <div className="space-y-7">
                {/* Personal Information */}
                <div>
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff0e8] text-[#ff6418]">
                      <UserRound size={20} />
                    </div>

                    <div>
                      <h3 className="text-lg font-black text-[#292522]">
                        Personal Information
                      </h3>

                      <p className="mt-0.5 text-xs text-gray-400">
                        Update your name and registered email address.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <FormField
                      label="Full Name"
                      icon={UserRound}
                      error={errors.name}
                    >
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className={getInputClass(Boolean(errors.name))}
                      />
                    </FormField>

                    <FormField
                      label="Email Address"
                      icon={Mail}
                      error={errors.email}
                    >
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        className={getInputClass(Boolean(errors.email))}
                      />
                    </FormField>
                  </div>
                </div>

                <div className="h-px bg-gray-100" />

                {/* Password Section */}
                <div>
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff0e8] text-[#ff6418]">
                      <KeyRound size={20} />
                    </div>

                    <div>
                      <h3 className="text-lg font-black text-[#292522]">
                        Change Password
                      </h3>

                      <p className="mt-0.5 text-xs text-gray-400">
                        Leave the password fields blank to keep your current
                        password.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <FormField
                      label="New Password"
                      icon={LockKeyhole}
                      error={errors.new_password}
                    >
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleChange}
                          placeholder="Leave blank to keep current"
                          className={`${getInputClass(
                            Boolean(errors.new_password),
                          )} pr-12`}
                        />

                        <button
                          type="button"
                          onClick={() => setShowNewPassword((prev) => !prev)}
                          className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-gray-400 transition hover:bg-gray-100 hover:text-[#ff6418]"
                          aria-label={
                            showNewPassword
                              ? "Hide new password"
                              : "Show new password"
                          }
                        >
                          {showNewPassword ? (
                            <EyeOff size={19} />
                          ) : (
                            <Eye size={19} />
                          )}
                        </button>
                      </div>
                    </FormField>

                    <FormField
                      label="Confirm New Password"
                      icon={ShieldCheck}
                      error={errors.confirmPassword}
                    >
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm new password"
                          className={`${getInputClass(
                            Boolean(errors.confirmPassword),
                          )} pr-12`}
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword((prev) => !prev)
                          }
                          className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-gray-400 transition hover:bg-gray-100 hover:text-[#ff6418]"
                          aria-label={
                            showConfirmPassword
                              ? "Hide confirm password"
                              : "Show confirm password"
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={19} />
                          ) : (
                            <Eye size={19} />
                          )}
                        </button>
                      </div>
                    </FormField>
                  </div>
                </div>
              </div>

              {/* Security Information */}
              <aside className="space-y-4">
                <div className="rounded-[24px] border border-[#FC6C26] bg-gradient-to-br from-[#fffaf6] to-[#fff2e8] p-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#ff6418] shadow-sm">
                    <ShieldCheck size={23} />
                  </div>

                  <h3 className="mt-5 text-lg font-black text-[#292522]">
                    Account Security
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Keep your account information updated and use a secure
                    password that is difficult to guess.
                  </p>

                  <div className="mt-5 space-y-3">
                    <SecurityItem text="Use a unique password" />
                    <SecurityItem text="Keep your email up to date" />
                    <SecurityItem text="Never share your login details" />
                  </div>
                </div>

                <div className="rounded-[24px] border border-gray-100 bg-[#fcfcfc] p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <AlertCircle size={19} />
                    </div>

                    <div>
                      <h4 className="text-sm font-extrabold text-[#292522]">
                        Password information
                      </h4>

                      <p className="mt-1 text-xs leading-5 text-gray-400">
                        A new password is updated only when the new password
                        field contains a value.
                      </p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>

          {/* Save Footer */}
          <div className="flex flex-col gap-4 border-t border-gray-100 bg-[#fcfaf8] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div>
              <p className="text-sm font-extrabold text-[#292522]">
                Save your account changes
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Changes will be applied to your employee profile.
              </p>
            </div>

            {/* <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#ff6a18] to-[#f4510b] px-7 text-sm font-extrabold text-white shadow-[0_12px_28px_rgba(255,100,24,0.3)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(255,100,24,0.35)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {saving ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Profile
                </>
              )}
            </button> */}
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#ff6a18] to-[#f4510b] px-7 text-sm font-extrabold text-white shadow-[0_12px_28px_rgba(255,100,24,0.3)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(255,100,24,0.35)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              <Save size={18} />
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </section>
      </div>
    </EmployeeLayout>
  );
}

function FormField({ label, icon: Icon, error, children }) {
  const errorMessage = Array.isArray(error) ? error[0] : error;

  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.08em] text-gray-500">
        <Icon size={14} className="text-[#ff6418]" />
        {label}
      </label>

      {children}

      {errorMessage && (
        <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-red-500">
          <AlertCircle size={13} />
          {errorMessage}
        </p>
      )}
    </div>
  );
}

function SecurityItem({ text }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-white bg-white/80 px-3 py-2.5 shadow-sm">
      <CheckCircle2 size={15} className="flex-shrink-0 text-emerald-500" />

      <span className="text-xs font-semibold text-gray-600">{text}</span>
    </div>
  );
}

function getInputClass(hasError) {
  return `h-13 w-full rounded-2xl border bg-[#fcfcfc] px-4 py-3.5 text-sm font-semibold text-gray-700 outline-none transition placeholder:font-normal placeholder:text-gray-400 focus:bg-white focus:ring-4 ${
    hasError
      ? "border-red-300 focus:border-red-400 focus:ring-red-100"
      : "border-gray-200 focus:border-[#ff6418] focus:ring-[#FC6C26]"
  }`;
}
