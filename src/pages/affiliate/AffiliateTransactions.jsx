// import { useState } from "react";
// import {
//   ArrowUpRight,
//   ArrowDownLeft,
//   Clock,
//   CheckCircle,
//   XCircle,
//   Plus,
//   Wallet,
// } from "lucide-react";
// import { successAlert, errorAlert } from "../../utils/alert";

// export default function AffiliateTransactions() {
//   const [activeTab, setActiveTab] = useState("received"); // received | withdrawals
//   const [showWithdrawModal, setShowWithdrawModal] = useState(false);
//   const [withdrawAmount, setWithdrawAmount] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Static data – replace with API later
//   const walletBalance = 2450.75;

//   const receivedTransactions = [
//     {
//       id: 1,
//       date: "25/08/2026",
//       organization: "Brand Crest Digital Pvt Ltd",
//       cards: 5,
//       amount: 4500,
//       commission: 450,
//       status: "credited",
//     },
//     {
//       id: 2,
//       date: "18/08/2026",
//       organization: "Shree Jee Trading Co",
//       cards: 1,
//       amount: 850,
//       commission: 85,
//       status: "credited",
//     },
//     {
//       id: 3,
//       date: "10/08/2026",
//       organization: "Chandgothia Artha Saarathee",
//       cards: 3,
//       amount: 2700,
//       commission: 270,
//       status: "credited",
//     },
//     {
//       id: 4,
//       date: "05/08/2026",
//       organization: "Brand Crest Digital Pvt Ltd",
//       cards: 4,
//       amount: 3600,
//       commission: 360,
//       status: "credited",
//     },
//   ];

//   const withdrawalRequests = [
//     {
//       id: 101,
//       date: "20/08/2026",
//       amount: 1000,
//       status: "approved",
//       processed_date: "22/08/2026",
//       remark: "Transferred to bank",
//     },
//     {
//       id: 102,
//       date: "12/08/2026",
//       amount: 500,
//       status: "pending",
//       processed_date: null,
//       remark: "Under review",
//     },
//     {
//       id: 103,
//       date: "01/08/2026",
//       amount: 800,
//       status: "rejected",
//       processed_date: "03/08/2026",
//       remark: "Incorrect bank details",
//     },
//   ];

//   const handleWithdraw = async (e) => {
//     e.preventDefault();

//     const amount = Number(withdrawAmount);

//     if (!amount || amount <= 0) {
//       return errorAlert("Invalid", "Please enter a valid amount");
//     }
//     if (amount > walletBalance) {
//       return errorAlert("Invalid", "Amount exceeds wallet balance");
//     }
//     if (amount < 100) {
//       return errorAlert("Invalid", "Minimum withdrawal amount is ₹100");
//     }

//     setLoading(true);

//     try {
//       // ========== STATIC (replace with API later) ==========
//       // await api.post("/affiliate/withdraw-request", { amount });

//       await new Promise((r) => setTimeout(r, 900));

//       successAlert(
//         "Request Submitted",
//         "Your withdrawal request has been submitted for admin approval."
//       );
//       setShowWithdrawModal(false);
//       setWithdrawAmount("");
//     } catch (error) {
//       errorAlert("Error", "Failed to submit withdrawal request");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const statusBadge = (status) => {
//     const map = {
//       credited: {
//         label: "Credited",
//         class: "bg-green-100 text-green-700",
//         icon: CheckCircle,
//       },
//       pending: {
//         label: "Pending",
//         class: "bg-yellow-100 text-yellow-700",
//         icon: Clock,
//       },
//       approved: {
//         label: "Approved",
//         class: "bg-green-100 text-green-700",
//         icon: CheckCircle,
//       },
//       rejected: {
//         label: "Rejected",
//         class: "bg-red-100 text-red-700",
//         icon: XCircle,
//       },
//     };
//     const s = map[status] || map.pending;
//     const Icon = s.icon;
//     return (
//       <span
//         className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${s.class}`}
//       >
//         <Icon size={12} />
//         {s.label}
//       </span>
//     );
//   };

//   return (
//     <div className="p-6 lg:p-8 max-w-6xl mx-auto">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
//         <div>
//           <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
//             Transactions
//           </h1>
//           <p className="text-gray-500 mt-1">
//             Commission received & withdrawal requests
//           </p>
//         </div>

//         <button
//           onClick={() => setShowWithdrawModal(true)}
//           className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FC6C26] text-white font-semibold rounded-xl hover:bg-orange-600 transition"
//         >
//           <Plus size={18} />
//           Request Withdrawal
//         </button>
//       </div>

//       {/* Wallet Summary */}
//       <div className="mb-8 p-5 bg-gradient-to-r from-[#FC6C26] to-orange-600 rounded-2xl text-white flex items-center justify-between">
//         <div>
//           <p className="text-orange-100 text-sm">Available Balance</p>
//           <p className="text-3xl font-bold mt-1">
//             ₹{walletBalance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
//           </p>
//         </div>
//         <Wallet size={36} className="opacity-80" />
//       </div>

//       {/* Tabs */}
//       <div className="flex gap-2 mb-6 border-b border-gray-200">
//         <button
//           onClick={() => setActiveTab("received")}
//           className={`px-5 py-3 text-sm font-semibold border-b-2 transition ${
//             activeTab === "received"
//               ? "border-[#FC6C26] text-[#FC6C26]"
//               : "border-transparent text-gray-500 hover:text-gray-700"
//           }`}
//         >
//           <span className="flex items-center gap-2">
//             <ArrowDownLeft size={16} />
//             Amount Received
//           </span>
//         </button>
//         <button
//           onClick={() => setActiveTab("withdrawals")}
//           className={`px-5 py-3 text-sm font-semibold border-b-2 transition ${
//             activeTab === "withdrawals"
//               ? "border-[#FC6C26] text-[#FC6C26]"
//               : "border-transparent text-gray-500 hover:text-gray-700"
//           }`}
//         >
//           <span className="flex items-center gap-2">
//             <ArrowUpRight size={16} />
//             Withdrawal Requests
//           </span>
//         </button>
//       </div>

//       {/* ===================== AMOUNT RECEIVED ===================== */}
//       {activeTab === "received" && (
//         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full text-left">
//               <thead>
//                 <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
//                   <th className="px-6 py-4">Date</th>
//                   <th className="px-6 py-4">Organization</th>
//                   <th className="px-6 py-4 text-center">Cards</th>
//                   <th className="px-6 py-4 text-right">Purchase Amount</th>
//                   <th className="px-6 py-4 text-right">Your Commission</th>
//                   <th className="px-6 py-4 text-center">Status</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-50">
//                 {receivedTransactions.map((tx) => (
//                   <tr key={tx.id} className="hover:bg-orange-50/30 transition">
//                     <td className="px-6 py-4 text-sm text-gray-600">{tx.date}</td>
//                     <td className="px-6 py-4 font-medium text-gray-900">
//                       {tx.organization}
//                     </td>
//                     <td className="px-6 py-4 text-center">{tx.cards}</td>
//                     <td className="px-6 py-4 text-right text-gray-700">
//                       ₹{tx.amount.toLocaleString("en-IN")}
//                     </td>
//                     <td className="px-6 py-4 text-right font-semibold text-green-600">
//                       + ₹{tx.commission.toLocaleString("en-IN")}
//                     </td>
//                     <td className="px-6 py-4 text-center">
//                       {statusBadge(tx.status)}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* ===================== WITHDRAWAL REQUESTS ===================== */}
//       {activeTab === "withdrawals" && (
//         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full text-left">
//               <thead>
//                 <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
//                   <th className="px-6 py-4">Request Date</th>
//                   <th className="px-6 py-4 text-right">Amount</th>
//                   <th className="px-6 py-4 text-center">Status</th>
//                   <th className="px-6 py-4">Processed Date</th>
//                   <th className="px-6 py-4">Remark</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-50">
//                 {withdrawalRequests.map((tx) => (
//                   <tr key={tx.id} className="hover:bg-orange-50/30 transition">
//                     <td className="px-6 py-4 text-sm text-gray-600">{tx.date}</td>
//                     <td className="px-6 py-4 text-right font-semibold text-gray-900">
//                       ₹{tx.amount.toLocaleString("en-IN")}
//                     </td>
//                     <td className="px-6 py-4 text-center">
//                       {statusBadge(tx.status)}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">
//                       {tx.processed_date || "-"}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-500">
//                       {tx.remark}
//                     </td>
//                   </tr>
//                 ))}

//                 {withdrawalRequests.length === 0 && (
//                   <tr>
//                     <td
//                       colSpan={5}
//                       className="px-6 py-16 text-center text-gray-400"
//                     >
//                       No withdrawal requests yet
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* ===================== WITHDRAW MODAL ===================== */}
//       {showWithdrawModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
//           <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
//             <div className="px-6 py-5 border-b border-gray-100">
//               <h2 className="text-xl font-bold text-gray-900">
//                 Request Withdrawal
//               </h2>
//               <p className="text-sm text-gray-500 mt-1">
//                 Available balance: ₹
//                 {walletBalance.toLocaleString("en-IN", {
//                   minimumFractionDigits: 2,
//                 })}
//               </p>
//             </div>

//             <form onSubmit={handleWithdraw} className="p-6 space-y-5">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                   Amount (₹)
//                 </label>
//                 <input
//                   type="number"
//                   min="100"
//                   step="1"
//                   value={withdrawAmount}
//                   onChange={(e) => setWithdrawAmount(e.target.value)}
//                   required
//                   className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#FC6C26] focus:ring-2 focus:ring-orange-100"
//                   placeholder="Enter amount (min ₹100)"
//                 />
//               </div>

//               <p className="text-xs text-gray-500">
//                 Amount will be transferred to your approved bank account after
//                 admin approval.
//               </p>

//               <div className="flex gap-3 pt-2">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowWithdrawModal(false);
//                     setWithdrawAmount("");
//                   }}
//                   className="flex-1 py-2.5 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="flex-1 py-2.5 bg-[#FC6C26] text-white font-semibold rounded-xl hover:bg-orange-600 disabled:opacity-60 flex items-center justify-center gap-2"
//                 >
//                   {loading && (
//                     <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                   )}
//                   {loading ? "Submitting..." : "Submit Request"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// import { useState } from "react";
// import {
//   ArrowUpRight,
//   ArrowDownLeft,
//   Clock,
//   CheckCircle,
//   XCircle,
//   Plus,
//   Wallet,
// } from "lucide-react";
// import { successAlert, errorAlert } from "../../utils/alert";

// export default function AffiliateTransactions() {
//   const [activeTab, setActiveTab] = useState("received");
//   const [showWithdrawModal, setShowWithdrawModal] = useState(false);
//   const [withdrawAmount, setWithdrawAmount] = useState("");
//   const [loading, setLoading] = useState(false);

//   // ============================================
//   // WALLET BALANCE
//   // ============================================
//   const walletBalance = 2450.75;

//   // ============================================
//   // MINIMUM WITHDRAWAL AMOUNT
//   // ============================================
//   const MIN_WITHDRAWAL = 1000;

//   // ============================================
//   // RECEIVED TRANSACTIONS
//   // ============================================
//   const receivedTransactions = [
//     {
//       id: 1,
//       date: "25/08/2026",
//       organization: "Brand Crest Digital Pvt Ltd",
//       cards: 5,
//       amount: 4500,
//       commission: 450,
//       status: "credited",
//     },
//     {
//       id: 2,
//       date: "18/08/2026",
//       organization: "Shree Jee Trading Co",
//       cards: 1,
//       amount: 850,
//       commission: 85,
//       status: "credited",
//     },
//     {
//       id: 3,
//       date: "10/08/2026",
//       organization: "Chandgothia Artha Saarathee",
//       cards: 3,
//       amount: 2700,
//       commission: 270,
//       status: "credited",
//     },
//     {
//       id: 4,
//       date: "05/08/2026",
//       organization: "Brand Crest Digital Pvt Ltd",
//       cards: 4,
//       amount: 3600,
//       commission: 360,
//       status: "credited",
//     },
//   ];

//   // ============================================
//   // WITHDRAWAL REQUESTS
//   // ============================================
//   const withdrawalRequests = [
//     {
//       id: 101,
//       date: "20/08/2026",
//       amount: 1000,
//       status: "approved",
//       processed_date: "22/08/2026",
//       remark: "Transferred to bank",
//     },
//     {
//       id: 102,
//       date: "12/08/2026",
//       amount: 500,
//       status: "pending",
//       processed_date: null,
//       remark: "Under review",
//     },
//     {
//       id: 103,
//       date: "01/08/2026",
//       amount: 800,
//       status: "rejected",
//       processed_date: "03/08/2026",
//       remark: "Incorrect bank details",
//     },
//   ];

//   // ============================================
//   // HANDLE WITHDRAWAL
//   // ============================================
//   const handleWithdraw = async (e) => {
//     e.preventDefault();

//     const amount = Number(withdrawAmount);

//     // Required amount validation
//     if (!amount || amount <= 0) {
//       return errorAlert(
//         "Invalid Amount",
//         "Please enter a valid withdrawal amount"
//       );
//     }

//     // Minimum withdrawal validation
//     if (amount < MIN_WITHDRAWAL) {
//       return errorAlert(
//         "Minimum Withdrawal",
//         `Minimum withdrawal amount is ₹${MIN_WITHDRAWAL.toLocaleString(
//           "en-IN"
//         )}`
//       );
//     }

//     // Wallet balance validation
//     if (amount > walletBalance) {
//       return errorAlert(
//         "Insufficient Balance",
//         "Withdrawal amount exceeds your wallet balance"
//       );
//     }

//     setLoading(true);

//     try {
//       // ============================================
//       // STATIC - REPLACE WITH API LATER
//       // ============================================
//       // await api.post("/affiliate/withdraw-request", {
//       //   amount,
//       // });

//       await new Promise((resolve) => setTimeout(resolve, 900));

//       successAlert(
//         "Request Submitted",
//         "Your withdrawal request has been submitted for admin approval."
//       );

//       setShowWithdrawModal(false);
//       setWithdrawAmount("");
//     } catch (error) {
//       errorAlert(
//         "Error",
//         "Failed to submit withdrawal request"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ============================================
//   // STATUS BADGE
//   // ============================================
//   const statusBadge = (status) => {
//     const map = {
//       credited: {
//         label: "Credited",
//         class: "bg-green-100 text-green-700",
//         icon: CheckCircle,
//       },
//       pending: {
//         label: "Pending",
//         class: "bg-yellow-100 text-yellow-700",
//         icon: Clock,
//       },
//       approved: {
//         label: "Approved",
//         class: "bg-green-100 text-green-700",
//         icon: CheckCircle,
//       },
//       rejected: {
//         label: "Rejected",
//         class: "bg-red-100 text-red-700",
//         icon: XCircle,
//       },
//     };

//     const s = map[status] || map.pending;
//     const Icon = s.icon;

//     return (
//       <span
//         className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${s.class}`}
//       >
//         <Icon size={12} />
//         {s.label}
//       </span>
//     );
//   };

//   return (
//     <div className="p-6 lg:p-8 max-w-6xl mx-auto">

//       {/* ============================================
//           HEADER
//       ============================================ */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
//         <div>
//           <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
//             Transactions
//           </h1>

//           <p className="text-gray-500 mt-1">
//             Commission received & withdrawal requests
//           </p>
//         </div>

//         <button
//           onClick={() => setShowWithdrawModal(true)}
//           className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FC6C26] text-white font-semibold rounded-xl hover:bg-orange-600 transition"
//         >
//           <Plus size={18} />
//           Request Withdrawal
//         </button>
//       </div>

//       {/* ============================================
//           WALLET SUMMARY
//       ============================================ */}
//       <div className="mb-8 p-5 bg-gradient-to-r from-[#FC6C26] to-orange-600 rounded-2xl text-white flex items-center justify-between">
//         <div>
//           <p className="text-orange-100 text-sm">
//             Available Balance
//           </p>

//           <p className="text-3xl font-bold mt-1">
//             ₹
//             {walletBalance.toLocaleString("en-IN", {
//               minimumFractionDigits: 2,
//             })}
//           </p>

//           <p className="text-xs text-orange-100 mt-1">
//             Minimum withdrawal: ₹
//             {MIN_WITHDRAWAL.toLocaleString("en-IN")}
//           </p>
//         </div>

//         <Wallet size={36} className="opacity-80" />
//       </div>

//       {/* ============================================
//           TABS
//       ============================================ */}
//       <div className="flex gap-2 mb-6 border-b border-gray-200">
//         <button
//           onClick={() => setActiveTab("received")}
//           className={`px-5 py-3 text-sm font-semibold border-b-2 transition ${
//             activeTab === "received"
//               ? "border-[#FC6C26] text-[#FC6C26]"
//               : "border-transparent text-gray-500 hover:text-gray-700"
//           }`}
//         >
//           <span className="flex items-center gap-2">
//             <ArrowDownLeft size={16} />
//             Amount Received
//           </span>
//         </button>

//         <button
//           onClick={() => setActiveTab("withdrawals")}
//           className={`px-5 py-3 text-sm font-semibold border-b-2 transition ${
//             activeTab === "withdrawals"
//               ? "border-[#FC6C26] text-[#FC6C26]"
//               : "border-transparent text-gray-500 hover:text-gray-700"
//           }`}
//         >
//           <span className="flex items-center gap-2">
//             <ArrowUpRight size={16} />
//             Withdrawal Requests
//           </span>
//         </button>
//       </div>

//       {/* ============================================
//           AMOUNT RECEIVED
//       ============================================ */}
//       {activeTab === "received" && (
//         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full text-left">

//               <thead>
//                 <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
//                   <th className="px-6 py-4">Date</th>
//                   <th className="px-6 py-4">
//                     Organization
//                   </th>
//                   <th className="px-6 py-4 text-center">
//                     Cards
//                   </th>
//                   <th className="px-6 py-4 text-right">
//                     Purchase Amount
//                   </th>
//                   <th className="px-6 py-4 text-right">
//                     Your Commission
//                   </th>
//                   <th className="px-6 py-4 text-center">
//                     Status
//                   </th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-gray-50">
//                 {receivedTransactions.map((tx) => (
//                   <tr
//                     key={tx.id}
//                     className="hover:bg-orange-50/30 transition"
//                   >
//                     <td className="px-6 py-4 text-sm text-gray-600">
//                       {tx.date}
//                     </td>

//                     <td className="px-6 py-4 font-medium text-gray-900">
//                       {tx.organization}
//                     </td>

//                     <td className="px-6 py-4 text-center">
//                       {tx.cards}
//                     </td>

//                     <td className="px-6 py-4 text-right text-gray-700">
//                       ₹
//                       {tx.amount.toLocaleString("en-IN")}
//                     </td>

//                     <td className="px-6 py-4 text-right font-semibold text-green-600">
//                       + ₹
//                       {tx.commission.toLocaleString("en-IN")}
//                     </td>

//                     <td className="px-6 py-4 text-center">
//                       {statusBadge(tx.status)}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>

//             </table>
//           </div>
//         </div>
//       )}

//       {/* ============================================
//           WITHDRAWAL REQUESTS
//       ============================================ */}
//       {activeTab === "withdrawals" && (
//         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full text-left">

//               <thead>
//                 <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
//                   <th className="px-6 py-4">
//                     Request Date
//                   </th>

//                   <th className="px-6 py-4 text-right">
//                     Amount
//                   </th>

//                   <th className="px-6 py-4 text-center">
//                     Status
//                   </th>

//                   <th className="px-6 py-4">
//                     Processed Date
//                   </th>

//                   <th className="px-6 py-4">
//                     Remark
//                   </th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-gray-50">

//                 {withdrawalRequests.map((tx) => (
//                   <tr
//                     key={tx.id}
//                     className="hover:bg-orange-50/30 transition"
//                   >
//                     <td className="px-6 py-4 text-sm text-gray-600">
//                       {tx.date}
//                     </td>

//                     <td className="px-6 py-4 text-right font-semibold text-gray-900">
//                       ₹
//                       {tx.amount.toLocaleString("en-IN")}
//                     </td>

//                     <td className="px-6 py-4 text-center">
//                       {statusBadge(tx.status)}
//                     </td>

//                     <td className="px-6 py-4 text-sm text-gray-600">
//                       {tx.processed_date || "-"}
//                     </td>

//                     <td className="px-6 py-4 text-sm text-gray-500">
//                       {tx.remark}
//                     </td>
//                   </tr>
//                 ))}

//                 {withdrawalRequests.length === 0 && (
//                   <tr>
//                     <td
//                       colSpan={5}
//                       className="px-6 py-16 text-center text-gray-400"
//                     >
//                       No withdrawal requests yet
//                     </td>
//                   </tr>
//                 )}

//               </tbody>

//             </table>
//           </div>
//         </div>
//       )}

//       {/* ============================================
//           WITHDRAW MODAL
//       ============================================ */}
//       {showWithdrawModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">

//           <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">

//             {/* Modal Header */}
//             <div className="px-6 py-5 border-b border-gray-100">

//               <h2 className="text-xl font-bold text-gray-900">
//                 Request Withdrawal
//               </h2>

//               <p className="text-sm text-gray-500 mt-1">
//                 Available balance: ₹
//                 {walletBalance.toLocaleString("en-IN", {
//                   minimumFractionDigits: 2,
//                 })}
//               </p>

//               <p className="text-sm text-[#FC6C26] font-medium mt-1">
//                 Minimum withdrawal: ₹
//                 {MIN_WITHDRAWAL.toLocaleString("en-IN")}
//               </p>

//             </div>

//             {/* Modal Form */}
//             <form
//               onSubmit={handleWithdraw}
//               className="p-6 space-y-5"
//             >

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                   Amount (₹)
//                 </label>

//                 <input
//                   type="number"
//                   min={MIN_WITHDRAWAL}
//                   max={walletBalance}
//                   step="1"
//                   value={withdrawAmount}
//                   onChange={(e) =>
//                     setWithdrawAmount(e.target.value)
//                   }
//                   required
//                   className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#FC6C26] focus:ring-2 focus:ring-orange-100"
//                   placeholder="Enter amount (min ₹1,000)"
//                 />
//               </div>

//               {/* Minimum withdrawal information */}
//               <div className="bg-orange-50 border border-orange-100 rounded-xl p-3">
//                 <p className="text-sm text-orange-700">
//                   <span className="font-semibold">
//                     Minimum withdrawal:
//                   </span>{" "}
//                   ₹1,000
//                 </p>

//                 <p className="text-xs text-orange-600 mt-1">
//                   You can withdraw any amount from ₹1,000 up to your
//                   available wallet balance.
//                 </p>
//               </div>

//               <p className="text-xs text-gray-500">
//                 Amount will be transferred to your approved bank
//                 account after admin approval.
//               </p>

//               {/* Buttons */}
//               <div className="flex gap-3 pt-2">

//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowWithdrawModal(false);
//                     setWithdrawAmount("");
//                   }}
//                   className="flex-1 py-2.5 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="flex-1 py-2.5 bg-[#FC6C26] text-white font-semibold rounded-xl hover:bg-orange-600 disabled:opacity-60 flex items-center justify-center gap-2"
//                 >
//                   {loading && (
//                     <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                   )}

//                   {loading
//                     ? "Submitting..."
//                     : "Submit Request"}
//                 </button>

//               </div>

//             </form>

//           </div>
//         </div>
//       )}

//     </div>
//   );
// }

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  Wallet,
} from "lucide-react";
import { successAlert, errorAlert } from "../../utils/alert";

const DEFAULT_WALLET_BALANCE = 2450.75;
const MIN_WITHDRAWAL = 1000;

export default function AffiliateTransactions() {
  const [activeTab, setActiveTab] = useState("received");

  const [showWithdrawModal, setShowWithdrawModal] =
    useState(false);

  const [withdrawAmount, setWithdrawAmount] =
    useState("");

  const [loading, setLoading] = useState(false);

  // ============================================
  // WALLET BALANCE
  // ============================================

  const [walletBalance, setWalletBalance] = useState(
    DEFAULT_WALLET_BALANCE
  );

  // ============================================
  // WITHDRAWAL REQUESTS
  // ============================================

  const [withdrawalRequests, setWithdrawalRequests] =
    useState([
      {
        id: 101,
        date: "20/08/2026",
        amount: 1000,
        status: "approved",
        processed_date: "22/08/2026",
        remark: "Transferred to bank",
      },
      {
        id: 102,
        date: "12/08/2026",
        amount: 500,
        status: "pending",
        processed_date: null,
        remark: "Under review",
      },
      {
        id: 103,
        date: "01/08/2026",
        amount: 800,
        status: "rejected",
        processed_date: "03/08/2026",
        remark: "Incorrect bank details",
      },
    ]);

  // ============================================
  // LOAD WALLET BALANCE
  // ============================================

  useEffect(() => {
    const savedBalance = localStorage.getItem(
      "affiliateWalletBalance"
    );

    if (savedBalance !== null) {
      const parsedBalance = Number(savedBalance);

      if (!Number.isNaN(parsedBalance)) {
        setWalletBalance(parsedBalance);
      }
    } else {
      localStorage.setItem(
        "affiliateWalletBalance",
        DEFAULT_WALLET_BALANCE.toString()
      );
    }
  }, []);

  // ============================================
  // LISTEN FOR BALANCE CHANGES
  // ============================================

  useEffect(() => {
    const handleStorageChange = () => {
      const savedBalance = localStorage.getItem(
        "affiliateWalletBalance"
      );

      if (savedBalance !== null) {
        const parsedBalance = Number(savedBalance);

        if (!Number.isNaN(parsedBalance)) {
          setWalletBalance(parsedBalance);
        }
      }
    };

    window.addEventListener(
      "storage",
      handleStorageChange
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorageChange
      );
    };
  }, []);

  // ============================================
  // RECEIVED TRANSACTIONS
  // ============================================

  const receivedTransactions = [
    {
      id: 1,
      date: "25/08/2026",
      organization: "Brand Crest Digital Pvt Ltd",
      cards: 5,
      amount: 4500,
      commission: 450,
      status: "credited",
    },
    {
      id: 2,
      date: "18/08/2026",
      organization: "Shree Jee Trading Co",
      cards: 1,
      amount: 850,
      commission: 85,
      status: "credited",
    },
    {
      id: 3,
      date: "10/08/2026",
      organization: "Chandgothia Artha Saarathee",
      cards: 3,
      amount: 2700,
      commission: 270,
      status: "credited",
    },
    {
      id: 4,
      date: "05/08/2026",
      organization: "Brand Crest Digital Pvt Ltd",
      cards: 4,
      amount: 3600,
      commission: 360,
      status: "credited",
    },
  ];

  // ============================================
  // FORMAT MONEY
  // ============================================

  const formatMoney = (amount) => {
    return Number(amount).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // ============================================
  // HANDLE WITHDRAWAL
  // ============================================

//   const handleWithdraw = async (e) => {
//     e.preventDefault();

//     const amount = Number(withdrawAmount);

//     // --------------------------------------------
//     // VALIDATE AMOUNT
//     // --------------------------------------------

//     if (!amount || amount <= 0) {
//       return errorAlert(
//         "Invalid Amount",
//         "Please enter a valid withdrawal amount"
//       );
//     }

//     // --------------------------------------------
//     // MINIMUM WITHDRAWAL
//     // --------------------------------------------

//     if (amount < MIN_WITHDRAWAL) {
//       return errorAlert(
//         "Minimum Withdrawal",
//         `Minimum withdrawal amount is ₹${MIN_WITHDRAWAL.toLocaleString(
//           "en-IN"
//         )}`
//       );
//     }

//     // --------------------------------------------
//     // CHECK BALANCE
//     // --------------------------------------------

//     if (amount > walletBalance) {
//       return errorAlert(
//         "Insufficient Balance",
//         "Withdrawal amount exceeds your wallet balance"
//       );
//     }

//     setLoading(true);

//     try {
//       // ------------------------------------------
//       // STATIC API SIMULATION
//       // Replace this with API later
//       // ------------------------------------------

//       await new Promise((resolve) =>
//         setTimeout(resolve, 900)
//       );

//       // ------------------------------------------
//       // CALCULATE NEW BALANCE
//       // ------------------------------------------

//       const newBalance = walletBalance - amount;

//       // ------------------------------------------
//       // UPDATE STATE
//       // ------------------------------------------

//       setWalletBalance(newBalance);

//       // ------------------------------------------
//       // SAVE NEW BALANCE
//       // ------------------------------------------

//       localStorage.setItem(
//         "affiliateWalletBalance",
//         newBalance.toString()
//       );

//       // ------------------------------------------
//       // CREATE WITHDRAWAL REQUEST
//       // ------------------------------------------

//       const today = new Date();

//       const formattedDate =
//         String(today.getDate()).padStart(2, "0") +
//         "/" +
//         String(today.getMonth() + 1).padStart(2, "0") +
//         "/" +
//         today.getFullYear();

//       const newRequest = {
//         id: Date.now(),
//         date: formattedDate,
//         amount: amount,
//         status: "pending",
//         processed_date: null,
//         remark: "Under review",
//       };

//       setWithdrawalRequests((prev) => [
//         newRequest,
//         ...prev,
//       ]);

//       // ------------------------------------------
//       // SUCCESS MESSAGE
//       // ------------------------------------------

//       successAlert(
//         "Request Submitted",
//         `₹${formatMoney(
//           amount
//         )} withdrawal request submitted successfully.`
//       );

//       // ------------------------------------------
//       // CLOSE MODAL
//       // ------------------------------------------

//       setShowWithdrawModal(false);
//       setWithdrawAmount("");
//     } catch (error) {
//       console.error(
//         "Withdrawal error:",
//         error
//       );

//       errorAlert(
//         "Error",
//         "Failed to submit withdrawal request"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };
const handleWithdraw = async (e) => {
  e.preventDefault();

  const amount = Number(withdrawAmount);

  // ============================================================
  // VALIDATION
  // ============================================================

  if (!amount || amount <= 0) {
    return errorAlert(
      "Invalid Amount",
      "Please enter a valid withdrawal amount"
    );
  }

  if (amount < MIN_WITHDRAWAL) {
    return errorAlert(
      "Minimum Withdrawal",
      `Minimum withdrawal amount is ₹${MIN_WITHDRAWAL.toLocaleString(
        "en-IN"
      )}`
    );
  }

  // Get latest balance from localStorage
  const savedBalance = localStorage.getItem(
    "affiliateWalletBalance"
  );

  const currentBalance =
    savedBalance !== null
      ? Number(savedBalance)
      : walletBalance;

  if (amount > currentBalance) {
    return errorAlert(
      "Insufficient Balance",
      "Withdrawal amount exceeds your wallet balance"
    );
  }

  setLoading(true);

  try {
    // ==========================================================
    // CALCULATE NEW BALANCE
    // ==========================================================

    const newBalance =
      Number(currentBalance) - amount;

    // ==========================================================
    // SAVE NEW BALANCE
    // ==========================================================

    localStorage.setItem(
      "affiliateWalletBalance",
      newBalance.toString()
    );

    // ==========================================================
    // ADD WITHDRAWAL TRANSACTION
    // ==========================================================

    const savedTransactions =
      localStorage.getItem(
        "affiliateWalletTransactions"
      );

    let transactions = [];

    if (savedTransactions) {
      try {
        transactions =
          JSON.parse(savedTransactions);
      } catch {
        transactions = [];
      }
    }

    const newTransaction = {
      id: Date.now(),
      date: new Date().toLocaleDateString(
        "en-GB"
      ).replace(/\//g, "/"),
      description: "Wallet Withdrawal",
      type: "debit",
      amount: amount,
      status: "Pending",
    };

    const updatedTransactions = [
      newTransaction,
      ...transactions,
    ];

    localStorage.setItem(
      "affiliateWalletTransactions",
      JSON.stringify(
        updatedTransactions
      )
    );

    // ==========================================================
    // UPDATE ALL COMPONENTS IN SAME TAB
    // ==========================================================

    window.dispatchEvent(
      new Event("affiliateWalletUpdated")
    );

    // ==========================================================
    // STATIC API DELAY
    // ==========================================================

    await new Promise((resolve) =>
      setTimeout(resolve, 900)
    );

    successAlert(
      "Request Submitted",
      `₹${amount.toLocaleString(
        "en-IN"
      )} withdrawal request submitted successfully.`
    );

    setShowWithdrawModal(false);
    setWithdrawAmount("");

  } catch (error) {
    console.error(
      "Withdrawal error:",
      error
    );

    errorAlert(
      "Error",
      "Failed to submit withdrawal request"
    );
  } finally {
    setLoading(false);
  }
};

  // ============================================
  // STATUS BADGE
  // ============================================

  const statusBadge = (status) => {
    const map = {
      credited: {
        label: "Credited",
        class:
          "bg-green-100 text-green-700",
        icon: CheckCircle,
      },

      pending: {
        label: "Pending",
        class:
          "bg-yellow-100 text-yellow-700",
        icon: Clock,
      },

      approved: {
        label: "Approved",
        class:
          "bg-green-100 text-green-700",
        icon: CheckCircle,
      },

      rejected: {
        label: "Rejected",
        class:
          "bg-red-100 text-red-700",
        icon: XCircle,
      },
    };

    const s = map[status] || map.pending;

    const Icon = s.icon;

    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${s.class}`}
      >
        <Icon size={12} />
        {s.label}
      </span>
    );
  };

  // ============================================
  // OPEN WITHDRAW MODAL
  // ============================================

  const openWithdrawModal = () => {
    if (walletBalance < MIN_WITHDRAWAL) {
      return errorAlert(
        "Insufficient Balance",
        `You need at least ₹${MIN_WITHDRAWAL.toLocaleString(
          "en-IN"
        )} to make a withdrawal.`
      );
    }

    setShowWithdrawModal(true);
  };

  // ============================================
  // RETURN
  // ============================================

  return (
    <div className="w-full max-w-7xl mx-auto">

      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="px-6 lg:px-8 pt-6 lg:pt-8 mb-8">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Transactions
            </h1>

            <p className="text-gray-500 mt-1">
              Commission received & withdrawal requests
            </p>
          </div>

          {/* WITHDRAW BUTTON */}

          <button
            onClick={openWithdrawModal}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              px-5
              py-2.5
              bg-[#FC6C26]
              text-white
              font-semibold
              rounded-xl
              hover:bg-[#e95b17]
              transition
            "
          >
            <Plus size={18} />
            Request Withdrawal
          </button>

        </div>

      </div>

      {/* ==================================================
          WALLET SUMMARY
      ================================================== */}

      <div
        className="
          mb-8
          px-6
          lg:px-8
          py-7
          bg-white
          border-y
          border-gray-100
          shadow-sm
        "
      >

        <div>

          <p className="text-gray-500 text-sm font-medium">
            Available Balance
          </p>

          <p className="text-4xl lg:text-5xl font-bold text-gray-900 mt-1">
            ₹{formatMoney(walletBalance)}
          </p>

          <p className="text-sm text-gray-400 mt-2">
            Minimum withdrawal: ₹
            {MIN_WITHDRAWAL.toLocaleString("en-IN")}
          </p>

        </div>

      </div>

      {/* ==================================================
          TABS
      ================================================== */}

      <div className="px-6 lg:px-8">

        <div className="flex gap-2 mb-6 border-b border-gray-200">

          {/* RECEIVED */}

          <button
            onClick={() =>
              setActiveTab("received")
            }
            className={`
              px-5
              py-3
              text-sm
              font-semibold
              border-b-2
              transition
              ${
                activeTab === "received"
                  ? "border-[#FC6C26] text-[#FC6C26]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }
            `}
          >
            <span className="flex items-center gap-2">

              <ArrowDownLeft size={16} />

              Income Earned

            </span>
          </button>

          {/* WITHDRAWALS */}

          <button
            onClick={() =>
              setActiveTab("withdrawals")
            }
            className={`
              px-5
              py-3
              text-sm
              font-semibold
              border-b-2
              transition
              ${
                activeTab === "withdrawals"
                  ? "border-[#FC6C26] text-[#FC6C26]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }
            `}
          >
            <span className="flex items-center gap-2">

              <ArrowUpRight size={16} />

              Withdrawal Requests

            </span>
          </button>

        </div>

        {/* ==================================================
            AMOUNT RECEIVED
        ================================================== */}

        {activeTab === "received" && (

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

            <div className="overflow-x-auto">

              <table className="w-full text-left">

                <thead>

                  <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase">

                    <th className="px-6 py-4">
                      Date
                    </th>

                    <th className="px-6 py-4">
                      Organization
                    </th>

                    <th className="px-6 py-4 text-center">
                      Cards
                    </th>

                    <th className="px-6 py-4 text-right">
                      Purchase Amount
                    </th>

                    <th className="px-6 py-4 text-right">
                      Your Commission
                    </th>

                    <th className="px-6 py-4 text-center">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-gray-50">

                  {receivedTransactions.map(
                    (tx) => (

                      <tr
                        key={tx.id}
                        className="hover:bg-orange-50/30 transition"
                      >

                        <td className="px-6 py-4 text-sm text-gray-600">
                          {tx.date}
                        </td>

                        <td className="px-6 py-4 font-medium text-gray-900">
                          {tx.organization}
                        </td>

                        <td className="px-6 py-4 text-center">
                          {tx.cards}
                        </td>

                        <td className="px-6 py-4 text-right text-gray-700">
                          ₹
                          {tx.amount.toLocaleString(
                            "en-IN"
                          )}
                        </td>

                        <td className="px-6 py-4 text-right font-semibold text-green-600">
                          + ₹
                          {tx.commission.toLocaleString(
                            "en-IN"
                          )}
                        </td>

                        <td className="px-6 py-4 text-center">
                          {statusBadge(
                            tx.status
                          )}
                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>

        )}

        {/* ==================================================
            WITHDRAWAL REQUESTS
        ================================================== */}

        {activeTab === "withdrawals" && (

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

            <div className="overflow-x-auto">

              <table className="w-full text-left">

                <thead>

                  <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase">

                    <th className="px-6 py-4">
                      Request Date
                    </th>

                    <th className="px-6 py-4 text-right">
                      Amount
                    </th>

                    <th className="px-6 py-4 text-center">
                      Status
                    </th>

                    <th className="px-6 py-4">
                      Processed Date
                    </th>

                    <th className="px-6 py-4">
                      Remark
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-gray-50">

                  {withdrawalRequests.map(
                    (tx) => (

                      <tr
                        key={tx.id}
                        className="hover:bg-orange-50/30 transition"
                      >

                        <td className="px-6 py-4 text-sm text-gray-600">
                          {tx.date}
                        </td>

                        <td className="px-6 py-4 text-right font-semibold text-gray-900">
                          ₹
                          {tx.amount.toLocaleString(
                            "en-IN"
                          )}
                        </td>

                        <td className="px-6 py-4 text-center">
                          {statusBadge(
                            tx.status
                          )}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600">
                          {tx.processed_date ||
                            "-"}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-500">
                          {tx.remark}
                        </td>

                      </tr>

                    )
                  )}

                  {withdrawalRequests.length ===
                    0 && (

                    <tr>

                      <td
                        colSpan={5}
                        className="px-6 py-16 text-center text-gray-400"
                      >
                        No withdrawal requests yet
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>

        )}

      </div>

      {/* ==================================================
          WITHDRAW MODAL
      ================================================== */}

      {showWithdrawModal && (

        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/50
            backdrop-blur-sm
            px-4
          "
        >

          <div
            className="
              bg-white
              rounded-2xl
              w-full
              max-w-md
              shadow-2xl
              overflow-hidden
            "
          >

            {/* ==================================================
                MODAL HEADER
            ================================================== */}

            <div className="px-6 py-5 border-b border-gray-100">

              <h2 className="text-xl font-bold text-gray-900">
                Request Withdrawal
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Available balance: ₹
                {formatMoney(walletBalance)}
              </p>

              <p className="text-sm text-[#FC6C26] font-medium mt-1">
                Minimum withdrawal: ₹
                {MIN_WITHDRAWAL.toLocaleString(
                  "en-IN"
                )}
              </p>

            </div>

            {/* ==================================================
                MODAL FORM
            ================================================== */}

            <form
              onSubmit={handleWithdraw}
              className="p-6 space-y-5"
            >

              {/* AMOUNT */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Amount (₹)
                </label>

                <input
                  type="number"
                  min={MIN_WITHDRAWAL}
                  max={walletBalance}
                  step="1"
                  value={withdrawAmount}
                  onChange={(e) =>
                    setWithdrawAmount(
                      e.target.value
                    )
                  }
                  required
                  className="
                    w-full
                    border
                    border-gray-200
                    rounded-xl
                    px-4
                    py-3
                    outline-none
                    focus:border-[#FC6C26]
                    focus:ring-2
                    focus:ring-orange-100
                  "
                  placeholder="Enter amount"
                />

              </div>

              {/* MINIMUM INFO */}

              <div
                className="
                  bg-orange-50
                  border
                  border-orange-100
                  rounded-xl
                  p-3
                "
              >

                <p className="text-sm text-orange-700">

                  <span className="font-semibold">
                    Minimum withdrawal:
                  </span>{" "}

                  ₹
                  {MIN_WITHDRAWAL.toLocaleString(
                    "en-IN"
                  )}

                </p>

                <p className="text-xs text-orange-600 mt-1">

                  You can withdraw any amount from ₹
                  {MIN_WITHDRAWAL.toLocaleString(
                    "en-IN"
                  )}{" "}
                  up to your available wallet balance.

                </p>

              </div>

              {/* INFO */}

              <p className="text-xs text-gray-500">

                Amount will be transferred to your
                approved bank account after admin
                approval.

              </p>

              {/* ==================================================
                  BUTTONS
              ================================================== */}

              <div className="flex gap-3 pt-2">

                {/* CANCEL */}

                <button
                  type="button"
                  onClick={() => {
                    setShowWithdrawModal(false);
                    setWithdrawAmount("");
                  }}
                  className="
                    flex-1
                    py-2.5
                    border
                    border-gray-200
                    rounded-xl
                    font-medium
                    text-gray-700
                    hover:bg-gray-50
                    transition
                  "
                >
                  Cancel
                </button>

                {/* SUBMIT */}

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    flex-1
                    py-2.5
                    bg-[#FC6C26]
                    text-white
                    font-semibold
                    rounded-xl
                    hover:bg-[#e95b17]
                    disabled:opacity-60
                    flex
                    items-center
                    justify-center
                    gap-2
                    transition
                  "
                >

                  {loading && (
                    <span
                      className="
                        w-4
                        h-4
                        border-2
                        border-white
                        border-t-transparent
                        rounded-full
                        animate-spin
                      "
                    />
                  )}

                  {loading
                    ? "Submitting..."
                    : "Submit Request"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}