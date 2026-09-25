import { useEffect, useState } from "react";
import {
  Wallet as WalletIcon,
  ArrowDownLeft,
  ArrowUpRight,
  Filter,
  Loader2,
  RefreshCw,
} from "lucide-react";

import api from "../../services/api";

export default function Wallet() {
  const [filter, setFilter] = useState("all");

  const [walletBalance, setWalletBalance] = useState(0);

  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 10,
    total: 0,
    last_page: 1,
  });

  // ============================================================
  // LOAD WALLET
  // ============================================================

  const loadWallet = async (selectedFilter = filter, page = 1) => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/affiliate/wallet", {
        params: {
          type: selectedFilter,
          page,
          per_page: 10,
        },
      });

      if (!response.data?.status) {
        throw new Error(
          response.data?.message ||
            "Unable to fetch wallet."
        );
      }

      const data = response.data.data;

      // --------------------------------------------------------
      // Wallet Balance
      // --------------------------------------------------------

      setWalletBalance(
        Number(data?.wallet_balance || 0)
      );

      // --------------------------------------------------------
      // Transactions
      // --------------------------------------------------------

      setTransactions(
        data?.transactions?.data || []
      );

      // --------------------------------------------------------
      // Pagination
      // --------------------------------------------------------

      setPagination({
        current_page:
          data?.transactions?.current_page || 1,

        per_page:
          data?.transactions?.per_page || 10,

        total:
          data?.transactions?.total || 0,

        last_page:
          data?.transactions?.last_page || 1,
      });

    } catch (err) {
      console.error(
        "Wallet API Error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to load wallet."
      );

      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // INITIAL LOAD
  // ============================================================

  useEffect(() => {
    loadWallet("all", 1);
  }, []);

  // ============================================================
  // FILTER
  // ============================================================

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);

    loadWallet(newFilter, 1);
  };

  // ============================================================
  // PAGINATION
  // ============================================================

  const handlePageChange = (page) => {
    if (
      page < 1 ||
      page > pagination.last_page
    ) {
      return;
    }

    loadWallet(filter, page);
  };

  // ============================================================
  // FORMAT BALANCE
  // ============================================================

  const formattedBalance =
    Number(walletBalance).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );

  // ============================================================
  // TRANSACTION STATUS
  // ============================================================

  const getStatusClass = (status) => {
    switch (
      String(status || "").toLowerCase()
    ) {
      case "completed":
      case "paid":
      case "success":
        return "bg-green-50 text-green-600";

      case "pending":
        return "bg-yellow-50 text-yellow-600";

      case "failed":
      case "cancelled":
        return "bg-red-50 text-red-500";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">

      {/* ========================================================
          HEADER
      ========================================================= */}

      <div
        className="
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-4
          mb-8
        "
      >

        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Wallet
          </h1>

          <p className="text-gray-500 mt-1">
            View your wallet balance and all transactions
          </p>
        </div>

        {/* Current Balance */}
        <div className="flex items-center gap-3">

          <div
            className="
              w-11
              h-11
              bg-orange-50
              rounded-xl
              flex
              items-center
              justify-center
            "
          >
            <WalletIcon
              size={22}
              className="text-[#FC6C26]"
            />
          </div>

          <div>

            <p className="text-xs text-gray-500">
              Current Balance
            </p>

            <p className="text-xl font-bold text-gray-900">
              ₹{formattedBalance}
            </p>

          </div>

        </div>

      </div>


      {/* ========================================================
          TRANSACTIONS CARD
      ========================================================= */}

      <div
        className="
          bg-white
          rounded-2xl
          border
          border-gray-100
          shadow-sm
        "
      >

        {/* ======================================================
            HEADER
        ======================================================= */}

        <div className="p-6 border-b border-gray-100">

          <div
            className="
              flex
              flex-col
              lg:flex-row
              lg:items-center
              lg:justify-between
              gap-4
            "
          >

            <div>

              <h2 className="text-lg font-semibold text-gray-900">
                Wallet Transactions
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Complete history of your wallet activity
              </p>

            </div>


            {/* ==================================================
                FILTER
            =================================================== */}

            <div className="flex items-center gap-2 flex-wrap">

              <Filter
                size={17}
                className="text-gray-400"
              />

              {/* ALL */}

              <button
                onClick={() =>
                  handleFilterChange("all")
                }
                disabled={loading}
                className={`
                  px-4
                  py-2
                  rounded-lg
                  text-sm
                  font-medium
                  transition
                  ${
                    filter === "all"
                      ? "bg-[#FC6C26] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }
                  disabled:opacity-60
                `}
              >
                All
              </button>


              {/* CREDITS */}

              <button
                onClick={() =>
                  handleFilterChange("credit")
                }
                disabled={loading}
                className={`
                  px-4
                  py-2
                  rounded-lg
                  text-sm
                  font-medium
                  transition
                  ${
                    filter === "credit"
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }
                  disabled:opacity-60
                `}
              >
                Credits
              </button>


              {/* DEBITS */}

              <button
                onClick={() =>
                  handleFilterChange("debit")
                }
                disabled={loading}
                className={`
                  px-4
                  py-2
                  rounded-lg
                  text-sm
                  font-medium
                  transition
                  ${
                    filter === "debit"
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }
                  disabled:opacity-60
                `}
              >
                Debits
              </button>


              {/* REFRESH */}

              <button
                onClick={() =>
                  loadWallet(filter, pagination.current_page)
                }
                disabled={loading}
                className="
                  ml-1
                  w-9
                  h-9
                  rounded-lg
                  bg-gray-100
                  text-gray-500
                  flex
                  items-center
                  justify-center
                  hover:bg-gray-200
                  transition
                  disabled:opacity-50
                "
                title="Refresh wallet"
              >
                <RefreshCw
                  size={16}
                  className={
                    loading
                      ? "animate-spin"
                      : ""
                  }
                />
              </button>

            </div>

          </div>

        </div>


        {/* ======================================================
            ERROR
        ======================================================= */}

        {error && (

          <div className="mx-6 mt-6 rounded-xl bg-red-50 border border-red-200 px-4 py-3">

            <p className="text-sm text-red-600">
              {error}
            </p>

          </div>

        )}


        {/* ======================================================
            TABLE
        ======================================================= */}

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="bg-gray-50 border-b border-gray-100">

                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Date
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Description
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Type
                </th>

                <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Amount
                </th>

                <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                  Status
                </th>

              </tr>

            </thead>


            <tbody>

              {/* =================================================
                  LOADING
              ================================================== */}

              {loading ? (

                <tr>

                  <td
                    colSpan="5"
                    className="px-6 py-16 text-center"
                  >

                    <div className="flex flex-col items-center justify-center">

                      <Loader2
                        size={32}
                        className="
                          animate-spin
                          text-[#FC6C26]
                        "
                      />

                      <p className="text-gray-500 mt-3 text-sm">
                        Loading wallet transactions...
                      </p>

                    </div>

                  </td>

                </tr>

              ) : transactions.length > 0 ? (

                /* =================================================
                   TRANSACTIONS
                ================================================== */

                transactions.map(
                  (transaction) => {

                    const isCredit =
                      String(
                        transaction.type
                      ).toLowerCase() ===
                      "credit";

                    return (

                      <tr
                        key={transaction.id}
                        className="
                          border-b
                          border-gray-100
                          hover:bg-gray-50
                          transition
                        "
                      >

                        {/* DATE */}

                        <td className="px-6 py-5">

                          <p className="text-sm font-medium text-gray-900">

                            {transaction.display_date ||
                              transaction.date ||
                              "-"}

                          </p>

                        </td>


                        {/* DESCRIPTION */}

                        <td className="px-6 py-5">

                          <div className="flex items-center gap-3">

                            <div
                              className={`
                                w-10
                                h-10
                                rounded-xl
                                flex
                                items-center
                                justify-center
                                ${
                                  isCredit
                                    ? "bg-green-50"
                                    : "bg-red-50"
                                }
                              `}
                            >

                              {isCredit ? (

                                <ArrowDownLeft
                                  size={19}
                                  className="text-green-600"
                                />

                              ) : (

                                <ArrowUpRight
                                  size={19}
                                  className="text-red-500"
                                />

                              )}

                            </div>


                            <div>

                              <p className="text-sm font-medium text-gray-900">

                                {transaction.description ||
                                  "-"}

                              </p>


                              <p className="text-xs text-gray-400 mt-1">

                                {transaction.transaction_no ||
                                  `Transaction #${transaction.id}`}

                              </p>

                            </div>

                          </div>

                        </td>


                        {/* TYPE */}

                        <td className="px-6 py-5">

                          {isCredit ? (

                            <span
                              className="
                                inline-flex
                                items-center
                                gap-1
                                px-3
                                py-1
                                rounded-full
                                bg-green-50
                                text-green-600
                                text-xs
                                font-medium
                              "
                            >

                              <ArrowDownLeft
                                size={13}
                              />

                              Credit

                            </span>

                          ) : (

                            <span
                              className="
                                inline-flex
                                items-center
                                gap-1
                                px-3
                                py-1
                                rounded-full
                                bg-red-50
                                text-red-500
                                text-xs
                                font-medium
                              "
                            >

                              <ArrowUpRight
                                size={13}
                              />

                              Debit

                            </span>

                          )}

                        </td>


                        {/* AMOUNT */}

                        <td className="px-6 py-5 text-right">

                          <p
                            className={`
                              font-semibold
                              ${
                                isCredit
                                  ? "text-green-600"
                                  : "text-red-500"
                              }
                            `}
                          >

                            {isCredit
                              ? "+"
                              : "-"}

                            ₹

                            {Number(
                              transaction.amount || 0
                            ).toLocaleString(
                              "en-IN",
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            )}

                          </p>

                        </td>


                        {/* STATUS */}

                        <td className="px-6 py-5 text-right">

                          <span
                            className={`
                              inline-flex
                              px-3
                              py-1
                              rounded-full
                              text-xs
                              font-medium
                              capitalize
                              ${getStatusClass(
                                transaction.status
                              )}
                            `}
                          >

                            {transaction.status ||
                              "Unknown"}

                          </span>

                        </td>

                      </tr>

                    );
                  }
                )

              ) : (

                /* =================================================
                   EMPTY
                ================================================== */

                <tr>

                  <td
                    colSpan="5"
                    className="px-6 py-16 text-center"
                  >

                    <WalletIcon
                      size={40}
                      className="mx-auto text-gray-300"
                    />

                    <p className="text-gray-500 mt-3">
                      No wallet transactions found
                    </p>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>


        {/* ======================================================
            PAGINATION
        ======================================================= */}

        {!loading &&
          transactions.length > 0 &&
          pagination.last_page > 1 && (

            <div
              className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                sm:justify-between
                gap-3
                px-6
                py-4
                border-t
                border-gray-100
              "
            >

              <p className="text-sm text-gray-500">

                Showing page{" "}
                <span className="font-medium text-gray-700">
                  {pagination.current_page}
                </span>{" "}
                of{" "}
                <span className="font-medium text-gray-700">
                  {pagination.last_page}
                </span>

                {" "}(
                {pagination.total} transactions)

              </p>


              <div className="flex items-center gap-2">

                <button
                  onClick={() =>
                    handlePageChange(
                      pagination.current_page - 1
                    )
                  }
                  disabled={
                    pagination.current_page <= 1 ||
                    loading
                  }
                  className="
                    px-4
                    py-2
                    rounded-lg
                    bg-gray-100
                    text-gray-600
                    text-sm
                    font-medium
                    hover:bg-gray-200
                    disabled:opacity-40
                    disabled:cursor-not-allowed
                  "
                >
                  Previous
                </button>


                <button
                  onClick={() =>
                    handlePageChange(
                      pagination.current_page + 1
                    )
                  }
                  disabled={
                    pagination.current_page >=
                      pagination.last_page ||
                    loading
                  }
                  className="
                    px-4
                    py-2
                    rounded-lg
                    bg-gray-100
                    text-gray-600
                    text-sm
                    font-medium
                    hover:bg-gray-200
                    disabled:opacity-40
                    disabled:cursor-not-allowed
                  "
                >
                  Next
                </button>

              </div>

            </div>

          )}

      </div>

    </div>
  );
}