import React, { useRef } from "react";

import { CheckboxGroup } from "@heroui/checkbox";
import { CustomCheckbox } from "@/components/checkbox";
import { AgeBand } from "./AgeBand";
import { Textarea } from "@heroui/input";
import { SecondaryBtn } from "../buttons";
import { UploadIcon, InfoIcon } from "../icons";
import { Tooltip } from "@heroui/tooltip";
import { Submit } from "./Submit";
import { Button } from "@heroui/button";
import * as XLSX from "xlsx";
import Papa from "papaparse";

interface WordsInput {
  selectedMode: string;
  handleSelectMode: (mode: string) => void;
}

export const WordsInput: React.FC<WordsInput> = ({
  selectedMode,
  handleSelectMode,
}) => {
  const stats = [
    { id: 1, name: "Lemma", value: "lemma", tooltip: "uninflected form" },
    {
      id: 2,
      name: "Most common part of speech",
      value: "mcpos",
    },
    {
      id: 3,
      name: "Raw frequency",
      value: "raw",
      tooltip:
        "number of times the word is encountered in the selected age range",
    },
    {
      id: 4,
      name: "Zipf frequency",
      value: "zipf",
      tooltip: "standardised frequency metric",
    },
    {
      id: 5,
      name: "Book raw count",
      value: "book-raw-count",
      tooltip:
        "number of books in the selected age range the word is encountered in",
    },
    {
      id: 6,
      name: "Book percentage",
      value: "book-percentage",
      tooltip:
        "percentage of books in the selected age range the word is encountered in",
    },
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

  const [words, setWords] = React.useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        if (file.type === "text/csv") {
          Papa.parse(data as string, {
            complete: (result: Papa.ParseResult<any>) => {
              const words = result.data.map((row: any) => row[0]);
              setWords(words);
            },
          });
        } else {
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          const words = json.map((row: any) => row[0]);
          setWords(words);
        }
      };
      reader.readAsBinaryString(file);
    }
    event.target.value = "";
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleTextareaClear = () => {
    setWords([]);
  };

  return (
    <div className="space-y-8 w-full flex flex-col">
      <div className="space-y-8 w-full flex flex-col">
        <h3 className="">Configure Your Search</h3>
        <div className="w-full flex shadow-md border-1 border-foreground-100 rounded p-6 flex-col space-y-16 pt-8 pb-16 px-12">
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
                  <div className="flex items-center space-x-2">
                    <span>{info.name}</span>
                    {info.tooltip && (
                      <Tooltip
                        content={info.tooltip}
                        key={`${info.tooltip}-${info.id}`}
                        className="bg-zinc-600 text-white rounded-md whitespace-normal max-w-72 text-xs text-center px-4 py-2"
                      >
                        <Button className="h-5 w-5 min-w-4 rounded-md p-0 bg-text opacity-70">
                          <InfoIcon
                            size={12}
                            className="fill-white"
                            fill="white"
                          />
                        </Button>
                      </Tooltip>
                    )}
                  </div>
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
                value={words.join("\n")}
                onChange={(e) => setWords(e.target.value.split("\n"))}
                onClear={handleTextareaClear}
              />
              <input
                type="file"
                accept=".csv, .xls, .xlsx"
                onChange={handleFileUpload}
                ref={fileInputRef}
                className="hidden"
                id="file-upload"
              />
              <SecondaryBtn onPress={handleButtonClick}>
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
