//divya
// src/pages/organizations/OrganizationList.jsx
import { useState, useEffect } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import AddOrganization from "./AddOrganization";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { errorAlert } from "../../utils/alert";
import Loader from "../../components/Loader";

export default function OrganizationList() {
  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState(null);

  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);

  const navigate = useNavigate();

  const fetchOrganizations = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get("/orginazation-dashboard/organizations", {
        params: { page, per_page: perPage, search },
      });

      const paginated = res.data.data;
      setOrganizations(paginated.data || []);
      setPagination(paginated);
      setCurrentPage(paginated.current_page);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to load organizations";
      setError(msg);
      errorAlert("Error", msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations(currentPage);
  }, [currentPage, perPage, search]);

  const addOrganization = async (formData) => {
    try {
      const res = await api.post("/orginazation-dashboard/add-organization", {
        organization_name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
      });

      setShowDrawer(false);
      fetchOrganizations(1);

      return res.data;
    } catch (err) {
      if (err.response?.status === 422) {
        throw err;
      }

      errorAlert(
        "Failed",
        err.response?.data?.message || "Could not add organization",
      );

      throw err;
    }
  };

  return (
    <AdminLayout>
      <div className="w-full max-w-full overflow-x-hidden pb-20 lg:pb-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[hsl(var(--text-primary))]">
            Organizations
          </h2>

          <button
            onClick={() => setShowDrawer(true)}
            className="w-full sm:w-auto bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-dark))] active:bg-[hsl(var(--accent-dark)/0.9)] text-white px-5 py-2.5 rounded-xl font-medium shadow-md transition-all disabled:opacity-60"
          >
            + Add Organization
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader show text="Loading organizations..." />
          </div>
        ) : error ? (
          <div className="text-center py-12 sm:py-16 px-4 bg-[hsl(var(--accent)/0.08)] rounded-2xl border border-[hsl(var(--accent)/0.3)]">
            <p className="text-[hsl(var(--accent))] mb-4 font-medium break-words">
              {error}
            </p>
            <button
              onClick={() => fetchOrganizations(1)}
              className="px-6 py-2.5 bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-dark))] text-white rounded-xl transition"
            >
              Retry
            </button>
          </div>
        ) : organizations.length === 0 ? (
          <div className="text-center py-20 text-[hsl(var(--text-muted))]">
            No organizations found.
          </div>
        ) : (
          <div className="w-full max-w-full bg-[hsl(var(--card-bg))] rounded-2xl shadow-xl overflow-hidden border border-[hsl(var(--border))]">
            <div className="p-4 sm:p-5 border-b border-[hsl(var(--border))] flex flex-col lg:flex-row justify-between gap-4">
              <div className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <input
                  type="text"
                  placeholder="Search organizations..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full sm:w-72 px-4 py-2.5 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card-bg))] text-[hsl(var(--text-primary))] placeholder-[hsl(var(--text-muted))] focus:ring-2 focus:ring-[hsl(var(--accent)/0.4)] focus:border-[hsl(var(--accent))] outline-none transition"
                />

                <button
                  onClick={() => fetchOrganizations(1)}
                  className="w-full sm:w-auto bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-dark))] text-white px-5 py-2.5 rounded-xl font-medium transition"
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
                  className="border border-[hsl(var(--border))] rounded-xl px-3 py-2 bg-[hsl(var(--card-bg))] text-[hsl(var(--text-primary))] focus:ring-[hsl(var(--accent)/0.4)] focus:border-[hsl(var(--accent))]"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>

                <span>entries</span>
              </div>
            </div>

            <div className="w-full max-w-full overflow-x-auto">
              <table className="min-w-[900px] md:min-w-full divide-y divide-[hsl(var(--border))]">
                <thead className="bg-[hsl(var(--bg-secondary)/0.6)]">
                  <tr>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-[hsl(var(--text-muted))] uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-[hsl(var(--text-muted))] uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-[hsl(var(--text-muted))] uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-[hsl(var(--text-muted))] uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-center text-xs font-semibold text-[hsl(var(--text-muted))] uppercase tracking-wider">
                      Total Cards
                    </th>

                    <th className="px-4 sm:px-6 py-4 text-center text-xs font-semibold text-[hsl(var(--text-muted))] uppercase tracking-wider">
                      Total NFC Cards
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-center text-xs font-semibold text-[hsl(var(--text-muted))] uppercase tracking-wider">
                      Active
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-center text-xs font-semibold text-[hsl(var(--text-muted))] uppercase tracking-wider">
                      Inactive
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-right text-xs font-semibold text-[hsl(var(--text-muted))] uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[hsl(var(--border))]">
                  {organizations.map((org) => (
                    <tr
                      key={org.id}
                      className="hover:bg-[hsl(var(--accent)/0.08)] transition-colors"
                    >
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-[hsl(var(--text-primary))]">
                        {org.id}
                      </td>

                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-[hsl(var(--text-primary))]">
                        {org.name || org.organization_name || "—"}
                      </td>

                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-[hsl(var(--text-secondary))]">
                        {org.email || "—"}
                      </td>

                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-[hsl(var(--text-secondary))]">
                        {org.phone ? `+91 ${org.phone}` : "—"}
                      </td>

                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-[hsl(var(--text-primary))]">
                        {org.total_cards || 0}
                      </td>

                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-[hsl(var(--text-primary))]">
                        {org.nfc_card_count || 0}
                      </td>

                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-emerald-900 dark:text-emerald-400">
                        {org.active_cards || 0}
                      </td>

                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-rose-500 dark:text-rose-400">
                        {org.inactive_cards || 0}
                      </td>

                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm">
                        <button
                          onClick={() => navigate(`/organizations/${org.id}`)}
                          className="text-[hsl(var(--accent))] hover:text-[hsl(var(--accent-dark))] font-medium transition"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {pagination && (
              <div className="px-4 sm:px-6 py-4 border-t border-[hsl(var(--border))] flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-[hsl(var(--text-muted))]">
                <div className="text-center sm:text-left">
                  Showing <span className="font-medium">{pagination.from}</span>{" "}
                  to <span className="font-medium">{pagination.to}</span> of{" "}
                  <span className="font-medium">{pagination.total}</span>{" "}
                  results
                </div>

                <div className="flex items-center gap-2">
                  <button
                    disabled={!pagination.prev_page_url}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="px-4 py-2 rounded-lg border border-[hsl(var(--border))] disabled:opacity-50 hover:bg-[hsl(var(--accent)/0.1)] transition"
                  >
                    Prev
                  </button>

                  <span className="px-4 py-2 bg-[hsl(var(--accent))] text-white rounded-lg font-medium min-w-[40px] text-center">
                    {pagination.current_page}
                  </span>

                  <button
                    disabled={!pagination.next_page_url}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="px-4 py-2 rounded-lg border border-[hsl(var(--border))] disabled:opacity-50 hover:bg-[hsl(var(--accent)/0.1)] transition"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {showDrawer && (
          <AddOrganization
            onClose={() => setShowDrawer(false)}
            onSave={addOrganization}
          />
        )}
      </div>
    </AdminLayout>
  );
}
