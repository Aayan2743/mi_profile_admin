// //src/components/ThemeToggle.jsx
// export default function ThemeToggle({ dark, setDark }) {
//   return (
//     <button
//       onClick={() => setDark(!dark)}
//       className="px-4 py-2 rounded-lg border bg-white dark:bg-gray-800 
//                  text-gray-700 dark:text-gray-200 text-sm font-medium 
//                  hover:bg-gray-100 dark:hover:bg-gray-700 transition"
//     >
//       {dark ? "☀ Light Mode" : "🌙 Dark Mode"}
//     </button>
//   );
// // }

// import { useEffect, useState } from "react";
// import { Moon, Sun } from "lucide-react";

// export default function ThemeToggle() {
//   const [dark, setDark] = useState(() => {
//     // respect system preference on first load
//     if (localStorage.theme === "dark" ||
//        (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
//       return true;
//     }
//     return false;
//   });

//   useEffect(() => {
//     if (dark) {
//       document.documentElement.classList.add("dark");
//       localStorage.theme = "dark";
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.theme = "light";
//     }
//   }, [dark]);

//   return (
//     <button
//       onClick={() => setDark(!dark)}
//       className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition"
//       aria-label="Toggle dark mode"
//     >
//       {dark ? (
//         <Sun className="w-5 h-5 text-yellow-400" />
//       ) : (
//         <Moon className="w-5 h-5 text-indigo-600" />
//       )}
//     </button>
//   );
// }

// src/components/ThemeToggle.jsx
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    return (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="p-2 rounded-lg bg-orange-900/30 hover:bg-orange-800/50 transition"
      aria-label="Toggle theme"
    >
      {dark ? (
        <Sun className="w-5 h-5 text-orange-400" />
      ) : (
        <Moon className="w-5 h-5 text-orange-400" />
      )}
    </button>
  );
}