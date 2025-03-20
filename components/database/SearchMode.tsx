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
        <div className="relative z-10 grid grid-cols-2 gap-4 font-semibold">
          <button
            onClick={() => handleSelectMode("words")}
            className={`px-4 py-5 rounded-lg text-sm ${selectedMode === "" ? "hover:scale-[98%]" : ""}  ${
              selectedMode === "words" ? "text-text fill-text" : ""
            } ${selectedMode === "stats" ? "text-disabledText fill-disabledText hover:text-text hover:fill-text" : ""} smooth`}
          >
            <div className="flex items-center gap-x-2 justify-center">
              <QuoteIcon /> Find characteristics of specific words
            </div>
          </button>
          <button
            onClick={() => handleSelectMode("stats")}
            className={`px-4 py-5 rounded-lg text-sm ${selectedMode === "" ? "hover:scale-[98%]" : ""}  ${
              selectedMode === "stats" ? "text-text fill-text" : ""
            } ${selectedMode === "words" ? "text-disabledText fill-disabledText hover:text-text hover:fill-text" : ""} smooth`}
          >
            <div className="flex items-center gap-x-2 justify-center">
              <StatsIcon /> Find words with specific characteristics
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
