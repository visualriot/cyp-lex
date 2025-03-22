import React, { useRef, useEffect, useState } from "react";

import { CheckboxGroup, Checkbox } from "@heroui/checkbox";
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
  handleSelectMode: (mode: string) => void;
}

export const WordsInput: React.FC<WordsInput> = ({ handleSelectMode }) => {
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

  const [isMobile, setisMobile] = React.useState(true);

  const [tooltipStates, setTooltipStates] = React.useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const handleResize = () => {
      setisMobile(window.innerWidth <= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".tooltip-button")) {
        setTooltipStates({});
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const [words, setWords] = React.useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const commonTooltipProps = (id: string, content: string) => ({
    content: content,
    className:
      "bg-zinc-600 text-white rounded-md whitespace-normal max-w-72 text-xs text-center px-4 py-2",
    isOpen: isMobile ? tooltipStates[id] : undefined,
    onClose: () =>
      setTooltipStates((prevStates) => ({ ...prevStates, [id]: false })),
  });

  const handleTooltipToggle = (id: string) => {
    if (isMobile) {
      setTooltipStates((prevStates) => ({
        ...prevStates,
        [id]: !prevStates[id],
      }));

      if (!tooltipStates[id]) {
        setTimeout(() => {
          setTooltipStates((prevStates) => ({
            ...prevStates,
            [id]: false,
          }));
        }, 3500);
      }
    }
  };

  return (
    <div className="space-y-8 w-full flex flex-col">
      <div className="space-y-8 w-full flex flex-col">
        <h3 className="">Configure Your Search</h3>
        <div className="w-full flex  border-foreground-100 rounded  flex-col space-y-16 lg:border-1 lg:shadow-md  lg:p-6 lg:pt-8 lg:pb-16 lg:px-12">
          <AgeBand />

          {/* checkboxes */}
          <div>
            <CheckboxGroup
              className="gap-4 justify-between w-full flex flex-wrap"
              label="Select all the characteristics you want to retrieve"
              orientation="horizontal"
              classNames={{
                wrapper: "flex flex-wrap gap-x-7 gap-y-4 w-full",
                label: "font-semibold text-text",
              }}
            >
              {stats.map((info) => (
                <div className="space-x-1 flex flex-row" key={info.id}>
                  <Checkbox value={info.name}>
                    <div className="flex items-center text-sm">
                      <span>{info.name}</span>
                    </div>
                  </Checkbox>
                  {info.tooltip && (
                    <Tooltip
                      {...commonTooltipProps(info.tooltip, info.tooltip)}
                      key={info.tooltip}
                    >
                      <div className="flex items-center hover:opacity-100 transition-opacity opacity-50 z-50">
                        <Button
                          className="h-4 w-4 min-w-4 rounded-lg p-0 tooltip-button bg-text"
                          onPress={() => handleTooltipToggle(info.tooltip)}
                        >
                          <InfoIcon
                            size={10}
                            className="fill-white"
                            fill="white"
                          />
                        </Button>
                      </div>
                    </Tooltip>
                  )}
                </div>
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
