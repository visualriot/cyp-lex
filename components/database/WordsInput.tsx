import React from "react";

import { CheckboxGroup, useCheckbox } from "@heroui/checkbox";
import { CustomCheckbox } from "@/components/checkbox";
import { AgeBand } from "./AgeBand";
import { Textarea } from "@heroui/input";
import { SecondaryBtn, PrimaryBtn, TertiaryBtn } from "../buttons";
import { UploadIcon, ClearIcon } from "../icons";
import { Submit } from "./Submit";

interface WordsInput {
  selectedMode: string;
  handleSelectMode: (mode: string) => void;
}

export const WordsInput: React.FC<WordsInput> = ({
  selectedMode,
  handleSelectMode,
}) => {
  const stats = [
    { id: 1, name: "Lemma", value: "lemma" },
    { id: 2, name: "Most common part of speech", value: "mcpos" },
    { id: 3, name: "Raw frequency", value: "raw" },
    { id: 4, name: "Zipf frequency", value: "zipf" },
    { id: 5, name: "Book raw count", value: "book-raw-count" },
    { id: 6, name: "Book percentage", value: "book-percentage" },
    {
      id: 7,
      name: "Raw frequency in TV: CBeebies (ages 0-6)",
      value: "raw-cbeebies",
    },
    {
      id: 8,
      name: "Zipf frequency in TV: CBeebies (ages 0-6)",
      value: "zipf-cbeebies",
    },
    { id: 9, name: "Raw frequency in TV: CBBC (ages 6-12)", value: "raw-cbbc" },
    {
      id: 10,
      name: "Zipf frequency in TV: CBBC (ages 6-12)",
      value: "zipf-cbbc",
    },
    {
      id: 11,
      name: "Raw frequency in TV: SUBTLEX-UK (all ages)",
      value: "raw-subtlex",
    },
    {
      id: 12,
      name: "Zipf frequency in TV: SUBTLEX-UK (all ages)",
      value: "zipf-subtlex",
    },
  ];

  const [selectedCheckboxes, setSelectedCheckboxes] = React.useState<string[]>(
    []
  );

  const handleCheckboxChange = (value: string) => {
    setSelectedCheckboxes((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((item) => item !== value)
        : [...prevSelected, value]
    );
  };

  const handleClear = () => {
    handleSelectMode("");
  };

  return (
    <div className="space-y-8 w-full flex flex-col">
      <div className="space-y-6 w-full flex flex-col">
        <h3 className="">Configure Your Search</h3>
        <div className="w-full flex shadow-md border-1 border-foreground-100 rounded p-6 flex-col gap-y-12">
          <AgeBand />

          {/* checkboxes */}
          <div>
            <CheckboxGroup
              className="gap-4 justify-between w-full flex flex-wrap"
              label="Select all the characteristics you want to retrieve"
              orientation="horizontal"
              classNames={{
                wrapper: "flex flex-wrap gap-2 w-full",
                label: "font-semibold text-text",
              }}
            >
              {stats.map((info) => (
                <CustomCheckbox
                  key={info.id}
                  isSelected={selectedCheckboxes.includes(info.value)}
                  onChange={() => handleCheckboxChange(info.value)}
                >
                  {info.name}
                </CustomCheckbox>
              ))}
            </CheckboxGroup>
          </div>
          {/* text area */}
          <div className="space-y-4">
            <div>
              <h4>Enter words to look up</h4>
              <p className="text-disabledText">
                Enter the words you’d like to look up (one word per line) OR
                upload an Excel file.
              </p>
            </div>
            <div className="space-y-6">
              <Textarea
                className="rounded-md"
                placeholder="Type or paste words here"
                minRows={8}
                fullWidth
                isClearable
              />
              <SecondaryBtn>
                {" "}
                <UploadIcon /> upload excel file
              </SecondaryBtn>
            </div>
          </div>
        </div>
        <Submit handleClear={handleClear} />
      </div>
    </div>
  );
};
