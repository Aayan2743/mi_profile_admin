
// //src/pages/organizations/CardsView.jsx
// import { useState, useMemo } from "react";

// import {
//   ArrowLeft,
//   Search,
//   QrCode,
//   ToggleLeft,
//   ToggleRight,
//   X,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import AdminLayout from "../../components/layout/AdminLayout";
// import { CardTemplatePremium } from "./CardTemplates"; // ✅ adjust path if needed

// export default function CardsView() {
//   const navigate = useNavigate();

//   /* ---------------- ORGANIZATION DATA ---------------- */
//   const organization = {
//     name: "ABC Corporation",
//     email: "contact@abccorp.com",
//     phone: "+91 98765 43210",
//     logo: "/logo.png",
//     cover: "/cover.jpg",
//   };

//   /* ---------------- CARD DATA ---------------- */
//   const [cards, setCards] = useState([
//     {
//       id: 1,
//       card_no: "CARD-0001",
//       name: "Rahul Sharma",
//       email: "rahul@gmail.com",
//       status: "Active",
//       expiry: "2026-02-14",
//     },
//     {
//       id: 2,
//       card_no: "CARD-0002",
//       name: "Amit Verma",
//       email: "amit@gmail.com",
//       status: "Inactive",
//       expiry: "2026-02-14",
//     },
//     {
//       id: 3,
//       card_no: "CARD-0003",
//       name: "Sneha Patel",
//       email: "sneha@gmail.com",
//       status: "Expired",
//       expiry: "2025-01-31",
//     },
//   ]);

//   /* ---------------- UI STATE ---------------- */
//   const [search, setSearch] = useState("");
//   const [status, setStatus] = useState("all");
//   const [page, setPage] = useState(1);
//   const [selectedCard, setSelectedCard] = useState(null);

//   const ITEMS_PER_PAGE = 5;

//   /* ---------------- FILTERING ---------------- */
//   const filteredCards = useMemo(() => {
//     return cards.filter((c) => {
//       const matchSearch =
//         c.card_no.toLowerCase().includes(search.toLowerCase()) ||
//         c.name.toLowerCase().includes(search.toLowerCase()) ||
//         c.email.toLowerCase().includes(search.toLowerCase());

//       const matchStatus = status === "all" || c.status === status;

//       return matchSearch && matchStatus;
//     });
//   }, [cards, search, status]);

//   const totalPages = Math.ceil(filteredCards.length / ITEMS_PER_PAGE);
//   const paginatedCards = filteredCards.slice(
//     (page - 1) * ITEMS_PER_PAGE,
//     page * ITEMS_PER_PAGE
//   );

//   /* ---------------- TOGGLE STATUS ---------------- */
//   const toggleStatus = (id) => {
//     setCards((prev) =>
//       prev.map((c) =>
//         c.id === id && c.status !== "Expired"
//           ? {
//               ...c,
//               status: c.status === "Active" ? "Inactive" : "Active",
//             }
//           : c
//       )
//     );
//   };

//   /* ---------------- MAP TABLE CARD → CARD TEMPLATE DATA ---------------- */
//   const buildCardData = (card) => ({
//     name: card.name,
//     role: "Employee",
//     phone: organization.phone,
//     email: card.email,
//     website: "https://example.com",

//     company: organization.name,
//     address: "Bangalore, India",

//     services: ["Digital Business Card", "Networking", "Lead Management"],

//     communities: [
//       {
//         name: "WhatsApp",
//         image: "/community/whatsapp.png",
//         url: "https://chat.whatsapp.com/xxxx",
//       },
//       {
//         name: "Telegram",
//         image: "/community/telegram.png",
//         url: "https://t.me/xxxx",
//       },
//       {
//         name: "Discord",
//         image: "/community/discord.png",
//         url: "https://discord.gg/xxxx",
//       },
//     ],
//   });

//   return (
//     <AdminLayout>
//       {/* BACK */}
//       <button
//         onClick={() => navigate(-1)}
//         className="flex items-center gap-2 text-gray-600 mb-4 hover:text-indigo-600"
//       >
//         <ArrowLeft size={18} />
//         Back
//       </button>

//       {/* ORG HEADER */}
//       <div className="relative mb-24">
//         <img
//           src={organization.cover}
//           className="w-full h-56 object-cover rounded-2xl"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl" />
//         <div className="absolute left-6 -bottom-16 bg-white rounded-2xl shadow-xl p-5 flex gap-4">
//           <img
//             src={organization.logo}
//             className="w-20 h-20 rounded-xl border"
//           />
//           <div>
//             <h2 className="text-2xl font-bold">{organization.name}</h2>
//             <p className="text-sm text-gray-500">{organization.email}</p>
//             <p className="text-sm text-gray-500">{organization.phone}</p>
//           </div>
//         </div>
//       </div>

//       {/* FILTER BAR */}
//       <div className="flex flex-wrap gap-4 justify-between mb-4">
//         <div className="flex items-center gap-2 border rounded-xl px-3 py-2 bg-white shadow-sm">
//           <Search size={16} className="text-gray-400" />
//           <input
//             placeholder="Search card, name, email..."
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setPage(1);
//             }}
//             className="outline-none text-sm w-64"
//           />
//         </div>

//         <select
//           value={status}
//           onChange={(e) => {
//             setStatus(e.target.value);
//             setPage(1);
//           }}
//           className="border rounded-xl px-4 py-2 text-sm bg-white shadow-sm"
//         >
//           <option value="all">All Status</option>
//           <option value="Active">Active</option>
//           <option value="Inactive">Inactive</option>
//           <option value="Expired">Expired</option>
//         </select>
//       </div>

//       {/* TABLE */}
//       <div className="bg-white rounded-2xl shadow overflow-hidden">
//         <table className="min-w-full text-sm">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="p-4 text-left">Card No</th>
//               <th className="p-4 text-left">User</th>
//               <th className="p-4 text-left">Email</th>
//               <th className="p-4 text-center">Expiry</th>
//               <th className="p-4 text-center">Status</th>
//               <th className="p-4 text-center">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {paginatedCards.map((c) => (
//               <tr key={c.id} className="border-t hover:bg-gray-50">
//                 <td className="p-4 font-medium">{c.card_no}</td>
//                 <td className="p-4">{c.name}</td>
//                 <td className="p-4">{c.email}</td>
//                 <td className="p-4 text-center">{c.expiry}</td>

//                 <td className="p-4 text-center">
//                   <span
//                     className={`px-3 py-1 rounded-full text-xs font-medium ${
//                       c.status === "Active"
//                         ? "bg-green-100 text-green-600"
//                         : c.status === "Inactive"
//                         ? "bg-yellow-100 text-yellow-600"
//                         : "bg-red-100 text-red-600"
//                     }`}
//                   >
//                     {c.status}
//                   </span>
//                 </td>

//                 <td className="p-4 text-center">
//                   <div className="flex justify-center gap-3">
//                     <button
//                       disabled={c.status === "Expired"}
//                       onClick={() => toggleStatus(c.id)}
//                       className="text-indigo-600 disabled:opacity-40"
//                     >
//                       {c.status === "Active" ? (
//                         <ToggleRight size={20} />
//                       ) : (
//                         <ToggleLeft size={20} />
//                       )}
//                     </button>

//                     <button
//                       onClick={() => setSelectedCard(c)}
//                       className="text-gray-600 hover:text-indigo-600"
//                       title="View Card"
//                     >
//                       <QrCode size={18} />
//                     </button>

//                     <button
//                       onClick={() =>
//                         navigate(`/organizations/cards/${c.id}/view`)
//                       }
//                       className="text-gray-600 hover:text-indigo-600"
//                       title="Show Card"
//                     >
//                       <QrCode size={18} />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* CARD PREVIEW MODAL */}
//       {/* {selectedCard && (
//         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
//           <div className="relative max-w-md w-full">
//             <button
//               onClick={() => setSelectedCard(null)}
//               className="absolute -top-4 -right-4 bg-white w-9 h-9 rounded-full shadow
//                          flex items-center justify-center hover:bg-gray-100 z-50"
//             >
//               <X size={18} />
//             </button>

//             <CardTemplatePremium data={buildCardData(selectedCard)} />
//           </div>
//         </div>
//       )} */}

//       {selectedCard && (
//         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
//           <div className="bg-white rounded-2xl shadow-xl w-[360px] p-6 relative">
//             <button
//               onClick={() => setSelectedCard(null)}
//               className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
//             >
//               <X size={18} />
//             </button>

//             <div className="text-center space-y-4">
//               <h3 className="text-lg font-semibold">Card Preview</h3>

//               {/* FAKE QR */}
//               <div className="w-40 h-40 mx-auto bg-gray-100 flex items-center justify-center rounded-xl">
//                 <QrCode size={80} className="text-gray-500" />
//               </div>

//               <div>
//                 <p className="font-medium">{selectedCard.card_no}</p>
//                 <p className="text-sm text-gray-500">{selectedCard.name}</p>
//                 <p className="text-sm text-gray-500">{selectedCard.email}</p>
//               </div>

//               <span
//                 className={`inline-block px-3 py-1 rounded-full text-xs ${
//                   selectedCard.status === "Active"
//                     ? "bg-green-100 text-green-600"
//                     : selectedCard.status === "Inactive"
//                     ? "bg-yellow-100 text-yellow-600"
//                     : "bg-red-100 text-red-600"
//                 }`}
//               >
//                 {selectedCard.status}
//               </span>
//             </div>
//           </div>
//         </div>
//       )}
//     </AdminLayout>
//   );
// }
// src/pages/organizations/CardsView.jsx
import { useState, useMemo } from "react";
import {
  ArrowLeft,
  Search,
  QrCode,
  ToggleLeft,
  ToggleRight,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import { CardTemplatePremium } from "./CardTemplates"; // uncomment when ready

export default function CardsView() {
  const navigate = useNavigate();

  /* ---------------- ORGANIZATION DATA ---------------- */
  const organization = {
    name: "ABC Corporation",
    email: "contact@abccorp.com",
    phone: "+91 98765 43210",
    logo: "/logo.png",
    cover: "/cover.jpg",
  };

  /* ---------------- CARD DATA ---------------- */
  const [cards, setCards] = useState([
    {
      id: 1,
      card_no: "CARD-0001",
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      status: "Active",
      expiry: "2026-02-14",
    },
    {
      id: 2,
      card_no: "CARD-0002",
      name: "Amit Verma",
      email: "amit@gmail.com",
      status: "Inactive",
      expiry: "2026-02-14",
    },
    {
      id: 3,
      card_no: "CARD-0003",
      name: "Sneha Patel",
      email: "sneha@gmail.com",
      status: "Expired",
      expiry: "2025-01-31",
    },
  ]);

  /* ---------------- UI STATE ---------------- */
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [selectedCard, setSelectedCard] = useState(null);

  const ITEMS_PER_PAGE = 5;

  /* ---------------- FILTERING ---------------- */
  const filteredCards = useMemo(() => {
    return cards.filter((c) => {
      const matchSearch =
        c.card_no.toLowerCase().includes(search.toLowerCase()) ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase());

      const matchStatus = status === "all" || c.status === status;

      return matchSearch && matchStatus;
    });
  }, [cards, search, status]);

  const totalPages = Math.ceil(filteredCards.length / ITEMS_PER_PAGE);
  const paginatedCards = filteredCards.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  /* ---------------- TOGGLE STATUS ---------------- */
  const toggleStatus = (id) => {
    setCards((prev) =>
      prev.map((c) =>
        c.id === id && c.status !== "Expired"
          ? {
              ...c,
              status: c.status === "Active" ? "Inactive" : "Active",
            }
          : c
      )
    );
  };

  /* ---------------- MAP TABLE CARD → CARD TEMPLATE DATA ---------------- */
  const buildCardData = (card) => ({
    name: card.name,
    role: "Employee",
    phone: organization.phone,
    email: card.email,
    website: "https://example.com",
    company: organization.name,
    address: "Bangalore, India",
    services: ["Digital Business Card", "Networking", "Lead Management"],
    communities: [
      { name: "WhatsApp", image: "/community/whatsapp.png", url: "https://chat.whatsapp.com/xxxx" },
      { name: "Telegram", image: "/community/telegram.png", url: "https://t.me/xxxx" },
      { name: "Discord", image: "/community/discord.png", url: "https://discord.gg/xxxx" },
    ],
  });

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--accent))] mb-8 transition-colors duration-200"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* ORG HEADER / COVER */}
        <div className="relative mb-16 md:mb-20">
          <img
            src={organization.cover}
            alt="cover"
            className="w-full h-64 md:h-80 lg:h-96 rounded-2xl object-cover shadow-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent rounded-2xl" />

          <div className="absolute left-6 md:left-8 -bottom-20 md:-bottom-24 bg-[hsl(var(--card-bg))] rounded-2xl shadow-2xl p-5 md:p-6 flex items-center gap-5 border border-[hsl(var(--border))]">
            <img
              src={organization.logo}
              alt="Organization Logo"
              className="w-20 h-20 md:w-24 md:h-24 rounded-xl border border-[hsl(var(--border))] object-cover"
            />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[hsl(var(--text-primary))]">
                {organization.name}
              </h2>
              <p className="text-sm text-[hsl(var(--text-muted))] mt-1">{organization.email}</p>
              <p className="text-sm text-[hsl(var(--text-muted))]">{organization.phone}</p>
            </div>
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-between items-start sm:items-center mb-8">
          {/* Search */}
          <div className="relative w-full sm:w-80">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[hsl(var(--text-muted))]"
            />
            <input
              placeholder="Search card, name, email..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-[hsl(var(--border))] 
                         bg-[hsl(var(--card-bg))] text-[hsl(var(--text-primary))] 
                         placeholder-[hsl(var(--text-muted))] 
                         focus:border-[hsl(var(--accent))] focus:ring-2 focus:ring-[hsl(var(--accent)/0.3)] 
                         outline-none transition-all"
            />
          </div>

          {/* Status Filter */}
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="w-full sm:w-auto px-4 py-3 rounded-xl border border-[hsl(var(--border))] 
                       bg-[hsl(var(--card-bg))] text-[hsl(var(--text-primary))]
                       focus:border-[hsl(var(--accent))] focus:ring-2 focus:ring-[hsl(var(--accent)/0.3)] 
                       outline-none transition-all"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Expired">Expired</option>
          </select>
        </div>

        {/* TABLE */}
        <div className="bg-[hsl(var(--card-bg))] rounded-2xl shadow-2xl overflow-hidden border border-[hsl(var(--border))]">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm divide-y divide-[hsl(var(--border))]">
              <thead className="bg-[hsl(var(--bg-secondary)/0.6)]">
                <tr>
                  <th className="p-5 text-left text-xs font-semibold text-[hsl(var(--text-muted))] uppercase tracking-wider">
                    Card No
                  </th>
                  <th className="p-5 text-left text-xs font-semibold text-[hsl(var(--text-muted))] uppercase tracking-wider">
                    User
                  </th>
                  <th className="p-5 text-left text-xs font-semibold text-[hsl(var(--text-muted))] uppercase tracking-wider">
                    Email
                  </th>
                  <th className="p-5 text-center text-xs font-semibold text-[hsl(var(--text-muted))] uppercase tracking-wider">
                    Expiry
                  </th>
                  <th className="p-5 text-center text-xs font-semibold text-[hsl(var(--text-muted))] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="p-5 text-center text-xs font-semibold text-[hsl(var(--text-muted))] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {paginatedCards.map((c) => (
                  <tr
                    key={c.id}
                    className="hover:bg-[hsl(var(--accent)/0.08)] transition-colors"
                  >
                    <td className="p-5 font-medium text-[hsl(var(--text-primary))]">{c.card_no}</td>
                    <td className="p-5 text-[hsl(var(--text-primary))]">{c.name}</td>
                    <td className="p-5 text-[hsl(var(--text-secondary))]">{c.email}</td>
                    <td className="p-5 text-center text-[hsl(var(--text-secondary))]">{c.expiry}</td>

                    <td className="p-5 text-center">
                      <span
                        className={`px-4 py-1.5 rounded-full text-xs font-medium border
                          ${c.status === "Active"
                            ? "bg-emerald-900/40 text-emerald-400 border-emerald-700/30"
                            : c.status === "Inactive"
                            ? "bg-amber-900/40 text-amber-400 border-amber-700/30"
                            : "bg-rose-900/40 text-rose-400 border-rose-700/30"}`}
                      >
                        {c.status}
                      </span>
                    </td>

                    <td className="p-5 text-center">
                      <div className="flex justify-center gap-4">
                        <button
                          disabled={c.status === "Expired"}
                          onClick={() => toggleStatus(c.id)}
                          className="text-[hsl(var(--accent))] disabled:opacity-40 transition-opacity"
                          title="Toggle status"
                        >
                          {c.status === "Active" ? (
                            <ToggleRight size={22} />
                          ) : (
                            <ToggleLeft size={22} />
                          )}
                        </button>

                        <button
                          onClick={() => setSelectedCard(c)}
                          className="text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--accent))] transition-colors"
                          title="View Card Preview"
                        >
                          <QrCode size={20} />
                        </button>

                        <button
                          onClick={() => navigate(`/organizations/cards/${c.id}/view`)}
                          className="text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--accent))] transition-colors"
                          title="Show Full Card"
                        >
                          <QrCode size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="flex justify-between items-center px-6 py-4 border-t border-[hsl(var(--border))] text-sm text-[hsl(var(--text-muted))]">
            <p>
              Showing {paginatedCards.length} of {filteredCards.length} cards
            </p>
            <div className="flex gap-3">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-4 py-2 rounded-lg border border-[hsl(var(--border))] disabled:opacity-50 hover:bg-[hsl(var(--accent)/0.1)] transition"
              >
                Previous
              </button>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-4 py-2 rounded-lg border border-[hsl(var(--border))] disabled:opacity-50 hover:bg-[hsl(var(--accent)/0.1)] transition"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* CARD PREVIEW MODAL */}
        {selectedCard && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-[hsl(var(--card-bg))] rounded-2xl shadow-2xl w-full max-w-md md:max-w-lg relative border border-[hsl(var(--border))]">
              <button
                onClick={() => setSelectedCard(null)}
                className="absolute -top-4 -right-4 bg-[hsl(var(--card-bg))] w-10 h-10 rounded-full shadow-lg flex items-center justify-center hover:bg-[hsl(var(--accent)/0.15)] text-[hsl(var(--text-secondary))] transition z-10 border border-[hsl(var(--border))]"
              >
                <X size={20} />
              </button>

              <div className="p-6 md:p-8 text-center space-y-6">
                <h3 className="text-xl md:text-2xl font-bold text-[hsl(var(--text-primary))]">
                  Card Preview
                </h3>

                {/* Fake QR Placeholder */}
                <div className="w-48 h-48 md:w-64 md:h-64 mx-auto bg-[hsl(var(--bg-secondary))] flex items-center justify-center rounded-2xl border border-[hsl(var(--border))] shadow-inner">
                  <QrCode size={120} className="text-[hsl(var(--text-muted))]" />
                </div>

                <div className="space-y-2">
                  <p className="font-semibold text-lg text-[hsl(var(--text-primary))]">
                    {selectedCard.card_no}
                  </p>
                  <p className="text-[hsl(var(--text-secondary))]">{selectedCard.name}</p>
                  <p className="text-sm text-[hsl(var(--text-muted))]">{selectedCard.email}</p>
                </div>

                <span
                  className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium border
                    ${selectedCard.status === "Active"
                      ? "bg-emerald-900/40 text-emerald-400 border-emerald-700/30"
                      : selectedCard.status === "Inactive"
                      ? "bg-amber-900/40 text-amber-400 border-amber-700/30"
                      : "bg-rose-900/40 text-rose-400 border-rose-700/30"}`}
                >
                  {selectedCard.status}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}