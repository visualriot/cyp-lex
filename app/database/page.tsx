"use client";
import * as React from "react";
import { SearchMode } from "@/components/database/SearchMode";

import { WordsInput } from "@/components/database/WordsInput";
import { StatsInput } from "@/components/database/StatsInput";

export default function DatabasePage() {
  const [selectedMode, setSelectedMode] = React.useState("");

  const handleSelectMode = (mode: string) => {
    setSelectedMode(mode);
  };

  return (
    <section className="w-full flex flex-col gap-y-16 h-full">
      {/* Search Mode */}
      <div
        className={`flex space-y-8 w-full flex-col smooth ${
          selectedMode ? "" : ""
        }`}
      >
        <div className="space-y-4">
          <h3 className="">What do you want to search for?</h3>
          <p className="text-disabledText">
            Select the search mode to continue automatically
          </p>
        </div>
        <div className="w-full flex rounded space-y-10 flex-col">
          <SearchMode
            selectedMode={selectedMode}
            handleSelectMode={handleSelectMode}
          />
        </div>
      </div>

      {/* Information to Retrieve */}

      {/* Input */}
      {selectedMode == "words" && (
        <WordsInput
          // selectedMode={selectedMode}
          handleSelectMode={handleSelectMode}
        />
      )}

      {selectedMode == "stats" && (
        <StatsInput
          selectedMode={selectedMode}
          handleSelectMode={handleSelectMode}
        />
      )}
    </section>
  );
}
