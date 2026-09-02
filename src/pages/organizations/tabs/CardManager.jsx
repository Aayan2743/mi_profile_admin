


// src/pages/organizations/tabs/CardManager.jsx
import { useState } from "react";
import { successAlert, errorAlert } from "../../../utils/alert";

const PRICE = 49;

export default function CardManager({
  organizationId, // REQUIRED
  onSuccess,      // OPTIONAL: refresh org data (mock callback)
}) {
  const [cards, setCards] = useState(10);
  const [days] = useState(30); // UI only - fixed value
  const [loading, setLoading] = useState(false);

  const amount = cards * PRICE;

  const add = () => {
    // ────────────────────────────────────────────────
    //   Client-side validation (same as original)
    // ────────────────────────────────────────────────
    if (!organizationId) {
      errorAlert("Error", "Organization not selected");
      return;
    }

    if (cards < 1) {
      errorAlert("Invalid", "Card count must be at least 1");
      return;
    }

    // Simulate API delay & success
    setLoading(true);

    setTimeout(() => {
      // Mock success
      successAlert("Success", "Cards added successfully (mock mode)");

      // Reset form (same as original)
      setCards(10);
      // setDays(30); // already fixed

      // Trigger parent refresh (if provided)
      if (onSuccess) {
        onSuccess();
      }

      setLoading(false);
    }, 1400); // fake 1.4-second delay to feel realistic
  };

  return (
    <div className="mb-4 bg-white rounded-xl border p-4 space-y-3">
      {/* Number of Cards */}
      <input
        className="border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        type="number"
        min={1}
        value={cards}
        onChange={(e) => {
          const val = Number(e.target.value);
          setCards(val < 1 ? 1 : val);
        }}
        placeholder="Number of cards"
        disabled={loading}
      />

      {/* Validity Days (UI only - disabled) */}
      <input
        className="border w-full p-2 rounded bg-gray-100 cursor-not-allowed"
        type="number"
        value={days}
        disabled
        placeholder="Validity (days)"
      />

      {/* Amount Display */}
      <div className="bg-gray-100 p-2 rounded text-sm">
        Amount: <strong>₹{amount.toLocaleString("en-IN")}</strong>
      </div>

      {/* Submit Button */}
      <button
        onClick={add}
        disabled={loading}
        className={`w-full py-2 rounded text-white font-medium transition
          ${loading
            ? "bg-indigo-400 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800"}`}
      >
        {loading ? "Adding..." : "Add Cards"}
      </button>
    </div>
  );
}