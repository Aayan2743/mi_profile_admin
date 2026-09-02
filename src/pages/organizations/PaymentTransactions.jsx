// // src/pages/organizations/PaymentTransactions.jsx
// import { useState, useEffect } from "react";

// import {
//   Search,
//   ArrowLeft,
//   FileText,
//   Download,
//   X,
//   Printer,
//   ExternalLink,
//   Mail,
//   Phone,
//   Globe,
//   Building2,
//   MessageCircle,
// } from "lucide-react";
// import AdminLayout from "../../components/layout/AdminLayout";
// import { useNavigate } from "react-router-dom";
// import Loader from "../../components/Loader";
// import api from "../../services/api";

// export default function PaymentTransactions() {
//   const navigate = useNavigate();

//   /* ---------------- STATE ---------------- */
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [perPage, setPerPage] = useState(5);

//   const [pagination, setPagination] = useState(null);
//   const [receipt, setReceipt] = useState(null);

//   /* ---------------- FETCH DATA ---------------- */
//   const fetchPayments = async () => {
//     try {
//       setLoading(true);

//       const res = await api.get(
//         "/orginazation-dashboard/payment-transactions",
//         {
//           params: {
//             page,
//             per_page: perPage,
//             search,
//           },
//         },
//       );

//       const responseData = res.data.data;

//       console.log("res", responseData);

//       setPayments(responseData.data);
//       setPagination(responseData);
//     } catch (error) {
//       console.log("API ERROR:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPayments();
//   }, [page, perPage, search]);

//   /* ---------------- EXPORT CSV ---------------- */
//   const exportCSV = () => {
//     if (!payments.length) return;

//     const headers = [
//       "Order ID",
//       "Organization",
//       "Cards",
//       "Amount",
//       "Payment Type",
//       "Payment Method",
//       "Payment Status",
//       "Card Status",
//       "Date",
//     ];

//     const rows = payments.map((p) => [
//       p.invoice_no,
//       p.organization,
//       p.cards,
//       p.amount,
//       p.payment_type,
//       p.payment_method,
//       p.payment_status,
//       p.card_status,
//       p.date,
//     ]);

//     const csv =
//       "data:text/csv;charset=utf-8," +
//       [headers, ...rows].map((r) => r.join(",")).join("\n");

//     const link = document.createElement("a");
//     link.href = encodeURI(csv);
//     link.download = "payment_transactions.csv";
//     link.click();
//   };

//   const printInvoice = () => {
//     const content = document.getElementById("invoice-print-area");
//     if (!content) return;

//     const printWindow = window.open("", "_blank");
//     printWindow.document.write(`
//       <html>
//         <head>
//           <title>Invoice</title>
//           <style>
//             body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #636261; background: #ffffff; }
//             table { width: 100%; border-collapse: collapse; }
//             th, td { padding: 12px; border-bottom: 1px solid #E8EDF2; }
//             th { background: #636261; color: white; text-align: left; }
//             .no-print { display: none; }
//           </style>
//         </head>
//         <body>${content.innerHTML}</body>
//       </html>
//     `);
//     printWindow.document.close();
//     printWindow.print();
//   };

//   // const downloadInvoice = () => {
//   //   printInvoice();
//   // };

//   const downloadInvoice = async () => {
//     try {
//       const response = await api.get(
//         `/orginazation-dashboard/organization/download-invoice/${receipt.id}`,
//         {
//           responseType: "blob",
//         },
//       );

//       const blob = new Blob([response.data], {
//         type: "application/pdf",
//       });

//       const url = window.URL.createObjectURL(blob);

//       const link = document.createElement("a");
//       link.href = url;
//       link.download = `invoice-${receipt.order_id}.pdf`;

//       document.body.appendChild(link);
//       link.click();

//       link.remove();
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const unitPrice = (payment) => {
//     const amount = Number(payment?.amount || 0);
//     const cards = Number(payment?.cards || 1);
//     return amount / cards;
//   };

//   const getInvoiceNumber = (payment) => {
//     if (!payment?.order_id) return "INV-01";
//     return `${payment.order_id}-INV-01`;
//   };
//   const getInvoiceShareText = (payment) => {
//     if (!payment) return "";

//     const subtotal = Number(payment.amount || 0);
//     const gst = subtotal * 0.18;
//     const total = subtotal + gst;

//     return `Invoice Details

// Organization: ${payment.organization}
// Order ID: ${payment.invoice_no}
// Invoice No: ${getInvoiceNumber(payment)}
// Date: ${payment.date}
// Cards: ${payment.cards}
// Payment Method: ${payment.payment_method?.toUpperCase() || "UPI"}
// Payment Status: ${payment.payment_status || "Paid"}

// Subtotal: ₹${subtotal.toFixed(2)}
// GST (18%): ₹${payment.gst_amount}
// Total: ₹${total.toFixed(2)}

// Thank you for your business.
// MI PROFILE.IN`;
//   };

//   const shareInvoiceWhatsApp = () => {
//     const text = encodeURIComponent(getInvoiceShareText(receipt));
//     window.open(`https://wa.me/?text=${text}`, "_blank");
//   };

//   // const shareInvoiceEmail = () => {
//   //   const subject = encodeURIComponent(
//   //     `Invoice - ${getInvoiceNumber(receipt)}`,
//   //   );
//   //   const body = encodeURIComponent(getInvoiceShareText(receipt));
//   //   window.location.href = `mailto:?subject=${subject}&body=${body}`;
//   // };

//   const shareInvoiceEmail = async () => {
//     try {
//       await api.post(
//         `/orginazation-dashboard/organization/send-invoice/${receipt.id}`,
//       );

//       alert("Invoice sent successfully");
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   return (
//     <AdminLayout>
//       {/* HEADER */}
//       <div className="flex items-center gap-3 mb-6">
//         <Loader show={loading} text="Loading transactions..." />
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--accent))]"
//         >
//           <ArrowLeft size={18} /> Back
//         </button>
//         <h2 className="text-xl font-semibold text-[hsl(var(--text-primary))]">
//           Payment Transactions
//         </h2>
//       </div>

//       {/* SEARCH + PER PAGE + EXPORT */}
//       <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
//         <div className="flex items-center gap-2 border border-[hsl(var(--border))] rounded-xl px-4 py-2.5 bg-[hsl(var(--card-bg))] min-w-[280px]">
//           <Search size={16} className="text-[hsl(var(--text-muted))]" />
//           <input
//             placeholder="Search order, org, amount..."
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setPage(1);
//             }}
//             className="outline-none text-sm flex-1 bg-transparent text-[hsl(var(--text-primary))] placeholder-[hsl(var(--text-muted))]"
//           />
//         </div>

//         <div className="flex gap-3 items-center">
//           <select
//             value={perPage}
//             onChange={(e) => {
//               setPerPage(Number(e.target.value));
//               setPage(1);
//             }}
//             className="border border-[hsl(var(--border))] rounded-xl px-3 py-2.5 text-sm
//                        bg-[hsl(var(--card-bg))] text-[hsl(var(--text-primary))]
//                        focus:ring-2 focus:ring-[hsl(var(--accent)/0.4)] focus:border-[hsl(var(--accent))]"
//           >
//             <option value={5}>5</option>
//             <option value={10}>10</option>
//             <option value={20}>20</option>
//           </select>

//           <button
//             onClick={exportCSV}
//             disabled={loading || payments.length === 0}
//             className={`flex items-center gap-2 border border-[hsl(var(--border))] px-4 py-2.5 rounded-xl text-sm transition
//               ${
//                 loading || payments.length === 0
//                   ? "opacity-50 cursor-not-allowed"
//                   : "hover:bg-[hsl(var(--accent)/0.1)] hover:text-[hsl(var(--accent))]"
//               }`}
//           >
//             <Download size={16} /> Export CSV
//           </button>
//         </div>
//       </div>

//       {/* TABLE */}
//       <div className="bg-[hsl(var(--card-bg))] rounded-2xl shadow-xl overflow-hidden border border-[hsl(var(--border))]">
//         <table className="min-w-full text-sm divide-y divide-[hsl(var(--border))]">
//           <thead className="bg-[hsl(var(--bg-secondary)/0.6)]">
//             <tr>
//               <th className="p-4 text-left text-xs font-semibold text-[hsl(var(--text-muted))] uppercase tracking-wider">
//                 Invoice NO
//               </th>
//               <th className="p-4 text-left text-xs font-semibold text-[hsl(var(--text-muted))] uppercase tracking-wider">
//                 Organization
//               </th>
//               <th className="p-4 text-left text-xs font-semibold text-[hsl(var(--text-muted))] uppercase tracking-wider">
//                 Cards
//               </th>
//               <th className="p-4 text-center text-xs font-semibold text-[hsl(var(--text-muted))] uppercase tracking-wider">
//                 Amount
//               </th>
//               <th className="p-4 text-center text-xs font-semibold text-[hsl(var(--text-muted))] uppercase tracking-wider">
//                 Method
//               </th>
//               <th className="p-4 text-center text-xs font-semibold text-[hsl(var(--text-muted))] uppercase tracking-wider">
//                 Status
//               </th>
//               <th className="p-4 text-center text-xs font-semibold text-[hsl(var(--text-muted))] uppercase tracking-wider">
//                 Date
//               </th>
//               <th className="p-4 text-center text-xs font-semibold text-[hsl(var(--text-muted))] uppercase tracking-wider">
//                 Invoice & Payment Proof
//               </th>
//             </tr>
//           </thead>

//           <tbody>
//             {loading ? (
//               <tr>
//                 <td
//                   colSpan={8}
//                   className="p-12 text-center text-[hsl(var(--text-muted))]"
//                 >
//                   Loading transactions...
//                 </td>
//               </tr>
//             ) : payments.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan={8}
//                   className="p-12 text-center text-[hsl(var(--text-muted))]"
//                 >
//                   No transactions found
//                 </td>
//               </tr>
//             ) : (
//               payments.map((p) => (
//                 <tr
//                   key={p.id}
//                   className="hover:bg-[hsl(var(--accent)/0.08)] transition-colors"
//                 >
//                   <td className="p-4 font-medium text-[hsl(var(--text-primary))]">
//                     {p.invoice_no}
//                   </td>
//                   <td className="p-4 text-[hsl(var(--text-primary))]">
//                     {p.organization}
//                   </td>
//                   <td className="p-4 text-center text-[hsl(var(--text-primary))]">
//                     {p.cards}
//                   </td>
//                   <td className="p-4 text-center font-semibold text-[hsl(var(--accent))]">
//                     ₹{Number(p.amount).toFixed(2)}
//                   </td>
//                   <td className="p-4 text-center text-[hsl(var(--text-secondary))]">
//                     {p.payment_method?.toUpperCase() || "—"}
//                   </td>
//                   <td className="p-4 text-center">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-medium ${
//                         p.card_status === "Active"
//                           ? "bg-emerald-500/20 text-emerald-900 border border-emerald-500/30"
//                           : "bg-rose-500/20 text-rose-900 border border-rose-500/30"
//                       }`}
//                     >
//                       {p.card_status}
//                     </span>
//                   </td>
//                   <td className="p-4 text-center text-[hsl(var(--text-secondary))]">
//                     {p.date}
//                   </td>
//                   <td className="p-4 text-center">
//                     {/* {p.payment_proof ? ( */}
//                     <button
//                       onClick={() => {
//                         console.log("Receipt Data:", p);
//                         setReceipt(p);
//                       }}
//                       className="text-[hsl(var(--accent))] hover:text-[hsl(var(--accent-dark))] transition"
//                     >
//                       <FileText size={18} />
//                     </button>
//                     {/* ) : (
//                     <span className="text-[hsl(var(--text-muted))] text-xs">
//                       N/A
//                     </span> */}
//                     {/* )} */}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* PAGINATION */}
//       {pagination && pagination.last_page > 1 && (
//         <div className="flex justify-center mt-8 gap-2 flex-wrap">
//           {Array.from({ length: pagination.last_page }).map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setPage(i + 1)}
//               className={`px-4 py-2 rounded-lg border text-sm min-w-[44px] transition
//                 ${
//                   page === i + 1
//                     ? "bg-[hsl(var(--accent))] text-white dark:text-[#282f2f] border-[hsl(var(--accent))]"
//                     : "border-[hsl(var(--border))] hover:bg-[hsl(var(--accent)/0.1)] hover:text-[hsl(var(--accent))]"
//                 }`}
//             >
//               {i + 1}
//             </button>
//           ))}
//         </div>
//       )}

//       {/* RECEIPT MODAL */}

//       {/* INVOICE MODAL */}
//       {receipt && (
//         <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-2xl w-full max-w-7xl max-h-[95vh] overflow-y-auto shadow-2xl border border-[#E8EDF2]">
//             <div className="sticky top-0 z-20 bg-white p-5 border-b border-[#E8EDF2] flex justify-between items-center">
//               <h3 className="font-bold text-xl text-[#282f2f]">
//                 Invoice & Payment Proof
//               </h3>

//               <button
//                 onClick={() => setReceipt(null)}
//                 className="text-[#282f2f] hover:opacity-70"
//               >
//                 <X size={28} />
//               </button>
//             </div>

//             <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 p-6">
//               <div
//                 id="invoice-print-area"
//                 className="xl:col-span-9 bg-white border border-[#E8EDF2] p-6 md:p-8 text-[#282f2f]"
//               >
//                 <div className="flex flex-col md:flex-row justify-between gap-6 border-b-2 border-[#636261] pb-8">
//                   <div className="flex items-center gap-4">
//                     <img
//                       src="/assets/Logo1 11-06 Png black orange transparent.png"
//                       alt="MI PROFILE"
//                       className="w-30 h-40 object-contain"
//                     />

//                     {/* <div>
//                       <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide">
//                         MI PROFILE.IN
//                       </h1>
//                       <p className="uppercase tracking-[3px] text-sm font-semibold">
//                         Connect Beyond Contacts
//                       </p>
//                     </div> */}
//                   </div>

//                   <div className="text-left md:text-right">
//                     <h2 className="text-4xl font-extrabold mb-3">INVOICE</h2>

//                     <div className="text-sm space-y-1">
//                       <p>
//                         {/* <strong>Invoice No:</strong> {getInvoiceNumber(receipt)} */}
//                         <strong>Invoice No:</strong> {receipt.invoice_no}
//                       </p>
//                       <p>
//                         <strong>Invoice Date:</strong> {receipt.date}
//                       </p>
//                       <p>
//                         <strong>Payment Method:</strong>{" "}
//                         {receipt.payment_method?.toUpperCase() || "UPI"}
//                       </p>
//                       <p>
//                         <strong>Payment Status:</strong>{" "}
//                         {receipt.payment_status || "Paid"}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
//                   <div>
//                     <span className="inline-block bg-[#636261] text-white px-2 py-1 text-xs font-bold uppercase">
//                       Billing From
//                     </span>

//                     <h3 className="mt-3 text-lg font-bold">MI PROFILE.IN</h3>

//                     <p className="text-sm mt-1">
//                       C3013, Brigade Meadows
//                       <br /> Kanakapura Road, Bengaluru
//                       <br /> Karnataka - 560082
//                     </p>
//                     <p className="text-sm mt-1">
//                       Email: info.miprofile@gmail.com
//                     </p>
//                     <p className="text-sm mt-1">Phone: +91 87229 81233</p>
//                     <p className="text-sm mt-1">GSTIN: 29AAACT2727Q1ZW</p>
//                   </div>

//                   <div>
//                     <span className="inline-block bg-[#636261] text-white px-2 py-1 text-xs font-bold uppercase">
//                       Bill To
//                     </span>

//                     <h3 className="mt-3 text-lg font-bold">
//                       {receipt.organization}
//                     </h3>
//                     <p className="text-sm mt-1 flex items-center gap-2">
//                       <Mail size={14} className="text-[#636261]" />
//                       {receipt.organization_email || "N/A"}
//                     </p>

//                     <p className="text-sm mt-1 flex items-center gap-2">
//                       <Phone size={14} className="text-[#636261]" />
//                       {receipt.organization_phone || "N/A"}
//                     </p>

//                     <p className="text-sm mt-1 flex items-center gap-2">
//                       <span className="text-[#636261] font-semibold">GST:</span>
//                       {receipt?.gst || receipt?.gst || "N/A"}
//                     </p>

//                     {/* <p className="text-sm mt-1">Organization Card Purchase</p>
//                     <p className="text-sm mt-1">Bengaluru, Karnataka, India</p> */}
//                     {/* <p className="text-sm mt-1">Order ID: {receipt.order_id}</p> */}
//                     <p className="text-sm mt-1">
//                       Payment Method:{" "}
//                       {receipt.payment_method?.toUpperCase() || "UPI"}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-4 mb-8 border border-[#E8EDF2]">
//                   <div className="bg-[#636261] text-white p-4">
//                     <p className="text-xs uppercase opacity-80">ORG ID</p>
//                     <p className="font-bold text-xl mt-1">
//                       {receipt.organization_id}
//                     </p>
//                   </div>

//                   <div className="bg-[#636261] text-white p-4">
//                     <p className="text-xs uppercase opacity-80">Date</p>
//                     <p className="font-bold text-xl mt-1">{receipt.date}</p>
//                   </div>

//                   <div className="bg-[#636261] text-white p-4">
//                     <p className="text-xs uppercase opacity-80">
//                       Cards Purchased
//                     </p>
//                     <p className="font-bold text-xl mt-1">{receipt.cards}</p>
//                   </div>

//                   <div className="bg-[#636261] text-white p-4">
//                     <p className="text-xs uppercase opacity-80">Total Amount</p>
//                     <p className="font-bold text-xl mt-1">
//                       ₹{Number(receipt.amount).toFixed(2)}
//                     </p>
//                   </div>
//                 </div>

//                 <table className="w-full text-sm">
//                   <thead>
//                     <tr className="bg-[#636261] text-white">
//                       <th className="p-3 text-left">Description</th>
//                       <th className="p-3 text-center">Qty.</th>
//                       <th className="p-3 text-center">Unit Price (₹)</th>
//                       <th className="p-3 text-right">Amount (₹)</th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     <tr className="border-b border-[#E8EDF2]">
//                       <td className="p-4">Digital Business Card Purchase</td>
//                       <td className="p-4 text-center">{receipt.cards}</td>
//                       <td className="p-4 text-center">
//                         ₹{receipt.price_per_card}
//                       </td>
//                       <td className="p-4 text-right font-semibold">
//                         ₹ {Number(receipt.subtotal).toFixed(2)}
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>

//                 <div className="flex justify-end mt-6">
//                   <div className="w-full max-w-sm text-sm space-y-3">
//                     {(() => {
//                       const subtotal = Number(receipt.amount || 0);
//                       const gst = subtotal * 0.18;
//                       const total = subtotal + gst;

//                       return (
//                         <>
//                           {/* <div className="flex justify-between">
//                             <span>Subtotal</span>
//                             <span>₹ {Number(receipt.subtotal).toFixed(2)}</span>
//                           </div>

//                           <div className="flex justify-between">
//                             <span>GST (18%)</span>
//                             <span>
//                               ₹ {Number(receipt.gst_amount).toFixed(2)}
//                             </span>
//                           </div>

//                           <div className="flex justify-between border-t border-[#636261] pt-3 text-lg font-bold">
//                             <span>TOTAL</span>
//                             <span> ₹ {Number(receipt.amount).toFixed(2)}</span>
//                           </div> */}

//                           <div className="flex justify-between">
//                             <span>Subtotal</span>
//                             <span>
//                               ₹ {Number(receipt.subtotal || 0).toFixed(2)}
//                             </span>
//                           </div>

//                           {Number(receipt.discount_amount || 0) > 0 && (
//                             <div className="flex justify-between text-green-600">
//                               <span>
//                                 Discount
//                                 {receipt.coupon_code
//                                   ? ` (${receipt.coupon_code})`
//                                   : ""}
//                               </span>

//                               <span>
//                                 - ₹ {Number(receipt.discount_amount).toFixed(2)}
//                               </span>
//                             </div>
//                           )}

//                           <div className="flex justify-between">
//                             <span>GST ({receipt.gst_percentage || 18}%)</span>

//                             <span>
//                               ₹ {Number(receipt.gst_amount || 0).toFixed(2)}
//                             </span>
//                           </div>

//                           <div className="flex justify-between border-t border-[#636261] pt-3 text-lg font-bold">
//                             <span>TOTAL</span>

//                             <span>
//                               ₹ {Number(receipt.amount || 0).toFixed(2)}
//                             </span>
//                           </div>
//                         </>
//                       );
//                     })()}
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
//                   <div>
//                     <p className="font-semibold">Amount in Words:</p>

//                     {(() => {
//                       const subtotal = Number(receipt.amount || 0);
//                       const gst = subtotal * 0.18;
//                       const total = subtotal + gst;

//                       return (
//                         <p className="text-sm mt-1">
//                           Rupees {receipt.amount.toLocaleString("en-IN")} Only
//                         </p>
//                       );
//                     })()}
//                   </div>

//                   {/* <div className="text-center">
//                       <div className="h-16 flex items-center justify-center text-4xl italic text-[#282f2f]/50">
//                         Signature
//                       </div>

//                       <p className="border-t border-[#636261] pt-2 text-sm font-semibold">
//                         Authorized Signature
//                       </p>
//                       <p className="text-xs">For MI PROFILE.IN</p>
//                     </div> */}
//                 </div>

//                 <div className="mt-12 border-t-2 border-[#636261] pt-5 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
//                    <div>
//                       <div className="flex items-center gap-2 mb-2">
//                         <Building2 size={18} />
//                         <strong>MI PROFILE.IN</strong>
//                       </div>
//                       <p className="flex items-center gap-2 mt-1">
//                         <Globe size={14} /> www.miprofile.in
//                       </p>
//                     </div>
//                   <div>
//                     <h4 className="font-bold mb-2">CONTACT US</h4>
//                     <p className="flex items-center gap-2">
//                       <Phone size={14} /> +91 87229 81233
//                     </p>
//                     <p className="flex items-center gap-2 mt-1">
//                       <Mail size={14} /> info.miprofile@gmail.com
//                     </p>
//                     <p className="flex items-center gap-2 mt-1">
//                       <Globe size={14} /> www.miprofile.in
//                     </p>
//                   </div>

//                   <div>
//                     <h4 className="font-bold mb-2">BANK DETAILS</h4>
//                     <p>Bank Name: Bank of Baroda</p>
//                     <p>Account Name: Brand Crest Digital</p>
//                     <p>Account No:67510200001532</p>
//                     <p>IFSC Code: BARB0VJKAMR</p>
//                   </div>
//                 </div>

//                 <div className="mt-5 bg-[#636261] text-white text-center text-xs p-3">
//                   Thank you for your business! &nbsp; | &nbsp; This is a
//                   computer generated invoice.
//                 </div>
//               </div>

//               <div className="xl:col-span-3 space-y-5">
//                 <div className="border border-[#E8EDF2] rounded-xl p-4">
//                   <h4 className="font-bold text-[#282f2f] mb-4">
//                     PAYMENT PROOF
//                   </h4>

//                   {receipt.payment_proof ? (
//                     <>
//                       <div className="border border-[#E8EDF2] rounded-xl p-3 bg-white">
//                         <img
//                           src={receipt.payment_proof}
//                           alt="Payment Proof"
//                           className="w-full rounded-lg object-contain max-h-[420px]"
//                         />
//                       </div>

//                       <a
//                         href={receipt.payment_proof}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#636261] text-white font-semibold"
//                       >
//                         View Full Size <ExternalLink size={16} />
//                       </a>

//                       <a
//                         href={receipt.payment_proof}
//                         download
//                         className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#636261] text-white font-semibold"
//                       >
//                         <Download size={16} />
//                         Download Payment Proof
//                       </a>
//                     </>
//                   ) : (
//                     <p className="text-sm text-[#282f2f]/70">
//                       No payment proof uploaded.
//                     </p>
//                   )}
//                 </div>

//                 <div className="border border-[#E8EDF2] rounded-xl p-4">
//                   <h4 className="font-bold text-[#282f2f] mb-4">ACTIONS</h4>

//                   <button
//                     onClick={shareInvoiceWhatsApp}
//                     className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#25D366] text-white font-semibold mb-3"
//                   >
//                     <MessageCircle size={16} />
//                     Share via WhatsApp
//                   </button>

//                   <button
//                     onClick={shareInvoiceEmail}
//                     className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#fe7f2d] text-white font-semibold mb-3"
//                   >
//                     <Mail size={16} />
//                     Share via Email
//                   </button>
//                   <button
//                     onClick={downloadInvoice}
//                     className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-[#636261] text-[#282f2f] font-semibold mb-3"
//                   >
//                     <FileText size={16} />
//                     Download Invoice (PDF)
//                   </button>

//                   {/* <button
//                     onClick={printInvoice}
//                     className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#636261] text-white font-semibold"
//                   >
//                     <Printer size={16} />
//                     Print Invoice
//                   </button> */}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </AdminLayout>
//   );
// }

//divya
// src/pages/organizations/PaymentTransactions.jsx
import { useState, useEffect } from "react";

import {
  Search,
  ArrowLeft,
  FileText,
  Download,
  X,
  Printer,
  ExternalLink,
  Mail,
  Phone,
  Globe,
  Building2,
  MessageCircle,
} from "lucide-react";
import AdminLayout from "../../components/layout/AdminLayout";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { successAlert, errorAlert } from "../../utils/alert";
import Swal from "sweetalert2";
import api from "../../services/api";

export default function PaymentTransactions() {
  const navigate = useNavigate();

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const [pagination, setPagination] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const showToast = (icon, title) => {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon,
      title,
      showConfirmButton: false,
      timer: 1800,
      timerProgressBar: true,
    });
  };
  const fetchPayments = async () => {
    try {
      setLoading(true);

      const res = await api.get(
        "/orginazation-dashboard/payment-transactions",
        {
          params: {
            page,
            per_page: perPage,
            search,
          },
        },
      );

      const responseData = res.data.data;

      console.log("res", responseData);

      setPayments(responseData.data);
      setPagination(responseData);
    } catch (error) {
      console.log("API ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [page, perPage, search]);

  const exportCSV = () => {
    if (!payments.length) return;

    const headers = [
      "Order ID",
      "Organization",
      "Cards",
      "NFC Card",
      "Amount",
      "Payment Type",
      "Payment Method",
      "Payment Status",
      "Card Status",
      "Date",
    ];

    const rows = payments.map((p) => [
      p.invoice_no,
      p.organization,
      p.cards,
      p.is_nfc_card,
      p.amount,
      p.payment_type,
      p.payment_method,
      p.payment_status,
      p.card_status,
      p.date,
    ]);

    const csv =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((r) => r.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "payment_transactions.csv";
    link.click();
  };

  const printInvoice = () => {
    const content = document.getElementById("invoice-print-area");
    if (!content) return;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #636261; background: #ffffff; }
            table { width: 100%; border-collapse: collapse; }
            th, td { padding: 12px; border-bottom: 1px solid #E8EDF2; }
            th { background: #636261; color: white; text-align: left; }
            .no-print { display: none; }
          </style>
        </head>
        <body>${content.innerHTML}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const downloadInvoice = async () => {
    try {
      showToast("info", "Downloading invoice...");
      const response = await api.get(
        `/orginazation-dashboard/organization/download-invoice/${receipt.id}`,
        {
          responseType: "blob",
        },
      );

      const blob = new Blob([response.data], {
        type: "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice-${receipt.order_id}.pdf`;

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
      showToast("success", "Invoice downloaded");
    } catch (error) {
      console.error(error);
      showToast("error", "Invoice download failed");
    }
  };

  const unitPrice = (payment) => {
    const amount = Number(payment?.amount || 0);
    const cards = Number(payment?.cards || 1);
    return amount / cards;
  };

  const getInvoiceNumber = (payment) => {
    if (!payment?.order_id) return "INV-01";
    return `${payment.order_id}-INV-01`;
  };

  const getInvoiceShareText = (payment) => {
    if (!payment) return "";

    const subtotal = Number(payment.amount || 0);
    const gst = subtotal * 0.18;
    const total = subtotal + gst;

    return `Invoice Details

Organization: ${payment.organization}
Order ID: ${payment.invoice_no}
Invoice No: ${getInvoiceNumber(payment)}
Date: ${payment.date}
Cards: ${payment.cards}
Payment Method: ${payment.payment_method?.toUpperCase() || "UPI"}
Payment Status: ${payment.payment_status || "Paid"}

Subtotal: ₹${subtotal.toFixed(2)}
GST (18%): ₹${payment.gst_amount}
Total: ₹${total.toFixed(2)}

Thank you for your business.
MI PROFILE.IN`;
  };

  const shareInvoiceWhatsApp = () => {
    showToast("success", "Opening WhatsApp share...");
    const text = encodeURIComponent(getInvoiceShareText(receipt));
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const shareInvoiceEmail = async () => {
    try {
      showToast("info", "Sending invoice email...");
      await api.post(
        `/orginazation-dashboard/organization/send-invoice/${receipt.id}`,
      );

      showToast("success", "Invoice sent successfully");
    } catch (e) {
      console.log(e);
      showToast("error", "Failed to send invoice");
    }
  };

  return (
    <AdminLayout>
      <div className="w-full max-w-full overflow-x-hidden pb-20 lg:pb-0">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
          <Loader show={loading} text="Loading transactions..." />

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--accent))] w-fit"
          >
            <ArrowLeft size={18} /> Back
          </button>

          <h2 className="text-xl sm:text-2xl font-semibold text-[hsl(var(--text-primary))]">
            Payment Transactions
          </h2>
        </div>

        {/* SEARCH + PER PAGE + EXPORT */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-6 gap-4">
          <div className="flex items-center gap-2 border border-[hsl(var(--border))] rounded-xl px-4 py-2.5 bg-[hsl(var(--card-bg))] w-full lg:min-w-[280px] lg:w-auto">
            <Search
              size={16}
              className="text-[hsl(var(--text-muted))] shrink-0"
            />

            <input
              placeholder="Search order, org, amount..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="outline-none text-sm flex-1 min-w-0 bg-transparent text-[hsl(var(--text-primary))] placeholder-[hsl(var(--text-muted))]"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center w-full lg:w-auto">
            <select
              value={perPage}
              onChange={(e) => {
                setPerPage(Number(e.target.value));
                setPage(1);
              }}
              className="w-full sm:w-auto border border-[hsl(var(--border))] rounded-xl px-3 py-2.5 text-sm 
                         bg-[hsl(var(--card-bg))] text-[hsl(var(--text-primary))] 
                         focus:ring-2 focus:ring-[hsl(var(--accent)/0.4)] focus:border-[hsl(var(--accent))]"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>

            <button
              onClick={exportCSV}
              disabled={loading || payments.length === 0}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 border border-[hsl(var(--border))] px-4 py-2.5 rounded-xl text-sm transition
                ${
                  loading || payments.length === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[hsl(var(--accent)/0.1)] hover:text-[hsl(var(--accent))]"
                }`}
            >
              <Download size={16} /> Export CSV
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-[hsl(var(--card-bg))] rounded-2xl shadow-xl overflow-hidden border border-[hsl(var(--border))]">
          <div className="w-full max-w-full overflow-x-auto">
            <table className="min-w-[980px] lg:min-w-full text-sm divide-y divide-[hsl(var(--border))]">
              <thead className="bg-[hsl(var(--bg-secondary)/0.6)]">
                <tr>
                  <th className="p-4 text-left text-xs font-semibold text-[hsl(var(--text-muted))] uppercase tracking-wider">
                    Invoice NO
                  </th>
                  <th className="p-4 text-left text-xs font-semibold text-[hsl(var(--text-muted))] uppercase tracking-wider">
                    Organization
                  </th>
                  <th className="p-4 text-left text-xs font-semibold text-[hsl(var(--text-muted))] uppercase tracking-wider">
                    Cards
                  </th>
                  <th className="p-4 text-left text-xs font-semibold text-[hsl(var(--text-muted))] uppercase tracking-wider">
                    NFC Cards
                  </th>
                  <th className="p-4 text-center text-xs font-semibold text-[hsl(var(--text-muted))] uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="p-4 text-center text-xs font-semibold text-[hsl(var(--text-muted))] uppercase tracking-wider">
                    Method
                  </th>
                  <th className="p-4 text-center text-xs font-semibold text-[hsl(var(--text-muted))] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="p-4 text-center text-xs font-semibold text-[hsl(var(--text-muted))] uppercase tracking-wider">
                    Date
                  </th>
                  <th className="p-4 text-center text-xs font-semibold text-[hsl(var(--text-muted))] uppercase tracking-wider">
                    Invoice & Payment Proof
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="p-12 text-center text-[hsl(var(--text-muted))]"
                    >
                      Loading transactions...
                    </td>
                  </tr>
                ) : payments.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="p-12 text-center text-[hsl(var(--text-muted))]"
                    >
                      No transactions found
                    </td>
                  </tr>
                ) : (
                  payments.map((p) => (
                    <tr
                      key={p.id}
                      className="hover:bg-[hsl(var(--accent)/0.08)] transition-colors"
                    >
                      <td className="p-4 font-medium text-[hsl(var(--text-primary))] whitespace-nowrap">
                        {p.invoice_no}
                      </td>

                      <td className="p-4 text-[hsl(var(--text-primary))] whitespace-nowrap">
                        {p.organization}
                      </td>

                      <td className="p-4 text-center text-[hsl(var(--text-primary))] whitespace-nowrap">
                        {p.cards}
                      </td>

                      <td className="p-4 text-center text-[hsl(var(--text-primary))] whitespace-nowrap">
                        {p.is_nfc_card}
                      </td>

                      <td className="p-4 text-center font-semibold text-[hsl(var(--accent))] whitespace-nowrap">
                        ₹{Number(p.amount).toFixed(2)}
                      </td>

                      <td className="p-4 text-center text-[hsl(var(--text-secondary))] whitespace-nowrap">
                        {p.payment_method?.toUpperCase() || "—"}
                      </td>

                      <td className="p-4 text-center whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            p.card_status === "Active"
                              ? "bg-emerald-500/20 text-emerald-900 border border-emerald-500/30"
                              : "bg-rose-500/20 text-rose-900 border border-rose-500/30"
                          }`}
                        >
                          {p.card_status}
                        </span>
                      </td>

                      <td className="p-4 text-center text-[hsl(var(--text-secondary))] whitespace-nowrap">
                        {p.date}
                      </td>

                      <td className="p-4 text-center whitespace-nowrap">
                        <button
                          onClick={() => {
                            console.log("Receipt Data:", p);
                            setReceipt(p);
                          }}
                          className="inline-flex items-center justify-center text-[hsl(var(--accent))] hover:text-[hsl(var(--accent-dark))] transition"
                        >
                          <FileText size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* PAGINATION */}
        {pagination && pagination.last_page > 1 && (
          <div className="flex justify-center mt-8 gap-2 flex-wrap">
            {Array.from({ length: pagination.last_page }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-4 py-2 rounded-lg border text-sm min-w-[44px] transition
                  ${
                    page === i + 1
                      ? "bg-[hsl(var(--accent))] text-white dark:text-[#282f2f] border-[hsl(var(--accent))]"
                      : "border-[hsl(var(--border))] hover:bg-[hsl(var(--accent)/0.1)] hover:text-[hsl(var(--accent))]"
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        {/* INVOICE MODAL */}
        {receipt && (
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-2 sm:p-4">
            <div className="bg-white rounded-2xl w-full max-w-7xl max-h-[95vh] overflow-y-auto shadow-2xl border border-[#E8EDF2]">
              <div className="sticky top-0 z-20 bg-white p-4 sm:p-5 border-b border-[#E8EDF2] flex justify-between items-center gap-4">
                <h3 className="font-bold text-base sm:text-xl text-[#282f2f]">
                  Invoice & Payment Proof
                </h3>

                <button
                  onClick={() => setReceipt(null)}
                  className="text-[#282f2f] hover:opacity-70 shrink-0"
                >
                  <X size={26} />
                </button>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-6 p-3 sm:p-6">
                <div
                  id="invoice-print-area"
                  className="xl:col-span-9 bg-white border border-[#E8EDF2] p-4 sm:p-6 md:p-8 text-[#282f2f] overflow-x-hidden"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-6 border-b-2 border-[#636261] pb-8">
                    <div className="flex items-center gap-4">
                      <img
                        src="/assets/Logo1 11-06 Png black orange transparent.png"
                        alt="MI PROFILE"
                        className="w-38 h-28 sm:w-52 sm:h-40 object-contain"
                      />
                    </div>

                    <div className="text-left md:text-right">
                      <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">
                        INVOICE
                      </h2>

                      <div className="text-sm space-y-1 break-words">
                        <p>
                          <strong>Invoice No:</strong> {receipt.invoice_no}
                        </p>
                        <p>
                          <strong>Invoice Date:</strong> {receipt.date}
                        </p>
                        <p>
                          <strong>Payment Method:</strong>{" "}
                          {receipt.payment_method?.toUpperCase() || "UPI"}
                        </p>
                        <p>
                          <strong>Payment Status:</strong>{" "}
                          {receipt.payment_status || "Paid"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
                    <div>
                      <span className="inline-block bg-[#636261] text-white px-2 py-1 text-xs font-bold uppercase">
                        Billing From
                      </span>

                      <h3 className="mt-3 text-lg font-bold">MI PROFILE.IN</h3>

                      <p className="text-sm mt-1">
                        C3013, Brigade Meadows
                        <br /> Kanakapura Road, Bengaluru
                        <br /> Karnataka - 560082
                      </p>
                      <p className="text-sm mt-1">
                        Email: info.miprofile@gmail.com
                      </p>
                      <p className="text-sm mt-1">Phone: +91 87229 81233</p>
                      <p className="text-sm mt-1">GSTIN: 29AAACT2727Q1ZW</p>
                    </div>

                    <div>
                      <span className="inline-block bg-[#636261] text-white px-2 py-1 text-xs font-bold uppercase">
                        Bill To
                      </span>

                      <h3 className="mt-3 text-lg font-bold break-words">
                        {receipt.organization}
                      </h3>

                      <p className="text-sm mt-1 flex items-start gap-2 break-all">
                        <Mail
                          size={14}
                          className="text-[#636261] shrink-0 mt-0.5"
                        />
                        {receipt.organization_email || "N/A"}
                      </p>

                      <p className="text-sm mt-1 flex items-start gap-2 break-all">
                        <Phone
                          size={14}
                          className="text-[#636261] shrink-0 mt-0.5"
                        />
                        {receipt.organization_phone || "N/A"}
                      </p>

                      <p className="text-sm mt-1 flex items-start gap-2 break-all">
                        <span className="text-[#636261] font-semibold shrink-0">
                          GST:
                        </span>
                        {receipt?.gst || receipt?.gst || "N/A"}
                      </p>

                      <p className="text-sm mt-1">
                        Payment Method:{" "}
                        {receipt.payment_method?.toUpperCase() || "UPI"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mb-8 border border-[#E8EDF2]">
                    <div className="bg-[#636261] text-white p-4">
                      <p className="text-xs uppercase opacity-80">ORG ID</p>
                      <p className="font-bold text-xl mt-1">
                        {receipt.organization_id}
                      </p>
                    </div>

                    <div className="bg-[#636261] text-white p-4">
                      <p className="text-xs uppercase opacity-80">Date</p>
                      <p className="font-bold text-xl mt-1">{receipt.date}</p>
                    </div>

                    <div className="bg-[#636261] text-white p-4">
                      <p className="text-xs uppercase opacity-80">
                        Cards Purchased
                      </p>
                      <p className="font-bold text-xl mt-1">{receipt.cards}</p>
                    </div>

                    <div className="bg-[#636261] text-white p-4">
                      <p className="text-xs uppercase opacity-80">
                        Total Amount
                      </p>
                      <p className="font-bold text-xl mt-1">
                        ₹{Number(receipt.amount).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="w-full overflow-x-auto">
                    <table className="min-w-[560px] w-full text-sm">
                      <thead>
                        <tr className="bg-[#636261] text-white">
                          <th className="p-3 text-left">Description</th>
                          <th className="p-3 text-center">Qty.</th>
                          <th className="p-3 text-center">Unit Price (₹)</th>
                          <th className="p-3 text-center">NFC Card (₹)</th>
                          <th className="p-3 text-right">Amount (₹)</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr className="border-b border-[#E8EDF2]">
                          <td className="p-4">
                            Digital Business Card Purchase
                          </td>
                          <td className="p-4 text-center">{receipt.cards}</td>
                          <td className="p-4 text-center">
                            ₹{receipt.price_per_card}
                          </td>
                          <td className="p-4 text-center">
                            ₹{receipt.nfc_price_per_card}
                          </td>
                          <td className="p-4 text-right font-semibold">
                            ₹ {Number(receipt.subtotal).toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-end mt-6">
                    <div className="w-full max-w-sm text-sm space-y-3">
                      {(() => {
                        const subtotal = Number(receipt.amount || 0);
                        const gst = subtotal * 0.18;
                        const total = subtotal + gst;

                        return (
                          <>
                            <div className="flex justify-between gap-4">
                              <span>Subtotal</span>
                              <span>
                                ₹ {Number(receipt.subtotal || 0).toFixed(2)}
                              </span>
                            </div>

                            {Number(receipt.discount_amount || 0) > 0 && (
                              <div className="flex justify-between gap-4 text-green-600">
                                <span>
                                  Discount
                                  {receipt.coupon_code
                                    ? ` (${receipt.coupon_code})`
                                    : ""}
                                </span>

                                <span>
                                  - ₹{" "}
                                  {Number(receipt.discount_amount).toFixed(2)}
                                </span>
                              </div>
                            )}

                            <div className="flex justify-between gap-4">
                              <span>GST ({receipt.gst_percentage || 18}%)</span>

                              <span>
                                ₹ {Number(receipt.gst_amount || 0).toFixed(2)}
                              </span>
                            </div>

                            <div className="flex justify-between gap-4 border-t border-[#636261] pt-3 text-lg font-bold">
                              <span>TOTAL</span>

                              <span>
                                ₹ {Number(receipt.amount || 0).toFixed(2)}
                              </span>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                    <div>
                      <p className="font-semibold">Amount in Words:</p>

                      {(() => {
                        const subtotal = Number(receipt.amount || 0);
                        const gst = subtotal * 0.18;
                        const total = subtotal + gst;

                        return (
                          <p className="text-sm mt-1 break-words">
                            Rupees {receipt.amount.toLocaleString("en-IN")} Only
                          </p>
                        );
                      })()}
                    </div>
                  </div>

                  <div className="mt-12 border-t-2 border-[#636261] pt-5 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Building2 size={18} />
                        <strong>MI PROFILE.IN</strong>
                      </div>
                      <p className="flex items-center gap-2 mt-1">
                        <Globe size={14} /> www.miprofile.in
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold mb-2">CONTACT US</h4>
                      <p className="flex items-center gap-2">
                        <Phone size={14} /> +91 87229 81233
                      </p>
                      <p className="flex items-center gap-2 mt-1 break-all">
                        <Mail size={14} className="shrink-0" />{" "}
                        info.miprofile@gmail.com
                      </p>
                      <p className="flex items-center gap-2 mt-1">
                        <Globe size={14} /> www.miprofile.in
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold mb-2">BANK DETAILS</h4>
                      <p>Bank Name: Bank of Baroda</p>
                      <p>Account Name: Brand Crest Digital</p>
                      <p>Account No:67510200001532</p>
                      <p>IFSC Code: BARB0VJKAMR</p>
                    </div>
                  </div>

                  <div className="mt-5 bg-[#636261] text-white text-center text-xs p-3">
                    Thank you for your business! &nbsp; | &nbsp; This is a
                    computer generated invoice.
                  </div>
                </div>

                <div className="xl:col-span-3 space-y-5">
                  <div className="border border-[#E8EDF2] rounded-xl p-4">
                    <h4 className="font-bold text-[#282f2f] mb-4">
                      PAYMENT PROOF
                    </h4>

                    {receipt.payment_proof ? (
                      <>
                        <div className="border border-[#E8EDF2] rounded-xl p-3 bg-white">
                          <img
                            src={receipt.payment_proof}
                            alt="Payment Proof"
                            className="w-full rounded-lg object-contain max-h-[300px] sm:max-h-[420px]"
                          />
                        </div>

                        <a
                          href={receipt.payment_proof}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() =>
                            showToast("info", "Opening payment proof...")
                          }
                          className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#636261] text-white font-semibold text-sm sm:text-base"
                        >
                          View Full Size <ExternalLink size={16} />
                        </a>

                        <a
                          href={receipt.payment_proof}
                          download
                          onClick={() =>
                            showToast("success", "Downloading payment proof...")
                          }
                          className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#636261] text-white font-semibold text-sm sm:text-base"
                        >
                          <Download size={16} />
                          Download Payment Proof
                        </a>
                      </>
                    ) : (
                      <p className="text-sm text-[#282f2f]/70">
                        No payment proof uploaded.
                      </p>
                    )}
                  </div>

                  <div className="border border-[#E8EDF2] rounded-xl p-4">
                    <h4 className="font-bold text-[#282f2f] mb-4">ACTIONS</h4>

                    <button
                      onClick={shareInvoiceWhatsApp}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#25D366] text-white font-semibold mb-3 text-sm sm:text-base"
                    >
                      <MessageCircle size={16} />
                      Share via WhatsApp
                    </button>

                    <button
                      onClick={shareInvoiceEmail}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#fe7f2d] text-white font-semibold mb-3 text-sm sm:text-base"
                    >
                      <Mail size={16} />
                      Share via Email
                    </button>

                    <button
                      onClick={downloadInvoice}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-[#636261] text-[#282f2f] font-semibold mb-3 text-sm sm:text-base"
                    >
                      <FileText size={16} />
                      Download Invoice (PDF)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
