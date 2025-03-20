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
import { DownloadIcon, CopyIcon } from "@/components/icons";
import { useAsyncList } from "@react-stately/data";

interface DataItem {
  word: string;
  lemma: string;
  mcpos: string;
  raw: number;
  zipf: number;
  bookRawCount: number;
  bookPercentage: number;
  rawCbeebies: number;
  zipfCbeebies: number;
  rawCbbc: number;
  zipfCbbc: number;
  rawSubtlex: number;
  zipfSubtlex: number;
}

export default function ResultsPage() {
  const hardCodedData: DataItem[] = [
    {
      word: "example",
      lemma: "example",
      mcpos: "noun",
      raw: 100,
      zipf: 4.5,
      bookRawCount: 50,
      bookPercentage: 10,
      rawCbeebies: 20,
      zipfCbeebies: 3.5,
      rawCbbc: 30,
      zipfCbbc: 4.0,
      rawSubtlex: 40,
      zipfSubtlex: 4.2,
    },
    {
      word: "hello",
      lemma: "greeting",
      mcpos: "verb",
      raw: 80,
      zipf: 4.0,
      bookRawCount: 40,
      bookPercentage: 8,
      rawCbeebies: 15,
      zipfCbeebies: 3.0,
      rawCbbc: 25,
      zipfCbbc: 3.8,
      rawSubtlex: 35,
      zipfSubtlex: 4.0,
    },
    {
      word: "world",
      lemma: "earth",
      mcpos: "noun",
      raw: 120,
      zipf: 4.8,
      bookRawCount: 60,
      bookPercentage: 12,
      rawCbeebies: 30,
      zipfCbeebies: 3.7,
      rawCbbc: 35,
      zipfCbbc: 4.3,
      rawSubtlex: 50,
      zipfSubtlex: 4.5,
    },
    {
      word: "sun",
      lemma: "star",
      mcpos: "noun",
      raw: 90,
      zipf: 4.2,
      bookRawCount: 45,
      bookPercentage: 9,
      rawCbeebies: 18,
      zipfCbeebies: 3.3,
      rawCbbc: 28,
      zipfCbbc: 4.1,
      rawSubtlex: 38,
      zipfSubtlex: 4.3,
    },
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
    const headers = [
      "Word",
      "Lemma",
      "mcPoS",
      "Raw",
      "Zipf",
      "Count",
      "Percentage",
      "CBeebies raw",
      "CBeebies zipf",
      "CBBC raw",
      "CBBC zipf",
      "SUBTLEX-UK raw",
      "SUBTLEX-UK zipf",
    ];

    const rows = list.items.map((item) =>
      [
        item.word,
        item.lemma,
        item.mcpos,
        item.raw,
        item.zipf,
        item.bookRawCount,
        item.bookPercentage,
        item.rawCbeebies,
        item.zipfCbeebies,
        item.rawCbbc,
        item.zipfCbbc,
        item.rawSubtlex,
        item.zipfSubtlex,
      ].join(delimiter)
    );

    return [headers.join(delimiter), ...rows].join("\n");
  };

  // COPY TABLE
  const copyTableData = () => {
    const tableData = generateTableData("\t");

    navigator.clipboard.writeText(tableData).then(
      () => {
        alert("Table data copied to clipboard!");
      },
      (err) => {
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

  return (
    <section className="results-page w-full flex flex-col gap-y-8">
      <div className="w-full flex flex-row justify-between items-center ">
        <div className="flex flex-col w-1/2">
          <h3>Search Results</h3>
          <p>
            Your search returned <span>{list.items.length}</span> words
          </p>
        </div>
        <div className="flex flex-row w-1/2 justify-end items-center space-x-8">
          <SecondaryBtn onPress={copyTableData}>
            <CopyIcon />
            Copy all
          </SecondaryBtn>
          <SecondaryBtn onPress={downloadTableData}>
            <DownloadIcon /> Download results
          </SecondaryBtn>
        </div>
      </div>

      <Table
        aria-label="Example table with client side sorting"
        isVirtualized
        classNames={{
          table: "shadow-none",
          wrapper: "shadow-none px-0",
          th: "text-xs",
          td: "text-xs",
        }}
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
      >
        <TableHeader>
          <TableColumn key="word" allowsSorting>
            Word
          </TableColumn>
          <TableColumn key="lemma" allowsSorting>
            Lemma
          </TableColumn>
          <TableColumn key="mcpos" allowsSorting>
            mcPoS
          </TableColumn>
          <TableColumn key="raw" allowsSorting>
            Raw
          </TableColumn>
          <TableColumn key="zipf" allowsSorting>
            Zipf
          </TableColumn>
          <TableColumn key="bookRawCount" allowsSorting>
            Count
          </TableColumn>
          <TableColumn key="bookPercentage" allowsSorting>
            Percentage
          </TableColumn>
          <TableColumn key="rawCbeebies" allowsSorting>
            CBeebies raw
          </TableColumn>
          <TableColumn key="zipfCbeebies" allowsSorting>
            CBeebies zipf
          </TableColumn>
          <TableColumn key="rawCbbc" allowsSorting>
            CBBC raw
          </TableColumn>
          <TableColumn key="zipfCbbc" allowsSorting>
            CBBC zipf
          </TableColumn>
          <TableColumn key="rawSubtlex" allowsSorting>
            SUBTLEX-UK raw
          </TableColumn>
          <TableColumn key="zipfSubtlex" allowsSorting>
            SUBTLEX-UK zipf
          </TableColumn>
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
