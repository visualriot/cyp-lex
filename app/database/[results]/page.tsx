"use client";

import React, { useState, useEffect, use } from "react";
import { useSearchParams } from "next/navigation";
import { SearchCriteria } from "../../types/data";
import { useFetchData } from "@/app/hooks/useFetchData";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import { SecondaryBtn } from "@/components/buttons";
import { DoneIcon, DownloadIcon, CopyIcon } from "@/components/icons";

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [isCopied, setIsCopied] = useState(false);
  const [headers, setHeaders] = useState<{ key: string; label: string }[]>([]);

  const { data = [], loading, error } = useFetchData(id);

  const allColumns = {
    Word: "Word",
    numberOfLetters: "No. of Letters",
    Lemma: "Lemma",
    mcPoS: "mcPoS",
    Count: "Count",
    Zipf_freq: "Zipf_freq",
    CD_book_count_raw: "CD_book_count_raw",
    CD_book_perc_raw: "CD_book_perc_raw",
    CBeebies_raw: "CBeebies_raw",
    CBeebies_log: "CBeebies_log",
    CBBC_raw: "CBBC_raw",
    CBBC_log: "CBBC_log",
    SubtlexUK_raw: "SubtlexUK_raw",
    SubtlexUK_log: "SubtlexUK_log",
  };

  useEffect(() => {
    if (!data || !data.results) return;

    const searchMode = data.words.length === 0 ? "stats" : "words";

    // Generate headers based on search criteria
    const generatedHeaders =
      searchMode === "words"
        ? Object.keys(allColumns)
            .filter((key) => data.searchCriteria[key] === true)
            .map((key) => ({
              key,
              label: allColumns[key as keyof typeof allColumns],
            }))
        : Object.keys(allColumns).map((key) => ({
            key,
            label: allColumns[key as keyof typeof allColumns],
          })); // Include all headers for stats mode

    if (!generatedHeaders.some((header) => header.key === "Word")) {
      generatedHeaders.unshift({ key: "Word", label: allColumns.Word });
    }

    setHeaders(generatedHeaders);
  }, [data]);

  const generateTableData = (delimiter: string) => {
    const headerLabels = headers.map((header) => header.label);
    const rows = (data.results || []).map((item: SearchCriteria) =>
      headers
        .map((header) => item[header.key as keyof SearchCriteria] || "N/A")
        .join(delimiter)
    );
    return [headerLabels.join(delimiter), ...rows].join("\n");
  };

  const copyTableData = () => {
    const tableData = generateTableData("\t");
    navigator.clipboard.writeText(tableData).then(
      () => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000); // Reset after 2 seconds
      },
      (err) => {
        setIsCopied(false);
        console.error("Failed to copy table data: ", err);
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

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <section className="results-page w-full flex flex-col gap-y-4 lg:gap-y-8 ">
      <div className="w-full flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
        <div className="flex flex-col lg:w-1/2">
          <h3>Search Results</h3>
          {loading ? (
            <p className="animate-pulsate italic">
              Loading your search results...{" "}
            </p>
          ) : (
            <p>
              Your search returned{" "}
              <span className={loading ? "animate-pulse" : ""}>
                {loading ? "..." : data.results ? data.results.length : "0"}
              </span>{" "}
              words
            </p>
          )}
        </div>
        <div className="flex flex-row lg:w-1/2 justify-end items-center space-x-2 lg:space-x-8">
          <SecondaryBtn
            onPress={copyTableData}
            className={loading ? "animate-pulse" : ""}
            disabled={loading}
          >
            {isCopied ? <DoneIcon size={12} /> : <CopyIcon />}
            {isCopied ? "Copied to clipboard" : "Copy all"}
          </SecondaryBtn>
          <SecondaryBtn
            onPress={downloadTableData}
            className={loading ? "animate-pulse" : ""}
            disabled={loading}
          >
            <DownloadIcon /> Download results
          </SecondaryBtn>
        </div>
      </div>

      {loading ? (
        <Table
          aria-label="Table with search results"
          classNames={{
            table: "shadow-none",
            wrapper: "shadow-none px-0",
            th: "text-xs",
            td: "text-xs",
          }}
          isStriped
          isHeaderSticky
          fullWidth
          layout="auto"
        >
          <TableHeader>
            {Array.from({ length: 10 }).map((_, index) => (
              <TableColumn key={index}>
                <div className="h-4 bg-white rounded"></div>
              </TableColumn>
            ))}
          </TableHeader>

          <TableBody>
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <TableRow key={`skeleton-${rowIndex}`} className="animate-pulse">
                {Array.from({ length: 10 }).map((_, colIndex) => (
                  <TableCell key={`skeleton-cell-${rowIndex}-${colIndex}`}>
                    <div className="h-4 bg-gray-300 rounded"></div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Table
          aria-label="Table with search results"
          classNames={{
            table: "shadow-none",
            wrapper: "shadow-none px-0",
            th: "text-xs",
            td: "text-xs",
          }}
          isStriped
          isHeaderSticky
          fullWidth
          layout="auto"
        >
          <TableHeader>
            {headers.map((header) => (
              <TableColumn key={header.key}>{header.label}</TableColumn>
            ))}
          </TableHeader>

          <TableBody
            isLoading={loading}
            items={data?.results || []}
            // loadingContent={<Spinner label="Loading..." />}
          >
            {(item: any) => (
              <TableRow key={`${item.Word}`}>
                {headers.map((header) => (
                  <TableCell key={header.key}>
                    {item[header.key] || "N/A"}
                  </TableCell>
                ))}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </section>
  );
}
