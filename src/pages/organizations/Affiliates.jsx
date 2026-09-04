import { useState, useEffect } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { successAlert, errorAlert } from "../../utils/alert";
import {
    CheckCircle,
    XCircle,
    Clock,
    Percent,
} from "lucide-react";
import api from "../../services/api";

export default function Affiliates() {
    const [affiliates, setAffiliates] = useState([]);
    const [loading, setLoading] = useState(false);

    const [showRemarkModal, setShowRemarkModal] = useState(false);
const [remarkData, setRemarkData] = useState(null);
const [remarkLoading, setRemarkLoading] = useState(false);

    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
    });

    // Approve / Edit modal
    const [showModal, setShowModal] = useState(false);
    const [selected, setSelected] = useState(null);
    const [commission, setCommission] = useState("");
    const [commissionType, setCommissionType] = useState("lifetime");
    const [saving, setSaving] = useState(false);

    // Reject modal
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectRemark, setRejectRemark] = useState("");

    // Toggle loading
    const [togglingId, setTogglingId] = useState(null);

    /*
    |--------------------------------------------------------------------------
    | Open Approve / Edit Modal
    |--------------------------------------------------------------------------
    */
    const openApproveModal = (item) => {
        setSelected(item);

        // API fields are commission and type
        setCommission(item.commission ?? "");
        setCommissionType(item.type ?? "lifetime");

        setShowModal(true);
    };

    /*
    |--------------------------------------------------------------------------
    | Approve / Edit Affiliate
    |--------------------------------------------------------------------------
    */
    const handleApprove = async () => {
        if (
            !commission ||
            Number(commission) <= 0 ||
            Number(commission) > 100
        ) {
            return errorAlert(
                "Required",
                "Please enter a valid commission % (1-100)"
            );
        }

        if (!selected?.id) {
            return errorAlert(
                "Error",
                "Affiliate not selected."
            );
        }

        setSaving(true);

        try {
            let res;

            /*
            |--------------------------------------------------------------------------
            | Approved Affiliate = UPDATE
            |--------------------------------------------------------------------------
            */
            if (selected.status === "approved") {
                res = await api.put(
                    `/admin/affiliates/${selected.id}`,
                    {
                        commission: Number(commission),
                        type: commissionType,
                    }
                );
            }

            /*
            |--------------------------------------------------------------------------
            | Pending Affiliate = APPROVE
            |--------------------------------------------------------------------------
            */
            else {
                res = await api.post(
                    `/admin/affiliates/${selected.id}/approve`,
                    {
                        commission: Number(commission),
                        type: commissionType,
                    }
                );
            }

            console.log(
                "Affiliate response:",
                res.data
            );

            if (res.data.status === true) {
                await successAlert(
                    selected.status === "approved"
                        ? "Updated"
                        : "Approved",
                    res.data.message ||
                        (
                            selected.status === "approved"
                                ? "Affiliate updated successfully."
                                : "Affiliate approved successfully."
                        )
                );

                closeApproveModal();

                // Reload current page
                fetchAffiliates(
                    pagination.current_page
                );
            }
        } catch (error) {
            console.error(
                "Affiliate save error:",
                error
            );

            console.error(
                "Status:",
                error.response?.status
            );

            console.error(
                "Data:",
                error.response?.data
            );

            const status =
                error.response?.status;

            const data =
                error.response?.data;

            if (status === 422) {
                errorAlert(
                    "Validation Failed",
                    data?.message ||
                        "Please check the commission details."
                );
                return;
            }

            if (status === 400) {
                errorAlert(
                    "Already Approved",
                    data?.message ||
                        "Affiliate is already approved."
                );
                return;
            }

            if (status === 404) {
                errorAlert(
                    "Not Found",
                    data?.message ||
                        "Affiliate not found."
                );
                return;
            }

            errorAlert(
                "Error",
                data?.message ||
                    "Unable to save affiliate."
            );
        } finally {
            setSaving(false);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Close Approve / Edit Modal
    |--------------------------------------------------------------------------
    */
    const closeApproveModal = () => {
        setShowModal(false);
        setSelected(null);
        setCommission("");
        setCommissionType("lifetime");
    };

    /*
    |--------------------------------------------------------------------------
    | Open Reject Modal
    |--------------------------------------------------------------------------
    */
    const openRejectModal = (item) => {
        setSelected(item);
        setRejectRemark("");
        setShowRejectModal(true);
    };


    const handleViewRemark = async (item) => {
    if (!item?.id) {
        return errorAlert("Error", "Affiliate not selected.");
    }

    setRemarkLoading(true);

    try {
        const res = await api.get(
            `/admin/affiliates/${item.id}/remark`
        );

        console.log("Remark response:", res.data);

        if (res.data.status === true) {
            setRemarkData(res.data.data);
            setShowRemarkModal(true);
        }
    } catch (error) {
        console.error("Remark error:", error);

        const status = error.response?.status;
        const data = error.response?.data;

        if (status === 404) {
            errorAlert(
                "Not Found",
                data?.message || "Affiliate not found."
            );
            return;
        }

        errorAlert(
            "Error",
            data?.message || "Unable to fetch rejection remark."
        );
    } finally {
        setRemarkLoading(false);
    }
};

    /*
    |--------------------------------------------------------------------------
    | Reject Affiliate
    |--------------------------------------------------------------------------
    */
    const handleReject = async () => {
        if (!selected?.id) {
            return errorAlert(
                "Error",
                "Affiliate not selected."
            );
        }

        if (!rejectRemark.trim()) {
            return errorAlert(
                "Required",
                "Please enter rejection remarks."
            );
        }

        setSaving(true);

        try {
            const res = await api.post(
                `/admin/affiliates/${selected.id}/reject`,
                {
                    rejection_remarks:
                        rejectRemark.trim(),
                }
            );

            console.log(
                "Reject response:",
                res.data
            );

            if (res.data.status === true) {
                await successAlert(
                    "Rejected",
                    res.data.message ||
                        "Affiliate rejected successfully."
                );

                closeRejectModal();

                fetchAffiliates(
                    pagination.current_page
                );
            }
        } catch (error) {
            console.error(
                "Reject error:",
                error
            );

            const status =
                error.response?.status;

            const data =
                error.response?.data;

            if (status === 422) {
                errorAlert(
                    "Validation Failed",
                    data?.message ||
                        "Please enter valid rejection remarks."
                );
                return;
            }

            if (status === 404) {
                errorAlert(
                    "Not Found",
                    data?.message ||
                        "Affiliate not found."
                );
                return;
            }

            errorAlert(
                "Error",
                data?.message ||
                    "Unable to reject affiliate."
            );
        } finally {
            setSaving(false);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Close Reject Modal
    |--------------------------------------------------------------------------
    */
    const closeRejectModal = () => {
        setShowRejectModal(false);
        setSelected(null);
        setRejectRemark("");
    };

    /*
    |--------------------------------------------------------------------------
    | Toggle Active / Inactive
    |--------------------------------------------------------------------------
    */
    const toggleActive = async (item) => {
        if (!item?.id) {
            return errorAlert(
                "Error",
                "Affiliate not selected."
            );
        }

        setTogglingId(item.id);

        try {
            const res = await api.post(
                `/admin/affiliates/${item.id}/toggle-status`
            );

            console.log(
                "Toggle status response:",
                res.data
            );

            if (res.data.status === true) {
                await successAlert(
                    "Success",
                    res.data.message ||
                        "Affiliate status updated successfully."
                );

                fetchAffiliates(
                    pagination.current_page
                );
            }
        } catch (error) {
            console.error(
                "Toggle status error:",
                error
            );

            const status =
                error.response?.status;

            const data =
                error.response?.data;

            if (status === 404) {
                errorAlert(
                    "Not Found",
                    data?.message ||
                        "Affiliate not found."
                );
                return;
            }

            errorAlert(
                "Error",
                data?.message ||
                    "Unable to update affiliate status."
            );
        } finally {
            setTogglingId(null);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Status Badge
    |--------------------------------------------------------------------------
    */
    const statusBadge = (status) => {
        if (status === "approved") {
            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                    <CheckCircle size={12} />
                    Approved
                </span>
            );
        }

        if (status === "rejected") {
            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                    <XCircle size={12} />
                    Rejected
                </span>
            );
        }

        return (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                <Clock size={12} />
                Pending
            </span>
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Fetch Affiliates
    |--------------------------------------------------------------------------
    */
    const fetchAffiliates = async (page = 1) => {
        setLoading(true);

        try {
            const res = await api.get(
                "/admin/affiliates",
                {
                    params: {
                        page,
                        per_page:
                            pagination.per_page,
                    },
                }
            );

            console.log(
                "Affiliates response:",
                res.data
            );

            if (res.data.status === true) {
                setAffiliates(
                    res.data.data || []
                );

                /*
                |--------------------------------------------------------------------------
                | IMPORTANT:
                | API pagination is inside meta
                |--------------------------------------------------------------------------
                */
                setPagination(
                    res.data.meta || {
                        current_page: 1,
                        last_page: 1,
                        per_page: 10,
                        total: 0,
                    }
                );
            }
        } catch (error) {
            console.error(
                "Fetch affiliates error:",
                error
            );

            console.error(
                "Status:",
                error.response?.status
            );

            console.error(
                "Data:",
                error.response?.data
            );

            errorAlert(
                "Error",
                error.response?.data?.message ||
                    "Unable to fetch affiliates."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAffiliates(1);
    }, []);

    return (
        <AdminLayout>
            <div className="p-6 max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Affiliates
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Manage affiliate registrations
                        and approvals
                    </p>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

                    <div className="overflow-x-auto">

                        <table className="w-full text-left">

                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">

                                    <th className="px-5 py-4">
                                        ID
                                    </th>

                                    <th className="px-5 py-4">
                                        Name
                                    </th>

                                    <th className="px-5 py-4">
                                        Email
                                    </th>

                                    <th className="px-5 py-4">
                                        Phone
                                    </th>

                                    <th className="px-5 py-4">
                                        Registered On
                                    </th>

                                    <th className="px-5 py-4 text-center">
                                        Status
                                    </th>

                                    <th className="px-5 py-4 text-center">
                                        Commission
                                    </th>

                                    <th className="px-5 py-4 text-center">
                                        Type
                                    </th>

                                    <th className="px-5 py-4 text-center">
                                        Active
                                    </th>

                                    <th className="px-5 py-4 text-center">
                                        Actions
                                    </th>

                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-50">

                                {loading ? (
                                    <tr>
                                        <td
                                            colSpan="10"
                                            className="px-5 py-10 text-center text-gray-500"
                                        >
                                            Loading affiliates...
                                        </td>
                                    </tr>
                                ) : affiliates.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="10"
                                            className="px-5 py-10 text-center text-gray-500"
                                        >
                                            No affiliates found.
                                        </td>
                                    </tr>
                                ) : (
                                    affiliates.map(
                                        (item) => (
                                            <tr
                                                key={item.id}
                                                className="hover:bg-orange-50/40 transition"
                                            >

                                                <td className="px-5 py-4 text-sm text-gray-600">
                                                    {item.id}
                                                </td>

                                                <td className="px-5 py-4 font-medium text-gray-900">
                                                    {item.name}
                                                </td>

                                                <td className="px-5 py-4 text-sm text-gray-600">
                                                    {item.email}
                                                </td>

                                                <td className="px-5 py-4 text-sm text-gray-600">
                                                    {item.phone}
                                                </td>

                                                <td className="px-5 py-4 text-sm text-gray-600">
                                                    {item.created_at
                                                        ? new Date(
                                                              item.created_at
                                                          ).toLocaleDateString()
                                                        : "-"}
                                                </td>

                                                <td className="px-5 py-4 text-center">
                                                    {statusBadge(
                                                        item.status
                                                    )}
                                                </td>

                                                <td className="px-5 py-4 text-center font-semibold text-[#FC6C26]">
                                                    {item.commission !==
                                                        null &&
                                                    item.commission !==
                                                        undefined
                                                        ? `${item.commission}%`
                                                        : "-"}
                                                </td>

                                                <td className="px-5 py-4 text-center capitalize text-sm">
                                                    {item.type ||
                                                        "-"}
                                                </td>

                                                {/* Active Toggle */}
                                                <td className="px-5 py-4 text-center">

                                                    {item.status ===
                                                    "approved" ? (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                toggleActive(
                                                                    item
                                                                )
                                                            }
                                                            disabled={
                                                                togglingId ===
                                                                item.id
                                                            }
                                                            className={`relative w-11 h-6 rounded-full transition ${
                                                                item.is_active
                                                                    ? "bg-green-500"
                                                                    : "bg-gray-300"
                                                            } disabled:opacity-50`}
                                                        >
                                                            <span
                                                                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                                                                    item.is_active
                                                                        ? "translate-x-5"
                                                                        : "translate-x-0"
                                                                }`}
                                                            />
                                                        </button>
                                                    ) : (
                                                        <span className="text-gray-300 text-sm">
                                                            -
                                                        </span>
                                                    )}

                                                </td>

                                                {/* Actions */}
                                                <td className="px-5 py-4 text-center">

                                                    {item.status ===
                                                        "pending" && (
                                                        <div className="flex items-center justify-center gap-3">

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    openApproveModal(
                                                                        item
                                                                    )
                                                                }
                                                                className="text-green-600 font-semibold text-sm hover:underline"
                                                            >
                                                                Approve
                                                            </button>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    openRejectModal(
                                                                        item
                                                                    )
                                                                }
                                                                className="text-red-500 font-semibold text-sm hover:underline"
                                                            >
                                                                Reject
                                                            </button>

                                                        </div>
                                                    )}

                                                    {item.status ===
                                                        "approved" && (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                openApproveModal(
                                                                    item
                                                                )
                                                            }
                                                            className="text-[#FC6C26] font-semibold text-sm hover:underline"
                                                        >
                                                            Edit
                                                        </button>
                                                    )}

                                                    {item.status === "rejected" && (
    <button
        type="button"
        onClick={() => handleViewRemark(item)}
        disabled={remarkLoading}
        className="text-xs text-gray-500 hover:text-[#FC6C26] font-semibold hover:underline disabled:opacity-50"
    >
        View Remark
    </button>
)}

                                                </td>

                                            </tr>
                                        )
                                    )
                                )}

                            </tbody>

                        </table>

                        {/* Pagination */}
                        <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">

                            <p className="text-sm text-gray-500">
                                Showing page{" "}
                                {pagination.current_page}{" "}
                                of{" "}
                                {pagination.last_page}{" "}
                                ({pagination.total} total)
                            </p>

                            <div className="flex items-center gap-2">

                                <button
                                    type="button"
                                    disabled={
                                        pagination.current_page <=
                                            1 ||
                                        loading
                                    }
                                    onClick={() =>
                                        fetchAffiliates(
                                            pagination.current_page -
                                                1
                                        )
                                    }
                                    className="px-4 py-2 border rounded-lg text-sm disabled:opacity-40"
                                >
                                    Previous
                                </button>

                                <span className="px-3 py-2 text-sm font-medium">
                                    {
                                        pagination.current_page
                                    }
                                </span>

                                <button
                                    type="button"
                                    disabled={
                                        pagination.current_page >=
                                            pagination.last_page ||
                                        loading
                                    }
                                    onClick={() =>
                                        fetchAffiliates(
                                            pagination.current_page +
                                                1
                                        )
                                    }
                                    className="px-4 py-2 border rounded-lg text-sm disabled:opacity-40"
                                >
                                    Next
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* =========================================================
                APPROVE / EDIT MODAL
            ========================================================= */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">

                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">

                        <div className="px-6 py-5 border-b border-gray-100">

                            <h2 className="text-xl font-bold text-gray-900">
                                {selected?.status ===
                                "approved"
                                    ? "Edit"
                                    : "Approve"}{" "}
                                Affiliate
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                {selected?.name}
                            </p>

                        </div>

                        <div className="p-6 space-y-5">

                            {/* Commission */}
                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Commission %{" "}
                                    <span className="text-red-500">
                                        *
                                    </span>
                                </label>

                                <div className="relative">

                                    <Percent
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        type="number"
                                        min="1"
                                        max="100"
                                        step="0.1"
                                        value={
                                            commission
                                        }
                                        onChange={(e) =>
                                            setCommission(
                                                e.target
                                                    .value
                                            )
                                        }
                                        className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#FC6C26] focus:ring-2 focus:ring-orange-100"
                                        placeholder="e.g. 10"
                                    />

                                </div>

                            </div>

                            {/* Commission Type */}
                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Commission Type{" "}
                                    <span className="text-red-500">
                                        *
                                    </span>
                                </label>

                                <div className="grid grid-cols-2 gap-3">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setCommissionType(
                                                "lifetime"
                                            )
                                        }
                                        className={`py-3 rounded-xl border text-sm font-semibold transition ${
                                            commissionType ===
                                            "lifetime"
                                                ? "border-[#FC6C26] bg-orange-50 text-[#FC6C26]"
                                                : "border-gray-200 text-gray-600"
                                        }`}
                                    >
                                        Lifetime
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setCommissionType(
                                                "onetime"
                                            )
                                        }
                                        className={`py-3 rounded-xl border text-sm font-semibold transition ${
                                            commissionType ===
                                            "onetime"
                                                ? "border-[#FC6C26] bg-orange-50 text-[#FC6C26]"
                                                : "border-gray-200 text-gray-600"
                                        }`}
                                    >
                                        One-time
                                    </button>

                                </div>

                                <p className="text-xs text-gray-400 mt-2">
                                    {commissionType ===
                                    "lifetime"
                                        ? "Commission on every future transaction"
                                        : "Commission only on the first purchase"}
                                </p>

                            </div>

                        </div>

                        {/* Footer */}
                        <div className="flex gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">

                            <button
                                type="button"
                                onClick={
                                    closeApproveModal
                                }
                                disabled={saving}
                                className="flex-1 py-2.5 border border-gray-200 rounded-xl font-medium disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleApprove}
                                disabled={saving}
                                className="flex-1 py-2.5 bg-[#FC6C26] text-white font-semibold rounded-xl disabled:opacity-60 flex items-center justify-center gap-2"
                            >

                                {saving && (
                                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                )}

                                {saving
                                    ? "Saving..."
                                    : selected?.status ===
                                      "approved"
                                    ? "Update"
                                    : "Approve"}

                            </button>

                        </div>

                    </div>

                </div>
            )}

            {/* =========================================================
                REJECT MODAL
            ========================================================= */}
            {showRejectModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">

                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">

                        <div className="px-6 py-5 border-b border-gray-100">

                            <h2 className="text-xl font-bold text-gray-900">
                                Reject Affiliate
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                {selected?.name}
                            </p>

                        </div>

                        <div className="p-6">

                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Remark / Reason{" "}
                                <span className="text-red-500">
                                    *
                                </span>
                            </label>

                            <textarea
                                value={rejectRemark}
                                onChange={(e) =>
                                    setRejectRemark(
                                        e.target.value
                                    )
                                }
                                rows={4}
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 resize-none"
                                placeholder="Enter reason for rejection..."
                            />

                        </div>

                        <div className="flex gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">

                            <button
                                type="button"
                                onClick={
                                    closeRejectModal
                                }
                                disabled={saving}
                                className="flex-1 py-2.5 border border-gray-200 rounded-xl font-medium disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleReject}
                                disabled={saving}
                                className="flex-1 py-2.5 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 disabled:opacity-60 flex items-center justify-center gap-2"
                            >

                                {saving && (
                                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                )}

                                {saving
                                    ? "Rejecting..."
                                    : "Reject"}

                            </button>

                        </div>

                    </div>

                </div>
            )}


{/* ===================== REMARK MODAL ===================== */}
{showRemarkModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">

        <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">

            <div className="px-6 py-5 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">
                    Rejection Remark
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    Affiliate ID: {remarkData?.id}
                </p>
            </div>

            <div className="p-6">

                <div className="mb-4">
                    <p className="text-sm font-medium text-gray-500 mb-1">
                        Status
                    </p>

                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                        <XCircle size={12} />
                        {remarkData?.status || "Rejected"}
                    </span>
                </div>

                <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">
                        Remark
                    </p>

                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700 leading-6">
                        {remarkData?.rejection_remarks ||
                            "No rejection remark available."}
                    </div>
                </div>

            </div>

            <div className="flex px-6 py-4 border-t border-gray-100 bg-gray-50">

                <button
                    type="button"
                    onClick={() => {
                        setShowRemarkModal(false);
                        setRemarkData(null);
                    }}
                    className="w-full py-2.5 border border-gray-200 rounded-xl font-medium"
                >
                    Close
                </button>

            </div>

        </div>

    </div>
)}
        </AdminLayout>
    );
}