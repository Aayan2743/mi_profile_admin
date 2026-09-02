
//divya 
// src/pages/organizations/AddCardsDrawer.jsx
import { useState, useEffect, useMemo } from "react";
import api from "../../services/api";
import {
  X,
  CreditCard,
  Calendar,
  Upload,
  Wallet,
  Smartphone,
  Gift,
  BadgePercent,
} from "lucide-react";
import { successAlert, errorAlert } from "../../utils/alert";
import { useAuth } from "../../context/AuthContext";
import { load } from "@cashfreepayments/cashfree-js";

import { useSearchParams } from "react-router-dom";

const GST_PERCENTAGE = 18;

const VALIDITY_OPTIONS = [
  { label: "3 Months", value: 90 },
  { label: "6 Months", value: 180 },
  { label: "12 Months", value: 365 },
  { label: "24 Months", value: 730 },
];

export default function AddCardsDrawer({ organizationId, onClose, onSuccess }) {
  const { cardPricing } = useAuth();

  const [searchParams] = useSearchParams();

  const [pricing, setPricing] = useState(null);
  const [cashfree, setCashfree] = useState(null);

  const [cards, setCards] = useState(0);
  const [days, setDays] = useState(90);

  const [isFreeCard, setIsFreeCard] = useState(false);
  const [isNfcCard, setIsNfcCard] = useState(false);
  const [paymentType, setPaymentType] = useState("online");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [proof, setProof] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [couponResponse, setCouponResponse] = useState(null);

  const MIN_CARDS =
    Number(pricing?.minimum_cards) || Number(cardPricing?.minimum_cards) || 10;

  const YEARLY_CARD_PRICE =
    Number(pricing?.price_per_card) ||
    Number(cardPricing?.price_per_card) ||
    999;

  const NFC_PRICE =
    Number(pricing?.nfc_price_per_card) ||
    Number(cardPricing?.nfc_price_per_card) ||
    499;

  const CARD_PRICE = useMemo(() => {
    if (isFreeCard) return YEARLY_CARD_PRICE;

    const pricePerDay = YEARLY_CARD_PRICE / 365;
    return Number((pricePerDay * days).toFixed(2));
  }, [days, isFreeCard, YEARLY_CARD_PRICE]);

  const normalCardAmount = useMemo(() => {
    if (isFreeCard) return 0;
    return Number(cards || 0) * Number(CARD_PRICE || 0);
  }, [cards, CARD_PRICE, isFreeCard]);

  const nfcAmount = useMemo(() => {
    if (isFreeCard || !isNfcCard) return 0;
    return Number(cards || 0) * Number(NFC_PRICE || 0);
  }, [cards, isFreeCard, isNfcCard, NFC_PRICE]);

  const pricePerCardWithNfc = useMemo(() => {
    if (isFreeCard) return 0;
    return Number(CARD_PRICE || 0) + (isNfcCard ? Number(NFC_PRICE || 0) : 0);
  }, [CARD_PRICE, NFC_PRICE, isFreeCard, isNfcCard]);


  useEffect(() => {
    const payment = searchParams.get("payment");
    const purchaseId = searchParams.get("purchase_id");

    if (payment === "success") {
        successAlert(
            "Payment Successful",
            "Mi Profile purchased successfully."
        );

        // Refresh your organization/card data
        onSuccess?.();

        // Remove payment parameters from URL
        window.history.replaceState(
            {},
            "",
            window.location.pathname
        );
    }
}, [searchParams]);


  useEffect(() => {
  const initializeCashfree = async () => {
    try {
      const cf = await load({
        mode: "sandbox",
      });

      setCashfree(cf);

      console.log("Cashfree initialized");
    } catch (error) {
      console.error("Cashfree initialization failed:", error);
    }
  };

  initializeCashfree();
}, []);


  useEffect(() => {
    if (!isFreeCard && MIN_CARDS) {
      setCards(MIN_CARDS);
    }
  }, [MIN_CARDS, isFreeCard]);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const res = await api.get("/public/settings/card-pricing");
        if (res.data?.data) setPricing(res.data.data);
      } catch (err) {
        console.error("Pricing fetch failed:", err);
      }
    };

    fetchPricing();
  }, []);

  useEffect(() => {
    if (isFreeCard) {
      setCards(1);
      setProof(null);
      setCouponCode("");
      setAppliedCoupon(null);
      setPaymentType("");
      setPaymentMethod("");
      setIsNfcCard(false);
    } else {
      setCards(MIN_CARDS || 1);
      setDays(90);
      setPaymentType("online");
      setPaymentMethod("upi");
    }
  }, [isFreeCard, MIN_CARDS]);

  const subTotal = useMemo(() => {
    if (isFreeCard) return 0;
    return normalCardAmount + nfcAmount;
  }, [isFreeCard, normalCardAmount, nfcAmount]);

  const discountAmount = useMemo(() => {
    return Number(couponResponse?.discount || 0);
  }, [couponResponse]);

  const taxableAmount = useMemo(() => {
    if (isFreeCard) return 0;

    return Number(
      couponResponse?.final_amount ?? Math.max(subTotal - discountAmount, 0)
    );
  }, [couponResponse, subTotal, discountAmount, isFreeCard]);

  const gstAmount = useMemo(() => {
    if (isFreeCard) return 0;
    return Number(((taxableAmount * GST_PERCENTAGE) / 100).toFixed(2));
  }, [isFreeCard, taxableAmount]);

  const totalAmount = useMemo(() => {
    if (isFreeCard) return 0;
    return Number((taxableAmount + gstAmount).toFixed(2));
  }, [isFreeCard, taxableAmount, gstAmount]);

  const handleApplyCoupon = async () => {
    const code = couponCode.trim().toUpperCase();

    if (!code) {
      errorAlert("Coupon Required", "Please enter coupon code");
      return;
    }

    try {
      const res = await api.post("/orginazation-dashboard/apply-coupon", {
        coupon_code: code,
        amount: subTotal,
      });

      if (res.data.success) {
        const data = res.data.data;

        setCouponResponse(data);

        setAppliedCoupon({
          code: data.coupon,
          type: data.discount_type,
          value: Number(data.discount_value),
          label:
            data.discount_type === "percentage"
              ? `${data.discount_value}% OFF`
              : `₹${data.discount_value} OFF`,
        });

        successAlert(
          "Coupon Applied",
          `Discount ₹${data.discount} applied successfully`
        );
      }
    } catch (err) {
      setAppliedCoupon(null);
      errorAlert(
        "Invalid Coupon",
        err.response?.data?.message || "Failed to apply coupon"
      );
    }
  };

  const handleRemoveCoupon = () => {
    setCouponCode("");
    setAppliedCoupon(null);
    setCouponResponse(null);
  };

  // const save = async () => {
  //   if (!organizationId)
  //     return errorAlert("Error", "Organization not selected");
  //   if (!cards || Number(cards) < 1)
  //     return errorAlert("Invalid", "Please enter valid number of cards");
  //   if (!isFreeCard && cards < MIN_CARDS)
  //     return errorAlert("Invalid", `Minimum ${MIN_CARDS} cards required`);
  // if (!isFreeCard && paymentType === "cash" && !proof)
  // return errorAlert("Required", "Upload payment proof");

  //   setLoading(true);

  //   try {
  //     const formData = new FormData();

  //     formData.append("quantity", cards);
  //     formData.append("validity_days", isFreeCard ? 365 : days);
  //     formData.append("is_free_card", isFreeCard ? 1 : 0);

  //     formData.append("price_per_card", pricePerCardWithNfc);
  //     formData.append("base_card_price", CARD_PRICE);
  //     formData.append("nfc_price_per_card", isNfcCard ? NFC_PRICE : 0);
  //     formData.append("normal_card_total", normalCardAmount);
  //     formData.append("nfc_card_total", nfcAmount);
  //     formData.append("is_nfc_card", isNfcCard ? 1 : 0);
  //     formData.append("card_type", isNfcCard ? "professional_nfc" : "professional");

  //     formData.append("subtotal", subTotal);
  //     formData.append("discount_amount", discountAmount);
  //     formData.append("taxable_amount", taxableAmount);
  //     formData.append("gst_percentage", GST_PERCENTAGE);
  //     formData.append("gst_amount", gstAmount);
  //     formData.append("total_amount", totalAmount);

  //     if (isFreeCard) {
  //       formData.append("payment_status", "free");
  //     } else {
  //       formData.append("payment_type", paymentType);
  //       formData.append("payment_mode", paymentMethod);
  //       // formData.append("payment_status", "paid");
  //       formData.append("payment_proof", proof);

  //       if (appliedCoupon) {
  //         formData.append("coupon_code", appliedCoupon.code);
  //         formData.append("coupon_type", appliedCoupon.type);
  //         formData.append("coupon_value", appliedCoupon.value);
  //       }
  //     }

  //     const res = await api.post(
  //       `/orginazation-dashboard/organizations/${organizationId}/purchase-cards`,
  //       formData,
  //       { headers: { "Content-Type": "multipart/form-data" } }
  //     );

  //     if (res.data.success) {
  //       await new Promise((resolve) => setTimeout(resolve, 2000));
  //       onSuccess?.();
  //       onClose();
  //     } else {
  //       errorAlert("Error", res.data.message || "Failed to add Mi Profile");
  //     }
  //   } catch (err) {
  //     errorAlert("Error", err.response?.data?.message || "Failed to add Mi Profile");
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const save = async () => {
  if (!organizationId)
    return errorAlert("Error", "Organization not selected");

  if (!cards || Number(cards) < 1)
    return errorAlert("Invalid", "Please enter valid number of cards");

  if (!isFreeCard && cards < MIN_CARDS)
    return errorAlert("Invalid", `Minimum ${MIN_CARDS} cards required`);

  // Payment proof is required ONLY for cash/offline
  if (!isFreeCard && paymentType === "cash" && !proof)
    return errorAlert("Required", "Upload payment proof");

  setLoading(true);

  try {
    /*
    |--------------------------------------------------------------------------
    | FREE CARD
    |--------------------------------------------------------------------------
    */

    if (isFreeCard) {
      const formData = new FormData();

      formData.append("quantity", cards);
      formData.append("validity_days", 365);
      formData.append("is_free_card", 1);
      formData.append("price_per_card", 0);
      formData.append("base_card_price", 0);
      formData.append("nfc_price_per_card", 0);
      formData.append("normal_card_total", 0);
      formData.append("nfc_card_total", 0);
      formData.append("is_nfc_card", 0);
      formData.append("card_type", "professional");

      formData.append("subtotal", 0);
      formData.append("discount_amount", 0);
      formData.append("taxable_amount", 0);
      formData.append("gst_percentage", 0);
      formData.append("gst_amount", 0);
      formData.append("total_amount", 0);

      formData.append("payment_status", "free");

      const res = await api.post(
        `/orginazation-dashboard/organizations/${organizationId}/purchase-cards`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        successAlert(
          "Success",
          res.data.message || "Mi Profile added successfully"
        );

        await new Promise((resolve) => setTimeout(resolve, 1000));

        onSuccess?.();
        onClose();
      } else {
        errorAlert("Error", res.data.message || "Failed to add Mi Profile");
      }

      return;
    }

    /*
    |--------------------------------------------------------------------------
    | ONLINE PAYMENT - CASHFREE
    |--------------------------------------------------------------------------
    */

if (paymentType === "online") {
  const paymentRes = await api.post(
    `/orginazation-dashboard/organizations/${organizationId}/cashfree/create-order`,
    {
      quantity: cards,
      validity_days: days,
      is_nfc_card: isNfcCard ? 1 : 0,
      card_type: isNfcCard
        ? "professional_nfc"
        : "professional",
          price_per_card: CARD_PRICE,

      subtotal: subTotal,
      discount_amount: discountAmount,
      taxable_amount: taxableAmount,
      gst_percentage: GST_PERCENTAGE,
      gst_amount: gstAmount,
      total_amount: totalAmount,

      coupon_code: appliedCoupon?.code || null,
      coupon_type: appliedCoupon?.type || null,
      coupon_value: appliedCoupon?.value || null,

      payment_method: paymentMethod,
    }
  );

  console.log("Cashfree Create Order:", paymentRes.data);

  if (!paymentRes.data.status) {
    errorAlert(
      "Payment Error",
      paymentRes.data.message || "Unable to create payment"
    );
    return;
  }

  const paymentSessionId =
    paymentRes.data.payment_session_id;

  if (!paymentSessionId) {
    errorAlert(
      "Payment Error",
      "Payment session not received from Cashfree"
    );
    return;
  }

  if (!cashfree) {
    errorAlert(
      "Payment Error",
      "Cashfree is still loading. Please try again."
    );
    return;
  }

  console.log("Opening Cashfree:", paymentSessionId);

  await cashfree.checkout({
    paymentSessionId,
    redirectTarget: "_self",
  });

  return;
}

    /*
    |--------------------------------------------------------------------------
    | CASH / OFFLINE PAYMENT
    |--------------------------------------------------------------------------
    */

    const formData = new FormData();

    formData.append("quantity", cards);
    formData.append("validity_days", days);
    formData.append("is_free_card", 0);

    formData.append("price_per_card", pricePerCardWithNfc);
    formData.append("base_card_price", CARD_PRICE);
    formData.append(
      "nfc_price_per_card",
      isNfcCard ? NFC_PRICE : 0
    );

    formData.append("normal_card_total", normalCardAmount);
    formData.append("nfc_card_total", nfcAmount);

    formData.append(
      "is_nfc_card",
      isNfcCard ? 1 : 0
    );

    formData.append(
      "card_type",
      isNfcCard
        ? "professional_nfc"
        : "professional"
    );

    formData.append("subtotal", subTotal);
    formData.append("discount_amount", discountAmount);
    formData.append("taxable_amount", taxableAmount);
    formData.append("gst_percentage", GST_PERCENTAGE);
    formData.append("gst_amount", gstAmount);
    formData.append("total_amount", totalAmount);

    formData.append("payment_type", "cash");
    formData.append("payment_mode", paymentMethod);
    formData.append("payment_status", "pending");

    formData.append("payment_proof", proof);

    if (appliedCoupon) {
      formData.append(
        "coupon_code",
        appliedCoupon.code
      );

      formData.append(
        "coupon_type",
        appliedCoupon.type
      );

      formData.append(
        "coupon_value",
        appliedCoupon.value
      );
    }

    const res = await api.post(
      `/orginazation-dashboard/organizations/${organizationId}/purchase-cards`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (res.data.success) {
      successAlert(
        "Success",
        res.data.message || "Mi Profile added successfully"
      );

      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );

      onSuccess?.();
      onClose();
    } else {
      errorAlert(
        "Error",
        res.data.message || "Failed to add Mi Profile"
      );
    }

  } catch (err) {

    console.error("Payment error:", err);

    errorAlert(
      "Error",
      err.response?.data?.message ||
        "Failed to process payment"
    );

  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    setAppliedCoupon(null);
    setCouponResponse(null);
  }, [cards, days, isNfcCard]);

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 transition-opacity"
        onClick={loading ? undefined : onClose}
      />

      <div className="fixed right-0 top-0 h-full w-full sm:w-[440px] md:w-[480px] bg-[hsl(var(--card-bg))] z-50 shadow-2xl flex flex-col border-l border-[hsl(var(--border))] transition-colors duration-300">
        <div className="shrink-0 px-5 sm:px-6 py-5 border-b border-[hsl(var(--border))] flex justify-between items-start gap-4 bg-[hsl(var(--bg-secondary)/0.6)]">
          <div className="min-w-0">
            <h3 className="text-xl font-semibold text-[hsl(var(--text-primary))]">
              Add Mi Profile
            </h3>
            <p className="text-sm text-[hsl(var(--text-muted))] mt-0.5">
              Purchase digital Mi Profile for this organization
            </p>
          </div>

          <button
            onClick={onClose}
            disabled={loading}
            className="p-2.5 rounded-full hover:bg-[hsl(var(--accent)/0.15)] text-[hsl(var(--text-secondary))] transition disabled:opacity-50 shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-6 sm:py-8 space-y-7 sm:space-y-10 pb-28 sm:pb-8">
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0">
              <div className="p-3 rounded-xl bg-emerald-600 text-white shrink-0">
                <Gift size={22} />
              </div>

              <div className="min-w-0">
                <h4 className="font-semibold text-[hsl(var(--text-primary))]">
                  Get your Mi Profile free
                </h4>
                <p className="text-sm text-[hsl(var(--text-muted))] mt-0.5">
                  1 card, 1 year validity, ₹0 total
                </p>
              </div>
            </div>

            <button
              type="button"
              disabled={loading}
              onClick={() => setIsFreeCard((prev) => !prev)}
              className={`relative w-12 h-7 rounded-full transition disabled:opacity-50 shrink-0 ${
                isFreeCard ? "bg-emerald-600" : "bg-[hsl(var(--border))]"
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-transform ${
                  isFreeCard ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <Section title="Number of Cards">
            <InputWithIcon
              icon={<CreditCard size={20} />}
              type="number"
              value={cards}
              min={1}
              onChange={(e) => {
                const val = Number(e.target.value);
                setCards(val < 1 ? 1 : val);
              }}
              placeholder="Enter quantity"
              disabled={loading || isFreeCard}
            />
          </Section>

          <Section title="Validity Period">
            {isFreeCard ? (
              <InputWithIcon
                icon={<Calendar size={20} />}
                value="1 year"
                disabled
                className="bg-[hsl(var(--bg-secondary))] cursor-not-allowed text-[hsl(var(--text-muted))]"
              />
            ) : (
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[hsl(var(--text-muted))]">
                  <Calendar size={20} />
                </div>

                <select
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  disabled={loading}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card-bg))] text-[hsl(var(--text-primary))] focus:border-[hsl(var(--accent))] focus:ring-2 focus:ring-[hsl(var(--accent)/0.3)] outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {VALIDITY_OPTIONS.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </Section>

          {!isFreeCard && (
            <Section title="NFC Card">
              <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card-bg))] p-4 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-[hsl(var(--text-primary))]">
                    Add NFC Card
                  </h4>
                  <p className="text-sm text-[hsl(var(--text-muted))] mt-1">
                    ₹{NFC_PRICE.toLocaleString("en-IN")} / card
                  </p>
                </div>

                <button
                  type="button"
                  disabled={loading}
                  onClick={() => setIsNfcCard((prev) => !prev)}
                  className={`relative w-12 h-7 rounded-full transition disabled:opacity-50 shrink-0 ${
                    isNfcCard ? "bg-[hsl(var(--accent))]" : "bg-[hsl(var(--border))]"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-transform ${
                      isNfcCard ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </Section>
          )}

          {!isFreeCard && (
            <>
              <Section title="Coupon Code">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 min-w-0">
                    <InputWithIcon
                      icon={<BadgePercent size={20} />}
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      disabled={loading || !!appliedCoupon}
                    />
                  </div>

                  {appliedCoupon ? (
                    <button
                      type="button"
                      disabled={loading}
                      onClick={handleRemoveCoupon}
                      className="w-full sm:w-auto px-4 py-3 sm:py-0 rounded-xl border border-rose-500/40 text-rose-500 font-medium transition disabled:opacity-50"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={loading}
                      onClick={handleApplyCoupon}
                      className="w-full sm:w-auto px-5 py-3 sm:py-0 rounded-xl bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-dark))] text-white font-semibold transition disabled:opacity-50"
                    >
                      Apply
                    </button>
                  )}
                </div>

                {appliedCoupon && (
                  <p className="text-xs text-emerald-500 mt-2">
                    {appliedCoupon.code} applied - {appliedCoupon.label}
                  </p>
                )}
              </Section>

              <Section title="Payment Type">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <RadioCard
                    active={paymentType === "online"}
                    onClick={() => !loading && setPaymentType("online")}
                    icon={<Smartphone size={20} />}
                    title="Online Payment"
                    desc="UPI, Card, Netbanking"
                  />

                  <RadioCard
                    active={paymentType === "cash"}
                    onClick={() => !loading && setPaymentType("cash")}
                    icon={<Wallet size={20} />}
                    title="Cash / Offline"
                    desc="Bank transfer or cash"
                  />
                </div>
              </Section>

              {paymentType === "online" && (
                <Section title="Payment Method">
                  <div className="flex gap-3 flex-wrap">
                    <Pill
                      active={paymentMethod === "upi"}
                      onClick={() => !loading && setPaymentMethod("upi")}
                    >
                      UPI
                    </Pill>

                    <Pill
                      active={paymentMethod === "card"}
                      onClick={() => !loading && setPaymentMethod("card")}
                    >
                      Credit/Debit Card
                    </Pill>
                  </div>
                </Section>
              )}

              <Section title="Payment Proof">
                <label className="block border-2 border-dashed rounded-2xl p-5 sm:p-8 text-center cursor-pointer border-[hsl(var(--border))] hover:border-[hsl(var(--accent))] hover:bg-[hsl(var(--accent)/0.08)]">
                  <Upload
                    className="mx-auto text-[hsl(var(--text-muted))] mb-3"
                    size={32}
                  />
                  <p className="text-sm font-medium text-[hsl(var(--text-primary))] break-all">
                    {proof ? proof.name : "Click to upload payment proof (image)"}
                  </p>
                  <p className="text-xs text-[hsl(var(--text-muted))] mt-1">
                    PNG, JPG or JPEG • Max 2MB
                  </p>

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    hidden
                    disabled={loading}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      if (!file.type.startsWith("image/")) {
                        errorAlert("Invalid", "Only image files allowed");
                        return;
                      }

                      if (file.size > 2 * 1024 * 1024) {
                        errorAlert("Too large", "Image must be under 2MB");
                        return;
                      }

                      setProof(file);
                    }}
                  />
                </label>
              </Section>
            </>
          )}

          <div className="bg-[hsl(var(--accent)/0.08)] border border-[hsl(var(--accent)/0.3)] rounded-2xl p-5 sm:p-6 space-y-4">
            <SummaryRow
              label="Mi Profile price"
              value={`₹${CARD_PRICE.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })} × ${cards}`}
            />

            {isNfcCard && (
              <SummaryRow
                label="NFC add-on"
                value={`₹${NFC_PRICE.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })} × ${cards}`}
              />
            )}

            <SummaryRow
              label="Price per card"
              value={`₹${pricePerCardWithNfc.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`}
            />

            <SummaryRow label="Total cards" value={cards} />

            <SummaryRow
              label="Validity"
              value={isFreeCard ? "365 days" : `${days} days`}
            />

            <SummaryRow
              label="Mi Profile subtotal"
              value={`₹${normalCardAmount.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`}
            />

            {isNfcCard && (
              <SummaryRow
                label="NFC subtotal"
                value={`₹${nfcAmount.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`}
              />
            )}

            <SummaryRow
              label="Subtotal"
              value={`₹${subTotal.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`}
            />

            {!isFreeCard && appliedCoupon && (
              <SummaryRow
                label="Coupon Discount"
                value={`- ₹${discountAmount.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`}
                green
              />
            )}

            {!isFreeCard && (
              <>
                <SummaryRow
                  label="Taxable Amount"
                  value={`₹${taxableAmount.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`}
                />

                <SummaryRow
                  label={`GST (${GST_PERCENTAGE}%)`}
                  value={`₹${gstAmount.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`}
                />
              </>
            )}

            <div className="border-t border-[hsl(var(--border))] pt-4 flex justify-between items-center gap-4">
              <span className="text-base font-semibold text-[hsl(var(--text-primary))]">
                Total Amount
              </span>
              <span className="text-xl sm:text-2xl md:text-3xl font-bold text-[hsl(var(--accent))] text-right break-words">
                ₹
                {totalAmount.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
        </div>

        <div className="shrink-0 sticky bottom-16 sm:bottom-0 px-5 sm:px-6 py-4 sm:py-5 border-t border-[hsl(var(--border))] flex gap-3 sm:gap-4 bg-[hsl(var(--bg-secondary)/0.95)] backdrop-blur-md">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-3 rounded-xl border border-[hsl(var(--border))] disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={save}
            disabled={loading}
            className="flex-1 py-3 rounded-xl text-white font-semibold bg-[hsl(var(--accent))] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {loading
              ? "Processing..."
              : isFreeCard
                ? "Confirm Free Card"
                : "Confirm & Pay"}
          </button>
        </div>
      </div>
    </>
  );
}

function SummaryRow({ label, value, green }) {
  return (
    <div
      className={`flex justify-between gap-4 text-sm ${
        green ? "text-emerald-500" : "text-[hsl(var(--text-muted))]"
      }`}
    >
      <span className="min-w-0">{label}</span>
      <span className="font-medium text-right break-words">{value}</span>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-[hsl(var(--text-primary))] mb-3">
        {title}
      </h4>
      {children}
    </div>
  );
}

function InputWithIcon({ icon, className = "", ...props }) {
  return (
    <div className="relative w-full">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[hsl(var(--text-muted))]">
        {icon}
      </div>
      <input
        {...props}
        className={`w-full min-w-0 pl-12 pr-4 py-3.5 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card-bg))] text-[hsl(var(--text-primary))] placeholder-[hsl(var(--text-muted))] focus:border-[hsl(var(--accent))] focus:ring-2 focus:ring-[hsl(var(--accent)/0.3)] outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      />
    </div>
  );
}

function RadioCard({ active, icon, title, desc, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer p-4 sm:p-5 rounded-2xl border transition-all duration-200 ${
        active
          ? "border-[hsl(var(--accent))] bg-[hsl(var(--accent)/0.08)] shadow-md"
          : "border-[hsl(var(--border))] hover:border-[hsl(var(--accent))] hover:bg-[hsl(var(--accent)/0.08)]"
      }`}
    >
      <div className="flex items-start sm:items-center gap-3 sm:gap-4">
        <div
          className={`p-3 rounded-xl shrink-0 ${
            active
              ? "bg-[hsl(var(--accent))] text-white"
              : "bg-[hsl(var(--bg-secondary))] text-[hsl(var(--text-muted))]"
          }`}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-[hsl(var(--text-primary))]">
            {title}
          </p>
          <p className="text-sm text-[hsl(var(--text-muted))] mt-0.5">{desc}</p>
        </div>
      </div>
    </div>
  );
}

function Pill({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-5 sm:px-6 py-2.5 rounded-full text-sm font-medium border transition-all ${
        active
          ? "bg-[hsl(var(--accent))] text-white border-[hsl(var(--accent))] shadow-sm"
          : "border-[hsl(var(--border))] text-[hsl(var(--text-secondary))] hover:bg-[hsl(var(--accent)/0.08)] hover:border-[hsl(var(--accent))]"
      }`}
    >
      {children}
    </button>
  );
}