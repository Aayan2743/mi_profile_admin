


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { successAlert, errorAlert } from "../../utils/alert";
import Loader from "../../components/Loader";
import api from "../../services/api";

export default function AffiliateRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Remove field error when user starts correcting it
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setErrors({});

    try {
        const res = await api.post("/affiliate/register", {
            name: form.name.trim(),
            email: form.email.trim(),
            phone: form.phone.replace(/\D/g, "").slice(0, 10),
        });

        console.log("Registration response:", res.data);

        if (res.data.status === true) {
            setLoading(false);

            successAlert(
                "Success",
                res.data.message ||
                    "Registration successful. Your account is waiting for admin approval."
            );

            // Navigate after successful registration
            navigate("/affiliate-login");
            return;
        }

    } 
    
    
    catch (error) {
    console.error("FULL ERROR:", error);
    console.error("STATUS:", error.response?.status);
    console.error("DATA:", error.response?.data);

    const status = error.response?.status;
    const data = error.response?.data;

    if (status === 422) {
        setErrors(data?.errors || {});

        errorAlert(
            "Validation Failed",
            data?.message || "Please check the entered details."
        );

        return;
    }

    // Show actual backend error
    errorAlert(
        "Error",
        data?.message ||
            `Request failed with status ${status || "unknown"}`
    );
}
    
    
    
    finally {
        setLoading(false);
    }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <Loader
        show={loading}
        text="Submitting..."
      />

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-2xl font-bold text-center mb-2">
          Affiliate Registration
        </h1>

        <p className="text-center text-gray-500 mb-6 text-sm">
          Fill basic details to join as Affiliate
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* NAME */}

          <div>

            <label className="block text-sm font-medium mb-1">
              Name *
            </label>

            <input
              type="text"
              value={form.name}
              onChange={(e) =>
                handleChange("name", e.target.value)
              }
              required
              className={`w-full border rounded-xl px-4 py-3 outline-none focus:border-orange-500 ${
                errors.name
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Your full name"
            />

            {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.name[0]}
              </p>
            )}

          </div>


          {/* EMAIL */}

          <div>

            <label className="block text-sm font-medium mb-1">
              Email *
            </label>

            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                handleChange("email", e.target.value)
              }
              required
              className={`w-full border rounded-xl px-4 py-3 outline-none focus:border-orange-500 ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="email@example.com"
            />

            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email[0]}
              </p>
            )}

          </div>


          {/* PHONE */}

          <div>

            <label className="block text-sm font-medium mb-1">
              Phone *
            </label>

            <input
              type="tel"
              value={form.phone}
              onChange={(e) =>
                handleChange(
                  "phone",
                  e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 10)
                )
              }
              required
              maxLength={10}
              className={`w-full border rounded-xl px-4 py-3 outline-none focus:border-orange-500 ${
                errors.phone
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="10-digit number"
            />

            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">
                {errors.phone[0]}
              </p>
            )}

          </div>


          {/* SUBMIT */}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 disabled:opacity-60"
          >
            {loading
              ? "Submitting..."
              : "Create Affiliate Account"}
          </button>

        </form>


        {/* LOGIN */}

        <p className="text-center text-sm mt-6">

          Already registered?{" "}

          <button
            type="button"
            onClick={() =>
              navigate("/affiliate-login")
            }
            className="text-orange-500 font-medium hover:underline"
          >
            Login
          </button>

        </p>

      </div>
    </div>
  );
}