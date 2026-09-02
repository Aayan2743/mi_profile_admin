// // src/utils/alert.js
// import Swal from "sweetalert2";

// export const successAlert = (title, text) => {
//   Swal.fire({
//     icon: "success",
//     title,
//     text,
//     confirmButtonColor: "#4f46e5", // indigo
//   });
// };

// export const errorAlert = (title, text) => {
//   Swal.fire({
//     icon: "error",
//     title,
//     text,
//     confirmButtonColor: "#dc2626", // red
//   });
// };

// export const infoAlert = (title, text) => {
//   Swal.fire({
//     icon: "info",
//     title,
//     text,
//     confirmButtonColor: "#4f46e5",
//   });
// };


// // src/utils/alert.js
// import Swal from "sweetalert2";

// export const successAlert = (title, text) => {
//   Swal.fire({
//     icon: "success",
//     title,
//     text,
//     confirmButtonColor: "#f97316",      // --accent (orange)
//     confirmButtonText: "OK",
//     customClass: {
//       popup: "swal2-dark-theme",        // optional: add custom class if needed
//       title: "text-white",
//       content: "text-gray-300",
//       icon: "text-orange-500",
//     },
//     background: "#0f0f0f",              // dark background
//     color: "#ffffff",
//   });
// };

// export const errorAlert = (title, text) => {
//   Swal.fire({
//     icon: "error",
//     title,
//     text,
//     confirmButtonColor: "#f97316",      // orange instead of red
//     confirmButtonText: "OK",
//     customClass: {
//       popup: "swal2-dark-theme",
//       title: "text-white",
//       content: "text-gray-300",
//       icon: "text-orange-500",
//     },
//     background: "#0f0f0f",
//     color: "#ffffff",
//   });
// };

// export const infoAlert = (title, text) => {
//   Swal.fire({
//     icon: "info",
//     title,
//     text,
//     confirmButtonColor: "#f97316",      // orange
//     confirmButtonText: "OK",
//     customClass: {
//       popup: "swal2-dark-theme",
//       title: "text-white",
//       content: "text-gray-300",
//       icon: "text-orange-400",
//     },
//     background: "#0f0f0f",
//     color: "#ffffff",
//   });
// };


// src/utils/alert.js
import Swal from "sweetalert2";

/* ========================================
   MI PROFILE THEME COLORS
======================================== */
const PRIMARY_COLOR = "#464243";
const PRIMARY_DARK = "#464243";
const LIGHT_COLOR = "#E8EDF2";
const TEXT_COLOR = "#464243";

/* ========================================
   SUCCESS ALERT
======================================== */
export const successAlert = (title, text = "") => {
  return Swal.fire({
    icon: "success",
    title,
    text,
    confirmButtonColor: PRIMARY_COLOR,
    confirmButtonText: "OK",
    buttonsStyling: false,
    customClass: {
      confirmButton:
        "px-6 py-2.5 bg-[#464243] text-white font-medium rounded-lg hover:bg-[#464243] focus:outline-none transition-all shadow-sm",
      popup:
        "rounded-2xl shadow-2xl border border-[#E8EDF2] bg-white",
      title:
        "text-xl md:text-2xl font-bold text-[#464243]",
      content:
        "text-[#464243]/70",
    },
  });
};

/* ========================================
   ERROR ALERT
======================================== */
export const errorAlert = (title, text = "") => {
  return Swal.fire({
    icon: "error",
    title,
    text,
    confirmButtonColor: PRIMARY_COLOR,
    confirmButtonText: "OK",
    buttonsStyling: false,
    customClass: {
      confirmButton:
        "px-6 py-2.5 bg-[#464243] text-white font-medium rounded-lg hover:bg-[#464243] focus:outline-none transition-all shadow-sm",
      popup:
        "rounded-2xl shadow-2xl border border-[#464243] bg-white",
      title:
        "text-xl md:text-2xl font-bold text-[#464243]",
      content:
        "text-[#464243]/70",
    },
  });
};

/* ========================================
   WARNING ALERT
======================================== */
export const warningAlert = (title, text = "") => {
  return Swal.fire({
    icon: "warning",
    title,
    text,
    confirmButtonColor: PRIMARY_COLOR,
    confirmButtonText: "OK",
    buttonsStyling: false,
    customClass: {
      confirmButton:
        "px-6 py-2.5 bg-[#464243] text-white font-medium rounded-lg hover:bg-[#464243] focus:outline-none transition-all shadow-sm",
      popup:
        "rounded-2xl shadow-2xl border border-[#464243] bg-white",
      title:
        "text-xl md:text-2xl font-bold text-[#464243]",
      content:
        "text-[#464243]/70",
    },
  });
};

/* ========================================
   INFO ALERT
======================================== */
export const infoAlert = (title, text = "") => {
  return Swal.fire({
    icon: "info",
    title,
    text,
    confirmButtonColor: PRIMARY_COLOR,
    confirmButtonText: "OK",
    buttonsStyling: false,
    customClass: {
      confirmButton:
        "px-6 py-2.5 bg-[#464243] text-white font-medium rounded-lg hover:bg-[#024642431f26] focus:outline-none transition-all shadow-sm",
      popup:
        "rounded-2xl shadow-2xl border border-[#464243] bg-white",
      title:
        "text-xl md:text-2xl font-bold text-[#464243]",
      content:
        "text-[#464243]/70",
    },
  });
};

/* ========================================
   CONFIRM ALERT
======================================== */
export const confirmAlert = ({
  title = "Are you sure?",
  text = "This action cannot be undone",
  confirmText = "Yes, continue",
  cancelText = "Cancel",
} = {}) => {
  return Swal.fire({
    icon: "warning",
    title,
    text,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    reverseButtons: true,
    buttonsStyling: false,

    customClass: {
      confirmButton:
        "px-6 py-2.5 bg-[#464243] text-white font-medium rounded-lg hover:bg-[#464243] focus:outline-none transition-all shadow-sm",

      cancelButton:
        "px-6 py-2.5 bg-[#E8EDF2] text-[#464243] font-medium rounded-lg hover:bg-[#464243] focus:outline-none transition-all shadow-sm",

      popup:
        "rounded-2xl shadow-2xl border border-[#464243] bg-white",

      title:
        "text-xl md:text-2xl font-bold text-[#464243]",

      content:
        "text-[#464243]/70",
    },
  });
};
