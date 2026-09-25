// import { useEffect, useState } from "react";
// import {
//   Wallet,
//   ArrowDownLeft,
//   ArrowUpRight,
//   Plus,
//   CheckCircle,
//   Clock,
//   XCircle,
//   Loader2,
//   X,
// } from "lucide-react";

// import api from "../../services/api";

// const DEFAULT_MIN_WITHDRAWAL = 5;

// export default function Transactions() {
//   // ============================================================
//   // STATE
//   // ============================================================

//   const [activeTab, setActiveTab] = useState("received");

//   const [walletBalance, setWalletBalance] = useState(0);

//   const [minimumWithdrawal, setMinimumWithdrawal] = useState(
//     DEFAULT_MIN_WITHDRAWAL
//   );

//   const [incomeTransactions, setIncomeTransactions] = useState([]);

//   const [withdrawalRequests, setWithdrawalRequests] = useState([]);

//   const [loading, setLoading] = useState(true);

//   const [withdrawalLoading, setWithdrawalLoading] =
//     useState(false);

//   const [showWithdrawModal, setShowWithdrawModal] =
//     useState(false);

//   const [withdrawAmount, setWithdrawAmount] =
//     useState("");

//   const [error, setError] = useState("");

//   const [pagination, setPagination] = useState({
//     current_page: 1,
//     per_page: 10,
//     total: 0,
//     last_page: 1,
//   });

//   // ============================================================
//   // LOAD TRANSACTIONS
//   // ============================================================

//   const loadTransactions = async (page = 1) => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await api.get(
//         "/affiliate/transactions",
//         {
//           params: {
//             type: "income",
//             page,
//             per_page: 10,
//           },
//         }
//       );

//       if (!response.data?.status) {
//         throw new Error(
//           response.data?.message ||
//             "Unable to fetch transactions."
//         );
//       }

//       const data = response.data?.data;

//       // --------------------------------------------------------
//       // AVAILABLE BALANCE
//       // --------------------------------------------------------

//       setWalletBalance(
//         Number(data?.available_balance || 0)
//       );

//       // --------------------------------------------------------
//       // MINIMUM WITHDRAWAL
//       // --------------------------------------------------------

//       // setMinimumWithdrawal(
//       //   Number(
//       //     data?.minimum_withdrawal ||
//       //       DEFAULT_MIN_WITHDRAWAL
//       //   )
//       // );

//       setMinimumWithdrawal(5)

//       // --------------------------------------------------------
//       // INCOME
//       // --------------------------------------------------------

//       setIncomeTransactions(
//         data?.income?.data || []
//       );

//       // --------------------------------------------------------
//       // PAGINATION
//       // --------------------------------------------------------

//       setPagination({
//         current_page:
//           data?.income?.current_page || 1,

//         per_page:
//           data?.income?.per_page || 10,

//         total:
//           data?.income?.total || 0,

//         last_page:
//           data?.income?.last_page || 1,
//       });

//     } catch (err) {
//       console.error(
//         "Transactions API error:",
//         err
//       );

//       setError(
//         err?.response?.data?.message ||
//           err?.message ||
//           "Unable to load transactions."
//       );

//       setIncomeTransactions([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ============================================================
//   // INITIAL LOAD
//   // ============================================================

//   useEffect(() => {
//     loadTransactions(1);
//   }, []);

//   // ============================================================
//   // FORMAT MONEY
//   // ============================================================

//   const formatMoney = (amount) => {
//     return Number(amount || 0).toLocaleString(
//       "en-IN",
//       {
//         minimumFractionDigits: 2,
//         maximumFractionDigits: 2,
//       }
//     );
//   };

//   // ============================================================
//   // WITHDRAW MODAL
//   // ============================================================

//   const openWithdrawModal = () => {
//     if (walletBalance < minimumWithdrawal) {
//       alert(
//         `Minimum withdrawal amount is ₹${formatMoney(
//           minimumWithdrawal
//         )}`
//       );

//       return;
//     }

//     setWithdrawAmount("");
//     setShowWithdrawModal(true);
//   };

//   const closeWithdrawModal = () => {
//     if (withdrawalLoading) {
//       return;
//     }

//     setShowWithdrawModal(false);
//     setWithdrawAmount("");
//   };

//   // ============================================================
//   // WITHDRAW
//   // ============================================================

//   const handleWithdraw = async (e) => {
//     e.preventDefault();

//     const amount = Number(withdrawAmount);

//     // ----------------------------------------------------------
//     // VALIDATION
//     // ----------------------------------------------------------

//     if (!amount || amount <= 0) {
//       alert(
//         "Please enter a valid withdrawal amount."
//       );

//       return;
//     }

//     if (amount < minimumWithdrawal) {
//       alert(
//         `Minimum withdrawal amount is ₹${formatMoney(
//           minimumWithdrawal
//         )}`
//       );

//       return;
//     }

//     if (amount > walletBalance) {
//       alert(
//         "Withdrawal amount exceeds your available balance."
//       );

//       return;
//     }

//     try {
//       setWithdrawalLoading(true);

//       /*
//       |--------------------------------------------------------------------------
//       | IMPORTANT
//       |--------------------------------------------------------------------------
//       | Replace this endpoint with your actual withdrawal
//       | request API when that API is ready.
//       */

//       const response = await api.post(
//         "/affiliate/withdraw-request",
//         {
//           amount: amount,
//         }
//       );

//       if (!response.data?.status) {
//         throw new Error(
//           response.data?.message ||
//             "Withdrawal request failed."
//         );
//       }

//       alert(
//         `₹${formatMoney(
//           amount
//         )} withdrawal request submitted successfully.`
//       );

//       setShowWithdrawModal(false);
//       setWithdrawAmount("");

//       // Reload balance + transactions
//       await loadTransactions(
//         pagination.current_page
//       );

//     } catch (err) {
//       console.error(
//         "Withdrawal error:",
//         err
//       );

//       alert(
//         err?.response?.data?.message ||
//           err?.message ||
//           "Failed to submit withdrawal request."
//       );
//     } finally {
//       setWithdrawalLoading(false);
//     }
//   };

//   // ============================================================
//   // STATUS BADGE
//   // ============================================================

//   const statusBadge = (status) => {
//     const normalizedStatus = String(
//       status || ""
//     ).toLowerCase();

//     const map = {
//       credited: {
//         label: "Credited",
//         class:
//           "bg-green-100 text-green-700",
//         icon: CheckCircle,
//       },

//       completed: {
//         label: "Completed",
//         class:
//           "bg-green-100 text-green-700",
//         icon: CheckCircle,
//       },

//       approved: {
//         label: "Approved",
//         class:
//           "bg-green-100 text-green-700",
//         icon: CheckCircle,
//       },

//       pending: {
//         label: "Pending",
//         class:
//           "bg-yellow-100 text-yellow-700",
//         icon: Clock,
//       },

//       rejected: {
//         label: "Rejected",
//         class:
//           "bg-red-100 text-red-700",
//         icon: XCircle,
//       },

//       failed: {
//         label: "Failed",
//         class:
//           "bg-red-100 text-red-700",
//         icon: XCircle,
//       },
//     };

//     const current =
//       map[normalizedStatus] ||
//       map.pending;

//     const Icon = current.icon;

//     return (
//       <span
//         className={`
//           inline-flex
//           items-center
//           gap-1
//           px-2.5
//           py-1
//           rounded-full
//           text-xs
//           font-semibold
//           ${current.class}
//         `}
//       >
//         <Icon size={12} />

//         {current.label}
//       </span>
//     );
//   };

//   // ============================================================
//   // PAGE CHANGE
//   // ============================================================

//   const handlePageChange = (page) => {
//     if (
//       page < 1 ||
//       page > pagination.last_page
//     ) {
//       return;
//     }

//     loadTransactions(page);
//   };

//   // ============================================================
//   // RENDER
//   // ============================================================

//   return (
//     <div className="w-full max-w-7xl mx-auto">

//       {/* ======================================================
//           HEADER
//       ======================================================= */}

//       <div className="px-6 lg:px-8 pt-6 lg:pt-8 mb-8">

//         <div
//           className="
//             flex
//             flex-col
//             sm:flex-row
//             sm:items-center
//             sm:justify-between
//             gap-4
//           "
//         >

//           <div>

//             <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
//               Transactions
//             </h1>

//             <p className="text-gray-500 mt-1">
//               Commission received & withdrawal requests 
//             </p>

//           </div>


//           {/* ==================================================
//               WITHDRAW BUTTON
//           =================================================== */}

//           <button
//             onClick={openWithdrawModal}
//             disabled={loading}
//             className="
//               inline-flex
//               items-center
//               justify-center
//               gap-2
//               px-5
//               py-2.5
//               bg-[#FC6C26]
//               text-white
//               font-semibold
//               rounded-xl
//               hover:bg-orange-600
//               transition
//               disabled:opacity-50
//               disabled:cursor-not-allowed
//             "
//           >

//             <Plus size={18} />

//             Request Withdrawal

//           </button>

//         </div>

//       </div>


//       {/* ======================================================
//           BALANCE
//       ======================================================= */}

//       <div
//         className="
//           mx-6
//           lg:mx-8
//           mb-8
//           bg-white
//           border
//           border-gray-100
//           shadow-sm
//           px-6
//           lg:px-8
//           py-7
//         "
//       >

//         <p className="text-gray-500 text-sm font-medium">
//           Available Balance
//         </p>

//         <p className="text-4xl lg:text-5xl font-bold text-gray-900 mt-1">

//           ₹{formatMoney(walletBalance)}

//         </p>

//         <p className="text-sm text-gray-400 mt-2">

//           Minimum withdrawal: ₹
//           {formatMoney(minimumWithdrawal)}

//         </p>

//       </div>


//       {/* ======================================================
//           ERROR
//       ======================================================= */}

//       {error && (

//         <div className="mx-6 lg:mx-8 mb-6">

//           <div
//             className="
//               bg-red-50
//               border
//               border-red-200
//               rounded-xl
//               px-4
//               py-3
//               text-sm
//               text-red-600
//             "
//           >
//             {error}
//           </div>

//         </div>

//       )}


//       {/* ======================================================
//           TABS
//       ======================================================= */}

//       <div className="px-6 lg:px-8">

//         <div className="flex gap-2 mb-6 border-b border-gray-200">

//           {/* ==================================================
//               INCOME
//           =================================================== */}

//           <button
//             onClick={() =>
//               setActiveTab("received")
//             }
//             className={`
//               px-5
//               py-3
//               text-sm
//               font-semibold
//               border-b-2
//               transition
//               ${
//                 activeTab === "received"
//                   ? "border-[#FC6C26] text-[#FC6C26]"
//                   : "border-transparent text-gray-500 hover:text-gray-700"
//               }
//             `}
//           >

//             <span className="flex items-center gap-2">

//               <ArrowDownLeft size={16} />

//               Income Earned

//             </span>

//           </button>


//           {/* ==================================================
//               WITHDRAWALS
//           =================================================== */}

//           <button
//             onClick={() =>
//               setActiveTab("withdrawals")
//             }
//             className={`
//               px-5
//               py-3
//               text-sm
//               font-semibold
//               border-b-2
//               transition
//               ${
//                 activeTab === "withdrawals"
//                   ? "border-[#FC6C26] text-[#FC6C26]"
//                   : "border-transparent text-gray-500 hover:text-gray-700"
//               }
//             `}
//           >

//             <span className="flex items-center gap-2">

//               <ArrowUpRight size={16} />

//               Withdrawal Requests

//             </span>

//           </button>

//         </div>


//         {/* ====================================================
//             INCOME TAB
//         ===================================================== */}

//         {activeTab === "received" && (

//           <div
//             className="
//               bg-white
//               rounded-2xl
//               border
//               border-gray-100
//               shadow-sm
//               overflow-hidden
//             "
//           >

//             <div className="overflow-x-auto">

//               <table className="w-full text-left">

//                 <thead>

//                   <tr
//                     className="
//                       bg-gray-50
//                       border-b
//                       border-gray-200
//                       text-xs
//                       font-semibold
//                       text-gray-500
//                       uppercase
//                       tracking-wider
//                     "
//                   >

//                     <th className="px-6 py-4">
//                       DATE
//                     </th>

//                     <th className="px-6 py-4">
//                       ORGANIZATION
//                     </th>

//                     <th className="px-6 py-4 text-center">
//                       CARDS
//                     </th>

//                     <th className="px-6 py-4 text-right">
//                       PURCHASE AMOUNT
//                     </th>

//                     <th className="px-6 py-4 text-right">
//                       YOUR COMMISSION
//                     </th>

//                     <th className="px-6 py-4 text-center">
//                       STATUS
//                     </th>

//                   </tr>

//                 </thead>


//                 <tbody>

//                   {/* =================================================
//                       LOADING
//                   ================================================== */}

//                   {loading ? (

//                     <tr>

//                       <td
//                         colSpan={6}
//                         className="px-6 py-16 text-center"
//                       >

//                         <div className="flex flex-col items-center">

//                           <Loader2
//                             size={32}
//                             className="
//                               animate-spin
//                               text-[#FC6C26]
//                             "
//                           />

//                           <p className="text-sm text-gray-500 mt-3">
//                             Loading transactions...
//                           </p>

//                         </div>

//                       </td>

//                     </tr>

//                   ) : incomeTransactions.length > 0 ? (

//                     /* =================================================
//                        DATA
//                     ================================================== */

//                     incomeTransactions.map(
//                       (transaction) => (

//                         <tr
//                           key={transaction.id}
//                           className="
//                             border-b
//                             border-gray-100
//                             hover:bg-orange-50/30
//                             transition
//                           "
//                         >

//                           {/* DATE */}

//                           <td className="px-6 py-5 text-sm text-gray-700">

//                             {transaction.display_date ||
//                               transaction.date ||
//                               "-"}

//                           </td>


//                           {/* ORGANIZATION */}

//                           <td className="px-6 py-5">

//                             <p className="text-sm font-semibold text-gray-900">

//                               {transaction.organization ||
//                                 "-"}

//                             </p>

//                           </td>


//                           {/* CARDS */}

//                           <td className="px-6 py-5 text-center">

//                             <span className="text-sm text-gray-700">

//                               {transaction.cards ?? 0}

//                             </span>

//                           </td>


//                           {/* PURCHASE AMOUNT */}

//                           <td className="px-6 py-5 text-right">

//                             <span className="text-sm font-medium text-gray-900">

//                               {transaction.formatted_purchase_amount ||
//                                 `₹${formatMoney(
//                                   transaction.purchase_amount
//                                 )}`}

//                             </span>

//                           </td>


//                           {/* COMMISSION */}

//                           <td className="px-6 py-5 text-right">

//                             <span className="text-sm font-semibold text-green-600">

//                               {transaction.formatted_commission ||
//                                 `+ ₹${formatMoney(
//                                   transaction.commission
//                                 )}`}

//                             </span>

//                           </td>


//                           {/* STATUS */}

//                           <td className="px-6 py-5 text-center">

//                             {statusBadge(
//                               transaction.status
//                             )}

//                           </td>

//                         </tr>

//                       )
//                     )

//                   ) : (

//                     <tr>

//                       <td
//                         colSpan={6}
//                         className="px-6 py-16 text-center"
//                       >

//                         <Wallet
//                           size={40}
//                           className="mx-auto text-gray-300"
//                         />

//                         <p className="text-gray-500 mt-3">
//                           No income transactions found
//                         </p>

//                       </td>

//                     </tr>

//                   )}

//                 </tbody>

//               </table>

//             </div>


//             {/* ==================================================
//                 PAGINATION
//             =================================================== */}

//             {!loading &&
//               incomeTransactions.length > 0 &&
//               pagination.last_page > 1 && (

//                 <div
//                   className="
//                     flex
//                     items-center
//                     justify-between
//                     px-6
//                     py-4
//                     border-t
//                     border-gray-100
//                   "
//                 >

//                   <p className="text-sm text-gray-500">

//                     Page{" "}
//                     <strong>
//                       {pagination.current_page}
//                     </strong>{" "}
//                     of{" "}
//                     <strong>
//                       {pagination.last_page}
//                     </strong>

//                   </p>


//                   <div className="flex gap-2">

//                     <button
//                       onClick={() =>
//                         handlePageChange(
//                           pagination.current_page - 1
//                         )
//                       }
//                       disabled={
//                         pagination.current_page <= 1
//                       }
//                       className="
//                         px-4
//                         py-2
//                         text-sm
//                         rounded-lg
//                         border
//                         border-gray-200
//                         hover:bg-gray-50
//                         disabled:opacity-40
//                       "
//                     >
//                       Previous
//                     </button>


//                     <button
//                       onClick={() =>
//                         handlePageChange(
//                           pagination.current_page + 1
//                         )
//                       }
//                       disabled={
//                         pagination.current_page >=
//                         pagination.last_page
//                       }
//                       className="
//                         px-4
//                         py-2
//                         text-sm
//                         rounded-lg
//                         border
//                         border-gray-200
//                         hover:bg-gray-50
//                         disabled:opacity-40
//                       "
//                     >
//                       Next
//                     </button>

//                   </div>

//                 </div>

//               )}

//           </div>

//         )}


//         {/* ======================================================
//             WITHDRAWAL TAB
//         ======================================================= */}

//         {activeTab === "withdrawals" && (

//           <div
//             className="
//               bg-white
//               rounded-2xl
//               border
//               border-gray-100
//               shadow-sm
//               overflow-hidden
//             "
//           >

//             <div className="overflow-x-auto">

//               <table className="w-full text-left">

//                 <thead>

//                   <tr
//                     className="
//                       bg-gray-50
//                       border-b
//                       border-gray-200
//                       text-xs
//                       font-semibold
//                       text-gray-500
//                       uppercase
//                     "
//                   >

//                     <th className="px-6 py-4">
//                       DATE
//                     </th>

//                     <th className="px-6 py-4">
//                       AMOUNT
//                     </th>

//                     <th className="px-6 py-4">
//                       STATUS
//                     </th>

//                     <th className="px-6 py-4">
//                       PROCESSED DATE
//                     </th>

//                     <th className="px-6 py-4">
//                       REMARK
//                     </th>

//                   </tr>

//                 </thead>


//                 <tbody>

//                   {withdrawalRequests.length > 0 ? (

//                     withdrawalRequests.map(
//                       (withdrawal) => (

//                         <tr
//                           key={withdrawal.id}
//                           className="border-b border-gray-100"
//                         >

//                           <td className="px-6 py-5 text-sm text-gray-700">
//                             {withdrawal.date || "-"}
//                           </td>

//                           <td className="px-6 py-5 text-sm font-semibold text-red-500">
//                             -₹
//                             {formatMoney(
//                               withdrawal.amount
//                             )}
//                           </td>

//                           <td className="px-6 py-5">
//                             {statusBadge(
//                               withdrawal.status
//                             )}
//                           </td>

//                           <td className="px-6 py-5 text-sm text-gray-600">
//                             {withdrawal.processed_date ||
//                               "-"}
//                           </td>

//                           <td className="px-6 py-5 text-sm text-gray-500">
//                             {withdrawal.remark ||
//                               "-"}
//                           </td>

//                         </tr>

//                       )
//                     )

//                   ) : (

//                     <tr>

//                       <td
//                         colSpan={5}
//                         className="px-6 py-16 text-center"
//                       >

//                         <ArrowUpRight
//                           size={40}
//                           className="mx-auto text-gray-300"
//                         />

//                         <p className="text-gray-500 mt-3">
//                           No withdrawal requests yet
//                         </p>

//                       </td>

//                     </tr>

//                   )}

//                 </tbody>

//               </table>

//             </div>

//           </div>

//         )}

//       </div>


//       {/* ======================================================
//           WITHDRAW MODAL
//       ======================================================= */}

//       {showWithdrawModal && (

//         <div
//           className="
//             fixed
//             inset-0
//             z-50
//             flex
//             items-center
//             justify-center
//             bg-black/50
//             backdrop-blur-sm
//             px-4
//           "
//         >

//           <div
//             className="
//               bg-white
//               rounded-2xl
//               w-full
//               max-w-md
//               shadow-2xl
//               overflow-hidden
//             "
//           >

//             {/* HEADER */}

//             <div
//               className="
//                 px-6
//                 py-5
//                 border-b
//                 border-gray-100
//                 flex
//                 items-center
//                 justify-between
//               "
//             >

//               <div>

//                 <h2 className="text-xl font-bold text-gray-900">
//                   Request Withdrawal
//                 </h2>

//                 <p className="text-sm text-gray-500 mt-1">
//                   Request a withdrawal from your wallet
//                 </p>

//               </div>


//               <button
//                 onClick={closeWithdrawModal}
//                 disabled={withdrawalLoading}
//                 className="
//                   w-9
//                   h-9
//                   rounded-lg
//                   flex
//                   items-center
//                   justify-center
//                   hover:bg-gray-100
//                   text-gray-500
//                   disabled:opacity-50
//                 "
//               >

//                 <X size={18} />

//               </button>

//             </div>


//             {/* FORM */}

//             <form
//               onSubmit={handleWithdraw}
//               className="p-6"
//             >

//               {/* AVAILABLE BALANCE */}

//               <div
//                 className="
//                   mb-5
//                   p-4
//                   bg-orange-50
//                   rounded-xl
//                   border
//                   border-orange-100
//                 "
//               >

//                 <p className="text-xs text-gray-500">
//                   Available Balance
//                 </p>

//                 <p className="text-xl font-bold text-gray-900 mt-1">
//                   ₹{formatMoney(walletBalance)}
//                 </p>

//               </div>


//               {/* AMOUNT */}

//               <label className="block">

//                 <span className="text-sm font-medium text-gray-700">
//                   Withdrawal Amount
//                 </span>

//                 <div className="relative mt-2">

//                   <span
//                     className="
//                       absolute
//                       left-4
//                       top-1/2
//                       -translate-y-1/2
//                       text-gray-500
//                       font-medium
//                     "
//                   >
//                     ₹
//                   </span>

//                   <input
//                     type="number"
//                     min={minimumWithdrawal}
//                     max={walletBalance}
//                     step="0.01"
//                     value={withdrawAmount}
//                     onChange={(e) =>
//                       setWithdrawAmount(
//                         e.target.value
//                       )
//                     }
//                     placeholder="Enter amount"
//                     disabled={withdrawalLoading}
//                     className="
//                       w-full
//                       rounded-xl
//                       border
//                       border-gray-300
//                       pl-9
//                       pr-4
//                       py-3
//                       text-sm
//                       outline-none
//                       focus:border-[#FC6C26]
//                       focus:ring-2
//                       focus:ring-orange-100
//                       disabled:bg-gray-100
//                     "
//                   />

//                 </div>

//               </label>


//               <p className="text-xs text-gray-400 mt-2">
//                 Minimum withdrawal: ₹
//                 {formatMoney(minimumWithdrawal)}
//               </p>


//               {/* ACTIONS */}

//               <div className="flex gap-3 mt-7">

//                 <button
//                   type="button"
//                   onClick={closeWithdrawModal}
//                   disabled={withdrawalLoading}
//                   className="
//                     flex-1
//                     px-4
//                     py-3
//                     rounded-xl
//                     border
//                     border-gray-200
//                     text-gray-700
//                     font-medium
//                     hover:bg-gray-50
//                     disabled:opacity-50
//                   "
//                 >
//                   Cancel
//                 </button>


//                 <button
//                   type="submit"
//                   disabled={withdrawalLoading}
//                   className="
//                     flex-1
//                     px-4
//                     py-3
//                     rounded-xl
//                     bg-[#FC6C26]
//                     text-white
//                     font-semibold
//                     hover:bg-orange-600
//                     disabled:opacity-50
//                     flex
//                     items-center
//                     justify-center
//                     gap-2
//                   "
//                 >

//                   {withdrawalLoading && (
//                     <Loader2
//                       size={17}
//                       className="animate-spin"
//                     />
//                   )}

//                   {withdrawalLoading
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
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  Plus,
  CheckCircle,
  Clock,
  XCircle,
  Loader2,
  X,
} from "lucide-react";

import api from "../../services/api";

const DEFAULT_MIN_WITHDRAWAL = 5;

export default function Transactions() {
  // ============================================================
  // STATE
  // ============================================================

  const [activeTab, setActiveTab] = useState("received");

  const [walletBalance, setWalletBalance] = useState(0);

  const [minimumWithdrawal, setMinimumWithdrawal] = useState(
    DEFAULT_MIN_WITHDRAWAL
  );

  const [incomeTransactions, setIncomeTransactions] = useState([]);

  const [withdrawalRequests, setWithdrawalRequests] = useState([]);

  const [loading, setLoading] = useState(true);

  const [withdrawalLoading, setWithdrawalLoading] =
    useState(false);

  const [showWithdrawModal, setShowWithdrawModal] =
    useState(false);

  const [withdrawAmount, setWithdrawAmount] =
    useState("");

  const [error, setError] = useState("");

  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 10,
    total: 0,
    last_page: 1,
  });

  // ============================================================
  // LOAD TRANSACTIONS
  // ============================================================

  const loadTransactions = async (page = 1) => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        "/affiliate/transactions",
        {
          params: {
            type: "all",
            page,
            per_page: 10,
          },
        }
      );

      if (!response.data?.status) {
        throw new Error(
          response.data?.message ||
            "Unable to fetch transactions."
        );
      }

      const data = response.data?.data;

      // --------------------------------------------------------
      // AVAILABLE BALANCE
      // --------------------------------------------------------

      setWalletBalance(
        Number(data?.available_balance || 0)
      );

      // --------------------------------------------------------
      // MINIMUM WITHDRAWAL
      // --------------------------------------------------------

      setMinimumWithdrawal(
        Number(
          data?.minimum_withdrawal ||
            DEFAULT_MIN_WITHDRAWAL
        )
      );

      // --------------------------------------------------------
      // COMBINED TRANSACTIONS
      // Includes commission + withdrawal transactions
      // --------------------------------------------------------

      setIncomeTransactions(
        data?.transactions?.data || []
      );

      // --------------------------------------------------------
      // WITHDRAWAL REQUESTS
      // --------------------------------------------------------

      setWithdrawalRequests(
        data?.withdrawals?.data || []
      );

      // --------------------------------------------------------
      // PAGINATION
      // --------------------------------------------------------

      setPagination({
        current_page:
          data?.transactions?.current_page || 1,

        per_page:
          data?.transactions?.per_page || 10,

        total:
          data?.transactions?.total || 0,

        last_page:
          data?.transactions?.last_page || 1,
      });

    } catch (err) {
      console.error(
        "Transactions API error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to load transactions."
      );

      setIncomeTransactions([]);
      setWithdrawalRequests([]);
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // INITIAL LOAD
  // ============================================================

  useEffect(() => {
    loadTransactions(1);
  }, []);

  // ============================================================
  // FORMAT MONEY
  // ============================================================

  const formatMoney = (amount) => {
    return Number(amount || 0).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );
  };

  // ============================================================
  // WITHDRAW MODAL
  // ============================================================

  const openWithdrawModal = () => {
    if (walletBalance < minimumWithdrawal) {
      alert(
        `Minimum withdrawal amount is ₹${formatMoney(
          minimumWithdrawal
        )}`
      );

      return;
    }

    setWithdrawAmount("");
    setShowWithdrawModal(true);
  };

  const closeWithdrawModal = () => {
    if (withdrawalLoading) {
      return;
    }

    setShowWithdrawModal(false);
    setWithdrawAmount("");
  };

  // ============================================================
  // WITHDRAW
  // ============================================================

  const handleWithdraw = async (e) => {
    e.preventDefault();

    const amount = Number(withdrawAmount);

    // ----------------------------------------------------------
    // VALIDATION
    // ----------------------------------------------------------

    if (!amount || amount <= 0) {
      alert(
        "Please enter a valid withdrawal amount."
      );

      return;
    }

    if (amount < minimumWithdrawal) {
      alert(
        `Minimum withdrawal amount is ₹${formatMoney(
          minimumWithdrawal
        )}`
      );

      return;
    }

    if (amount > walletBalance) {
      alert(
        "Withdrawal amount exceeds your available balance."
      );

      return;
    }

    try {
      setWithdrawalLoading(true);

      /*
      |--------------------------------------------------------------------------
      | IMPORTANT
      |--------------------------------------------------------------------------
      | Replace this endpoint with your actual withdrawal
      | request API when that API is ready.
      */

      const response = await api.post(
        "/affiliate/withdraw-request",
        {
          amount: amount,
        }
      );

      if (!response.data?.status) {
        throw new Error(
          response.data?.message ||
            "Withdrawal request failed."
        );
      }

      alert(
        `₹${formatMoney(
          amount
        )} withdrawal request submitted successfully.`
      );

      setShowWithdrawModal(false);
      setWithdrawAmount("");

      // Reload balance + transactions.
      // Page 1 makes the new withdrawal visible immediately.
      await loadTransactions(1);

    } catch (err) {
      console.error(
        "Withdrawal error:",
        err
      );

      alert(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to submit withdrawal request."
      );
    } finally {
      setWithdrawalLoading(false);
    }
  };

  // ============================================================
  // STATUS BADGE
  // ============================================================

  const statusBadge = (status) => {
    const normalizedStatus = String(
      status || ""
    ).toLowerCase();

    const map = {
      credited: {
        label: "Credited",
        class:
          "bg-green-100 text-green-700",
        icon: CheckCircle,
      },

      completed: {
        label: "Completed",
        class:
          "bg-green-100 text-green-700",
        icon: CheckCircle,
      },

      approved: {
        label: "Approved",
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

      rejected: {
        label: "Rejected",
        class:
          "bg-red-100 text-red-700",
        icon: XCircle,
      },

      failed: {
        label: "Failed",
        class:
          "bg-red-100 text-red-700",
        icon: XCircle,
      },
    };

    const current =
      map[normalizedStatus] ||
      map.pending;

    const Icon = current.icon;

    return (
      <span
        className={`
          inline-flex
          items-center
          gap-1
          px-2.5
          py-1
          rounded-full
          text-xs
          font-semibold
          ${current.class}
        `}
      >
        <Icon size={12} />

        {current.label}
      </span>
    );
  };

  // ============================================================
  // PAGE CHANGE
  // ============================================================

  const handlePageChange = (page) => {
    if (
      page < 1 ||
      page > pagination.last_page
    ) {
      return;
    }

    loadTransactions(page);
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="w-full max-w-7xl mx-auto">

      {/* ======================================================
          HEADER
      ======================================================= */}

      <div className="px-6 lg:px-8 pt-6 lg:pt-8 mb-8">

        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-4
          "
        >

          <div>

            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Transactions
            </h1>

            <p className="text-gray-500 mt-1">
              Commission received & withdrawal transactions
            </p>

          </div>


          {/* ==================================================
              WITHDRAW BUTTON
          =================================================== */}

          <button
            onClick={openWithdrawModal}
            disabled={loading}
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
              hover:bg-orange-600
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >

            <Plus size={18} />

            Request Withdrawal

          </button>

        </div>

      </div>


      {/* ======================================================
          BALANCE
      ======================================================= */}

      <div
        className="
          mx-6
          lg:mx-8
          mb-8
          bg-white
          border
          border-gray-100
          shadow-sm
          px-6
          lg:px-8
          py-7
        "
      >

        <p className="text-gray-500 text-sm font-medium">
          Available Balance
        </p>

        <p className="text-4xl lg:text-5xl font-bold text-gray-900 mt-1">

          ₹{formatMoney(walletBalance)}

        </p>

        <p className="text-sm text-gray-400 mt-2">

          Minimum withdrawal: ₹
          {formatMoney(minimumWithdrawal)}

        </p>

      </div>


      {/* ======================================================
          ERROR
      ======================================================= */}

      {error && (

        <div className="mx-6 lg:mx-8 mb-6">

          <div
            className="
              bg-red-50
              border
              border-red-200
              rounded-xl
              px-4
              py-3
              text-sm
              text-red-600
            "
          >
            {error}
          </div>

        </div>

      )}


      {/* ======================================================
          TABS
      ======================================================= */}

      <div className="px-6 lg:px-8">

        <div className="flex gap-2 mb-6 border-b border-gray-200">

          <button
            onClick={() => setActiveTab("received")}
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
              Transactions
            </span>
          </button>

          <button
            onClick={() => setActiveTab("withdrawals")}
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


        {/* ======================================================
            COMBINED TRANSACTIONS
        ======================================================= */}

        {activeTab === "received" && (

          <div
            className="
              bg-white
              rounded-2xl
              border
              border-gray-100
              shadow-sm
              overflow-hidden
            "
          >

            <div className="overflow-x-auto">

              <table className="w-full text-left">

                <thead>

                  <tr
                    className="
                      bg-gray-50
                      border-b
                      border-gray-200
                      text-xs
                      font-semibold
                      text-gray-500
                      uppercase
                      tracking-wider
                    "
                  >

                    <th className="px-6 py-4">
                      DATE
                    </th>

                    <th className="px-6 py-4">
                      TYPE
                    </th>

                    <th className="px-6 py-4">
                      DETAILS
                    </th>

                    <th className="px-6 py-4 text-center">
                      CARDS
                    </th>

                    <th className="px-6 py-4 text-right">
                      AMOUNT
                    </th>

                    <th className="px-6 py-4 text-center">
                      STATUS
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {loading ? (

                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-16 text-center"
                      >
                        <div className="flex flex-col items-center">
                          <Loader2
                            size={32}
                            className="animate-spin text-[#FC6C26]"
                          />
                          <p className="text-sm text-gray-500 mt-3">
                            Loading transactions...
                          </p>
                        </div>
                      </td>
                    </tr>

                  ) : incomeTransactions.length > 0 ? (

                    incomeTransactions.map((transaction) => {

                      const isWithdrawal =
                        transaction.type === "withdrawal";

                      return (
                        <tr
                          key={transaction.id}
                          className="
                            border-b
                            border-gray-100
                            hover:bg-orange-50/30
                            transition
                          "
                        >

                          <td className="px-6 py-5 text-sm text-gray-700">
                            {transaction.display_date ||
                              transaction.date ||
                              "-"}
                          </td>

                          <td className="px-6 py-5">
                            {isWithdrawal ? (
                              <span className="inline-flex items-center gap-1 text-sm font-semibold text-red-500">
                                <ArrowUpRight size={15} />
                                Withdrawal
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-sm font-semibold text-green-600">
                                <ArrowDownLeft size={15} />
                                Commission
                              </span>
                            )}
                          </td>

                          <td className="px-6 py-5">
                            <p className="text-sm font-semibold text-gray-900">
                              {isWithdrawal
                                ? "Withdrawal Request"
                                : transaction.organization || "-"}
                            </p>

                            {!isWithdrawal &&
                              transaction.purchase_amount != null && (
                                <p className="text-xs text-gray-400 mt-1">
                                  Purchase:{" "}
                                  {transaction.formatted_purchase_amount ||
                                    `₹${formatMoney(
                                      transaction.purchase_amount
                                    )}`}
                                </p>
                              )}

                            {isWithdrawal && transaction.remark && (
                              <p className="text-xs text-gray-400 mt-1">
                                {transaction.remark}
                              </p>
                            )}
                          </td>

                          <td className="px-6 py-5 text-center">
                            <span className="text-sm text-gray-700">
                              {isWithdrawal
                                ? "-"
                                : transaction.cards ?? 0}
                            </span>
                          </td>

                          <td className="px-6 py-5 text-right">
                            <span
                              className={`
                                text-sm
                                font-semibold
                                ${
                                  isWithdrawal
                                    ? "text-red-500"
                                    : "text-green-600"
                                }
                              `}
                            >
                              {transaction.formatted_amount ||
                                (isWithdrawal
                                  ? `- ₹${formatMoney(
                                      transaction.amount
                                    )}`
                                  : `+ ₹${formatMoney(
                                      transaction.commission
                                    )}`)}
                            </span>
                          </td>

                          <td className="px-6 py-5 text-center">
                            {statusBadge(transaction.status)}
                          </td>

                        </tr>
                      );
                    })

                  ) : (

                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-16 text-center"
                      >
                        <Wallet
                          size={40}
                          className="mx-auto text-gray-300"
                        />
                        <p className="text-gray-500 mt-3">
                          No transactions found
                        </p>
                      </td>
                    </tr>

                  )}

                </tbody>

              </table>

            </div>


            {!loading &&
              incomeTransactions.length > 0 &&
              pagination.last_page > 1 && (

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    px-6
                    py-4
                    border-t
                    border-gray-100
                  "
                >

                  <p className="text-sm text-gray-500">
                    Page{" "}
                    <strong>
                      {pagination.current_page}
                    </strong>{" "}
                    of{" "}
                    <strong>
                      {pagination.last_page}
                    </strong>
                  </p>

                  <div className="flex gap-2">

                    <button
                      onClick={() =>
                        handlePageChange(
                          pagination.current_page - 1
                        )
                      }
                      disabled={
                        pagination.current_page <= 1
                      }
                      className="
                        px-4
                        py-2
                        text-sm
                        rounded-lg
                        border
                        border-gray-200
                        hover:bg-gray-50
                        disabled:opacity-40
                      "
                    >
                      Previous
                    </button>

                    <button
                      onClick={() =>
                        handlePageChange(
                          pagination.current_page + 1
                        )
                      }
                      disabled={
                        pagination.current_page >=
                        pagination.last_page
                      }
                      className="
                        px-4
                        py-2
                        text-sm
                        rounded-lg
                        border
                        border-gray-200
                        hover:bg-gray-50
                        disabled:opacity-40
                      "
                    >
                      Next
                    </button>

                  </div>

                </div>
              )}

          </div>
        )}


        {/* ======================================================
            WITHDRAWAL TAB
        ======================================================= */}

        {activeTab === "withdrawals" && (

          <div
            className="
              bg-white
              rounded-2xl
              border
              border-gray-100
              shadow-sm
              overflow-hidden
            "
          >

            <div className="overflow-x-auto">

              <table className="w-full text-left">

                <thead>

                  <tr
                    className="
                      bg-gray-50
                      border-b
                      border-gray-200
                      text-xs
                      font-semibold
                      text-gray-500
                      uppercase
                    "
                  >

                    <th className="px-6 py-4">
                      DATE
                    </th>

                    <th className="px-6 py-4">
                      AMOUNT
                    </th>

                    <th className="px-6 py-4">
                      STATUS
                    </th>

                    <th className="px-6 py-4">
                      PROCESSED DATE
                    </th>

                    <th className="px-6 py-4">
                      REMARK
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {withdrawalRequests.length > 0 ? (

                    withdrawalRequests.map((withdrawal) => (

                      <tr
                        key={withdrawal.id}
                        className="border-b border-gray-100"
                      >

                        <td className="px-6 py-5 text-sm text-gray-700">
                          {withdrawal.display_date ||
                            withdrawal.date ||
                            "-"}
                        </td>

                        <td className="px-6 py-5 text-sm font-semibold text-red-500">
                          -₹
                          {formatMoney(
                            withdrawal.amount
                          )}
                        </td>

                        <td className="px-6 py-5">
                          {statusBadge(
                            withdrawal.status
                          )}
                        </td>

                        <td className="px-6 py-5 text-sm text-gray-600">
                          {withdrawal.processed_date ||
                            "-"}
                        </td>

                        <td className="px-6 py-5 text-sm text-gray-500">
                          {withdrawal.remark || "-"}
                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-16 text-center"
                      >
                        <ArrowUpRight
                          size={40}
                          className="mx-auto text-gray-300"
                        />
                        <p className="text-gray-500 mt-3">
                          No withdrawal requests yet
                        </p>
                      </td>
                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>
        )}

      </div>


      {/* ======================================================
          WITHDRAW MODAL
      ======================================================= */}

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

            {/* HEADER */}

            <div
              className="
                px-6
                py-5
                border-b
                border-gray-100
                flex
                items-center
                justify-between
              "
            >

              <div>

                <h2 className="text-xl font-bold text-gray-900">
                  Request Withdrawal
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Request a withdrawal from your wallet
                </p>

              </div>


              <button
                onClick={closeWithdrawModal}
                disabled={withdrawalLoading}
                className="
                  w-9
                  h-9
                  rounded-lg
                  flex
                  items-center
                  justify-center
                  hover:bg-gray-100
                  text-gray-500
                  disabled:opacity-50
                "
              >

                <X size={18} />

              </button>

            </div>


            {/* FORM */}

            <form
              onSubmit={handleWithdraw}
              className="p-6"
            >

              {/* AVAILABLE BALANCE */}

              <div
                className="
                  mb-5
                  p-4
                  bg-orange-50
                  rounded-xl
                  border
                  border-orange-100
                "
              >

                <p className="text-xs text-gray-500">
                  Available Balance
                </p>

                <p className="text-xl font-bold text-gray-900 mt-1">
                  ₹{formatMoney(walletBalance)}
                </p>

              </div>


              {/* AMOUNT */}

              <label className="block">

                <span className="text-sm font-medium text-gray-700">
                  Withdrawal Amount
                </span>

                <div className="relative mt-2">

                  <span
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-gray-500
                      font-medium
                    "
                  >
                    ₹
                  </span>

                  <input
                    type="number"
                    min={minimumWithdrawal}
                    max={walletBalance}
                    step="0.01"
                    value={withdrawAmount}
                    onChange={(e) =>
                      setWithdrawAmount(
                        e.target.value
                      )
                    }
                    placeholder="Enter amount"
                    disabled={withdrawalLoading}
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-300
                      pl-9
                      pr-4
                      py-3
                      text-sm
                      outline-none
                      focus:border-[#FC6C26]
                      focus:ring-2
                      focus:ring-orange-100
                      disabled:bg-gray-100
                    "
                  />

                </div>

              </label>


              <p className="text-xs text-gray-400 mt-2">
                Minimum withdrawal: ₹
                {formatMoney(minimumWithdrawal)}
              </p>


              {/* ACTIONS */}

              <div className="flex gap-3 mt-7">

                <button
                  type="button"
                  onClick={closeWithdrawModal}
                  disabled={withdrawalLoading}
                  className="
                    flex-1
                    px-4
                    py-3
                    rounded-xl
                    border
                    border-gray-200
                    text-gray-700
                    font-medium
                    hover:bg-gray-50
                    disabled:opacity-50
                  "
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  disabled={withdrawalLoading}
                  className="
                    flex-1
                    px-4
                    py-3
                    rounded-xl
                    bg-[#FC6C26]
                    text-white
                    font-semibold
                    hover:bg-orange-600
                    disabled:opacity-50
                    flex
                    items-center
                    justify-center
                    gap-2
                  "
                >

                  {withdrawalLoading && (
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                  )}

                  {withdrawalLoading
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