// src/pages/affiliate/AffiliateDashboard.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    Wallet,
    Users,
    ShoppingCart,
    Copy,
    Check,
    Link as LinkIcon,
    Eye,
    EyeOff,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

const PRIMARY = "#fe7f2d";
const DARK = "#464243";

export default function AffiliateDashboard() {
    const { user } = useAuth();

    // ============================================================
    // STATES
    // ============================================================

    const [copied, setCopied] = useState(false);

    const [showBalance, setShowBalance] = useState(true);

    const [walletBalance, setWalletBalance] = useState(0);

    const [referralLink, setReferralLink] = useState("");

    const [dashboardLoading, setDashboardLoading] = useState(true);

    const [dashboardError, setDashboardError] = useState("");

    const [regFilter, setRegFilter] = useState("month");

    const [purchaseFilter, setPurchaseFilter] =
        useState("month");

    const [regDateFrom, setRegDateFrom] = useState("");

    const [regDateTo, setRegDateTo] = useState("");

    const [purchaseDateFrom, setPurchaseDateFrom] =
        useState("");

    const [purchaseDateTo, setPurchaseDateTo] =
        useState("");

    // ============================================================
    // STATS
    // ============================================================

    const [stats, setStats] = useState({
        registrations: {
            today: 0,
            week: 0,
            month: 0,
        },

        purchases: {
            today: 0,
            week: 0,
            month: 0,
        },
    });

    // ============================================================
    // LOAD DASHBOARD
    // ============================================================

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            setDashboardLoading(true);

            setDashboardError("");

            const res = await api.get(
                "/affiliate/dashboard"
            );

            console.log(
                "Affiliate Dashboard Response:",
                res.data
            );

            if (res.data.status === true) {
                const data = res.data.data || {};

                // ==================================================
                // WALLET
                // ==================================================

                setWalletBalance(
                    Number(data.wallet_balance || 0)
                );

                // ==================================================
                // REFERRAL LINK
                // ==================================================

                setReferralLink(
                    data.referral_link || ""
                );

                // ==================================================
                // REGISTRATIONS
                // ==================================================

                setStats({
                    registrations: {
                        today: Number(
                            data.registrations?.today || 0
                        ),

                        week: Number(
                            data.registrations?.this_week || 0
                        ),

                        month: Number(
                            data.registrations?.this_month || 0
                        ),
                    },

                    // ==================================================
                    // PURCHASES
                    // ==================================================

                    purchases: {
                        today: Number(
                            data.purchases?.today || 0
                        ),

                        week: Number(
                            data.purchases?.this_week || 0
                        ),

                        month: Number(
                            data.purchases?.this_month || 0
                        ),
                    },
                });
            } else {
                setDashboardError(
                    res.data.message ||
                        "Unable to load dashboard."
                );
            }
        } catch (error) {
            console.error(
                "Affiliate Dashboard Error:",
                error
            );

            console.error(
                "Status:",
                error.response?.status
            );

            console.error(
                "Response:",
                error.response?.data
            );

            if (
                error.response?.status === 401
            ) {
                setDashboardError(
                    "Your session has expired. Please login again."
                );
            } else if (
                error.response?.status === 403
            ) {
                setDashboardError(
                    "You are not authorized to access the affiliate dashboard."
                );
            } else {
                setDashboardError(
                    error.response?.data?.message ||
                        "Unable to load dashboard. Please try again."
                );
            }
        } finally {
            setDashboardLoading(false);
        }
    };

    // ============================================================
    // COPY REFERRAL LINK
    // ============================================================

    const copyLink = async () => {
        if (!referralLink) {
            return;
        }

        try {
            await navigator.clipboard.writeText(
                referralLink
            );

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            console.error(
                "Failed to copy referral link:",
                error
            );
        }
    };

    // ============================================================
    // REGISTRATION VALUE
    // ============================================================

    const getRegValue = () => {
        if (regFilter === "today") {
            return stats.registrations.today;
        }

        if (regFilter === "week") {
            return stats.registrations.week;
        }

        if (regFilter === "month") {
            return stats.registrations.month;
        }

        // Custom API is not currently available
        // from the dashboard endpoint.
        return 0;
    };

    // ============================================================
    // PURCHASE VALUE
    // ============================================================

    const getPurchaseValue = () => {
        if (purchaseFilter === "today") {
            return stats.purchases.today;
        }

        if (purchaseFilter === "week") {
            return stats.purchases.week;
        }

        if (purchaseFilter === "month") {
            return stats.purchases.month;
        }

        // Custom API is not currently available
        // from the dashboard endpoint.
        return 0;
    };

    // ============================================================
    // WALLET FORMATTING
    // ============================================================

    const formattedWalletBalance =
        Number(walletBalance).toLocaleString(
            "en-IN",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }
        );

    const hiddenBalance = "••••••";

    // ============================================================
    // FILTER LABEL
    // ============================================================

    const getFilterLabel = (filter) => {
        if (filter === "today") {
            return "Today";
        }

        if (filter === "week") {
            return "This Week";
        }

        if (filter === "month") {
            return "This Month";
        }

        return "Selected Period";
    };

    // ============================================================
    // FILTER BUTTONS
    // ============================================================

    const filterButtons = [
        {
            key: "today",
            label: "Today",
        },

        {
            key: "week",
            label: "This Week",
        },

        {
            key: "month",
            label: "This Month",
        },

        {
            key: "custom",
            label: "Custom",
        },
    ];

    // ============================================================
    // DASHBOARD LOADING
    // ============================================================

    if (dashboardLoading) {
        return (
            <div className="w-full min-h-[400px] flex items-center justify-center">
                <div className="text-center">
                    <div
                        className="w-10 h-10 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin mx-auto"
                    />

                    <p className="mt-4 text-gray-500 text-sm">
                        Loading dashboard...
                    </p>
                </div>
            </div>
        );
    }

    // ============================================================
    // RETURN
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
            {/* =====================================================
                HEADER
            ====================================================== */}

            <div
                className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-start
                    sm:justify-between
                    gap-5
                    mb-6
                    lg:mb-8
                "
            >
                {/* PAGE TITLE */}

                <div>
                    <h1
                        className="
                            text-2xl
                            sm:text-3xl
                            font-bold
                        "
                        style={{
                            color: DARK,
                        }}
                    >
                        Dashboard
                    </h1>

                    <p className="text-gray-500 mt-1 text-sm sm:text-base">
                        Welcome back,{" "}
                        <span className="font-medium">
                            {user?.name || "Affiliate"}
                        </span>
                    </p>
                </div>

                {/* WALLET BUTTON */}

                <Link
                    to="/affiliate/wallet"
                    className="
                        flex
                        items-center
                        gap-3
                        bg-white
                        border
                        border-gray-200
                        rounded-xl
                        px-4
                        sm:px-5
                        py-3
                        shadow-sm
                        hover:shadow-md
                        hover:border-orange-200
                        transition
                        shrink-0
                    "
                >
                    <div
                        className="
                            w-11
                            h-11
                            rounded-lg
                            flex
                            items-center
                            justify-center
                            bg-orange-50
                        "
                    >
                        <Wallet
                            size={22}
                            style={{
                                color: PRIMARY,
                            }}
                            strokeWidth={2}
                        />
                    </div>

                    <div className="text-left">
                        <p
                            className="
                                text-base
                                sm:text-lg
                                font-semibold
                            "
                            style={{
                                color: DARK,
                            }}
                        >
                            Wallet
                        </p>

                        <p className="text-xs text-gray-500 mt-0.5">
                            Available balance
                        </p>
                    </div>
                </Link>
            </div>

            {/* =====================================================
                ERROR MESSAGE
            ====================================================== */}

            {dashboardError && (
                <div
                    className="
                        mb-6
                        bg-red-50
                        border
                        border-red-200
                        text-red-700
                        rounded-xl
                        px-4
                        py-3
                        text-sm
                    "
                >
                    <div className="flex items-center justify-between gap-4">
                        <span>
                            {dashboardError}
                        </span>

                        <button
                            type="button"
                            onClick={fetchDashboard}
                            className="
                                font-medium
                                underline
                                shrink-0
                            "
                        >
                            Retry
                        </button>
                    </div>
                </div>
            )}

            {/* =====================================================
                WALLET BALANCE
            ====================================================== */}

            <div
                className="
                    relative
                    block
                    mb-6
                    lg:mb-8
                    bg-white
                    border
                    border-gray-200
                    rounded-2xl
                    shadow-sm
                    hover:shadow-md
                    transition
                    overflow-hidden
                "
            >
                <Link
                    to="/affiliate/wallet"
                    className="
                        block
                        w-full
                        p-5
                        sm:p-6
                        lg:p-7
                    "
                >
                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            gap-5
                        "
                    >
                        {/* LEFT */}

                        <div className="min-w-0">
                            <p
                                className="
                                    text-sm
                                    sm:text-base
                                    font-medium
                                    text-gray-600
                                "
                            >
                                Wallet Balance
                            </p>

                            <p
                                className="
                                    mt-1
                                    text-3xl
                                    sm:text-4xl
                                    lg:text-5xl
                                    font-bold
                                    tracking-tight
                                "
                                style={{
                                    color: DARK,
                                }}
                            >
                                ₹
                                {showBalance
                                    ? formattedWalletBalance
                                    : hiddenBalance}
                            </p>
                        </div>

                        {/* RIGHT */}

                        <div
                            className="
                                flex
                                items-center
                                gap-3
                                shrink-0
                            "
                        >
                            {/* EYE */}

                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();

                                    setShowBalance(
                                        (previous) =>
                                            !previous
                                    );
                                }}
                                className="
                                    w-11
                                    h-11
                                    rounded-xl
                                    flex
                                    items-center
                                    justify-center
                                    text-gray-500
                                    hover:text-gray-800
                                    hover:bg-gray-100
                                    active:bg-gray-200
                                    transition
                                "
                                title={
                                    showBalance
                                        ? "Hide balance"
                                        : "Show balance"
                                }
                                aria-label={
                                    showBalance
                                        ? "Hide wallet balance"
                                        : "Show wallet balance"
                                }
                            >
                                {showBalance ? (
                                    <Eye
                                        size={24}
                                        strokeWidth={2}
                                    />
                                ) : (
                                    <EyeOff
                                        size={24}
                                        strokeWidth={2}
                                    />
                                )}
                            </button>

                            {/* WALLET ICON */}

                            <div
                                className="
                                    w-14
                                    h-14
                                    sm:w-16
                                    sm:h-16
                                    rounded-2xl
                                    flex
                                    items-center
                                    justify-center
                                    bg-orange-50
                                "
                            >
                                <Wallet
                                    size={30}
                                    className="sm:w-8 sm:h-8"
                                    style={{
                                        color: PRIMARY,
                                    }}
                                    strokeWidth={2}
                                />
                            </div>
                        </div>
                    </div>
                </Link>
            </div>

            {/* =====================================================
                REFERRAL LINK
            ====================================================== */}

            <div
                className="
                    mb-6
                    lg:mb-8
                    p-4
                    sm:p-5
                    bg-white
                    rounded-2xl
                    border
                    border-gray-100
                    shadow-sm
                "
            >
                {/* TITLE */}

                <div className="flex items-center gap-2 mb-3">
                    <LinkIcon
                        size={19}
                        style={{
                            color: PRIMARY,
                        }}
                    />

                    <h3
                        className="font-semibold text-base sm:text-lg"
                        style={{
                            color: DARK,
                        }}
                    >
                        Your Referral Link
                    </h3>
                </div>

                {/* URL */}

                <div
                    className="
                        flex
                        flex-col
                        sm:flex-row
                        gap-3
                    "
                >
                    <input
                        type="text"
                        value={
                            referralLink || "No referral link available"
                        }
                        readOnly
                        className="
                            flex-1
                            min-w-0
                            bg-gray-50
                            border
                            border-gray-200
                            rounded-xl
                            px-4
                            py-3
                            text-sm
                            text-gray-700
                            outline-none
                            focus:border-orange-300
                        "
                    />

                    <button
                        type="button"
                        onClick={copyLink}
                        disabled={!referralLink}
                        className="
                            flex
                            items-center
                            justify-center
                            gap-2
                            px-6
                            py-3
                            text-white
                            rounded-xl
                            font-medium
                            transition
                            shrink-0
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                        "
                        style={{
                            backgroundColor: PRIMARY,
                        }}
                        onMouseEnter={(e) => {
                            if (!e.currentTarget.disabled) {
                                e.currentTarget.style.backgroundColor =
                                    "#e96d1e";
                            }
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor =
                                PRIMARY;
                        }}
                    >
                        {copied ? (
                            <Check size={18} />
                        ) : (
                            <Copy size={18} />
                        )}

                        {copied
                            ? "Copied!"
                            : "Copy Link"}
                    </button>
                </div>

                {/* AFFILIATE INFORMATION */}

                <div
                    className="
                        mt-3
                        flex
                        flex-wrap
                        items-center
                        gap-x-4
                        gap-y-1
                        text-sm
                        text-gray-500
                    "
                >
                    {user?.name && (
                        <span>
                            Affiliate:{" "}
                            <strong className="text-gray-700">
                                {user.name}
                            </strong>
                        </span>
                    )}

                    {user?.email && (
                        <span>
                            Email:{" "}
                            <strong className="text-gray-700">
                                {user.email}
                            </strong>
                        </span>
                    )}
                </div>
            </div>

            {/* =====================================================
                STATS
            ====================================================== */}

            <div
                className="
                    grid
                    grid-cols-1
                    lg:grid-cols-2
                    gap-5
                    lg:gap-6
                    mb-8
                "
            >
                {/* =================================================
                    REGISTRATIONS
                ================================================== */}

                <div
                    className="
                        bg-white
                        rounded-2xl
                        border
                        border-gray-100
                        shadow-sm
                        p-5
                        sm:p-6
                    "
                >
                    {/* TITLE */}

                    <div className="flex items-center gap-3 mb-5">
                        <div
                            className="
                                w-11
                                h-11
                                bg-blue-50
                                rounded-xl
                                flex
                                items-center
                                justify-center
                                shrink-0
                            "
                        >
                            <Users
                                size={22}
                                className="text-blue-600"
                            />
                        </div>

                        <h3
                            className="font-semibold text-lg"
                            style={{
                                color: DARK,
                            }}
                        >
                            Registrations
                        </h3>
                    </div>

                    {/* FILTERS */}

                    <div className="flex flex-wrap gap-2 mb-5">
                        {filterButtons.map(
                            (item) => (
                                <button
                                    key={item.key}
                                    type="button"
                                    onClick={() =>
                                        setRegFilter(
                                            item.key
                                        )
                                    }
                                    className="
                                        px-3
                                        sm:px-4
                                        py-1.5
                                        rounded-lg
                                        text-sm
                                        font-medium
                                        transition
                                    "
                                    style={
                                        regFilter ===
                                        item.key
                                            ? {
                                                  backgroundColor:
                                                      PRIMARY,
                                                  color: "#ffffff",
                                              }
                                            : {
                                                  backgroundColor:
                                                      "#f3f4f6",
                                                  color: "#4b5563",
                                              }
                                    }
                                >
                                    {item.label}
                                </button>
                            )
                        )}
                    </div>

                    {/* CUSTOM DATE */}

                    {regFilter ===
                        "custom" && (
                        <div
                            className="
                                flex
                                flex-col
                                sm:flex-row
                                gap-3
                                mb-5
                            "
                        >
                            <div className="flex-1">
                                <label className="text-xs text-gray-500 mb-1 block">
                                    From
                                </label>

                                <input
                                    type="date"
                                    value={
                                        regDateFrom
                                    }
                                    onChange={(e) =>
                                        setRegDateFrom(
                                            e.target
                                                .value
                                        )
                                    }
                                    className="
                                        w-full
                                        border
                                        border-gray-200
                                        rounded-lg
                                        px-3
                                        py-2
                                        text-sm
                                        outline-none
                                        focus:border-[#fe7f2d]
                                    "
                                />
                            </div>

                            <div className="flex-1">
                                <label className="text-xs text-gray-500 mb-1 block">
                                    To
                                </label>

                                <input
                                    type="date"
                                    value={
                                        regDateTo
                                    }
                                    onChange={(e) =>
                                        setRegDateTo(
                                            e.target
                                                .value
                                        )
                                    }
                                    className="
                                        w-full
                                        border
                                        border-gray-200
                                        rounded-lg
                                        px-3
                                        py-2
                                        text-sm
                                        outline-none
                                        focus:border-[#fe7f2d]
                                    "
                                />
                            </div>
                        </div>
                    )}

                    {/* VALUE */}

                    <div
                        className="
                            text-center
                            py-5
                            bg-blue-50
                            rounded-xl
                        "
                    >
                        <p className="text-4xl font-bold text-blue-600">
                            {getRegValue()}
                        </p>

                        <p className="text-sm text-blue-500 mt-1">
                            {getFilterLabel(
                                regFilter
                            )}
                        </p>
                    </div>
                </div>

                {/* =================================================
                    PURCHASES
                ================================================== */}

                <div
                    className="
                        bg-white
                        rounded-2xl
                        border
                        border-gray-100
                        shadow-sm
                        p-5
                        sm:p-6
                    "
                >
                    {/* TITLE */}

                    <div className="flex items-center gap-3 mb-5">
                        <div
                            className="
                                w-11
                                h-11
                                bg-green-50
                                rounded-xl
                                flex
                                items-center
                                justify-center
                                shrink-0
                            "
                        >
                            <ShoppingCart
                                size={22}
                                className="text-green-600"
                            />
                        </div>

                        <h3
                            className="font-semibold text-lg"
                            style={{
                                color: DARK,
                            }}
                        >
                            Purchases
                        </h3>
                    </div>

                    {/* FILTERS */}

                    <div className="flex flex-wrap gap-2 mb-5">
                        {filterButtons.map(
                            (item) => (
                                <button
                                    key={item.key}
                                    type="button"
                                    onClick={() =>
                                        setPurchaseFilter(
                                            item.key
                                        )
                                    }
                                    className="
                                        px-3
                                        sm:px-4
                                        py-1.5
                                        rounded-lg
                                        text-sm
                                        font-medium
                                        transition
                                    "
                                    style={
                                        purchaseFilter ===
                                        item.key
                                            ? {
                                                  backgroundColor:
                                                      PRIMARY,
                                                  color: "#ffffff",
                                              }
                                            : {
                                                  backgroundColor:
                                                      "#f3f4f6",
                                                  color: "#4b5563",
                                              }
                                    }
                                >
                                    {item.label}
                                </button>
                            )
                        )}
                    </div>

                    {/* CUSTOM DATE */}

                    {purchaseFilter ===
                        "custom" && (
                        <div
                            className="
                                flex
                                flex-col
                                sm:flex-row
                                gap-3
                                mb-5
                            "
                        >
                            <div className="flex-1">
                                <label className="text-xs text-gray-500 mb-1 block">
                                    From
                                </label>

                                <input
                                    type="date"
                                    value={
                                        purchaseDateFrom
                                    }
                                    onChange={(e) =>
                                        setPurchaseDateFrom(
                                            e.target
                                                .value
                                        )
                                    }
                                    className="
                                        w-full
                                        border
                                        border-gray-200
                                        rounded-lg
                                        px-3
                                        py-2
                                        text-sm
                                        outline-none
                                        focus:border-[#fe7f2d]
                                    "
                                />
                            </div>

                            <div className="flex-1">
                                <label className="text-xs text-gray-500 mb-1 block">
                                    To
                                </label>

                                <input
                                    type="date"
                                    value={
                                        purchaseDateTo
                                    }
                                    onChange={(e) =>
                                        setPurchaseDateTo(
                                            e.target
                                                .value
                                        )
                                    }
                                    className="
                                        w-full
                                        border
                                        border-gray-200
                                        rounded-lg
                                        px-3
                                        py-2
                                        text-sm
                                        outline-none
                                        focus:border-[#fe7f2d]
                                    "
                                />
                            </div>
                        </div>
                    )}

                    {/* VALUE */}

                    <div
                        className="
                            text-center
                            py-5
                            bg-green-50
                            rounded-xl
                        "
                    >
                        <p className="text-4xl font-bold text-green-600">
                            {getPurchaseValue()}
                        </p>

                        <p className="text-sm text-green-500 mt-1">
                            {getFilterLabel(
                                purchaseFilter
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}