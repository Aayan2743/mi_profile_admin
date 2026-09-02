// src/pages/organizations/OrganizationList.jsx  → Rename to StaffList.jsx later
import { useState, useEffect } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { errorAlert } from "../../utils/alert";
import Loader from "../../components/Loader";
import AddStaff from "./AddStaff";
import EditStaff from "./EditStaff";

export default function Staff() {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState(null);
  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

  const navigate = useNavigate();

  // Fetch Staff List
  const fetchStaff = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get("/orginazation-dashboard/list-staff", {
        params: {
          page,
          per_page: perPage,
          search,
        },
      });

      const data = res.data.data; // Laravel pagination structure
      setStaffList(data.data || []);
      setPagination(data);
      setCurrentPage(data.current_page);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to load staff list";
      setError(msg);
      errorAlert("Error", msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff(currentPage);
  }, [currentPage, perPage, search]);

  // Refresh list after adding new staff
  const handleStaffAdded = () => {
    setShowDrawer(false);
    fetchStaff(1);
  };

  return (
    <AdminLayout>
      <div className="w-full max-w-full overflow-x-hidden pb-20 lg:pb-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[hsl(var(--text-primary))]">
            Staff Members
          </h2>

          <button
            onClick={() => setShowDrawer(true)}
            className="w-full sm:w-auto bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-dark))] text-white px-5 py-2.5 rounded-xl font-medium shadow-md transition-all"
          >
            + Add New Staff
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader show text="Loading Staff..." />
          </div>
        ) : error ? (
          <div className="text-center py-12 px-4 bg-red-50 rounded-2xl border border-red-200">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => fetchStaff(1)}
              className="px-6 py-2 bg-red-600 text-white rounded-xl"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="bg-[hsl(var(--card-bg))] rounded-2xl shadow-xl overflow-hidden border border-[hsl(var(--border))]">
            {/* Search & Filter Bar */}
            <div className="p-4 sm:p-5 border-b border-[hsl(var(--border))] flex flex-col lg:flex-row justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <input
                  type="text"
                  placeholder="Search staff by name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full sm:w-80 px-4 py-2.5 rounded-xl border border-[hsl(var(--border))] focus:ring-2 focus:ring-[hsl(var(--accent))]"
                />
                <button
                  onClick={() => fetchStaff(1)}
                  className="bg-[hsl(var(--accent))] text-white px-5 py-2.5 rounded-xl hover:bg-[hsl(var(--accent-dark))]"
                >
                  Search
                </button>
              </div>

              <div className="flex items-center gap-3 text-sm text-[hsl(var(--text-muted))]">
                <span>Show</span>
                <select
                  value={perPage}
                  onChange={(e) => {
                    setPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="border border-[hsl(var(--border))] rounded-xl px-3 py-2"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                </select>
                <span>entries</span>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[hsl(var(--border))]">
                <thead className="bg-[hsl(var(--bg-secondary)/0.6)]">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                      Phone
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                      Designation
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase">
                      Department
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[hsl(var(--border))]">
                  {staffList.map((staff) => (
                    <tr
                      key={staff.id}
                      className="hover:bg-[hsl(var(--accent)/0.05)]"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {staff.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">
                        {staff.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-[hsl(var(--text-secondary))]">
                        {staff.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {staff.phone ? `+91 ${staff.phone}` : "—"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {staff.designation || "—"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {staff.department || "—"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${staff.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                        >
                          {staff.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <button
                          onClick={() => {
                            // Open edit drawer (you need to manage edit state)
                            setEditingStaff(staff);
                            setShowEditDrawer(true);
                          }}
                          className="text-blue-600 hover:underline mr-4"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination && (
              <div className="p-4 border-t flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
                <div>
                  Showing <span className="font-medium">{pagination.from}</span>{" "}
                  to <span className="font-medium">{pagination.to}</span> of{" "}
                  <span className="font-medium">{pagination.total}</span>{" "}
                  results
                </div>

                <div className="flex gap-2">
                  <button
                    disabled={!pagination.prev_page_url}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="px-4 py-2 border rounded-lg disabled:opacity-50"
                  >
                    Prev
                  </button>
                  <span className="px-4 py-2 bg-[hsl(var(--accent))] text-white rounded-lg">
                    {pagination.current_page}
                  </span>
                  <button
                    disabled={!pagination.next_page_url}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="px-4 py-2 border rounded-lg disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Add Staff Drawer */}
        {showDrawer && (
          <AddStaff
            onClose={() => setShowDrawer(false)}
            onSave={handleStaffAdded}
          />
        )}
        {/* Edit Staff Drawer */}
        {showEditDrawer && editingStaff && (
          <EditStaff
            staff={editingStaff}
            onClose={() => {
              setShowEditDrawer(false);
              setEditingStaff(null);
            }}
            onSave={() => {
              fetchStaff(currentPage);
              setShowEditDrawer(false);
              setEditingStaff(null);
            }}
          />
        )}
      </div>
    </AdminLayout>
  );
}
