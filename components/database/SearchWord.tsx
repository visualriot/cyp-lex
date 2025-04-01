import React, { useState } from "react";

import { StatsSearchCriteria } from "@/app/types/data";
import { AgeBand } from "./AgeBand";
import { Submit } from "./Submit";

interface StatsInput {
  handleSelectMode: (mode: string) => void;
}

export const SearchWord: React.FC<StatsInput> = ({ handleSelectMode }) => {
  const [ageBand, setAgeBand] = useState("all");
  const [searchCriteria, setSearchCriteria] = React.useState<
    Partial<StatsSearchCriteria>
  >({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCriteria((prev) => ({
      ...prev,
      word: e.target.value,
      age: ageBand,
    }));
    console.log(searchCriteria);
  };

  // CLEAR BUTTON HANDLER ---------------------------------------------------------------------------------
  const handleClear = () => {
    handleSelectMode("");
  };

  return (
    <div className="space-y-8 w-full flex flex-col">
      <AgeBand ageBand={ageBand} setAgeBand={setAgeBand} />
      <input
        className="w-full border-2 border-gray-300 rounded-md p-2"
        placeholder="type word to search"
        onChange={handleInputChange}
      ></input>

      <div className="space-y-8 w-full flex flex-col">
        <h3 className="">Select characteristics to filter words</h3>

        {/* SUBMIT BUTTONS */}
        <Submit searchCriteria={searchCriteria} handleClear={handleClear} />
      </div>
    </div>
  );
};
