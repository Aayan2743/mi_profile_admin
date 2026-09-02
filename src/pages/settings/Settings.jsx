// // src/pages/settings/Settings.jsx
// import {
//   User,
//   IndianRupee,
//   Save,
//   Upload,
//   TicketPercent,
//   Trash2,
// } from "lucide-react";
// import { useEffect, useState } from "react";
// import AdminLayout from "../../components/layout/AdminLayout";
// import { successAlert, errorAlert } from "../../utils/alert";
// import { useAuth } from "../../context/AuthContext";

// import Loader from "../../components/Loader";
// import { setFavicon, resetFavicon } from "../../utils/favicon";
// import api from "../../services/api";

// const PRIMARY = "#fe7f2d";
// const PRIMARY_DARK = "#021f26";

// export default function Settings() {
//   const { user: authUser, branding: authBranding, updateBranding } = useAuth();

//   const [activeTab, setActiveTab] = useState("profile");
//   const [saving, setSaving] = useState(false);

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const [brandName, setBrandName] = useState("MI PROFILE");
//   const [logoPreview, setLogoPreview] = useState("/logo.jpeg");
//   const [faviconPreview, setFaviconPreview] = useState("/favicon.ico");
//   const [logoFile, setLogoFile] = useState(null);
//   const [faviconFile, setFaviconFile] = useState(null);

//   const [cardAmount, setCardAmount] = useState("");
//   const [minCard, setMinCard] = useState("");

//   const [coupons, setCoupons] = useState([]);
//   const [couponName, setCouponName] = useState("");
//   const [couponCode, setCouponCode] = useState("");
//   const [couponType, setCouponType] = useState("percentage");
//   const [couponValue, setCouponValue] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [pageLoading, setPageLoading] = useState(true);
//   const tabs = [
//     { key: "profile", label: "Profile", icon: User },
//     { key: "pricing", label: "Card Pricing", icon: IndianRupee },
//     { key: "coupons", label: "Coupons", icon: TicketPercent },
//   ];

//   useEffect(() => {
//       const initSettings = async () => {
//       try {
//         setPageLoading(true);
//     setName(authUser?.name || "");
//     setEmail(authUser?.email || "");

//     const savedBranding =
//       JSON.parse(localStorage.getItem("branding") || "{}") || {};

//     setBrandName(
//       savedBranding.brand_name || authBranding?.brand_name || "MI PROFILE",
//     );

//     setLogoPreview(
//       savedBranding.logo || authBranding?.logo || "/logo1new.jpeg",
//     );

//     setFaviconPreview(
//       savedBranding.favicon || authBranding?.favicon || "/favicon.ico",
//     );

//     if (savedBranding.favicon || authBranding?.favicon) {
//       setFavicon(savedBranding.favicon || authBranding.favicon);
//     }
//   await Promise.all([
//           fetchPricing(),
//           fetchCoupons(),
//           new Promise((resolve) => setTimeout(resolve, 1000)),
//         ]);
//       } finally {
//         setPageLoading(false);
//       }
//     };

//     initSettings();
//   }, []);


//   const fetchPricing = async () => {
//     try {
//       const res = await api.get("/orginazation-dashboard/card-pricing");

//       if (res.data?.data) {
//         setCardAmount(res.data.data.price_per_card || "");
//         setMinCard(res.data.data.minimum_cards || "");
//       }
//     } catch (err) {
//       console.error("Pricing fetch error:", err);
//     }
//   };

//   const fetchCoupons = async () => {
//     try {
//       const res = await api.get("/orginazation-dashboard/coupons");
//       setCoupons(res.data?.data || []);
//     } catch (err) {
//       console.error("Coupons fetch error:", err);
//     }
//   };

//   const handleSavePricing = async () => {
//     if (!cardAmount || !minCard) {
//       errorAlert("Validation Error", "Both fields are required");
//       return;
//     }

//     setSaving(true);

//     try {
//       await api.post("/orginazation-dashboard/card-pricing", {
//         price_per_card: Number(cardAmount),
//         minimum_cards: Number(minCard),
//       });

//       // successAlert("Saved", "Card pricing updated successfully");
//       fetchPricing();
//     } catch (err) {
//       errorAlert(
//         "Error",
//         err.response?.data?.message || "Failed to update pricing",
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleCreateCoupon = async () => {
//     console.log({
//       couponName,
//       couponCode,
//       couponType,
//       couponValue,
//       startDate,
//       endDate,
//     });

//     if (!couponName.trim() || !couponCode.trim() || !couponValue) {
//       errorAlert("Validation Error", "All coupon fields are required");
//       return;
//     }

//     if (!startDate || !endDate) {
//       errorAlert("Validation Error", "Start and expiry date required");
//       return;
//     }

//     if (new Date(endDate) < new Date(startDate)) {
//       errorAlert(
//         "Validation Error",
//         "Expiry date must be greater than start date",
//       );
//       return;
//     }

//     if (couponType === "percentage" && Number(couponValue) > 100) {
//       errorAlert("Validation Error", "Percentage cannot exceed 100%");
//       return;
//     }

//     setSaving(true);

//     try {
//       await api.post("/orginazation-dashboard/coupons", {
//         name: couponName.trim(),
//         code: couponCode.trim().toUpperCase(),
//         type: couponType,
//         value: Number(couponValue),
//         start_date: startDate,
//         end_date: endDate,
//       });

//       // successAlert("Success", "Coupon created successfully");

//       setCouponName("");
//       setCouponCode("");
//       setCouponType("percentage");
//       setCouponValue("");
//       setStartDate("");
//       setEndDate("");

//       fetchCoupons();
//     } catch (err) {
//       errorAlert(
//         "Error",
//         err.response?.data?.message || "Failed to create coupon",
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleDeleteCoupon = async (id) => {
//     if (!window.confirm("Delete this coupon?")) return;

//     setSaving(true);

//     try {
//       await api.delete(`/orginazation-dashboard/coupons/${id}`);
//       successAlert("Deleted", "Coupon deleted successfully");
//       fetchCoupons();
//     } catch (err) {
//       errorAlert(
//         "Error",
//         err.response?.data?.message || "Failed to delete coupon",
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleProfileSave = () => {
//      if (saving) return;
//     if (password && password !== confirmPassword) {
//       errorAlert("Validation Error", "Passwords do not match");
//       return;
//     }
//  setSaving(true);
//     // successAlert("Profile Updated", "Profile updated successfully");
//     // setPassword("");
//     // setConfirmPassword("");
//     setTimeout(() => {
//     // successAlert("Profile Updated", "Profile updated successfully");
//     setPassword("");
//     setConfirmPassword("");
//     setSaving(false);
//   }, 2000);
    
//   };

//   const handleSaveBranding = async () => {
//     if (!brandName.trim()) {
//       errorAlert("Validation Error", "Brand name is required");
//       return;
//     }

//     setSaving(true);

//     try {
//       const formData = new FormData();

//       formData.append("brand_name", brandName.trim());

//       if (logoFile) formData.append("logo", logoFile);
//       if (faviconFile) formData.append("favicon", faviconFile);

//       const res = await api.post("/orginazation-dashboard/branding", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (res.data?.success === false) {
//         errorAlert("Error", res.data.message);
//         return;
//       }

//       if (res.data?.data) {
//         updateBranding(res.data.data);

//         setLogoPreview(res.data.data.logo);
//         setFaviconPreview(res.data.data.favicon);

//         if (res.data.data.favicon) {
//           setFavicon(res.data.data.favicon);
//         }

//         localStorage.setItem("branding", JSON.stringify(res.data.data));
//       }

//       successAlert("Success", "Branding updated successfully");
//     } catch (err) {
//       errorAlert(
//         "Error",
//         err.response?.data?.message || "Failed to update branding",
//       );
//     } finally {
//       setSaving(false);
//     }
//   };
//  if (pageLoading) {
//     return (
//       <AdminLayout>
//         <Loader show={pageLoading} text="Loading settings..." />
//       </AdminLayout>
//     );
//   }
//   return (
//     <AdminLayout>
      
//  <Loader show={saving} text="Saving changes..." />
//       <div className="p-6 space-y-8">
//         <div>
//           <h2 className="text-2xl font-semibold text-[#464243] dark:text-[#E8EDF2]">
//             Settings
//           </h2>

//           <p className="text-[#464243]/70 dark:text-[#E8EDF2]/80 mt-1">
//             Manage your account, appearance, pricing and coupons
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//           <div className="lg:col-span-3">
//             <div className="card p-3 space-y-1.5 sticky top-6">
//               {tabs.map((tab) => {
//                 const Icon = tab.icon;
//                 const isActive = activeTab === tab.key;

//                 return (
//                   <button
//                     key={tab.key}
//                     onClick={() => setActiveTab(tab.key)}
//                     className={`
//                       w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200
//                       ${
//                         isActive
//                           ? "bg-[#E8EDF2] text-[#464243] shadow-md font-semibold"
//                           : "text-[#464243] dark:text-[#E8EDF2] hover:bg-[#E8EDF2] hover:text-[#464243]"
//                       }
//                     `}
//                   >
//                     <Icon size={18} />
//                     <span>{tab.label}</span>
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           <div className="lg:col-span-9">
//             <div className="card p-6 md:p-8">
//               <Loader show={saving} text="Saving changes..." />

//               {activeTab === "profile" && (
//                 <div className="space-y-8">
//                   <div>
//                     <h3 className="text-xl font-semibold text-[#464243] dark:text-[#E8EDF2]">
//                       Profile Settings
//                     </h3>

//                     <p className="text-[#464243]/70 dark:text-[#E8EDF2]/80 mt-1 text-sm">
//                       Update your personal information
//                     </p>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <InputBox
//                       label="Admin Name"
//                       value={name}
//                       onChange={setName}
//                     />

//                     <InputBox
//                       label="Email Address"
//                       type="email"
//                       value={email}
//                       onChange={setEmail}
//                       disabled
//                     />

//                     <InputBox
//                       label="New Password"
//                       type="password"
//                       value={password}
//                       onChange={setPassword}
//                       placeholder="Leave blank to keep current"
//                     />

//                     <InputBox
//                       label="Confirm Password"
//                       type="password"
//                       value={confirmPassword}
//                       onChange={setConfirmPassword}
//                       placeholder="Confirm new password"
//                     />
//                   </div>

//                   <div className="flex justify-end">
//                     <PrimaryButton
//                       onClick={handleProfileSave}
//                       disabled={saving}
//                     >
//                       <Save size={16} />
//                       Save Profile
//                     </PrimaryButton>
//                   </div>
//                 </div>
//               )}

//               {activeTab === "pricing" && (
//                 <div className="space-y-8">
//                   <div>
//                     <h3 className="text-xl font-semibold text-[#464243] dark:text-[#E8EDF2]">
//                       Mi Profile Pricing
//                     </h3>

//                     <p className="text-[#464243]/70 dark:text-[#E8EDF2]/80 mt-1 text-sm">
//                       Set pricing rules for purchasing cards
//                     </p>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl">
//                     <InputBox
//                       label="Price per card (₹)"
//                       type="number"
//                       value={cardAmount}
//                       onChange={setCardAmount}
//                       min="1"
//                       step="0.01"
//                     />

//                     <InputBox
//                       label="Minimum cards per purchase"
//                       type="number"
//                       value={minCard}
//                       onChange={setMinCard}
//                       min="1"
//                     />
//                   </div>

//                   <div className="flex justify-end">
//                     <PrimaryButton
//                       onClick={handleSavePricing}
//                       disabled={saving}
//                     >
//                       <Save size={16} />
//                       Save Pricing
//                     </PrimaryButton>
//                   </div>
//                 </div>
//               )}

//               {activeTab === "coupons" && (
//                 <div className="space-y-8">
//                   <div>
//                     <h3 className="text-xl font-semibold text-[#464243] dark:text-[#E8EDF2]">
//                       Coupon Management
//                     </h3>

//                     <p className="text-[#464243]/70 dark:text-[#E8EDF2]/80 mt-1 text-sm">
//                       Create percentage or fixed amount coupons for card
//                       purchases
//                     </p>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
//                     <InputBox
//                       label="Coupon Name"
//                       value={couponName}
//                       onChange={setCouponName}
//                       placeholder="Welcome Offer"
//                     />

//                     <InputBox
//                       label="Coupon Code"
//                       value={couponCode}
//                       onChange={(value) => setCouponCode(value.toUpperCase())}
//                       placeholder="WELCOME10"
//                     />

//                     <div className="space-y-1.5">
//                       <label className="text-sm font-medium text-[#464243] dark:text-[#E8EDF2]">
//                         Coupon Type
//                       </label>

//                       <select
//                         value={couponType}
//                         onChange={(e) => setCouponType(e.target.value)}
//                         className="input focus:ring-[#007979] focus:border-[#007979]/50"
//                       >
//                         <option value="percentage">Percentage (%)</option>
//                         <option value="flat">Fixed Amount (₹)</option>
//                       </select>
//                     </div>

//                     <InputBox
//                       label="Discounts"
//                       type="number"
//                       value={couponValue}
//                       onChange={setCouponValue}
//                       placeholder={couponType === "percentage" ? "10" : "100"}
//                       min="1"
//                     />
//                   </div>
//                   <div className="flex gap-3">
//                     <input
//                       type="date"
//                       value={startDate}
//                       onChange={(e) => setStartDate(e.target.value)}
//                       className="input h-10 text-sm"
//                     />

//                     <input
//                       type="date"
//                       value={endDate}
//                       onChange={(e) => setEndDate(e.target.value)}
//                       className="input h-10 text-sm"
//                     />
//                   </div>

//                   <div className="flex justify-end">
//                     <PrimaryButton
//                       onClick={handleCreateCoupon}
//                       disabled={saving}
//                     >
//                       <Save size={16} />
//                       Create Coupon
//                     </PrimaryButton>
//                   </div>

//                   <div className="border-t border-[#E8EDF2] pt-6">
//                     <h4 className="font-semibold text-[#464243] dark:text-[#E8EDF2] mb-4">
//                       Existing Coupons
//                     </h4>

//                     <div className="overflow-x-auto">
//                       <table className="w-full text-sm border border-[#E8EDF2] rounded-xl overflow-hidden">
//                         <thead className="bg-[#E8EDF2] text-[#464243]">
//                           <tr>
//                             <th className="p-3 text-left">Name</th>
//                             <th className="p-3 text-left">Code</th>
//                             <th className="p-3 text-left">Type</th>
//                             <th className="p-3 text-left">Value</th>
//                             <th className="p-3 text-left">Start Date</th>
//                             <th className="p-3 text-left">End Date</th>
//                             <th className="p-3 text-left">Action</th>
//                           </tr>
//                         </thead>

//                         <tbody>
//                           {coupons.length === 0 ? (
//                             <tr>
//                               <td
//                                 colSpan="5"
//                                 className="p-5 text-center text-[#464243]/70"
//                               >
//                                 No coupons created
//                               </td>
//                             </tr>
//                           ) : (
//                             coupons.map((coupon) => (
//                               <tr
//                                 key={coupon.id}
//                                 className="border-t border-[#E8EDF2] text-[#464243] dark:text-[#E8EDF2]"
//                               >
//                                 <td className="p-3">{coupon.name}</td>
//                                 <td className="p-3 font-semibold">
//                                   {coupon.code}
//                                 </td>
//                                 <td className="p-3">
//                                   {coupon.type === "percentage"
//                                     ? "Percentage"
//                                     : "Fixed Amount"}
//                                 </td>
//                                 <td className="p-3">
//                                   {coupon.type === "percentage"
//                                     ? `${coupon.value}%`
//                                     : `₹${Number(coupon.value).toLocaleString(
//                                         "en-IN",
//                                       )}`}
//                                 </td>

//                                 <td className="p-3">
//                                   {coupon.start_date?.split("T")[0]}
//                                 </td>

//                                 <td className="p-3">
//                                   {coupon.end_date?.split("T")[0]}
//                                 </td>

//                                 <td className="p-3">
//                                   <button
//                                     onClick={() =>
//                                       handleDeleteCoupon(coupon.id)
//                                     }
//                                     disabled={saving}
//                                     className="inline-flex items-center gap-1 text-red-600 hover:underline disabled:opacity-50"
//                                   >
//                                     <Trash2 size={15} />
//                                     Delete
//                                   </button>
//                                 </td>
//                               </tr>
//                             ))
//                           )}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// }

// function InputBox({
//   label,
//   value,
//   onChange,
//   type = "text",
//   placeholder = "",
//   disabled = false,
//   min,
//   step,
// }) {
//   return (
//     <div className="space-y-1.5">
//       <label className="text-sm font-medium text-[#464243] dark:text-[#E8EDF2]">
//         {label}
//       </label>

//       <input
//         type={type}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className="input focus:ring-[#007979] focus:border-[#007979]/50"
//         placeholder={placeholder}
//         disabled={disabled}
//         min={min}
//         step={step}
//       />
//     </div>
//   );
// }

// function PrimaryButton({ children, onClick, disabled }) {
//   return (
//     <button
//       onClick={onClick}
//       disabled={disabled}
//       className="inline-flex items-center gap-2 px-10 py-2.5 rounded-xl font-medium text-[#ffff] transition-all shadow-sm disabled:opacity-70"
//       style={{
//         backgroundColor: disabled ? PRIMARY_DARK : PRIMARY,
//       }}
//     >
//       {children}
//     </button>
//   );
// }

// // src/pages/settings/Settings.jsx

// import {
//   User,
//   IndianRupee,
//   Save,
//   TicketPercent,
//   Trash2,
// } from "lucide-react";

// import { useEffect, useState } from "react";

// import AdminLayout from "../../components/layout/AdminLayout";
// import { successAlert, errorAlert } from "../../utils/alert";
// import { useAuth } from "../../context/AuthContext";

// import Loader from "../../components/Loader";
// import { setFavicon } from "../../utils/favicon";
// import api from "../../services/api";

// const PRIMARY = "#fe7f2d";
// const PRIMARY_DARK = "#021f26";

// export default function Settings() {
//   const {
//     user: authUser,
//     branding: authBranding,
//     updateBranding,
//   } = useAuth();

//   const [activeTab, setActiveTab] = useState("profile");
//   const [saving, setSaving] = useState(false);
//   const [pageLoading, setPageLoading] = useState(true);

//   // ============================================
//   // PROFILE
//   // ============================================

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   // ============================================
//   // BRANDING
//   // ============================================

//   const [brandName, setBrandName] = useState("MI PROFILE");
//   const [logoPreview, setLogoPreview] = useState("/logo.jpeg");
//   const [faviconPreview, setFaviconPreview] = useState("/favicon.ico");
//   const [logoFile, setLogoFile] = useState(null);
//   const [faviconFile, setFaviconFile] = useState(null);

//   // ============================================
//   // PRICING
//   // ============================================

//   const [cardAmount, setCardAmount] = useState("");
//   const [minCard, setMinCard] = useState("");

//   // Minimum withdrawal amount
//   const [minimumWithdrawal, setMinimumWithdrawal] = useState("1000");

//   // ============================================
//   // COUPONS
//   // ============================================

//   const [coupons, setCoupons] = useState([]);

//   const [couponName, setCouponName] = useState("");
//   const [couponCode, setCouponCode] = useState("");
//   const [couponType, setCouponType] = useState("percentage");
//   const [couponValue, setCouponValue] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   // ============================================
//   // TABS
//   // ============================================

//   const tabs = [
//     {
//       key: "profile",
//       label: "Profile",
//       icon: User,
//     },
//     {
//       key: "pricing",
//       label: "Card Pricing",
//       icon: IndianRupee,
//     },
//     {
//       key: "coupons",
//       label: "Coupons",
//       icon: TicketPercent,
//     },
//   ];

//   // ============================================
//   // INITIAL LOAD
//   // ============================================

//   useEffect(() => {
//     const initSettings = async () => {
//       try {
//         setPageLoading(true);

//         // Profile
//         setName(authUser?.name || "");
//         setEmail(authUser?.email || "");

//         // Branding
//         const savedBranding =
//           JSON.parse(localStorage.getItem("branding") || "{}") || {};

//         setBrandName(
//           savedBranding.brand_name ||
//             authBranding?.brand_name ||
//             "MI PROFILE"
//         );

//         setLogoPreview(
//           savedBranding.logo ||
//             authBranding?.logo ||
//             "/logo1new.jpeg"
//         );

//         setFaviconPreview(
//           savedBranding.favicon ||
//             authBranding?.favicon ||
//             "/favicon.ico"
//         );

//         if (savedBranding.favicon || authBranding?.favicon) {
//           setFavicon(
//             savedBranding.favicon || authBranding.favicon
//           );
//         }

//         await Promise.all([
//           fetchPricing(),
//           fetchCoupons(),
//           new Promise((resolve) =>
//             setTimeout(resolve, 1000)
//           ),
//         ]);
//       } finally {
//         setPageLoading(false);
//       }
//     };

//     initSettings();
//   }, []);

//   // ============================================
//   // FETCH PRICING
//   // ============================================

//   const fetchPricing = async () => {
//     try {
//       const res = await api.get(
//         "/orginazation-dashboard/card-pricing"
//       );

//       if (res.data?.data) {
//         const pricing = res.data.data;

//         setCardAmount(
//           pricing.price_per_card ?? ""
//         );

//         setMinCard(
//           pricing.minimum_cards ?? ""
//         );

//         // Minimum withdrawal
//         setMinimumWithdrawal(
//           pricing.minimum_withdrawal ??
//             pricing.minimum_withdraw_amount ??
//             1000
//         );
//       }
//     } catch (err) {
//       console.error(
//         "Pricing fetch error:",
//         err
//       );

//       // Default minimum withdrawal
//       setMinimumWithdrawal("1000");
//     }
//   };

//   // ============================================
//   // FETCH COUPONS
//   // ============================================

//   const fetchCoupons = async () => {
//     try {
//       const res = await api.get(
//         "/orginazation-dashboard/coupons"
//       );

//       setCoupons(
//         res.data?.data || []
//       );
//     } catch (err) {
//       console.error(
//         "Coupons fetch error:",
//         err
//       );
//     }
//   };

//   // ============================================
//   // SAVE PRICING
//   // ============================================

//   const handleSavePricing = async () => {
//     if (!cardAmount || !minCard || !minimumWithdrawal) {
//       errorAlert(
//         "Validation Error",
//         "All pricing fields are required"
//       );
//       return;
//     }

//     const price = Number(cardAmount);
//     const minimumCards = Number(minCard);
//     const minimumWithdraw = Number(
//       minimumWithdrawal
//     );

//     if (price <= 0) {
//       errorAlert(
//         "Validation Error",
//         "Price per card must be greater than 0"
//       );
//       return;
//     }

//     if (minimumCards <= 0) {
//       errorAlert(
//         "Validation Error",
//         "Minimum cards must be greater than 0"
//       );
//       return;
//     }

//     if (minimumWithdraw <= 0) {
//       errorAlert(
//         "Validation Error",
//         "Minimum withdrawal amount must be greater than 0"
//       );
//       return;
//     }

//     setSaving(true);

//     try {
//       await api.post(
//         "/orginazation-dashboard/card-pricing",
//         {
//           price_per_card: price,
//           minimum_cards: minimumCards,

//           // Minimum withdrawal
//           minimum_withdrawal: minimumWithdraw,
//         }
//       );

//       successAlert(
//         "Saved",
//         "Card pricing and withdrawal settings updated successfully"
//       );

//       await fetchPricing();
//     } catch (err) {
//       errorAlert(
//         "Error",
//         err.response?.data?.message ||
//           "Failed to update pricing"
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ============================================
//   // CREATE COUPON
//   // ============================================

//   const handleCreateCoupon = async () => {
//     if (
//       !couponName.trim() ||
//       !couponCode.trim() ||
//       !couponValue
//     ) {
//       errorAlert(
//         "Validation Error",
//         "All coupon fields are required"
//       );
//       return;
//     }

//     if (!startDate || !endDate) {
//       errorAlert(
//         "Validation Error",
//         "Start and expiry date required"
//       );
//       return;
//     }

//     if (
//       new Date(endDate) <
//       new Date(startDate)
//     ) {
//       errorAlert(
//         "Validation Error",
//         "Expiry date must be greater than start date"
//       );
//       return;
//     }

//     if (
//       couponType === "percentage" &&
//       Number(couponValue) > 100
//     ) {
//       errorAlert(
//         "Validation Error",
//         "Percentage cannot exceed 100%"
//       );
//       return;
//     }

//     setSaving(true);

//     try {
//       await api.post(
//         "/orginazation-dashboard/coupons",
//         {
//           name: couponName.trim(),
//           code: couponCode
//             .trim()
//             .toUpperCase(),
//           type: couponType,
//           value: Number(couponValue),
//           start_date: startDate,
//           end_date: endDate,
//         }
//       );

//       successAlert(
//         "Success",
//         "Coupon created successfully"
//       );

//       setCouponName("");
//       setCouponCode("");
//       setCouponType("percentage");
//       setCouponValue("");
//       setStartDate("");
//       setEndDate("");

//       await fetchCoupons();
//     } catch (err) {
//       errorAlert(
//         "Error",
//         err.response?.data?.message ||
//           "Failed to create coupon"
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ============================================
//   // DELETE COUPON
//   // ============================================

//   const handleDeleteCoupon = async (id) => {
//     if (
//       !window.confirm(
//         "Delete this coupon?"
//       )
//     ) {
//       return;
//     }

//     setSaving(true);

//     try {
//       await api.delete(
//         `/orginazation-dashboard/coupons/${id}`
//       );

//       successAlert(
//         "Deleted",
//         "Coupon deleted successfully"
//       );

//       await fetchCoupons();
//     } catch (err) {
//       errorAlert(
//         "Error",
//         err.response?.data?.message ||
//           "Failed to delete coupon"
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ============================================
//   // PROFILE SAVE
//   // ============================================

//   const handleProfileSave = () => {
//     if (saving) return;

//     if (
//       password &&
//       password !== confirmPassword
//     ) {
//       errorAlert(
//         "Validation Error",
//         "Passwords do not match"
//       );
//       return;
//     }

//     setSaving(true);

//     setTimeout(() => {
//       setPassword("");
//       setConfirmPassword("");
//       setSaving(false);

//       successAlert(
//         "Profile Updated",
//         "Profile updated successfully"
//       );
//     }, 1000);
//   };

//   // ============================================
//   // BRANDING SAVE
//   // ============================================

//   const handleSaveBranding = async () => {
//     if (!brandName.trim()) {
//       errorAlert(
//         "Validation Error",
//         "Brand name is required"
//       );
//       return;
//     }

//     setSaving(true);

//     try {
//       const formData = new FormData();

//       formData.append(
//         "brand_name",
//         brandName.trim()
//       );

//       if (logoFile) {
//         formData.append(
//           "logo",
//           logoFile
//         );
//       }

//       if (faviconFile) {
//         formData.append(
//           "favicon",
//           faviconFile
//         );
//       }

//       const res = await api.post(
//         "/orginazation-dashboard/branding",
//         formData,
//         {
//           headers: {
//             "Content-Type":
//               "multipart/form-data",
//           },
//         }
//       );

//       if (res.data?.success === false) {
//         errorAlert(
//           "Error",
//           res.data.message
//         );
//         return;
//       }

//       if (res.data?.data) {
//         updateBranding(
//           res.data.data
//         );

//         setLogoPreview(
//           res.data.data.logo
//         );

//         setFaviconPreview(
//           res.data.data.favicon
//         );

//         if (
//           res.data.data.favicon
//         ) {
//           setFavicon(
//             res.data.data.favicon
//           );
//         }

//         localStorage.setItem(
//           "branding",
//           JSON.stringify(
//             res.data.data
//           )
//         );
//       }

//       successAlert(
//         "Success",
//         "Branding updated successfully"
//       );
//     } catch (err) {
//       errorAlert(
//         "Error",
//         err.response?.data?.message ||
//           "Failed to update branding"
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ============================================
//   // PAGE LOADING
//   // ============================================

//   if (pageLoading) {
//     return (
//       <AdminLayout>
//         <Loader
//           show={pageLoading}
//           text="Loading settings..."
//         />
//       </AdminLayout>
//     );
//   }

//   // ============================================
//   // UI
//   // ============================================

//   return (
//     <AdminLayout>

//       <Loader
//         show={saving}
//         text="Saving changes..."
//       />

//       <div className="p-6 space-y-8">

//         {/* ================= HEADER ================= */}

//         <div>
//           <h2 className="text-2xl font-semibold text-[#464243]">
//             Settings
//           </h2>

//           <p className="text-[#464243]/70 mt-1">
//             Manage your account, appearance,
//             pricing and coupons
//           </p>
//         </div>

//         {/* ================= CONTENT ================= */}

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

//           {/* ================= LEFT TABS ================= */}

//           <div className="lg:col-span-3">

//             <div className="card p-3 space-y-1.5 sticky top-6">

//               {tabs.map((tab) => {
//                 const Icon = tab.icon;
//                 const isActive =
//                   activeTab === tab.key;

//                 return (
//                   <button
//                     key={tab.key}
//                     onClick={() =>
//                       setActiveTab(
//                         tab.key
//                       )
//                     }
//                     className={`
//                       w-full flex items-center gap-3
//                       px-4 py-3 rounded-xl
//                       text-left
//                       transition-all duration-200
//                       ${
//                         isActive
//                           ? "bg-[#E8EDF2] text-[#464243] shadow-md font-semibold"
//                           : "text-[#464243] hover:bg-[#E8EDF2]"
//                       }
//                     `}
//                   >
//                     <Icon size={18} />

//                     <span>
//                       {tab.label}
//                     </span>
//                   </button>
//                 );
//               })}

//             </div>
//           </div>

//           {/* ================= RIGHT CONTENT ================= */}

//           <div className="lg:col-span-9">

//             <div className="card p-6 md:p-8">

//               {/* ============================================
//                   PROFILE
//               ============================================ */}

//               {activeTab === "profile" && (
//                 <div className="space-y-8">

//                   <div>
//                     <h3 className="text-xl font-semibold text-[#464243]">
//                       Profile Settings
//                     </h3>

//                     <p className="text-[#464243]/70 mt-1 text-sm">
//                       Update your personal information
//                     </p>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//                     <InputBox
//                       label="Admin Name"
//                       value={name}
//                       onChange={setName}
//                     />

//                     <InputBox
//                       label="Email Address"
//                       type="email"
//                       value={email}
//                       onChange={setEmail}
//                       disabled
//                     />

//                     <InputBox
//                       label="New Password"
//                       type="password"
//                       value={password}
//                       onChange={setPassword}
//                       placeholder="Leave blank to keep current"
//                     />

//                     <InputBox
//                       label="Confirm Password"
//                       type="password"
//                       value={confirmPassword}
//                       onChange={setConfirmPassword}
//                       placeholder="Confirm new password"
//                     />

//                   </div>

//                   <div className="flex justify-end">

//                     <PrimaryButton
//                       onClick={
//                         handleProfileSave
//                       }
//                       disabled={saving}
//                     >
//                       <Save size={16} />

//                       Save Profile
//                     </PrimaryButton>

//                   </div>

//                 </div>
//               )}

//               {/* ============================================
//                   PRICING
//               ============================================ */}

//               {activeTab === "pricing" && (
//                 <div className="space-y-8">

//                   {/* Heading */}

//                   <div>
//                     <h3 className="text-xl font-semibold text-[#464243]">
//                       Mi Profile Pricing
//                     </h3>

//                     <p className="text-[#464243]/70 mt-1 text-sm">
//                       Set pricing rules for purchasing
//                       cards and withdrawal requests
//                     </p>
//                   </div>

//                   {/* Pricing fields */}

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//                     {/* Price per card */}

//                     <InputBox
//                       label="Price per card (₹)"
//                       type="number"
//                       value={cardAmount}
//                       onChange={setCardAmount}
//                       min="1"
//                       step="0.01"
//                       placeholder="1199"
//                     />

//                     {/* Minimum cards */}

//                     <InputBox
//                       label="Minimum cards per purchase"
//                       type="number"
//                       value={minCard}
//                       onChange={setMinCard}
//                       min="1"
//                       step="1"
//                       placeholder="1"
//                     />

//                     {/* Minimum withdrawal */}

//                     <InputBox
//                       label="Minimum withdrawal amount (₹)"
//                       type="number"
//                       value={minimumWithdrawal}
//                       onChange={setMinimumWithdrawal}
//                       min="1"
//                       step="1"
//                       placeholder="1000"
//                     />

//                   </div>

//                   {/* Withdrawal information */}

//                   <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">

//                     <div className="flex items-start gap-3">

//                       <div className="w-9 h-9 rounded-lg bg-orange-100 flex items-center justify-center shrink-0">
//                         <IndianRupee
//                           size={18}
//                           className="text-[#fe7f2d]"
//                         />
//                       </div>

//                       <div>

//                         <p className="font-semibold text-[#464243]">
//                           Minimum Withdrawal
//                         </p>

//                         <p className="text-sm text-[#464243]/70 mt-1">
//                           Affiliates must have at least{" "}
//                           <span className="font-semibold text-[#fe7f2d]">
//                             ₹
//                             {Number(
//                               minimumWithdrawal || 0
//                             ).toLocaleString(
//                               "en-IN"
//                             )}
//                           </span>{" "}
//                           available before they can
//                           request a withdrawal.
//                         </p>

//                       </div>

//                     </div>

//                   </div>

//                   {/* Save */}

//                   <div className="flex justify-end">

//                     <PrimaryButton
//                       onClick={
//                         handleSavePricing
//                       }
//                       disabled={saving}
//                     >
//                       <Save size={16} />

//                       Save Pricing
//                     </PrimaryButton>

//                   </div>

//                 </div>
//               )}

//               {/* ============================================
//                   COUPONS
//               ============================================ */}

//               {activeTab === "coupons" && (
//                 <div className="space-y-8">

//                   <div>
//                     <h3 className="text-xl font-semibold text-[#464243]">
//                       Coupon Management
//                     </h3>

//                     <p className="text-[#464243]/70 mt-1 text-sm">
//                       Create percentage or fixed amount
//                       coupons for card purchases
//                     </p>
//                   </div>

//                   {/* Coupon form */}

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">

//                     <InputBox
//                       label="Coupon Name"
//                       value={couponName}
//                       onChange={setCouponName}
//                       placeholder="Welcome Offer"
//                     />

//                     <InputBox
//                       label="Coupon Code"
//                       value={couponCode}
//                       onChange={(value) =>
//                         setCouponCode(
//                           value.toUpperCase()
//                         )
//                       }
//                       placeholder="WELCOME10"
//                     />

//                     <div className="space-y-1.5">

//                       <label className="text-sm font-medium text-[#464243]">
//                         Coupon Type
//                       </label>

//                       <select
//                         value={couponType}
//                         onChange={(e) =>
//                           setCouponType(
//                             e.target.value
//                           )
//                         }
//                         className="input focus:ring-[#007979] focus:border-[#007979]/50"
//                       >
//                         <option value="percentage">
//                           Percentage (%)
//                         </option>

//                         <option value="flat">
//                           Fixed Amount (₹)
//                         </option>
//                       </select>

//                     </div>

//                     <InputBox
//                       label="Discount"
//                       type="number"
//                       value={couponValue}
//                       onChange={setCouponValue}
//                       placeholder={
//                         couponType ===
//                         "percentage"
//                           ? "10"
//                           : "100"
//                       }
//                       min="1"
//                     />

//                   </div>

//                   {/* Dates */}

//                   <div className="flex flex-col sm:flex-row gap-3">

//                     <div className="flex-1">

//                       <label className="block text-sm font-medium text-[#464243] mb-1.5">
//                         Start Date
//                       </label>

//                       <input
//                         type="date"
//                         value={startDate}
//                         onChange={(e) =>
//                           setStartDate(
//                             e.target.value
//                           )
//                         }
//                         className="input h-10 text-sm"
//                       />

//                     </div>

//                     <div className="flex-1">

//                       <label className="block text-sm font-medium text-[#464243] mb-1.5">
//                         End Date
//                       </label>

//                       <input
//                         type="date"
//                         value={endDate}
//                         onChange={(e) =>
//                           setEndDate(
//                             e.target.value
//                           )
//                         }
//                         className="input h-10 text-sm"
//                       />

//                     </div>

//                   </div>

//                   {/* Create */}

//                   <div className="flex justify-end">

//                     <PrimaryButton
//                       onClick={
//                         handleCreateCoupon
//                       }
//                       disabled={saving}
//                     >
//                       <Save size={16} />

//                       Create Coupon
//                     </PrimaryButton>

//                   </div>

//                   {/* Existing coupons */}

//                   <div className="border-t border-[#E8EDF2] pt-6">

//                     <h4 className="font-semibold text-[#464243] mb-4">
//                       Existing Coupons
//                     </h4>

//                     <div className="overflow-x-auto">

//                       <table className="w-full text-sm border border-[#E8EDF2] rounded-xl overflow-hidden">

//                         <thead className="bg-[#E8EDF2] text-[#464243]">

//                           <tr>

//                             <th className="p-3 text-left">
//                               Name
//                             </th>

//                             <th className="p-3 text-left">
//                               Code
//                             </th>

//                             <th className="p-3 text-left">
//                               Type
//                             </th>

//                             <th className="p-3 text-left">
//                               Value
//                             </th>

//                             <th className="p-3 text-left">
//                               Start Date
//                             </th>

//                             <th className="p-3 text-left">
//                               End Date
//                             </th>

//                             <th className="p-3 text-left">
//                               Action
//                             </th>

//                           </tr>

//                         </thead>

//                         <tbody>

//                           {coupons.length === 0 ? (

//                             <tr>

//                               <td
//                                 colSpan="7"
//                                 className="p-5 text-center text-[#464243]/70"
//                               >
//                                 No coupons created
//                               </td>

//                             </tr>

//                           ) : (

//                             coupons.map(
//                               (coupon) => (

//                                 <tr
//                                   key={
//                                     coupon.id
//                                   }
//                                   className="border-t border-[#E8EDF2] text-[#464243]"
//                                 >

//                                   <td className="p-3">
//                                     {
//                                       coupon.name
//                                     }
//                                   </td>

//                                   <td className="p-3 font-semibold">
//                                     {
//                                       coupon.code
//                                     }
//                                   </td>

//                                   <td className="p-3">
//                                     {coupon.type ===
//                                     "percentage"
//                                       ? "Percentage"
//                                       : "Fixed Amount"}
//                                   </td>

//                                   <td className="p-3">
//                                     {coupon.type ===
//                                     "percentage"
//                                       ? `${coupon.value}%`
//                                       : `₹${Number(
//                                           coupon.value
//                                         ).toLocaleString(
//                                           "en-IN"
//                                         )}`}
//                                   </td>

//                                   <td className="p-3">
//                                     {coupon.start_date?.split(
//                                       "T"
//                                     )[0]}
//                                   </td>

//                                   <td className="p-3">
//                                     {coupon.end_date?.split(
//                                       "T"
//                                     )[0]}
//                                   </td>

//                                   <td className="p-3">

//                                     <button
//                                       onClick={() =>
//                                         handleDeleteCoupon(
//                                           coupon.id
//                                         )
//                                       }
//                                       disabled={
//                                         saving
//                                       }
//                                       className="inline-flex items-center gap-1 text-red-600 hover:underline disabled:opacity-50"
//                                     >
//                                       <Trash2
//                                         size={
//                                           15
//                                         }
//                                       />

//                                       Delete
//                                     </button>

//                                   </td>

//                                 </tr>

//                               )
//                             )

//                           )}

//                         </tbody>

//                       </table>

//                     </div>

//                   </div>

//                 </div>
//               )}

//             </div>
//           </div>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// }

// // ======================================================
// // INPUT BOX
// // ======================================================

// function InputBox({
//   label,
//   value,
//   onChange,
//   type = "text",
//   placeholder = "",
//   disabled = false,
//   min,
//   step,
// }) {
//   return (
//     <div className="space-y-1.5">

//       <label className="text-sm font-medium text-[#464243]">
//         {label}
//       </label>

//       <input
//         type={type}
//         value={value}
//         onChange={(e) =>
//           onChange(e.target.value)
//         }
//         className="input text-[#464243] placeholder:text-[#464243]/40 focus:ring-[#007979] focus:border-[#007979]/50 disabled:bg-gray-100 disabled:text-gray-500"
//         placeholder={placeholder}
//         disabled={disabled}
//         min={min}
//         step={step}
//       />

//     </div>
//   );
// }

// // ======================================================
// // PRIMARY BUTTON
// // ======================================================

// function PrimaryButton({
//   children,
//   onClick,
//   disabled,
// }) {
//   return (
//     <button
//       onClick={onClick}
//       disabled={disabled}
//       className="inline-flex items-center justify-center gap-2 px-10 py-2.5 rounded-xl font-medium text-white transition-all shadow-sm disabled:opacity-70"
//       style={{
//         backgroundColor: disabled
//           ? PRIMARY_DARK
//           : PRIMARY,
//       }}
//     >
//       {children}
//     </button>
//   );
// }


import {
  User,
  IndianRupee,
  Save,
  TicketPercent,
  Trash2,
} from "lucide-react";

import { useEffect, useState } from "react";

import AdminLayout from "../../components/layout/AdminLayout";
import { successAlert, errorAlert } from "../../utils/alert";
import { useAuth } from "../../context/AuthContext";

import Loader from "../../components/Loader";
import { setFavicon } from "../../utils/favicon";
import api from "../../services/api";

const PRIMARY = "#fe7f2d";
const PRIMARY_DARK = "#021f26";

export default function Settings() {
  const {
    user: authUser,
    branding: authBranding,
    updateBranding,
  } = useAuth();

  const [activeTab, setActiveTab] = useState("profile");
  const [saving, setSaving] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  // ============================================
  // PROFILE
  // ============================================

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ============================================
  // BRANDING
  // ============================================

  const [brandName, setBrandName] = useState("MI PROFILE");
  const [logoPreview, setLogoPreview] = useState("/logo.jpeg");
  const [faviconPreview, setFaviconPreview] =
    useState("/favicon.ico");

  const [logoFile, setLogoFile] = useState(null);
  const [faviconFile, setFaviconFile] = useState(null);

  // ============================================
  // PRICING
  // ============================================

  const [cardAmount, setCardAmount] = useState("");
  const [minCard, setMinCard] = useState("");
  const [minimumWithdrawal, setMinimumWithdrawal] =
    useState("1000");

  // ============================================
  // COUPONS
  // ============================================

  const [coupons, setCoupons] = useState([]);

  const [couponName, setCouponName] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponType, setCouponType] =
    useState("percentage");
  const [couponValue, setCouponValue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // ============================================
  // TABS
  // ============================================

  const tabs = [
    {
      key: "profile",
      label: "Profile",
      icon: User,
    },
    {
      key: "pricing",
      label: "Card Pricing",
      icon: IndianRupee,
    },
    {
      key: "coupons",
      label: "Coupons",
      icon: TicketPercent,
    },
  ];

  // ============================================
  // INITIAL LOAD
  // ============================================

  useEffect(() => {
    const initSettings = async () => {
      try {
        setPageLoading(true);

        // ========================================
        // PROFILE
        // ========================================

        // Read saved admin name first.
        // This keeps Header and Settings synchronized.
        const savedAdminName =
          localStorage.getItem("admin_name");

        setName(
          savedAdminName ||
            authUser?.name ||
            ""
        );

        setEmail(authUser?.email || "");

        // ========================================
        // BRANDING
        // ========================================

        const savedBranding =
          JSON.parse(
            localStorage.getItem("branding") || "{}"
          ) || {};

        setBrandName(
          savedBranding.brand_name ||
            authBranding?.brand_name ||
            "MI PROFILE"
        );

        setLogoPreview(
          savedBranding.logo ||
            authBranding?.logo ||
            "/logo1new.jpeg"
        );

        setFaviconPreview(
          savedBranding.favicon ||
            authBranding?.favicon ||
            "/favicon.ico"
        );

        if (
          savedBranding.favicon ||
          authBranding?.favicon
        ) {
          setFavicon(
            savedBranding.favicon ||
              authBranding.favicon
          );
        }

        // ========================================
        // FETCH DATA
        // ========================================

        await Promise.all([
          fetchPricing(),
          fetchCoupons(),
          new Promise((resolve) =>
            setTimeout(resolve, 500)
          ),
        ]);
      } finally {
        setPageLoading(false);
      }
    };

    initSettings();
  }, []);

  // ============================================
  // FETCH PRICING
  // ============================================

  const fetchPricing = async () => {
    try {
      const res = await api.get(
        "/orginazation-dashboard/card-pricing"
      );

      if (res.data?.data) {
        const pricing = res.data.data;

        setCardAmount(
          pricing.price_per_card ?? ""
        );

        setMinCard(
          pricing.minimum_cards ?? ""
        );

        setMinimumWithdrawal(
          pricing.minimum_withdrawal ??
            pricing.minimum_withdraw_amount ??
            1000
        );
      }
    } catch (err) {
      console.error(
        "Pricing fetch error:",
        err
      );

      setMinimumWithdrawal("1000");
    }
  };

  // ============================================
  // FETCH COUPONS
  // ============================================

  const fetchCoupons = async () => {
    try {
      const res = await api.get(
        "/orginazation-dashboard/coupons"
      );

      setCoupons(
        res.data?.data || []
      );
    } catch (err) {
      console.error(
        "Coupons fetch error:",
        err
      );
    }
  };

  // ============================================
  // SAVE PRICING
  // ============================================

  const handleSavePricing = async () => {
    if (
      !cardAmount ||
      !minCard ||
      !minimumWithdrawal
    ) {
      errorAlert(
        "Validation Error",
        "All pricing fields are required"
      );
      return;
    }

    const price = Number(cardAmount);
    const minimumCards = Number(minCard);
    const minimumWithdraw = Number(
      minimumWithdrawal
    );

    if (price <= 0) {
      errorAlert(
        "Validation Error",
        "Price per card must be greater than 0"
      );
      return;
    }

    if (minimumCards <= 0) {
      errorAlert(
        "Validation Error",
        "Minimum cards must be greater than 0"
      );
      return;
    }

    if (minimumWithdraw <= 0) {
      errorAlert(
        "Validation Error",
        "Minimum withdrawal amount must be greater than 0"
      );
      return;
    }

    setSaving(true);

    try {
      await api.post(
        "/orginazation-dashboard/card-pricing",
        {
          price_per_card: price,
          minimum_cards: minimumCards,
          minimum_withdrawal: minimumWithdraw,
        }
      );

      // successAlert(
      //   "Saved",
      //   "Card pricing and withdrawal settings updated successfully"
      // );

      await fetchPricing();
    } catch (err) {
      errorAlert(
        "Error",
        err.response?.data?.message ||
          "Failed to update pricing"
      );
    } finally {
      setSaving(false);
    }
  };

  // ============================================
  // CREATE COUPON
  // ============================================

  const handleCreateCoupon = async () => {
    if (
      !couponName.trim() ||
      !couponCode.trim() ||
      !couponValue
    ) {
      errorAlert(
        "Validation Error",
        "All coupon fields are required"
      );
      return;
    }

    if (!startDate || !endDate) {
      errorAlert(
        "Validation Error",
        "Start and expiry date required"
      );
      return;
    }

    if (
      new Date(endDate) <
      new Date(startDate)
    ) {
      errorAlert(
        "Validation Error",
        "Expiry date must be greater than start date"
      );
      return;
    }

    if (
      couponType === "percentage" &&
      Number(couponValue) > 100
    ) {
      errorAlert(
        "Validation Error",
        "Percentage cannot exceed 100%"
      );
      return;
    }

    setSaving(true);

    try {
      await api.post(
        "/orginazation-dashboard/coupons",
        {
          name: couponName.trim(),
          code: couponCode
            .trim()
            .toUpperCase(),
          type: couponType,
          value: Number(couponValue),
          start_date: startDate,
          end_date: endDate,
        }
      );

      // successAlert(
      //   "Success",
      //   "Coupon created successfully"
      // );

      setCouponName("");
      setCouponCode("");
      setCouponType("percentage");
      setCouponValue("");
      setStartDate("");
      setEndDate("");

      await fetchCoupons();
    } catch (err) {
      errorAlert(
        "Error",
        err.response?.data?.message ||
          "Failed to create coupon"
      );
    } finally {
      setSaving(false);
    }
  };

  // ============================================
  // DELETE COUPON
  // ============================================

  const handleDeleteCoupon = async (id) => {
    if (
      !window.confirm(
        "Delete this coupon?"
      )
    ) {
      return;
    }

    setSaving(true);

    try {
      await api.delete(
        `/orginazation-dashboard/coupons/${id}`
      );

      // successAlert(
      //   "Deleted",
      //   "Coupon deleted successfully"
      // );

      await fetchCoupons();
    } catch (err) {
      errorAlert(
        "Error",
        err.response?.data?.message ||
          "Failed to delete coupon"
      );
    } finally {
      setSaving(false);
    }
  };

  // ============================================
  // PROFILE SAVE
  // ============================================

  const handleProfileSave = () => {
    if (saving) return;

    const trimmedName = name.trim();

    // ========================================
    // VALIDATION
    // ========================================

    if (!trimmedName) {
      errorAlert(
        "Validation Error",
        "Admin name is required"
      );
      return;
    }

    if (
      password &&
      password !== confirmPassword
    ) {
      errorAlert(
        "Validation Error",
        "Passwords do not match"
      );
      return;
    }

    setSaving(true);

    // ========================================
    // SAVE ADMIN NAME
    // ========================================

    try {
      /*
       * Save admin name locally.
       *
       * Header.jsx reads this value, so when
       * the admin name changes here, the Header
       * will update automatically.
       */
      localStorage.setItem(
        "admin_name",
        trimmedName
      );

      /*
       * Send a custom event so Header.jsx
       * updates immediately without requiring
       * a page refresh.
       */
      window.dispatchEvent(
        new CustomEvent("adminProfileUpdated", {
          detail: {
            name: trimmedName,
            email: email,
          },
        })
      );

      /*
       * If your backend profile update API is
       * available later, you can replace/add
       * the API call here.
       */

      setPassword("");
      setConfirmPassword("");

      // successAlert(
      //   "Profile Updated",
      //   "Admin profile updated successfully"
      // );
    } catch (error) {
      console.error(
        "Profile update error:",
        error
      );

      errorAlert(
        "Error",
        "Failed to update profile"
      );
    } finally {
      setTimeout(() => {
        setSaving(false);
      }, 500);
    }
  };

  // ============================================
  // BRANDING SAVE
  // ============================================

  const handleSaveBranding = async () => {
    if (!brandName.trim()) {
      errorAlert(
        "Validation Error",
        "Brand name is required"
      );
      return;
    }

    setSaving(true);

    try {
      const formData = new FormData();

      formData.append(
        "brand_name",
        brandName.trim()
      );

      if (logoFile) {
        formData.append(
          "logo",
          logoFile
        );
      }

      if (faviconFile) {
        formData.append(
          "favicon",
          faviconFile
        );
      }

      const res = await api.post(
        "/orginazation-dashboard/branding",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      if (res.data?.success === false) {
        errorAlert(
          "Error",
          res.data.message
        );
        return;
      }

      if (res.data?.data) {
        updateBranding(
          res.data.data
        );

        setLogoPreview(
          res.data.data.logo
        );

        setFaviconPreview(
          res.data.data.favicon
        );

        if (
          res.data.data.favicon
        ) {
          setFavicon(
            res.data.data.favicon
          );
        }

        localStorage.setItem(
          "branding",
          JSON.stringify(
            res.data.data
          )
        );
      }

      // successAlert(
      //   "Success",
      //   "Branding updated successfully"
      // );
    } catch (err) {
      errorAlert(
        "Error",
        err.response?.data?.message ||
          "Failed to update branding"
      );
    } finally {
      setSaving(false);
    }
  };

  // ============================================
  // PAGE LOADING
  // ============================================

  if (pageLoading) {
    return (
      <AdminLayout>
        <Loader
          show={pageLoading}
          text="Loading settings..."
        />
      </AdminLayout>
    );
  }

  // ============================================
  // UI
  // ============================================

  return (
    <AdminLayout>
      <Loader
        show={saving}
        text="Saving changes..."
      />

      <div className="p-6 space-y-8">

        {/* HEADER */}
        <div>
          <h2 className="text-2xl font-semibold text-[#464243]">
            Settings
          </h2>

          <p className="text-[#464243]/70 mt-1">
            Manage your account, appearance,
            pricing and coupons
          </p>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* LEFT TABS */}
          <div className="lg:col-span-3">
            <div className="card p-3 space-y-1.5 sticky top-6">

              {tabs.map((tab) => {
                const Icon = tab.icon;

                const isActive =
                  activeTab === tab.key;

                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() =>
                      setActiveTab(tab.key)
                    }
                    className={`
                      w-full flex items-center gap-3
                      px-4 py-3 rounded-xl
                      text-left
                      transition-all duration-200
                      ${
                        isActive
                          ? "bg-[#E8EDF2] text-[#464243] shadow-md font-semibold"
                          : "text-[#464243] hover:bg-[#E8EDF2]"
                      }
                    `}
                  >
                    <Icon size={18} />

                    <span>
                      {tab.label}
                    </span>
                  </button>
                );
              })}

            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="lg:col-span-9">

            <div className="card p-6 md:p-8">

              {/* ======================================
                  PROFILE
              ====================================== */}

              {activeTab === "profile" && (
                <div className="space-y-8">

                  <div>
                    <h3 className="text-xl font-semibold text-[#464243]">
                      Profile Settings
                    </h3>

                    <p className="text-[#464243]/70 mt-1 text-sm">
                      Update your personal information
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <InputBox
                      label="Admin Name"
                      value={name}
                      onChange={setName}
                    />

                    <InputBox
                      label="Email Address"
                      type="email"
                      value={email}
                      onChange={setEmail}
                      disabled
                    />

                    <InputBox
                      label="New Password"
                      type="password"
                      value={password}
                      onChange={setPassword}
                      placeholder="Leave blank to keep current"
                    />

                    <InputBox
                      label="Confirm Password"
                      type="password"
                      value={confirmPassword}
                      onChange={setConfirmPassword}
                      placeholder="Confirm new password"
                    />

                  </div>

                  <div className="flex justify-end">

                    <PrimaryButton
                      onClick={
                        handleProfileSave
                      }
                      disabled={saving}
                    >
                      <Save size={16} />

                      Save Profile
                    </PrimaryButton>

                  </div>

                </div>
              )}

              {/* ======================================
                  PRICING
              ====================================== */}

              {activeTab === "pricing" && (
                <div className="space-y-8">

                  <div>
                    <h3 className="text-xl font-semibold text-[#464243]">
                      Mi Profile Pricing
                    </h3>

                    <p className="text-[#464243]/70 mt-1 text-sm">
                      Set pricing rules for purchasing
                      cards and withdrawal requests
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <InputBox
                      label="Price per card (₹)"
                      type="number"
                      value={cardAmount}
                      onChange={setCardAmount}
                      min="1"
                      step="0.01"
                      placeholder="1199"
                    />

                    <InputBox
                      label="Minimum cards per purchase"
                      type="number"
                      value={minCard}
                      onChange={setMinCard}
                      min="1"
                      step="1"
                      placeholder="1"
                    />

                    <InputBox
                      label="Minimum withdrawal amount (₹)"
                      type="number"
                      value={minimumWithdrawal}
                      onChange={setMinimumWithdrawal}
                      min="1"
                      step="1"
                      placeholder="1000"
                    />

                  </div>

                  <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">

                    <div className="flex items-start gap-3">

                      <div className="w-9 h-9 rounded-lg bg-orange-100 flex items-center justify-center shrink-0">

                        <IndianRupee
                          size={18}
                          className="text-[#fe7f2d]"
                        />

                      </div>

                      <div>

                        <p className="font-semibold text-[#464243]">
                          Minimum Withdrawal
                        </p>

                        <p className="text-sm text-[#464243]/70 mt-1">
                          Affiliates must have at least{" "}
                          <span className="font-semibold text-[#fe7f2d]">
                            ₹
                            {Number(
                              minimumWithdrawal || 0
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </span>{" "}
                          available before they can
                          request a withdrawal.
                        </p>

                      </div>

                    </div>

                  </div>

                  <div className="flex justify-end">

                    <PrimaryButton
                      onClick={
                        handleSavePricing
                      }
                      disabled={saving}
                    >
                      <Save size={16} />

                      Save Pricing
                    </PrimaryButton>

                  </div>

                </div>
              )}

              {/* ======================================
                  COUPONS
              ====================================== */}

              {activeTab === "coupons" && (
                <div className="space-y-8">

                  <div>
                    <h3 className="text-xl font-semibold text-[#464243]">
                      Coupon Management
                    </h3>

                    <p className="text-[#464243]/70 mt-1 text-sm">
                      Create percentage or fixed amount
                      coupons for card purchases
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">

                    <InputBox
                      label="Coupon Name"
                      value={couponName}
                      onChange={setCouponName}
                      placeholder="Welcome Offer"
                    />

                    <InputBox
                      label="Coupon Code"
                      value={couponCode}
                      onChange={(value) =>
                        setCouponCode(
                          value.toUpperCase()
                        )
                      }
                      placeholder="WELCOME10"
                    />

                    <div className="space-y-1.5">

                      <label className="text-sm font-medium text-[#464243]">
                        Coupon Type
                      </label>

                      <select
                        value={couponType}
                        onChange={(e) =>
                          setCouponType(
                            e.target.value
                          )
                        }
                        className="input focus:ring-[#007979] focus:border-[#007979]/50"
                      >
                        <option value="percentage">
                          Percentage (%)
                        </option>

                        <option value="flat">
                          Fixed Amount (₹)
                        </option>
                      </select>

                    </div>

                    <InputBox
                      label="Discount"
                      type="number"
                      value={couponValue}
                      onChange={setCouponValue}
                      placeholder={
                        couponType === "percentage"
                          ? "10"
                          : "100"
                      }
                      min="1"
                    />

                  </div>

                  {/* DATES */}

                  <div className="flex flex-col sm:flex-row gap-3">

                    <div className="flex-1">

                      <label className="block text-sm font-medium text-[#464243] mb-1.5">
                        Start Date
                      </label>

                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) =>
                          setStartDate(
                            e.target.value
                          )
                        }
                        className="input h-10 text-sm"
                      />

                    </div>

                    <div className="flex-1">

                      <label className="block text-sm font-medium text-[#464243] mb-1.5">
                        End Date
                      </label>

                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) =>
                          setEndDate(
                            e.target.value
                          )
                        }
                        className="input h-10 text-sm"
                      />

                    </div>

                  </div>

                  {/* CREATE */}

                  <div className="flex justify-end">

                    <PrimaryButton
                      onClick={
                        handleCreateCoupon
                      }
                      disabled={saving}
                    >
                      <Save size={16} />

                      Create Coupon
                    </PrimaryButton>

                  </div>

                  {/* EXISTING COUPONS */}

                  <div className="border-t border-[#E8EDF2] pt-6">

                    <h4 className="font-semibold text-[#464243] mb-4">
                      Existing Coupons
                    </h4>

                    <div className="overflow-x-auto">

                      <table className="w-full text-sm border border-[#E8EDF2] rounded-xl overflow-hidden">

                        <thead className="bg-[#E8EDF2] text-[#464243]">

                          <tr>
                            <th className="p-3 text-left">
                              Name
                            </th>

                            <th className="p-3 text-left">
                              Code
                            </th>

                            <th className="p-3 text-left">
                              Type
                            </th>

                            <th className="p-3 text-left">
                              Value
                            </th>

                            <th className="p-3 text-left">
                              Start Date
                            </th>

                            <th className="p-3 text-left">
                              End Date
                            </th>

                            <th className="p-3 text-left">
                              Action
                            </th>
                          </tr>

                        </thead>

                        <tbody>

                          {coupons.length === 0 ? (
                            <tr>

                              <td
                                colSpan="7"
                                className="p-5 text-center text-[#464243]/70"
                              >
                                No coupons created
                              </td>

                            </tr>
                          ) : (
                            coupons.map(
                              (coupon) => (
                                <tr
                                  key={coupon.id}
                                  className="border-t border-[#E8EDF2] text-[#464243]"
                                >

                                  <td className="p-3">
                                    {coupon.name}
                                  </td>

                                  <td className="p-3 font-semibold">
                                    {coupon.code}
                                  </td>

                                  <td className="p-3">
                                    {coupon.type ===
                                    "percentage"
                                      ? "Percentage"
                                      : "Fixed Amount"}
                                  </td>

                                  <td className="p-3">
                                    {coupon.type ===
                                    "percentage"
                                      ? `${coupon.value}%`
                                      : `₹${Number(
                                          coupon.value
                                        ).toLocaleString(
                                          "en-IN"
                                        )}`}
                                  </td>

                                  <td className="p-3">
                                    {coupon.start_date?.split(
                                      "T"
                                    )[0]}
                                  </td>

                                  <td className="p-3">
                                    {coupon.end_date?.split(
                                      "T"
                                    )[0]}
                                  </td>

                                  <td className="p-3">

                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleDeleteCoupon(
                                          coupon.id
                                        )
                                      }
                                      disabled={saving}
                                      className="inline-flex items-center gap-1 text-red-600 hover:underline disabled:opacity-50"
                                    >
                                      <Trash2
                                        size={15}
                                      />

                                      Delete
                                    </button>

                                  </td>

                                </tr>
                              )
                            )
                          )}

                        </tbody>

                      </table>

                    </div>

                  </div>

                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </AdminLayout>
  );
}

// ======================================================
// INPUT BOX
// ======================================================

function InputBox({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  disabled = false,
  min,
  step,
}) {
  return (
    <div className="space-y-1.5">

      <label className="text-sm font-medium text-[#464243]">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="input text-[#464243] placeholder:text-[#464243]/40 focus:ring-[#007979] focus:border-[#007979]/50 disabled:bg-gray-100 disabled:text-gray-500"
        placeholder={placeholder}
        disabled={disabled}
        min={min}
        step={step}
      />

    </div>
  );
}

// ======================================================
// PRIMARY BUTTON
// ======================================================

function PrimaryButton({
  children,
  onClick,
  disabled,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center justify-center gap-2 px-10 py-2.5 rounded-xl font-medium text-white transition-all shadow-sm disabled:opacity-70"
      style={{
        backgroundColor: disabled
          ? PRIMARY_DARK
          : PRIMARY,
      }}
    >
      {children}
    </button>
  );
}