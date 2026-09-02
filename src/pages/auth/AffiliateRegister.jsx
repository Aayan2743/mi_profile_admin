import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { successAlert, errorAlert } from "../../utils/alert";
import Loader from "../../components/Loader";
import api from "../../services/api";

export default function AffiliateRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/affiliate-register", {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.replace(/\D/g, "").slice(0, 10),
      });

      if (res.data.success) {
        successAlert("Success", "Registration submitted. Wait for admin approval.");
        navigate("/affiliate-login");
      }
    } catch (error) {
      errorAlert("Error", error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Loader show={loading} text="Submitting..." />

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-center mb-2">Affiliate Registration</h1>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Fill basic details to join as Affiliate
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full border rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email *</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full border rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone *</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                })
              }
              required
              maxLength={10}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:border-orange-500"
              placeholder="10-digit number"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Create Affiliate Account"}
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Already registered?{" "}
          <button
            onClick={() => navigate("/affiliate-login")}
            className="text-orange-500 font-medium hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}