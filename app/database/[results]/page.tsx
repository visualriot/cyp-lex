// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import { useSearchParams } from "next/navigation";
// import { useFetchData } from "@/app/hooks/useFetchData";

// import { SecondaryBtn } from "@/components/buttons";
// import { DoneIcon, DownloadIcon, CopyIcon } from "@/components/icons";
// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableColumn,
//   TableRow,
//   TableCell,
// } from "@heroui/table";
// import { Spinner } from "@heroui/spinner";

// export default function ResultsPage() {
//   const searchParams = useSearchParams();
//   const id = searchParams.get("id");

//   const [isCopied, setIsCopied] = useState(false);
//   const [headers, setHeaders] = useState<{ key: string; label: string }[]>([]);
//   const [visibleRows, setVisibleRows] = useState<any[]>([]);
//   const [rowsToShow, setRowsToShow] = useState(50); // Number of rows to show initially
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [hasLoadedInitialData, setHasLoadedInitialData] = useState(false);
//   const [showScrollToTop, setShowScrollToTop] = useState(false);

//   const { data = [], loading, error } = useFetchData(id);

//   const allColumns = {
//     Word: "Word",
//     numberOfLetters: "No. of Letters",
//     Lemma: "Lemma",
//     mcPoS: "Most common part of speech",
//     Count: "Raw frequency",
//     Zipf_freq: "Zipf frequency",
//     CD_book_count_raw: "CD_book_count_raw",
//     CD_book_perc_raw: "Book percentage",
//     CBeebies_raw: "Raw frequency in CBeebies TV programmes (ages 0-6)",
//     CBeebies_log: "Zipf frequency in CBeebies TV programmes (ages 0-6)",
//     CBBC_raw: "Raw frequency in CBBC TV programmes (ages 6-12)",
//     CBBC_log: "Zipf frequency in CBBC TV programmes (ages 6-12)",
//     SubtlexUK_raw: "Raw frequency in TV programmes (all ages)",
//     SubtlexUK_log: "Zipf frequency in TV programmes (all ages)",
//   };

//   useEffect(() => {
//     if (data?.results) {
//       setVisibleRows(data.results.slice(0, rowsToShow)); // Load initial rows
//       setHasLoadedInitialData(true); // Mark initial data as loaded
//     }
//   }, [data, rowsToShow]);

//   const loadMoreRows = useCallback(() => {
//     if (!data?.results) return;
//     setLoadingMore(true);

//     // Simulate loading more rows
//     setTimeout(() => {
//       const newRowsToShow = rowsToShow + 50; // Load 50 more rows
//       setVisibleRows(data.results.slice(0, newRowsToShow));
//       setRowsToShow(newRowsToShow);

//       // Set loadingMore to false after rows are loaded
//       setLoadingMore(false);
//     }, 0); // Simulate network delay
//   }, [data, rowsToShow]);

//   const handleScroll = useCallback(() => {
//     if (loading || loadingMore) return;

//     const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

//     setShowScrollToTop(scrollTop > 200);

//     // Check if the user has scrolled near the bottom of the page
//     if (scrollTop + clientHeight >= scrollHeight - 50) {
//       setLoadingMore(true);
//       loadMoreRows();
//     }
//   }, [loadMoreRows, loadingMore, loading]); // Debounce with a 100ms delay

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [handleScroll]);

//   // scroll to top
//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   useEffect(() => {
//     if (!data || !data.results) return;

//     const searchMode = data.words.length === 0 ? "stats" : "words";

//     // Generate headers based on search criteria
//     const generatedHeaders =
//       searchMode === "words"
//         ? Object.keys(allColumns)
//             .filter((key) => data.searchCriteria[key] === true)
//             .map((key) => ({
//               key,
//               label: allColumns[key as keyof typeof allColumns],
//             }))
//         : Object.keys(allColumns).map((key) => ({
//             key,
//             label: allColumns[key as keyof typeof allColumns],
//           })); // Include all headers for stats mode

//     if (!generatedHeaders.some((header) => header.key === "Word")) {
//       generatedHeaders.unshift({ key: "Word", label: allColumns.Word });
//     }

//     setHeaders(generatedHeaders);
//   }, [data]);

//   // Generate table data for download and copy -------------------------------------------------------------------------------------

//   const generateTableData = (delimiter: string) => {
//     const headerLabels = headers.map((header) => header.label);
//     const rows = (data.results || []).map((item: any) =>
//       headers
//         .map((header) => item[header.key as keyof typeof allColumns] || "N/A")
//         .join(delimiter)
//     );
//     return [headerLabels.join(delimiter), ...rows].join("\n");
//   };

//   const copyTableData = () => {
//     const tableData = generateTableData("\t");
//     navigator.clipboard.writeText(tableData).then(
//       () => {
//         setIsCopied(true);
//         setTimeout(() => {
//           setIsCopied(false);
//         }, 2000); // Reset after 2 seconds
//       },
//       (err) => {
//         setIsCopied(false);
//         console.error("Failed to copy table data: ", err);
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

//   if (error) return <div className="text-red-500">{error}</div>;

//   return (
//     <section className="results-page w-full flex flex-col gap-y-4 lg:gap-y-8">
//       <div className="w-full flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
//         <div className="flex flex-col lg:w-1/2">
//           <h3>Search Results</h3>
//           {loading ? (
//             <p className="animate-pulsate italic">
//               Loading your search results...
//             </p>
//           ) : (
//             <p>
//               Your search returned{" "}
//               <span className={loading ? "animate-pulse" : ""}>
//                 {loading ? "..." : data.results ? data.results.length : "0"}
//               </span>{" "}
//               words
//             </p>
//           )}
//         </div>
//         <div className="flex flex-row lg:w-1/2 justify-end items-center space-x-2 lg:space-x-8">
//           <SecondaryBtn
//             onPress={copyTableData}
//             className={loading ? "animate-pulse" : ""}
//             disabled={loading}
//           >
//             {isCopied ? <DoneIcon size={12} /> : <CopyIcon />}
//             {isCopied ? "Copied to clipboard" : "Copy all"}
//           </SecondaryBtn>
//           <SecondaryBtn
//             onPress={downloadTableData}
//             className={loading ? "animate-pulse" : ""}
//             disabled={loading}
//           >
//             <DownloadIcon /> Download results
//           </SecondaryBtn>
//         </div>
//       </div>

//       {loading ? (
//         // Show skeleton table while initial data is loading
//         <Table
//           aria-label="Table with search results"
//           classNames={{
//             table: "shadow-none table-scroll",
//             wrapper: "shadow-none px-0",
//             th: "text-xs",
//             td: "text-xs",
//           }}
//           isStriped
//           isHeaderSticky
//           fullWidth
//           layout="auto"
//         >
//           <TableHeader>
//             {Array.from({ length: 10 }).map((_, index) => (
//               <TableColumn key={index} maxWidth={64}>
//                 <div className="h-4 bg-white rounded"></div>
//               </TableColumn>
//             ))}
//           </TableHeader>

//           <TableBody>
//             {Array.from({ length: 5 }).map((_, rowIndex) => (
//               <TableRow key={`skeleton-${rowIndex}`} className="animate-pulse">
//                 {Array.from({ length: 10 }).map((_, colIndex) => (
//                   <TableCell key={`skeleton-cell-${rowIndex}-${colIndex}`}>
//                     <div className="h-4 bg-gray-300 rounded"></div>
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       ) : (
//         // Show actual table after initial data is loaded
//         <div className="flex flex-col justify-center items-center w-full">
//           <Table
//             aria-label="Table with search results"
//             classNames={{
//               table: "shadow-none",
//               wrapper: "shadow-none px-0 ",
//               th: "text-xs text-wrap whitespace-wrap  py-2",
//               td: "text-xs",
//             }}
//             isStriped
//             removeWrapper
//             fullWidth
//             layout="auto"
//           >
//             <TableHeader>
//               {headers.map((header) => (
//                 <TableColumn key={header.key} maxWidth={96}>
//                   {header.label}
//                 </TableColumn>
//               ))}
//             </TableHeader>

//             <TableBody>
//               {visibleRows.map((item: any, rowIndex) => (
//                 <TableRow
//                   key={`${item.Word}-${rowIndex}`}
//                   className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-100"}
//                 >
//                   {headers.map((header) => (
//                     <TableCell key={header.key}>
//                       {item[header.key] || "N/A"}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>

//           {/* Show spinner only when loading more rows */}
//           {loadingMore ||
//           (hasLoadedInitialData && visibleRows.length < data.results.length) ? (
//             <Spinner size="md" className="mt-4" />
//           ) : null}
//         </div>
//       )}

//       <button
//         onClick={scrollToTop}
//         className={`fixed bottom-8 right-8 bg-accent text-white w-16 h-16 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 smooth ${showScrollToTop ? "opacity-100" : "opacity-0 pointer-events-none"}`}
//         aria-label="Scroll to top"
//       >
//         ↑
//       </button>
//     </section>
//   );
// }
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useFetchData } from "@/app/hooks/useFetchData";

import { SecondaryBtn } from "@/components/buttons";
import { DoneIcon, DownloadIcon, CopyIcon } from "@/components/icons";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Spinner } from "@heroui/spinner";
import { Progress } from "@heroui/progress";

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [isCopied, setIsCopied] = useState(false);
  const [headers, setHeaders] = useState<{ key: string; label: string }[]>([]);
  const [visibleRows, setVisibleRows] = useState<any[]>([]);
  const [rowsToShow, setRowsToShow] = useState(50); // Number of rows to show initially
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasLoadedInitialData, setHasLoadedInitialData] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [progress, setProgress] = useState(0); // Progress percentage

  const { data = [], loading, error } = useFetchData(id);

  const allColumns = {
    Word: "Word",
    numberOfLetters: "No. of Letters",
    Lemma: "Lemma",
    mcPoS: "Most common part of speech",
    Count: "Raw frequency",
    Zipf_freq: "Zipf frequency",
    CD_book_count_raw: "CD_book_count_raw",
    CD_book_perc_raw: "Book percentage",
    CBeebies_raw: "Raw frequency in CBeebies TV programmes (ages 0-6)",
    CBeebies_log: "Zipf frequency in CBeebies TV programmes (ages 0-6)",
    CBBC_raw: "Raw frequency in CBBC TV programmes (ages 6-12)",
    CBBC_log: "Zipf frequency in CBBC TV programmes (ages 6-12)",
    SubtlexUK_raw: "Raw frequency in TV programmes (all ages)",
    SubtlexUK_log: "Zipf frequency in TV programmes (all ages)",
  };

  // Simulate progress while fetching data
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval); // Stop at 90% until data is fetched
            return prev;
          }
          return prev + 10; // Increment progress by 10%
        });
      }, 1000); // Update every 500ms

      return () => clearInterval(interval); // Cleanup interval on unmount
    } else if (data?.results) {
      setProgress(100); // Set progress to 100% when data is fetched
    }
  }, [loading, data]);

  useEffect(() => {
    if (data?.results) {
      setVisibleRows(data.results.slice(0, rowsToShow)); // Load initial rows
      setHasLoadedInitialData(true); // Mark initial data as loaded
    }
  }, [data, rowsToShow]);

  const loadMoreRows = useCallback(() => {
    if (!data?.results) return;
    setLoadingMore(true);

    // Simulate loading more rows
    setTimeout(() => {
      const newRowsToShow = rowsToShow + 50; // Load 50 more rows
      setVisibleRows(data.results.slice(0, newRowsToShow));
      setRowsToShow(newRowsToShow);

      setLoadingMore(false);
    }, 500); // Simulate network delay
  }, [data, rowsToShow]);

  const handleScroll = useCallback(() => {
    if (loading || loadingMore) return;

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    setShowScrollToTop(scrollTop > 200);

    // Check if the user has scrolled near the bottom of the page
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      setLoadingMore(true);
      loadMoreRows();
    }
  }, [loadMoreRows, loadingMore, loading]); // Debounce with a 100ms delay

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  // Generate table data for download and copy -------------------------------------------------------------------------------------

  const generateTableData = (delimiter: string) => {
    const headerLabels = headers.map((header) => header.label);
    const rows = (data.results || []).map((item: any) =>
      headers
        .map((header) => item[header.key as keyof typeof allColumns] || "N/A")
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
    <section className="results-page w-full flex flex-col gap-y-4 lg:gap-y-8">
      <div className="w-full flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
        <div className="flex flex-col lg:w-1/2">
          <h3>Search Results</h3>
          {loading ? (
            <p className="animate-pulsate italic">
              Loading your search results... If your search is large, this might
              take a few seconds.
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
        // Show skeleton table while initial data is loading
        <Table
          aria-label="Table with search results"
          classNames={{
            table: "shadow-none table-scroll",
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
              <TableColumn key={index} maxWidth={64}>
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
        // Show actual table after initial data is loaded
        <div className="flex flex-col justify-center items-center w-full">
          <Table
            aria-label="Table with search results"
            classNames={{
              table: "shadow-none",
              wrapper: "shadow-none px-0 ",
              th: "text-xs text-wrap whitespace-wrap  py-2",
              td: "text-xs",
            }}
            isStriped
            removeWrapper
            fullWidth
            layout="auto"
          >
            <TableHeader>
              {headers.map((header) => (
                <TableColumn key={header.key} maxWidth={96}>
                  {header.label}
                </TableColumn>
              ))}
            </TableHeader>

            <TableBody>
              {visibleRows.map((item: any, rowIndex) => (
                <TableRow
                  key={`${item.Word}-${rowIndex}`}
                  className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-100"}
                >
                  {headers.map((header) => (
                    <TableCell key={header.key}>
                      {item[header.key] || "N/A"}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Show spinner only when loading more rows */}
          {loadingMore ||
          (hasLoadedInitialData && visibleRows.length < data.results.length) ? (
            <Spinner size="md" className="mt-4" />
          ) : null}
        </div>
      )}

      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-accent text-white w-16 h-16 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 smooth ${showScrollToTop ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        aria-label="Scroll to top"
      >
        ↑
      </button>
    </section>
  );
}
