// src/pages/organizations/EditStaff.jsx
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { errorAlert, successAlert } from "../../utils/alert";
import api from "../../services/api";

export default function EditStaff({ staff, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    department: "",
    is_active: true,
    password: "", // ← New field
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (staff) {
      setFormData({
        name: staff.name || "",
        email: staff.email || "",
        phone: staff.phone || "",
        designation: staff.designation || "",
        department: staff.department || "",
        is_active: staff.is_active ?? true,
        password: "", // Password is always empty on edit
      });
    }
  }, [staff]);

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    setErrors({});

    try {
      const response = await api.post(
        `/orginazation-dashboard/staff/${staff.id}`,
        formData,
      );

      successAlert("Success", "Staff updated successfully!");
      onSave(response.data.employee || response.data);
      onClose();
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors || {});
        errorAlert(
          "Validation Error",
          err.response.data.message || "Please check the fields",
        );
      } else {
        errorAlert(
          "Error",
          err.response?.data?.message || "Failed to update staff",
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
        onClick={onClose}
      />

      <div className="fixed right-0 top-0 h-full w-full sm:w-[460px] bg-[hsl(var(--card-bg))] z-50 shadow-2xl flex flex-col">
        <div className="px-6 py-5 border-b flex justify-between items-center">
          <h3 className="text-xl font-semibold">Edit Staff Member</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-[hsl(var(--border))] focus:ring-2 focus:ring-[hsl(var(--accent))]"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-[hsl(var(--border))] focus:ring-2 focus:ring-[hsl(var(--accent))]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                })
              }
              maxLength={10}
              className="w-full px-4 py-3 rounded-xl border border-[hsl(var(--border))] focus:ring-2 focus:ring-[hsl(var(--accent))]"
            />
          </div>

          {/* Password - Optional */}
          <div>
            <label className="block text-sm font-medium mb-2">
              New Password{" "}
              <span className="text-xs text-gray-500">
                (Leave blank to keep current)
              </span>
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Enter new password (min 6 characters)"
              className="w-full px-4 py-3 rounded-xl border border-[hsl(var(--border))] focus:ring-2 focus:ring-[hsl(var(--accent))]"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>
            )}
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Designation
            </label>
            <input
              type="text"
              value={formData.designation}
              onChange={(e) =>
                setFormData({ ...formData, designation: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-[hsl(var(--border))] focus:ring-2 focus:ring-[hsl(var(--accent))]"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium mb-2">Department</label>
            <input
              type="text"
              value={formData.department}
              onChange={(e) =>
                setFormData({ ...formData, department: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-[hsl(var(--border))] focus:ring-2 focus:ring-[hsl(var(--accent))]"
            />
          </div>

          {/* Active Status */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.is_active}
              onChange={(e) =>
                setFormData({ ...formData, is_active: e.target.checked })
              }
            />
            <label className="font-medium">Active Account</label>
          </div>
        </div>

        <div className="p-6 border-t flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-[hsl(var(--border))] rounded-xl hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 py-3 bg-[hsl(var(--accent))] text-white rounded-xl disabled:opacity-70 font-medium"
          >
            {loading ? "Updating..." : "Update Staff"}
          </button>
        </div>
      </div>
    </>
  );
}
