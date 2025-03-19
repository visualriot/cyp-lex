import React from "react";
import { tv } from "@heroui/theme";
import { useCheckbox } from "@heroui/checkbox";
import { Chip } from "@heroui/chip";
import { CheckIcon } from "./icons";

interface CustomCheckboxProps {
  children?: React.ReactNode;
  isFocusVisible?: boolean;
  isSelected?: boolean;
  onChange?: () => void;
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  children,
  isFocusVisible,
  isSelected = false,
  onChange,
}) => {
  const checkbox = tv({
    slots: {
      base: "border-0 hover:bg-default-200 rounded-md cursor-pointer",
      content: "text-default-500 p-5 text-sm",
    },
    variants: {
      isSelected: {
        true: {
          base: "bg-accent hover:bg-accent hover:opacity-90 p-4 rounded-md color-accent",
          content: "text-primary-foreground ",
        },
      },
      isFocusVisible: {
        true: {
          base: "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background",
        },
      },
    },
  });

  const styles = checkbox({ isSelected, isFocusVisible });

  return (
    <label>
      <input type="checkbox" checked={isSelected} onChange={onChange} hidden />
      <Chip
        className={`${styles.base()} ${styles.content()} my-1 mx-1 font-semibold`}
        variant="faded"
      >
        {children ? children : isSelected ? "Enabled" : "Disabled"}
      </Chip>
    </label>
  );
};
