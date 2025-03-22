"use client";
import * as React from "react";
import { SecondaryBtn } from "@/components/buttons";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Spinner } from "@heroui/spinner";
import { DoneIcon, DownloadIcon, CopyIcon } from "@/components/icons";
import { useAsyncList } from "@react-stately/data";
import { Alert } from "@heroui/alert";

interface DataItem {
  word: string;
  count: number;
  zipf_freq: number;
  lemma: string;
  CD_book_perc: number;
  allpos: string;
  CBBC_raw: number;
  CBBC_zipf: number;
  CBeebies_raw: number;
  CBeebies_zipf: number;
  SUBTLEXUK_raw: number;
  SUBTLEXUK_zipf: number;
}

type AlertColor = "success" | "danger";

export default function ResultsPage() {
  const hardCodedData: DataItem[] = [
    {
      word: "hello",
      count: 80,
      zipf_freq: 4.0,
      lemma: "hello",
      CD_book_perc: 8,
      allpos: "verb",
      CBBC_raw: 25,
      CBBC_zipf: 3.8,
      CBeebies_raw: 15,
      CBeebies_zipf: 3.0,
      SUBTLEXUK_raw: 35,
      SUBTLEXUK_zipf: 4.0,
    },
    {
      word: "sunshine",
      count: 80,
      zipf_freq: 4.0,
      lemma: "sunshine",
      CD_book_perc: 8,
      allpos: "verb",
      CBBC_raw: 25,
      CBBC_zipf: 3.8,
      CBeebies_raw: 15,
      CBeebies_zipf: 3.0,
      SUBTLEXUK_raw: 35,
      SUBTLEXUK_zipf: 4.0,
    },
    {
      word: "tomorrow",
      count: 80,
      zipf_freq: 4.0,
      lemma: "tomorrow",
      CD_book_perc: 8,
      allpos: "verb",
      CBBC_raw: 25,
      CBBC_zipf: 3.8,
      CBeebies_raw: 15,
      CBeebies_zipf: 3.0,
      SUBTLEXUK_raw: 35,
      SUBTLEXUK_zipf: 4.0,
    },
    {
      word: "cosmos",
      count: 80,
      zipf_freq: 4.0,
      lemma: "cosmos",
      CD_book_perc: 8,
      allpos: "verb",
      CBBC_raw: 25,
      CBBC_zipf: 3.8,
      CBeebies_raw: 15,
      CBeebies_zipf: 3.0,
      SUBTLEXUK_raw: 35,
      SUBTLEXUK_zipf: 4.0,
    },
  ];

  const [isAlertVisible, setIsAlertVisible] = React.useState(false);
  const [alertColor, setAlertColor] = React.useState<AlertColor>("success");

  const headers = [
    { key: "word", label: "Word" },
    { key: "count", label: "Count" },
    { key: "zipf", label: "Zipf_freq" },
    { key: "lemma", label: "Lemma" },
    { key: "bookPercentage", label: "CD_book_perc" },
    { key: "allpos", label: "AllPos" },
    { key: "rawCbbc", label: "CBBC_raw" },
    { key: "zipfCbbc", label: "CBBC_zipf" },
    { key: "rawCbeebies", label: "CBeebies_raw" },
    { key: "zipfCbeebies", label: "CBeebies_zipf" },
    { key: "rawSubtlex", label: "SUBTLEXUK_raw" },
    { key: "zipfSubtlex", label: "SUBTLEXUK_zipf" },
  ];

  // Sorting logic
  const list = useAsyncList({
    async load() {
      return {
        items: hardCodedData,
      };
    },
    async sort({ items, sortDescriptor }) {
      const sortedItems = [...items].sort((a, b) => {
        const first = a[sortDescriptor.column as keyof DataItem];
        const second = b[sortDescriptor.column as keyof DataItem];

        // Sort numbers and strings differently
        let cmp;
        if (typeof first === "number" && typeof second === "number") {
          cmp = first - second;
        } else {
          cmp = String(first).localeCompare(String(second));
        }

        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      });

      return { items: sortedItems };
    },
  });

  // Generate download and copy table data
  const generateTableData = (delimiter: string) => {
    const headerLabels = headers.map((header) => header.label);
    const rows = list.items.map((item) =>
      headers
        .map((header) => item[header.key as keyof DataItem])
        .join(delimiter)
    );
    return [headerLabels.join(delimiter), ...rows].join("\n");
  };

  // COPY TABLE
  const copyTableData = () => {
    const tableData = generateTableData("\t");

    navigator.clipboard.writeText(tableData).then(
      () => {
        showAlert("success");
      },
      (err) => {
        console.error("Failed to copy table data: ", err);
        showAlert("danger");
      }
    );
  };

  const downloadTableData = () => {
    const csvContent = generateTableData(",");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "results.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const showAlert = (color: AlertColor) => {
    setAlertColor(color);
    setIsAlertVisible(true);
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 3000);
  };

  return (
    <section className="results-page w-full flex flex-col gap-y-4 lg:gap-y-8 ">
      {isAlertVisible && alertColor === "danger" && (
        <div className="absolute left-4 bottom-12 z-50">
          <Alert
            color={alertColor}
            title={
              alertColor === "danger"
                ? "Failed to copy table data"
                : "Copied to clipboard successfully!"
            }
          />
        </div>
      )}
      <div className="w-full flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
        <div className="flex flex-col lg:w-1/2">
          <h3>Search Results</h3>
          <p>
            Your search returned <span>{list.items.length}</span> words
          </p>
        </div>
        <div className="flex flex-row lg:w-1/2 justify-end items-center space-x-2 lg:space-x-8">
          <SecondaryBtn onPress={copyTableData}>
            {isAlertVisible ? <DoneIcon size={12} /> : <CopyIcon />}
            {isAlertVisible ? "Copied to clipboard" : "Copy all"}
          </SecondaryBtn>
          <SecondaryBtn onPress={downloadTableData}>
            <DownloadIcon /> Download results
          </SecondaryBtn>
        </div>
      </div>

      <Table
        aria-label="Table with search results"
        classNames={{
          table: "shadow-none",
          wrapper: "shadow-none px-0",
          th: "text-xs",
          td: "text-xs",
        }}
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
        isStriped
        isHeaderSticky
        fullWidth
        layout="auto"
      >
        <TableHeader>
          {headers.map((header) => (
            <TableColumn key={header.key} allowsSorting>
              {header.label}
            </TableColumn>
          ))}
        </TableHeader>

        <TableBody
          items={list.items}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(item: DataItem) => (
            <TableRow key={item.word}>
              {Object.keys(item).map((key) => {
                const typedKey = key as keyof DataItem;
                return <TableCell key={key}>{item[typedKey]}</TableCell>;
              })}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
}
