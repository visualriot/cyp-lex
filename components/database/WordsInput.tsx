import React, { useEffect } from "react";
import { CheckboxGroup, Checkbox } from "@heroui/checkbox";
import { AgeBand } from "./AgeBand";
import { Textarea } from "@heroui/input";
import { SecondaryBtn } from "../buttons";
import { UploadIcon, InfoIcon } from "../icons";
import { Tooltip } from "@heroui/tooltip";
import { Submit } from "./Submit";
import { Button } from "@heroui/button";
import { stats } from "@/public/stats/stats";
import { useSearchCriteria } from "@/app/hooks/useSearchCriteria";

interface WordsInput {
  handleSelectMode: (mode: string) => void;
}

export const WordsInput: React.FC<WordsInput> = ({ handleSelectMode }) => {
  const [isMobile, setisMobile] = React.useState(true);
  const [isText, setIsText] = React.useState(false);

  const [tooltipStates, setTooltipStates] = React.useState<{
    [key: string]: boolean;
  }>({});

  // BACKEND MECHANICS ------------------------------------------------------------------------------------------------------------------------------------
  const {
    ageBand,
    setAgeBand,
    words,
    handleFileUpload,
    fileInputRef,
    searchCriteria,
    updateCriteria,
    setWords,
  } = useSearchCriteria();

  // FRONT END MECHANICS ------------------------------------------------------------------------------------------------------------------------------------

  // Check if it's mobile
  useEffect(() => {
    const handleResize = () => {
      setisMobile(window.innerWidth <= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close tooltip when clicking outside
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

  // clear text area
  const handleTextareaClear = () => {
    setWords([]);
    setIsText(false);
  };

  // clear configuration
  const handleClear = () => {
    handleSelectMode("");
    setIsText(false);
  };

  // handle upload click
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // styling

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
        <h3 className="">Configure your search</h3>
        <div className="w-full flex  border-foreground-100 rounded  flex-col space-y-16 lg:border-1 lg:shadow-md  lg:p-6 lg:pt-8 lg:pb-16 lg:px-12">
          <AgeBand ageBand={ageBand} setAgeBand={setAgeBand} />

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
                  <Checkbox
                    key={info.id}
                    value={info.value}
                    isSelected={
                      !!searchCriteria[
                        info.value as keyof typeof searchCriteria
                      ]
                    }
                    onChange={(event) =>
                      updateCriteria(
                        info.value as keyof typeof searchCriteria,
                        event.target.checked
                      )
                    }
                  >
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
                isRequired
                value={words.join("\n")}
                onChange={(e) => {
                  setWords(e.target.value.split("\n"));
                  setIsText(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const newWord = e.currentTarget.value
                      .split("\n")
                      .pop()
                      ?.trim();
                    if (newWord && !words.includes(newWord)) {
                      setWords((prevWords) => [...prevWords, newWord]);
                      setIsText(true);
                    }
                  }
                }}
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
              <SecondaryBtn onPress={handleUploadClick}>
                <UploadIcon /> upload excel file
              </SecondaryBtn>
            </div>
          </div>
        </div>
        <Submit
          handleClear={handleClear}
          searchCriteria={searchCriteria}
          age={ageBand}
          words={words}
          approved={isText}
          searchMode="words"
        />
      </div>
    </div>
  );
};
