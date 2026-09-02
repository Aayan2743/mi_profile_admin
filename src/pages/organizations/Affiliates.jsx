// import { useState } from "react";
// import AdminLayout from "../../components/layout/AdminLayout";
// import { successAlert, errorAlert } from "../../utils/alert";
// import { CheckCircle, XCircle, Clock, Percent } from "lucide-react";

// export default function Affiliates() {
//   const [affiliates, setAffiliates] = useState([
//     {
//       id: 1,
//       name: "Rahul Sharma",
//       email: "rahul.sharma@gmail.com",
//       phone: "9876543210",
//       status: "pending",
//       commission_percent: null,
//       commission_type: null,
//       created_at: "2026-08-25",
//     },
//     {
//       id: 2,
//       name: "Priya Patel",
//       email: "priya.patel@gmail.com",
//       phone: "9123456780",
//       status: "approved",
//       commission_percent: 10,
//       commission_type: "lifetime",
//       created_at: "2026-08-20",
//     },
//     {
//       id: 3,
//       name: "Amit Kumar",
//       email: "amit.kumar@gmail.com",
//       phone: "9988776655",
//       status: "pending",
//       commission_percent: null,
//       commission_type: null,
//       created_at: "2026-08-27",
//     },
//     {
//       id: 4,
//       name: "Sneha Reddy",
//       email: "sneha.reddy@gmail.com",
//       phone: "9765432109",
//       status: "rejected",
//       commission_percent: null,
//       commission_type: null,
//       created_at: "2026-08-15",
//     },
//   ]);

//   const [showModal, setShowModal] = useState(false);
//   const [selected, setSelected] = useState(null);
//   const [commission, setCommission] = useState("");
//   const [commissionType, setCommissionType] = useState("lifetime");
//   const [saving, setSaving] = useState(false);

//   const openApproveModal = (item) => {
//     setSelected(item);
//     setCommission(item.commission_percent || "");
//     setCommissionType(item.commission_type || "lifetime");
//     setShowModal(true);
//   };

//   const handleApprove = () => {
//     if (!commission || Number(commission) <= 0 || Number(commission) > 100) {
//       return errorAlert("Required", "Please enter a valid commission % (1-100)");
//     }

//     setSaving(true);

//     setTimeout(() => {
//       setAffiliates((prev) =>
//         prev.map((a) =>
//           a.id === selected.id
//             ? {
//                 ...a,
//                 status: "approved",
//                 commission_percent: Number(commission),
//                 commission_type: commissionType,
//               }
//             : a
//         )
//       );

//       successAlert("Approved", `${selected.name} has been approved successfully`);
//       setShowModal(false);
//       setSaving(false);
//     }, 600);
//   };

//   const handleReject = (item) => {
//     if (!window.confirm(`Reject ${item.name}?`)) return;

//     setAffiliates((prev) =>
//       prev.map((a) => (a.id === item.id ? { ...a, status: "rejected" } : a))
//     );
//     successAlert("Rejected", `${item.name} has been rejected`);
//   };

//   const statusBadge = (status) => {
//     if (status === "approved") {
//       return (
//         <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
//           <CheckCircle size={12} /> Approved
//         </span>
//       );
//     }
//     if (status === "rejected") {
//       return (
//         <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
//           <XCircle size={12} /> Rejected
//         </span>
//       );
//     }
//     return (
//       <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
//         <Clock size={12} /> Pending
//       </span>
//     );
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Affiliates</h1>
//           <p className="text-gray-500 mt-1">
//             Manage affiliate registrations and approvals
//           </p>
//         </div>

//         {/* Table */}
//         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full text-left">
//               <thead>
//                 <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                   <th className="px-6 py-4">ID</th>
//                   <th className="px-6 py-4">Name</th>
//                   <th className="px-6 py-4">Email</th>
//                   <th className="px-6 py-4">Phone</th>
//                   <th className="px-6 py-4">Registered On</th>
//                   <th className="px-6 py-4 text-center">Status</th>
//                   <th className="px-6 py-4 text-center">Commission</th>
//                   <th className="px-6 py-4 text-center">Type</th>
//                   <th className="px-6 py-4 text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-50">
//                 {affiliates.map((item) => (
//                   <tr key={item.id} className="hover:bg-orange-50/40 transition">
//                     <td className="px-6 py-4 text-sm text-gray-600">{item.id}</td>
//                     <td className="px-6 py-4 font-medium text-gray-900">
//                       {item.name}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">
//                       {item.email}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">
//                       {item.phone}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">
//                       {item.created_at}
//                     </td>
//                     <td className="px-6 py-4 text-center">
//                       {statusBadge(item.status)}
//                     </td>
//                     <td className="px-6 py-4 text-center font-semibold text-[#FC6C26]">
//                       {item.commission_percent
//                         ? `${item.commission_percent}%`
//                         : "-"}
//                     </td>
//                     <td className="px-6 py-4 text-center capitalize text-sm">
//                       {item.commission_type || "-"}
//                     </td>
//                     <td className="px-6 py-4 text-center">
//                       {item.status === "pending" && (
//                         <div className="flex items-center justify-center gap-3">
//                           <button
//                             onClick={() => openApproveModal(item)}
//                             className="text-green-600 font-semibold text-sm hover:underline"
//                           >
//                             Approve
//                           </button>
//                           <button
//                             onClick={() => handleReject(item)}
//                             className="text-red-500 font-semibold text-sm hover:underline"
//                           >
//                             Reject
//                           </button>
//                         </div>
//                       )}
//                       {item.status === "approved" && (
//                         <button
//                           onClick={() => openApproveModal(item)}
//                           className="text-[#FC6C26] font-semibold text-sm hover:underline"
//                         >
//                           Edit
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Approve Modal */}
//       {showModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
//           <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
//             <div className="px-6 py-5 border-b border-gray-100">
//               <h2 className="text-xl font-bold text-gray-900">
//                 {selected?.status === "approved" ? "Edit" : "Approve"} Affiliate
//               </h2>
//               <p className="text-sm text-gray-500 mt-1">{selected?.name}</p>
//             </div>

//             <div className="p-6 space-y-5">
//               {/* Commission % */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                   Commission % <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <Percent
//                     size={18}
//                     className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//                   />
//                   <input
//                     type="number"
//                     min="1"
//                     max="100"
//                     step="0.1"
//                     value={commission}
//                     onChange={(e) => setCommission(e.target.value)}
//                     className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#FC6C26] focus:ring-2 focus:ring-orange-100"
//                     placeholder="e.g. 10"
//                   />
//                 </div>
//                 <p className="text-xs text-gray-400 mt-1">
//                   % of commission on card purchase amount
//                 </p>
//               </div>

//               {/* Commission Type */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                   Commission Type <span className="text-red-500">*</span>
//                 </label>
//                 <div className="grid grid-cols-2 gap-3">
//                   <button
//                     type="button"
//                     onClick={() => setCommissionType("lifetime")}
//                     className={`py-3 rounded-xl border text-sm font-semibold transition ${
//                       commissionType === "lifetime"
//                         ? "border-[#FC6C26] bg-orange-50 text-[#FC6C26]"
//                         : "border-gray-200 text-gray-600 hover:border-gray-300"
//                     }`}
//                   >
//                     Lifetime
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => setCommissionType("onetime")}
//                     className={`py-3 rounded-xl border text-sm font-semibold transition ${
//                       commissionType === "onetime"
//                         ? "border-[#FC6C26] bg-orange-50 text-[#FC6C26]"
//                         : "border-gray-200 text-gray-600 hover:border-gray-300"
//                     }`}
//                   >
//                     One-time
//                   </button>
//                 </div>
//                 <p className="text-xs text-gray-400 mt-2">
//                   {commissionType === "lifetime"
//                     ? "Commission on every future transaction"
//                     : "Commission only on the first purchase"}
//                 </p>
//               </div>
//             </div>

//             <div className="flex gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="flex-1 py-2.5 border border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-white"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleApprove}
//                 disabled={saving}
//                 className="flex-1 py-2.5 bg-[#FC6C26] text-white font-semibold rounded-xl hover:bg-orange-600 disabled:opacity-60 flex items-center justify-center gap-2"
//               >
//                 {saving && (
//                   <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 )}
//                 {saving
//                   ? "Saving..."
//                   : selected?.status === "approved"
//                   ? "Update"
//                   : "Approve"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </AdminLayout>
//   );
// }


// import { useState } from "react";
// import AdminLayout from "../../components/layout/AdminLayout";
// import { successAlert, errorAlert } from "../../utils/alert";
// import { CheckCircle, XCircle, Clock, Percent } from "lucide-react";

// export default function Affiliates() {
//   const [affiliates, setAffiliates] = useState([
//     {
//       id: 1,
//       name: "Rahul Sharma",
//       email: "rahul.sharma@gmail.com",
//       phone: "9876543210",
//       status: "pending",
//       is_active: true,
//       commission_percent: null,
//       commission_type: null,
//       created_at: "2026-08-25",
//       reject_remark: null,
//     },
//     {
//       id: 2,
//       name: "Priya Patel",
//       email: "priya.patel@gmail.com",
//       phone: "9123456780",
//       status: "approved",
//       is_active: true,
//       commission_percent: 10,
//       commission_type: "lifetime",
//       created_at: "2026-08-20",
//       reject_remark: null,
//     },
//     {
//       id: 3,
//       name: "Amit Kumar",
//       email: "amit.kumar@gmail.com",
//       phone: "9988776655",
//       status: "pending",
//       is_active: true,
//       commission_percent: null,
//       commission_type: null,
//       created_at: "2026-08-27",
//       reject_remark: null,
//     },
//     {
//       id: 4,
//       name: "Sneha Reddy",
//       email: "sneha.reddy@gmail.com",
//       phone: "9765432109",
//       status: "rejected",
//       is_active: false,
//       commission_percent: null,
//       commission_type: null,
//       created_at: "2026-08-15",
//       reject_remark: "Incomplete documents",
//     },
//   ]);

//   // Approve modal
//   const [showModal, setShowModal] = useState(false);
//   const [selected, setSelected] = useState(null);
//   const [commission, setCommission] = useState("");
//   const [commissionType, setCommissionType] = useState("lifetime");
//   const [saving, setSaving] = useState(false);

//   // Reject modal
//   const [showRejectModal, setShowRejectModal] = useState(false);
//   const [rejectItem, setRejectItem] = useState(null);
//   const [rejectRemark, setRejectRemark] = useState("");

//   const openApproveModal = (item) => {
//     setSelected(item);
//     setCommission(item.commission_percent || "");
//     setCommissionType(item.commission_type || "lifetime");
//     setShowModal(true);
//   };

//   const handleApprove = () => {
//     if (!commission || Number(commission) <= 0 || Number(commission) > 100) {
//       return errorAlert("Required", "Please enter a valid commission % (1-100)");
//     }

//     setSaving(true);

//     setTimeout(() => {
//       setAffiliates((prev) =>
//         prev.map((a) =>
//           a.id === selected.id
//             ? {
//                 ...a,
//                 status: "approved",
//                 is_active: true,
//                 commission_percent: Number(commission),
//                 commission_type: commissionType,
//                 reject_remark: null,
//               }
//             : a
//         )
//       );

//       successAlert("Approved", `${selected.name} has been approved successfully`);
//       setShowModal(false);
//       setSaving(false);
//     }, 600);
//   };

//   const openRejectModal = (item) => {
//     setRejectItem(item);
//     setRejectRemark("");
//     setShowRejectModal(true);
//   };

//   const handleReject = () => {
//     if (!rejectRemark.trim()) {
//       return errorAlert("Required", "Please enter a remark for rejection");
//     }

//     setAffiliates((prev) =>
//       prev.map((a) =>
//         a.id === rejectItem.id
//           ? {
//               ...a,
//               status: "rejected",
//               is_active: false,
//               reject_remark: rejectRemark.trim(),
//             }
//           : a
//       )
//     );

//     successAlert("Rejected", `${rejectItem.name} has been rejected`);
//     setShowRejectModal(false);
//     setRejectRemark("");
//   };

//   const toggleActive = (item) => {
//     if (item.status !== "approved") {
//       return errorAlert("Not Allowed", "Only approved affiliates can be activated/deactivated");
//     }

//     setAffiliates((prev) =>
//       prev.map((a) =>
//         a.id === item.id ? { ...a, is_active: !a.is_active } : a
//       )
//     );

//     successAlert(
//       "Updated",
//       `${item.name} is now ${item.is_active ? "Inactive" : "Active"}`
//     );
//   };

//   const statusBadge = (status) => {
//     if (status === "approved") {
//       return (
//         <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
//           <CheckCircle size={12} /> Approved
//         </span>
//       );
//     }
//     if (status === "rejected") {
//       return (
//         <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
//           <XCircle size={12} /> Rejected
//         </span>
//       );
//     }
//     return (
//       <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
//         <Clock size={12} /> Pending
//       </span>
//     );
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Affiliates</h1>
//           <p className="text-gray-500 mt-1">
//             Manage affiliate registrations and approvals
//           </p>
//         </div>

//         {/* Table */}
//         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full text-left">
//               <thead>
//                 <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                   <th className="px-5 py-4">ID</th>
//                   <th className="px-5 py-4">Name</th>
//                   <th className="px-5 py-4">Email</th>
//                   <th className="px-5 py-4">Phone</th>
//                   <th className="px-5 py-4">Registered On</th>
//                   <th className="px-5 py-4 text-center">Status</th>
//                   <th className="px-5 py-4 text-center">Commission</th>
//                   <th className="px-5 py-4 text-center">Type</th>
//                   <th className="px-5 py-4 text-center">Active</th>
//                   <th className="px-5 py-4 text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-50">
//                 {affiliates.map((item) => (
//                   <tr key={item.id} className="hover:bg-orange-50/40 transition">
//                     <td className="px-5 py-4 text-sm text-gray-600">{item.id}</td>
//                     <td className="px-5 py-4 font-medium text-gray-900">
//                       {item.name}
//                     </td>
//                     <td className="px-5 py-4 text-sm text-gray-600">
//                       {item.email}
//                     </td>
//                     <td className="px-5 py-4 text-sm text-gray-600">
//                       {item.phone}
//                     </td>
//                     <td className="px-5 py-4 text-sm text-gray-600">
//                       {item.created_at}
//                     </td>
//                     <td className="px-5 py-4 text-center">
//                       {statusBadge(item.status)}
//                     </td>
//                     <td className="px-5 py-4 text-center font-semibold text-[#FC6C26]">
//                       {item.commission_percent
//                         ? `${item.commission_percent}%`
//                         : "-"}
//                     </td>
//                     <td className="px-5 py-4 text-center capitalize text-sm">
//                       {item.commission_type || "-"}
//                     </td>

//                     {/* Active / Inactive Toggle */}
//                     <td className="px-5 py-4 text-center">
//                       <button
//                         onClick={() => toggleActive(item)}
//                         disabled={item.status !== "approved"}
//                         className={`relative w-11 h-6 rounded-full transition ${
//                           item.is_active ? "bg-green-500" : "bg-gray-300"
//                         } ${item.status !== "approved" ? "opacity-40 cursor-not-allowed" : ""}`}
//                       >
//                         <span
//                           className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
//                             item.is_active ? "translate-x-5" : "translate-x-0"
//                           }`}
//                         />
//                       </button>
//                     </td>

//                     <td className="px-5 py-4 text-center">
//                       {item.status === "pending" && (
//                         <div className="flex items-center justify-center gap-3">
//                           <button
//                             onClick={() => openApproveModal(item)}
//                             className="text-green-600 font-semibold text-sm hover:underline"
//                           >
//                             Approve
//                           </button>
//                           <button
//                             onClick={() => openRejectModal(item)}
//                             className="text-red-500 font-semibold text-sm hover:underline"
//                           >
//                             Reject
//                           </button>
//                         </div>
//                       )}
//                       {item.status === "approved" && (
//                         <button
//                           onClick={() => openApproveModal(item)}
//                           className="text-[#FC6C26] font-semibold text-sm hover:underline"
//                         >
//                           Edit
//                         </button>
//                       )}
//                       {item.status === "rejected" && item.reject_remark && (
//                         <span
//                           className="text-xs text-gray-400 cursor-help"
//                           title={item.reject_remark}
//                         >
//                           View Remark
//                         </span>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* ===================== APPROVE MODAL ===================== */}
//       {showModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
//           <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
//             <div className="px-6 py-5 border-b border-gray-100">
//               <h2 className="text-xl font-bold text-gray-900">
//                 {selected?.status === "approved" ? "Edit" : "Approve"} Affiliate
//               </h2>
//               <p className="text-sm text-gray-500 mt-1">{selected?.name}</p>
//             </div>

//             <div className="p-6 space-y-5">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                   Commission % <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <Percent
//                     size={18}
//                     className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//                   />
//                   <input
//                     type="number"
//                     min="1"
//                     max="100"
//                     step="0.1"
//                     value={commission}
//                     onChange={(e) => setCommission(e.target.value)}
//                     className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#FC6C26] focus:ring-2 focus:ring-orange-100"
//                     placeholder="e.g. 10"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                   Commission Type <span className="text-red-500">*</span>
//                 </label>
//                 <div className="grid grid-cols-2 gap-3">
//                   <button
//                     type="button"
//                     onClick={() => setCommissionType("lifetime")}
//                     className={`py-3 rounded-xl border text-sm font-semibold transition ${
//                       commissionType === "lifetime"
//                         ? "border-[#FC6C26] bg-orange-50 text-[#FC6C26]"
//                         : "border-gray-200 text-gray-600"
//                     }`}
//                   >
//                     Lifetime
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => setCommissionType("onetime")}
//                     className={`py-3 rounded-xl border text-sm font-semibold transition ${
//                       commissionType === "onetime"
//                         ? "border-[#FC6C26] bg-orange-50 text-[#FC6C26]"
//                         : "border-gray-200 text-gray-600"
//                     }`}
//                   >
//                     One-time
//                   </button>
//                 </div>
//                 <p className="text-xs text-gray-400 mt-2">
//                   {commissionType === "lifetime"
//                     ? "Commission on every future transaction"
//                     : "Commission only on the first purchase"}
//                 </p>
//               </div>
//             </div>

//             <div className="flex gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="flex-1 py-2.5 border border-gray-200 rounded-xl font-medium"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleApprove}
//                 disabled={saving}
//                 className="flex-1 py-2.5 bg-[#FC6C26] text-white font-semibold rounded-xl disabled:opacity-60 flex items-center justify-center gap-2"
//               >
//                 {saving && (
//                   <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 )}
//                 {saving
//                   ? "Saving..."
//                   : selected?.status === "approved"
//                   ? "Update"
//                   : "Approve"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ===================== REJECT MODAL (with Remark) ===================== */}
//       {showRejectModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
//           <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
//             <div className="px-6 py-5 border-b border-gray-100">
//               <h2 className="text-xl font-bold text-gray-900">Reject Affiliate</h2>
//               <p className="text-sm text-gray-500 mt-1">{rejectItem?.name}</p>
//             </div>

//             <div className="p-6">
//               <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                 Remark / Reason <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 value={rejectRemark}
//                 onChange={(e) => setRejectRemark(e.target.value)}
//                 rows={4}
//                 className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 resize-none"
//                 placeholder="Enter reason for rejection..."
//               />
//             </div>

//             <div className="flex gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">
//               <button
//                 onClick={() => {
//                   setShowRejectModal(false);
//                   setRejectRemark("");
//                 }}
//                 className="flex-1 py-2.5 border border-gray-200 rounded-xl font-medium"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleReject}
//                 className="flex-1 py-2.5 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600"
//               >
//                 Reject
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </AdminLayout>
//   );
// }

import { useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { successAlert, errorAlert } from "../../utils/alert";
import { CheckCircle, XCircle, Clock, Percent } from "lucide-react";

export default function Affiliates() {
  const [affiliates, setAffiliates] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul.sharma@gmail.com",
      phone: "9876543210",
      status: "pending",
      is_active: false,
      commission_percent: null,
      commission_type: null,
      created_at: "2026-08-25",
      reject_remark: null,
    },
    {
      id: 2,
      name: "Priya Patel",
      email: "priya.patel@gmail.com",
      phone: "9123456780",
      status: "approved",
      is_active: true,
      commission_percent: 10,
      commission_type: "lifetime",
      created_at: "2026-08-20",
      reject_remark: null,
    },
    {
      id: 3,
      name: "Amit Kumar",
      email: "amit.kumar@gmail.com",
      phone: "9988776655",
      status: "pending",
      is_active: false,
      commission_percent: null,
      commission_type: null,
      created_at: "2026-08-27",
      reject_remark: null,
    },
    {
      id: 4,
      name: "Sneha Reddy",
      email: "sneha.reddy@gmail.com",
      phone: "9765432109",
      status: "rejected",
      is_active: false,
      commission_percent: null,
      commission_type: null,
      created_at: "2026-08-15",
      reject_remark: "Incomplete documents",
    },
  ]);

  // Approve modal
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [commission, setCommission] = useState("");
  const [commissionType, setCommissionType] = useState("lifetime");
  const [saving, setSaving] = useState(false);

  // Reject modal
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectItem, setRejectItem] = useState(null);
  const [rejectRemark, setRejectRemark] = useState("");

  const openApproveModal = (item) => {
    setSelected(item);
    setCommission(item.commission_percent || "");
    setCommissionType(item.commission_type || "lifetime");
    setShowModal(true);
  };

  const handleApprove = () => {
    if (!commission || Number(commission) <= 0 || Number(commission) > 100) {
      return errorAlert("Required", "Please enter a valid commission % (1-100)");
    }

    setSaving(true);

    setTimeout(() => {
      setAffiliates((prev) =>
        prev.map((a) =>
          a.id === selected.id
            ? {
                ...a,
                status: "approved",
                is_active: true, // becomes active on approval
                commission_percent: Number(commission),
                commission_type: commissionType,
                reject_remark: null,
              }
            : a
        )
      );

      successAlert("Approved", `${selected.name} has been approved successfully`);
      setShowModal(false);
      setSaving(false);
    }, 600);
  };

  const openRejectModal = (item) => {
    setRejectItem(item);
    setRejectRemark("");
    setShowRejectModal(true);
  };

  const handleReject = () => {
    if (!rejectRemark.trim()) {
      return errorAlert("Required", "Please enter a remark for rejection");
    }

    setAffiliates((prev) =>
      prev.map((a) =>
        a.id === rejectItem.id
          ? {
              ...a,
              status: "rejected",
              is_active: false,
              reject_remark: rejectRemark.trim(),
            }
          : a
      )
    );

    successAlert("Rejected", `${rejectItem.name} has been rejected`);
    setShowRejectModal(false);
    setRejectRemark("");
  };

  const toggleActive = (item) => {
    setAffiliates((prev) =>
      prev.map((a) =>
        a.id === item.id ? { ...a, is_active: !a.is_active } : a
      )
    );

    successAlert(
      "Updated",
      `${item.name} is now ${item.is_active ? "Inactive" : "Active"}`
    );
  };

  const statusBadge = (status) => {
    if (status === "approved") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
          <CheckCircle size={12} /> Approved
        </span>
      );
    }
    if (status === "rejected") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
          <XCircle size={12} /> Rejected
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
        <Clock size={12} /> Pending
      </span>
    );
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Affiliates</h1>
          <p className="text-gray-500 mt-1">
            Manage affiliate registrations and approvals
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="px-5 py-4">ID</th>
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4">Email</th>
                  <th className="px-5 py-4">Phone</th>
                  <th className="px-5 py-4">Registered On</th>
                  <th className="px-5 py-4 text-center">Status</th>
                  <th className="px-5 py-4 text-center">Commission</th>
                  <th className="px-5 py-4 text-center">Type</th>
                  <th className="px-5 py-4 text-center">Active</th>
                  <th className="px-5 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {affiliates.map((item) => (
                  <tr key={item.id} className="hover:bg-orange-50/40 transition">
                    <td className="px-5 py-4 text-sm text-gray-600">{item.id}</td>
                    <td className="px-5 py-4 font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-600">
                      {item.email}
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-600">
                      {item.phone}
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-600">
                      {item.created_at}
                    </td>
                    <td className="px-5 py-4 text-center">
                      {statusBadge(item.status)}
                    </td>
                    <td className="px-5 py-4 text-center font-semibold text-[#FC6C26]">
                      {item.commission_percent
                        ? `${item.commission_percent}%`
                        : "-"}
                    </td>
                    <td className="px-5 py-4 text-center capitalize text-sm">
                      {item.commission_type || "-"}
                    </td>

                    {/* Active Toggle - ONLY visible after approval */}
                    <td className="px-5 py-4 text-center">
                      {item.status === "approved" ? (
                        <button
                          onClick={() => toggleActive(item)}
                          className={`relative w-11 h-6 rounded-full transition ${
                            item.is_active ? "bg-gray-900" : "bg-gray-900"
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                              item.is_active ? "translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </button>
                      ) : (
                        <span className="text-gray-300 text-sm">-</span>
                      )}
                    </td>

                    <td className="px-5 py-4 text-center">
                      {item.status === "pending" && (
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => openApproveModal(item)}
                            className="text-green-600 font-semibold text-sm hover:underline"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => openRejectModal(item)}
                            className="text-red-500 font-semibold text-sm hover:underline"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                      {item.status === "approved" && (
                        <button
                          onClick={() => openApproveModal(item)}
                          className="text-[#FC6C26] font-semibold text-sm hover:underline"
                        >
                          Edit
                        </button>
                      )}
                      {item.status === "rejected" && item.reject_remark && (
                        <span
                          className="text-xs text-gray-400 cursor-help"
                          title={item.reject_remark}
                        >
                          View Remark
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ===================== APPROVE MODAL ===================== */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">
                {selected?.status === "approved" ? "Edit" : "Approve"} Affiliate
              </h2>
              <p className="text-sm text-gray-500 mt-1">{selected?.name}</p>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Commission % <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Percent
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="number"
                    min="1"
                    max="100"
                    step="0.1"
                    value={commission}
                    onChange={(e) => setCommission(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#FC6C26] focus:ring-2 focus:ring-orange-100"
                    placeholder="e.g. 10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Commission Type <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCommissionType("lifetime")}
                    className={`py-3 rounded-xl border text-sm font-semibold transition ${
                      commissionType === "lifetime"
                        ? "border-[#FC6C26] bg-orange-50 text-[#FC6C26]"
                        : "border-gray-200 text-gray-600"
                    }`}
                  >
                    Lifetime
                  </button>
                  <button
                    type="button"
                    onClick={() => setCommissionType("onetime")}
                    className={`py-3 rounded-xl border text-sm font-semibold transition ${
                      commissionType === "onetime"
                        ? "border-[#FC6C26] bg-orange-50 text-[#FC6C26]"
                        : "border-gray-200 text-gray-600"
                    }`}
                  >
                    One-time
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  {commissionType === "lifetime"
                    ? "Commission on every future transaction"
                    : "Commission only on the first purchase"}
                </p>
              </div>
            </div>

            <div className="flex gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                disabled={saving}
                className="flex-1 py-2.5 bg-[#FC6C26] text-white font-semibold rounded-xl disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {saving && (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {saving
                  ? "Saving..."
                  : selected?.status === "approved"
                  ? "Update"
                  : "Approve"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== REJECT MODAL ===================== */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Reject Affiliate</h2>
              <p className="text-sm text-gray-500 mt-1">{rejectItem?.name}</p>
            </div>

            <div className="p-6">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Remark / Reason <span className="text-red-500">*</span>
              </label>
              <textarea
                value={rejectRemark}
                onChange={(e) => setRejectRemark(e.target.value)}
                rows={4}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 resize-none"
                placeholder="Enter reason for rejection..."
              />
            </div>

            <div className="flex gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectRemark("");
                }}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                className="flex-1 py-2.5 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}