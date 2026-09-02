import { useEffect, useState } from "react";
import { Eye, Search } from "lucide-react";

import AdminLayout from "../../components/layout/AdminLayout";
import Swal from "sweetalert2";
import api from "../../services/api";

export default function AdminNfcRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [open, setOpen] = useState(false);

  const [approvalStatus, setApprovalStatus] = useState("");
  const [rejectedReason, setRejectedReason] = useState("");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);

      const res = await api.get("/orginazation-dashboard/admin-nfc-requests");

      setRequests(res.data.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async () => {
    try {
      if (approvalStatus === "rejected" && !rejectedReason.trim()) {
        return Swal.fire({
          icon: "warning",
          title: "Rejection reason is required",
        });
      }

      const res = await api.put(
        `/orginazation-dashboard/admin-nfc-requests/${selectedRequest.id}`,
        {
          status: approvalStatus,
          rejected_reason: rejectedReason,
        },
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: res.data.message,
      });

      setOpen(false);
      fetchRequests();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Update failed",
      });
    }
  };

  const badgeClass = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      case "completed":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredRequests = requests.filter((item) => {
    const text = search.toLowerCase();

    const matchesSearch =
      item.organization?.name?.toLowerCase().includes(text) ||
      item.organization?.email?.toLowerCase().includes(text) ||
      item.card_link?.toLowerCase().includes(text);

    const matchesStatus = status === "" || item.status === status;

    return matchesSearch && matchesStatus;
  });
  return (
    <AdminLayout>
      <div className="bg-white rounded-2xl shadow border">
        {/* Header */}

        <div className="p-6 border-b flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">NFC Card Requests</h2>

            <p className="text-gray-500">Manage all NFC card requests.</p>
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <Search
                className="absolute left-3 top-3 text-gray-400"
                size={18}
              />

              <input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded-lg pl-10 pr-4 py-2"
              />
            </div>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border rounded-lg px-4 py-2"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Table */}

        {loading ? (
          <div className="p-10 text-center">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-5 py-4">#</th>
                  <th className="px-5 py-4">Organization</th>
                  <th className="px-5 py-4">Card URL</th>
                  <th className="px-5 py-4">Address</th>
                  <th className="px-5 py-4">Cards</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredRequests.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-10">
                      No NFC Requests Found
                    </td>
                  </tr>
                ) : (
                  filteredRequests.map((item, index) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="px-5 py-4">{index + 1}</td>

                      <td className="px-5 py-4">
                        <div className="font-semibold">
                          {item.organization?.name}
                        </div>

                        <div className="text-xs text-gray-500">
                          {item.organization?.email}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        {item.card_link ? (
                          <a
                            href={item.card_link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Open Card
                          </a>
                        ) : (
                          <span className="text-gray-400">Not Added</span>
                        )}
                      </td>

                      <td className="px-5 py-4">
                        {[item.address_line1, item.city, item.state]
                          .filter(Boolean)
                          .join(", ")}
                      </td>

                      <td className="px-5 py-4 text-center">
                        {item.purchase?.total_cards}
                      </td>

                      <td className="px-5 py-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeClass(
                            item.status,
                          )}`}
                        >
                          {item.status}
                        </span>
                      </td>

                      {/* <td className="px-5 py-4 text-center">
                        <button
                          onClick={() => {
                            setSelectedRequest(item);
                            setOpen(true);
                          }}
                          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
                        >
                          <Eye size={18} />
                        </button>
                      </td> */}

                      <td className="px-5 py-4 text-center">
                        <button
                          onClick={() => {
                            setSelectedRequest(item);
                            setApprovalStatus(item.status);
                            setRejectedReason(item.rejected_reason || "");
                            setOpen(true);
                          }}
                          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
                        >
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {open && selectedRequest && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b flex justify-between">
                <h2 className="text-xl font-bold">NFC Request</h2>

                <button onClick={() => setOpen(false)} className="text-2xl">
                  ×
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <strong>Organization</strong>
                  <p>{selectedRequest.organization.name}</p>
                </div>

                <div>
                  <strong>Card URL</strong>
                  <p>{selectedRequest.card_link}</p>
                </div>

                <div>
                  <strong>Address</strong>

                  <p>{selectedRequest.address_line1}</p>

                  <p>
                    {selectedRequest.city}, {selectedRequest.state}
                  </p>
                </div>

                <div>
                  <strong>Status</strong>

                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={() => setApprovalStatus("approved")}
                      className={`px-5 py-2 rounded-lg ${
                        approvalStatus === "approved"
                          ? "bg-green-600 text-white"
                          : "border border-green-600 text-green-600"
                      }`}
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => setApprovalStatus("rejected")}
                      className={`px-5 py-2 rounded-lg ${
                        approvalStatus === "rejected"
                          ? "bg-red-600 text-white"
                          : "border border-red-600 text-red-600"
                      }`}
                    >
                      Reject
                    </button>

                    <button
                      onClick={() => setApprovalStatus("completed")}
                      className={`px-5 py-2 rounded-lg ${
                        approvalStatus === "completed"
                          ? "bg-blue-600 text-white"
                          : "border border-blue-600 text-blue-600"
                      }`}
                    >
                      Completed
                    </button>
                  </div>
                </div>

                {approvalStatus === "rejected" && (
                  <div>
                    <label className="font-medium">Reject Reason</label>

                    <textarea
                      rows={4}
                      value={rejectedReason}
                      onChange={(e) => setRejectedReason(e.target.value)}
                      className="w-full mt-2 border rounded-lg p-3"
                    />
                  </div>
                )}
              </div>

              <div className="border-t p-6 flex justify-end gap-3">
                <button
                  onClick={() => setOpen(false)}
                  className="border px-6 py-2 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  onClick={updateStatus}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
