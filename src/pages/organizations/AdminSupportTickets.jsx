import AdminLayout from "../../components/layout/AdminLayout";
import { Eye, X, Send, Paperclip } from "lucide-react";
import Loader from "../../components/Loader";

import { useEffect, useState } from "react";
import api from "../../services/api";
// import api from "../../api/axios";

export default function AdminSupportTickets() {
  const [selectedTicket, setSelectedTicket] = useState(null);

  const [reply, setReply] = useState("");
  const [attachment, setAttachment] = useState(null);

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const getStatusClass = (status) => {
    if (status === "Resolved") {
      return "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-300";
    }
    if (status === "Pending") {
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-300";
    }
    if (status === "In Progress") {
      return "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300";
    }
    return "bg-orange-100 text-orange-600 dark:bg-orange-500/15 dark:text-orange-300";
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await api.get("/orginazation-dashboard/tickets");

      // If paginated
      setTickets(res.data.data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <Loader show={loading} text="Loading support tickets..." />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      
      <div className="p-4 md:p-6 lg:p-8">
        <div className="bg-[hsl(var(--card-bg))] rounded-3xl shadow-xl border border-[hsl(var(--border))] overflow-hidden">
          <div className="p-6 border-b border-[hsl(var(--border))] bg-[hsl(var(--bg-secondary)/0.5)]">
            <h1 className="text-2xl font-bold text-[hsl(var(--text-primary))]">
              Admin Support Tickets
            </h1>
            <p className="text-[hsl(var(--text-muted))] mt-1">
              View tickets raised from organization side
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px]">
              <thead>
                <tr className="bg-[hsl(var(--bg-secondary))] border-b border-[hsl(var(--border))]">
                  {[
                    "Ticket No",
                    "Organization",
                    "Department",
                    "Subject",
                    "Priority",
                    "Status",
                    "Created",
                    "Action",
                  ].map((head) => (
                    <th
                      key={head}
                      className={`p-4 text-sm font-semibold text-[hsl(var(--text-primary))] ${
                        head === "Action" ? "text-center" : "text-left"
                      }`}
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {tickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className="border-b border-[hsl(var(--border))] hover:bg-[hsl(var(--bg-secondary)/0.55)] transition"
                  >
                    <td className="p-4 text-sm font-medium text-[hsl(var(--text-primary))]">
                      {ticket.ticket_no}
                    </td>
                    <td className="p-4 text-sm text-[hsl(var(--text-secondary))]">
                      {ticket.user?.name}
                    </td>
                    <td className="p-4 text-sm text-[hsl(var(--text-secondary))]">
                      {ticket.department}
                    </td>
                    <td className="p-4 text-sm text-[hsl(var(--text-secondary))]">
                      {ticket.subject}
                    </td>
                    <td className="p-4 text-sm text-[hsl(var(--text-secondary))]">
                      {ticket.urgency}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(
                          ticket.status,
                        )}`}
                      >
                        {ticket.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-[hsl(var(--text-secondary))]">
                      {new Date(ticket.created_at)
                        .toLocaleDateString("en-GB")
                        .replace(/\//g, "-")}
                    </td>
                    <td className="p-4 text-center">
                      <button
                        type="button"
                        onClick={() => setSelectedTicket(ticket)}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-[hsl(var(--accent))] hover:bg-[hsl(var(--accent)/0.12)] transition"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedTicket && (
          <TicketModal
            ticket={selectedTicket}
            onClose={() => setSelectedTicket(null)}
            getStatusClass={getStatusClass}
          />
        )}
      </div>
    </AdminLayout>
  );
}

function TicketModal({ ticket, onClose, getStatusClass }) {
  const [status, setStatus] = useState(ticket.status);
  const [reply, setReply] = useState("");
  const [attachment, setAttachment] = useState(null);

  const saveReply = async () => {
    try {
      const formData = new FormData();

      formData.append("status", status);
      formData.append("message", reply);

      if (attachment) {
        formData.append("attachment", attachment);
      }

      await api.post(
        `/orginazation-dashboard/tickets/${ticket.id}/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      alert("Ticket updated successfully");
      onClose();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-[hsl(var(--card-bg))] rounded-3xl shadow-2xl border border-[hsl(var(--border))] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-[hsl(var(--border))] bg-[hsl(var(--bg-secondary)/0.5)]">
          <div>
            <h2 className="text-xl font-bold text-[hsl(var(--text-primary))]">
              Ticket Details
            </h2>
            <p className="text-sm text-[hsl(var(--text-muted))]">
              {ticket.ticket_no}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-[hsl(var(--text-primary))] hover:bg-[hsl(var(--bg-secondary))]"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Info label="Organization" value={ticket.user.name} />
            <Info label="Department" value={ticket.department} />
            <Info label="Related Product/Service" value={ticket.department} />
            <Info label="Priority" value={ticket.urgency} />
            <Info label="Urgency" value={ticket.urgency} />
            <Info
              label="Created"
              value={
                ticket.created_at
                  ? new Date(ticket.created_at)
                      .toLocaleDateString("en-GB")
                      .replace(/\//g, "-")
                  : "-"
              }
            />

            <div>
              <p className="text-xs font-semibold text-[hsl(var(--text-muted))] mb-1">
                Status
              </p>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(
                  status,
                )}`}
              >
                {status}
              </span>
            </div>
          </div>

          {ticket.department === "domain_integration" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-[hsl(var(--border))] pt-5">
              <Info
                label="Old Control Panel URL"
                value={ticket.control_panel_url}
              />
              <Info
                label="Control Panel Username"
                value={ticket.control_panel_username}
              />
              <Info
                label="Control Panel Password"
                value={ticket.control_panel_password}
              />
            </div>
          )}

          <div className="border-t border-[hsl(var(--border))] pt-5">
            <Info label="Subject" value={ticket.subject} />
          </div>

          <div>
            <p className="text-xs font-semibold text-[hsl(var(--text-muted))] mb-2">
              Message
            </p>
            <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--bg-secondary)/0.45)] p-4 text-sm leading-relaxed text-[hsl(var(--text-primary))]">
              {ticket.message}
            </div>

            <div className="border-t border-[hsl(var(--border))] pt-5">
              <h3 className="text-sm font-semibold text-[hsl(var(--text-primary))] mb-4">
                Conversation
              </h3>

              {ticket.replies?.length > 0 ? (
                ticket.replies.map((reply) => (
                  <div key={reply.id} className="rounded-2xl p-4 border mb-3">
                    <div className="flex justify-between">
                      <span className="font-semibold">
                        {reply.sender_type === "admin"
                          ? "Admin"
                          : reply.user?.name}
                      </span>

                      <span className="text-xs text-gray-500">
                        {new Date(reply.created_at).toLocaleString()}
                      </span>
                    </div>

                    <p className="mt-2">{reply.message}</p>

                    {reply.attachment_url && (
                      <a
                        href={reply.attachment_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500"
                      >
                        View Attachment
                      </a>
                    )}
                  </div>
                ))
              ) : (
                <p>No replies yet</p>
              )}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-[hsl(var(--text-muted))] mb-2">
              Attachment
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[hsl(var(--border))] text-[hsl(var(--text-primary))] bg-[hsl(var(--bg-secondary)/0.45)]">
              <Paperclip size={16} />
              <div className="flex flex-wrap gap-2">
                {ticket.attachments?.length > 0 ? (
                  ticket.attachments.map((file) => (
                    <a
                      key={file.id}
                      href={file.file_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[hsl(var(--border))] text-[hsl(var(--text-primary))] bg-[hsl(var(--bg-secondary)/0.45)]"
                    >
                      <Paperclip size={16} />
                      {file.file_name}
                    </a>
                  ))
                ) : (
                  <span>No file chosen</span>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-[hsl(var(--border))] pt-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-[hsl(var(--text-primary))] mb-2">
                Update Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card-bg))] text-[hsl(var(--text-primary))] outline-none focus:border-[hsl(var(--accent))]"
              >
                <option>Open</option>
                {/* <option value="">Pending</option> */}
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                {/* <option value="resolved">Resolved</option> */}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[hsl(var(--text-primary))] mb-2">
                Reply to Organization
              </label>

              <textarea
                rows={4}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Write your reply..."
                className="w-full px-4 py-3 rounded-xl border border-[hsl(var(--border))]
      bg-[hsl(var(--card-bg))]
      text-[hsl(var(--text-primary))]
      outline-none resize-y
      focus:border-[hsl(var(--accent))]"
              />
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-[hsl(var(--border))] flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-xl border border-[hsl(var(--border))] text-[hsl(var(--text-primary))] hover:bg-[hsl(var(--bg-secondary))]"
          >
            Cancel
          </button>

          <button
            type="button"
            // onClick={onClose}
            onClick={saveReply}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[hsl(var(--accent))] text-white font-semibold hover:bg-[hsl(var(--accent-dark))]"
          >
            <Send size={18} />
            Save Reply
          </button>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold text-[hsl(var(--text-muted))] mb-1">
        {label}
      </p>
      <p className="text-sm font-medium text-[hsl(var(--text-primary))] break-words">
        {value || "-"}
      </p>
    </div>
  );
}
