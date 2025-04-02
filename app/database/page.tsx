"use client";
import * as React from "react";
import { SearchMode } from "@/components/database/SearchMode";

import { WordsInput } from "@/components/database/WordsInput";
import { StatsInput } from "@/components/database/StatsInput";
import { SearchWord } from "@/components/database/SearchWord";

export default function DatabasePage() {
  const [selectedMode, setSelectedMode] = React.useState("");

  const handleSelectMode = (mode: string) => {
    setSelectedMode(mode);
  };

  return (
    <section className="w-full flex flex-col gap-y-16 justify-center mx-auto max-w-7xl text-center md:text-left mb-16 global-width">
      {/* Search Mode */}
      <div
        className={`flex space-y-8 w-full flex-col smooth ${
          selectedMode ? "" : ""
        }`}
      >
        <div className="space-y-4">
          <h3 className="">What do you want to search for?</h3>
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
        <WordsInput handleSelectMode={handleSelectMode} />
      )}

      {selectedMode == "stats" && (
        <StatsInput handleSelectMode={handleSelectMode} />
      )}
    </section>
  );
}
