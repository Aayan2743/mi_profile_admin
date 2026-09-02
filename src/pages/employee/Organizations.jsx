// // src/pages/employee/Organizations.jsx
// import { useState, useEffect } from "react";
// import EmployeeLayout from "../../components/layout/EmployeeLayout";
// import OrganizationDrawer from "../../components/organizations/OrganizationDrawer";
// import api from "../../services/api";
// import Swal from "sweetalert2";

// export default function Organizations() {
//   const [organizations, setOrganizations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [editingOrg, setEditingOrg] = useState(null);
//   const [refreshKey, setRefreshKey] = useState(0);

//   const fetchOrganizations = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/employee/organizations", {
//         params: { search: searchTerm },
//       });
//       setOrganizations(res.data.data.data || []);
//     } catch (err) {
//       Swal.fire({
//         icon: "error",
//         title: "Failed to load",
//         text: err.response?.data?.message || "Could not fetch organizations",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrganizations();
//   }, [searchTerm, refreshKey]);

//   const handleEdit = (org) => {
//     setEditingOrg(org);
//     setDrawerOpen(true);
//   };

//   const handleSuccess = () => {
//     setEditingOrg(null);
//     setDrawerOpen(false);
//     setRefreshKey((prev) => prev + 1);
//   };

//   return (
//     <EmployeeLayout>
//       <div className="space-y-6">
//         <div className="flex justify-between items-center">
//           <div>
//             <h1 className="text-3xl font-bold">Organizations</h1>
//             <p className="text-[hsl(var(--text-muted))]">
//               Manage your organizations
//             </p>
//           </div>

//           <button
//             onClick={() => {
//               setEditingOrg(null);
//               setDrawerOpen(true);
//             }}
//             className="bg-[hsl(var(--accent))] text-white px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-[hsl(var(--accent))]/90 transition"
//           >
//             + Add Organization
//           </button>
//         </div>

//         {/* Search */}
//         <input
//           type="text"
//           placeholder="Search organizations..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full px-5 py-3 bg-[hsl(var(--card-bg))] border border-[hsl(var(--border))] rounded-2xl focus:outline-none focus:border-[hsl(var(--accent))]"
//         />

//         {/* Table */}
//         <div className="bg-[hsl(var(--card-bg))] rounded-3xl border border-[hsl(var(--border))] overflow-hidden">
//           {loading ? (
//             <div className="p-12 text-center text-lg">
//               Loading organizations...
//             </div>
//           ) : (
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-[hsl(var(--border))]">
//                   <th className="px-6 py-4 text-left">ID</th>
//                   <th className="px-6 py-4 text-left">NAME</th>
//                   <th className="px-6 py-4 text-left">EMAIL</th>
//                   <th className="px-6 py-4 text-left">PHONE</th>
//                   <th className="px-6 py-4 text-center">TOTAL CARDS</th>
//                   <th className="px-6 py-4 text-center">ACTIVE</th>
//                   <th className="px-6 py-4 text-center">ACTIONS</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {organizations.map((org) => (
//                   <tr
//                     key={org.id}
//                     className="border-b border-[hsl(var(--border))] hover:bg-[hsl(var(--card-bg-hover))]"
//                   >
//                     <td className="px-6 py-5 font-medium">{org.id}</td>
//                     <td className="px-6 py-5 font-medium">{org.name}</td>
//                     <td className="px-6 py-5 text-[hsl(var(--text-muted))]">
//                       {org.email}
//                     </td>
//                     <td className="px-6 py-5 text-[hsl(var(--text-muted))]">
//                       {org.phone}
//                     </td>
//                     <td className="px-6 py-5 text-center font-medium">
//                       {org.total_cards}
//                     </td>
//                     <td className="px-6 py-5 text-center text-green-600 font-medium">
//                       {org.active_cards}
//                     </td>
//                     <td className="px-6 py-5 text-center">
//                       <button
//                         onClick={() => handleEdit(org)}
//                         className="text-[hsl(var(--accent))] hover:underline font-medium mr-4"
//                       >
//                         Edit
//                       </button>
//                       {/* <button className="text-red-500 hover:underline font-medium">
//                         Delete
//                       </button> */}
//                     </td>
//                   </tr>
//                 ))}

//                 {organizations.length === 0 && !loading && (
//                   <tr>
//                     <td
//                       colSpan="7"
//                       className="text-center py-12 text-[hsl(var(--text-muted))]"
//                     >
//                       No organizations found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>

//       {/* Drawer */}
//       <OrganizationDrawer
//         isOpen={drawerOpen}
//         onClose={() => {
//           setDrawerOpen(false);
//           setEditingOrg(null);
//         }}
//         organization={editingOrg}
//         onSuccess={handleSuccess}
//       />
//     </EmployeeLayout>
//   );
// }


// src/pages/employee/Organizations.jsx

import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import {
  Building2,
  CheckCircle2,
  CreditCard,
  Edit3,
  Mail,
  Phone,
  
  Plus,
  RefreshCcw,
  Search,
  UsersRound,
  X,
} from "lucide-react";
import EmployeeLayout from "../../components/layout/EmployeeLayout";
import OrganizationDrawer from "../../components/organizations/OrganizationDrawer";
import api from "../../services/api";
import Swal from "sweetalert2";

export default function Organizations() {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingOrg, setEditingOrg] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchOrganizations = async () => {
    setLoading(true);

    try {
      const res = await api.get("/employee/organizations", {
        params: {
          search: searchTerm,
        },
      });

      setOrganizations(res.data.data.data || []);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to load",
        text:
          err.response?.data?.message ||
          "Could not fetch organizations",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, [searchTerm, refreshKey]);

  const handleEdit = (org) => {
    setEditingOrg(org);
    setDrawerOpen(true);
  };

  const handleAddOrganization = () => {
    setEditingOrg(null);
    setDrawerOpen(true);
  };

  const handleSuccess = () => {
    setEditingOrg(null);
    setDrawerOpen(false);
    setRefreshKey((prev) => prev + 1);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setEditingOrg(null);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const totalCards = organizations.reduce(
    (total, org) => total + Number(org.total_cards || 0),
    0,
  );

  const activeCards = organizations.reduce(
    (total, org) => total + Number(org.active_cards || 0),
    0,
  );

  return (
    <EmployeeLayout>
        <Loader show={loading} text="Creating Organization..." />

      <div className="space-y-6 pb-10">
        {/* Header */}
        <section className="relative overflow-hidden rounded-[30px] border border-[#FC6C26] bg-gradient-to-br from-[#fffaf5] via-white to-[#fff1e6] px-5 py-6 shadow-[0_18px_55px_rgba(30,20,10,0.07)] sm:px-7 sm:py-7 lg:px-9">
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-orange-200/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-amber-100/40 blur-3xl" />

          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="hidden h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff7b22] to-[#f4510b] text-white shadow-[0_12px_30px_rgba(255,100,24,0.3)] sm:flex">
                <Building2 size={26} />
              </div>

              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#FC6C26] bg-white/85 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#ff6418] shadow-sm">
                  Organization Management
                </div>

                <h1 className="text-3xl font-black tracking-tight text-[#24211f] sm:text-4xl">
                  Organizations
                </h1>

                <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-[#817974]">
                  Manage assigned organizations, view card usage, and update
                  organization details.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddOrganization}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#ff6a18] to-[#f4510b] px-6 text-sm font-extrabold text-white shadow-[0_12px_28px_rgba(255,100,24,0.3)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(255,100,24,0.35)] active:scale-[0.98] sm:w-auto"
            >
              <Plus size={19} strokeWidth={2.5} />
              Add Organization
            </button>
          </div>
        </section>

      

        {/* Search Section */}
        <section className="rounded-[26px] border border-gray-100 bg-white p-4 shadow-[0_14px_45px_rgba(15,23,42,0.05)] sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-[#fff0e8] text-[#ff6418]">
                <Search size={20} />
              </div>

              <div>
                <h2 className="text-sm font-extrabold text-[#26211e]">
                  Search Organizations
                </h2>

                <p className="mt-0.5 text-xs text-gray-400">
                  Search using organization name, email, or phone number.
                </p>
              </div>
            </div>

            <div className="relative w-full lg:max-w-xl">
              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search organizations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12 w-full rounded-2xl border border-gray-200 bg-[#fcfcfc] pl-11 pr-12 text-sm font-medium text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#ff6418] focus:bg-white focus:ring-4 focus:ring-[#FC6C26]"
              />

              {searchTerm && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                  aria-label="Clear search"
                >
                  <X size={17} />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Desktop Table */}
        <section className="hidden overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-[0_16px_50px_rgba(15,23,42,0.06)] lg:block">
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
            <div>
              <h2 className="text-lg font-extrabold text-[#26211e]">
                Organization List
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                {loading
                  ? "Loading organization information..."
                  : `${organizations.length} organization${
                      organizations.length === 1 ? "" : "s"
                    } found`}
              </p>
            </div>

            <button
              type="button"
              onClick={fetchOrganizations}
              disabled={loading}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-xs font-bold text-gray-600 transition hover:border-orange-200 hover:[#FC6C26] hover:text-[#ff6418] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCcw
                size={15}
                className={loading ? "animate-spin" : ""}
              />
              Refresh
            </button>
          </div>

          {loading ? (
            <TableSkeleton />
          ) : organizations.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px]">
                <thead>
                  <tr className="border-b border-gray-100 bg-[#fcfaf8]">
                    <th className="px-6 py-4 text-left text-[11px] font-extrabold uppercase tracking-[0.12em] text-gray-400">
                      ID
                    </th>

                    <th className="px-6 py-4 text-left text-[11px] font-extrabold uppercase tracking-[0.12em] text-gray-400">
                      Organization
                    </th>

                    <th className="px-6 py-4 text-left text-[11px] font-extrabold uppercase tracking-[0.12em] text-gray-400">
                      Email
                    </th>

                    <th className="px-6 py-4 text-left text-[11px] font-extrabold uppercase tracking-[0.12em] text-gray-400">
                      Phone
                    </th>

                    <th className="px-6 py-4 text-center text-[11px] font-extrabold uppercase tracking-[0.12em] text-gray-400">
                      Total Cards
                    </th>

                    <th className="px-6 py-4 text-center text-[11px] font-extrabold uppercase tracking-[0.12em] text-gray-400">
                      Active
                    </th>

                    <th className="px-6 py-4 text-center text-[11px] font-extrabold uppercase tracking-[0.12em] text-gray-400">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {organizations.map((org) => (
                    <tr
                      key={org.id}
                      className="group border-b border-gray-100 transition last:border-b-0 hover:bg-[#fffaf6]"
                    >
                      <td className="px-6 py-5">
                        <span className="inline-flex min-w-[42px] items-center justify-center rounded-xl border border-gray-100 bg-gray-50 px-3 py-2 text-xs font-extrabold text-gray-500">
                          #{org.id}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff8b3d] to-[#f4510b] text-sm font-extrabold text-white shadow-[0_7px_16px_rgba(255,100,24,0.22)]">
                            {org.name?.charAt(0)?.toUpperCase() || "O"}
                          </div>

                          <div className="min-w-0">
                            <p className="max-w-[220px] truncate text-sm font-extrabold text-[#2a2522]">
                              {org.name || "Unnamed Organization"}
                            </p>

                            <p className="mt-1 text-[11px] font-medium text-gray-400">
                              Organization ID: {org.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail
                            size={15}
                            className="flex-shrink-0 text-gray-400"
                          />

                          <span className="max-w-[220px] truncate">
                            {org.email || "Not available"}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone
                            size={15}
                            className="flex-shrink-0 text-gray-400"
                          />

                          <span>{org.phone || "Not available"}</span>
                        </div>
                      </td>

                      <td className="px-6 py-5 text-center">
                        <span className="inline-flex min-w-[54px] items-center justify-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-extrabold text-blue-700">
                          {org.total_cards || 0}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-center">
                        <span className="inline-flex min-w-[54px] items-center justify-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-extrabold text-emerald-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          {org.active_cards || 0}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-center">
                        <button
                          type="button"
                          onClick={() => handleEdit(org)}
                          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#FC6C26] [#FC6C26] px-4 text-xs font-extrabold text-[#ff6418] transition hover:border-[#ff6418] hover:bg-[#ff6418] hover:text-white"
                        >
                          <Edit3 size={15} />
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState
              searchTerm={searchTerm}
              onAdd={handleAddOrganization}
              onClear={clearSearch}
            />
          )}
        </section>

        {/* Mobile and Tablet Cards */}
        <section className="space-y-4 lg:hidden">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-[#26211e]">
                Organization List
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                {loading
                  ? "Loading organizations..."
                  : `${organizations.length} organization${
                      organizations.length === 1 ? "" : "s"
                    } found`}
              </p>
            </div>

            <button
              type="button"
              onClick={fetchOrganizations}
              disabled={loading}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:border-orange-200 hover:[#FC6C26] hover:text-[#ff6418] disabled:opacity-60"
              aria-label="Refresh organizations"
            >
              <RefreshCcw
                size={17}
                className={loading ? "animate-spin" : ""}
              />
            </button>
          </div>

          {loading ? (
            <MobileCardSkeleton />
          ) : organizations.length > 0 ? (
            organizations.map((org) => (
              <article
                key={org.id}
                className="overflow-hidden rounded-[24px] border border-gray-100 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.06)]"
              >
                <div className="border-b border-gray-100 bg-gradient-to-br from-[#fffaf6] to-white p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff8b3d] to-[#f4510b] text-base font-extrabold text-white shadow-[0_7px_16px_rgba(255,100,24,0.22)]">
                        {org.name?.charAt(0)?.toUpperCase() || "O"}
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate text-base font-extrabold text-[#292522]">
                          {org.name || "Unnamed Organization"}
                        </h3>

                        <p className="mt-1 text-xs font-medium text-gray-400">
                          Organization ID: #{org.id}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleEdit(org)}
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-[#FC6C26] [#FC6C26] text-[#ff6418] transition hover:bg-[#ff6418] hover:text-white"
                      aria-label={`Edit ${org.name || "organization"}`}
                    >
                      <Edit3 size={17} />
                    </button>
                  </div>
                </div>

                <div className="space-y-3 p-4">
                  <MobileInfoRow
                    icon={Mail}
                    label="Email"
                    value={org.email || "Not available"}
                  />

                  <MobileInfoRow
                    icon={Phone}
                    label="Phone"
                    value={org.phone || "Not available"}
                  />

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-3">
                      <div className="flex items-center gap-2 text-blue-600">
                        <CreditCard size={16} />

                        <span className="text-[10px] font-extrabold uppercase tracking-wider">
                          Total Cards
                        </span>
                      </div>

                      <p className="mt-2 text-2xl font-black text-blue-700">
                        {org.total_cards || 0}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-3">
                      <div className="flex items-center gap-2 text-emerald-600">
                        <CheckCircle2 size={16} />

                        <span className="text-[10px] font-extrabold uppercase tracking-wider">
                          Active
                        </span>
                      </div>

                      <p className="mt-2 text-2xl font-black text-emerald-700">
                        {org.active_cards || 0}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleEdit(org)}
                    className="mt-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-[#fff0e8] text-sm font-extrabold text-[#ff6418] transition hover:bg-[#ff6418] hover:text-white active:scale-[0.98]"
                  >
                    <Edit3 size={16} />
                    Edit Organization
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="overflow-hidden rounded-[24px] border border-gray-100 bg-white shadow-sm">
              <EmptyState
                searchTerm={searchTerm}
                onAdd={handleAddOrganization}
                onClear={clearSearch}
              />
            </div>
          )}
        </section>
      </div>

      {/* Drawer */}
      <OrganizationDrawer
        isOpen={drawerOpen}
        onClose={handleCloseDrawer}
        organization={editingOrg}
        onSuccess={handleSuccess}
      />
    </EmployeeLayout>
  );
}

function SummaryCard({
  title,
  value,
  icon: Icon,
  loading,
  iconClass,
}) {
  return (
    <div className="group rounded-[24px] border border-gray-100 bg-white p-5 shadow-[0_12px_36px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(15,23,42,0.09)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-gray-400">
            {title}
          </p>

          {loading ? (
            <div className="mt-3 h-9 w-20 animate-pulse rounded-xl bg-gray-100" />
          ) : (
            <p className="mt-2 text-3xl font-black tracking-tight text-[#292522]">
              {value}
            </p>
          )}
        </div>

        <div
          className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl ${iconClass}`}
        >
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
}

function MobileInfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-[#fcfcfc] p-3">
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white text-gray-400 shadow-sm">
        <Icon size={16} />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
          {label}
        </p>

        <p className="mt-1 break-all text-sm font-semibold text-gray-700">
          {value}
        </p>
      </div>
    </div>
  );
}

function EmptyState({ searchTerm, onAdd, onClear }) {
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center px-5 py-12 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-[26px] bg-gradient-to-br from-orange-50 to-[#fff0e7] text-[#ff6418]">
        <UsersRound size={35} />
      </div>

      <h3 className="mt-5 text-xl font-black text-[#292522]">
        No organizations found
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-gray-400">
        {searchTerm
          ? `No organization matches “${searchTerm}”. Try another search term.`
          : "There are no organizations available yet. Add your first organization to get started."}
      </p>

      <div className="mt-6 flex w-full max-w-sm flex-col gap-3 sm:flex-row sm:justify-center">
        {searchTerm && (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 text-sm font-bold text-gray-600 transition hover:bg-gray-50"
          >
            <X size={16} />
            Clear Search
          </button>
        )}

        <button
          type="button"
          onClick={onAdd}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-[#ff6418] px-5 text-sm font-extrabold text-white shadow-[0_10px_22px_rgba(255,100,24,0.25)] transition hover:bg-[#ed5711]"
        >
          <Plus size={17} />
          Add Organization
        </button>
      </div>
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="p-6">
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="grid animate-pulse grid-cols-[60px_1.5fr_1.5fr_1fr_100px_100px_100px] items-center gap-5 rounded-2xl border border-gray-100 p-4"
          >
            <div className="h-8 rounded-lg bg-gray-100" />

            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-gray-100" />

              <div className="flex-1 space-y-2">
                <div className="h-3 w-3/4 rounded bg-gray-100" />
                <div className="h-2.5 w-1/2 rounded bg-gray-100" />
              </div>
            </div>

            <div className="h-3 rounded bg-gray-100" />
            <div className="h-3 rounded bg-gray-100" />
            <div className="h-7 rounded-full bg-gray-100" />
            <div className="h-7 rounded-full bg-gray-100" />
            <div className="h-9 rounded-xl bg-gray-100" />
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileCardSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="animate-pulse overflow-hidden rounded-[24px] border border-gray-100 bg-white p-4 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gray-100" />

            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 rounded bg-gray-100" />
              <div className="h-3 w-1/3 rounded bg-gray-100" />
            </div>

            <div className="h-10 w-10 rounded-xl bg-gray-100" />
          </div>

          <div className="mt-5 space-y-3">
            <div className="h-14 rounded-2xl bg-gray-100" />
            <div className="h-14 rounded-2xl bg-gray-100" />

            <div className="grid grid-cols-2 gap-3">
              <div className="h-20 rounded-2xl bg-gray-100" />
              <div className="h-20 rounded-2xl bg-gray-100" />
            </div>

            <div className="h-11 rounded-2xl bg-gray-100" />
          </div>
        </div>
      ))}
    </div>
  );
}