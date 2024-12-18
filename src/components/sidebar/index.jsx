/* eslint-disable */

import logo from "assets/img/logo/logo.png";
import routes from "constants/menu";
import { HiX } from "react-icons/hi";
import MultiMenu from "./components/Multimenu";

const Sidebar = ({ open, onClose }) => {
  return (
    <div
      className={`sm:none duration-175 linear fixed z-[9999] flex h-full min-h-full w-[250px] flex-col bg-white shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className={`mx-[56px] mt-[20px] flex items-center`}>
        <img src={logo} alt="9job" width={100} height={100} />
      </div>

      <div className="mt-[28px]  bg-gray-300 px-3 dark:bg-white/30" />
      {/* Nav item */}

      <ul className="h-full  overflow-y-auto pt-1">
        <MultiMenu routes={routes} onSideBarClose={onClose} />
      </ul>

      {/* Nav item end */}
    </div>
  );
};

export default Sidebar;
