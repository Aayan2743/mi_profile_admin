// import { useState } from "react";
// import { Eye, X, Percent, CreditCard, Calendar } from "lucide-react";

// export default function MyReferredOrganizations() {
//   const [selectedOrg, setSelectedOrg] = useState(null);

//   // Static data – replace with API later
//   const organizations = [
//     {
//       id: 1,
//       name: "Brand Crest Digital Private Limited",
//       email: "sales.brandcrestdigital@gmail.com",
//       phone: "7204480016",
//       commission_percent: 10,
//       commission_type: "lifetime",
//       total_cards: 12,
//       total_commission: 1850.5,
//       transactions: [
//         {
//           id: 101,
//           date: "25/08/2026",
//           cards: 5,
//           amount: 4500,
//           commission: 450,
//           status: "Paid",
//         },
//         {
//           id: 102,
//           date: "18/08/2026",
//           cards: 4,
//           amount: 3600,
//           commission: 360,
//           status: "Paid",
//         },
//         {
//           id: 103,
//           date: "10/08/2026",
//           cards: 3,
//           amount: 2700,
//           commission: 270,
//           status: "Pending",
//         },
//       ],
//     },
//     {
//       id: 2,
//       name: "Shree Jee Trading Co",
//       email: "goelamit283@gmail.com",
//       phone: "9667416210",
//       commission_percent: 10,
//       commission_type: "lifetime",
//       total_cards: 1,
//       total_commission: 85.0,
//       transactions: [
//         {
//           id: 201,
//           date: "25/08/2026",
//           cards: 1,
//           amount: 850,
//           commission: 85,
//           status: "Paid",
//         },
//       ],
//     },
//     {
//       id: 3,
//       name: "Chandgothia Artha Saarathee",
//       email: "arthasarathree@gmail.com",
//       phone: "9435231100",
//       commission_percent: 8,
//       commission_type: "onetime",
//       total_cards: 1,
//       total_commission: 68.0,
//       transactions: [
//         {
//           id: 301,
//           date: "19/08/2026",
//           cards: 1,
//           amount: 850,
//           commission: 68,
//           status: "Paid",
//         },
//       ],
//     },
//   ];

//   // Mask email & phone
//   const maskEmail = (email) => {
//     if (!email) return "-";
//     const [name, domain] = email.split("@");
//     return `${name.slice(0, 2)}****@${domain}`;
//   };

//   const maskPhone = (phone) => {
//     if (!phone) return "-";
//     return `******${phone.slice(-4)}`;
//   };

//   return (
//     <div className="p-6 lg:p-8 max-w-7xl mx-auto">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
//           My Referred Organizations
//         </h1>
//         <p className="text-gray-500 mt-1">
//           Organizations registered using your referral link
//         </p>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left">
//             <thead>
//               <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                 <th className="px-6 py-4">Name</th>
//                 <th className="px-6 py-4">Email</th>
//                 <th className="px-6 py-4">Phone</th>
//                 <th className="px-6 py-4 text-center">Commission %</th>
//                 <th className="px-6 py-4 text-center">Total Cards</th>
//                 <th className="px-6 py-4 text-center">Total Earned</th>
//                 <th className="px-6 py-4 text-center">Action</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-50">
//               {organizations.map((org) => (
//                 <tr key={org.id} className="hover:bg-orange-50/40 transition">
//                   <td className="px-6 py-4 font-medium text-gray-900">
//                     {org.name}
//                   </td>
//                   <td className="px-6 py-4 text-gray-600 text-sm">
//                     {maskEmail(org.email)}
//                   </td>
//                   <td className="px-6 py-4 text-gray-600 text-sm">
//                     {maskPhone(org.phone)}
//                   </td>
//                   <td className="px-6 py-4 text-center">
//                     <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-50 text-[#FC6C26] text-sm font-semibold">
//                       <Percent size={12} />
//                       {org.commission_percent}%
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-center font-medium">
//                     {org.total_cards}
//                   </td>
//                   <td className="px-6 py-4 text-center font-semibold text-green-600">
//                     ₹{org.total_commission.toLocaleString("en-IN")}
//                   </td>
//                   <td className="px-6 py-4 text-center">
//                     <button
//                       onClick={() => setSelectedOrg(org)}
//                       className="inline-flex items-center gap-1.5 text-[#FC6C26] font-semibold text-sm hover:underline"
//                     >
//                       <Eye size={16} />
//                       View
//                     </button>
//                   </td>
//                 </tr>
//               ))}

//               {organizations.length === 0 && (
//                 <tr>
//                   <td colSpan={7} className="px-6 py-16 text-center text-gray-400">
//                     No referred organizations yet
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* ===================== VIEW ORGANIZATION MODAL ===================== */}
//       {selectedOrg && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
//           <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl">
//             {/* Modal Header */}
//             <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
//               <div>
//                 <h2 className="text-xl font-bold text-gray-900">
//                   {selectedOrg.name}
//                 </h2>
//                 <p className="text-sm text-gray-500 mt-0.5">
//                   Commission: {selectedOrg.commission_percent}% (
//                   {selectedOrg.commission_type})
//                 </p>
//               </div>
//               <button
//                 onClick={() => setSelectedOrg(null)}
//                 className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             {/* Modal Body */}
//             <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
//               {/* Summary Cards */}
//               <div className="grid grid-cols-3 gap-4 mb-6">
//                 <div className="bg-orange-50 rounded-xl p-4 text-center">
//                   <p className="text-2xl font-bold text-[#FC6C26]">
//                     {selectedOrg.commission_percent}%
//                   </p>
//                   <p className="text-xs text-gray-500 mt-1">Commission Rate</p>
//                 </div>
//                 <div className="bg-blue-50 rounded-xl p-4 text-center">
//                   <p className="text-2xl font-bold text-blue-600">
//                     {selectedOrg.total_cards}
//                   </p>
//                   <p className="text-xs text-gray-500 mt-1">Total Cards</p>
//                 </div>
//                 <div className="bg-green-50 rounded-xl p-4 text-center">
//                   <p className="text-2xl font-bold text-green-600">
//                     ₹{selectedOrg.total_commission.toLocaleString("en-IN")}
//                   </p>
//                   <p className="text-xs text-gray-500 mt-1">Total Earned</p>
//                 </div>
//               </div>

//               {/* Transactions Table */}
//               <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
//                 <CreditCard size={18} />
//                 Transactions
//               </h3>

//               <div className="border border-gray-100 rounded-xl overflow-hidden">
//                 <table className="w-full text-left text-sm">
//                   <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
//                     <tr>
//                       <th className="px-4 py-3">Date</th>
//                       <th className="px-4 py-3">Cards</th>
//                       <th className="px-4 py-3">Amount</th>
//                       <th className="px-4 py-3">Your Commission</th>
//                       <th className="px-4 py-3">Status</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-50">
//                     {selectedOrg.transactions.map((tx) => (
//                       <tr key={tx.id} className="hover:bg-gray-50">
//                         <td className="px-4 py-3 flex items-center gap-1.5 text-gray-600">
//                           <Calendar size={14} />
//                           {tx.date}
//                         </td>
//                         <td className="px-4 py-3 font-medium">{tx.cards}</td>
//                         <td className="px-4 py-3">
//                           ₹{tx.amount.toLocaleString("en-IN")}
//                         </td>
//                         <td className="px-4 py-3 font-semibold text-green-600">
//                           ₹{tx.commission.toLocaleString("en-IN")}
//                         </td>
//                         <td className="px-4 py-3">
//                           <span
//                             className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
//                               tx.status === "Paid"
//                                 ? "bg-green-100 text-green-700"
//                                 : "bg-yellow-100 text-yellow-700"
//                             }`}
//                           >
//                             {tx.status}
//                           </span>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// src/pages/affiliate/MyReferredOrganizations.jsx

import { useState } from "react";
import {
  Eye,
  X,
  Percent,
  CreditCard,
  Calendar,
  Mail,
  Phone,
  Building2,
} from "lucide-react";

const PRIMARY = "#fe7f2d";
const DARK = "#464243";

export default function MyReferredOrganizations() {
  const [selectedOrg, setSelectedOrg] = useState(null);

  // ============================================================
  // STATIC DATA
  // Replace this with API data later
  // ============================================================

  const organizations = [
    {
      id: 1,
      name: "Brand Crest Digital Private Limited",
      email: "sales.brandcrestdigital@gmail.com",
      phone: "7204480016",
      commission_percent: 10,
      commission_type: "lifetime",
      total_cards: 12,
      total_commission: 1850.5,

      transactions: [
        {
          id: 101,
          date: "25/08/2026",
          cards: 5,
          amount: 4500,
          commission: 450,
          status: "Paid",
        },
        {
          id: 102,
          date: "18/08/2026",
          cards: 4,
          amount: 3600,
          commission: 360,
          status: "Paid",
        },
        {
          id: 103,
          date: "10/08/2026",
          cards: 3,
          amount: 2700,
          commission: 270,
          status: "Pending",
        },
      ],
    },

    {
      id: 2,
      name: "Shree Jee Trading Co",
      email: "goelamit283@gmail.com",
      phone: "9667416210",
      commission_percent: 10,
      commission_type: "lifetime",
      total_cards: 1,
      total_commission: 85,

      transactions: [
        {
          id: 201,
          date: "25/08/2026",
          cards: 1,
          amount: 850,
          commission: 85,
          status: "Paid",
        },
      ],
    },

    {
      id: 3,
      name: "Chandgothia Artha Saarathee",
      email: "arthasarathree@gmail.com",
      phone: "9435231100",
      commission_percent: 8,
      commission_type: "onetime",
      total_cards: 1,
      total_commission: 68,

      transactions: [
        {
          id: 301,
          date: "19/08/2026",
          cards: 1,
          amount: 850,
          commission: 68,
          status: "Paid",
        },
      ],
    },
  ];

  // ============================================================
  // MASK EMAIL
  // ============================================================

  const maskEmail = (email) => {
    if (!email) return "-";

    const [name, domain] = email.split("@");

    if (!name || !domain) {
      return email;
    }

    return `${name.slice(0, 2)}****@${domain}`;
  };

  // ============================================================
  // MASK PHONE
  // ============================================================

  const maskPhone = (phone) => {
    if (!phone) return "-";

    return `******${phone.slice(-4)}`;
  };

  // ============================================================
  // FORMAT MONEY
  // ============================================================

  const formatMoney = (amount) => {
    return Number(amount).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // ============================================================
  // COMMISSION TYPE LABEL
  // ============================================================

  const getCommissionTypeLabel = (type) => {
    if (type === "lifetime") {
      return "Lifetime";
    }

    if (type === "onetime") {
      return "One Time";
    }

    return type || "-";
  };

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
      {/* ========================================================
          HEADER
      ========================================================= */}

      <div className="mb-6 lg:mb-8">
        <h1
          className="
            text-2xl
            sm:text-3xl
            font-bold
          "
          style={{ color: DARK }}
        >
          My Referred Organizations
        </h1>

        <p className="text-gray-500 mt-1 text-sm sm:text-base">
          Organizations registered using your referral link
        </p>
      </div>

      {/* ========================================================
          DESKTOP TABLE
      ========================================================= */}

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
        {/* Horizontal scroll for tablet / desktop */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left">
            {/* ==================================================
                TABLE HEADER
            ================================================== */}

            <thead>
              <tr
                className="
                  bg-gray-50
                  border-b
                  border-gray-100
                  text-xs
                  font-semibold
                  text-gray-500
                  uppercase
                  tracking-wider
                "
              >
                <th className="px-6 py-4">
                  Name
                </th>

                <th className="px-6 py-4">
                  Email
                </th>

                <th className="px-6 py-4">
                  Phone
                </th>

                <th className="px-6 py-4 text-center">
                  Commission %
                </th>

                <th className="px-6 py-4 text-center">
                  Total Cards
                </th>

                <th className="px-6 py-4 text-center">
                  Total Earned
                </th>

                <th className="px-6 py-4 text-center">
                  Action
                </th>
              </tr>
            </thead>

            {/* ==================================================
                TABLE BODY
            ================================================== */}

            <tbody className="divide-y divide-gray-50">
              {organizations.map((org) => (
                <tr
                  key={org.id}
                  className="
                    hover:bg-orange-50/40
                    transition
                  "
                >
                  {/* NAME */}

                  <td
                    className="
                      px-6
                      py-4
                      font-medium
                      text-gray-900
                    "
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          w-10
                          h-10
                          rounded-xl
                          flex
                          items-center
                          justify-center
                          shrink-0
                        "
                        style={{
                          backgroundColor: "#fff4ec",
                        }}
                      >
                        <Building2
                          size={19}
                          style={{ color: PRIMARY }}
                        />
                      </div>

                      <span>
                        {org.name}
                      </span>
                    </div>
                  </td>

                  {/* EMAIL */}

                  <td
                    className="
                      px-6
                      py-4
                      text-gray-600
                      text-sm
                    "
                  >
                    {maskEmail(org.email)}
                  </td>

                  {/* PHONE */}

                  <td
                    className="
                      px-6
                      py-4
                      text-gray-600
                      text-sm
                    "
                  >
                    {maskPhone(org.phone)}
                  </td>

                  {/* COMMISSION */}

                  <td className="px-6 py-4 text-center">
                    <span
                      className="
                        inline-flex
                        items-center
                        gap-1
                        px-2.5
                        py-1
                        rounded-full
                        text-sm
                        font-semibold
                      "
                      style={{
                        backgroundColor: "#fff4ec",
                        color: PRIMARY,
                      }}
                    >
                      <Percent size={12} />

                      {org.commission_percent}%
                    </span>
                  </td>

                  {/* CARDS */}

                  <td
                    className="
                      px-6
                      py-4
                      text-center
                      font-medium
                      text-gray-800
                    "
                  >
                    {org.total_cards}
                  </td>

                  {/* TOTAL EARNED */}

                  <td
                    className="
                      px-6
                      py-4
                      text-center
                      font-semibold
                      text-green-600
                    "
                  >
                    ₹{formatMoney(org.total_commission)}
                  </td>

                  {/* ACTION */}

                  <td className="px-6 py-4 text-center">
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedOrg(org)
                      }
                      className="
                        inline-flex
                        items-center
                        gap-1.5
                        font-semibold
                        text-sm
                        hover:underline
                        transition
                      "
                      style={{
                        color: PRIMARY,
                      }}
                    >
                      <Eye size={16} />

                      View
                    </button>
                  </td>
                </tr>
              ))}

              {/* EMPTY STATE */}

              {organizations.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="
                      px-6
                      py-16
                      text-center
                      text-gray-400
                    "
                  >
                    No referred organizations yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================
          MOBILE ORGANIZATION CARDS
      ========================================================= */}

      <div className="md:hidden mt-4 space-y-4">
        {organizations.map((org) => (
          <div
            key={org.id}
            className="
              bg-white
              rounded-2xl
              border
              border-gray-100
              shadow-sm
              p-4
            "
          >
            {/* ORGANIZATION HEADER */}

            <div className="flex items-start gap-3">
              <div
                className="
                  w-11
                  h-11
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
                style={{
                  backgroundColor: "#fff4ec",
                }}
              >
                <Building2
                  size={21}
                  style={{ color: PRIMARY }}
                />
              </div>

              <div className="min-w-0 flex-1">
                <h3
                  className="
                    font-semibold
                    text-gray-900
                    text-sm
                    leading-5
                  "
                >
                  {org.name}
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                  Organization #{org.id}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedOrg(org)
                }
                className="
                  w-9
                  h-9
                  rounded-lg
                  flex
                  items-center
                  justify-center
                  shrink-0
                  transition
                "
                style={{
                  backgroundColor: "#fff4ec",
                  color: PRIMARY,
                }}
                aria-label="View organization"
              >
                <Eye size={18} />
              </button>
            </div>

            {/* CONTACT INFORMATION */}

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail
                  size={15}
                  className="text-gray-400 shrink-0"
                />

                <span className="truncate">
                  {maskEmail(org.email)}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone
                  size={15}
                  className="text-gray-400 shrink-0"
                />

                <span>
                  {maskPhone(org.phone)}
                </span>
              </div>
            </div>

            {/* SUMMARY */}

            <div
              className="
                grid
                grid-cols-3
                gap-2
                mt-4
                pt-4
                border-t
                border-gray-100
              "
            >
              <div className="text-center">
                <p
                  className="
                    text-sm
                    font-bold
                  "
                  style={{ color: PRIMARY }}
                >
                  {org.commission_percent}%
                </p>

                <p className="text-[11px] text-gray-500 mt-1">
                  Commission
                </p>
              </div>

              <div className="text-center">
                <p className="text-sm font-bold text-blue-600">
                  {org.total_cards}
                </p>

                <p className="text-[11px] text-gray-500 mt-1">
                  Cards
                </p>
              </div>

              <div className="text-center">
                <p className="text-sm font-bold text-green-600">
                  ₹{formatMoney(org.total_commission)}
                </p>

                <p className="text-[11px] text-gray-500 mt-1">
                  Earned
                </p>
              </div>
            </div>

            {/* VIEW BUTTON */}

            <button
              type="button"
              onClick={() =>
                setSelectedOrg(org)
              }
              className="
                w-full
                mt-4
                py-2.5
                rounded-xl
                border
                text-sm
                font-semibold
                transition
              "
              style={{
                borderColor: "#fed7aa",
                color: PRIMARY,
                backgroundColor: "#fffaf7",
              }}
            >
              View Transactions
            </button>
          </div>
        ))}
      </div>

      {/* ========================================================
          EMPTY MOBILE STATE
      ========================================================= */}

      {organizations.length === 0 && (
        <div
          className="
            md:hidden
            bg-white
            rounded-2xl
            border
            border-gray-100
            shadow-sm
            px-6
            py-16
            mt-4
            text-center
            text-gray-400
          "
        >
          No referred organizations yet
        </div>
      )}

      {/* ========================================================
          ORGANIZATION DETAILS MODAL
      ========================================================= */}

      {selectedOrg && (
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
            px-3
            sm:px-4
            py-4
          "
          onClick={() =>
            setSelectedOrg(null)
          }
        >
          <div
            className="
              bg-white
              rounded-2xl
              w-full
              max-w-3xl
              max-h-[94vh]
              sm:max-h-[90vh]
              overflow-hidden
              shadow-2xl
              flex
              flex-col
            "
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            {/* ==================================================
                MODAL HEADER
            ================================================== */}

            <div
              className="
                flex
                items-start
                justify-between
                gap-4
                px-4
                sm:px-6
                py-4
                sm:py-5
                border-b
                border-gray-100
                shrink-0
              "
            >
              <div className="min-w-0">
                <h2
                  className="
                    text-lg
                    sm:text-xl
                    font-bold
                    text-gray-900
                    break-words
                  "
                >
                  {selectedOrg.name}
                </h2>

                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Commission:{" "}
                  <span className="font-medium">
                    {selectedOrg.commission_percent}%
                  </span>{" "}
                  (
                  {getCommissionTypeLabel(
                    selectedOrg.commission_type
                  )}
                  )
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedOrg(null)
                }
                className="
                  p-2
                  rounded-full
                  hover:bg-gray-100
                  text-gray-500
                  transition
                  shrink-0
                "
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* ==================================================
                MODAL BODY
            ================================================== */}

            <div
              className="
                p-4
                sm:p-6
                overflow-y-auto
              "
            >
              {/* =================================================
                  ORGANIZATION CONTACT
              ================================================= */}

              <div
                className="
                  bg-gray-50
                  rounded-xl
                  p-4
                  mb-5
                  space-y-2
                "
              >
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail
                    size={16}
                    className="text-gray-400"
                  />

                  <span className="break-all">
                    {maskEmail(
                      selectedOrg.email
                    )}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone
                    size={16}
                    className="text-gray-400"
                  />

                  <span>
                    {maskPhone(
                      selectedOrg.phone
                    )}
                  </span>
                </div>
              </div>

              {/* =================================================
                  SUMMARY CARDS
              ================================================= */}

              <div
                className="
                  grid
                  grid-cols-1
                  sm:grid-cols-3
                  gap-3
                  sm:gap-4
                  mb-6
                "
              >
                {/* COMMISSION */}

                <div
                  className="
                    rounded-xl
                    p-4
                    text-center
                  "
                  style={{
                    backgroundColor: "#fff4ec",
                  }}
                >
                  <p
                    className="
                      text-2xl
                      font-bold
                    "
                    style={{
                      color: PRIMARY,
                    }}
                  >
                    {selectedOrg.commission_percent}%
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Commission Rate
                  </p>
                </div>

                {/* CARDS */}

                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {selectedOrg.total_cards}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Total Cards
                  </p>
                </div>

                {/* EARNED */}

                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <p className="text-xl sm:text-2xl font-bold text-green-600">
                    ₹
                    {formatMoney(
                      selectedOrg.total_commission
                    )}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Total Earned
                  </p>
                </div>
              </div>

              {/* =================================================
                  TRANSACTIONS TITLE
              ================================================= */}

              <h3
                className="
                  font-semibold
                  text-gray-900
                  mb-3
                  flex
                  items-center
                  gap-2
                "
              >
                <CreditCard size={18} />

                Transactions
              </h3>

              {/* =================================================
                  TRANSACTIONS TABLE
              ================================================= */}

              <div
                className="
                  border
                  border-gray-100
                  rounded-xl
                  overflow-hidden
                "
              >
                <div className="overflow-x-auto">
                  <table
                    className="
                      w-full
                      min-w-[650px]
                      text-left
                      text-sm
                    "
                  >
                    <thead
                      className="
                        bg-gray-50
                        text-xs
                        text-gray-500
                        uppercase
                      "
                    >
                      <tr>
                        <th className="px-4 py-3">
                          Date
                        </th>

                        <th className="px-4 py-3">
                          Cards
                        </th>

                        <th className="px-4 py-3">
                          Amount
                        </th>

                        <th className="px-4 py-3">
                          Your Commission
                        </th>

                        <th className="px-4 py-3">
                          Status
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-50">
                      {selectedOrg.transactions.map(
                        (tx) => (
                          <tr
                            key={tx.id}
                            className="hover:bg-gray-50"
                          >
                            {/* DATE */}

                            <td
                              className="
                                px-4
                                py-3
                                text-gray-600
                              "
                            >
                              <div className="flex items-center gap-1.5 whitespace-nowrap">
                                <Calendar
                                  size={14}
                                />

                                {tx.date}
                              </div>
                            </td>

                            {/* CARDS */}

                            <td className="px-4 py-3 font-medium">
                              {tx.cards}
                            </td>

                            {/* AMOUNT */}

                            <td className="px-4 py-3 whitespace-nowrap">
                              ₹
                              {formatMoney(
                                tx.amount
                              )}
                            </td>

                            {/* COMMISSION */}

                            <td
                              className="
                                px-4
                                py-3
                                font-semibold
                                text-green-600
                                whitespace-nowrap
                              "
                            >
                              ₹
                              {formatMoney(
                                tx.commission
                              )}
                            </td>

                            {/* STATUS */}

                            <td className="px-4 py-3">
                              <span
                                className={`
                                  inline-flex
                                  px-2.5
                                  py-1
                                  rounded-full
                                  text-xs
                                  font-semibold
                                  ${
                                    tx.status ===
                                    "Paid"
                                      ? "bg-green-100 text-green-700"
                                      : "bg-yellow-100 text-yellow-700"
                                  }
                                `}
                              >
                                {tx.status}
                              </span>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* =================================================
                  MOBILE TRANSACTION CARDS
              ================================================= */}

              <div className="sm:hidden mt-3 space-y-3">
                {selectedOrg.transactions.map(
                  (tx) => (
                    <div
                      key={tx.id}
                      className="
                        border
                        border-gray-100
                        rounded-xl
                        p-4
                        bg-gray-50
                      "
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar
                            size={15}
                          />

                          {tx.date}
                        </div>

                        <span
                          className={`
                            px-2.5
                            py-1
                            rounded-full
                            text-xs
                            font-semibold
                            ${
                              tx.status ===
                              "Paid"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }
                          `}
                        >
                          {tx.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <p className="text-[11px] text-gray-500">
                            Cards
                          </p>

                          <p className="font-semibold text-gray-900 mt-0.5">
                            {tx.cards}
                          </p>
                        </div>

                        <div>
                          <p className="text-[11px] text-gray-500">
                            Amount
                          </p>

                          <p className="font-semibold text-gray-900 mt-0.5">
                            ₹
                            {formatMoney(
                              tx.amount
                            )}
                          </p>
                        </div>

                        <div>
                          <p className="text-[11px] text-gray-500">
                            Commission
                          </p>

                          <p className="font-semibold text-green-600 mt-0.5">
                            ₹
                            {formatMoney(
                              tx.commission
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* ==================================================
                MODAL FOOTER
            ================================================== */}

            <div
              className="
                border-t
                border-gray-100
                px-4
                sm:px-6
                py-3
                flex
                justify-end
                shrink-0
              "
            >
              <button
                type="button"
                onClick={() =>
                  setSelectedOrg(null)
                }
                className="
                  px-5
                  py-2.5
                  rounded-xl
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:opacity-90
                "
                style={{
                  backgroundColor: PRIMARY,
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}