import React from "react";
import { Tooltip } from "@heroui/tooltip";
import { InfoIcon } from "../icons";

interface LabelWithTooltipProps {
  label: string;
  tooltipContent: string;
}

const LabelWithTooltip: React.FC<LabelWithTooltipProps> = ({
  label,
  tooltipContent,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <span>{label}</span>
      <Tooltip
        content={tooltipContent}
        className="bg-zinc-600 text-white rounded-md whitespace-normal max-w-72 text-xs text-center px-4 py-2"
      >
        <InfoIcon size={12} className="fill-white" fill="white" />
      </Tooltip>
    </div>
  );
};

export default LabelWithTooltip;
