import { useState, useRef } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { SearchCriteria } from "@/app/types/data";

export const useSearchCriteria = () => {
  const [ageBand, setAgeBand] = useState<string>("all");
  const [searchCriteria, setSearchCriteria] = useState<Partial<SearchCriteria>>(
    {}
  );
  const [words, setWords] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle updating search criteria (checkboxes, sliders, etc.)
  const updateCriteria = (field: string, value: any) => {
    setSearchCriteria((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle file upload (CSV/XLSX)
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

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
    event.target.value = "";
  };

  return {
    ageBand,
    setAgeBand,
    searchCriteria,
    updateCriteria,
    words,
    handleFileUpload,
    fileInputRef,
    setWords,
    setSearchCriteria,
  };
};
