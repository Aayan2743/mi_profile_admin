// import { useState, useEffect } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { successAlert, errorAlert } from "../../utils/alert";
// import { User, Mail, Lock, Save } from "lucide-react";

// export default function AffiliateProfile() {
//   const { user, login } = useAuth(); // login used to update local user data

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });
//   const [loading, setLoading] = useState(false);

//   // Prefill form with current user data
//   useEffect(() => {
//     if (user) {
//       setForm((prev) => ({
//         ...prev,
//         name: user.name || "",
//         email: user.email || "",
//         phone: user.phone || "",
//       }));
//     }
//   }, [user]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.name.trim()) {
//       return errorAlert("Required", "Name is required");
//     }
//     if (!form.email.trim()) {
//       return errorAlert("Required", "Email is required");
//     }

//     // Password validation (only if user wants to change it)
//     if (form.newPassword) {
//       if (!form.currentPassword) {
//         return errorAlert("Required", "Please enter current password");
//       }
//       if (form.newPassword.length < 6) {
//         return errorAlert("Invalid", "New password must be at least 6 characters");
//       }
//       if (form.newPassword !== form.confirmPassword) {
//         return errorAlert("Invalid", "New password and confirm password do not match");
//       }
//     }

//     setLoading(true);

//     try {
//       // ========== STATIC UPDATE (for now) ==========
//       // Later replace with real API call
//       await new Promise((r) => setTimeout(r, 800));

//       const updatedUser = {
//         ...user,
//         name: form.name.trim(),
//         email: form.email.trim(),
//         phone: form.phone.replace(/\D/g, "").slice(0, 10),
//       };

//       // Update local auth state
//       login(updatedUser, localStorage.getItem("token") || "fake-token", "affiliate");

//       successAlert("Success", "Profile updated successfully");

//       // Clear password fields
//       setForm((prev) => ({
//         ...prev,
//         currentPassword: "",
//         newPassword: "",
//         confirmPassword: "",
//       }));
//     } catch (error) {
//       errorAlert("Error", "Failed to update profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 lg:p-8 max-w-2xl mx-auto">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Profile</h1>
//         <p className="text-gray-500 mt-1">Update your personal information</p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Basic Info Card */}
//         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
//           <h2 className="font-semibold text-gray-900 flex items-center gap-2">
//             <User size={18} className="text-[#FC6C26]" />
//             Basic Information
//           </h2>

//           {/* Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1.5">
//               Full Name <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={form.name}
//               onChange={handleChange}
//               required
//               className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#FC6C26] focus:ring-2 focus:ring-orange-100"
//               placeholder="Enter your full name"
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1.5">
//               Email Address <span className="text-red-500">*</span>
//             </label>
//             <div className="relative">
//               <Mail
//                 size={18}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//               />
//               <input
//                 type="email"
//                 name="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 required
//                 className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#FC6C26] focus:ring-2 focus:ring-orange-100"
//                 placeholder="email@example.com"
//               />
//             </div>
//           </div>

//           {/* Phone */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1.5">
//               Phone Number
//             </label>
//             <input
//               type="tel"
//               name="phone"
//               value={form.phone}
//               onChange={(e) =>
//                 setForm((prev) => ({
//                   ...prev,
//                   phone: e.target.value.replace(/\D/g, "").slice(0, 10),
//                 }))
//               }
//               maxLength={10}
//               className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#FC6C26] focus:ring-2 focus:ring-orange-100"
//               placeholder="10-digit phone number"
//             />
//           </div>
//         </div>

//         {/* Change Password Card */}
//         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
//           <h2 className="font-semibold text-gray-900 flex items-center gap-2">
//             <Lock size={18} className="text-[#FC6C26]" />
//             Change Password
//           </h2>
//           <p className="text-sm text-gray-500 -mt-2">
//             Leave blank if you don’t want to change password
//           </p>

//           {/* Current Password */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1.5">
//               Current Password
//             </label>
//             <input
//               type="password"
//               name="currentPassword"
//               value={form.currentPassword}
//               onChange={handleChange}
//               className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#FC6C26] focus:ring-2 focus:ring-orange-100"
//               placeholder="Enter current password"
//             />
//           </div>

//           {/* New Password */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1.5">
//               New Password
//             </label>
//             <input
//               type="password"
//               name="newPassword"
//               value={form.newPassword}
//               onChange={handleChange}
//               className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#FC6C26] focus:ring-2 focus:ring-orange-100"
//               placeholder="Enter new password (min 6 characters)"
//             />
//           </div>

//           {/* Confirm Password */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1.5">
//               Confirm New Password
//             </label>
//             <input
//               type="password"
//               name="confirmPassword"
//               value={form.confirmPassword}
//               onChange={handleChange}
//               className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#FC6C26] focus:ring-2 focus:ring-orange-100"
//               placeholder="Confirm new password"
//             />
//           </div>
//         </div>

//         {/* Save Button */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#FC6C26] text-white font-semibold rounded-xl hover:bg-orange-600 transition disabled:opacity-60"
//         >
//           {loading ? (
//             <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//           ) : (
//             <Save size={18} />
//           )}
//           {loading ? "Saving..." : "Save Changes"}
//         </button>
//       </form>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { useAuth } from "../../context/AuthContext";
// import {
//   successAlert,
//   errorAlert,
// } from "../../utils/alert";

// import {
//   User,
//   Mail,
//   Lock,
//   Save,
//   Phone,
// } from "lucide-react";

// export default function AffiliateProfile() {
//   const { user, login } = useAuth();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const [loading, setLoading] = useState(false);


//   /* =========================================================
//      LOAD USER DATA
//   ========================================================== */

//   useEffect(() => {
//     if (user) {
//       setForm((prev) => ({
//         ...prev,
//         name: user.name || "",
//         email: user.email || "",
//         phone: user.phone || "",
//       }));
//     }
//   }, [user]);


//   /* =========================================================
//      HANDLE INPUT CHANGE
//   ========================================================== */

//   const handleChange = (e) => {
//     const {
//       name,
//       value,
//     } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };


//   /* =========================================================
//      SAVE PROFILE
//   ========================================================== */

//   const handleSubmit = async (e) => {
//     e.preventDefault();


//     /* -------------------------
//        BASIC VALIDATION
//     -------------------------- */

//     if (!form.name.trim()) {
//       return errorAlert(
//         "Required",
//         "Name is required"
//       );
//     }

//     if (!form.email.trim()) {
//       return errorAlert(
//         "Required",
//         "Email is required"
//       );
//     }


//     /* -------------------------
//        PASSWORD VALIDATION
//     -------------------------- */

//     if (form.newPassword) {

//       if (!form.currentPassword) {
//         return errorAlert(
//           "Required",
//           "Please enter current password"
//         );
//       }

//       if (form.newPassword.length < 6) {
//         return errorAlert(
//           "Invalid",
//           "New password must be at least 6 characters"
//         );
//       }

//       if (
//         form.newPassword !==
//         form.confirmPassword
//       ) {
//         return errorAlert(
//           "Invalid",
//           "New password and confirm password do not match"
//         );
//       }
//     }


//     setLoading(true);


//     try {

//       /* =====================================================
//          STATIC SAVE
//          Replace with API later
//       ====================================================== */

//       await new Promise((resolve) =>
//         setTimeout(resolve, 800)
//       );


//       const updatedUser = {
//         ...user,

//         name: form.name.trim(),

//         email: form.email.trim(),

//         phone: form.phone
//           .replace(/\D/g, "")
//           .slice(0, 10),
//       };


//       /* =====================================================
//          UPDATE AUTH CONTEXT
//       ====================================================== */

//       login(
//         updatedUser,
//         localStorage.getItem("token") ||
//           "fake-token",
//         "affiliate"
//       );


//       successAlert(
//         "Success",
//         "Profile updated successfully"
//       );


//       /* =====================================================
//          CLEAR PASSWORD FIELDS
//       ====================================================== */

//       setForm((prev) => ({
//         ...prev,
//         currentPassword: "",
//         newPassword: "",
//         confirmPassword: "",
//       }));

//     } catch (error) {

//       errorAlert(
//         "Error",
//         "Failed to update profile"
//       );

//     } finally {

//       setLoading(false);

//     }
//   };


//   return (
//     <div className="w-full">

//       {/* =====================================================
//           PROFILE CARD
//       ====================================================== */}

//       <form onSubmit={handleSubmit}>

//         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">


//           {/* =================================================
//               CARD HEADER
//           ================================================== */}

//           <div className="mb-8">

//             <h2 className="text-xl lg:text-2xl font-bold text-gray-900 flex items-center gap-2">

//               <User
//                 size={22}
//                 className="text-[#FC6C26]"
//               />

//               Profile Settings

//             </h2>

//             <p className="text-gray-500 mt-1">
//               Update your personal information
//             </p>

//           </div>


//           {/* =================================================
//               BASIC INFORMATION
//           ================================================== */}

//           <div className="mb-8">

//             <h3 className="text-base font-semibold text-gray-900 mb-5">
//               Basic Information
//             </h3>


//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


//               {/* ---------------------------------------------
//                   FULL NAME
//               ---------------------------------------------- */}

//               <div>

//                 <label className="block text-sm font-medium text-gray-700 mb-2">

//                   Full Name

//                   <span className="text-red-500 ml-1">
//                     *
//                   </span>

//                 </label>

//                 <div className="relative">

//                   <User
//                     size={18}
//                     className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//                   />

//                   <input
//                     type="text"
//                     name="name"
//                     value={form.name}
//                     onChange={handleChange}
//                     required
//                     className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 outline-none focus:border-[#FC6C26] focus:ring-2 focus:ring-orange-100"
//                     placeholder="Enter your full name"
//                   />

//                 </div>

//               </div>


//               {/* ---------------------------------------------
//                   EMAIL
//               ---------------------------------------------- */}

//               <div>

//                 <label className="block text-sm font-medium text-gray-700 mb-2">

//                   Email Address

//                   <span className="text-red-500 ml-1">
//                     *
//                   </span>

//                 </label>

//                 <div className="relative">

//                   <Mail
//                     size={18}
//                     className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//                   />

//                   <input
//                     type="email"
//                     name="email"
//                     value={form.email}
//                     onChange={handleChange}
//                     required
//                     className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 outline-none focus:border-[#FC6C26] focus:ring-2 focus:ring-orange-100"
//                     placeholder="email@example.com"
//                   />

//                 </div>

//               </div>


//               {/* ---------------------------------------------
//                   PHONE
//               ---------------------------------------------- */}

//               <div>

//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Phone Number
//                 </label>

//                 <div className="relative">

//                   <Phone
//                     size={18}
//                     className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//                   />

//                   <input
//                     type="tel"
//                     name="phone"
//                     value={form.phone}
//                     onChange={(e) =>
//                       setForm((prev) => ({
//                         ...prev,
//                         phone: e.target.value
//                           .replace(/\D/g, "")
//                           .slice(0, 10),
//                       }))
//                     }
//                     maxLength={10}
//                     className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 outline-none focus:border-[#FC6C26] focus:ring-2 focus:ring-orange-100"
//                     placeholder="10-digit phone number"
//                   />

//                 </div>

//               </div>

//             </div>

//           </div>


//           {/* =================================================
//               CHANGE PASSWORD
//           ================================================== */}

//           <div className="border-t border-gray-100 pt-8">

//             <div className="mb-5">

//               <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">

//                 <Lock
//                   size={19}
//                   className="text-[#FC6C26]"
//                 />

//                 Change Password

//               </h3>

//               <p className="text-sm text-gray-500 mt-1">
//                 Leave blank if you don't want to change password
//               </p>

//             </div>


//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


//               {/* ---------------------------------------------
//                   CURRENT PASSWORD
//               ---------------------------------------------- */}

//               <div>

//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Current Password
//                 </label>

//                 <input
//                   type="password"
//                   name="currentPassword"
//                   value={form.currentPassword}
//                   onChange={handleChange}
//                   className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-[#FC6C26] focus:ring-2 focus:ring-orange-100"
//                   placeholder="Enter current password"
//                 />

//               </div>


//               {/* ---------------------------------------------
//                   NEW PASSWORD
//               ---------------------------------------------- */}

//               <div>

//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   New Password
//                 </label>

//                 <input
//                   type="password"
//                   name="newPassword"
//                   value={form.newPassword}
//                   onChange={handleChange}
//                   className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-[#FC6C26] focus:ring-2 focus:ring-orange-100"
//                   placeholder="Enter new password"
//                 />

//               </div>


//               {/* ---------------------------------------------
//                   CONFIRM PASSWORD
//               ---------------------------------------------- */}

//               <div>

//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Confirm New Password
//                 </label>

//                 <input
//                   type="password"
//                   name="confirmPassword"
//                   value={form.confirmPassword}
//                   onChange={handleChange}
//                   className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-[#FC6C26] focus:ring-2 focus:ring-orange-100"
//                   placeholder="Confirm new password"
//                 />

//               </div>

//             </div>

//           </div>


//           {/* =================================================
//               SAVE BUTTON
//           ================================================== */}

//           <div className="flex justify-end mt-8 pt-6 border-t border-gray-100">

//             <button
//               type="submit"
//               disabled={loading}
//               className="flex items-center justify-center gap-2 px-8 py-3.5 bg-[#FC6C26] text-white font-semibold rounded-xl hover:bg-orange-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
//             >

//               {loading ? (

//                 <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />

//               ) : (

//                 <Save size={18} />

//               )}

//               {loading
//                 ? "Saving..."
//                 : "Save Profile"}

//             </button>

//           </div>

//         </div>

//       </form>

//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { errorAlert } from "../../utils/alert";

import {
  User,
  Mail,
  Lock,
  Save,
  Phone,
} from "lucide-react";

import Loader from "../../components/Loader";

export default function AffiliateProfile() {
  const { user, login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  /* =========================================================
     LOAD USER DATA
  ========================================================== */

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      }));
    }
  }, [user]);

  /* =========================================================
     HANDLE INPUT CHANGE
  ========================================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================================
     SAVE PROFILE
  ========================================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    /* -------------------------
       BASIC VALIDATION
    -------------------------- */

    if (!form.name.trim()) {
      return errorAlert(
        "Required",
        "Name is required"
      );
    }

    if (!form.email.trim()) {
      return errorAlert(
        "Required",
        "Email is required"
      );
    }

    /* -------------------------
       PASSWORD VALIDATION
    -------------------------- */

    if (form.newPassword) {
      if (!form.currentPassword) {
        return errorAlert(
          "Required",
          "Please enter current password"
        );
      }

      if (form.newPassword.length < 6) {
        return errorAlert(
          "Invalid",
          "New password must be at least 6 characters"
        );
      }

      if (
        form.newPassword !==
        form.confirmPassword
      ) {
        return errorAlert(
          "Invalid",
          "New password and confirm password do not match"
        );
      }
    }

    /* =====================================================
       SHOW FULL SCREEN LOADER
    ====================================================== */

    setLoading(true);

    try {
      /* =====================================================
         STATIC SAVE
         Replace this with API later
      ====================================================== */

      await new Promise((resolve) =>
        setTimeout(resolve, 3000)
      );

      const updatedUser = {
        ...user,

        name: form.name.trim(),

        email: form.email.trim(),

        phone: form.phone
          .replace(/\D/g, "")
          .slice(0, 10),
      };

      /* =====================================================
         UPDATE AUTH CONTEXT
      ====================================================== */

      login(
        updatedUser,
        localStorage.getItem("token") ||
          "fake-token",
        "affiliate"
      );

      /* =====================================================
         CLEAR PASSWORD FIELDS
      ====================================================== */

      setForm((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));

      /*
        IMPORTANT:
        No successAlert here.
        Loader will stop after save is completed.
      */

    } catch (error) {
      errorAlert(
        "Error",
        "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">

      {/* =====================================================
          FULL SCREEN LOADER
      ====================================================== */}

      <Loader
        show={loading}
        text="Saving Profile..."
      />

      {/* =====================================================
          PROFILE FORM
      ====================================================== */}

      <form onSubmit={handleSubmit}>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">

          {/* =================================================
              CARD HEADER
          ================================================== */}

          <div className="mb-8">

            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 flex items-center gap-2">

              <User
                size={22}
                className="text-[#FC6C26]"
              />

              Profile Settings

            </h2>

            <p className="text-gray-500 mt-1">
              Update your personal information
            </p>

          </div>

          {/* =================================================
              BASIC INFORMATION
          ================================================== */}

          <div className="mb-8">

            <h3 className="text-base font-semibold text-gray-900 mb-5">
              Basic Information
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* FULL NAME */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                  <span className="text-red-500 ml-1">
                    *
                  </span>
                </label>

                <div className="relative">

                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 outline-none focus:border-[#FC6C26] focus:ring-2 focus:ring-orange-100"
                    placeholder="Enter your full name"
                  />

                </div>

              </div>

              {/* EMAIL */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                  <span className="text-red-500 ml-1">
                    *
                  </span>
                </label>

                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 outline-none focus:border-[#FC6C26] focus:ring-2 focus:ring-orange-100"
                    placeholder="email@example.com"
                  />

                </div>

              </div>

              {/* PHONE */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>

                <div className="relative">

                  <Phone
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        phone: e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 10),
                      }))
                    }
                    maxLength={10}
                    className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 outline-none focus:border-[#FC6C26] focus:ring-2 focus:ring-orange-100"
                    placeholder="10-digit phone number"
                  />

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              CHANGE PASSWORD
          ================================================== */}

          <div className="border-t border-gray-100 pt-8">

            <div className="mb-5">

              <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">

                <Lock
                  size={19}
                  className="text-[#FC6C26]"
                />

                Change Password

              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Leave blank if you don't want to change password
              </p>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* CURRENT PASSWORD */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>

                <input
                  type="password"
                  name="currentPassword"
                  value={form.currentPassword}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-[#FC6C26] focus:ring-2 focus:ring-orange-100"
                  placeholder="Enter current password"
                />

              </div>

              {/* NEW PASSWORD */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>

                <input
                  type="password"
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-[#FC6C26] focus:ring-2 focus:ring-orange-100"
                  placeholder="Enter new password"
                />

              </div>

              {/* CONFIRM PASSWORD */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-[#FC6C26] focus:ring-2 focus:ring-orange-100"
                  placeholder="Confirm new password"
                />

              </div>

            </div>

          </div>

          {/* =================================================
              SAVE BUTTON
          ================================================== */}

          <div className="flex justify-end mt-8 pt-6 border-t border-gray-100">

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 px-8 py-3.5 bg-[#FC6C26] text-white font-semibold rounded-xl hover:bg-orange-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >

              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Profile
                </>
              )}

            </button>

          </div>

        </div>

      </form>

    </div>
  );
}