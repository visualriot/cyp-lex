import React, { useEffect, useState } from "react";

import { CheckboxGroup, useCheckbox, Checkbox } from "@heroui/checkbox";
import { Slider } from "@heroui/slider";
import { AgeBand } from "./AgeBand";
import { Submit } from "./Submit";
import { InfoIcon } from "../icons";
import { Tooltip } from "@heroui/tooltip";
import { Button } from "@heroui/button";
import LabelWithTooltip from "./LabelWithTooltip";

interface StatsInput {
  selectedMode: string;
  handleSelectMode: (mode: string) => void;
}

export const StatsInput: React.FC<StatsInput> = ({
  selectedMode,
  handleSelectMode,
}) => {
  const [selectedCheckboxes, setSelectedCheckboxes] = React.useState<string[]>(
    []
  );
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

  const mcpos = [
    { id: 1, name: "Noun", value: "noun" },
    { id: 2, name: "Verb", value: "verb" },
    { id: 3, name: "Adjective", value: "adjective" },
    { id: 4, name: "Adverb", value: "adverb" },
  ];

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

  const handleTooltipToggle = (id: string) => {
    if (isMobile) {
      setTooltipStates((prevStates) => ({
        ...prevStates,
        [id]: !prevStates[id],
      }));
    }
  };

  const commonSliderProps = {
    classNames: {
      filler: "bg-gradient-to-r from-accentLight to-accentLight rounded-lg",
      labelWrapper: "mb-2",
      label: "font-semibold text-text text-base",
      value: "font-medium text-default-500 text-small",
      thumb: [
        "transition-size",
        "bg-gradient-to-r from-accentLight to-accentLight",
        "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
        "data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6",
      ],
      step: "data-[in-range=true]:bg-black/30 dark:data-[in-range=true]:bg-white/50",
      mark: "mt-2",
    },
    className: "max-w-full",
    defaultValue: [0, 45],
    maxValue: 45,
    minValue: 0,
    step: 1,
    showSteps: !isMobile,
  };

  const commonTooltipProps = (id: string, content: string) => ({
    content: content,
    className:
      "bg-zinc-600 text-white rounded-md whitespace-normal max-w-72 text-xs text-center px-4 py-2",
    isOpen: isMobile ? tooltipStates[id] : undefined,
    onClose: () =>
      setTooltipStates((prevStates) => ({ ...prevStates, [id]: false })),
  });

  return (
    <div className="space-y-8 w-full flex flex-col">
      <div className="space-y-8 w-full flex flex-col">
        <h3 className="">Select characteristics to filter words</h3>
        <div className="w-full flex  border-foreground-100 rounded  flex-col space-y-16 lg:border-1 lg:shadow-md  lg:p-6 lg:pt-8 lg:pb-16 lg:px-12">
          <AgeBand />

          {/* Sliders */}
          {/* Numbers of Letters */}
          <Slider
            {...commonSliderProps}
            label="Number of Letters"
            marks={[
              {
                value: 0,
                label: "0",
              },
              {
                value: 10,
                label: "10",
              },
              {
                value: 20,
                label: "20",
              },
              {
                value: 30,
                label: "30",
              },
              {
                value: 40,
                label: "40",
              },
              {
                value: 45,
                label: "45",
              },
            ]}
          />

          <div className="space-y-4 relative">
            <div className="absolute flex flex-row space-x-2 items-center top-4 left-0">
              <h4>Zipf frequency</h4>
              <Tooltip
                {...commonTooltipProps("zipf", "standardised frequency metric")}
              >
                <Button
                  className="h-5 w-5 min-w-4 rounded-md p-0 bg-text opacity-70"
                  onPress={() => handleTooltipToggle("zipf")}
                >
                  <InfoIcon size={12} className="fill-white" fill="white" />
                </Button>
              </Tooltip>
            </div>
            <Slider
              {...commonSliderProps}
              label=" "
              marks={[
                {
                  value: 0,
                  label: "0",
                },
                {
                  value: 10,
                  label: "10",
                },
                {
                  value: 20,
                  label: "20",
                },
                {
                  value: 30,
                  label: "30",
                },
                {
                  value: 40,
                  label: "40",
                },
                {
                  value: 45,
                  label: "45",
                },
              ]}
            />
          </div>
          {/* Checkboxes */}
          <CheckboxGroup
            label="Most common part of speech"
            orientation="horizontal"
            classNames={{
              wrapper:
                "flex flex-row mt-2 lg:mt-0  lg:space-x-16 lg:space-y-2 -mb-4",
              label: "font-semibold text-text",
            }}
          >
            {mcpos.map((item) => (
              <Checkbox
                key={item.id}
                value={item.value}
                classNames={{
                  wrapper: "fill-accent",
                  label: "text-sm font-medium",
                }}
              >
                {item.name}
              </Checkbox>
            ))}
          </CheckboxGroup>

          {/* Book percentage */}
          <div className="space-y-4 relative ">
            <div className="absolute flex flex-row space-x-2 items-center top-4 left-0">
              <h4>Book percentage</h4>
              <Tooltip
                {...commonTooltipProps(
                  "percentage",
                  "percentage of books in the selected age range the word is encountered in"
                )}
              >
                <Button
                  className="h-5 w-5 min-w-4 rounded-md p-0 bg-text opacity-70"
                  onPress={() => handleTooltipToggle("percentage")}
                >
                  <InfoIcon size={12} className="fill-white" fill="white" />
                </Button>
              </Tooltip>
            </div>
            <Slider
              {...commonSliderProps}
              label=" "
              marks={[
                {
                  value: 0,
                  label: "0",
                },
                {
                  value: 10,
                  label: "10",
                },
                {
                  value: 20,
                  label: "20",
                },
                {
                  value: 30,
                  label: "30",
                },
                {
                  value: 40,
                  label: "40",
                },
                {
                  value: 45,
                  label: "45",
                },
              ]}
            />
          </div>
          {/* TV */}

          <Slider
            {...commonSliderProps}
            label="Zipf Frequency in TV for ages 0-6 (CBeebies)"
            marks={[
              {
                value: 0,
                label: "0",
              },
              {
                value: 10,
                label: "10",
              },
              {
                value: 20,
                label: "20",
              },
              {
                value: 30,
                label: "30",
              },
              {
                value: 40,
                label: "40",
              },
              {
                value: 45,
                label: "45",
              },
            ]}
          />
          <Slider
            {...commonSliderProps}
            label="Zipf frequency in TV programmes for ages 6-12 years (CBBC)"
            marks={[
              {
                value: 0,
                label: "0",
              },
              {
                value: 10,
                label: "10",
              },
              {
                value: 20,
                label: "20",
              },
              {
                value: 30,
                label: "30",
              },
              {
                value: 40,
                label: "40",
              },
              {
                value: 45,
                label: "45",
              },
            ]}
          />
          <Slider
            {...commonSliderProps}
            label="Zipf frequency in TV programmes for all ages (SUBTLEX-UK)"
            marks={[
              {
                value: 0,
                label: "0",
              },
              {
                value: 10,
                label: "10",
              },
              {
                value: 20,
                label: "20",
              },
              {
                value: 30,
                label: "30",
              },
              {
                value: 40,
                label: "40",
              },
              {
                value: 45,
                label: "45",
              },
            ]}
          />
        </div>

        {/* SUBMIT BUTTONS */}
        <Submit handleClear={handleClear} />
      </div>
    </div>
  );
};
