import React from "react";
import { useRouter } from "next/navigation";
import { PrimaryBtn, TertiaryBtn } from "../buttons";
import { ClearIcon } from "../icons";
import { SearchCriteria } from "@/app/types/data";
import { fetchData } from "@/app/utils/fetchData";

interface SubmitProps {
  handleClear: () => void;
  searchCriteria: Partial<SearchCriteria>;
  words?: string[];
  age: string;
}

export const Submit: React.FC<SubmitProps> = ({
  handleClear,
  searchCriteria,
  age,
  words,
}) => {
  const router = useRouter();

  const handleSubmit = () => {
    const queryParams = new URLSearchParams();

    // ✅ Map through search criteria and add to queryParams
    Object.entries(searchCriteria).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => queryParams.append(key, v.toString()));
      } else if (value !== undefined && value !== null) {
        queryParams.set(key, value.toString());
      }
    });

    // ✅ Push query params to the URL
    router.push(`/database/results?${queryParams.toString()}`);
  };

  const handleSearch = async () => {
    try {
      const csvData = await fetchData(`/data/cyplex_${age}.csv`);

      if (!words) return;

      const results = words.map((word) => {
        return (
          csvData.find((row) => row.word === word) || { word, notFound: true }
        );
      });

      console.log("Search Results:", results);
      // Display results in the UI
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <PrimaryBtn
        className="py-10 text-xl font-semibold"
        onPress={handleSearch}
      >
        Submit
      </PrimaryBtn>
      <TertiaryBtn
        className="text-secondary fill-secondary"
        onPress={handleClear}
      >
        <ClearIcon />
        Clear input and start over
      </TertiaryBtn>
    </div>
  );
};
