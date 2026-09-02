// // src/pages/employee/EmployeeDashboard.jsx
// import EmployeeLayout from "../../components/layout/EmployeeLayout";
// import { useState, useEffect } from "react";
// import api from "../../services/api";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Line, Bar } from "react-chartjs-2";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// );

// export default function EmployeeDashboard() {
//   const [stats, setStats] = useState({
//     totalOrganizations: 0,
//     activeProfiles: 0,
//     inactiveProfiles: 0,
//     totalRevenue: 0,
//   });

//   const [growthData, setGrowthData] = useState([6, 8, 9, 11, 12, 13, 14]);
//   const [revenueData, setRevenueData] = useState([0, 0, 0, 0, 0, 0, 0]);
//   const [loading, setLoading] = useState(true);
//   const [dateFrom, setDateFrom] = useState("");
//   const [dateTo, setDateTo] = useState("");

//   const fetchDashboard = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/employee/dashboard", {
//         params: {
//           from: dateFrom || undefined,
//           to: dateTo || undefined,
//         },
//       });

//       const data = res.data.data;

//       console.log("Dashboard Response:", res.data.data);

//       setStats({
//         totalOrganizations: data.totalOrganizations || 0,
//         activeProfiles: data.activeProfiles || 0,
//         inactiveProfiles: data.inactiveProfiles || 0,
//         totalRevenue: parseFloat(data.totalRevenue) || 0,
//       });

//       setGrowthData(data.growthData || [6, 8, 9, 11, 12, 13, 14]);
//       setRevenueData(data.revenueData || [0, 0, 0, 0, 0, 0, 0]);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDashboard();
//   }, [dateFrom, dateTo]);

//   const growthChartData = {
//     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
//     datasets: [
//       {
//         label: "Mi Profiles",
//         data: growthData,
//         borderColor: "#f97316",
//         backgroundColor: "rgba(249, 115, 22, 0.1)",
//         tension: 0.4,
//         borderWidth: 3,
//         pointRadius: 5,
//       },
//     ],
//   };

//   const revenueChartData = {
//     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
//     datasets: [
//       {
//         label: "Revenue (₹)",
//         data: revenueData,
//         backgroundColor: "#fed7aa",
//         borderColor: "#fb923c",
//         borderWidth: 1,
//         borderRadius: 8,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: { legend: { display: false } },
//     scales: {
//       y: { grid: { color: "#f3f4f6" }, ticks: { color: "#6b7280" } },
//       x: { grid: { color: "#f3f4f6" }, ticks: { color: "#6b7280" } },
//     },
//   };

//   return (
//     <EmployeeLayout>
//       <div className="space-y-8">
//         <div>
//           <h1 className="text-3xl font-bold">Overview</h1>
//           <p className="text-[hsl(var(--text-muted))] mt-1">
//             Thursday, 16 July 2026
//           </p>
//         </div>

//         {/* Filters */}
//         <div className="flex items-center gap-3 flex-wrap">
//           <input
//             type="date"
//             value={dateFrom}
//             onChange={(e) => setDateFrom(e.target.value)}
//             className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none"
//           />
//           <input
//             type="date"
//             value={dateTo}
//             onChange={(e) => setDateTo(e.target.value)}
//             className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none"
//           />
//           <button
//             onClick={fetchDashboard}
//             className="[#FC6C26]0 hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl font-medium transition"
//           >
//             Apply Filter
//           </button>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           <div className="[#FC6C26]0 text-white p-6 rounded-3xl">
//             <p className="text-sm opacity-90">Total Organizations</p>
//             <p className="text-5xl font-bold mt-3">
//               {stats.totalOrganizations}
//             </p>
//           </div>

//           <div className="[#FC6C26]0 text-white p-6 rounded-3xl">
//             <p className="text-sm opacity-90">Active Mi Profile</p>
//             <p className="text-5xl font-bold mt-3">{stats.activeProfiles}</p>
//           </div>

//           <div className="[#FC6C26]0 text-white p-6 rounded-3xl">
//             <p className="text-sm opacity-90">Inactive Mi Profile</p>
//             <p className="text-5xl font-bold mt-3">{stats.inactiveProfiles}</p>
//           </div>

//           <div className="[#FC6C26]0 text-white p-6 rounded-3xl">
//             <p className="text-sm opacity-90">Total Revenue</p>
//             <p className="text-5xl font-bold mt-3">₹{stats.totalRevenue}</p>
//           </div>
//         </div>

//         {/* Charts */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <div className="bg-white p-6 rounded-3xl border border-gray-100">
//             <h2 className="font-semibold text-lg mb-6">Mi Profile Growth</h2>
//             <div className="h-80">
//               <Line data={growthChartData} options={chartOptions} />
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-3xl border border-gray-100">
//             <h2 className="font-semibold text-lg mb-6">Revenue Trend</h2>
//             <div className="h-80">
//               <Bar data={revenueChartData} options={chartOptions} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </EmployeeLayout>
//   );
// }

// src/pages/employee/EmployeeDashboard.jsx

import EmployeeLayout from "../../components/layout/EmployeeLayout";
import { useEffect, useMemo, useState } from "react";
import Loader from "../../components/Loader";
import api from "../../services/api";
import {
  Building2,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  Filter,
  RefreshCcw,
  Sparkles,
  TrendingUp,
  UserRoundCheck,
  UserRoundX,
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

export default function EmployeeDashboard() {
  const [stats, setStats] = useState({
    totalOrganizations: 0,
    activeProfiles: 0,
    inactiveProfiles: 0,
    totalRevenue: 0,
  });

  const [growthData, setGrowthData] = useState([6, 8, 9, 11, 12, 13, 14]);
  const [revenueData, setRevenueData] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [loading, setLoading] = useState(true);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const fetchDashboard = async () => {
    setLoading(true);

    try {
      const res = await api.get("/employee/dashboard", {
        params: {
          from: dateFrom || undefined,
          to: dateTo || undefined,
        },
      });

      const data = res.data.data;

      console.log("Dashboard Response:", res.data.data);

      setStats({
        totalOrganizations: data.totalOrganizations || 0,
        activeProfiles: data.activeProfiles || 0,
        inactiveProfiles: data.inactiveProfiles || 0,
        totalRevenue: parseFloat(data.totalRevenue) || 0,
      });

      setGrowthData(data.growthData || [6, 8, 9, 11, 12, 13, 14]);
      setRevenueData(data.revenueData || [0, 0, 0, 0, 0, 0, 0]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [dateFrom, dateTo]);

  const currentDate = useMemo(() => {
    return new Intl.DateTimeFormat("en-IN", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date());
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(Number(value || 0));
  };

  const clearFilters = () => {
    setDateFrom("");
    setDateTo("");
  };

  const growthChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Mi Profiles",
        data: growthData,
        borderColor: "#f97316",
        backgroundColor: "rgba(249, 115, 22, 0.12)",
        fill: true,
        tension: 0.42,
        borderWidth: 3,
        pointRadius: 4,
        pointHoverRadius: 7,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#f97316",
        pointBorderWidth: 3,
      },
    ],
  };

  const revenueChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Revenue (₹)",
        data: revenueData,
        backgroundColor: "rgba(249, 115, 22, 0.24)",
        hoverBackgroundColor: "rgba(249, 115, 22, 0.55)",
        borderColor: "#f97316",
        borderWidth: 1,
        borderRadius: 10,
        borderSkipped: false,
        maxBarThickness: 42,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "index",
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#1f2937",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        padding: 12,
        cornerRadius: 12,
        displayColors: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        border: {
          display: false,
        },
        grid: {
          color: "rgba(148, 163, 184, 0.14)",
          drawTicks: false,
        },
        ticks: {
          color: "#94a3b8",
          padding: 10,
          font: {
            size: 11,
            weight: "500",
          },
        },
      },
      x: {
        border: {
          display: false,
        },
        grid: {
          display: false,
        },
        ticks: {
          color: "#94a3b8",
          padding: 10,
          font: {
            size: 11,
            weight: "500",
          },
        },
      },
    },
  };

  const statCards = [
    {
      title: "Total Organizations",
      value: stats.totalOrganizations,
      icon: Building2,
      note: "Organizations assigned",
      iconBg: "bg-white/15",
      accent: "from-[#ff7a1a] via-[#ff6b14] to-[#f4510b]",
    },
    {
      title: "Active Mi Profiles",
      value: stats.activeProfiles,
      icon: UserRoundCheck,
      note: "Currently active",
      iconBg: "bg-emerald-500/10",
      accent: "from-white to-[#fffaf5]",
      dark: true,
      iconColor: "text-emerald-600",
      badge: "Active",
      badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-100",
    },
    {
      title: "Inactive Mi Profiles",
      value: stats.inactiveProfiles,
      icon: UserRoundX,
      note: "Require attention",
      iconBg: "bg-rose-500/10",
      accent: "from-white to-[#fff8f7]",
      dark: true,
      iconColor: "text-rose-500",
      badge: "Inactive",
      badgeClass: "bg-rose-50 text-rose-600 border-rose-100",
    },
    {
      title: "Total Revenue",
      value: `₹${formatCurrency(stats.totalRevenue)}`,
      icon: CircleDollarSign,
      note: "Revenue generated",
      iconBg: "bg-white/15",
      accent: "from-[#262626] via-[#1d1d1d] to-[#111111]",
    },
  ];

  return (
    <EmployeeLayout>
      <Loader show={loading} text="Creating Organization..." />
      <div className="min-h-screen space-y-6 pb-10">
        {/* PREMIUM HEADER */}
        <section className="relative overflow-hidden rounded-[30px] border border-[#FC6C26] bg-gradient-to-br from-[#fffaf5] via-white to-[#fff2e7] px-5 py-6 shadow-[0_18px_55px_rgba(30,20,10,0.07)] sm:px-7 sm:py-7 lg:px-9">
          <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-orange-200/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-amber-100/40 blur-3xl" />

          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="hidden h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-[#ff6418] text-white shadow-[0_12px_30px_rgba(255,100,24,0.3)] sm:flex">
                <Sparkles size={25} />
              </div>

              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#FC6C26] bg-white/85 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#ff6418] shadow-sm">
                  Employee Dashboard
                </div>

                <h1 className="text-3xl font-black tracking-tight text-[#24211f] sm:text-4xl">
                  Overview
                </h1>

                <p className="mt-2 flex items-center gap-2 text-sm font-medium text-[#817974]">
                  <CalendarDays size={15} className="text-[#ff6418]" />
                  {currentDate}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/75 px-4 py-3 shadow-sm backdrop-blur-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl [#FC6C26] text-[#ff6418]">
                <TrendingUp size={20} />
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                  Dashboard Status
                </p>
                <p className="mt-0.5 flex items-center gap-1.5 text-sm font-bold text-[#2f2b28]">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  Live and updated
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PREMIUM FILTER */}
        <section className="rounded-[26px] border border-gray-100 bg-white p-4 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:p-5">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#fff0e8] text-[#ff6418]">
                  <Filter size={17} />
                </div>

                <div>
                  <h2 className="text-sm font-extrabold text-[#26211e]">
                    Date Filter
                  </h2>
                  <p className="text-xs text-gray-400">
                    Filter the dashboard using a custom date range
                  </p>
                </div>
              </div>
            </div>

            {(dateFrom || dateTo) && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-2 self-start rounded-xl px-3 py-2 text-xs font-bold text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 sm:self-auto"
              >
                <RefreshCcw size={14} />
                Clear Filter
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_1fr_auto]">
            <div>
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-gray-400">
                From Date
              </label>

              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="h-12 w-full rounded-2xl border border-gray-200 bg-[#fcfcfc] px-4 text-sm font-medium text-gray-700 outline-none transition focus:border-[#ff6418] focus:bg-white focus:ring-4 focus:ring-[#FC6C26]"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-gray-400">
                To Date
              </label>

              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                min={dateFrom || undefined}
                className="h-12 w-full rounded-2xl border border-gray-200 bg-[#fcfcfc] px-4 text-sm font-medium text-gray-700 outline-none transition focus:border-[#ff6418] focus:bg-white focus:ring-4 focus:ring-[#FC6C26]"
              />
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={fetchDashboard}
                disabled={loading}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#ff6418] px-6 text-sm font-extrabold text-white shadow-[0_12px_26px_rgba(255,100,24,0.28)] transition hover:bg-[#ed5711] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
              >
                {loading ? (
                  <>
                    <RefreshCcw size={17} className="animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Filter size={17} />
                    Apply Filter
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* PREMIUM STATS */}
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`group relative min-h-[190px] overflow-hidden rounded-[28px] border bg-gradient-to-br p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(15,23,42,0.12)] ${
                  item.dark
                    ? `${item.accent} border-gray-100 shadow-[0_14px_42px_rgba(15,23,42,0.06)]`
                    : `${item.accent} border-transparent text-white shadow-[0_16px_45px_rgba(255,100,24,0.2)]`
                }`}
              >
                <div
                  className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full ${
                    item.dark ? "bg-[#FC6C26]/50" : "bg-white/10"
                  }`}
                />

                <div
                  className={`pointer-events-none absolute -bottom-14 -left-10 h-32 w-32 rounded-full ${
                    item.dark ? "bg-gray-100/60" : "bg-black/5"
                  }`}
                />

                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p
                        className={`text-sm font-semibold ${
                          item.dark ? "text-gray-500" : "text-white/85"
                        }`}
                      >
                        {item.title}
                      </p>

                      <p
                        className={`mt-4 break-words text-4xl font-black tracking-tight sm:text-5xl ${
                          item.dark ? "text-[#24211f]" : "text-white"
                        }`}
                      >
                        {loading ? (
                          <span
                            className={`inline-block h-11 w-24 animate-pulse rounded-xl ${
                              item.dark ? "bg-gray-200" : "bg-white/20"
                            }`}
                          />
                        ) : (
                          item.value
                        )}
                      </p>
                    </div>

                    <div
                      className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl ${
                        item.iconBg
                      } ${
                        item.dark
                          ? item.iconColor
                          : "text-white backdrop-blur-sm"
                      }`}
                    >
                      <Icon size={23} />
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-3">
                    <p
                      className={`text-xs font-medium ${
                        item.dark ? "text-gray-400" : "text-white/75"
                      }`}
                    >
                      {item.note}
                    </p>

                    {item.badge && (
                      <span
                        className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${item.badgeClass}`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* PREMIUM CHARTS */}
        {/* <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-[0_16px_50px_rgba(15,23,42,0.06)]">
            <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff0e8] text-[#ff6418]">
                  <TrendingUp size={21} />
                </div>

                <div>
                  <h2 className="text-base font-extrabold text-[#26211e] sm:text-lg">
                    Mi Profile Growth
                  </h2>
                  <p className="mt-0.5 text-xs text-gray-400">
                    Monthly profile growth performance
                  </p>
                </div>
              </div>

              <span className="self-start rounded-full border border-[#FC6C26] [#FC6C26] px-3 py-1.5 text-[11px] font-bold text-[#ff6418] sm:self-auto">
                Growth Analytics
              </span>
            </div>

            <div className="p-4 sm:p-6">
              <div className="h-[300px] sm:h-[340px]">
                {loading ? (
                  <ChartSkeleton />
                ) : (
                  <Line data={growthChartData} options={chartOptions} />
                )}
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-[0_16px_50px_rgba(15,23,42,0.06)]">
            <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff0e8] text-[#ff6418]">
                  <CircleDollarSign size={21} />
                </div>

                <div>
                  <h2 className="text-base font-extrabold text-[#26211e] sm:text-lg">
                    Revenue Trend
                  </h2>
                  <p className="mt-0.5 text-xs text-gray-400">
                    Monthly revenue performance in rupees
                  </p>
                </div>
              </div>

              <span className="self-start rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-[11px] font-bold text-gray-600 sm:self-auto">
                Revenue Analytics
              </span>
            </div>

            <div className="p-4 sm:p-6">
              <div className="h-[300px] sm:h-[340px]">
                {loading ? (
                  <ChartSkeleton />
                ) : (
                  <Bar data={revenueChartData} options={chartOptions} />
                )}
              </div>
            </div>
          </div>
        </section> */}
      </div>
    </EmployeeLayout>
  );
}

function ChartSkeleton() {
  return (
    <div className="flex h-full flex-col justify-end rounded-2xl bg-gradient-to-b from-gray-50 to-white p-5">
      <div className="flex h-full items-end gap-4">
        {[42, 58, 48, 68, 62, 82, 74].map((height, index) => (
          <div
            key={index}
            className="flex flex-1 items-end justify-center"
          >
            <div
              className="w-full max-w-10 animate-pulse rounded-t-xl bg-[#FC6C26]"
              style={{ height: `${height}%` }}
            />
          </div>
        ))}
      </div>

      <div className="mt-4 h-px bg-gray-100" />
    </div>
  );
}