import React from "react";

import { PrimaryBtn, TertiaryBtn } from "../buttons";
import { ClearIcon } from "../icons";

interface SubmitProps {
  handleClear: () => void;
}

export const Submit: React.FC<SubmitProps> = ({ handleClear }) => {
  return (
    <div className="flex flex-col gap-4">
      <PrimaryBtn href="/results" className="py-10 text-xl font-semibold">
        Submit
      </PrimaryBtn>
      <TertiaryBtn
        className="text-secondary fill-secondary"
        onPress={handleClear}
      >
        <ClearIcon />
        Clear configuration and start over
      </TertiaryBtn>
    </div>
  );
};
