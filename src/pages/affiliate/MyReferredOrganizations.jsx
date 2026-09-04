// src/pages/affiliate/MyReferredOrganizations.jsx

import { useEffect, useState } from "react";
import {
  Eye,
  X,
  Percent,
  CreditCard,
  Calendar,
  Mail,
  Phone,
  Building2,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";

import api from "../../services/api";

const PRIMARY = "#fe7f2d";
const DARK = "#464243";

export default function MyReferredOrganizations() {
  // ============================================================
  // STATE
  // ============================================================

  const [organizations, setOrganizations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 10,
    total: 0,
    last_page: 1,
    from: 0,
    to: 0,
  });

  // ============================================================
  // FETCH ORGANIZATIONS
  // ============================================================

  const fetchOrganizations = async (page = 1) => {
    setLoading(true);
    setError("");

    try {
      const res = await api.get("/affiliate/organizations", {
        params: {
          page: page,
          per_page: pagination.per_page,
        },
      });

      console.log("Organizations API Response:", res.data);

      if (res.data?.status === true) {
        setOrganizations(res.data.data || []);

        setPagination({
          current_page: Number(res.data.meta?.current_page || 1),
          per_page: Number(res.data.meta?.per_page || 10),
          total: Number(res.data.meta?.total || 0),
          last_page: Number(res.data.meta?.last_page || 1),
          from: Number(res.data.meta?.from || 0),
          to: Number(res.data.meta?.to || 0),
        });
      } else {
        setOrganizations([]);

        setError(
          res.data?.message ||
            "Unable to fetch referred organizations."
        );
      }
    } catch (err) {
      console.error("Organizations API Error:", err);

      setOrganizations([]);

      setError(
        err.response?.data?.message ||
          "Unable to fetch referred organizations. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // INITIAL LOAD
  // ============================================================

  useEffect(() => {
    fetchOrganizations(1);
  }, []);

  // ============================================================
  // PAGINATION
  // ============================================================

  const handlePrevious = () => {
    if (
      pagination.current_page > 1 &&
      !loading
    ) {
      fetchOrganizations(
        pagination.current_page - 1
      );
    }
  };

  const handleNext = () => {
    if (
      pagination.current_page < pagination.last_page &&
      !loading
    ) {
      fetchOrganizations(
        pagination.current_page + 1
      );
    }
  };

  // ============================================================
  // MASK EMAIL
  // ============================================================

  const maskEmail = (email) => {
    if (!email) return "-";

    const [name, domain] = email.split("@");

    if (!name || !domain) {
      return email;
    }

    if (name.length <= 2) {
      return `${name}****@${domain}`;
    }

    return `${name.slice(0, 2)}****@${domain}`;
  };

  // ============================================================
  // MASK PHONE
  // ============================================================

  const maskPhone = (phone) => {
    if (!phone) return "-";

    const phoneString = String(phone);

    if (phoneString.length <= 4) {
      return phoneString;
    }

    return `******${phoneString.slice(-4)}`;
  };

  // ============================================================
  // FORMAT MONEY
  // ============================================================

  const formatMoney = (amount) => {
    return Number(amount || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // ============================================================
  // COMMISSION TYPE LABEL
  // ============================================================

  const getCommissionTypeLabel = (type) => {
    if (type === "lifetime") {
      return "Lifetime";
    }

    if (type === "onetime") {
      return "One Time";
    }

    return type || "-";
  };

  // ============================================================
  // OPEN ORGANIZATION
  // ============================================================

  const handleViewOrganization = (org) => {
    setSelectedOrg(org);
  };

  // ============================================================
  // CLOSE MODAL
  // ============================================================

  const handleCloseModal = () => {
    setSelectedOrg(null);
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div
      className="
        w-full
        p-4
        sm:p-6
        lg:p-8
        max-w-7xl
        mx-auto
      "
    >
      {/* ========================================================
          HEADER
      ========================================================= */}

      <div className="mb-6 lg:mb-8">
        <h1
          className="
            text-2xl
            sm:text-3xl
            font-bold
          "
          style={{ color: DARK }}
        >
          My Referred Organizations
        </h1>

        <p className="text-gray-500 mt-1 text-sm sm:text-base">
          Organizations registered using your referral link
        </p>
      </div>

      {/* ========================================================
          ERROR
      ========================================================= */}

      {error && (
        <div
          className="
            mb-5
            bg-red-50
            border
            border-red-100
            text-red-600
            rounded-xl
            px-4
            py-3
            flex
            items-center
            justify-between
            gap-4
          "
        >
          <p className="text-sm">
            {error}
          </p>

          <button
            type="button"
            onClick={() =>
              fetchOrganizations(
                pagination.current_page
              )
            }
            disabled={loading}
            className="
              inline-flex
              items-center
              gap-2
              px-3
              py-2
              rounded-lg
              bg-white
              border
              border-red-200
              text-red-600
              text-sm
              font-semibold
              hover:bg-red-50
              disabled:opacity-50
            "
          >
            <RefreshCw size={15} />

            Retry
          </button>
        </div>
      )}

      {/* ========================================================
          DESKTOP TABLE
      ========================================================= */}

      <div
        className="
          bg-white
          rounded-2xl
          border
          border-gray-100
          shadow-sm
          overflow-hidden
        "
      >
        {/* Horizontal scroll */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left">

            {/* ==================================================
                TABLE HEADER
            ================================================== */}

            <thead>
              <tr
                className="
                  bg-gray-50
                  border-b
                  border-gray-100
                  text-xs
                  font-semibold
                  text-gray-500
                  uppercase
                  tracking-wider
                "
              >
                <th className="px-6 py-4">
                  Name
                </th>

                <th className="px-6 py-4">
                  Email
                </th>

                <th className="px-6 py-4">
                  Phone
                </th>

                <th className="px-6 py-4 text-center">
                  Commission %
                </th>

                <th className="px-6 py-4 text-center">
                  Total Cards
                </th>

                <th className="px-6 py-4 text-center">
                  Total Earned
                </th>

                <th className="px-6 py-4 text-center">
                  Action
                </th>
              </tr>
            </thead>

            {/* ==================================================
                TABLE BODY
            ================================================== */}

            <tbody className="divide-y divide-gray-50">

              {/* LOADING */}

              {loading && (
                <tr>
                  <td
                    colSpan={7}
                    className="
                      px-6
                      py-16
                      text-center
                      text-gray-400
                    "
                  >
                    <div className="flex flex-col items-center justify-center gap-3">
                      <RefreshCw
                        size={24}
                        className="animate-spin"
                        style={{ color: PRIMARY }}
                      />

                      <span>
                        Loading organizations...
                      </span>
                    </div>
                  </td>
                </tr>
              )}

              {/* DATA */}

              {!loading &&
                organizations.map((org) => (
                  <tr
                    key={org.id}
                    className="
                      hover:bg-orange-50/40
                      transition
                    "
                  >

                    {/* NAME */}

                    <td
                      className="
                        px-6
                        py-4
                        font-medium
                        text-gray-900
                      "
                    >
                      <div className="flex items-center gap-3">

                        <div
                          className="
                            w-10
                            h-10
                            rounded-xl
                            flex
                            items-center
                            justify-center
                            shrink-0
                          "
                          style={{
                            backgroundColor: "#fff4ec",
                          }}
                        >
                          <Building2
                            size={19}
                            style={{
                              color: PRIMARY,
                            }}
                          />
                        </div>

                        <span>
                          {org.name || "-"}
                        </span>

                      </div>
                    </td>

                    {/* EMAIL */}

                    <td
                      className="
                        px-6
                        py-4
                        text-gray-600
                        text-sm
                      "
                    >
                      {maskEmail(org.email)}
                    </td>

                    {/* PHONE */}

                    <td
                      className="
                        px-6
                        py-4
                        text-gray-600
                        text-sm
                      "
                    >
                      {maskPhone(org.phone)}
                    </td>

                    {/* COMMISSION */}

                    <td className="px-6 py-4 text-center">
                      <span
                        className="
                          inline-flex
                          items-center
                          gap-1
                          px-2.5
                          py-1
                          rounded-full
                          text-sm
                          font-semibold
                        "
                        style={{
                          backgroundColor: "#fff4ec",
                          color: PRIMARY,
                        }}
                      >
                        <Percent size={12} />

                        {Number(
                          org.commission_percentage || 0
                        )}
                        %
                      </span>
                    </td>

                    {/* CARDS */}

                    <td
                      className="
                        px-6
                        py-4
                        text-center
                        font-medium
                        text-gray-800
                      "
                    >
                      {Number(
                        org.total_cards || 0
                      )}
                    </td>

                    {/* TOTAL EARNED */}

                    <td
                      className="
                        px-6
                        py-4
                        text-center
                        font-semibold
                        text-green-600
                      "
                    >
                      ₹
                      {formatMoney(
                        org.total_earned
                      )}
                    </td>

                    {/* ACTION */}

                    <td className="px-6 py-4 text-center">
                      <button
                        type="button"
                        onClick={() =>
                          handleViewOrganization(org)
                        }
                        className="
                          inline-flex
                          items-center
                          gap-1.5
                          font-semibold
                          text-sm
                          hover:underline
                          transition
                        "
                        style={{
                          color: PRIMARY,
                        }}
                      >
                        <Eye size={16} />

                        View
                      </button>
                    </td>

                  </tr>
                ))}

              {/* EMPTY STATE */}

              {!loading &&
                organizations.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="
                        px-6
                        py-16
                        text-center
                        text-gray-400
                      "
                    >
                      No referred organizations yet
                    </td>
                  </tr>
                )}

            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================
          MOBILE ORGANIZATION CARDS
      ========================================================= */}

      {!loading && (
        <div className="md:hidden mt-4 space-y-4">

          {organizations.map((org) => (
            <div
              key={org.id}
              className="
                bg-white
                rounded-2xl
                border
                border-gray-100
                shadow-sm
                p-4
              "
            >

              {/* ORGANIZATION HEADER */}

              <div className="flex items-start gap-3">

                <div
                  className="
                    w-11
                    h-11
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                  style={{
                    backgroundColor: "#fff4ec",
                  }}
                >
                  <Building2
                    size={21}
                    style={{
                      color: PRIMARY,
                    }}
                  />
                </div>

                <div className="min-w-0 flex-1">

                  <h3
                    className="
                      font-semibold
                      text-gray-900
                      text-sm
                      leading-5
                    "
                  >
                    {org.name || "-"}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    Organization #{org.id}
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleViewOrganization(org)
                  }
                  className="
                    w-9
                    h-9
                    rounded-lg
                    flex
                    items-center
                    justify-center
                    shrink-0
                    transition
                  "
                  style={{
                    backgroundColor: "#fff4ec",
                    color: PRIMARY,
                  }}
                  aria-label="View organization"
                >
                  <Eye size={18} />
                </button>

              </div>

              {/* CONTACT INFORMATION */}

              <div className="mt-4 space-y-2">

                <div className="flex items-center gap-2 text-sm text-gray-600">

                  <Mail
                    size={15}
                    className="text-gray-400 shrink-0"
                  />

                  <span className="truncate">
                    {maskEmail(org.email)}
                  </span>

                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">

                  <Phone
                    size={15}
                    className="text-gray-400 shrink-0"
                  />

                  <span>
                    {maskPhone(org.phone)}
                  </span>

                </div>

              </div>

              {/* SUMMARY */}

              <div
                className="
                  grid
                  grid-cols-3
                  gap-2
                  mt-4
                  pt-4
                  border-t
                  border-gray-100
                "
              >

                {/* COMMISSION */}

                <div className="text-center">

                  <p
                    className="
                      text-sm
                      font-bold
                    "
                    style={{
                      color: PRIMARY,
                    }}
                  >
                    {Number(
                      org.commission_percentage || 0
                    )}
                    %
                  </p>

                  <p className="text-[11px] text-gray-500 mt-1">
                    Commission
                  </p>

                </div>

                {/* CARDS */}

                <div className="text-center">

                  <p className="text-sm font-bold text-blue-600">
                    {Number(
                      org.total_cards || 0
                    )}
                  </p>

                  <p className="text-[11px] text-gray-500 mt-1">
                    Cards
                  </p>

                </div>

                {/* EARNED */}

                <div className="text-center">

                  <p className="text-sm font-bold text-green-600">
                    ₹
                    {formatMoney(
                      org.total_earned
                    )}
                  </p>

                  <p className="text-[11px] text-gray-500 mt-1">
                    Earned
                  </p>

                </div>

              </div>

              {/* VIEW BUTTON */}

              <button
                type="button"
                onClick={() =>
                  handleViewOrganization(org)
                }
                className="
                  w-full
                  mt-4
                  py-2.5
                  rounded-xl
                  border
                  text-sm
                  font-semibold
                  transition
                "
                style={{
                  borderColor: "#fed7aa",
                  color: PRIMARY,
                  backgroundColor: "#fffaf7",
                }}
              >
                View Transactions
              </button>

            </div>
          ))}

          {/* MOBILE EMPTY STATE */}

          {organizations.length === 0 && (
            <div
              className="
                bg-white
                rounded-2xl
                border
                border-gray-100
                shadow-sm
                px-6
                py-16
                text-center
                text-gray-400
              "
            >
              No referred organizations yet
            </div>
          )}

        </div>
      )}

      {/* ========================================================
          PAGINATION
      ========================================================= */}

      {!loading &&
        pagination.total > 0 &&
        pagination.last_page > 1 && (
          <div
            className="
              mt-6
              flex
              flex-col
              sm:flex-row
              items-center
              justify-between
              gap-4
            "
          >

            {/* SHOWING */}

            <p className="text-sm text-gray-500">

              Showing{" "}

              <span className="font-semibold text-gray-700">
                {pagination.from}
              </span>

              {" "}to{" "}

              <span className="font-semibold text-gray-700">
                {pagination.to}
              </span>

              {" "}of{" "}

              <span className="font-semibold text-gray-700">
                {pagination.total}
              </span>

              {" "}organizations

            </p>

            {/* PAGINATION */}

            <div className="flex items-center gap-2">

              {/* PREVIOUS */}

              <button
                type="button"
                disabled={
                  pagination.current_page <= 1 ||
                  loading
                }
                onClick={handlePrevious}
                className="
                  inline-flex
                  items-center
                  gap-1
                  px-3
                  sm:px-4
                  py-2
                  rounded-lg
                  border
                  border-gray-200
                  text-sm
                  font-medium
                  text-gray-700
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  hover:bg-gray-50
                  transition
                "
              >
                <ChevronLeft size={16} />

                <span className="hidden sm:inline">
                  Previous
                </span>
              </button>

              {/* PAGE */}

              <div
                className="
                  px-3
                  py-2
                  text-sm
                  text-gray-600
                  whitespace-nowrap
                "
              >
                Page{" "}

                <span className="font-semibold">
                  {pagination.current_page}
                </span>

                {" "}of{" "}

                <span className="font-semibold">
                  {pagination.last_page}
                </span>
              </div>

              {/* NEXT */}

              <button
                type="button"
                disabled={
                  pagination.current_page >=
                    pagination.last_page ||
                  loading
                }
                onClick={handleNext}
                className="
                  inline-flex
                  items-center
                  gap-1
                  px-3
                  sm:px-4
                  py-2
                  rounded-lg
                  border
                  border-gray-200
                  text-sm
                  font-medium
                  text-gray-700
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  hover:bg-gray-50
                  transition
                "
              >
                <span className="hidden sm:inline">
                  Next
                </span>

                <ChevronRight size={16} />
              </button>

            </div>
          </div>
        )}

      {/* ========================================================
          ORGANIZATION DETAILS MODAL
      ========================================================= */}

      {selectedOrg && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/50
            backdrop-blur-sm
            px-3
            sm:px-4
            py-4
          "
          onClick={handleCloseModal}
        >

          <div
            className="
              bg-white
              rounded-2xl
              w-full
              max-w-3xl
              max-h-[94vh]
              sm:max-h-[90vh]
              overflow-hidden
              shadow-2xl
              flex
              flex-col
            "
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* ==================================================
                MODAL HEADER
            ================================================== */}

            <div
              className="
                flex
                items-start
                justify-between
                gap-4
                px-4
                sm:px-6
                py-4
                sm:py-5
                border-b
                border-gray-100
                shrink-0
              "
            >

              <div className="min-w-0">

                <h2
                  className="
                    text-lg
                    sm:text-xl
                    font-bold
                    text-gray-900
                    break-words
                  "
                >
                  {selectedOrg.name || "-"}
                </h2>

                <p className="text-xs sm:text-sm text-gray-500 mt-1">

                  Commission:{" "}

                  <span className="font-medium">
                    {Number(
                      selectedOrg.commission_percentage || 0
                    )}
                    %
                  </span>

                </p>

              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                className="
                  p-2
                  rounded-full
                  hover:bg-gray-100
                  text-gray-500
                  transition
                  shrink-0
                "
                aria-label="Close"
              >
                <X size={20} />
              </button>

            </div>

            {/* ==================================================
                MODAL BODY
            ================================================== */}

            <div
              className="
                p-4
                sm:p-6
                overflow-y-auto
              "
            >

              {/* =================================================
                  ORGANIZATION CONTACT
              ================================================= */}

              <div
                className="
                  bg-gray-50
                  rounded-xl
                  p-4
                  mb-5
                  space-y-2
                "
              >

                <div className="flex items-center gap-2 text-sm text-gray-600">

                  <Mail
                    size={16}
                    className="text-gray-400"
                  />

                  <span className="break-all">
                    {maskEmail(
                      selectedOrg.email
                    )}
                  </span>

                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">

                  <Phone
                    size={16}
                    className="text-gray-400"
                  />

                  <span>
                    {maskPhone(
                      selectedOrg.phone
                    )}
                  </span>

                </div>

              </div>

              {/* =================================================
                  SUMMARY CARDS
              ================================================= */}

              <div
                className="
                  grid
                  grid-cols-1
                  sm:grid-cols-3
                  gap-3
                  sm:gap-4
                  mb-6
                "
              >

                {/* COMMISSION */}

                <div
                  className="
                    rounded-xl
                    p-4
                    text-center
                  "
                  style={{
                    backgroundColor: "#fff4ec",
                  }}
                >

                  <p
                    className="
                      text-2xl
                      font-bold
                    "
                    style={{
                      color: PRIMARY,
                    }}
                  >
                    {Number(
                      selectedOrg.commission_percentage ||
                        0
                    )}
                    %
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Commission Rate
                  </p>

                </div>

                {/* CARDS */}

                <div className="bg-blue-50 rounded-xl p-4 text-center">

                  <p className="text-2xl font-bold text-blue-600">
                    {Number(
                      selectedOrg.total_cards || 0
                    )}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Total Cards
                  </p>

                </div>

                {/* EARNED */}

                <div className="bg-green-50 rounded-xl p-4 text-center">

                  <p className="text-xl sm:text-2xl font-bold text-green-600">
                    ₹
                    {formatMoney(
                      selectedOrg.total_earned
                    )}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Total Earned
                  </p>

                </div>

              </div>

              {/* =================================================
                  TRANSACTIONS TITLE
              ================================================= */}

              <h3
                className="
                  font-semibold
                  text-gray-900
                  mb-3
                  flex
                  items-center
                  gap-2
                "
              >
                <CreditCard size={18} />

                Transactions
              </h3>

              {/* =================================================
                  TRANSACTIONS
              ================================================= */}

              {selectedOrg.transactions &&
              selectedOrg.transactions.length > 0 ? (
                <>
                  {/* DESKTOP TRANSACTION TABLE */}

                  <div
                    className="
                      border
                      border-gray-100
                      rounded-xl
                      overflow-hidden
                    "
                  >

                    <div className="overflow-x-auto">

                      <table
                        className="
                          w-full
                          min-w-[650px]
                          text-left
                          text-sm
                        "
                      >

                        <thead
                          className="
                            bg-gray-50
                            text-xs
                            text-gray-500
                            uppercase
                          "
                        >

                          <tr>

                            <th className="px-4 py-3">
                              Date
                            </th>

                            <th className="px-4 py-3">
                              Cards
                            </th>

                            <th className="px-4 py-3">
                              Amount
                            </th>

                            <th className="px-4 py-3">
                              Your Commission
                            </th>

                            <th className="px-4 py-3">
                              Status
                            </th>

                          </tr>

                        </thead>

                        <tbody className="divide-y divide-gray-50">

                          {selectedOrg.transactions.map(
                            (tx) => (
                              <tr
                                key={tx.id}
                                className="hover:bg-gray-50"
                              >

                                {/* DATE */}

                                <td
                                  className="
                                    px-4
                                    py-3
                                    text-gray-600
                                  "
                                >

                                  <div className="flex items-center gap-1.5 whitespace-nowrap">

                                    <Calendar
                                      size={14}
                                    />

                                    {tx.date}

                                  </div>

                                </td>

                                {/* CARDS */}

                                <td className="px-4 py-3 font-medium">
                                  {tx.cards}
                                </td>

                                {/* AMOUNT */}

                                <td className="px-4 py-3 whitespace-nowrap">
                                  ₹
                                  {formatMoney(
                                    tx.amount
                                  )}
                                </td>

                                {/* COMMISSION */}

                                <td
                                  className="
                                    px-4
                                    py-3
                                    font-semibold
                                    text-green-600
                                    whitespace-nowrap
                                  "
                                >
                                  ₹
                                  {formatMoney(
                                    tx.commission
                                  )}
                                </td>

                                {/* STATUS */}

                                <td className="px-4 py-3">

                                  <span
                                    className={`
                                      inline-flex
                                      px-2.5
                                      py-1
                                      rounded-full
                                      text-xs
                                      font-semibold
                                      ${
                                        tx.status ===
                                        "Paid"
                                          ? "bg-green-100 text-green-700"
                                          : "bg-yellow-100 text-yellow-700"
                                      }
                                    `}
                                  >
                                    {tx.status}
                                  </span>

                                </td>

                              </tr>
                            )
                          )}

                        </tbody>

                      </table>

                    </div>

                  </div>

                  {/* MOBILE TRANSACTIONS */}

                  <div className="sm:hidden mt-3 space-y-3">

                    {selectedOrg.transactions.map(
                      (tx) => (
                        <div
                          key={tx.id}
                          className="
                            border
                            border-gray-100
                            rounded-xl
                            p-4
                            bg-gray-50
                          "
                        >

                          <div className="flex items-center justify-between mb-3">

                            <div className="flex items-center gap-2 text-sm text-gray-600">

                              <Calendar
                                size={15}
                              />

                              {tx.date}

                            </div>

                            <span
                              className={`
                                px-2.5
                                py-1
                                rounded-full
                                text-xs
                                font-semibold
                                ${
                                  tx.status ===
                                  "Paid"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                                }
                              `}
                            >
                              {tx.status}
                            </span>

                          </div>

                          <div className="grid grid-cols-3 gap-2">

                            <div>

                              <p className="text-[11px] text-gray-500">
                                Cards
                              </p>

                              <p className="font-semibold text-gray-900 mt-0.5">
                                {tx.cards}
                              </p>

                            </div>

                            <div>

                              <p className="text-[11px] text-gray-500">
                                Amount
                              </p>

                              <p className="font-semibold text-gray-900 mt-0.5">
                                ₹
                                {formatMoney(
                                  tx.amount
                                )}
                              </p>

                            </div>

                            <div>

                              <p className="text-[11px] text-gray-500">
                                Commission
                              </p>

                              <p className="font-semibold text-green-600 mt-0.5">
                                ₹
                                {formatMoney(
                                  tx.commission
                                )}
                              </p>

                            </div>

                          </div>

                        </div>
                      )
                    )}

                  </div>
                </>
              ) : (
                <div
                  className="
                    border
                    border-gray-100
                    rounded-xl
                    bg-gray-50
                    px-6
                    py-10
                    text-center
                  "
                >
                  <CreditCard
                    size={32}
                    className="
                      mx-auto
                      text-gray-300
                      mb-3
                    "
                  />

                  <p className="text-gray-500 text-sm">
                    No transactions available.
                  </p>

                  <p className="text-gray-400 text-xs mt-1">
                    Transaction details are not included
                    in the organizations API response.
                  </p>
                </div>
              )}

            </div>

            {/* ==================================================
                MODAL FOOTER
            ================================================== */}

            <div
              className="
                border-t
                border-gray-100
                px-4
                sm:px-6
                py-3
                flex
                justify-end
                shrink-0
              "
            >

              <button
                type="button"
                onClick={handleCloseModal}
                className="
                  px-5
                  py-2.5
                  rounded-xl
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:opacity-90
                "
                style={{
                  backgroundColor: PRIMARY,
                }}
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}