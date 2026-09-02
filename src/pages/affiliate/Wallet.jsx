import React, { useState } from "react";
import {
  Wallet as WalletIcon,
  ArrowDownLeft,
  ArrowUpRight,
  IndianRupee,
  Filter,
} from "lucide-react";

export default function Wallet() {
  const [filter, setFilter] = useState("all");

  // Static wallet transactions
  // Replace this with API data later
  const transactions = [
    {
      id: 1,
      date: "28 Aug 2026",
      description: "Commission from Organization Registration",
      type: "credit",
      amount: 500,
      status: "Completed",
    },
    {
      id: 2,
      date: "25 Aug 2026",
      description: "Commission from Purchase",
      type: "credit",
      amount: 750,
      status: "Completed",
    },
    {
      id: 3,
      date: "20 Aug 2026",
      description: "Commission from Organization Registration",
      type: "credit",
      amount: 450,
      status: "Completed",
    },
    {
      id: 4,
      date: "15 Aug 2026",
      description: "Wallet Withdrawal",
      type: "debit",
      amount: 500,
      status: "Completed",
    },
    {
      id: 5,
      date: "10 Aug 2026",
      description: "Commission from Purchase",
      type: "credit",
      amount: 800.75,
      status: "Completed",
    },
    {
      id: 6,
      date: "05 Aug 2026",
      description: "Commission from Organization Registration",
      type: "credit",
      amount: 450,
      status: "Completed",
    },
  ];

  const walletBalance = 2450.75;

  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter(
          (transaction) => transaction.type === filter
        );

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Wallet
          </h1>

          <p className="text-gray-500 mt-1">
            View your wallet balance and all transactions
          </p>
        </div>

        {/* Balance */}
        <div className="flex items-center gap-3">

          <div className="w-11 h-11 bg-orange-50 rounded-xl flex items-center justify-center">

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
              ₹
              {walletBalance.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
              })}
            </p>

          </div>

        </div>

      </div>

      {/* ================= BALANCE CARD ================= */}
      <div
        className="
          bg-gradient-to-r
          from-[#FC6C26]
          to-orange-600
          rounded-2xl
          p-6
          text-white
          shadow-lg
          mb-8
        "
      >

        <div className="flex items-center justify-between">

          <div>

            <p className="text-orange-100 text-sm font-medium">
              Wallet Balance
            </p>

            <p className="text-4xl font-bold mt-2">
              ₹
              {walletBalance.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
              })}
            </p>

            <p className="text-orange-100 text-sm mt-2">
              Available wallet amount
            </p>

          </div>

          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">

            <WalletIcon size={32} />

          </div>

        </div>

      </div>

      {/* ================= TRANSACTIONS ================= */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">

        {/* Header */}
        <div className="p-6 border-b border-gray-100">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            <div>

              <h2 className="text-lg font-semibold text-gray-900">
                Wallet Transactions
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Complete history of your wallet activity
              </p>

            </div>

            {/* Filter */}
            <div className="flex items-center gap-2">

              <Filter
                size={17}
                className="text-gray-400"
              />

              <button
                onClick={() => setFilter("all")}
                className={`
                  px-4 py-2
                  rounded-lg
                  text-sm
                  font-medium
                  ${
                    filter === "all"
                      ? "bg-[#FC6C26] text-white"
                      : "bg-gray-100 text-gray-600"
                  }
                `}
              >
                All
              </button>

              <button
                onClick={() => setFilter("credit")}
                className={`
                  px-4 py-2
                  rounded-lg
                  text-sm
                  font-medium
                  ${
                    filter === "credit"
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-600"
                  }
                `}
              >
                Credits
              </button>

              <button
                onClick={() => setFilter("debit")}
                className={`
                  px-4 py-2
                  rounded-lg
                  text-sm
                  font-medium
                  ${
                    filter === "debit"
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 text-gray-600"
                  }
                `}
              >
                Debits
              </button>

            </div>

          </div>

        </div>

        {/* ================= TABLE ================= */}
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

              {filteredTransactions.map((transaction) => (

                <tr
                  key={transaction.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >

                  {/* Date */}
                  <td className="px-6 py-5">

                    <p className="text-sm font-medium text-gray-900">
                      {transaction.date}
                    </p>

                  </td>

                  {/* Description */}
                  <td className="px-6 py-5">

                    <div className="flex items-center gap-3">

                      <div
                        className={`
                          w-10 h-10
                          rounded-xl
                          flex items-center justify-center
                          ${
                            transaction.type === "credit"
                              ? "bg-green-50"
                              : "bg-red-50"
                          }
                        `}
                      >

                        {transaction.type === "credit" ? (
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
                          {transaction.description}
                        </p>

                        <p className="text-xs text-gray-400 mt-1">
                          Transaction #{transaction.id}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* Type */}
                  <td className="px-6 py-5">

                    {transaction.type === "credit" ? (

                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-medium">
                        <ArrowDownLeft size={13} />
                        Credit
                      </span>

                    ) : (

                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-50 text-red-500 text-xs font-medium">
                        <ArrowUpRight size={13} />
                        Debit
                      </span>

                    )}

                  </td>

                  {/* Amount */}
                  <td className="px-6 py-5 text-right">

                    <p
                      className={`
                        font-semibold
                        ${
                          transaction.type === "credit"
                            ? "text-green-600"
                            : "text-red-500"
                        }
                      `}
                    >
                      {transaction.type === "credit"
                        ? "+"
                        : "-"}
                      ₹
                      {transaction.amount.toLocaleString(
                        "en-IN",
                        {
                          minimumFractionDigits: 2,
                        }
                      )}
                    </p>

                  </td>

                  {/* Status */}
                  <td className="px-6 py-5 text-right">

                    <span className="inline-flex px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-medium">
                      {transaction.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* Empty state */}
        {filteredTransactions.length === 0 && (

          <div className="py-16 text-center">

            <WalletIcon
              size={40}
              className="mx-auto text-gray-300"
            />

            <p className="text-gray-500 mt-3">
              No wallet transactions found
            </p>

          </div>

        )}

      </div>

    </div>
  );
}