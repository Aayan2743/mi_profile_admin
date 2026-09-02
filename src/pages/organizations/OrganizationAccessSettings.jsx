// // src/pages/organizations/OrganizationAccessSettings.jsx
// import { useState, useEffect } from "react";
// import {
//   ArrowLeft,
//   Layers,
//   Image,
//   Palette,
//   ShieldCheck,
//   Crown,
// } from "lucide-react";
// import AdminLayout from "../../components/layout/AdminLayout";
// import { useNavigate, useParams } from "react-router-dom";
// import api from "../../services/api";

// // ────────────────────────────────────────────────
// //  Mock/static organization data (no API needed)
// // ────────────────────────────────────────────────
// const mockOrg = {
//   id: "1",
//   name: "Career Mentorz",
//   email: "contact@careermentorz.com",
//   phone: "+91 98765 43210",
//   logo: "/logo.jpeg",
//   cover: "https://images.unsplash.com/photo-1557683316-973673baf926?w=1600",
// };

// export default function OrganizationAccessSettings() {
//   const navigate = useNavigate();
//   const { orgid } = useParams(); // just for URL, not real fetch

//   // const [org] = useState(mockOrg);

//   const [org, setOrg] = useState(null);

//   /* ---------------- ACCESS STATE (mock) ---------------- */
//   const [plan, setPlan] = useState("Pro");

//   // const [features, setFeatures] = useState({
//   //   templates: true,
//   //   communityLogos: false,
//   //   customBranding: true,
//   //   userTemplateCustomization: false,
//   // });

//   const [features, setFeatures] = useState({
//     templates_module: false,
//     community_logos: false,
//     custom_branding: false,
//     template_customization: false,
//   });

//   useEffect(() => {
//     const fetchSettings = async () => {
//       try {
//         const res = await api.get(
//           `/orginazation-dashboard/organization-settings/${orgid}`,
//         );

//         const data = res.data.data;

//         setOrg(data);

//         if (data.features) {
//           setFeatures({
//             templates_module: data.features.templates_module ?? false,
//             community_logos: data.features.community_logos ?? false,
//             custom_branding: data.features.custom_branding ?? false,
//             template_customization:
//               data.features.template_customization ?? false,
//           });
//         }
//       } catch (err) {
//         console.error(err);
//         alert("Failed to load organization settings");
//       }
//     };

//     fetchSettings();
//   }, [orgid]);

//   const toggleFeature = (key) => {
//     setFeatures((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };

//   const saveSettings = async () => {
//     try {
//       await api.put(
//         `/orginazation-dashboard/organization/${orgid}/features`,
//         features,
//       );

//       alert("Organization access settings saved successfully");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save settings");
//     }
//   };

//   // No loading state needed anymore — data is static
//   return (
//     <AdminLayout>
//       {/* BACK */}
//       <button
//         onClick={() => navigate(-1)}
//         className="flex items-center gap-2 text-gray-600 mb-4 hover:text-indigo-600"
//       >
//         <ArrowLeft size={18} />
//         Back to Organization
//       </button>

//       {/* HERO / ORG HEADER */}
//       <div className="relative mb-24">
//         <img
//           src={org?.cover || "/assets/coverPic.jpg"}
//           className="w-full h-56 object-cover rounded-2xl"
//           alt="Cover"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl" />

//         <div className="absolute left-6 -bottom-16 bg-white rounded-2xl shadow-xl p-5 flex items-center gap-4">
//           <img
//             src={org?.logo || "/assets/logo.jpeg"}
//             className="w-20 h-20 rounded-xl border object-cover"
//             alt="Logo"
//           />
//           <div>
//             <h2 className="text-2xl font-bold">{org?.name || "N/A"}</h2>
//             <p className="text-sm text-gray-500">{org?.email || "N/A"}</p>
//             <p className="text-sm text-gray-500">{org?.phone || "N/A"}</p>
//           </div>
//         </div>
//       </div>

//       {/* PAGE TITLE */}
//       <h3 className="text-xl font-semibold mb-6">Access & Feature Settings</h3>

//       {/* FEATURE ACCESS */}
//       <section className="mb-14">
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h4 className="text-2xl font-semibold text-gray-900">
//               Feature Access
//             </h4>
//             <p className="text-sm text-gray-500 mt-1">
//               Enable or disable modules for this organization (mock mode)
//             </p>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
//           <FeatureCardPremium
//             icon={<Layers size={22} />}
//             title="Templates Module"
//             desc="Access to card & page templates"
//             enabled={features.templates_module}
//             onToggle={() => toggleFeature("templates_module")}
//           />

//           <FeatureCardPremium
//             icon={<Image size={22} />}
//             title="Community Logos"
//             desc="Use shared logos from community"
//             enabled={features.community_logos}
//             onToggle={() => toggleFeature("community_logos")}
//           />

//           <FeatureCardPremium
//             icon={<Palette size={22} />}
//             title="Custom Branding"
//             desc="Upload logo, colors & brand assets"
//             enabled={features.custom_branding}
//             onToggle={() => toggleFeature("custom_branding")}
//           />
//         </div>
//       </section>

//       {/* USER PERMISSIONS */}
//       <section className="mb-16">
//         <div className="mb-6">
//           <h4 className="text-2xl font-semibold text-gray-900">
//             User Permissions
//           </h4>
//           <p className="text-sm text-gray-500 mt-1">
//             Control what organization users are allowed to do
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <FeatureCardPremium
//             icon={<ShieldCheck size={22} />}
//             title="Template Customization"
//             desc="Allow users to customize templates"
//             enabled={features.template_customization}
//             onToggle={() => toggleFeature("template_customization")}
//             important
//           />
//         </div>
//       </section>

//       {/* SAVE */}
//       <div className="flex justify-end">
//         <button
//           onClick={saveSettings}
//           className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl shadow-lg transition"
//         >
//           Save Settings
//         </button>
//       </div>
//     </AdminLayout>
//   );
// }

// /* ──────────────────────────────
//    Feature Toggle (unchanged)
// ─────────────────────────────── */
// function FeatureToggle({ icon, title, desc, enabled, onToggle }) {
//   return (
//     <div className="flex items-center justify-between py-4 border-b last:border-b-0">
//       <div className="flex items-start gap-3">
//         <div className="mt-1 text-indigo-600">{icon}</div>
//         <div>
//           <p className="font-medium">{title}</p>
//           <p className="text-sm text-gray-500">{desc}</p>
//         </div>
//       </div>

//       <button
//         onClick={onToggle}
//         className={`w-12 h-6 rounded-full flex items-center px-1 transition ${
//           enabled ? "bg-indigo-600" : "bg-gray-300"
//         }`}
//       >
//         <span
//           className={`w-4 h-4 bg-white rounded-full transition transform ${
//             enabled ? "translate-x-6" : ""
//           }`}
//         />
//       </button>
//     </div>
//   );
// }

// /* ──────────────────────────────
//    Feature Card Premium (unchanged)
// ─────────────────────────────── */
// function FeatureCardPremium({
//   icon,
//   title,
//   desc,
//   enabled,
//   onToggle,
//   important = false,
// }) {
//   return (
//     <div
//       className={`rounded-2xl border bg-white p-6 transition-all duration-300
//       ${enabled ? "border-indigo-200 shadow-lg" : "border-gray-200 shadow-sm"}
//       hover:shadow-xl`}
//     >
//       <div className="flex items-start justify-between gap-4">
//         {/* LEFT CONTENT */}
//         <div className="flex gap-4">
//           {/* ICON */}
//           <div
//             className={`w-12 h-12 rounded-xl flex items-center justify-center
//             ${
//               enabled
//                 ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-md"
//                 : "bg-gray-100 text-gray-500"
//             }`}
//           >
//             {icon}
//           </div>

//           {/* TEXT */}
//           <div>
//             <div className="flex items-center gap-2">
//               <h5 className="text-base font-semibold text-gray-900">{title}</h5>

//               <span
//                 className={`text-xs font-medium px-2.5 py-0.5 rounded-full
//                 ${
//                   enabled
//                     ? "bg-green-100 text-green-700"
//                     : "bg-gray-100 text-gray-500"
//                 }`}
//               >
//                 {enabled ? "Enabled" : "Disabled"}
//               </span>
//             </div>

//             <p className="text-sm text-gray-500 mt-1 max-w-xs">{desc}</p>

//             {important && (
//               <span className="inline-block mt-3 text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
//                 Permission Control
//               </span>
//             )}
//           </div>
//         </div>

//         {/* TOGGLE */}
//         <button
//           onClick={onToggle}
//           className={`relative w-12 h-6 rounded-full transition-colors duration-300
//           focus:outline-none
//           ${enabled ? "bg-indigo-600" : "bg-gray-300"}`}
//         >
//           <span
//             className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow
//             transition-transform duration-300
//             ${enabled ? "translate-x-6" : ""}`}
//           />
//         </button>
//       </div>
//     </div>
//   );
// }

// // src/pages/organizations/OrganizationAccessSettings.jsx
// import { useState, useEffect } from "react";
// import {
//   ArrowLeft,
//   Layers,
//   Image,
//   Palette,
//   ShieldCheck,
//   Crown,
// } from "lucide-react";
// import AdminLayout from "../../components/layout/AdminLayout";
// import { useNavigate, useParams } from "react-router-dom";
// import api from "../../services/api";
// import { successAlert, errorAlert } from "../../utils/alert";

// // ────────────────────────────────────────────────
// // Mock/static organization data (fallback)
// // ────────────────────────────────────────────────
// const mockOrg = {
//   id: "1",
//   name: "Career Mentorz",
//   email: "contact@careermentorz.com",
//   phone: "+91 98765 43210",
//   logo: "/logo.jpeg",
//   cover: "https://images.unsplash.com/photo-1557683316-973673baf926?w=1600",
// };

// export default function OrganizationAccessSettings() {
//   const navigate = useNavigate();
//   const { orgid } = useParams();

//   const [org, setOrg] = useState(null);

//   const [plan, setPlan] = useState("Pro");

//   const [features, setFeatures] = useState({
//     templates_module: false,
//     community_logos: false,
//     custom_branding: false,
//     template_customization: false,
//   });

//   useEffect(() => {
//     const fetchSettings = async () => {
//       try {
//         const res = await api.get(
//           `/orginazation-dashboard/organization-settings/${orgid}`,
//         );

//         const data = res.data.data;

//         setOrg(data);

//         if (data.features) {
//           setFeatures({
//             templates_module: data.features.templates_module ?? false,
//             community_logos: data.features.community_logos ?? false,
//             custom_branding: data.features.custom_branding ?? false,
//             template_customization:
//               data.features.template_customization ?? false,
//           });
//         }
//       } catch (err) {
//         console.error("Failed to load settings:", err);
//         // Fallback to mock if API fails
//         setOrg(mockOrg);
//       }
//     };

//     fetchSettings();
//   }, [orgid]);

//   const toggleFeature = (key) => {
//     setFeatures((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };

//   const saveSettings = async () => {
//     try {
//       await api.put(
//         `/orginazation-dashboard/organization/${orgid}/features`,
//         features,
//       );

//       successAlert("Success", "Organization access settings saved");
//     } catch (err) {
//       console.error(err);
//       errorAlert("Error", "Failed to save settings");
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
//         {/* BACK */}
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--accent))] mb-8 transition-colors"
//         >
//           <ArrowLeft size={18} />
//           Back to Organization
//         </button>

//         {/* HERO / ORG HEADER */}
//         <div className="relative mb-16 md:mb-20">
//           <img
//             src={org?.cover || "/assets/coverPic.jpg"}
//             onError={(e) => (e.currentTarget.src = "/assets/coverPic.jpg")}
//             className="w-full h-64 md:h-80 lg:h-96 rounded-2xl object-cover shadow-2xl"
//             alt="Cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent rounded-2xl" />

//           <div className="absolute left-6 md:left-8 -bottom-20 md:-bottom-24 bg-[hsl(var(--card-bg))] rounded-2xl shadow-2xl p-5 md:p-6 flex items-center gap-5 border border-[hsl(var(--border))]">
//             <img
//               src={org?.logo || "/assets/logo.jpeg"}
//               onError={(e) => (e.currentTarget.src = "/assets/logo.jpeg")}
//               className="w-20 h-20 md:w-24 md:h-24 rounded-xl border border-[hsl(var(--border))] object-cover"
//               alt="Logo"
//             />
//             <div>
//               <h2 className="text-2xl md:text-3xl font-bold text-[hsl(var(--text-primary))]">
//                 {org?.name || "N/A"}
//               </h2>
//               <p className="text-sm text-[hsl(var(--text-muted))] mt-1">
//                 {org?.email || "N/A"}
//               </p>
//               <p className="text-sm text-[hsl(var(--text-muted))]">
//                 {org?.phone || "N/A"}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* PAGE TITLE */}
//         <br />
//         <h3 className="text-2xl md:text-3xl font-bold text-[hsl(var(--text-primary))] mb-8">
//           Access & Feature Settings
//         </h3>

//         {/* FEATURE ACCESS */}
//         <section className="mb-16">
//           <div className="flex items-center justify-between mb-8">
//             <div>
//               <h4 className="text-2xl font-bold text-[hsl(var(--text-primary))]">
//                 Feature Access
//               </h4>
//               <p className="text-sm text-[hsl(var(--text-muted))] mt-1">
//                 Enable or disable modules for this organization
//               </p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             <FeatureCardPremium
//               icon={<Layers size={22} />}
//               title="Templates Module"
//               desc="Access to card & page templates"
//               enabled={features.templates_module}
//               onToggle={() => toggleFeature("templates_module")}
//             />

//             <FeatureCardPremium
//               icon={<Image size={22} />}
//               title="Community Logos"
//               desc="Use shared logos from community"
//               enabled={features.community_logos}
//               onToggle={() => toggleFeature("community_logos")}
//             />

//             <FeatureCardPremium
//               icon={<Palette size={22} />}
//               title="Custom Branding"
//               desc="Upload logo, colors & brand assets"
//               enabled={features.custom_branding}
//               onToggle={() => toggleFeature("custom_branding")}
//             />
//           </div>
//         </section>

//         {/* USER PERMISSIONS */}
//         <section className="mb-16">
//           <div className="mb-8">
//             <h4 className="text-2xl font-bold text-[hsl(var(--text-primary))]">
//               User Permissions
//             </h4>
//             <p className="text-sm text-[hsl(var(--text-muted))] mt-1">
//               Control what organization users are allowed to do
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <FeatureCardPremium
//               icon={<ShieldCheck size={22} />}
//               title="Template Customization"
//               desc="Allow users to customize templates"
//               enabled={features.template_customization}
//               onToggle={() => toggleFeature("template_customization")}
//               important
//             />
//           </div>
//         </section>

//         {/* SAVE */}
//         <div className="flex justify-end">
//           <button
//             onClick={saveSettings}
//             className="px-8 py-3.5 rounded-xl bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-dark))] text-white dark:text-[#007979] font-semibold shadow-lg transition-all active:scale-[0.98]"
//           >
//             Save Settings
//           </button>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// }

// /* ──────────────────────────────
//    Feature Card Premium (improved light mode)
// ─────────────────────────────── */
// function FeatureCardPremium({
//   icon,
//   title,
//   desc,
//   enabled,
//   onToggle,
//   important = false,
// }) {
//   return (
//     <div
//       className={`rounded-2xl border p-6 transition-all duration-300
//       ${
//         enabled
//           ? "border-[hsl(var(--accent)/0.4)] bg-[hsl(var(--accent)/0.08)] shadow-lg"
//           : "border-[hsl(var(--border))] bg-[hsl(var(--card-bg))] shadow-sm"
//       }
//       hover:shadow-xl hover:scale-[1.02]`}
//     >
//       <div className="flex items-start justify-between gap-4">
//         {/* LEFT CONTENT */}
//         <div className="flex gap-5">
//           {/* Icon */}
//           <div
//             className={`w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-md
//             ${
//               enabled
//                 ? "bg-gradient-to-br from-[hsl(var(--accent))] to-[hsl(var(--accent-dark))]"
//                 : "bg-[hsl(var(--bg-secondary))] text-[hsl(var(--text-muted))]"
//             }`}
//           >
//             {icon}
//           </div>

//           {/* Text */}
//           <div>
//             <div className="flex items-center gap-3">
//               <h5 className="text-lg font-semibold text-[hsl(var(--text-primary))]">
//                 {title}
//               </h5>

//               {/* Status Badge - improved contrast in light mode */}
//               <span
//                 className={`text-xs font-medium px-3 py-1 rounded-full border
//                 ${
//                   enabled
//                     ? "bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-900/40 dark:text-emerald-400 dark:border-emerald-700/30"
//                     : "bg-gray-100 text-gray-600 border-gray-300 dark:bg-gray-800/40 dark:text-gray-400 dark:border-gray-700/30"
//                 }`}
//               >
//                 {enabled ? "Enabled" : "Disabled"}
//               </span>
//             </div>

//             <p className="text-sm text-[hsl(var(--text-muted))] mt-2 max-w-md">
//               {desc}
//             </p>

//             {important && (
//               <span
//                 className="inline-block mt-3 text-xs font-medium text-[hsl(var(--accent))] 
//                              bg-[hsl(var(--accent)/0.15)] px-3 py-1 rounded-full"
//               >
//                 Permission Control
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Toggle Switch - improved light mode visibility */}
//         <button
//           onClick={onToggle}
//           className={`relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent)/0.3)]
//           ${enabled ? "bg-[hsl(var(--accent))]" : "bg-gray-300 dark:bg-[hsl(var(--border))]"}`}
//         >
//           <span
//             className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300
//             ${enabled ? "translate-x-7" : ""}`}
//           />
//         </button>
//       </div>
//     </div>
//   );
// }
//divya 

// src/pages/organizations/OrganizationAccessSettings.jsx
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Layers,
  Image,
  Palette,
  ShieldCheck,
} from "lucide-react";
import Loader from "../../components/Loader";
import AdminLayout from "../../components/layout/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import { successAlert, errorAlert } from "../../utils/alert";

const mockOrg = {
  id: "1",
  name: "Career Mentorz",
  email: "contact@careermentorz.com",
  phone: "+91 98765 43210",
  logo: "/logo.jpeg",
  cover: "https://images.unsplash.com/photo-1557683316-973673baf926?w=1600",
};

export default function OrganizationAccessSettings() {
  const navigate = useNavigate();
  const { orgid } = useParams();

  const [org, setOrg] = useState(null);
  const [plan, setPlan] = useState("Pro");
const [loading, setLoading] = useState(false);
  const [features, setFeatures] = useState({
    templates_module: false,
    community_logos: false,
    custom_branding: false,
    template_customization: false,
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get(
          `/orginazation-dashboard/organization-settings/${orgid}`
        );

        const data = res.data.data;
        setOrg(data);

        if (data.features) {
          setFeatures({
            templates_module: data.features.templates_module ?? false,
            community_logos: data.features.community_logos ?? false,
            custom_branding: data.features.custom_branding ?? false,
            template_customization:
              data.features.template_customization ?? false,
          });
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
        setOrg(mockOrg);
      }
    };

    fetchSettings();
  }, [orgid]);

  const toggleFeature = (key) => {
    setFeatures((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const saveSettings = async () => {
      if (loading) return;

  setLoading(true);
    try {
      await api.put(
        `/orginazation-dashboard/organization/${orgid}/features`,
        features
      );
   await new Promise((resolve) => setTimeout(resolve, 2000));

      // successAlert("Success", "Organization access settings saved");
    } catch (err) {
      console.error(err);
      errorAlert("Error", "Failed to save settings");
    }
  };

  return (
    <AdminLayout>
      <div className="w-full max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 pb-24 lg:pb-12 overflow-x-hidden">
        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--accent))] mb-6 sm:mb-8 transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="text-sm sm:text-base">Back to Organization</span>
        </button>

        {/* HERO / ORG HEADER */}
        <div className="relative mb-24 sm:mb-16 md:mb-20">
          {/* <img
            src={org?.cover || "/assets/coverPic.jpg"}
            onError={(e) => (e.currentTarget.src = "/assets/coverPic.jpg")}
            className="w-full h-44 sm:h-64 md:h-80 lg:h-96 rounded-2xl object-cover shadow-2xl"
            alt="Cover"
          /> */}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent rounded-2xl" />

          <div className="absolute left-4 right-4 sm:right-auto sm:left-6 md:left-8 -bottom-20 md:-bottom-24 bg-[hsl(var(--card-bg))] rounded-2xl shadow-2xl p-4 md:p-6 flex items-center gap-4 md:gap-6 border border-[hsl(var(--border))]">
            {/* <img
              src={org?.logo || "/assets/logo.jpeg"}
              onError={(e) => (e.currentTarget.src = "/assets/logo.jpeg")}
              className="w-16 h-16 md:w-24 md:h-24 rounded-xl border border-[hsl(var(--border))] object-cover shrink-0"
              alt="Logo"
            /> */}

            <div className="min-w-0">
              <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-[hsl(var(--text-primary))] truncate">
                {org?.name || "N/A"}
              </h2>

              <p className="text-xs sm:text-sm text-[hsl(var(--text-muted))] mt-1 break-all">
                {org?.email || "N/A"}
              </p>

              <p className="text-xs sm:text-sm text-[hsl(var(--text-muted))] break-all">
                {org?.phone || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* PAGE TITLE */}
        <h3 className="text-2xl md:text-3xl font-bold text-[hsl(var(--text-primary))] mb-6 sm:mb-8">
          Access & Feature Settings
        </h3>

        {/* FEATURE ACCESS */}
        <section className="mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-3">
            <div>
              <h4 className="text-xl sm:text-2xl font-bold text-[hsl(var(--text-primary))]">
                Feature Access
              </h4>

              <p className="text-sm text-[hsl(var(--text-muted))] mt-1">
                Enable or disable modules for this organization
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <FeatureCardPremium
              icon={<Layers size={22} />}
              title="Templates Module"
              desc="Access to card & page templates"
              enabled={features.templates_module}
              onToggle={() => toggleFeature("templates_module")}
            />

            <FeatureCardPremium
              icon={<Image size={22} />}
              title="Community Logos"
              desc="Use shared logos from community"
              enabled={features.community_logos}
              onToggle={() => toggleFeature("community_logos")}
            />

            <FeatureCardPremium
              icon={<Palette size={22} />}
              title="Custom Branding"
              desc="Upload logo, colors & brand assets"
              enabled={features.custom_branding}
              onToggle={() => toggleFeature("custom_branding")}
            />
          </div>
        </section>

        {/* USER PERMISSIONS */}
        <section className="mb-12 sm:mb-16">
          <div className="mb-6 sm:mb-8">
            <h4 className="text-xl sm:text-2xl font-bold text-[hsl(var(--text-primary))]">
              User Permissions
            </h4>

            <p className="text-sm text-[hsl(var(--text-muted))] mt-1">
              Control what organization users are allowed to do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <FeatureCardPremium
              icon={<ShieldCheck size={22} />}
              title="Template Customization"
              desc="Allow users to customize templates"
              enabled={features.template_customization}
              onToggle={() => toggleFeature("template_customization")}
              important
            />
          </div>
        </section>

        {/* SAVE */}
        <div className="flex justify-end">
          {/* <button
            onClick={saveSettings}
            className="w-full sm:w-auto px-8 py-3 sm:py-3.5 rounded-xl bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-dark))] text-white dark:text-[#007979] font-semibold shadow-lg transition-all active:scale-[0.98]"
          >
            Save Settings
          </button> */}
          <button
  onClick={saveSettings}
  disabled={loading}
  className={`w-full sm:w-auto px-8 py-3 sm:py-3.5 rounded-xl text-white font-semibold shadow-lg transition-all flex items-center justify-center gap-2
    ${
      loading
        ? "bg-[hsl(var(--accent)/0.7)] cursor-not-allowed"
        : "bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-dark))] active:scale-[0.98]"
    }`}
>
  {loading && (
    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
  )}

  {loading ? "Saving..." : "Save Settings"}
</button>
        </div>
      </div>
    </AdminLayout>
  );
}

function FeatureCardPremium({
  icon,
  title,
  desc,
  enabled,
  onToggle,
  important = false,
}) {
  return (
    <div
      className={`rounded-2xl border p-4 sm:p-6 transition-all duration-300
      ${
        enabled
          ? "border-[hsl(var(--accent)/0.4)] bg-[hsl(var(--accent)/0.08)] shadow-lg"
          : "border-[hsl(var(--border))] bg-[hsl(var(--card-bg))] shadow-sm"
      }
      hover:shadow-xl hover:scale-[1.02]`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4 sm:gap-5 min-w-0">
          <div
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-white shadow-md shrink-0
            ${
              enabled
                ? "bg-gradient-to-br from-[hsl(var(--accent))] to-[hsl(var(--accent-dark))]"
                : "bg-[hsl(var(--bg-secondary))] text-[hsl(var(--text-muted))]"
            }`}
          >
            {icon}
          </div>

          <div className="min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <h5 className="text-base sm:text-lg font-semibold text-[hsl(var(--text-primary))] break-words">
                {title}
              </h5>

              <span
                className={`w-fit text-xs font-medium px-3 py-1 rounded-full border
                ${
                  enabled
                    ? "bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-900/40 dark:text-emerald-400 dark:border-emerald-700/30"
                    : "bg-gray-100 text-gray-600 border-gray-300 dark:bg-gray-800/40 dark:text-gray-400 dark:border-gray-700/30"
                }`}
              >
                {enabled ? "Enabled" : "Disabled"}
              </span>
            </div>

            <p className="text-sm text-[hsl(var(--text-muted))] mt-2 max-w-md leading-relaxed">
              {desc}
            </p>

            {important && (
              <span className="inline-block mt-3 text-xs font-medium text-[hsl(var(--accent))] bg-[hsl(var(--accent)/0.15)] px-3 py-1 rounded-full">
                Permission Control
              </span>
            )}
          </div>
        </div>

        <button
          onClick={onToggle}
          className={`relative w-12 sm:w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent)/0.3)] shrink-0
          ${enabled ? "bg-[hsl(var(--accent))]" : "bg-gray-300 dark:bg-[hsl(var(--border))]"}`}
        >
          <span
            className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300
            ${enabled ? "translate-x-5 sm:translate-x-7" : ""}`}
          />
        </button>
      </div>
    </div>
  );
}