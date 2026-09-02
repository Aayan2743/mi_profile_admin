// // src/pages/dashboard/Dashboard.jsx
// import { useState, useEffect } from "react";
// import AdminLayout from "../../components/layout/AdminLayout";
// import Loader from "../../components/Loader";
// import api from "../../services/api";

// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";

// export default function Dashboard() {
//   /* ---------------- STATE ---------------- */

//   const [stats, setStats] = useState({
//     organizations: 0,
//     active_cards: 0,
//     inactive_cards: 0,
//     revenue: 0,
//   });

//   const [chartData, setChartData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [from, setFrom] = useState("");
//   const [to, setTo] = useState("");

//   /* ---------------- FETCH API ---------------- */

//   const fetchDashboard = async () => {
//     try {
//       setLoading(true);

//       const res = await api.get("/orginazation-dashboard/dashboard", {
//         params: {
//           from,
//           to,
//         },
//       });

//       setStats(res.data.data.stats);
//       setChartData(res.data.data.chartData);
//     } catch (err) {
//       console.log("Dashboard error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ---------------- LOAD ON PAGE OPEN ---------------- */

//   useEffect(() => {
//     fetchDashboard();
//   }, []);

//   return (
//     <AdminLayout>
//       {/* Header */}
//       <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
//         <Loader show={loading} text="Loading....." />
//         <div>
//           <h2 className="text-2xl font-bold text-slate-800">Dashboard</h2>
//           <p className="text-slate-500">Overview of your platform</p>
//         </div>

//         {/* Filters */}
//         <div className="flex gap-2 flex-wrap">
//           <input
//             type="date"
//             value={from}
//             onChange={(e) => setFrom(e.target.value)}
//             className="border rounded-lg px-3 py-2 text-sm"
//           />
//           <input
//             type="date"
//             value={to}
//             onChange={(e) => setTo(e.target.value)}
//             className="border rounded-lg px-3 py-2 text-sm"
//           />
//           <button
//             onClick={fetchDashboard}
//             className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition"
//           >
//             Apply
//           </button>
//         </div>
//       </div>

//       {/* KPI Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
//         <Kpi
//           title="Total Organizations"
//           value={stats.organizations}
//           color="from-indigo-500 to-indigo-600"
//         />
//         <Kpi
//           title="Active Cards"
//           value={stats.active_cards}
//           color="from-emerald-500 to-emerald-600"
//         />
//         <Kpi
//           title="Inactive Cards"
//           value={stats.inactive_cards}
//           color="from-purple-500 to-purple-600"
//         />
//         <Kpi
//           title="Revenue"
//           value={`₹${Number(stats.revenue).toLocaleString("en-IN")}`}
//           color="from-pink-500 to-pink-600"
//         />
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
//         {/* Line Chart */}
//         <div className="bg-white rounded-2xl p-5 shadow">
//           <h3 className="font-semibold mb-4">Cards Growth</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip formatter={(value) => value.toLocaleString("en-IN")} />
//               <Line
//                 type="monotone"
//                 dataKey="users"
//                 stroke="#6366f1"
//                 strokeWidth={3}
//                 dot={{ r: 4 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Bar Chart */}
//         <div className="bg-white rounded-2xl p-5 shadow">
//           <h3 className="font-semibold mb-4">Revenue</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip
//                 formatter={(value) => `₹${value.toLocaleString("en-IN")}`}
//               />
//               <Bar dataKey="revenue" fill="#10b981" radius={[8, 8, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// }

// /* KPI */
// function Kpi({ title, value, color }) {
//   return (
//     <div
//       className={`bg-gradient-to-r ${color} rounded-2xl p-5 text-white shadow-lg transform hover:scale-[1.02] transition-transform`}
//     >
//       <p className="text-sm opacity-90">{title}</p>
//       <h3 className="text-3xl font-bold mt-2">{value}</h3>
//     </div>
//   );
// }

// // src/pages/dashboard/Dashboard.jsx
// import { useState, useEffect } from "react";
// import AdminLayout from "../../components/layout/AdminLayout";
// import Loader from "../../components/Loader";
// import api from "../../services/api";

// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";

// export default function Dashboard() {
//   const [stats, setStats] = useState({
//     organizations: 0,
//     active_cards: 0,
//     inactive_cards: 0,
//     revenue: 0,
//   });

//   const [chartData, setChartData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [from, setFrom] = useState("");
//   const [to, setTo] = useState("");

//   const fetchDashboard = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/orginazation-dashboard/dashboard", {
//         params: { from, to },
//       });
//       setStats(res.data.data.stats || {});
//       setChartData(res.data.data.chartData || []);
//     } catch (err) {
//       console.error("Dashboard fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDashboard();
//   }, []);

//   return (
//     <AdminLayout>
//       <Loader show={loading} text="Loading dashboard..." />

//       {/* Header + Filters */}
//       <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-5">
//         <div>
//           <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">
//             Dashboard
//           </h2>
//           <p className="text-slate-600 dark:text-slate-400 mt-1">
//             Overview • {new Date().toLocaleDateString()}
//           </p>
//         </div>

//         <div className="flex flex-wrap gap-3">
//           <input
//             type="date"
//             value={from}
//             onChange={(e) => setFrom(e.target.value)}
//             className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
//           />
//           <input
//             type="date"
//             value={to}
//             onChange={(e) => setTo(e.target.value)}
//             className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
//           />
//           <button
//             onClick={fetchDashboard}
//             className="bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white px-6 py-2.5 rounded-xl font-medium shadow-md transition-all"
//           >
//             Apply Filter
//           </button>
//         </div>
//       </div>

//       {/* KPI Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//         <Kpi
//           title="Total Organizations"
//           value={stats.organizations?.toLocaleString() || "0"}
//           color="from-orange-500 to-orange-600"
//         />
//         <Kpi
//           title="Active Cards"
//           value={stats.active_cards?.toLocaleString() || "0"}
//           color="from-emerald-500 to-emerald-600"
//         />
//         <Kpi
//           title="Inactive Cards"
//           value={stats.inactive_cards?.toLocaleString() || "0"}
//           color="from-rose-500 to-rose-600"
//         />
//         <Kpi
//           title="Revenue"
//           value={`₹${Number(stats.revenue || 0).toLocaleString("en-IN")}`}
//           color="from-indigo-500 to-indigo-600"
//         />
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Line Chart */}
//         <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-800">
//           <h3 className="text-lg font-semibold mb-5 text-slate-900 dark:text-slate-100">
//             Cards Growth
//           </h3>
//           <div className="h-80">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={chartData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
//                 <XAxis dataKey="month" stroke="#9ca3af" />
//                 <YAxis stroke="#9ca3af" />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "#111827",
//                     border: "none",
//                     borderRadius: "12px",
//                     color: "#f3f4f6",
//                   }}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="users"
//                   stroke="#f97316"
//                   strokeWidth={3}
//                   dot={{ r: 5, stroke: "#f97316", strokeWidth: 2, fill: "#fff" }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Bar Chart */}
//         <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-800">
//           <h3 className="text-lg font-semibold mb-5 text-slate-900 dark:text-slate-100">
//             Revenue
//           </h3>
//           <div className="h-80">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={chartData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
//                 <XAxis dataKey="month" stroke="#9ca3af" />
//                 <YAxis stroke="#9ca3af" />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "#111827",
//                     border: "none",
//                     borderRadius: "12px",
//                     color: "#f3f4f6",
//                   }}
//                   formatter={(val) => `₹${val.toLocaleString("en-IN")}`}
//                 />
//                 <Bar dataKey="revenue" fill="#10b981" radius={[8, 8, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// }

// function Kpi({ title, value, color }) {
//   return (
//     <div
//       className={`bg-gradient-to-br ${color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]`}
//     >
//       <p className="text-sm font-medium opacity-90 mb-1">{title}</p>
//       <h3 className="text-3xl md:text-4xl font-bold">{value}</h3>
//     </div>
//   );
// }

// // src/pages/dashboard/Dashboard.jsx
// import { useState, useEffect } from "react";
// import AdminLayout from "../../components/layout/AdminLayout";
// import Loader from "../../components/Loader";
// import api from "../../services/api";

// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";

// export default function Dashboard() {
//   const [stats, setStats] = useState({
//     organizations: 0,
//     active_cards: 0,
//     inactive_cards: 0,
//     revenue: 0,
//   });

//   const [chartData, setChartData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [from, setFrom] = useState("");
//   const [to, setTo] = useState("");

//   const fetchDashboard = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/orginazation-dashboard/dashboard", {
//         params: { from, to },
//       });
//       setStats(res.data.data.stats || {});
//       setChartData(res.data.data.chartData || []);
//     } catch (err) {
//       console.error("Dashboard fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDashboard();
//   }, []);

//   return (
//     <AdminLayout>
//       <Loader show={loading} text="Loading dashboard..." />

//       {/* Header + Date Filters */}
//       <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-5">
//         <div>
//           <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
//             Dashboard
//           </h2>
//           <p className="text-slate-600 dark:text-slate-400 mt-1">
//             Overview • {new Date().toLocaleDateString()}
//           </p>
//         </div>

//         <div className="flex flex-wrap gap-3">
//           <input
//             type="date"
//             value={from}
//             onChange={(e) => setFrom(e.target.value)}
//             className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600
//                        bg-white dark:bg-slate-800
//                        text-slate-900 dark:text-slate-100
//                        focus:ring-2 focus:ring-orange-500 focus:border-orange-500
//                        outline-none transition shadow-sm"
//           />
//           <input
//             type="date"
//             value={to}
//             onChange={(e) => setTo(e.target.value)}
//             className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600
//                        bg-white dark:bg-slate-800
//                        text-slate-900 dark:text-slate-100
//                        focus:ring-2 focus:ring-orange-500 focus:border-orange-500
//                        outline-none transition shadow-sm"
//           />
//           <button
//             onClick={fetchDashboard}
//             className="bg-orange-600 hover:bg-orange-700 active:bg-orange-800
//                        text-white px-6 py-2.5 rounded-xl font-medium
//                        shadow-md transition-all duration-200"
//           >
//             Apply Filter
//           </button>
//         </div>
//       </div>

//       {/* KPI Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//         <Kpi
//           title="Total Organizations"
//           value={stats.organizations?.toLocaleString() || "0"}
//           color="from-orange-500 to-orange-600"
//         />
//         <Kpi
//           title="Active Cards"
//           value={stats.active_cards?.toLocaleString() || "0"}
//           color="from-emerald-500 to-emerald-600"
//         />
//         <Kpi
//           title="Inactive Cards"
//           value={stats.inactive_cards?.toLocaleString() || "0"}
//           color="from-rose-500 to-rose-600"
//         />
//         <Kpi
//           title="Revenue"
//           value={`₹${Number(stats.revenue || 0).toLocaleString("en-IN")}`}
//           color="from-indigo-500 to-indigo-600"
//         />
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Line Chart - Cards Growth */}
//         <div className="bg-white dark:bg-slate-900 rounded-2xl p-6
//                        shadow-lg border border-slate-200 dark:border-slate-800">
//           <h3 className="text-lg font-semibold mb-5 text-slate-900 dark:text-white">
//             Cards Growth
//           </h3>
//           <div className="h-80">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={chartData}>
//                 <CartesianGrid
//                   strokeDasharray="3 3"
//                   stroke="#4b5563"
//                   opacity={0.4}
//                 />
//                 <XAxis
//                   dataKey="month"
//                   stroke="#9ca3af"
//                   tick={{ fill: '#9ca3af' }}
//                 />
//                 <YAxis
//                   stroke="#9ca3af"
//                   tick={{ fill: '#9ca3af' }}
//                 />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "#111827",
//                     border: "none",
//                     borderRadius: "12px",
//                     boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
//                     color: "#f3f4f6",
//                   }}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="users"
//                   stroke="#f97316"
//                   strokeWidth={3}
//                   dot={{ r: 5, stroke: "#f97316", strokeWidth: 2, fill: "#111827" }}
//                   activeDot={{ r: 7 }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Bar Chart - Revenue */}
//         <div className="bg-white dark:bg-slate-900 rounded-2xl p-6
//                        shadow-lg border border-slate-200 dark:border-slate-800">
//           <h3 className="text-lg font-semibold mb-5 text-slate-900 dark:text-white">
//             Revenue
//           </h3>
//           <div className="h-80">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={chartData}>
//                 <CartesianGrid
//                   strokeDasharray="3 3"
//                   stroke="#4b5563"
//                   opacity={0.4}
//                 />
//                 <XAxis
//                   dataKey="month"
//                   stroke="#9ca3af"
//                   tick={{ fill: '#9ca3af' }}
//                 />
//                 <YAxis
//                   stroke="#9ca3af"
//                   tick={{ fill: '#9ca3af' }}
//                 />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "#111827",
//                     border: "none",
//                     borderRadius: "12px",
//                     boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
//                     color: "#f3f4f6",
//                   }}
//                   formatter={(val) => `₹${val.toLocaleString("en-IN")}`}
//                 />
//                 <Bar
//                   dataKey="revenue"
//                   fill="#10b981"
//                   radius={[8, 8, 0, 0]}
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// }

// function Kpi({ title, value, color }) {
//   return (
//     <div
//       className={`bg-gradient-to-br ${color} rounded-2xl p-6 text-white
//                  shadow-lg hover:shadow-xl transition-all duration-300
//                  transform hover:scale-[1.02] border border-white/10`}
//     >
//       <p className="text-sm font-medium opacity-90 mb-1">{title}</p>
//       <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
//         {value}
//       </h3>
//     </div>
//   );
// }

// // src/pages/dashboard/Dashboard.jsx
// import { useState, useEffect } from "react";
// import AdminLayout from "../../components/layout/AdminLayout";
// import Loader from "../../components/Loader";
// import api from "../../services/api";

// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";

// export default function Dashboard() {
//   const [stats, setStats] = useState({
//     organizations: 0,
//     active_cards: 0,
//     inactive_cards: 0,
//     revenue: 0,
//   });

//   const [chartData, setChartData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [from, setFrom] = useState("");
//   const [to, setTo] = useState("");

//   const fetchDashboard = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/orginazation-dashboard/dashboard", {
//         params: { from, to },
//       });
//       setStats(res.data.data.stats || {});
//       setChartData(res.data.data.chartData || []);
//     } catch (err) {
//       console.error("Dashboard fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDashboard();
//   }, []);

//   return (
//     <AdminLayout>
//       <Loader show={loading} text="Loading dashboard..." />

//       {/* Header + Date Filters */}
//       <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-5">
//         <div>
//           <h2 className="text-2xl md:text-3xl font-bold text-white">
//             Dashboard
//           </h2>
//           <p className="text-gray-400 mt-1">
//             Overview • {new Date().toLocaleDateString()}
//           </p>
//         </div>

//         <div className="flex flex-wrap gap-3">
//           <input
//             type="date"
//             value={from}
//             onChange={(e) => setFrom(e.target.value)}
//             className="px-4 py-2.5 rounded-xl border border-gray-800 bg-black text-white
//                        focus:ring-2 focus:ring-[#9a3412] focus:border-[#9a3412]
//                        outline-none transition shadow-sm"
//           />
//           <input
//             type="date"
//             value={to}
//             onChange={(e) => setTo(e.target.value)}
//             className="px-4 py-2.5 rounded-xl border border-gray-800 bg-black text-white
//                        focus:ring-2 focus:ring-[#9a3412] focus:border-[#9a3412]
//                        outline-none transition shadow-sm"
//           />
//           <button
//             onClick={fetchDashboard}
//             className="bg-[#9a3412] hover:bg-[#b45309] active:bg-[#92400e]
//                        text-white px-6 py-2.5 rounded-xl font-medium
//                        shadow-md transition-all duration-200"
//           >
//             Apply Filter
//           </button>
//         </div>
//       </div>

//       {/* KPI Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//         <Kpi
//           title="Total Organizations"
//           value={stats.organizations?.toLocaleString() || "0"}
//           color="from-[#9a3412] to-[#b45309]"
//         />
//         <Kpi
//           title="Active Cards"
//           value={stats.active_cards?.toLocaleString() || "0"}
//           color="from-emerald-700 to-emerald-800"
//         />
//         <Kpi
//           title="Inactive Cards"
//           value={stats.inactive_cards?.toLocaleString() || "0"}
//           color="from-rose-700 to-rose-800"
//         />
//         <Kpi
//           title="Revenue"
//           value={`₹${Number(stats.revenue || 0).toLocaleString("en-IN")}`}
//           color="from-indigo-700 to-indigo-800"
//         />
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Line Chart - Cards Growth */}
//         <div className="bg-black rounded-2xl p-6
//                        shadow-2xl border border-gray-800">
//           <h3 className="text-lg font-semibold mb-5 text-white">
//             Cards Growth
//           </h3>
//           <div className="h-80">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={chartData}>
//                 <CartesianGrid
//                   strokeDasharray="3 3"
//                   stroke="#333333"
//                   opacity={0.4}
//                 />
//                 <XAxis
//                   dataKey="month"
//                   stroke="#666666"
//                   tick={{ fill: '#aaaaaa' }}
//                 />
//                 <YAxis
//                   stroke="#666666"
//                   tick={{ fill: '#aaaaaa' }}
//                 />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "#000000",
//                     border: "1px solid #9a3412",
//                     borderRadius: "12px",
//                     boxShadow: "0 10px 30px rgba(0,0,0,0.7)",
//                     color: "#ffffff",
//                   }}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="users"
//                   stroke="#9a3412"
//                   strokeWidth={3}
//                   dot={{ r: 5, stroke: "#9a3412", strokeWidth: 2, fill: "#000000" }}
//                   activeDot={{ r: 8, stroke: "#9a3412", strokeWidth: 4 }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Bar Chart - Revenue */}
//         <div className="bg-black rounded-2xl p-6
//                        shadow-2xl border border-gray-800">
//           <h3 className="text-lg font-semibold mb-5 text-white">
//             Revenue
//           </h3>
//           <div className="h-80">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={chartData}>
//                 <CartesianGrid
//                   strokeDasharray="3 3"
//                   stroke="#333333"
//                   opacity={0.4}
//                 />
//                 <XAxis
//                   dataKey="month"
//                   stroke="#666666"
//                   tick={{ fill: '#aaaaaa' }}
//                 />
//                 <YAxis
//                   stroke="#666666"
//                   tick={{ fill: '#aaaaaa' }}
//                 />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "#000000",
//                     border: "1px solid #9a3412",
//                     borderRadius: "12px",
//                     boxShadow: "0 10px 30px rgba(0,0,0,0.7)",
//                     color: "#ffffff",
//                   }}
//                   formatter={(val) => `₹${val.toLocaleString("en-IN")}`}
//                 />
//                 <Bar
//                   dataKey="revenue"
//                   fill="#10b981"
//                   radius={[8, 8, 0, 0]}
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// }

// function Kpi({ title, value, color }) {
//   return (
//     <div
//       className={`bg-gradient-to-br ${color} rounded-2xl p-6 text-white
//                  shadow-2xl hover:shadow-[0_20px_40px_rgba(154,52,18,0.3)]
//                  transition-all duration-300 transform hover:scale-[1.03]
//                  border border-gray-800`}
//     >
//       <p className="text-sm font-medium opacity-90 mb-1">{title}</p>
//       <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
//         {value}
//       </h3>
//     </div>
//   );
// }

// // src/pages/dashboard/Dashboard.jsx
// import { useState, useEffect } from "react";
// import AdminLayout from "../../components/layout/AdminLayout";
// import Loader from "../../components/Loader";
// import api from "../../services/api";

// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";

// const ORANGE = "#ea580c";
// const ORANGE_DARK = "#c2410c";
// const ORANGE_LIGHT = "#f97316";

// export default function Dashboard() {
//   const [stats, setStats] = useState({
//     organizations: 0,
//     active_cards: 0,
//     inactive_cards: 0,
//     revenue: 0,
//   });

//   const [chartData, setChartData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [from, setFrom] = useState("");
//   const [to, setTo] = useState("");

//   const fetchDashboard = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/orginazation-dashboard/dashboard", {
//         params: { from, to },
//       });
//       setStats(res.data.data.stats || {});
//       setChartData(res.data.data.chartData || []);
//     } catch (err) {
//       console.error("Dashboard fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDashboard();
//   }, []);

//   return (
//     <AdminLayout>
//       <Loader show={loading} text="Loading dashboard..." />

//       {/* Header + Filters */}
//       <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-5">
//         <div>
//           <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
//             Dashboard Overview
//           </h2>
//           <p className="text-gray-400 mt-1 text-sm">
//             {new Date().toLocaleDateString("en-IN", {
//               weekday: "long",
//               year: "numeric",
//               month: "long",
//               day: "numeric",
//             })}
//           </p>
//         </div>

//         <div className="flex flex-wrap items-center gap-3">
//           <input
//             type="date"
//             value={from}
//             onChange={(e) => setFrom(e.target.value)}
//             className="px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-white
//                        placeholder-gray-500 focus:border-[#ea580c] focus:ring-2 focus:ring-[#ea580c]/30
//                        outline-none transition-all shadow-sm min-w-[160px]"
//           />
//           <input
//             type="date"
//             value={to}
//             onChange={(e) => setTo(e.target.value)}
//             className="px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-white
//                        placeholder-gray-500 focus:border-[#ea580c] focus:ring-2 focus:ring-[#ea580c]/30
//                        outline-none transition-all shadow-sm min-w-[160px]"
//           />
//           <button
//             onClick={fetchDashboard}
//             disabled={loading}
//             className={`px-6 py-2.5 rounded-xl font-medium text-white shadow-md transition-all duration-200
//               ${loading
//                 ? "bg-gray-700 cursor-not-allowed opacity-70"
//                 : "bg-[#ea580c] hover:bg-[#c2410c] active:bg-[#9a3412]"}`}
//           >
//             {loading ? "Applying..." : "Apply Filter"}
//           </button>
//         </div>
//       </div>

//       {/* KPI Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-10">
//         <KpiCard
//           title="Total Organizations"
//           value={stats.organizations?.toLocaleString() || "0"}
//           gradient="from-[#ea580c] to-[#c2410c]"
//         />
//         <KpiCard
//           title="Active Cards"
//           value={stats.active_cards?.toLocaleString() || "0"}
//           gradient="from-emerald-600 to-emerald-800"
//         />
//         <KpiCard
//           title="Inactive Cards"
//           value={stats.inactive_cards?.toLocaleString() || "0"}
//           gradient="from-rose-600 to-rose-800"
//         />
//         <KpiCard
//           title="Total Revenue"
//           value={`₹${Number(stats.revenue || 0).toLocaleString("en-IN")}`}
//           gradient="from-indigo-600 to-indigo-800"
//         />
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Cards Growth - Line Chart */}
//         <div className="bg-gray-900/90 rounded-2xl p-6 border border-gray-800 shadow-2xl">
//           <h3 className="text-xl font-semibold text-white mb-6">Cards Growth</h3>
//           <div className="h-80 md:h-96">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={chartData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" opacity={0.5} />
//                 <XAxis
//                   dataKey="month"
//                   stroke="#666"
//                   tick={{ fill: "#aaa", fontSize: 12 }}
//                   axisLine={{ stroke: "#444" }}
//                 />
//                 <YAxis
//                   stroke="#666"
//                   tick={{ fill: "#aaa", fontSize: 12 }}
//                   axisLine={{ stroke: "#444" }}
//                 />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "#111",
//                     border: "1px solid #ea580c30",
//                     borderRadius: "12px",
//                     boxShadow: "0 10px 25px rgba(0,0,0,0.6)",
//                     color: "#fff",
//                     padding: "12px 16px",
//                   }}
//                   labelStyle={{ color: "#ddd", fontWeight: 600 }}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="users"
//                   stroke={ORANGE}
//                   strokeWidth={3}
//                   dot={{ r: 5, stroke: ORANGE, strokeWidth: 2, fill: "#111" }}
//                   activeDot={{ r: 8, stroke: ORANGE_LIGHT, strokeWidth: 3, fill: "#111" }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Revenue - Bar Chart */}
//         <div className="bg-gray-900/90 rounded-2xl p-6 border border-gray-800 shadow-2xl">
//           <h3 className="text-xl font-semibold text-white mb-6">Revenue Trend</h3>
//           <div className="h-80 md:h-96">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={chartData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" opacity={0.5} />
//                 <XAxis
//                   dataKey="month"
//                   stroke="#666"
//                   tick={{ fill: "#aaa", fontSize: 12 }}
//                   axisLine={{ stroke: "#444" }}
//                 />
//                 <YAxis
//                   stroke="#666"
//                   tick={{ fill: "#aaa", fontSize: 12 }}
//                   axisLine={{ stroke: "#444" }}
//                 />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "#111",
//                     border: "1px solid #ea580c30",
//                     borderRadius: "12px",
//                     boxShadow: "0 10px 25px rgba(0,0,0,0.6)",
//                     color: "#fff",
//                     padding: "12px 16px",
//                   }}
//                   labelStyle={{ color: "#ddd", fontWeight: 600 }}
//                   formatter={(val) => `₹${Number(val).toLocaleString("en-IN")}`}
//                 />
//                 <Bar
//                   dataKey="revenue"
//                   fill={ORANGE_LIGHT}
//                   radius={[8, 8, 0, 0]}
//                   barSize={32}
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// }

// function KpiCard({ title, value, gradient }) {
//   return (
//     <div
//       className={`bg-gradient-to-br ${gradient} rounded-2xl p-6 text-white
//                  shadow-xl hover:shadow-2xl transition-all duration-300
//                  hover:scale-[1.03] border border-gray-800/70 backdrop-blur-sm`}
//     >
//       <p className="text-sm font-medium opacity-90 mb-2">{title}</p>
//       <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
//         {value}
//       </h3>
//     </div>
//   );
// }

// // src/pages/dashboard/Dashboard.jsx
// import { useState, useEffect } from "react";
// import AdminLayout from "../../components/layout/AdminLayout";
// import Loader from "../../components/Loader";
// import api from "../../services/api";

// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";

// const ORANGE = "hsl(var(--accent))"; // #f97316 or your --accent
// const ORANGE_DARK = "hsl(var(--accent-dark))"; // #ea580c
// const ORANGE_LIGHT = "hsl(var(--accent-light))"; // #fb923c

// export default function Dashboard() {
//   const [stats, setStats] = useState({
//     organizations: 0,
//     active_cards: 0,
//     inactive_cards: 0,
//     revenue: 0,
//   });

//   const [chartData, setChartData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [from, setFrom] = useState("");
//   const [to, setTo] = useState("");

//   const fetchDashboard = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/orginazation-dashboard/dashboard", {
//         params: { from, to },
//       });
//       setStats(res.data.data.stats || {});
//       setChartData(res.data.data.chartData || []);
//     } catch (err) {
//       console.error("Dashboard fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDashboard();
//   }, []);

//   return (
//     <AdminLayout>
//       <Loader show={loading} text="Loading dashboard..." />

//       {/* Header + Filters */}
//       <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-5">
//         <div>
//           <h2 className="text-2xl md:text-3xl font-bold text-[hsl(var(--text-primary))] tracking-tight">
//             Overview
//           </h2>
//           <p className="text-[hsl(var(--text-muted))] mt-1 text-sm">
//             {new Date().toLocaleDateString("en-IN", {
//               weekday: "long",
//               year: "numeric",
//               month: "long",
//               day: "numeric",
//             })}
//           </p>
//         </div>

//         <div className="flex flex-wrap items-center gap-3">
//           <input
//             type="date"
//             value={from}
//             onChange={(e) => setFrom(e.target.value)}
//             className="px-4 py-2.5 bg-[hsl(var(--card-bg))] border border-[hsl(var(--border))] 
//                        rounded-xl text-[hsl(var(--text-primary))] 
//                        placeholder-[hsl(var(--text-muted))] 
//                        focus:border-[hsl(var(--accent))] focus:ring-2 focus:ring-[hsl(var(--accent)/0.3)] 
//                        outline-none transition-all shadow-sm min-w-[160px]"
//           />
//           <input
//             type="date"
//             value={to}
//             onChange={(e) => setTo(e.target.value)}
//             className="px-4 py-2.5 bg-[hsl(var(--card-bg))] border border-[hsl(var(--border))] 
//                        rounded-xl text-[hsl(var(--text-primary))] 
//                        placeholder-[hsl(var(--text-muted))] 
//                        focus:border-[hsl(var(--accent))] focus:ring-2 focus:ring-[hsl(var(--accent)/0.3)] 
//                        outline-none transition-all shadow-sm min-w-[160px]"
//           />
//           <button
//             onClick={fetchDashboard}
//             disabled={loading}
//             className={`px-6 py-2.5 rounded-xl font-medium text-white  shadow-md transition-all duration-200
//               ${
//                 loading
//                   ? "bg-[hsl(var(--text-muted)/0.3)] cursor-not-allowed opacity-70"
//                   : "bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-dark))] active:bg-[hsl(var(--accent-dark)/0.9)]"
//               }`}
//           >
//             {loading ? "Applying..." : "Apply Filter"}
//           </button>
//         </div>
//       </div>

//       {/* KPI Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-10">
//         <KpiCard
//           title="Total Organizations"
//           value={stats.organizations?.toLocaleString() || "0"}
//           gradient="from-[hsl(var(--accent))] to-[hsl(var(--accent-dark))]"
//         />
//         <KpiCard
//           title="Active Cards"
//           value={stats.active_cards?.toLocaleString() || "0"}
//           gradient="from-emerald-600 to-emerald-800"
//         />
//         <KpiCard
//           title="Inactive Cards"
//           value={stats.inactive_cards?.toLocaleString() || "0"}
//           gradient="from-rose-600 to-rose-800"
//         />
//         <KpiCard
//           title="Total Revenue"
//           value={`₹${Number(stats.revenue || 0).toLocaleString("en-IN")}`}
//           gradient="from-indigo-600 to-indigo-800"
//         />
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-[hsl(var(--card-bg)/0.9)] rounded-2xl p-6 border border-[hsl(var(--border))] shadow-2xl backdrop-blur-sm">
//           <h3 className="text-xl font-semibold text-[hsl(var(--text-primary))] mb-6">
//             Cards Growth
//           </h3>
//           <div className="h-80 md:h-96">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={chartData}>
//                 <CartesianGrid
//                   strokeDasharray="3 3"
//                   stroke="hsl(var(--border))"
//                   opacity={0.4}
//                 />
//                 <XAxis
//                   dataKey="month"
//                   stroke="hsl(var(--text-muted))"
//                   tick={{ fill: "hsl(var(--text-muted))", fontSize: 12 }}
//                   axisLine={{ stroke: "hsl(var(--border))" }}
//                 />
//                 <YAxis
//                   stroke="hsl(var(--text-muted))"
//                   tick={{ fill: "hsl(var(--text-muted))", fontSize: 12 }}
//                   axisLine={{ stroke: "hsl(var(--border))" }}
//                 />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "hsl(var(--card-bg))",
//                     border: "1px solid hsl(var(--accent)/0.3)",
//                     borderRadius: "12px",
//                     boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
//                     color: "hsl(var(--text-primary))",
//                     padding: "12px 16px",
//                   }}
//                   labelStyle={{
//                     color: "hsl(var(--text-secondary))",
//                     fontWeight: 600,
//                   }}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="users"
//                   stroke={ORANGE}
//                   strokeWidth={3}
//                   dot={{
//                     r: 5,
//                     stroke: ORANGE,
//                     strokeWidth: 2,
//                     fill: "hsl(var(--card-bg))",
//                   }}
//                   activeDot={{
//                     r: 8,
//                     stroke: ORANGE_LIGHT,
//                     strokeWidth: 3,
//                     fill: "hsl(var(--card-bg))",
//                   }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         <div className="bg-[hsl(var(--card-bg)/0.9)] rounded-2xl p-6 border border-[hsl(var(--border))] shadow-2xl backdrop-blur-sm">
//           <h3 className="text-xl font-semibold text-[hsl(var(--text-primary))] mb-6">
//             Revenue Trend
//           </h3>
//           <div className="h-80 md:h-96">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={chartData}>
//                 <CartesianGrid
//                   strokeDasharray="3 3"
//                   stroke="hsl(var(--border))"
//                   opacity={0.4}
//                 />
//                 <XAxis
//                   dataKey="month"
//                   stroke="hsl(var(--text-muted))"
//                   tick={{ fill: "hsl(var(--text-muted))", fontSize: 12 }}
//                   axisLine={{ stroke: "hsl(var(--border))" }}
//                 />
//                 <YAxis
//                   stroke="hsl(var(--text-muted))"
//                   tick={{ fill: "hsl(var(--text-muted))", fontSize: 12 }}
//                   axisLine={{ stroke: "hsl(var(--border))" }}
//                 />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "hsl(var(--card-bg))",
//                     border: "1px solid hsl(var(--accent)/0.3)",
//                     borderRadius: "12px",
//                     boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
//                     color: "hsl(var(--text-primary))",
//                     padding: "12px 16px",
//                   }}
//                   labelStyle={{
//                     color: "hsl(var(--text-secondary))",
//                     fontWeight: 600,
//                   }}
//                   formatter={(val) => `₹${Number(val).toLocaleString("en-IN")}`}
//                 />
//                 <Bar
//                   dataKey="revenue"
//                   fill={ORANGE_LIGHT}
//                   radius={[8, 8, 0, 0]}
//                   barSize={32}
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// }

// // function KpiCard({ title, value, gradient }) {
// //   return (
// //     <div
// //       className={`bg-gradient-to-br ${gradient} rounded-2xl p-7 text-white
// //                  shadow-xl hover:shadow-2xl transition-all duration-300
// //                  hover:scale-[1.03] border border-[hsl(var(--border)/0.5)]
// //                  backdrop-blur-sm`}
// //     >
// //       <p className="text-sm font-medium opacity-90 mb-2">{title}</p>
// //       <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
// //         {value}
// //       </h3>
// //     </div>
// //   );
// // }

// function KpiCard({ title, value }) {
//   return (
//     <div
//       className="
//         bg-[#fe7f2d]
//         rounded-2xl
//         p-7
//         text-white
//         shadow-lg
//         hover:shadow-xl
//         hover:-translate-y-1
//         transition-all
//         duration-300
//       "
//     >
//       <p className="text-sm font-medium opacity-90 mb-2">{title}</p>

//       <h3 className="text-3xl md:text-4xl font-bold tracking-tight">{value}</h3>
//     </div>
//   );
// }
// divya

// src/pages/dashboard/Dashboard.jsx
import { useState, useEffect } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Loader from "../../components/Loader";
import api from "../../services/api";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const ORANGE = "hsl(var(--accent))";
const ORANGE_DARK = "hsl(var(--accent-dark))";
const ORANGE_LIGHT = "hsl(var(--accent-light))";

export default function Dashboard() {
  const [stats, setStats] = useState({
    organizations: 0,
    active_cards: 0,
    inactive_cards: 0,
    revenue: 0,
  });

  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const res = await api.get("/orginazation-dashboard/dashboard", {
        params: { from, to },
      });
      setStats(res.data.data.stats || {});
      setChartData(res.data.data.chartData || []);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <AdminLayout>
      <Loader show={loading} text="Loading dashboard..." />

      <div className="w-full max-w-full overflow-x-hidden pb-20 md:pb-0">
        {/* Header + Filters */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 md:mb-8 gap-4 md:gap-5">
          <div className="w-full lg:w-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[hsl(var(--text-primary))] tracking-tight">
              Overview
            </h2>
            <p className="text-[hsl(var(--text-muted))] mt-1 text-xs sm:text-sm">
              {new Date().toLocaleDateString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div className="w-full lg:w-auto grid grid-cols-1 sm:grid-cols-3 lg:flex items-center gap-3">
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full px-4 py-2.5 bg-[hsl(var(--card-bg))] border border-[hsl(var(--border))]
                         rounded-xl text-[hsl(var(--text-primary))]
                         placeholder-[hsl(var(--text-muted))]
                         focus:border-[hsl(var(--accent))] focus:ring-2 focus:ring-[hsl(var(--accent)/0.3)]
                         outline-none transition-all shadow-sm min-w-0 lg:min-w-[160px]"
            />

            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full px-4 py-2.5 bg-[hsl(var(--card-bg))] border border-[hsl(var(--border))]
                         rounded-xl text-[hsl(var(--text-primary))]
                         placeholder-[hsl(var(--text-muted))]
                         focus:border-[hsl(var(--accent))] focus:ring-2 focus:ring-[hsl(var(--accent)/0.3)]
                         outline-none transition-all shadow-sm min-w-0 lg:min-w-[160px]"
            />

            <button
              onClick={fetchDashboard}
              disabled={loading}
              className={`w-full lg:w-auto px-6 py-2.5 rounded-xl font-medium text-white shadow-md transition-all duration-200
                ${
                  loading
                    ? "bg-[hsl(var(--text-muted)/0.3)] cursor-not-allowed opacity-70"
                    : "bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-dark))] active:bg-[hsl(var(--accent-dark)/0.9)]"
                }`}
            >
              {loading ? "Applying..." : "Apply Filter"}
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-7 md:mb-10">
          <KpiCard
            title="Total Organizations"
            value={stats.organizations?.toLocaleString() || "0"}
          />
          <KpiCard
            title="Active Mi Profile"
            value={stats.active_cards?.toLocaleString() || "0"}
          />
          <KpiCard
            title="Inactive Mi Profile"
            value={stats.inactive_cards?.toLocaleString() || "0"}
          />
          <KpiCard
            title="Total Revenue"
            value={`₹${Number(stats.revenue || 0).toLocaleString("en-IN")}`}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
          <div className="min-w-0 bg-[hsl(var(--card-bg)/0.9)] rounded-2xl p-4 sm:p-5 md:p-6 border border-[hsl(var(--border))] shadow-2xl backdrop-blur-sm">
            <h3 className="text-lg md:text-xl font-semibold text-[hsl(var(--text-primary))] mb-4 md:mb-6">
              Mi Profile Growth
            </h3>

            <div className="w-full min-w-0 h-[260px] sm:h-80 md:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                    opacity={0.4}
                  />
                  <XAxis
                    dataKey="month"
                    stroke="hsl(var(--text-muted))"
                    tick={{
                      fill: "hsl(var(--text-muted))",
                      fontSize: 11,
                    }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <YAxis
                    stroke="hsl(var(--text-muted))"
                    tick={{
                      fill: "hsl(var(--text-muted))",
                      fontSize: 11,
                    }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                    width={45}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card-bg))",
                      border: "1px solid hsl(var(--accent)/0.3)",
                      borderRadius: "12px",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                      color: "hsl(var(--text-primary))",
                      padding: "12px 16px",
                    }}
                    labelStyle={{
                      color: "hsl(var(--text-secondary))",
                      fontWeight: 600,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke={ORANGE}
                    strokeWidth={3}
                    dot={{
                      r: 4,
                      stroke: ORANGE,
                      strokeWidth: 2,
                      fill: "hsl(var(--card-bg))",
                    }}
                    activeDot={{
                      r: 7,
                      stroke: ORANGE_LIGHT,
                      strokeWidth: 3,
                      fill: "hsl(var(--card-bg))",
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="min-w-0 bg-[hsl(var(--card-bg)/0.9)] rounded-2xl p-4 sm:p-5 md:p-6 border border-[hsl(var(--border))] shadow-2xl backdrop-blur-sm">
            <h3 className="text-lg md:text-xl font-semibold text-[hsl(var(--text-primary))] mb-4 md:mb-6">
              Revenue Trend
            </h3>

            <div className="w-full min-w-0 h-[260px] sm:h-80 md:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                    opacity={0.4}
                  />
                  <XAxis
                    dataKey="month"
                    stroke="hsl(var(--text-muted))"
                    tick={{
                      fill: "hsl(var(--text-muted))",
                      fontSize: 11,
                    }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                  />
                  <YAxis
                    stroke="hsl(var(--text-muted))"
                    tick={{
                      fill: "hsl(var(--text-muted))",
                      fontSize: 11,
                    }}
                    axisLine={{ stroke: "hsl(var(--border))" }}
                    width={45}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card-bg))",
                      border: "1px solid hsl(var(--accent)/0.3)",
                      borderRadius: "12px",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                      // color: "hsl(var(--text-primary))",
                      padding: "12px 16px",
                    }}
                    labelStyle={{
                      color: "hsl(var(--text-secondary))",
                      fontWeight: 600,
                    }}
                     itemStyle={{
    color: "hsl(var(--accent))", // Revenue text in orange
    fontWeight: 600,
  }}
                    formatter={(val) =>
                      `₹${Number(val).toLocaleString("en-IN")}`
                    }
                  />
                  <Bar
                    dataKey="revenue"
                    fill={ORANGE_LIGHT}
                    radius={[8, 8, 0, 0]}
                    barSize={28}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function KpiCard({ title, value }) {
  return (
    <div
      className="
        bg-[#fe7f2d]
        rounded-2xl
        p-5
        sm:p-6
        md:p-7
        text-white
        shadow-lg
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
        min-w-0
      "
    >
      <p className="text-xs sm:text-sm font-medium opacity-90 mb-2 break-words">
        {title}
      </p>

      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight break-words">
        {value}
      </h3>
    </div>
  );
}