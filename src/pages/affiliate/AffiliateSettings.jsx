// import { useState, useEffect } from "react";
// import { successAlert, errorAlert } from "../../utils/alert";
// import {
//   Building2,
//   CreditCard,
//   User,
//   Hash,
//   Save,
//   Clock,
//   CheckCircle,
//   XCircle,
// } from "lucide-react";

// export default function AffiliateSettings() {
//   const [form, setForm] = useState({
//     account_holder_name: "",
//     account_number: "",
//     ifsc_code: "",
//     bank_name: "",
//     branch_name: "",
//     upi_id: "",
//   });

//   const [status, setStatus] = useState("not_submitted"); // not_submitted | pending | approved | rejected
//   const [loading, setLoading] = useState(false);
//   const [rejectionReason, setRejectionReason] = useState("");

//   // Load existing bank details (static for now)
//   useEffect(() => {
//     // Later replace with API: GET /affiliate/bank-details
//     // Example response simulation:
//     // setForm({ ... });
//     // setStatus("pending");
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.account_holder_name.trim()) {
//       return errorAlert("Required", "Account holder name is required");
//     }
//     if (!form.account_number.trim()) {
//       return errorAlert("Required", "Account number is required");
//     }
//     if (!form.ifsc_code.trim()) {
//       return errorAlert("Required", "IFSC code is required");
//     }
//     if (!form.bank_name.trim()) {
//       return errorAlert("Required", "Bank name is required");
//     }

//     setLoading(true);

//     try {
//       // ========== STATIC SAVE (replace with API later) ==========
//       // await api.post("/affiliate/bank-details", form);

//       await new Promise((r) => setTimeout(r, 900));

//       setStatus("pending");
//       successAlert(
//         "Submitted",
//         "Bank details submitted successfully. Waiting for admin approval."
//       );
//     } catch (error) {
//       errorAlert("Error", "Failed to submit bank details");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const statusConfig = {
//     not_submitted: {
//       label: "Not Submitted",
//       color: "bg-gray-100 text-gray-600",
//       icon: Clock,
//     },
//     pending: {
//       label: "Pending Approval",
//       color: "bg-yellow-100 text-yellow-700",
//       icon: Clock,
//     },
//     approved: {
//       label: "Approved",
//       color: "bg-green-100 text-green-700",
//       icon: CheckCircle,
//     },
//     rejected: {
//       label: "Rejected",
//       color: "bg-red-100 text-red-700",
//       icon: XCircle,
//     },
//   };

//   const currentStatus = statusConfig[status];

//   return (
//     <div className="p-6 lg:p-8 max-w-2xl mx-auto">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Settings</h1>
//         <p className="text-gray-500 mt-1">
//           Add your bank details for commission withdrawals
//         </p>
//       </div>

//       {/* Status Banner */}
//       <div
//         className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${currentStatus.color}`}
//       >
//         <currentStatus.icon size={20} />
//         <div>
//           <p className="font-semibold text-sm">Status: {currentStatus.label}</p>
//           {status === "pending" && (
//             <p className="text-xs mt-0.5 opacity-80">
//               Your bank details are under review by admin
//             </p>
//           )}
//           {status === "approved" && (
//             <p className="text-xs mt-0.5 opacity-80">
//               You can now request withdrawals
//             </p>
//           )}
//           {status === "rejected" && rejectionReason && (
//             <p className="text-xs mt-0.5 opacity-80">
//               Reason: {rejectionReason}
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Bank Details Form */}
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
//           <h2 className="font-semibold text-gray-900 flex items-center gap-2">
//             <Building2 size={18} className="text-[#FC6C26]" />
//             Bank Account Details
//           </h2>

//           {/* Account Holder Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1.5">
//               Account Holder Name <span className="text-red-500">*</span>
//             </label>
//             <div className="relative">
//               <User
//                 size={18}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//               />
//               <input
//                 type="text"
//                 name="account_holder_name"
//                 value={form.account_holder_name}
//                 onChange={handleChange}
//                 disabled={status === "approved" || status === "pending"}
//                 required
//                 className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#FC6C26] focus:ring-2 focus:ring-orange-100 disabled:bg-gray-50 disabled:text-gray-500"
//                 placeholder="Name as per bank account"
//               />
//             </div>
//           </div>

//           {/* Account Number */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1.5">
//               Account Number <span className="text-red-500">*</span>
//             </label>
//             <div className="relative">
//               <CreditCard
//                 size={18}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//               />
//               <input
//                 type="text"
//                 name="account_number"
//                 value={form.account_number}
//                 onChange={(e) =>
//                   setForm((prev) => ({
//                     ...prev,
//                     account_number: e.target.value.replace(/\D/g, ""),
//                   }))
//                 }
//                 disabled={status === "approved" || status === "pending"}
//                 required
//                 className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#FC6C26] focus:ring-2 focus:ring-orange-100 disabled:bg-gray-50 disabled:text-gray-500"
//                 placeholder="Enter account number"
//               />
//             </div>
//           </div>

//           {/* IFSC Code */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1.5">
//               IFSC Code <span className="text-red-500">*</span>
//             </label>
//             <div className="relative">
//               <Hash
//                 size={18}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//               />
//               <input
//                 type="text"
//                 name="ifsc_code"
//                 value={form.ifsc_code}
//                 onChange={(e) =>
//                   setForm((prev) => ({
//                     ...prev,
//                     ifsc_code: e.target.value.toUpperCase(),
//                   }))
//                 }
//                 disabled={status === "approved" || status === "pending"}
//                 required
//                 maxLength={11}
//                 className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#FC6C26] focus:ring-2 focus:ring-orange-100 disabled:bg-gray-50 disabled:text-gray-500 uppercase"
//                 placeholder="e.g. SBIN0001234"
//               />
//             </div>
//           </div>

//           {/* Bank Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1.5">
//               Bank Name <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               name="bank_name"
//               value={form.bank_name}
//               onChange={handleChange}
//               disabled={status === "approved" || status === "pending"}
//               required
//               className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#FC6C26] focus:ring-2 focus:ring-orange-100 disabled:bg-gray-50 disabled:text-gray-500"
//               placeholder="e.g. State Bank of India"
//             />
//           </div>

//           {/* Branch Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1.5">
//               Branch Name
//             </label>
//             <input
//               type="text"
//               name="branch_name"
//               value={form.branch_name}
//               onChange={handleChange}
//               disabled={status === "approved" || status === "pending"}
//               className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#FC6C26] focus:ring-2 focus:ring-orange-100 disabled:bg-gray-50 disabled:text-gray-500"
//               placeholder="Branch name (optional)"
//             />
//           </div>

//           {/* UPI ID (Optional) */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1.5">
//               UPI ID (Optional)
//             </label>
//             <input
//               type="text"
//               name="upi_id"
//               value={form.upi_id}
//               onChange={handleChange}
//               disabled={status === "approved" || status === "pending"}
//               className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#FC6C26] focus:ring-2 focus:ring-orange-100 disabled:bg-gray-50 disabled:text-gray-500"
//               placeholder="e.g. name@upi"
//             />
//           </div>
//         </div>

//         {/* Submit Button */}
//         {(status === "not_submitted" || status === "rejected") && (
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#FC6C26] text-white font-semibold rounded-xl hover:bg-orange-600 transition disabled:opacity-60"
//           >
//             {loading ? (
//               <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//             ) : (
//               <Save size={18} />
//             )}
//             {loading ? "Submitting..." : "Submit for Approval"}
//           </button>
//         )}

//         {status === "pending" && (
//           <div className="text-center text-sm text-yellow-700 bg-yellow-50 py-3 rounded-xl">
//             Bank details are pending admin approval. You cannot edit until reviewed.
//           </div>
//         )}

//         {status === "approved" && (
//           <div className="text-center text-sm text-green-700 bg-green-50 py-3 rounded-xl">
//             Your bank details have been approved. Contact support if you need to update them.
//           </div>
//         )}
//       </form>
//     </div>
//   );
// }


import { useState, useEffect } from "react";

import {
  errorAlert,
} from "../../utils/alert";

import {
  Building2,
  CreditCard,
  User,
  Hash,
  Save,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

import Loader from "../../components/Loader";

export default function AffiliateSettings() {

  /* =========================================================
     FORM STATE
  ========================================================== */

  const [form, setForm] = useState({
    account_holder_name: "",
    account_number: "",
    ifsc_code: "",
    bank_name: "",
    branch_name: "",
    upi_id: "",
  });

  /* =========================================================
     STATUS
  ========================================================== */

  const [status, setStatus] = useState("not_submitted");

  const [loading, setLoading] = useState(false);

  const [rejectionReason, setRejectionReason] = useState("");

  /* =========================================================
     LOAD EXISTING DATA
  ========================================================== */

  useEffect(() => {
    // Static for now.
    // Later:
    // GET /affiliate/bank-details
  }, []);

  /* =========================================================
     INPUT CHANGE
  ========================================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================================
     SUBMIT BANK DETAILS
  ========================================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    /* -------------------------
       VALIDATION
    -------------------------- */

    if (!form.account_holder_name.trim()) {
      return errorAlert(
        "Required",
        "Account holder name is required"
      );
    }

    if (!form.account_number.trim()) {
      return errorAlert(
        "Required",
        "Account number is required"
      );
    }

    if (!form.ifsc_code.trim()) {
      return errorAlert(
        "Required",
        "IFSC code is required"
      );
    }

    if (!form.bank_name.trim()) {
      return errorAlert(
        "Required",
        "Bank name is required"
      );
    }

    /* =====================================================
       START FULL SCREEN LOADER
    ====================================================== */

    setLoading(true);

    try {

      /* =====================================================
         STATIC SAVE
         Replace with API later
      ====================================================== */

      await new Promise((resolve) =>
        setTimeout(resolve, 3000)
      );

      /* =====================================================
         CHANGE STATUS TO PENDING
      ====================================================== */

      setStatus("pending");

      /*
        IMPORTANT:
        No successAlert here.
        Loader disappears automatically
        after loading becomes false.
      */

    } catch (error) {

      errorAlert(
        "Error",
        "Failed to submit bank details"
      );

    } finally {

      /* =====================================================
         STOP FULL SCREEN LOADER
      ====================================================== */

      setLoading(false);
    }
  };

  /* =========================================================
     STATUS CONFIG
  ========================================================== */

  const statusConfig = {
    not_submitted: {
      label: "Not Submitted",
      color: "bg-gray-100 text-gray-600",
      icon: Clock,
    },

    pending: {
      label: "Pending Approval",
      color: "bg-yellow-100 text-yellow-700",
      icon: Clock,
    },

    approved: {
      label: "Approved",
      color: "bg-green-100 text-green-700",
      icon: CheckCircle,
    },

    rejected: {
      label: "Rejected",
      color: "bg-red-100 text-red-700",
      icon: XCircle,
    },
  };

  const currentStatus = statusConfig[status];

  const StatusIcon = currentStatus.icon;

  return (
    <div className="w-full">

      {/* =====================================================
          FULL SCREEN LOADER
      ====================================================== */}

      <Loader
        show={loading}
        text="Submitting Bank Details..."
      />

      <form onSubmit={handleSubmit}>

        {/* ===================================================
            BANK DETAILS CARD
        ==================================================== */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">

          {/* =================================================
              HEADER
          ================================================== */}

          <div className="mb-7">

            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 flex items-center gap-2">

              <Building2
                size={22}
                className="text-[#FC6C26]"
              />

              Bank Account Details

            </h2>

            <p className="text-gray-500 mt-1">
              Add your bank details for commission withdrawals
            </p>

          </div>

          {/* =================================================
              STATUS
          ================================================== */}

          <div
            className={`mb-7 p-4 rounded-xl flex items-center gap-3 ${currentStatus.color}`}
          >

            <StatusIcon size={20} />

            <div>

              <p className="font-semibold text-sm">
                Status: {currentStatus.label}
              </p>

              {status === "pending" && (
                <p className="text-xs mt-0.5 opacity-80">
                  Your bank details are under review by admin
                </p>
              )}

              {status === "approved" && (
                <p className="text-xs mt-0.5 opacity-80">
                  You can now request withdrawals
                </p>
              )}

              {status === "rejected" &&
                rejectionReason && (
                  <p className="text-xs mt-0.5 opacity-80">
                    Reason: {rejectionReason}
                  </p>
                )}

            </div>

          </div>

          {/* =================================================
              FORM GRID
          ================================================== */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* =================================================
                ACCOUNT HOLDER
            ================================================== */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">

                Account Holder Name

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
                  name="account_holder_name"
                  value={form.account_holder_name}
                  onChange={handleChange}
                  disabled={
                    status === "approved" ||
                    status === "pending" ||
                    loading
                  }
                  required
                  className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 outline-none focus:border-[#FC6C26] focus:ring-2 focus:ring-orange-100 disabled:bg-gray-50 disabled:text-gray-500"
                  placeholder="Name as per bank account"
                />

              </div>

            </div>

            {/* =================================================
                ACCOUNT NUMBER
            ================================================== */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">

                Account Number

                <span className="text-red-500 ml-1">
                  *
                </span>

              </label>

              <div className="relative">

                <CreditCard
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  name="account_number"
                  value={form.account_number}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      account_number:
                        e.target.value.replace(
                          /\D/g,
                          ""
                        ),
                    }))
                  }
                  disabled={
                    status === "approved" ||
                    status === "pending" ||
                    loading
                  }
                  required
                  className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 outline-none focus:border-[#FC6C26] focus:ring-2 focus:ring-orange-100 disabled:bg-gray-50 disabled:text-gray-500"
                  placeholder="Enter account number"
                />

              </div>

            </div>

            {/* =================================================
                IFSC
            ================================================== */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">

                IFSC Code

                <span className="text-red-500 ml-1">
                  *
                </span>

              </label>

              <div className="relative">

                <Hash
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  name="ifsc_code"
                  value={form.ifsc_code}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      ifsc_code:
                        e.target.value.toUpperCase(),
                    }))
                  }
                  disabled={
                    status === "approved" ||
                    status === "pending" ||
                    loading
                  }
                  required
                  maxLength={11}
                  className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 outline-none focus:border-[#FC6C26] focus:ring-2 focus:ring-orange-100 disabled:bg-gray-50 disabled:text-gray-500 uppercase"
                  placeholder="e.g. SBIN0001234"
                />

              </div>

            </div>

            {/* =================================================
                BANK NAME
            ================================================== */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">

                Bank Name

                <span className="text-red-500 ml-1">
                  *
                </span>

              </label>

              <input
                type="text"
                name="bank_name"
                value={form.bank_name}
                onChange={handleChange}
                disabled={
                  status === "approved" ||
                  status === "pending" ||
                  loading
                }
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-[#FC6C26] focus:ring-2 focus:ring-orange-100 disabled:bg-gray-50 disabled:text-gray-500"
                placeholder="e.g. State Bank of India"
              />

            </div>

            {/* =================================================
                BRANCH
            ================================================== */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Branch Name
              </label>

              <input
                type="text"
                name="branch_name"
                value={form.branch_name}
                onChange={handleChange}
                disabled={
                  status === "approved" ||
                  status === "pending" ||
                  loading
                }
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-[#FC6C26] focus:ring-2 focus:ring-orange-100 disabled:bg-gray-50 disabled:text-gray-500"
                placeholder="Branch name (optional)"
              />

            </div>

            {/* =================================================
                UPI
            ================================================== */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">

                UPI ID

                <span className="text-gray-400 ml-1">
                  (Optional)
                </span>

              </label>

              <input
                type="text"
                name="upi_id"
                value={form.upi_id}
                onChange={handleChange}
                disabled={
                  status === "approved" ||
                  status === "pending" ||
                  loading
                }
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-[#FC6C26] focus:ring-2 focus:ring-orange-100 disabled:bg-gray-50 disabled:text-gray-500"
                placeholder="e.g. name@upi"
              />

            </div>

          </div>

          {/* =================================================
              SUBMIT BUTTON
          ================================================== */}

          {(status === "not_submitted" ||
            status === "rejected") && (

            <div className="flex justify-end mt-8 pt-6 border-t border-gray-100">

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 px-8 py-3.5 bg-[#FC6C26] text-white font-semibold rounded-xl hover:bg-orange-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >

                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />

                    Submitting...
                  </>
                ) : (
                  <>
                    <Save size={18} />

                    Submit for Approval
                  </>
                )}

              </button>

            </div>

          )}

          {/* =================================================
              PENDING MESSAGE
          ================================================== */}

          {status === "pending" && (

            <div className="text-center text-sm text-yellow-700 bg-yellow-50 py-3 px-4 rounded-xl mt-8">

              Bank details are pending admin approval.
              You cannot edit until reviewed.

            </div>

          )}

          {/* =================================================
              APPROVED MESSAGE
          ================================================== */}

          {status === "approved" && (

            <div className="text-center text-sm text-green-700 bg-green-50 py-3 px-4 rounded-xl mt-8">

              Your bank details have been approved.
              Contact support if you need to update them.

            </div>

          )}

        </div>

      </form>

    </div>
  );
}