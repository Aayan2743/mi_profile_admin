

// import { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   Wallet,
//   Users,
//   ShoppingCart,
//   Copy,
//   Check,
//   Link as LinkIcon,
// } from "lucide-react";

// export default function AffiliateDashboard() {
//   const [copied, setCopied] = useState(false);
//   const [regFilter, setRegFilter] = useState("month");
//   const [purchaseFilter, setPurchaseFilter] = useState("month");

//   const [regDateFrom, setRegDateFrom] = useState("");
//   const [regDateTo, setRegDateTo] = useState("");

//   const [purchaseDateFrom, setPurchaseDateFrom] = useState("");
//   const [purchaseDateTo, setPurchaseDateTo] = useState("");

//   // Static data
//   const stats = {
//     wallet: 2450.75,

//     registrations: {
//       today: 3,
//       week: 12,
//       month: 47,
//     },

//     purchases: {
//       today: 2,
//       week: 8,
//       month: 31,
//     },
//   };

//   const referralLink =
//     "https://org.miprofile.in/register?ref=AFF001";

//   const copyLink = () => {
//     navigator.clipboard.writeText(referralLink);
//     setCopied(true);

//     setTimeout(() => {
//       setCopied(false);
//     }, 2000);
//   };

//   const getRegValue = () => {
//     if (regFilter === "today") return stats.registrations.today;
//     if (regFilter === "week") return stats.registrations.week;

//     return stats.registrations.month;
//   };

//   const getPurchaseValue = () => {
//     if (purchaseFilter === "today") return stats.purchases.today;
//     if (purchaseFilter === "week") return stats.purchases.week;

//     return stats.purchases.month;
//   };

//   return (
//     <div className="p-6 lg:p-8 max-w-7xl mx-auto">

//       {/* ================= HEADER ================= */}
//       <div className="flex items-start justify-between mb-8">

//         <div>
//           <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
//             Dashboard
//           </h1>

//           <p className="text-gray-500 mt-1">
//             Overview of your affiliate performance
//           </p>
//         </div>

//         {/* ================= TOP RIGHT WALLET BUTTON ================= */}
//         <Link
//           to="/affiliate/wallet"
//           className="
//             flex items-center gap-3
//             bg-white
//             border border-gray-200
//             rounded-xl
//             px-4 py-3
//             shadow-sm
//             hover:shadow-md
//             hover:border-orange-300
//             transition
//           "
//         >
//           <div
//             className="
//               w-10 h-10
//               rounded-lg
//               bg-orange-50
//               flex items-center justify-center
//             "
//           >
//             <Wallet
//               size={21}
//               className="text-[#FC6C26]"
//             />
//           </div>

//           <div className="hidden sm:block text-left">
//             <p className="text-xs text-gray-500">
//               Wallet
//             </p>

//             {/* <p className="font-bold text-gray-900">
//               ₹
//               {stats.wallet.toLocaleString("en-IN", {
//                 minimumFractionDigits: 2,
//               })}
//             </p> */}
//           </div>
//         </Link>
//       </div>

//       {/* ================= WALLET BALANCE ================= */}
//       <Link
//         to="/affiliate/wallet"
//         className="
//           block
//           mb-8
//           p-6
//           bg-gradient-to-r
//           from-[#FC6C26]
//           to-orange-600
//           rounded-2xl
//           text-white
//           shadow-lg
//           hover:shadow-xl
//           transition
//           group
//         "
//       >
//         <div className="flex items-center justify-between">

//           <div>
//             <p className="text-orange-100 text-sm font-medium">
//               Wallet Balance
//             </p>

//             <p className="text-3xl lg:text-4xl font-bold mt-1">
//               ₹
//               {stats.wallet.toLocaleString("en-IN", {
//                 minimumFractionDigits: 2,
//               })}
//             </p>

           
//           </div>

//           <div
//             className="
//               w-16 h-16
//               bg-white/20
//               rounded-2xl
//               flex items-center justify-center
//             "
//           >
//             <Wallet size={32} />
//           </div>
//         </div>
//       </Link>

//       {/* ================= REFERRAL LINK ================= */}
//       <div className="mb-8 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">

//         <div className="flex items-center gap-2 mb-3">

//           <LinkIcon
//             size={18}
//             className="text-[#FC6C26]"
//           />

//           <h3 className="font-semibold text-gray-900">
//             Your Referral Link
//           </h3>

//         </div>

//         <p className="text-sm text-gray-500 mb-3">
//           Share this link to register new organizations under you
//         </p>

//         <div className="flex flex-col sm:flex-row gap-3">

//           <input
//             type="text"
//             value={referralLink}
//             readOnly
//             className="
//               flex-1
//               bg-gray-50
//               border border-gray-200
//               rounded-xl
//               px-4 py-3
//               text-sm
//               text-gray-700
//             "
//           />

//           <button
//             onClick={copyLink}
//             className="
//               flex items-center
//               justify-center
//               gap-2
//               px-6 py-3
//               bg-[#FC6C26]
//               text-white
//               rounded-xl
//               font-medium
//               hover:bg-orange-600
//               transition
//               shrink-0
//             "
//           >
//             {copied ? (
//               <Check size={18} />
//             ) : (
//               <Copy size={18} />
//             )}

//             {copied ? "Copied!" : "Copy Link"}
//           </button>

//         </div>
//       </div>

//       {/* ================= STATS ================= */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

//         {/* REGISTRATIONS */}
//         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

//           <div className="flex items-center gap-3 mb-5">

//             <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center">
//               <Users
//                 size={22}
//                 className="text-blue-600"
//               />
//             </div>

//             <h3 className="font-semibold text-gray-900 text-lg">
//               Registrations
//             </h3>

//           </div>

//           <div className="flex flex-wrap gap-2 mb-5">

//             {[
//               {
//                 key: "today",
//                 label: "Today",
//               },
//               {
//                 key: "week",
//                 label: "This Week",
//               },
//               {
//                 key: "month",
//                 label: "This Month",
//               },
//               {
//                 key: "custom",
//                 label: "Custom",
//               },
//             ].map((item) => (

//               <button
//                 key={item.key}
//                 onClick={() => setRegFilter(item.key)}
//                 className={`
//                   px-4 py-1.5
//                   rounded-lg
//                   text-sm
//                   font-medium
//                   transition
//                   ${
//                     regFilter === item.key
//                       ? "bg-[#FC6C26] text-white"
//                       : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                   }
//                 `}
//               >
//                 {item.label}
//               </button>

//             ))}

//           </div>

//           {regFilter === "custom" && (

//             <div className="flex flex-col sm:flex-row gap-3 mb-5">

//               <div className="flex-1">

//                 <label className="text-xs text-gray-500 mb-1 block">
//                   From
//                 </label>

//                 <input
//                   type="date"
//                   value={regDateFrom}
//                   onChange={(e) =>
//                     setRegDateFrom(e.target.value)
//                   }
//                   className="
//                     w-full
//                     border border-gray-200
//                     rounded-lg
//                     px-3 py-2
//                     text-sm
//                     outline-none
//                     focus:border-[#FC6C26]
//                   "
//                 />

//               </div>

//               <div className="flex-1">

//                 <label className="text-xs text-gray-500 mb-1 block">
//                   To
//                 </label>

//                 <input
//                   type="date"
//                   value={regDateTo}
//                   onChange={(e) =>
//                     setRegDateTo(e.target.value)
//                   }
//                   className="
//                     w-full
//                     border border-gray-200
//                     rounded-lg
//                     px-3 py-2
//                     text-sm
//                     outline-none
//                     focus:border-[#FC6C26]
//                   "
//                 />

//               </div>

//             </div>

//           )}

//           <div className="text-center py-4 bg-blue-50 rounded-xl">

//             <p className="text-4xl font-bold text-blue-600">
//               {getRegValue()}
//             </p>

//             <p className="text-sm text-blue-500 mt-1">
//               {regFilter === "today"
//                 ? "Today"
//                 : regFilter === "week"
//                 ? "This Week"
//                 : regFilter === "month"
//                 ? "This Month"
//                 : "Selected Period"}
//             </p>

//           </div>

//         </div>

//         {/* PURCHASES */}
//         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

//           <div className="flex items-center gap-3 mb-5">

//             <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center">
//               <ShoppingCart
//                 size={22}
//                 className="text-green-600"
//               />
//             </div>

//             <h3 className="font-semibold text-gray-900 text-lg">
//               Purchases
//             </h3>

//           </div>

//           <div className="flex flex-wrap gap-2 mb-5">

//             {[
//               {
//                 key: "today",
//                 label: "Today",
//               },
//               {
//                 key: "week",
//                 label: "This Week",
//               },
//               {
//                 key: "month",
//                 label: "This Month",
//               },
//               {
//                 key: "custom",
//                 label: "Custom",
//               },
//             ].map((item) => (

//               <button
//                 key={item.key}
//                 onClick={() =>
//                   setPurchaseFilter(item.key)
//                 }
//                 className={`
//                   px-4 py-1.5
//                   rounded-lg
//                   text-sm
//                   font-medium
//                   transition
//                   ${
//                     purchaseFilter === item.key
//                       ? "bg-[#FC6C26] text-white"
//                       : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                   }
//                 `}
//               >
//                 {item.label}
//               </button>

//             ))}

//           </div>

//           {purchaseFilter === "custom" && (

//             <div className="flex flex-col sm:flex-row gap-3 mb-5">

//               <div className="flex-1">

//                 <label className="text-xs text-gray-500 mb-1 block">
//                   From
//                 </label>

//                 <input
//                   type="date"
//                   value={purchaseDateFrom}
//                   onChange={(e) =>
//                     setPurchaseDateFrom(e.target.value)
//                   }
//                   className="
//                     w-full
//                     border border-gray-200
//                     rounded-lg
//                     px-3 py-2
//                     text-sm
//                     outline-none
//                     focus:border-[#FC6C26]
//                   "
//                 />

//               </div>

//               <div className="flex-1">

//                 <label className="text-xs text-gray-500 mb-1 block">
//                   To
//                 </label>

//                 <input
//                   type="date"
//                   value={purchaseDateTo}
//                   onChange={(e) =>
//                     setPurchaseDateTo(e.target.value)
//                   }
//                   className="
//                     w-full
//                     border border-gray-200
//                     rounded-lg
//                     px-3 py-2
//                     text-sm
//                     outline-none
//                     focus:border-[#FC6C26]
//                   "
//                 />

//               </div>

//             </div>

//           )}

//           <div className="text-center py-4 bg-green-50 rounded-xl">

//             <p className="text-4xl font-bold text-green-600">
//               {getPurchaseValue()}
//             </p>

//             <p className="text-sm text-green-500 mt-1">
//               {purchaseFilter === "today"
//                 ? "Today"
//                 : purchaseFilter === "week"
//                 ? "This Week"
//                 : purchaseFilter === "month"
//                 ? "This Month"
//                 : "Selected Period"}
//             </p>

//           </div>

//         </div>

//       </div>

//       {/* ================= QUICK LINKS ================= */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

//         {/* <Link
//           to="/affiliate/referred-organizations"
//           className="
//             flex items-center gap-4
//             p-5
//             bg-white
//             border border-gray-100
//             rounded-2xl
//             hover:border-orange-200
//             hover:shadow-md
//             transition
//           "
//         >
//           <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">

//             <Users
//               className="text-[#FC6C26]"
//               size={22}
//             />

//           </div>

//           <div>
//             <p className="font-semibold text-gray-900">
//               My Referred Orgs
//             </p>

//             <p className="text-xs text-gray-500">
//               View all organizations
//             </p>
//           </div>

//         </Link> */}

//         {/* WALLET */}
//         {/* <Link
//           to="/affiliate/wallet"
//           className="
//             flex items-center gap-4
//             p-5
//             bg-white
//             border border-gray-100
//             rounded-2xl
//             hover:border-orange-200
//             hover:shadow-md
//             transition
//           "
//         >
//           <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">

//             <Wallet
//               className="text-[#FC6C26]"
//               size={22}
//             />

//           </div>

//           <div>

//             <p className="font-semibold text-gray-900">
//               Wallet
//             </p>

//             <p className="text-xs text-gray-500">
//               Balance & history
//             </p>

//           </div>

//         </Link> */}

//         {/* TRANSACTIONS */}
//         {/* <Link
//           to="/affiliate/transactions"
//           className="
//             flex items-center gap-4
//             p-5
//             bg-white
//             border border-gray-100
//             rounded-2xl
//             hover:border-orange-200
//             hover:shadow-md
//             transition
//           "
//         >
//           <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">

//             <ShoppingCart
//               className="text-[#FC6C26]"
//               size={22}
//             />

//           </div>

//           <div>

//             <p className="font-semibold text-gray-900">
//               Transactions
//             </p>

//             <p className="text-xs text-gray-500">
//               Withdrawals & more
//             </p>

//           </div>

//         </Link> */}

//       </div>

//     </div>
//   );
// }

// // src/pages/affiliate/AffiliateDashboard.jsx

// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// import {
//   Wallet,
//   Users,
//   ShoppingCart,
//   Copy,
//   Check,
//   Link as LinkIcon,
//   Eye,
//   EyeOff,
// } from "lucide-react";

// import { useAuth } from "../../context/AuthContext";

// const PRIMARY = "#fe7f2d";
// const DARK = "#464243";

// const DEFAULT_WALLET_BALANCE = 2450.75;

// export default function AffiliateDashboard() {
//   const { user } = useAuth();

//   const [copied, setCopied] = useState(false);

//   const [showBalance, setShowBalance] = useState(true);

//   const [walletBalance, setWalletBalance] = useState(
//     DEFAULT_WALLET_BALANCE
//   );

//   const [regFilter, setRegFilter] = useState("month");
//   const [purchaseFilter, setPurchaseFilter] = useState("month");

//   const [regDateFrom, setRegDateFrom] = useState("");
//   const [regDateTo, setRegDateTo] = useState("");

//   const [purchaseDateFrom, setPurchaseDateFrom] = useState("");
//   const [purchaseDateTo, setPurchaseDateTo] = useState("");

//   // ============================================================
//   // LOAD WALLET BALANCE
//   // ============================================================

//   useEffect(() => {
//     const savedBalance = localStorage.getItem(
//       "affiliateWalletBalance"
//     );

//     if (savedBalance !== null) {
//       setWalletBalance(Number(savedBalance));
//     } else {
//       localStorage.setItem(
//         "affiliateWalletBalance",
//         DEFAULT_WALLET_BALANCE
//       );
//     }
//   }, []);

//   // ============================================================
//   // UPDATE WALLET WHEN OTHER PAGE CHANGES IT
//   // ============================================================

//   useEffect(() => {
//     const handleStorageChange = () => {
//       const savedBalance = localStorage.getItem(
//         "affiliateWalletBalance"
//       );

//       if (savedBalance !== null) {
//         setWalletBalance(Number(savedBalance));
//       }
//     };

//     window.addEventListener("storage", handleStorageChange);

//     return () => {
//       window.removeEventListener(
//         "storage",
//         handleStorageChange
//       );
//     };
//   }, []);

//   // ============================================================
//   // STATIC STATS
//   // ============================================================

//   const stats = {
//     registrations: {
//       today: 3,
//       week: 12,
//       month: 47,
//     },

//     purchases: {
//       today: 2,
//       week: 8,
//       month: 31,
//     },
//   };

//   // ============================================================
//   // AFFILIATE INFORMATION
//   // ============================================================

//   const affiliateName =
//     user?.name ||
//     "Affiliate";

//   const referralCode =
//     user?.referral_code ||
//     user?.referralCode ||
//     user?.affiliate_code ||
//     user?.affiliateCode ||
//     "AFF001";

//   /*
//     Example:

//     https://org.miprofile.in/register?ref=AFF001&affiliate=Test%20Affiliate
//   */

//   const referralLink =
//     `https://org.miprofile.in/register?ref=${encodeURIComponent(
//       referralCode
//     )}&affiliate=${encodeURIComponent(affiliateName)}`;

//   // ============================================================
//   // COPY REFERRAL LINK
//   // ============================================================

//   const copyLink = async () => {
//     try {
//       await navigator.clipboard.writeText(referralLink);

//       setCopied(true);

//       setTimeout(() => {
//         setCopied(false);
//       }, 2000);
//     } catch (error) {
//       console.error("Failed to copy referral link:", error);
//     }
//   };

//   // ============================================================
//   // REGISTRATION VALUE
//   // ============================================================

//   const getRegValue = () => {
//     if (regFilter === "today") {
//       return stats.registrations.today;
//     }

//     if (regFilter === "week") {
//       return stats.registrations.week;
//     }

//     if (regFilter === "month") {
//       return stats.registrations.month;
//     }

//     return 0;
//   };

//   // ============================================================
//   // PURCHASE VALUE
//   // ============================================================

//   const getPurchaseValue = () => {
//     if (purchaseFilter === "today") {
//       return stats.purchases.today;
//     }

//     if (purchaseFilter === "week") {
//       return stats.purchases.week;
//     }

//     if (purchaseFilter === "month") {
//       return stats.purchases.month;
//     }

//     return 0;
//   };

//   // ============================================================
//   // WALLET DISPLAY
//   // ============================================================

//   const formattedWalletBalance =
//     walletBalance.toLocaleString("en-IN", {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     });

//   const hiddenBalance = "••••••";

//   return (
//     <div className="p-6 lg:p-8 max-w-7xl mx-auto">

//       {/* ==========================================================
//           HEADER
//       =========================================================== */}

//       <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 mb-8">

//         <div>
//           <h1
//             className="text-2xl lg:text-3xl font-bold"
//             style={{ color: DARK }}
//           >
//             Dashboard
//           </h1>

//           <p className="text-gray-500 mt-1">
//             Overview of your affiliate performance
//           </p>
//         </div>

//         {/* ========================================================
//             TOP RIGHT WALLET BUTTON
//         ========================================================= */}

//         <Link
//           to="/affiliate/wallet"
//           className="
//             flex
//             items-center
//             gap-3
//             bg-white
//             border
//             border-gray-200
//             rounded-xl
//             px-5
//             py-3
//             shadow-sm
//             hover:shadow-md
//             transition
//             shrink-0
//           "
//         >
//           <div
//             className="
//               w-11
//               h-11
//               rounded-lg
//               flex
//               items-center
//               justify-center
//             "
//             style={{
//               backgroundColor: "#fff4ec",
//             }}
//           >
//             <Wallet
//               size={22}
//               style={{ color: PRIMARY }}
//               strokeWidth={2}
//             />
//           </div>

//           <div className="text-left">
//             <p
//               className="text-base font-semibold"
//               style={{ color: DARK }}
//             >
//               Wallet
//             </p>

//             <p className="text-xs text-gray-500 mt-0.5">
//               Available balance
//             </p>
//           </div>
//         </Link>
//       </div>

//       {/* ==========================================================
//           WALLET BALANCE
//       =========================================================== */}

//       <Link
//         to="/affiliate/wallet"
//         className="
//           block
//           mb-8
//           rounded-2xl
//           text-white
//           shadow-lg
//           hover:shadow-xl
//           transition
//           group
//         "
//         style={{
//           background: `linear-gradient(90deg, ${PRIMARY}, #f45b0b)`,
//         }}
//       >
//         <div className="p-6 lg:p-7">

//           <div className="flex items-center justify-between gap-5">

//             {/* ====================================================
//                 BALANCE
//             ===================================================== */}

//             <div>

//               <p className="text-white text-sm font-medium opacity-95">
//                 Wallet Balance
//               </p>

//               <div className="flex items-center gap-3 mt-1">

//                 <p className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
//                   ₹
//                   {showBalance
//                     ? formattedWalletBalance
//                     : hiddenBalance}
//                 </p>

//                 {/* =================================================
//                     EYE BUTTON
//                 ================================================== */}

//                 <button
//                   type="button"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     e.stopPropagation();

//                     setShowBalance((prev) => !prev);
//                   }}
//                   className="
//                     p-2
//                     rounded-lg
//                     text-white
//                     hover:bg-white/15
//                     transition
//                   "
//                   title={
//                     showBalance
//                       ? "Hide balance"
//                       : "Show balance"
//                   }
//                 >
//                   {showBalance ? (
//                     <Eye
//                       size={22}
//                       strokeWidth={2}
//                     />
//                   ) : (
//                     <EyeOff
//                       size={22}
//                       strokeWidth={2}
//                     />
//                   )}
//                 </button>

//               </div>

//             </div>

//             {/* ====================================================
//                 WALLET ICON
//             ===================================================== */}

//             <div
//               className="
//                 w-16
//                 h-16
//                 bg-white/20
//                 rounded-2xl
//                 flex
//                 items-center
//                 justify-center
//                 shrink-0
//               "
//             >
//               <Wallet
//                 size={32}
//                 className="text-white"
//                 strokeWidth={2}
//               />
//             </div>

//           </div>

//         </div>
//       </Link>

//       {/* ==========================================================
//           REFERRAL LINK
//       =========================================================== */}

//       <div className="mb-8 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">

//         <div className="flex items-center gap-2 mb-3">

//           <LinkIcon
//             size={19}
//             style={{ color: PRIMARY }}
//           />

//           <h3
//             className="font-semibold"
//             style={{ color: DARK }}
//           >
//             Your Referral Link
//           </h3>

//         </div>

//         <p className="text-sm text-gray-500 mb-3">
//           Share this link to register new organizations under you
//         </p>

//         {/* ========================================================
//             REFERRAL URL
//         ========================================================= */}

//         <div className="flex flex-col sm:flex-row gap-3">

//           <input
//             type="text"
//             value={referralLink}
//             readOnly
//             className="
//               flex-1
//               bg-gray-50
//               border
//               border-gray-200
//               rounded-xl
//               px-4
//               py-3
//               text-sm
//               text-gray-700
//               outline-none
//             "
//           />

//           <button
//             type="button"
//             onClick={copyLink}
//             className="
//               flex
//               items-center
//               justify-center
//               gap-2
//               px-6
//               py-3
//               text-white
//               rounded-xl
//               font-medium
//               transition
//               shrink-0
//             "
//             style={{
//               backgroundColor: PRIMARY,
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.backgroundColor = "#e96d1e";
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.backgroundColor = PRIMARY;
//             }}
//           >
//             {copied ? (
//               <Check size={18} />
//             ) : (
//               <Copy size={18} />
//             )}

//             {copied ? "Copied!" : "Copy Link"}
//           </button>

//         </div>

//         {/* ========================================================
//             AFFILIATE INFORMATION
//         ========================================================= */}

//         <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">

//           <p className="text-xs text-gray-500">
//             Affiliate:
//             <span
//               className="font-semibold ml-1"
//               style={{ color: DARK }}
//             >
//               {affiliateName}
//             </span>
//           </p>

//           <p className="text-xs text-gray-500">
//             Referral Code:
//             <span
//               className="font-semibold ml-1"
//               style={{ color: DARK }}
//             >
//               {referralCode}
//             </span>
//           </p>

//         </div>

//       </div>

//       {/* ==========================================================
//           STATS
//       =========================================================== */}

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

//         {/* ========================================================
//             REGISTRATIONS
//         ========================================================= */}

//         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

//           <div className="flex items-center gap-3 mb-5">

//             <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center">
//               <Users
//                 size={22}
//                 className="text-blue-600"
//               />
//             </div>

//             <h3
//               className="font-semibold text-lg"
//               style={{ color: DARK }}
//             >
//               Registrations
//             </h3>

//           </div>

//           <div className="flex flex-wrap gap-2 mb-5">

//             {[
//               {
//                 key: "today",
//                 label: "Today",
//               },
//               {
//                 key: "week",
//                 label: "This Week",
//               },
//               {
//                 key: "month",
//                 label: "This Month",
//               },
//               {
//                 key: "custom",
//                 label: "Custom",
//               },
//             ].map((item) => (

//               <button
//                 key={item.key}
//                 type="button"
//                 onClick={() => setRegFilter(item.key)}
//                 className="
//                   px-4
//                   py-1.5
//                   rounded-lg
//                   text-sm
//                   font-medium
//                   transition
//                 "
//                 style={
//                   regFilter === item.key
//                     ? {
//                         backgroundColor: PRIMARY,
//                         color: "#ffffff",
//                       }
//                     : {
//                         backgroundColor: "#f3f4f6",
//                         color: "#4b5563",
//                       }
//                 }
//               >
//                 {item.label}
//               </button>

//             ))}

//           </div>

//           {/* CUSTOM DATE */}

//           {regFilter === "custom" && (

//             <div className="flex flex-col sm:flex-row gap-3 mb-5">

//               <div className="flex-1">

//                 <label className="text-xs text-gray-500 mb-1 block">
//                   From
//                 </label>

//                 <input
//                   type="date"
//                   value={regDateFrom}
//                   onChange={(e) =>
//                     setRegDateFrom(e.target.value)
//                   }
//                   className="
//                     w-full
//                     border
//                     border-gray-200
//                     rounded-lg
//                     px-3
//                     py-2
//                     text-sm
//                     outline-none
//                     focus:border-[#fe7f2d]
//                   "
//                 />

//               </div>

//               <div className="flex-1">

//                 <label className="text-xs text-gray-500 mb-1 block">
//                   To
//                 </label>

//                 <input
//                   type="date"
//                   value={regDateTo}
//                   onChange={(e) =>
//                     setRegDateTo(e.target.value)
//                   }
//                   className="
//                     w-full
//                     border
//                     border-gray-200
//                     rounded-lg
//                     px-3
//                     py-2
//                     text-sm
//                     outline-none
//                     focus:border-[#fe7f2d]
//                   "
//                 />

//               </div>

//             </div>

//           )}

//           <div className="text-center py-4 bg-blue-50 rounded-xl">

//             <p className="text-4xl font-bold text-blue-600">
//               {getRegValue()}
//             </p>

//             <p className="text-sm text-blue-500 mt-1">
//               {regFilter === "today"
//                 ? "Today"
//                 : regFilter === "week"
//                 ? "This Week"
//                 : regFilter === "month"
//                 ? "This Month"
//                 : "Selected Period"}
//             </p>

//           </div>

//         </div>

//         {/* ========================================================
//             PURCHASES
//         ========================================================= */}

//         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

//           <div className="flex items-center gap-3 mb-5">

//             <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center">
//               <ShoppingCart
//                 size={22}
//                 className="text-green-600"
//               />
//             </div>

//             <h3
//               className="font-semibold text-lg"
//               style={{ color: DARK }}
//             >
//               Purchases
//             </h3>

//           </div>

//           <div className="flex flex-wrap gap-2 mb-5">

//             {[
//               {
//                 key: "today",
//                 label: "Today",
//               },
//               {
//                 key: "week",
//                 label: "This Week",
//               },
//               {
//                 key: "month",
//                 label: "This Month",
//               },
//               {
//                 key: "custom",
//                 label: "Custom",
//               },
//             ].map((item) => (

//               <button
//                 key={item.key}
//                 type="button"
//                 onClick={() =>
//                   setPurchaseFilter(item.key)
//                 }
//                 className="
//                   px-4
//                   py-1.5
//                   rounded-lg
//                   text-sm
//                   font-medium
//                   transition
//                 "
//                 style={
//                   purchaseFilter === item.key
//                     ? {
//                         backgroundColor: PRIMARY,
//                         color: "#ffffff",
//                       }
//                     : {
//                         backgroundColor: "#f3f4f6",
//                         color: "#4b5563",
//                       }
//                 }
//               >
//                 {item.label}
//               </button>

//             ))}

//           </div>

//           {/* CUSTOM DATE */}

//           {purchaseFilter === "custom" && (

//             <div className="flex flex-col sm:flex-row gap-3 mb-5">

//               <div className="flex-1">

//                 <label className="text-xs text-gray-500 mb-1 block">
//                   From
//                 </label>

//                 <input
//                   type="date"
//                   value={purchaseDateFrom}
//                   onChange={(e) =>
//                     setPurchaseDateFrom(e.target.value)
//                   }
//                   className="
//                     w-full
//                     border
//                     border-gray-200
//                     rounded-lg
//                     px-3
//                     py-2
//                     text-sm
//                     outline-none
//                     focus:border-[#fe7f2d]
//                   "
//                 />

//               </div>

//               <div className="flex-1">

//                 <label className="text-xs text-gray-500 mb-1 block">
//                   To
//                 </label>

//                 <input
//                   type="date"
//                   value={purchaseDateTo}
//                   onChange={(e) =>
//                     setPurchaseDateTo(e.target.value)
//                   }
//                   className="
//                     w-full
//                     border
//                     border-gray-200
//                     rounded-lg
//                     px-3
//                     py-2
//                     text-sm
//                     outline-none
//                     focus:border-[#fe7f2d]
//                   "
//                 />

//               </div>

//             </div>

//           )}

//           <div className="text-center py-4 bg-green-50 rounded-xl">

//             <p className="text-4xl font-bold text-green-600">
//               {getPurchaseValue()}
//             </p>

//             <p className="text-sm text-green-500 mt-1">
//               {purchaseFilter === "today"
//                 ? "Today"
//                 : purchaseFilter === "week"
//                 ? "This Week"
//                 : purchaseFilter === "month"
//                 ? "This Month"
//                 : "Selected Period"}
//             </p>

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }

// // src/pages/affiliate/AffiliateDashboard.jsx

// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// import {
//   Wallet,
//   Users,
//   ShoppingCart,
//   Copy,
//   Check,
//   Link as LinkIcon,
//   Eye,
//   EyeOff,
// } from "lucide-react";

// import { useAuth } from "../../context/AuthContext";

// const PRIMARY = "#fe7f2d";
// const DARK = "#464243";

// const DEFAULT_WALLET_BALANCE = 2450.75;

// export default function AffiliateDashboard() {
//   const { user } = useAuth();

//   const [copied, setCopied] = useState(false);
//   const [showBalance, setShowBalance] = useState(true);

//   const [walletBalance, setWalletBalance] = useState(
//     DEFAULT_WALLET_BALANCE
//   );

//   const [regFilter, setRegFilter] = useState("month");
//   const [purchaseFilter, setPurchaseFilter] = useState("month");

//   const [regDateFrom, setRegDateFrom] = useState("");
//   const [regDateTo, setRegDateTo] = useState("");

//   const [purchaseDateFrom, setPurchaseDateFrom] = useState("");
//   const [purchaseDateTo, setPurchaseDateTo] = useState("");

//   // ============================================================
//   // LOAD WALLET BALANCE
//   // ============================================================

//   useEffect(() => {
//     const savedBalance = localStorage.getItem(
//       "affiliateWalletBalance"
//     );

//     if (savedBalance !== null) {
//       const parsedBalance = Number(savedBalance);

//       if (!Number.isNaN(parsedBalance)) {
//         setWalletBalance(parsedBalance);
//       }
//     } else {
//       localStorage.setItem(
//         "affiliateWalletBalance",
//         DEFAULT_WALLET_BALANCE.toString()
//       );
//     }
//   }, []);

//   // ============================================================
//   // UPDATE WALLET WHEN OTHER TAB/PAGE CHANGES IT
//   // ============================================================

//   useEffect(() => {
//     const handleStorageChange = () => {
//       const savedBalance = localStorage.getItem(
//         "affiliateWalletBalance"
//       );

//       if (savedBalance !== null) {
//         const parsedBalance = Number(savedBalance);

//         if (!Number.isNaN(parsedBalance)) {
//           setWalletBalance(parsedBalance);
//         }
//       }
//     };

//     window.addEventListener(
//       "storage",
//       handleStorageChange
//     );

//     return () => {
//       window.removeEventListener(
//         "storage",
//         handleStorageChange
//       );
//     };
//   }, []);

//   // ============================================================
//   // STATIC STATS
//   // ============================================================

//   const stats = {
//     registrations: {
//       today: 3,
//       week: 12,
//       month: 47,
//     },

//     purchases: {
//       today: 2,
//       week: 8,
//       month: 31,
//     },
//   };

//   // ============================================================
//   // AFFILIATE INFORMATION
//   // ============================================================

//   const affiliateName =
//     user?.name ||
//     user?.fullName ||
//     "Affiliate";

//   const referralCode =
//     user?.referral_code ||
//     user?.referralCode ||
//     user?.affiliate_code ||
//     user?.affiliateCode ||
//     "AFF001";

//   // ============================================================
//   // REFERRAL LINK
//   // ============================================================

//   const referralLink =
//     `https://org.miprofile.in/register?ref=${encodeURIComponent(
//       referralCode
//     )}&affiliate=${encodeURIComponent(
//       affiliateName
//     )}`;

//   // ============================================================
//   // COPY REFERRAL LINK
//   // ============================================================

//   const copyLink = async () => {
//     try {
//       await navigator.clipboard.writeText(
//         referralLink
//       );

//       setCopied(true);

//       setTimeout(() => {
//         setCopied(false);
//       }, 2000);
//     } catch (error) {
//       console.error(
//         "Failed to copy referral link:",
//         error
//       );
//     }
//   };

//   // ============================================================
//   // REGISTRATION VALUE
//   // ============================================================

//   const getRegValue = () => {
//     if (regFilter === "today") {
//       return stats.registrations.today;
//     }

//     if (regFilter === "week") {
//       return stats.registrations.week;
//     }

//     if (regFilter === "month") {
//       return stats.registrations.month;
//     }

//     return 0;
//   };

//   // ============================================================
//   // PURCHASE VALUE
//   // ============================================================

//   const getPurchaseValue = () => {
//     if (purchaseFilter === "today") {
//       return stats.purchases.today;
//     }

//     if (purchaseFilter === "week") {
//       return stats.purchases.week;
//     }

//     if (purchaseFilter === "month") {
//       return stats.purchases.month;
//     }

//     return 0;
//   };

//   // ============================================================
//   // WALLET FORMATTING
//   // ============================================================

//   const formattedWalletBalance =
//     Number(walletBalance).toLocaleString(
//       "en-IN",
//       {
//         minimumFractionDigits: 2,
//         maximumFractionDigits: 2,
//       }
//     );

//   const hiddenBalance = "••••••";

//   // ============================================================
//   // FILTER LABEL
//   // ============================================================

//   const getFilterLabel = (filter) => {
//     if (filter === "today") return "Today";
//     if (filter === "week") return "This Week";
//     if (filter === "month") return "This Month";

//     return "Selected Period";
//   };

//   // ============================================================
//   // FILTER BUTTONS
//   // ============================================================

//   const filterButtons = [
//     {
//       key: "today",
//       label: "Today",
//     },
//     {
//       key: "week",
//       label: "This Week",
//     },
//     {
//       key: "month",
//       label: "This Month",
//     },
//     {
//       key: "custom",
//       label: "Custom",
//     },
//   ];

//   return (
//     <div
//       className="
//         w-full
//         p-4
//         sm:p-6
//         lg:p-8
//         max-w-7xl
//         mx-auto
//       "
//     >

//       {/* ==========================================================
//           HEADER
//       =========================================================== */}

//       <div
//         className="
//           flex
//           flex-col
//           sm:flex-row
//           sm:items-start
//           sm:justify-between
//           gap-5
//           mb-6
//           lg:mb-8
//         "
//       >

//         <div>
//           <h1
//             className="
//               text-2xl
//               sm:text-3xl
//               font-bold
//             "
//             style={{ color: DARK }}
//           >
//             Dashboard
//           </h1>

//           <p className="text-gray-500 mt-1 text-sm sm:text-base">
//             Overview of your affiliate performance
//           </p>
//         </div>

//         {/* ========================================================
//             TOP RIGHT WALLET BUTTON
//         ========================================================= */}

//         <Link
//           to="/affiliate/wallet"
//           className="
//             flex
//             items-center
//             gap-3
//             bg-white
//             border
//             border-gray-200
//             rounded-xl
//             px-4
//             sm:px-5
//             py-3
//             shadow-sm
//             hover:shadow-md
//             hover:border-orange-200
//             transition
//             shrink-0
//           "
//         >

//           <div
//             className="
//               w-11
//               h-11
//               rounded-lg
//               flex
//               items-center
//               justify-center
//             "
//             style={{
//               backgroundColor: "#fff4ec",
//             }}
//           >
//             <Wallet
//               size={22}
//               style={{ color: PRIMARY }}
//               strokeWidth={2}
//             />
//           </div>

//           <div className="text-left">

//             {/* Bigger Wallet Text */}
//             <p
//               className="
//                 text-base
//                 sm:text-lg
//                 font-semibold
//               "
//               style={{ color: DARK }}
//             >
//               Wallet
//             </p>

//             <p className="text-xs text-gray-500 mt-0.5">
//               Available balance
//             </p>

//           </div>

//         </Link>

//       </div>

//       {/* ==========================================================
//           WALLET BALANCE
//       =========================================================== */}

//       <Link
//         to="/affiliate/wallet"
//         className="
//           block
//           mb-6
//           lg:mb-8
//           rounded-2xl
//           text-white
//           shadow-lg
//           hover:shadow-xl
//           transition
//           group
//           overflow-hidden
//         "
//         style={{
//           background:
//             `linear-gradient(90deg, ${PRIMARY}, #f45b0b)`,
//         }}
//       >

//         <div
//           className="
//             p-5
//             sm:p-6
//             lg:p-7
//           "
//         >

//           <div
//             className="
//               flex
//               items-center
//               justify-between
//               gap-4
//             "
//           >

//             {/* ====================================================
//                 BALANCE
//             ===================================================== */}

//             <div className="min-w-0">

//               <p className="text-white text-sm font-medium opacity-95">
//                 Wallet Balance
//               </p>

//               <div
//                 className="
//                   flex
//                   items-center
//                   gap-2
//                   sm:gap-3
//                   mt-1
//                 "
//               >

//                 <p
//                   className="
//                     text-3xl
//                     sm:text-4xl
//                     lg:text-5xl
//                     font-bold
//                     text-white
//                     tracking-tight
//                     truncate
//                   "
//                 >
//                   ₹
//                   {showBalance
//                     ? formattedWalletBalance
//                     : hiddenBalance}
//                 </p>

//                 {/* =================================================
//                     EYE BUTTON
//                 ================================================== */}

//                 <button
//                   type="button"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     e.stopPropagation();

//                     setShowBalance(
//                       (prev) => !prev
//                     );
//                   }}
//                   className="
//                     p-2
//                     rounded-lg
//                     text-white
//                     hover:bg-white/15
//                     active:bg-white/20
//                     transition
//                     shrink-0
//                   "
//                   title={
//                     showBalance
//                       ? "Hide balance"
//                       : "Show balance"
//                   }
//                   aria-label={
//                     showBalance
//                       ? "Hide wallet balance"
//                       : "Show wallet balance"
//                   }
//                 >
//                   {showBalance ? (
//                     <Eye
//                       size={23}
//                       strokeWidth={2}
//                     />
//                   ) : (
//                     <EyeOff
//                       size={23}
//                       strokeWidth={2}
//                     />
//                   )}
//                 </button>

//               </div>

//             </div>

//             {/* ====================================================
//                 WALLET ICON
//             ===================================================== */}

//             <div
//               className="
//                 w-14
//                 h-14
//                 sm:w-16
//                 sm:h-16
//                 bg-white/20
//                 rounded-2xl
//                 flex
//                 items-center
//                 justify-center
//                 shrink-0
//               "
//             >
//               <Wallet
//                 size={30}
//                 className="text-white sm:w-8 sm:h-8"
//                 strokeWidth={2}
//               />
//             </div>

//           </div>

//         </div>

//       </Link>

//       {/* ==========================================================
//           REFERRAL LINK
//       =========================================================== */}

//       <div
//         className="
//           mb-6
//           lg:mb-8
//           p-4
//           sm:p-5
//           bg-white
//           rounded-2xl
//           border
//           border-gray-100
//           shadow-sm
//         "
//       >

//         <div className="flex items-center gap-2 mb-3">

//           <LinkIcon
//             size={19}
//             style={{ color: PRIMARY }}
//           />

//           <h3
//             className="font-semibold"
//             style={{ color: DARK }}
//           >
//             Your Referral Link
//           </h3>

//         </div>

//         <p className="text-sm text-gray-500 mb-3">
//           Share this link to register new organizations under you
//         </p>

//         {/* ========================================================
//             REFERRAL URL
//         ========================================================= */}

//         <div
//           className="
//             flex
//             flex-col
//             sm:flex-row
//             gap-3
//           "
//         >

//           <input
//             type="text"
//             value={referralLink}
//             readOnly
//             className="
//               flex-1
//               min-w-0
//               bg-gray-50
//               border
//               border-gray-200
//               rounded-xl
//               px-4
//               py-3
//               text-sm
//               text-gray-700
//               outline-none
//             "
//           />

//           <button
//             type="button"
//             onClick={copyLink}
//             className="
//               flex
//               items-center
//               justify-center
//               gap-2
//               px-6
//               py-3
//               text-white
//               rounded-xl
//               font-medium
//               transition
//               shrink-0
//             "
//             style={{
//               backgroundColor: PRIMARY,
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.backgroundColor =
//                 "#e96d1e";
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.backgroundColor =
//                 PRIMARY;
//             }}
//           >

//             {copied ? (
//               <Check size={18} />
//             ) : (
//               <Copy size={18} />
//             )}

//             {copied
//               ? "Copied!"
//               : "Copy Link"}

//           </button>

//         </div>

//         {/* ========================================================
//             AFFILIATE INFORMATION
//         ========================================================= */}

//         <div
//           className="
//             mt-3
//             flex
//             flex-wrap
//             items-center
//             gap-x-4
//             gap-y-1
//           "
//         >

//           <p className="text-xs text-gray-500">
//             Affiliate:

//             <span
//               className="font-semibold ml-1"
//               style={{ color: DARK }}
//             >
//               {affiliateName}
//             </span>
//           </p>

//           <p className="text-xs text-gray-500">
//             Referral Code:

//             <span
//               className="font-semibold ml-1"
//               style={{ color: DARK }}
//             >
//               {referralCode}
//             </span>
//           </p>

//         </div>

//       </div>

//       {/* ==========================================================
//           STATS
//       =========================================================== */}

//       <div
//         className="
//           grid
//           grid-cols-1
//           lg:grid-cols-2
//           gap-5
//           lg:gap-6
//           mb-8
//         "
//       >

//         {/* ========================================================
//             REGISTRATIONS
//         ========================================================= */}

//         <div
//           className="
//             bg-white
//             rounded-2xl
//             border
//             border-gray-100
//             shadow-sm
//             p-5
//             sm:p-6
//           "
//         >

//           <div className="flex items-center gap-3 mb-5">

//             <div
//               className="
//                 w-11
//                 h-11
//                 bg-blue-50
//                 rounded-xl
//                 flex
//                 items-center
//                 justify-center
//                 shrink-0
//               "
//             >
//               <Users
//                 size={22}
//                 className="text-blue-600"
//               />
//             </div>

//             <h3
//               className="font-semibold text-lg"
//               style={{ color: DARK }}
//             >
//               Registrations
//             </h3>

//           </div>

//           {/* FILTERS */}

//           <div className="flex flex-wrap gap-2 mb-5">

//             {filterButtons.map((item) => (

//               <button
//                 key={item.key}
//                 type="button"
//                 onClick={() =>
//                   setRegFilter(item.key)
//                 }
//                 className="
//                   px-3
//                   sm:px-4
//                   py-1.5
//                   rounded-lg
//                   text-sm
//                   font-medium
//                   transition
//                 "
//                 style={
//                   regFilter === item.key
//                     ? {
//                         backgroundColor:
//                           PRIMARY,
//                         color:
//                           "#ffffff",
//                       }
//                     : {
//                         backgroundColor:
//                           "#f3f4f6",
//                         color:
//                           "#4b5563",
//                       }
//                 }
//               >
//                 {item.label}
//               </button>

//             ))}

//           </div>

//           {/* CUSTOM DATE */}

//           {regFilter === "custom" && (

//             <div
//               className="
//                 flex
//                 flex-col
//                 sm:flex-row
//                 gap-3
//                 mb-5
//               "
//             >

//               <div className="flex-1">

//                 <label className="text-xs text-gray-500 mb-1 block">
//                   From
//                 </label>

//                 <input
//                   type="date"
//                   value={regDateFrom}
//                   onChange={(e) =>
//                     setRegDateFrom(
//                       e.target.value
//                     )
//                   }
//                   className="
//                     w-full
//                     border
//                     border-gray-200
//                     rounded-lg
//                     px-3
//                     py-2
//                     text-sm
//                     outline-none
//                     focus:border-[#fe7f2d]
//                   "
//                 />

//               </div>

//               <div className="flex-1">

//                 <label className="text-xs text-gray-500 mb-1 block">
//                   To
//                 </label>

//                 <input
//                   type="date"
//                   value={regDateTo}
//                   onChange={(e) =>
//                     setRegDateTo(
//                       e.target.value
//                     )
//                   }
//                   className="
//                     w-full
//                     border
//                     border-gray-200
//                     rounded-lg
//                     px-3
//                     py-2
//                     text-sm
//                     outline-none
//                     focus:border-[#fe7f2d]
//                   "
//                 />

//               </div>

//             </div>

//           )}

//           {/* VALUE */}

//           <div className="text-center py-5 bg-blue-50 rounded-xl">

//             <p className="text-4xl font-bold text-blue-600">
//               {getRegValue()}
//             </p>

//             <p className="text-sm text-blue-500 mt-1">
//               {getFilterLabel(regFilter)}
//             </p>

//           </div>

//         </div>

//         {/* ========================================================
//             PURCHASES
//         ========================================================= */}

//         <div
//           className="
//             bg-white
//             rounded-2xl
//             border
//             border-gray-100
//             shadow-sm
//             p-5
//             sm:p-6
//           "
//         >

//           <div className="flex items-center gap-3 mb-5">

//             <div
//               className="
//                 w-11
//                 h-11
//                 bg-green-50
//                 rounded-xl
//                 flex
//                 items-center
//                 justify-center
//                 shrink-0
//               "
//             >
//               <ShoppingCart
//                 size={22}
//                 className="text-green-600"
//               />
//             </div>

//             <h3
//               className="font-semibold text-lg"
//               style={{ color: DARK }}
//             >
//               Purchases
//             </h3>

//           </div>

//           {/* FILTERS */}

//           <div className="flex flex-wrap gap-2 mb-5">

//             {filterButtons.map((item) => (

//               <button
//                 key={item.key}
//                 type="button"
//                 onClick={() =>
//                   setPurchaseFilter(
//                     item.key
//                   )
//                 }
//                 className="
//                   px-3
//                   sm:px-4
//                   py-1.5
//                   rounded-lg
//                   text-sm
//                   font-medium
//                   transition
//                 "
//                 style={
//                   purchaseFilter ===
//                   item.key
//                     ? {
//                         backgroundColor:
//                           PRIMARY,
//                         color:
//                           "#ffffff",
//                       }
//                     : {
//                         backgroundColor:
//                           "#f3f4f6",
//                         color:
//                           "#4b5563",
//                       }
//                 }
//               >
//                 {item.label}
//               </button>

//             ))}

//           </div>

//           {/* CUSTOM DATE */}

//           {purchaseFilter === "custom" && (

//             <div
//               className="
//                 flex
//                 flex-col
//                 sm:flex-row
//                 gap-3
//                 mb-5
//               "
//             >

//               <div className="flex-1">

//                 <label className="text-xs text-gray-500 mb-1 block">
//                   From
//                 </label>

//                 <input
//                   type="date"
//                   value={purchaseDateFrom}
//                   onChange={(e) =>
//                     setPurchaseDateFrom(
//                       e.target.value
//                     )
//                   }
//                   className="
//                     w-full
//                     border
//                     border-gray-200
//                     rounded-lg
//                     px-3
//                     py-2
//                     text-sm
//                     outline-none
//                     focus:border-[#fe7f2d]
//                   "
//                 />

//               </div>

//               <div className="flex-1">

//                 <label className="text-xs text-gray-500 mb-1 block">
//                   To
//                 </label>

//                 <input
//                   type="date"
//                   value={purchaseDateTo}
//                   onChange={(e) =>
//                     setPurchaseDateTo(
//                       e.target.value
//                     )
//                   }
//                   className="
//                     w-full
//                     border
//                     border-gray-200
//                     rounded-lg
//                     px-3
//                     py-2
//                     text-sm
//                     outline-none
//                     focus:border-[#fe7f2d]
//                   "
//                 />

//               </div>

//             </div>

//           )}

//           {/* VALUE */}

//           <div className="text-center py-5 bg-green-50 rounded-xl">

//             <p className="text-4xl font-bold text-green-600">
//               {getPurchaseValue()}
//             </p>

//             <p className="text-sm text-green-500 mt-1">
//               {getFilterLabel(
//                 purchaseFilter
//               )}
//             </p>

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }

// src/pages/affiliate/AffiliateDashboard.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Wallet,
  Users,
  ShoppingCart,
  Copy,
  Check,
  Link as LinkIcon,
  Eye,
  EyeOff,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const PRIMARY = "#fe7f2d";
const DARK = "#464243";

const DEFAULT_WALLET_BALANCE = 2450.75;

export default function AffiliateDashboard() {
  const { user } = useAuth();

  // ============================================================
  // STATES
  // ============================================================

  const [copied, setCopied] = useState(false);

  const [showBalance, setShowBalance] = useState(true);

  const [walletBalance, setWalletBalance] = useState(
    DEFAULT_WALLET_BALANCE
  );

  const [regFilter, setRegFilter] = useState("month");
  const [purchaseFilter, setPurchaseFilter] = useState("month");

  const [regDateFrom, setRegDateFrom] = useState("");
  const [regDateTo, setRegDateTo] = useState("");

  const [purchaseDateFrom, setPurchaseDateFrom] = useState("");
  const [purchaseDateTo, setPurchaseDateTo] = useState("");

  // ============================================================
  // LOAD WALLET BALANCE
  // ============================================================

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

  // ============================================================
  // UPDATE WALLET WHEN OTHER TAB/PAGE CHANGES IT
  // ============================================================

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

  // ============================================================
  // ALSO CHECK BALANCE WHEN WINDOW GETS FOCUS
  // ============================================================

  useEffect(() => {
    const handleFocus = () => {
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

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  // ============================================================
  // STATIC STATS
  // ============================================================

  const stats = {
    registrations: {
      today: 3,
      week: 12,
      month: 47,
    },

    purchases: {
      today: 2,
      week: 8,
      month: 31,
    },
  };

  // ============================================================
  // AFFILIATE INFORMATION
  // ============================================================

  const affiliateName =
    user?.name ||
    user?.fullName ||
    user?.username ||
    "Affiliate";

  const referralCode =
    user?.referral_code ||
    user?.referralCode ||
    user?.affiliate_code ||
    user?.affiliateCode ||
    "AFF001";

  // ============================================================
  // REFERRAL LINK
  // ============================================================

  const referralLink =
    `https://org.miprofile.in/register?ref=${encodeURIComponent(
      referralCode
    )}&affiliate=${encodeURIComponent(
      affiliateName
    )}`;

  // ============================================================
  // COPY REFERRAL LINK
  // ============================================================

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        referralLink
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(
        "Failed to copy referral link:",
        error
      );
    }
  };

  // ============================================================
  // REGISTRATION VALUE
  // ============================================================

  const getRegValue = () => {
    if (regFilter === "today") {
      return stats.registrations.today;
    }

    if (regFilter === "week") {
      return stats.registrations.week;
    }

    if (regFilter === "month") {
      return stats.registrations.month;
    }

    return 0;
  };

  // ============================================================
  // PURCHASE VALUE
  // ============================================================

  const getPurchaseValue = () => {
    if (purchaseFilter === "today") {
      return stats.purchases.today;
    }

    if (purchaseFilter === "week") {
      return stats.purchases.week;
    }

    if (purchaseFilter === "month") {
      return stats.purchases.month;
    }

    return 0;
  };

  // ============================================================
  // WALLET FORMATTING
  // ============================================================

  const formattedWalletBalance =
    Number(walletBalance).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );

  const hiddenBalance = "••••••";

  // ============================================================
  // FILTER LABEL
  // ============================================================

  const getFilterLabel = (filter) => {
    if (filter === "today") {
      return "Today";
    }

    if (filter === "week") {
      return "This Week";
    }

    if (filter === "month") {
      return "This Month";
    }

    return "Selected Period";
  };

  // ============================================================
  // FILTER BUTTONS
  // ============================================================

  const filterButtons = [
    {
      key: "today",
      label: "Today",
    },
    {
      key: "week",
      label: "This Week",
    },
    {
      key: "month",
      label: "This Month",
    },
    {
      key: "custom",
      label: "Custom",
    },
  ];

  // ============================================================
  // RETURN
  // ============================================================

  return (
    <div
      className="
        w-full
        p-4
        sm:p-6
        lg:p-8
        max-w-7xl
        mx-auto
      "
    >

      {/* ==========================================================
          HEADER
      =========================================================== */}

      <div
        className="
          flex
          flex-col
          sm:flex-row
          sm:items-start
          sm:justify-between
          gap-5
          mb-6
          lg:mb-8
        "
      >

        {/* PAGE TITLE */}

        <div>
          <h1
            className="
              text-2xl
              sm:text-3xl
              font-bold
            "
            style={{ color: DARK }}
          >
            Dashboard
          </h1>

          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Overview of your affiliate performance
          </p>
        </div>

        {/* ========================================================
            TOP RIGHT WALLET BUTTON
        ========================================================= */}

        <Link
          to="/affiliate/wallet"
          className="
            flex
            items-center
            gap-3
            bg-white
            border
            border-gray-200
            rounded-xl
            px-4
            sm:px-5
            py-3
            shadow-sm
            hover:shadow-md
            hover:border-orange-200
            transition
            shrink-0
          "
        >

          <div
            className="
              w-11
              h-11
              rounded-lg
              flex
              items-center
              justify-center
              bg-orange-50
            "
          >
            <Wallet
              size={22}
              style={{ color: PRIMARY }}
              strokeWidth={2}
            />
          </div>

          <div className="text-left">

            <p
              className="
                text-base
                sm:text-lg
                font-semibold
              "
              style={{ color: DARK }}
            >
              Wallet
            </p>

            <p className="text-xs text-gray-500 mt-0.5">
              Available balance
            </p>

          </div>

        </Link>
      </div>

      {/* ==========================================================
          WALLET BALANCE CARD
          WHITE DESIGN
      =========================================================== */}

      <div
        className="
          relative
          block
          mb-6
          lg:mb-8
          bg-white
          border
          border-gray-200
          rounded-2xl
          shadow-sm
          hover:shadow-md
          transition
          overflow-hidden
        "
      >

        {/* ========================================================
            CLICKABLE WALLET AREA
        ========================================================= */}

        <Link
          to="/affiliate/wallet"
          className="
            block
            w-full
            p-5
            sm:p-6
            lg:p-7
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
              gap-5
            "
          >

            {/* ====================================================
                LEFT SIDE
            ===================================================== */}

            <div className="min-w-0">

              <p
                className="
                  text-sm
                  sm:text-base
                  font-medium
                  text-gray-600
                "
              >
                Wallet Balance
              </p>

              <p
                className="
                  mt-1
                  text-3xl
                  sm:text-4xl
                  lg:text-5xl
                  font-bold
                  tracking-tight
                "
                style={{ color: DARK }}
              >
                ₹
                {showBalance
                  ? formattedWalletBalance
                  : hiddenBalance}
              </p>

            </div>

            {/* ====================================================
                RIGHT SIDE
            ===================================================== */}

            <div
              className="
                flex
                items-center
                gap-3
                shrink-0
              "
            >

              {/* ==================================================
                  EYE BUTTON
              =================================================== */}

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  setShowBalance(
                    (previous) => !previous
                  );
                }}
                className="
                  w-11
                  h-11
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  text-gray-500
                  hover:text-gray-800
                  hover:bg-gray-100
                  active:bg-gray-200
                  transition
                "
                title={
                  showBalance
                    ? "Hide balance"
                    : "Show balance"
                }
                aria-label={
                  showBalance
                    ? "Hide wallet balance"
                    : "Show wallet balance"
                }
              >
                {showBalance ? (
                  <Eye
                    size={24}
                    strokeWidth={2}
                  />
                ) : (
                  <EyeOff
                    size={24}
                    strokeWidth={2}
                  />
                )}
              </button>

              {/* ==================================================
                  WALLET ICON
              =================================================== */}

              <div
                className="
                  w-14
                  h-14
                  sm:w-16
                  sm:h-16
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  bg-orange-50
                "
              >
                <Wallet
                  size={30}
                  className="sm:w-8 sm:h-8"
                  style={{ color: PRIMARY }}
                  strokeWidth={2}
                />
              </div>

            </div>

          </div>

        </Link>

      </div>

      {/* ==========================================================
          REFERRAL LINK
      =========================================================== */}

      <div
        className="
          mb-6
          lg:mb-8
          p-4
          sm:p-5
          bg-white
          rounded-2xl
          border
          border-gray-100
          shadow-sm
        "
      >

        {/* TITLE */}

        <div className="flex items-center gap-2 mb-3">

          <LinkIcon
            size={19}
            style={{ color: PRIMARY }}
          />

          <h3
            className="font-semibold text-base sm:text-lg"
            style={{ color: DARK }}
          >
            Your Referral Link
          </h3>

        </div>


        {/* ========================================================
            REFERRAL URL
        ========================================================= */}

        <div
          className="
            flex
            flex-col
            sm:flex-row
            gap-3
          "
        >

          <input
            type="text"
            value={referralLink}
            readOnly
            className="
              flex-1
              min-w-0
              bg-gray-50
              border
              border-gray-200
              rounded-xl
              px-4
              py-3
              text-sm
              text-gray-700
              outline-none
              focus:border-orange-300
            "
          />

          <button
            type="button"
            onClick={copyLink}
            className="
              flex
              items-center
              justify-center
              gap-2
              px-6
              py-3
              text-white
              rounded-xl
              font-medium
              transition
              shrink-0
            "
            style={{
              backgroundColor: PRIMARY,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                "#e96d1e";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                PRIMARY;
            }}
          >

            {copied ? (
              <Check size={18} />
            ) : (
              <Copy size={18} />
            )}

            {copied
              ? "Copied!"
              : "Copy Link"}

          </button>

        </div>

        {/* ========================================================
            AFFILIATE INFORMATION
        ========================================================= */}

        <div
          className="
            mt-3
            flex
            flex-wrap
            items-center
            gap-x-4
            gap-y-1
          "
        >

          

        </div>

      </div>

      {/* ==========================================================
          STATS
      =========================================================== */}

      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-5
          lg:gap-6
          mb-8
        "
      >

        {/* ========================================================
            REGISTRATIONS
        ========================================================= */}

        <div
          className="
            bg-white
            rounded-2xl
            border
            border-gray-100
            shadow-sm
            p-5
            sm:p-6
          "
        >

          {/* TITLE */}

          <div className="flex items-center gap-3 mb-5">

            <div
              className="
                w-11
                h-11
                bg-blue-50
                rounded-xl
                flex
                items-center
                justify-center
                shrink-0
              "
            >
              <Users
                size={22}
                className="text-blue-600"
              />
            </div>

            <h3
              className="font-semibold text-lg"
              style={{ color: DARK }}
            >
              Registrations
            </h3>

          </div>

          {/* FILTERS */}

          <div className="flex flex-wrap gap-2 mb-5">

            {filterButtons.map((item) => (

              <button
                key={item.key}
                type="button"
                onClick={() =>
                  setRegFilter(item.key)
                }
                className="
                  px-3
                  sm:px-4
                  py-1.5
                  rounded-lg
                  text-sm
                  font-medium
                  transition
                "
                style={
                  regFilter === item.key
                    ? {
                        backgroundColor: PRIMARY,
                        color: "#ffffff",
                      }
                    : {
                        backgroundColor: "#f3f4f6",
                        color: "#4b5563",
                      }
                }
              >
                {item.label}
              </button>

            ))}

          </div>

          {/* CUSTOM DATE */}

          {regFilter === "custom" && (

            <div
              className="
                flex
                flex-col
                sm:flex-row
                gap-3
                mb-5
              "
            >

              <div className="flex-1">

                <label className="text-xs text-gray-500 mb-1 block">
                  From
                </label>

                <input
                  type="date"
                  value={regDateFrom}
                  onChange={(e) =>
                    setRegDateFrom(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    border
                    border-gray-200
                    rounded-lg
                    px-3
                    py-2
                    text-sm
                    outline-none
                    focus:border-[#fe7f2d]
                  "
                />

              </div>

              <div className="flex-1">

                <label className="text-xs text-gray-500 mb-1 block">
                  To
                </label>

                <input
                  type="date"
                  value={regDateTo}
                  onChange={(e) =>
                    setRegDateTo(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    border
                    border-gray-200
                    rounded-lg
                    px-3
                    py-2
                    text-sm
                    outline-none
                    focus:border-[#fe7f2d]
                  "
                />

              </div>

            </div>

          )}

          {/* VALUE */}

          <div
            className="
              text-center
              py-5
              bg-blue-50
              rounded-xl
            "
          >

            <p className="text-4xl font-bold text-blue-600">
              {getRegValue()}
            </p>

            <p className="text-sm text-blue-500 mt-1">
              {getFilterLabel(regFilter)}
            </p>

          </div>

        </div>

        {/* ========================================================
            PURCHASES
        ========================================================= */}

        <div
          className="
            bg-white
            rounded-2xl
            border
            border-gray-100
            shadow-sm
            p-5
            sm:p-6
          "
        >

          {/* TITLE */}

          <div className="flex items-center gap-3 mb-5">

            <div
              className="
                w-11
                h-11
                bg-green-50
                rounded-xl
                flex
                items-center
                justify-center
                shrink-0
              "
            >
              <ShoppingCart
                size={22}
                className="text-green-600"
              />
            </div>

            <h3
              className="font-semibold text-lg"
              style={{ color: DARK }}
            >
              Purchases
            </h3>

          </div>

          {/* FILTERS */}

          <div className="flex flex-wrap gap-2 mb-5">

            {filterButtons.map((item) => (

              <button
                key={item.key}
                type="button"
                onClick={() =>
                  setPurchaseFilter(item.key)
                }
                className="
                  px-3
                  sm:px-4
                  py-1.5
                  rounded-lg
                  text-sm
                  font-medium
                  transition
                "
                style={
                  purchaseFilter === item.key
                    ? {
                        backgroundColor: PRIMARY,
                        color: "#ffffff",
                      }
                    : {
                        backgroundColor: "#f3f4f6",
                        color: "#4b5563",
                      }
                }
              >
                {item.label}
              </button>

            ))}

          </div>

          {/* CUSTOM DATE */}

          {purchaseFilter === "custom" && (

            <div
              className="
                flex
                flex-col
                sm:flex-row
                gap-3
                mb-5
              "
            >

              <div className="flex-1">

                <label className="text-xs text-gray-500 mb-1 block">
                  From
                </label>

                <input
                  type="date"
                  value={purchaseDateFrom}
                  onChange={(e) =>
                    setPurchaseDateFrom(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    border
                    border-gray-200
                    rounded-lg
                    px-3
                    py-2
                    text-sm
                    outline-none
                    focus:border-[#fe7f2d]
                  "
                />

              </div>

              <div className="flex-1">

                <label className="text-xs text-gray-500 mb-1 block">
                  To
                </label>

                <input
                  type="date"
                  value={purchaseDateTo}
                  onChange={(e) =>
                    setPurchaseDateTo(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    border
                    border-gray-200
                    rounded-lg
                    px-3
                    py-2
                    text-sm
                    outline-none
                    focus:border-[#fe7f2d]
                  "
                />

              </div>

            </div>

          )}

          {/* VALUE */}

          <div
            className="
              text-center
              py-5
              bg-green-50
              rounded-xl
            "
          >

            <p className="text-4xl font-bold text-green-600">
              {getPurchaseValue()}
            </p>

            <p className="text-sm text-green-500 mt-1">
              {getFilterLabel(
                purchaseFilter
              )}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}