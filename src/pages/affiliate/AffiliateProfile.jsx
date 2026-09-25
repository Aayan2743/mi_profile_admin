
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { errorAlert } from "../../utils/alert";

import api from "../../services/api";
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

  /* -------------------------
     LOADER
  -------------------------- */

  setLoading(true);

  try {
    /* -------------------------
       UPDATE PROFILE API
    -------------------------- */

    const response = await api.put(
      "/affiliate/profile",
      {
        name: form.name.trim(),

        // Password fields
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword,

        // DO NOT SEND:
        // email
        // phone
      }
    );

    /* -------------------------
       API RESPONSE
    -------------------------- */

    if (!response.data?.status) {
      return errorAlert(
        "Error",
        response.data?.message ||
          "Failed to update profile"
      );
    }

    const updatedProfile =
      response.data?.data;

    /* -------------------------
       UPDATE AUTH CONTEXT
    -------------------------- */

    const updatedUser = {
      ...user,

      name:
        updatedProfile?.name ||
        form.name.trim(),

      // Keep email unchanged
      email:
        updatedProfile?.email ||
        user?.email,

      // Keep phone unchanged
      phone:
        updatedProfile?.phone ||
        user?.phone,
    };

    login(
      updatedUser,
      localStorage.getItem("token"),
      "affiliate"
    );

    /* -------------------------
       CLEAR PASSWORD FIELDS
    -------------------------- */

    setForm((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));

  } 
  
   catch (error) {
  console.error("PROFILE UPDATE ERROR:", error);
  console.error("STATUS:", error.response?.status);
  console.error("DATA:", error.response?.data);

  errorAlert(
    "Error",
    error.response?.data?.message ||
      error.response?.data?.errors
        ? JSON.stringify(
            error.response?.data?.errors ||
            error.response?.data?.message
          )
        : "Failed to update profile"
  );
}
  
  finally {
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
                    readOnly
                    className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 bg-gray-50 text-gray-500 cursor-not-allowed outline-none"
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
                    readOnly
                    className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 bg-gray-50 text-gray-500 cursor-not-allowed outline-none"
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

            <p className="text-xs text-gray-400 mb-5">
              Email address and phone number cannot be changed from this page.
            </p>

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