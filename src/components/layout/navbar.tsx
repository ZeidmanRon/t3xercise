// const MobileNavbar: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <nav className="fixed left-0 right-0 top-0 z-10 bg-white p-4 text-gray-800 shadow-md">
//       <div className="flex items-center justify-between">
//         <button onClick={toggleMenu} className="p-2 focus:outline-none">
//           <Bars3Icon className="h-6 w-6" />
//         </button>
//         <a href="home/" className="handwrite text-[2rem] tracking-tight">
//           T3XERCISE
//         </a>
//       </div>
//       <div
//         className={`${
//           isOpen ? "flex w-full flex-col justify-center text-center" : "hidden"
//         }`}
//       >
//         <T3href
//           text="לדף הבית"
//           href="/home"
//           icon={<HomeIcon className="h-6 w-6" />}
//         />
//         <T3href
//           text="התרגילים שלי"
//           href="/exercises"
//           icon={<ClipboardDocumentListIcon className="h-6 w-6" />}
//         />
//         <T3href
//           text="לדף העסק"
//           href="/home"
//           icon={<BriefcaseIcon className="h-6 w-6" />}
//         />
//       </div>
//     </nav>
//   );
// };

// export default MobileNavbar;
import { useState, useRef, useEffect } from "react";
import autoAnimate from "@formkit/auto-animate";
import {MenuIcon, HomeIcon, ClipboardListIcon, BriefcaseIcon} from "lucide-react"
import { T3href } from "./t3href";

const MobileNavbar: React.FC = () => {
  const [show, setShow] = useState(false);
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const reveal = () => setShow(!show);

  return (
    <nav
      ref={parent}
      className="fixed left-0 right-0 top-0 z-10 bg-white p-4 text-gray-800 shadow-md"
    >
      <div className="flex items-center justify-between">
        <button onClick={reveal} className="p-2 focus:outline-none">
          <MenuIcon className="h-6 w-6" />
        </button>
        <a href="home/" className="handwrite text-[2rem] tracking-tight">
          T3XERCISE
        </a>
      </div>
      {show ? (
        <div className="flex flex-col py-3">
          <T3href
            text="לדף הבית"
            href="/home"
            icon={<HomeIcon className="h-6 w-6" />}
          />
          <T3href
            text="התרגילים שלי"
            href="/exercises"
            icon={<ClipboardListIcon className="h-6 w-6" />}
          />
          <T3href
            text="לדף העסק"
            href="/home"
            icon={<BriefcaseIcon className="h-6 w-6" />}
          />
        </div>
      ) : (
        <></>
      )}
    </nav>
  );
};

export default MobileNavbar;
