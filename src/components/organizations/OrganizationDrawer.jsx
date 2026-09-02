// src/components/organizations/OrganizationDrawer.jsx
import { X } from "lucide-react";
import { useState } from "react";
import api from "../../services/api";
// import api from "../../api";   // ← Import your api.js
import Swal from "sweetalert2";

export default function OrganizationDrawer({
  isOpen,
  onClose,
  organization = null,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);
  const isEditing = !!organization;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      organization_name: e.target.organization_name.value.trim(),
      email: e.target.email.value.trim(),
      phone: e.target.phone.value.trim(),
    };

    try {
      console.log("Sending token:", localStorage.getItem("token"));
      // const response = await api.post("/employee/add-organization", formData);

      let response;

      if (isEditing) {
        response = await api.put(
          `/employee/update-organization/${organization.id}`,
          formData,
        );
      } else {
        response = await api.post("/employee/add-organization", formData);
      }

      // Swal.fire({
      //   icon: "success",
      //   title: "Success!",
      //   text: response.data.message || "Organization created successfully!",
      //   confirmButtonColor: "#3b82f6",
      //   timer: 2000,
      // });

      Swal.fire({
        icon: "success",
        title: "Success!",
        text:
          response.data.message ||
          (isEditing
            ? "Organization updated successfully!"
            : "Organization created successfully!"),
        confirmButtonColor: "#3b82f6",
        timer: 2000,
      });

      onSuccess?.(); // Refresh the organizations list
      onClose();
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to create organization. Please try again.";

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMsg,
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-[hsl(var(--card-bg))] shadow-2xl z-[60] flex flex-col transform transition-transform duration-300">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[hsl(var(--border))] flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-[hsl(var(--text-primary))]">
              {isEditing ? "Edit Organization" : "Add New Organization"}
            </h2>
            <p className="text-sm text-[hsl(var(--text-muted))]">
              {isEditing
                ? "Update organization details"
                : "Create a new organization profile"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[hsl(var(--card-bg-hover))] rounded-xl transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-auto p-6 space-y-6"
        >
          <div>
            <label className="block text-sm font-medium mb-2">
              Organization Name <span className="text-red-500">*</span>
            </label>
            <input
              name="organization_name"
              type="text"
              defaultValue={organization?.name}
              required
              className="w-full px-4 py-3 rounded-2xl border border-[hsl(var(--border))] focus:outline-none focus:border-[hsl(var(--accent))]"
              placeholder="Enter organization name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Official Email <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              type="email"
              defaultValue={organization?.email}
              required
              className="w-full px-4 py-3 rounded-2xl border border-[hsl(var(--border))] focus:outline-none focus:border-[hsl(var(--accent))]"
              placeholder="hello@company.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Contact Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="flex">
              <div className="bg-[hsl(var(--card-bg-hover))] px-4 py-3 rounded-l-2xl border border-r-0 border-[hsl(var(--border))] text-sm font-medium">
                +91
              </div>
              <input
                name="phone"
                type="tel"
                defaultValue={organization?.phone?.replace("+91", "")}
                required
                className="flex-1 px-4 py-3 rounded-r-2xl border border-[hsl(var(--border))] focus:outline-none focus:border-[hsl(var(--accent))]"
                placeholder="9876543210"
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="pt-6 border-t border-[hsl(var(--border))] flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3.5 text-sm font-medium bo-rder border-[hsl(var(--border))] rounded-2xl hover:bg-[hsl(var(--card-bg-hover))]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3.5 text-sm font-medium bg-[hsl(var(--accent))] text-white rounded-2xl hover:bg-[hsl(var(--accent))]/90 disabled:opacity-70 transition"
            >
              {loading
                ? isEditing
                  ? "Updating..."
                  : "Creating..."
                : isEditing
                  ? "Update Organization"
                  : "Create Organization"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
