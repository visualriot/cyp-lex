import React from "react";

import { QuoteIcon, StatsIcon } from "../icons";

interface SearchMode {
  selectedMode: string;
  handleSelectMode: (mode: string) => void;
}

export const SearchMode: React.FC<SearchMode> = ({
  selectedMode,
  handleSelectMode,
}) => {
  console.log("selectedMode", selectedMode);
  return (
    <div className="flex flex-col space-y-4">
      <div className="relative w-full bg-foreground-200 rounded-lg">
        {/* slider animation */}
        {selectedMode && (
          <div
            className={`absolute h-full w-1/2 border-4  bg-white  rounded-lg smooth ${
              selectedMode === "stats" ? "translate-x-full" : ""
            }`}
          ></div>
        )}

        {/* buttons container */}
        <div className="relative z-10 flex font-semibold">
          <button
            onClick={() => handleSelectMode("words")}
            className={`flex-1 px-4 py-5 rounded-lg text-sm ${
              selectedMode === "" ? "hover:scale-[98%]" : ""
            } ${selectedMode === "words" ? "text-text fill-text" : ""} ${
              selectedMode === "stats"
                ? "text-disabledText fill-disabledText hover:text-text hover:scale-[98%] hover:fill-text"
                : ""
            } smooth`}
          >
            <div className="flex flex-col lg:flex-row items-center gap-x-2 gap-y-2 justify-center">
              <QuoteIcon size={16} /> Characteristics of specific words
            </div>
          </button>
          <div className="w-[1px] bg-white opacity-50"></div>
          <button
            onClick={() => handleSelectMode("stats")}
            className={`flex-1 px-4 py-5 rounded-lg text-sm ${
              selectedMode === "" ? "hover:scale-[98%]" : ""
            } ${selectedMode === "stats" ? "text-text fill-text" : ""} ${
              selectedMode === "words"
                ? "text-disabledText fill-disabledText hover:text-text hover:scale-[98%] hover:fill-text"
                : ""
            } smooth`}
          >
            <div className="flex flex-col lg:flex-row items-center gap-x-2 gap-y-2 justify-center">
              <StatsIcon size={16} /> Words with specific characteristics
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
