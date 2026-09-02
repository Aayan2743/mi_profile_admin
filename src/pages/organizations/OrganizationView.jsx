// // src/pages/organizations/OrganizationView.jsx
// import { useState, useMemo, useEffect } from "react";
// import { ArrowLeft, Download, Settings, Trash2, Edit, X } from "lucide-react";
// import { useNavigate, useParams } from "react-router-dom";
// import AdminLayout from "../../components/layout/AdminLayout";
// import Loader from "../../components/Loader";
// import AddCardsDrawer from "./AddCardsDrawer";
// import api from "../../services/api";
// import { successAlert, errorAlert } from "../../utils/alert";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";

// export default function OrganizationView() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [errors, setErrors] = useState({});
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [stats, setStats] = useState({
//     total_cards: 0,
//     active_cards: 0,
//     inactive_cards: 0,
//   });
//   const [page, setPage] = useState(1);
//   const [perPage, setPerPage] = useState(5);
//   const [organization, setOrganization] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [errorMsg, setErrorMsg] = useState("");
//   const [showAddCards, setShowAddCards] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [editForm, setEditForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//   });
//   const [editLoading, setEditLoading] = useState(false);

//   // Fetch single organization by ID
//   const fetchOrg = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get(`/orginazation-dashboard/organization/${id}`, {
//         params: {
//           page,
//           per_page: perPage,
//           search,
//         },
//       });

//       const responseData = res.data;
//       const orgData = responseData.data;

//       setOrganization({
//         ...orgData,
//         brand: responseData.brand?.[0] || null,
//       });

//       if (responseData.card_summary) {
//         setStats(responseData.card_summary);
//       }
//     } catch (err) {
//       console.error(err);
//       setErrorMsg("Failed to load organization details");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getStatus = (expiryDate) => {
//     const today = new Date();
//     const expiry = new Date(expiryDate);
//     return expiry >= today ? "Active" : "Expired";
//   };

//   useEffect(() => {
//     if (id) {
//       fetchOrg();
//     }
//   }, [id, page, perPage, search]);

//   // Edit form change handler
//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleExportExcel = () => {
//     if (!filteredTransactions.length) {
//       alert("No data to export");
//       return;
//     }

//     const data = filteredTransactions.map((tx) => ({
//       Date: new Date(tx.created_at).toLocaleDateString("en-IN"),
//       Cards: tx.total_cards,
//       Expiry: tx.expiry_date,
//       Status: getStatus(tx.expiry_date),
//       "Payment Status": tx.payment_status,
//       Amount: tx.total_amount,
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
//     const excelBuffer = XLSX.write(workbook, {
//       bookType: "xlsx",
//       type: "array",
//     });
//     const blob = new Blob([excelBuffer], {
//       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
//     });
//     saveAs(blob, `Organization_${organization.name}_Transactions.xlsx`);
//   };

//   // Update organization (post)
//   const handleUpdateOrg = async () => {
//     setEditLoading(true);
//     setErrors({});

//     try {
//       await api.post(`/orginazation-dashboard/organization/${id}`, {
//         name: editForm.name.trim(),
//         email: editForm.email.trim(),
//         phone: editForm.phone?.trim() || null,
//         password: editForm.password || null,
//       });

//       successAlert("Success", "Organization updated");
//       fetchOrg();
//       setShowEditModal(false);
//     } catch (err) {
//       if (err.response?.status === 422) {
//         const data = err.response.data;

//         if (data.error) {
//           setErrors(data.error);
//         } else {
//           errorAlert("Error", data.message || "Validation failed");
//         }

//         return;
//       }
//     } finally {
//       setEditLoading(false);
//     }
//   };

//   // Delete (soft delete)
//   const handleDelete = async () => {
//     if (!window.confirm("Delete this organization?")) return;

//     try {
//       await api.delete(`/orginazation-dashboard/organization/${id}`);
//       successAlert("Success", "Organization deleted");
//       navigate("/organizations");
//     } catch (err) {
//       const msg = err.response?.data?.message || "Delete failed";
//       errorAlert("Error", msg);
//     }
//   };

//   const transactions = organization?.card_purchases?.data || [];
//   const filteredTransactions = transactions.filter((tx) => {
//     const status = getStatus(tx.expiry_date);
//     const matchSearch =
//       tx.payment_status?.toLowerCase().includes(search.toLowerCase()) ||
//       tx.total_cards?.toString().includes(search);
//     const matchStatus = statusFilter === "all" || status === statusFilter;
//     return matchSearch && matchStatus;
//   });

//   const pagination = organization?.card_purchases || null;

//   if (loading) {
//     return (
//       <AdminLayout>
//         <div className="flex justify-center items-center h-64">
//           <Loader show text="Loading organization..." />
//         </div>
//       </AdminLayout>
//     );
//   }

//   if (errorMsg || !organization || typeof organization !== "object") {
//     return (
//       <AdminLayout>
//         <div className="text-center py-20 text-rose-500">
//           {errorMsg || "Organization not found"}
//           <button
//             onClick={() => navigate("/organizations")}
//             className="ml-4 px-5 py-2.5 bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-dark))] text-white  rounded-xl shadow transition"
//           >
//             Go Back
//           </button>
//         </div>
//       </AdminLayout>
//     );
//   }

//   return (
//     <AdminLayout>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
//         {/* HEADER */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
//           <button
//             onClick={() => navigate(-1)}
//             className="flex items-center gap-2 text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--accent))] transition-colors"
//           >
//             <ArrowLeft size={18} />
//             Back
//           </button>

//           <div className="flex flex-wrap gap-3">
//             <button
//               onClick={() => {
//                 setErrors({});
//                 setEditForm({
//                   name:
//                     organization.name || organization.organization_name || "",
//                   email: organization.email || "",
//                   phone: organization.phone || "",
//                   password: "",
//                 });

//                 setShowEditModal(true);
//               }}
//               className="flex items-center gap-2 px-5 py-2.5 bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-dark))] text-white rounded-xl shadow-md transition-all"
//             >
//               <Edit size={18} />
//               Edit
//             </button>

//             <button
//               onClick={handleDelete}
//               className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-md transition-all"
//             >
//               <Trash2 size={18} />
//               Delete
//             </button>
//           </div>
//         </div>

//         {/* HERO / COVER */}
//         <div className="relative mb-16 md:mb-20">
//           <img
//             src={organization.brand?.cover_page || "/assets/coverPic.jpg"}
//             onError={(e) => (e.currentTarget.src = "/assets/coverPic.jpg")}
//             className="w-full h-64 md:h-80 lg:h-96 rounded-2xl object-cover shadow-2xl"
//             alt="Cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent rounded-2xl" />

//           <div className="absolute left-6 md:left-8 -bottom-20 md:-bottom-24 bg-[hsl(var(--card-bg))] rounded-2xl shadow-2xl p-5 md:p-6 flex items-center gap-5 border border-[hsl(var(--border))]">
//             <img
//               src={organization.brand?.logo || "/assets/logo.jpeg"}
//               onError={(e) => (e.currentTarget.src = "/assets/logo.jpeg")}
//               className="w-20 h-20 md:w-24 md:h-24 rounded-xl border border-[hsl(var(--border))] object-cover"
//               alt="Logo"
//             />
//             <div>
//               <h2 className="text-2xl md:text-3xl font-bold text-[hsl(var(--text-primary))]">
//                 {organization.name || organization.organization_name}
//               </h2>
//               <p className="text-sm text-[hsl(var(--text-muted))] mt-1">
//                 {organization.email}
//               </p>
//               <p className="text-sm text-[hsl(var(--text-muted))]">
//                 {organization.phone}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* STATS */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
//           <StatCard label="Total Cards" value={stats.total_cards || 0} />
//           <StatCard
//             label="Active Cards"
//             value={stats.active_cards || 0}
//             green
//           />
//           <StatCard
//             label="Inactive Cards"
//             value={stats.inactive_cards || 0}
//             red
//           />
//         </div>

//         {/* ACTION BAR */}
//         <div className="flex flex-col md:flex-row flex-wrap gap-4 justify-between items-start md:items-center mb-8">
//           <div className="flex flex-wrap gap-3">
//             <button
//               onClick={() => {
//                 setPage(1);
//                 fetchOrg();
//               }}
//               className="px-5 py-2.5 bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-dark))] text-white   rounded-xl shadow-md transition-all"
//             >
//               Refresh
//             </button>

//             <select
//               value={perPage}
//               onChange={(e) => {
//                 setPerPage(Number(e.target.value));
//                 setPage(1);
//               }}
//               className="px-4 py-2.5 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card-bg))] text-[hsl(var(--text-primary))]"
//             >
//               <option value={5}>5 per page</option>
//               <option value={10}>10 per page</option>
//               <option value={20}>20 per page</option>
//             </select>

//             <input
//               type="text"
//               placeholder="Search transactions..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full md:w-64 px-4 py-2.5 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card-bg))] text-[hsl(var(--text-primary))] placeholder-[hsl(var(--text-muted))]"
//             />

//             <select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="px-4 py-2.5 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card-bg))] text-[hsl(var(--text-primary))]"
//             >
//               <option value="all">All Status</option>
//               <option value="Active">Active</option>
//               <option value="Expired">Expired</option>
//             </select>
//           </div>

//           <div className="flex flex-wrap gap-3">
//             <button
//               onClick={() => setShowAddCards(true)}
//               className="px-6 py-2.5 bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-dark))] text-white rounded-xl shadow-md transition-all"
//             >
//               + Add Cards
//             </button>

//             <button
//               onClick={() =>
//                 navigate(`/admin/organizations/${id}/access-settings`)
//               }
//               className="flex items-center gap-2 px-5 py-2.5 border border-[hsl(var(--border))] text-[hsl(var(--text-secondary))] hover:bg-[hsl(var(--accent)/0.1)] rounded-xl transition-all"
//             >
//               <Settings size={18} />
//               Access Settings
//             </button>

//             <button
//               onClick={handleExportExcel}
//               className="flex items-center gap-2 px-5 py-2.5 border border-[hsl(var(--border))] text-[hsl(var(--text-secondary))] hover:bg-[hsl(var(--accent)/0.1)] rounded-xl transition-all"
//             >
//               <Download size={18} />
//               Export Excel
//             </button>
//           </div>
//         </div>

//         {/* TRANSACTIONS TABLE */}
//         <div className="bg-[hsl(var(--card-bg))] rounded-2xl shadow-2xl overflow-hidden border border-[hsl(var(--border))]">
//           <div className="overflow-x-auto">
//             <table className="min-w-full text-sm divide-y divide-[hsl(var(--border))]">
//               <thead className="bg-[hsl(var(--bg-secondary)/0.6)]">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-[hsl(var(--text-muted))] uppercase tracking-wider">
//                     Date
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-[hsl(var(--text-muted))] uppercase tracking-wider">
//                     Cards
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-[hsl(var(--text-muted))] uppercase tracking-wider">
//                     Expiry
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-[hsl(var(--text-muted))] uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-[hsl(var(--text-muted))] uppercase tracking-wider">
//                     Payment Status
//                   </th>
//                   <th className="px-6 py-4 text-left text-xs font-semibold text-[hsl(var(--text-muted))] uppercase tracking-wider">
//                     Amount
//                   </th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {filteredTransactions.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan={6}
//                       className="p-12 text-center text-[hsl(var(--text-muted))] text-lg"
//                     >
//                       No transactions found
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredTransactions.map((tx) => (
//                     <tr
//                       key={tx.id}
//                       className="hover:bg-[hsl(var(--accent)/0.08)] transition-colors"
//                     >
//                       <td className="px-6 py-4 text-[hsl(var(--text-secondary))]">
//                         {new Date(tx.created_at).toLocaleDateString("en-IN")}
//                       </td>
//                       <td className="px-6 py-4 text-[hsl(var(--text-primary))]">
//                         {tx.total_cards}
//                       </td>
//                       <td className="px-6 py-4 text-[hsl(var(--text-secondary))]">
//                         {tx.expiry_date}
//                       </td>
//                       <td className="px-6 py-4">
//                         <span
//                           className={`px-3 py-1 rounded-full text-xs font-medium border
//                             ${
//                               getStatus(tx.expiry_date) === "Active"
//                                 ? "bg-emerald-500/20 text-emerald-900 border border-emerald-500/30"
//                                 : "bg-rose-500/20 text-rose-900 border border-rose-500/30"
//                             }`}
//                         >
//                           {getStatus(tx.expiry_date)}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4">
//                         <span
//                           className={`px-3 py-1 rounded-full text-xs font-medium border
//                             ${
//                               tx.payment_status === "paid"
//                                 ? "bg-emerald-500/20 text-emerald-500 border border-emerald-500/30"
//                                 : "bg-rose-500/20 text-rose-500 border border-rose-500/30"
//                             }`}
//                         >
//                           {tx.payment_status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 font-semibold text-[hsl(var(--accent))]">
//                         ₹{Number(tx.total_amount).toLocaleString("en-IN")}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* PAGINATION */}
//         {pagination && (
//           <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4 text-sm text-[hsl(var(--text-muted))]">
//             <p>
//               Showing {pagination.from} to {pagination.to} of {pagination.total}
//             </p>
//             <div className="flex gap-3">
//               <button
//                 disabled={!pagination.prev_page_url}
//                 onClick={() => setPage(page - 1)}
//                 className="px-5 py-2.5 rounded-xl border border-[hsl(var(--border))] disabled:opacity-50 hover:bg-[hsl(var(--accent)/0.1)] transition"
//               >
//                 Prev
//               </button>
//               <button
//                 disabled={!pagination.next_page_url}
//                 onClick={() => setPage(page + 1)}
//                 className="px-5 py-2.5 rounded-xl border border-[hsl(var(--border))] disabled:opacity-50 hover:bg-[hsl(var(--accent)/0.1)] transition"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}

//         {/* ADD CARDS DRAWER */}
//         {showAddCards && (
//           <AddCardsDrawer
//             organizationId={id}
//             onClose={() => setShowAddCards(false)}
//             onSuccess={() => {
//               successAlert("Success", "Cards added (refresh to see changes)");
//               fetchOrg(); // ← refresh data after adding cards
//             }}
//           />
//         )}

//         {/* EDIT MODAL */}
//         {showEditModal && (
//           <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
//             <div className="bg-[hsl(var(--card-bg))] rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-[hsl(var(--border))]">
//               {/* Header */}
//               <div className="flex justify-between items-center px-6 py-5 border-b border-[hsl(var(--border))] bg-[hsl(var(--bg-secondary)/0.6)]">
//                 <h3 className="text-xl font-semibold text-[hsl(var(--text-primary))]">
//                   Edit Organization
//                 </h3>
//                 <button
//                   onClick={() => setShowEditModal(false)}
//                   className="text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--accent))] transition"
//                 >
//                   <X size={22} />
//                 </button>
//               </div>

//               {/* Body */}
//               <div className="px-6 py-6 space-y-6">
//                 {/* Name */}
//                 <div>
//                   <label className="block text-sm font-medium text-[hsl(var(--text-muted))] mb-2">
//                     Organization Name <span className="text-rose-500">*</span>
//                   </label>
//                   <input
//                     name="name"
//                     value={editForm.name}
//                     onChange={handleEditChange}
//                     className="w-full px-4 py-3 rounded-xl border border-[hsl(var(--border))]
//                                bg-[hsl(var(--card-bg))] text-[hsl(var(--text-primary))]
//                                focus:border-[hsl(var(--accent))] focus:ring-2 focus:ring-[hsl(var(--accent)/0.3)]
//                                outline-none transition-all placeholder-[hsl(var(--text-muted))]"
//                     placeholder="Enter organization name"
//                   />

//                   {errors.name && (
//                     <p className="mt-1 text-sm text-red-500">
//                       {errors.name[0]}
//                     </p>
//                   )}
//                 </div>

//                 {/* Email */}
//                 <div>
//                   <label className="block text-sm font-medium text-[hsl(var(--text-muted))] mb-2">
//                     Email Address <span className="text-rose-500">*</span>
//                   </label>
//                   <input
//                     name="email"
//                     type="email"
//                     value={editForm.email}
//                     onChange={handleEditChange}
//                     className="w-full px-4 py-3 rounded-xl border border-[hsl(var(--border))]
//                                bg-[hsl(var(--card-bg))] text-[hsl(var(--text-primary))]
//                                focus:border-[hsl(var(--accent))] focus:ring-2 focus:ring-[hsl(var(--accent)/0.3)]
//                                outline-none transition-all placeholder-[hsl(var(--text-muted))]"
//                     placeholder="email@example.com"
//                   />
//                   {errors.email && (
//                     <p className="mt-1 text-sm text-red-500">
//                       {errors.email[0]}
//                     </p>
//                   )}
//                 </div>

//                 {/* Phone */}
//                 <div>
//                   <label className="block text-sm font-medium text-[hsl(var(--text-muted))] mb-2">
//                     Phone Number
//                   </label>
//                   <input
//                     name="phone"
//                     type="tel"
//                     value={editForm.phone}
//                     onChange={handleEditChange}
//                     className="w-full px-4 py-3 rounded-xl border border-[hsl(var(--border))]
//                                bg-[hsl(var(--card-bg))] text-[hsl(var(--text-primary))]
//                                focus:border-[hsl(var(--accent))] focus:ring-2 focus:ring-[hsl(var(--accent)/0.3)]
//                                outline-none transition-all placeholder-[hsl(var(--text-muted))]"
//                     placeholder="+91 98765 43210"
//                     maxLength={15}
//                   />

//                   {errors.phone && (
//                     <p className="mt-1 text-sm text-red-500">
//                       {errors.phone[0]}
//                     </p>
//                   )}
//                 </div>

//                 {/* Optional Password */}
//                 <div>
//                   <label className="block text-sm font-medium text-[hsl(var(--text-muted))] mb-2">
//                     New Password (Optional)
//                   </label>
//                   <input
//                     name="password"
//                     type="password"
//                     value={editForm.password}
//                     onChange={handleEditChange}
//                     className="w-full px-4 py-3 rounded-xl border border-[hsl(var(--border))]
//                                bg-[hsl(var(--card-bg))] text-[hsl(var(--text-primary))]
//                                focus:border-[hsl(var(--accent))] focus:ring-2 focus:ring-[hsl(var(--accent)/0.3)]
//                                outline-none transition-all placeholder-[hsl(var(--text-muted))]"
//                     placeholder="Leave blank to keep current password"
//                   />

//                   {errors.password && (
//                     <p className="mt-1 text-sm text-red-500">
//                       {errors.password[0]}
//                     </p>
//                   )}
//                   <p className="text-xs text-[hsl(var(--text-muted))] mt-2">
//                     Only fill this if you want to change password.
//                   </p>
//                 </div>
//               </div>

//               {/* Footer */}
//               <div className="px-6 py-5 border-t border-[hsl(var(--border))] flex gap-4 bg-[hsl(var(--bg-secondary)/0.6)]">
//                 <button
//                   onClick={() => setShowEditModal(false)}
//                   disabled={editLoading}
//                   className="flex-1 py-3 rounded-xl border border-[hsl(var(--border))] text-[hsl(var(--text-secondary))] hover:bg-[hsl(var(--accent)/0.1)] transition disabled:opacity-50"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   onClick={handleUpdateOrg}
//                   disabled={editLoading}
//                   className={`flex-1 py-3 rounded-xl text-white font-semibold transition shadow-md
//                     ${
//                       editLoading
//                         ? "bg-[hsl(var(--accent)/0.6)] cursor-not-allowed opacity-70"
//                         : "bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-dark))] active:scale-[0.98]"
//                     }`}
//                 >
//                   {editLoading ? "Saving..." : "Save Changes"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </AdminLayout>
//   );
// }

// /* StatCard */
// function StatCard({ label, value, green, red }) {
//   return (
//     <div className="bg-[hsl(var(--card-bg))] rounded-2xl p-6 shadow-xl border border-[hsl(var(--border))] hover:shadow-2xl transition-all duration-300">
//       <p className="text-sm text-[hsl(var(--text-muted))] font-medium">
//         {label}
//       </p>
//       <h3
//         className={`text-4xl md:text-5xl font-extrabold mt-3 tracking-tight ${
//           green
//             ? "text-emerald-500"
//             : red
//               ? "text-rose-500"
//               : "text-[hsl(var(--text-primary))]"
//         }`}
//       >
//         {value}
//       </h3>
//     </div>
//   );
// }
//divya

// src/pages/organizations/OrganizationView.jsx
import { useState, useMemo, useEffect } from "react";
import { ArrowLeft, Download, Settings, Trash2, Edit, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import Loader from "../../components/Loader";
import AddCardsDrawer from "./AddCardsDrawer";
import api from "../../services/api";
import { successAlert, errorAlert } from "../../utils/alert";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function OrganizationView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [stats, setStats] = useState({
    total_cards: 0,
    active_cards: 0,
    inactive_cards: 0,
  });
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [showAddCards, setShowAddCards] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [editLoading, setEditLoading] = useState(false);

  const fetchOrg = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/orginazation-dashboard/organization/${id}`, {
        params: {
          page,
          per_page: perPage,
          search,
        },
      });

      const responseData = res.data;
      const orgData = responseData.data;

      setOrganization({
        ...orgData,
        brand: responseData.brand?.[0] || null,
      });

      if (responseData.card_summary) {
        setStats(responseData.card_summary);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to load organization details");
    } finally {
      setLoading(false);
    }
  };

  const getStatus = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    return expiry >= today ? "Active" : "Expired";
  };

  useEffect(() => {
    const payment = searchParams.get("payment");

    if (payment === "success") {
        Swal.fire({
            icon: "success",
            title: "Payment Successful!",
            text: "Your Mi Profile cards have been added successfully.",
            confirmButtonText: "OK",
        });

        
        // Remove query parameters after showing alert
        setSearchParams({}, { replace: true });
    }
}, [searchParams, setSearchParams]);

  useEffect(() => {
    if (id) {
      fetchOrg();
    }
  }, [id, page, perPage, search]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleExportExcel = () => {
    if (!filteredTransactions.length) {
      alert("No data to export");
      return;
    }

    const data = filteredTransactions.map((tx) => ({
      Date: new Date(tx.created_at).toLocaleDateString("en-IN"),
      Cards: tx.total_cards,
      Expiry: tx.expiry_date,
      Status: getStatus(tx.expiry_date),
      "Payment Status": tx.payment_status,
      Amount: tx.total_amount,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    saveAs(blob, `Organization_${organization.name}_Transactions.xlsx`);
  };

  const handleUpdateOrg = async () => {
    setEditLoading(true);
    setErrors({});

    try {
      await api.post(`/orginazation-dashboard/organization/${id}`, {
        name: editForm.name.trim(),
        email: editForm.email.trim(),
        phone: editForm.phone?.trim() || null,
        password: editForm.password || null,
      });

      // successAlert("Success", "Organization updated");
      fetchOrg();
      setShowEditModal(false);
    } catch (err) {
      if (err.response?.status === 422) {
        const data = err.response.data;

        if (data.error) {
          setErrors(data.error);
        } else {
          errorAlert("Error", data.message || "Validation failed");
        }

        return;
      }
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this organization?")) return;

    try {
      await api.delete(`/orginazation-dashboard/organization/${id}`);
      // successAlert("Success", "Organization deleted");
      navigate("/organizations");
    } catch (err) {
      const msg = err.response?.data?.message || "Delete failed";
      errorAlert("Error", msg);
    }
  };

  const transactions = organization?.card_purchases?.data || [];
  const filteredTransactions = transactions.filter((tx) => {
    const status = getStatus(tx.expiry_date);
    const matchSearch =
      tx.payment_status?.toLowerCase().includes(search.toLowerCase()) ||
      tx.total_cards?.toString().includes(search);
    const matchStatus = statusFilter === "all" || status === statusFilter;
    return matchSearch && matchStatus;
  });

  const pagination = organization?.card_purchases || null;

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <Loader show text="Loading organization..." />
        </div>
      </AdminLayout>
    );
  }

  if (errorMsg || !organization || typeof organization !== "object") {
    return (
      <AdminLayout>
        <div className="text-center py-20 px-4 text-rose-500">
          <p className="mb-4">{errorMsg || "Organization not found"}</p>
          <button
            onClick={() => navigate("/organizations")}
            className="px-5 py-2.5 bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-dark))] text-white rounded-xl shadow transition"
          >
            Go Back
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="w-full max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 pb-24 lg:pb-12 overflow-x-hidden">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--accent))] transition-colors"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div className="w-full sm:w-auto grid grid-cols-2 sm:flex gap-3">
            <button
              onClick={() => {
                setErrors({});
                setEditForm({
                  name:
                    organization.name || organization.organization_name || "",
                  email: organization.email || "",
                  phone: organization.phone || "",
                  password: "",
                });

                setShowEditModal(true);
              }}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-dark))] text-white rounded-xl shadow-md transition-all"
            >
              <Edit size={18} />
              Edit
            </button>

            <button
              onClick={handleDelete}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-md transition-all"
            >
              <Trash2 size={18} />
              Delete
            </button>
          </div>
        </div>

        {/* HERO / COVER */}
        <div className="relative mb-24 sm:mb-16 md:mb-40">
          {/* <img
            src={organization.brand?.cover_page || "/assets/coverPic.jpg"}
            onError={(e) => (e.currentTarget.src = "/assets/coverPic.jpg")}
            className="w-full h-44 sm:h-64 md:h-80 lg:h-96 rounded-2xl object-cover shadow-2xl"
            alt="Cover"
          /> */}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent rounded-2xl" />

          <div className="absolute left-4 right-4 sm:right-auto sm:left-6 md:left-8 -bottom-20 md:-bottom-24 bg-[hsl(var(--card-bg))] rounded-2xl shadow-2xl p-4 md:p-6 flex items-center gap-4 md:gap-5 border border-[hsl(var(--border))]">
            {/* <img
              src={organization.brand?.logo || "/assets/logo.jpeg"}
              onError={(e) => (e.currentTarget.src = "/assets/logo.jpeg")}
              className="w-16 h-16 md:w-24 md:h-24 rounded-xl border border-[hsl(var(--border))] object-cover shrink-0"
              alt="Logo"
            /> */}

            <div className="min-w-0">
              <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-[hsl(var(--text-primary))] truncate">
                {organization.name || organization.organization_name}
              </h2>

              <p className="text-xs sm:text-sm text-[hsl(var(--text-muted))] mt-1 break-all">
                {organization.email}
              </p>

              <p className="text-xs sm:text-sm text-[hsl(var(--text-muted))] break-all">
                {organization.phone}
              </p>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-18 md:mb-10">
          <StatCard label="Total Cards" value={stats.total_cards || 0} />

          <StatCard
            label="Active Cards"
            value={stats.active_cards || 0}
            green
          />

          <StatCard
            label="Inactive Cards"
            value={stats.inactive_cards || 0}
            red
          />

          <StatCard label="NFC Cards" value={stats.nfc_cards || 0} />
        </div>

        {/* ACTION BAR */}
        <div className="flex flex-col xl:flex-row flex-wrap gap-4 justify-between items-start xl:items-center mb-8">
          <div className="w-full xl:w-auto grid grid-cols-1 sm:grid-cols-2 lg:flex gap-3">
            <button
              onClick={() => {
                setPage(1);
                fetchOrg();
              }}
              className="px-5 py-2.5 bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-dark))] text-white rounded-xl shadow-md transition-all"
            >
              Refresh
            </button>

            <select
              value={perPage}
              onChange={(e) => {
                setPerPage(Number(e.target.value));
                setPage(1);
              }}
              className="w-full lg:w-auto px-4 py-2.5 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card-bg))] text-[hsl(var(--text-primary))]"
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
            </select>

            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full lg:w-64 px-4 py-2.5 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card-bg))] text-[hsl(var(--text-primary))] placeholder-[hsl(var(--text-muted))]"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full lg:w-auto px-4 py-2.5 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card-bg))] text-[hsl(var(--text-primary))]"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
            </select>
          </div>

          <div className="w-full xl:w-auto grid grid-cols-1 sm:grid-cols-3 xl:flex gap-3">
            <button
              onClick={() => setShowAddCards(true)}
              className="px-6 py-2.5 bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-dark))] text-white rounded-xl shadow-md transition-all"
            >
              + Add Mi Profile
            </button>

            <button
              onClick={() =>
                navigate(`/admin/organizations/${id}/access-settings`)
              }
              className="flex items-center justify-center gap-2 px-5 py-2.5 border border-[hsl(var(--border))] text-[hsl(var(--text-secondary))] hover:bg-[hsl(var(--accent)/0.1)] rounded-xl transition-all"
            >
              <Settings size={18} />
              Access Settings
            </button>

            <button
              onClick={handleExportExcel}
              className="flex items-center justify-center gap-2 px-5 py-2.5 border border-[hsl(var(--border))] text-[hsl(var(--text-secondary))] hover:bg-[hsl(var(--accent)/0.1)] rounded-xl transition-all"
            >
              <Download size={18} />
              Export Excel
            </button>
          </div>
        </div>

        {/* TRANSACTIONS TABLE */}
        <div className="bg-[hsl(var(--card-bg))] rounded-2xl shadow-2xl overflow-hidden border border-[hsl(var(--border))]">
          <div className="w-full max-w-full overflow-x-auto">
            <table className="min-w-[760px] md:min-w-full text-sm divide-y divide-[hsl(var(--border))]">
              <thead className="bg-[hsl(var(--bg-secondary)/0.6)]">
                <tr>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-[hsl(var(--text-muted))] uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-[hsl(var(--text-muted))] uppercase tracking-wider">
                    Cards
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-[hsl(var(--text-muted))] uppercase tracking-wider">
                    Expiry
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-[hsl(var(--text-muted))] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-[hsl(var(--text-muted))] uppercase tracking-wider">
                    Payment Status
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-[hsl(var(--text-muted))] uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="p-8 sm:p-12 text-center text-[hsl(var(--text-muted))] text-base sm:text-lg"
                    >
                      No transactions found
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((tx) => (
                    <tr
                      key={tx.id}
                      className="hover:bg-[hsl(var(--accent)/0.08)] transition-colors"
                    >
                      <td className="px-4 sm:px-6 py-4 text-[hsl(var(--text-secondary))] whitespace-nowrap">
                        {new Date(tx.created_at).toLocaleDateString("en-IN")}
                      </td>

                      <td className="px-4 sm:px-6 py-4 text-[hsl(var(--text-primary))] whitespace-nowrap">
                        {tx.total_cards}
                      </td>

                      <td className="px-4 sm:px-6 py-4 text-[hsl(var(--text-secondary))] whitespace-nowrap">
                        {tx.expiry_date}
                      </td>

                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border
                            ${
                              getStatus(tx.expiry_date) === "Active"
                                ? "bg-emerald-500/20 text-emerald-900 border border-emerald-500/30"
                                : "bg-rose-500/20 text-rose-900 border border-rose-500/30"
                            }`}
                        >
                          {getStatus(tx.expiry_date)}
                        </span>
                      </td>

                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border
                            ${
                              tx.payment_status === "paid"
                                ? "bg-emerald-500/20 text-emerald-900 border border-emerald-500/30"
                                : "bg-rose-500/20 text-rose-900 border border-rose-500/30"
                            }`}
                        >
                          {tx.payment_status}
                        </span>
                      </td>

                      <td className="px-4 sm:px-6 py-4 font-semibold text-[hsl(var(--accent))] whitespace-nowrap">
                        ₹{Number(tx.total_amount).toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* PAGINATION */}
        {pagination && (
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4 text-sm text-[hsl(var(--text-muted))]">
            <p className="text-center sm:text-left">
              Showing {pagination.from} to {pagination.to} of {pagination.total}
            </p>

            <div className="flex gap-3">
              <button
                disabled={!pagination.prev_page_url}
                onClick={() => setPage(page - 1)}
                className="px-5 py-2.5 rounded-xl border border-[hsl(var(--border))] disabled:opacity-50 hover:bg-[hsl(var(--accent)/0.1)] transition"
              >
                Prev
              </button>

              <button
                disabled={!pagination.next_page_url}
                onClick={() => setPage(page + 1)}
                className="px-5 py-2.5 rounded-xl border border-[hsl(var(--border))] disabled:opacity-50 hover:bg-[hsl(var(--accent)/0.1)] transition"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* ADD CARDS DRAWER */}
        {showAddCards && (
          <AddCardsDrawer
            organizationId={id}
            onClose={() => setShowAddCards(false)}
            onSuccess={() => {
              // successAlert("Success", "Cards added (refresh to see changes)");
              fetchOrg();
            }}
          />
        )}

        {/* EDIT MODAL */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-[hsl(var(--card-bg))] rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-[hsl(var(--border))]">
              <div className="flex justify-between items-center px-5 sm:px-6 py-5 border-b border-[hsl(var(--border))] bg-[hsl(var(--bg-secondary)/0.6)]">
                <h3 className="text-lg sm:text-xl font-semibold text-[hsl(var(--text-primary))]">
                  Edit Organization
                </h3>

                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--accent))] transition"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="px-5 sm:px-6 py-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[hsl(var(--text-muted))] mb-2">
                    Organization Name <span className="text-rose-500">*</span>
                  </label>

                  <input
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 rounded-xl border border-[hsl(var(--border))] 
                               bg-[hsl(var(--card-bg))] text-[hsl(var(--text-primary))] 
                               focus:border-[hsl(var(--accent))] focus:ring-2 focus:ring-[hsl(var(--accent)/0.3)] 
                               outline-none transition-all placeholder-[hsl(var(--text-muted))]"
                    placeholder="Enter organization name"
                  />

                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.name[0]}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[hsl(var(--text-muted))] mb-2">
                    Email Address <span className="text-rose-500">*</span>
                  </label>

                  <input
                    name="email"
                    type="email"
                    value={editForm.email}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 rounded-xl border border-[hsl(var(--border))] 
                               bg-[hsl(var(--card-bg))] text-[hsl(var(--text-primary))] 
                               focus:border-[hsl(var(--accent))] focus:ring-2 focus:ring-[hsl(var(--accent)/0.3)] 
                               outline-none transition-all placeholder-[hsl(var(--text-muted))]"
                    placeholder="email@example.com"
                  />

                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email[0]}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[hsl(var(--text-muted))] mb-2">
                    Phone Number
                  </label>

                  <input
                    name="phone"
                    type="tel"
                    value={editForm.phone}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 rounded-xl border border-[hsl(var(--border))] 
                               bg-[hsl(var(--card-bg))] text-[hsl(var(--text-primary))] 
                               focus:border-[hsl(var(--accent))] focus:ring-2 focus:ring-[hsl(var(--accent)/0.3)] 
                               outline-none transition-all placeholder-[hsl(var(--text-muted))]"
                    placeholder="+91 98765 43210"
                    maxLength={15}
                  />

                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.phone[0]}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[hsl(var(--text-muted))] mb-2">
                    New Password (Optional)
                  </label>

                  <input
                    name="password"
                    type="password"
                    value={editForm.password}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 rounded-xl border border-[hsl(var(--border))] 
                               bg-[hsl(var(--card-bg))] text-[hsl(var(--text-primary))] 
                               focus:border-[hsl(var(--accent))] focus:ring-2 focus:ring-[hsl(var(--accent)/0.3)] 
                               outline-none transition-all placeholder-[hsl(var(--text-muted))]"
                    placeholder="Leave blank to keep current password"
                  />

                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.password[0]}
                    </p>
                  )}

                  <p className="text-xs text-[hsl(var(--text-muted))] mt-2">
                    Only fill this if you want to change password.
                  </p>
                </div>
              </div>

              <div className="px-5 sm:px-6 py-5 border-t border-[hsl(var(--border))] flex gap-3 sm:gap-4 bg-[hsl(var(--bg-secondary)/0.6)]">
                <button
                  onClick={() => setShowEditModal(false)}
                  disabled={editLoading}
                  className="flex-1 py-3 rounded-xl border border-[hsl(var(--border))] text-[hsl(var(--text-secondary))] hover:bg-[hsl(var(--accent)/0.1)] transition disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  onClick={handleUpdateOrg}
                  disabled={editLoading}
                  className={`flex-1 py-3 rounded-xl text-white font-semibold transition shadow-md
                    ${
                      editLoading
                        ? "bg-[hsl(var(--accent)/0.6)] cursor-not-allowed opacity-70"
                        : "bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-dark))] active:scale-[0.98]"
                    }`}
                >
                  {editLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

function StatCard({ label, value, green, red }) {
  return (
    <div className="bg-[hsl(var(--card-bg))] rounded-2xl p-5 sm:p-6 shadow-xl border border-[hsl(var(--border))] hover:shadow-2xl transition-all duration-300">
      <p className="text-sm text-[hsl(var(--text-muted))] font-medium">
        {label}
      </p>

      <h3
        className={`text-3xl sm:text-4xl md:text-5xl font-extrabold mt-3 tracking-tight ${
          green
            ? "text-emerald-500"
            : red
              ? "text-rose-500"
              : "text-[hsl(var(--text-primary))]"
        }`}
      >
        {value}
      </h3>
    </div>
  );
}
