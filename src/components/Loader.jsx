// //src/components/Loader.jsx
// import { useEffect, useState } from "react";

// export default function Loader({ show, text = "Loading..." }) {
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     let timer;

//     if (show) {
//       // show loader only if loading takes > 300ms
//       timer = setTimeout(() => setVisible(true), 300);
//     } else {
//       setVisible(false);
//     }

//     return () => clearTimeout(timer);
//   }, [show]);

//   if (!visible) return null;

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30">
//       <div className="flex flex-col items-center">
//         <div className="h-16 w-16 rounded-full bg-white shadow-lg flex items-center justify-center">
//           <img
//            src="/assets/Mi.svg"
//             alt="Loading"
//             className="h-40 w-40 object-contain animate-spin"
//           />
//         </div>

//         <p className="mt-3 text-white text-sm tracking-wide">{text}</p>
//       </div>
//     </div>
//   );
// }
//divya

//src/components/Loader.jsx
import { useEffect, useState } from "react";

export default function Loader({
  show = true,
  text = "Saving Card...",
}) {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (!show) {
      setPercentage(0);
      return;
    }

    let count = 0;

    const interval = setInterval(() => {
      count += 1;
      setPercentage(count);

      if (count >= 100) {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-white/60 backdrop-blur-sm">
      {/* <div className="w-[240px] rounded-3xl bg-[#464243]/90 backdrop-blur-xl border border-[#918D8A]/40 shadow-2xl p-7 flex flex-col items-center"> */}
        
        {/* Logo with rotating outer circle */}
        <div className="relative w-28 h-28 mb-4 flex items-center justify-center">
          
          {/* Outer rotating circle */}
          <div className="absolute inset-0 rounded-full border-4 border-[#918D8A]/30 border-t-[#fe7f2d] border-r-[#fe7f2d] animate-spin" />

          {/* Middle soft circle */}
          <div className="absolute inset-3 rounded-full border border-[#E8E8E6]/20" />

          {/* Logo */}
          <div className=" flex items-center justify-center">
            <img
              src="/assets/Fav.svg"
              alt="Loading"
              className="w-24 h-24 object-contain"
            />
          </div>
        </div>

        {/* Percentage */}
        {/* <p className="mt-1 text-[#E8E8E6] text-2xl font-extrabold">
          {percentage}%
        </p> */}

        {/* Progress Bar */}
        {/* <div className="mt-4 w-full h-2.5 rounded-full bg-[#918D8A]/40 overflow-hidden">
          <div
            className="h-full rounded-full bg-[#fe7f2d] transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div> */}
      {/* </div> */}
    </div>
  );
}