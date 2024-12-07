"use client";

import { useState } from "react";
import { ArrowFatLinesLeft } from "./icons";
import clsx from "clsx";

function Sidebar() {
  const [isActive, setIsActive] = useState(true);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <div
      className={clsx(
        "sticky bottom-0 lg:inset-0 h-24 bg-dark order-1 lg:-order-1 rounded-t-xl lg:rounded-r-xl lg:rounded-t-none lg:rounded-tr-xl py-10 flex flex-col lg:h-auto transition-all duration-500",
        isActive ? "lg:max-w-80 lg:w-80" : "w-20"
      )}
    >
      <p
        className={clsx(
          "text-white text-3xl font-bold px-8 hidden lg:inline-block"
        )}
      >
        <span
          className={clsx(
            "transition-all duration-700 absolute truncate",
            isActive
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          myfinance
        </span>

        <span
          className={clsx(
            "transition-all duration-700 absolute",
            isActive
              ? "opacity-0 pointer-events-none"
              : "opacity-100  pointer-events-auto"
          )}
        >
          f
        </span>
      </p>

      <button
        onClick={handleToggle}
        className="text-gray-400 items-center gap-2 px-8 mt-auto font-bold hover:text-white hidden lg:flex"
      >
        <span className="w-6 h-6 flex items-center justify-center">
          <ArrowFatLinesLeft />
        </span>
        <span
          className={clsx(
            "transition-opacity duration-500 truncate",
            isActive ? "opacity-100" : "opacity-0"
          )}
        >
          Minimize Menu
        </span>
      </button>
    </div>
  );
}

export default Sidebar;
