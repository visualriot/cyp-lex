// "use client";
// import React, { useState } from "react";
// import { DataItem } from "../../types/data";
// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableColumn,
//   TableRow,
//   TableCell,
// } from "@heroui/table";
// import { Spinner } from "@heroui/spinner";
// import { SecondaryBtn } from "@/components/buttons";
// import { DoneIcon, DownloadIcon, CopyIcon } from "@/components/icons";
// import { Alert } from "@heroui/alert";
// import useFetchData from "@/app/hooks/useFetchData";
// import { useSearchParams } from "next/navigation";

// type AlertColor = "success" | "danger";

// export default function ResultsPage() {
//   const [isAlertVisible, setIsAlertVisible] = useState(false);
//   const [alertColor, setAlertColor] = useState<AlertColor>("success");
//   const searchParams = useSearchParams();
//   console.log("searchParams", searchParams);
//   const age = searchParams.get("Age") ?? "all";

//   // Fetch data via useFetchData hook
//   const { data, loading, error } = useFetchData(age);

//   const headers = [
//     { key: "Word", label: "Word" },
//     { key: "Count", label: "Count" },
//     { key: "Zipf_freq", label: "Zipf_freq" },
//     { key: "Lemma", label: "Lemma" },
//     { key: "CD_book_perc_raw", label: "CD_book_perc_raw" },
//     { key: "AllPoS", label: "AllPoS" },
//     { key: "CBBC_raw", label: "CBBC_raw" },
//     { key: "CBeebies_raw", label: "CBeebies_raw" },
//     { key: "SubtlexUK_raw", label: "SubtlexUK_raw" },
//   ];

//   const generateTableData = (delimiter: string) => {
//     const headerLabels = headers.map((header) => header.label);
//     const rows = data.map((item) =>
//       headers
//         .map((header) => item[header.key as keyof DataItem])
//         .join(delimiter)
//     );
//     return [headerLabels.join(delimiter), ...rows].join("\n");
//   };

//   const copyTableData = () => {
//     const tableData = generateTableData("\t");
//     navigator.clipboard.writeText(tableData).then(
//       () => {
//         showAlert("success");
//       },
//       (err) => {
//         console.error("Failed to copy table data: ", err);
//         showAlert("danger");
//       }
//     );
//   };

//   const downloadTableData = () => {
//     const csvContent = generateTableData(",");
//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.setAttribute("href", url);
//     link.setAttribute("download", "results.csv");
//     link.style.visibility = "hidden";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const showAlert = (color: AlertColor) => {
//     setAlertColor(color);
//     setIsAlertVisible(true);
//     setTimeout(() => {
//       setIsAlertVisible(false);
//     }, 3000);
//   };

//   return (
//     <section className="results-page w-full flex flex-col gap-y-4 lg:gap-y-8 ">
//       {isAlertVisible && alertColor === "danger" && (
//         <div className="absolute left-4 bottom-12 z-50">
//           <Alert
//             color={alertColor}
//             title={
//               alertColor === "danger"
//                 ? "Failed to copy table data"
//                 : "Copied to clipboard successfully!"
//             }
//           />
//         </div>
//       )}

//       <div className="w-full flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
//         <div className="flex flex-col lg:w-1/2">
//           <h3>Search Results</h3>
//           <p>
//             Your search returned <span>{data.length}</span> words
//           </p>
//         </div>
//         <div className="flex flex-row lg:w-1/2 justify-end items-center space-x-2 lg:space-x-8">
//           <SecondaryBtn onPress={copyTableData}>
//             {isAlertVisible ? <DoneIcon size={12} /> : <CopyIcon />}
//             {isAlertVisible ? "Copied to clipboard" : "Copy all"}
//           </SecondaryBtn>
//           <SecondaryBtn onPress={downloadTableData}>
//             <DownloadIcon /> Download results
//           </SecondaryBtn>
//         </div>
//       </div>

//       <Table
//         aria-label="Table with search results"
//         classNames={{
//           table: "shadow-none",
//           wrapper: "shadow-none px-0",
//           th: "text-xs",
//           td: "text-xs",
//         }}
//         isStriped
//         isHeaderSticky
//         fullWidth
//         layout="auto"
//         isVirtualized
//       >
//         <TableHeader>
//           {headers.map((header) => (
//             <TableColumn key={header.key}>{header.label}</TableColumn>
//           ))}
//         </TableHeader>

//         <TableBody
//           isLoading={loading}
//           items={data}
//           loadingContent={<Spinner label="Loading..." />}
//         >
//           {(item: DataItem) => (
//             <TableRow key={`${item.Word}-${item.Count}`}>
//               {headers.map((header) => (
//                 <TableCell key={header.key}>
//                   {item[header.key as keyof DataItem]}
//                 </TableCell>
//               ))}
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </section>
//   );
// }

// BACKUP  2
"use client";
import React, { useState, useRef, useEffect } from "react";
import { DataItem } from "../../types/data";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Spinner } from "@heroui/spinner";
import { SecondaryBtn } from "@/components/buttons";
import { DoneIcon, DownloadIcon, CopyIcon } from "@/components/icons";
import { Alert } from "@heroui/alert";
import useFetchData from "@/app/hooks/useFetchData";
import { useSearchParams } from "next/navigation";

type AlertColor = "success" | "danger";

export default function ResultsPage() {
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertColor, setAlertColor] = useState<AlertColor>("success");
  const searchParams = useSearchParams();
  console.log("searchParams", searchParams);
  const age = searchParams.get("Age") ?? "all";

  // Fetch data via useFetchData hook
  const { data, loading, error, loadMore, hasMore } = useFetchData(Age, 20);

  const headers = [
    { key: "Word", label: "Word" },
    { key: "Count", label: "Count" },
    { key: "Zipf_freq", label: "Zipf_freq" },
    { key: "Lemma", label: "Lemma" },
    { key: "CD_book_perc_raw", label: "CD_book_perc_raw" },
    { key: "AllPoS", label: "AllPoS" },
    { key: "CBBC_raw", label: "CBBC_raw" },
    { key: "CBeebies_raw", label: "CBeebies_raw" },
    { key: "SubtlexUK_raw", label: "SubtlexUK_raw" },
  ];

  const generateTableData = (delimiter: string) => {
    const headerLabels = headers.map((header) => header.label);
    const rows = data.map((item) =>
      headers
        .map((header) => item[header.key as keyof DataItem])
        .join(delimiter)
    );
    return [headerLabels.join(delimiter), ...rows].join("\n");
  };

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

  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });

    if (lastElementRef.current) {
      observer.current.observe(lastElementRef.current);
    }
  }, [data, hasMore]);

  const renderedWords = new Set<string>();

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
            Your search returned <span>{data.length}</span> words
          </p>
          {hasMore && !loading && (
            <p className="text-sm italic text-secondary mt-4 animate-pulse">
              Data still loading...
            </p>
          )}
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
        isStriped
        isHeaderSticky
        fullWidth
        layout="auto"
        // isVirtualized
      >
        <TableHeader>
          {headers.map((header) => (
            <TableColumn key={header.key}>{header.label}</TableColumn>
          ))}
        </TableHeader>

        {/* <TableBody
          isLoading={loading}
          items={data}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(item: DataItem) => (
            <TableRow key={`${item.Word}`}>
              {headers.map((header) => (
                <TableCell key={header.key}>
                  {item[header.key as keyof DataItem]}
                </TableCell>
              ))}
            </TableRow>
          )}
        </TableBody> */}

        <TableBody
          isLoading={loading}
          items={data}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(item: DataItem) => {
            if (renderedWords.has(item.word)) {
              return (
                <TableRow key={`${item.word}`} style={{ display: "none" }}>
                  {headers.map((header) => (
                    <TableCell key={header.key}>
                      {item[header.key as keyof DataItem]}
                    </TableCell>
                  ))}
                </TableRow>
              );
            }
            renderedWords.add(item.word);
            return (
              <TableRow key={`${item.word}`}>
                {headers.map((header) => (
                  <TableCell key={header.key}>
                    {item[header.key as keyof DataItem]}
                  </TableCell>
                ))}
              </TableRow>
            );
          }}
        </TableBody>
      </Table>

      <div ref={lastElementRef} />
    </section>
  );
}
