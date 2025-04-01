// import { useSearchParams } from "next/navigation";
// import { useState, useEffect } from "react";
// import Papa from "papaparse";
// import { DataItem } from "../types/data";

// const useFetchData = (age: string) => {
//   const searchParams = useSearchParams(); // ✅ Get query params
//   const [data, setData] = useState<DataItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const filePath = `/data/cyplex_${age}.csv`;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(filePath);
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }
//         const reader = response.body?.getReader();
//         const decoder = new TextDecoder("utf-8");

//         if (!reader) {
//           throw new Error("Failed to get reader from response");
//         }

//         let filteredData: DataItem[] = [];
//         let longestWordLength = 0;

//         let csvText = "";
//         while (true) {
//           const { done, value } = await reader.read();
//           if (done) break;
//           csvText += decoder.decode(value, { stream: true });
//         }

//         Papa.parse<DataItem>(csvText, {
//           header: true,
//           dynamicTyping: true, // Automatically convert numeric fields
//           step: (results) => {
//             const item = results.data;
//             const length = item.Word?.length ?? 0;

//             // Update longest word length
//             if (length > longestWordLength) {
//               longestWordLength = length;
//             }

//             // Apply filters based on search params
//             const numberOfLettersParams =
//               searchParams.getAll("numberOfLetters");
//             if (numberOfLettersParams.length === 2) {
//               const [minLetters, maxLetters] =
//                 numberOfLettersParams.map(Number);
//               if (length < minLetters || length > maxLetters) {
//                 return;
//               }
//             }

//             const zipfFreq = searchParams.get("Zipf_freq");
//             if (zipfFreq) {
//               const [minZipf, maxZipf] = zipfFreq.split(",").map(Number);
//               const zipf = item.Zipf_freq ?? 0;
//               if (zipf < minZipf || zipf > maxZipf) {
//                 return;
//               }
//             }

//             const pos = searchParams.getAll("AllPoS");
//             if (pos.length > 0 && !pos.includes(item.AllPoS as string)) {
//               return;
//             }

//             const bookPercentage = searchParams.get("CD_book_perc_raw");
//             if (bookPercentage) {
//               const [minPerc, maxPerc] = bookPercentage.split(",").map(Number);
//               const perc = item.CD_book_perc_raw ?? 0;
//               if (perc < minPerc || perc > maxPerc) {
//                 return;
//               }
//             }

//             const CBBC_log = searchParams.get("CBBC_log");
//             if (CBBC_log) {
//               const [minLog, maxLog] = CBBC_log.split(",").map(Number);
//               const log = item.CBBC_log ?? 0;
//               if (log < minLog || log > maxLog) {
//                 return;
//               }
//             }

//             const CBeebies_log = searchParams.get("CBeebies_log");
//             if (CBeebies_log) {
//               const [minLog, maxLog] = CBeebies_log.split(",").map(Number);
//               const log = item.CBeebies_log ?? 0;
//               if (log < minLog || log > maxLog) {
//                 return;
//               }
//             }

//             const SubtlexUK_log = searchParams.get("SubtlexUK_log");
//             if (SubtlexUK_log) {
//               const [minLog, maxLog] = SubtlexUK_log.split(",").map(Number);
//               const log = item.SubtlexUK_log ?? 0;
//               if (log < minLog || log > maxLog) {
//                 return;
//               }
//             }

//             // Add item to filtered data
//             filteredData.push(item);
//           },
//           complete: () => {
//             setData(filteredData);
//             setLoading(false);
//           },
//           error: (err: unknown) => {
//             if (err instanceof Error) {
//               setError(err.message);
//             } else {
//               setError("An unknown error occurred");
//             }
//             setLoading(false);
//           },
//         });
//       } catch (err: unknown) {
//         if (err instanceof Error) {
//           setError(err.message);
//         } else {
//           setError("An unknown error occurred");
//         }
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [filePath, searchParams]); // ✅ Depend on search params

//   return { data, loading, error };
// };

// export default useFetchData;
// import { useSearchParams } from "next/navigation";
// import { useState, useEffect, useRef } from "react";
// import Papa from "papaparse";
// import { DataItem } from "../types/data";

// const useFetchData = (age: string, pageSize: number) => {
//   const searchParams = useSearchParams(); // ✅ Get query params
//   const [data, setData] = useState<DataItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [page, setPage] = useState(0);
//   const [hasMore, setHasMore] = useState(true);
//   const readerRef = useRef<ReadableStreamDefaultReader<Uint8Array> | null>(
//     null
//   );
//   const decoder = new TextDecoder("utf-8");

//   const filePath = `/data/cyplex_${age}.csv`;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (!readerRef.current) {
//           const response = await fetch(filePath);
//           if (!response.ok) {
//             throw new Error("Failed to fetch data");
//           }
//           readerRef.current = response.body?.getReader() ?? null;
//         }

//         if (!readerRef.current) {
//           throw new Error("Failed to get reader from response");
//         }

//         let filteredData: DataItem[] = [];
//         let csvText = "";

//         for (let i = 0; i < pageSize; i++) {
//           const { done, value } = await readerRef.current.read();
//           if (done) {
//             setHasMore(false);
//             break;
//           }
//           csvText += decoder.decode(value, { stream: true });
//         }

//         Papa.parse<DataItem>(csvText, {
//           header: true,
//           dynamicTyping: true, // Automatically convert numeric fields
//           step: (results) => {
//             const item = results.data;

//             if (!item.Word || !item.Zipf_freq || !item.AllPoS) {
//               return;
//             }

//             const length = item.Word?.length ?? 0;

//             // Apply filters based on search params
//             const numberOfLettersParams =
//               searchParams.getAll("numberOfLetters");
//             if (numberOfLettersParams.length === 2) {
//               const [minLetters, maxLetters] =
//                 numberOfLettersParams.map(Number);
//               if (length < minLetters || length > maxLetters) {
//                 return;
//               }
//             }

//             const zipfFreq = searchParams.get("Zipf_freq");
//             if (zipfFreq) {
//               const [minZipf, maxZipf] = zipfFreq.split(",").map(Number);
//               const zipf = item.Zipf_freq ?? 0;
//               if (zipf < minZipf || zipf > maxZipf) {
//                 return;
//               }
//             }

//             const pos = searchParams.getAll("AllPoS");
//             if (pos.length > 0 && !pos.includes(item.AllPoS as string)) {
//               return;
//             }

//             const bookPercentage = searchParams.get("CD_book_perc_raw");
//             if (bookPercentage) {
//               const [minPerc, maxPerc] = bookPercentage.split(",").map(Number);
//               const perc = item.CD_book_perc_raw ?? 0;
//               if (perc < minPerc || perc > maxPerc) {
//                 return;
//               }
//             }

//             const CBBC_log = searchParams.get("CBBC_log");
//             if (CBBC_log) {
//               const [minLog, maxLog] = CBBC_log.split(",").map(Number);
//               const log = item.CBBC_log ?? 0;
//               if (log < minLog || log > maxLog) {
//                 return;
//               }
//             }

//             const CBeebies_log = searchParams.get("CBeebies_log");
//             if (CBeebies_log) {
//               const [minLog, maxLog] = CBeebies_log.split(",").map(Number);
//               const log = item.CBeebies_log ?? 0;
//               if (log < minLog || log > maxLog) {
//                 return;
//               }
//             }

//             const SubtlexUK_log = searchParams.get("SubtlexUK_log");
//             if (SubtlexUK_log) {
//               const [minLog, maxLog] = SubtlexUK_log.split(",").map(Number);
//               const log = item.SubtlexUK_log ?? 0;
//               if (log < minLog || log > maxLog) {
//                 return;
//               }
//             }

//             // Add item to filtered data if it doesn't already exist
//             if (
//               !filteredData.some(
//                 (existingItem) => existingItem.Word === item.Word
//               )
//             ) {
//               filteredData.push(item);
//             }
//           },
//           complete: () => {
//             setData((prevData) => [...prevData, ...filteredData]);
//             setLoading(false);
//           },
//           error: (err: unknown) => {
//             if (err instanceof Error) {
//               setError(err.message);
//             } else {
//               setError("An unknown error occurred");
//             }
//             setLoading(false);
//           },
//         });
//       } catch (err: unknown) {
//         if (err instanceof Error) {
//           setError(err.message);
//         } else {
//           setError("An unknown error occurred");
//         }
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [filePath, searchParams, page]); // ✅ Depend on search params and page

//   const loadMore = () => {
//     if (hasMore) {
//       setPage((prevPage) => prevPage + 1);
//     }
//   };

//   return { data, loading, error, loadMore, hasMore };
// };

// export default useFetchData;
import { useState, useEffect } from "react";
import Papa from "papaparse";

const useFetchData = (searchParams: URLSearchParams) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(
        `/data/cyplex_${searchParams.get("Age")}.csv`
      );
      const csvText = await response.text();

      Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          const filters = Object.fromEntries(searchParams.entries());
          const filteredData = results.data.filter((row) =>
            Object.entries(filters).every(([key, value]) => {
              if (Array.isArray(value)) {
                return value.includes(row[key]);
              }
              return row[key] === value;
            })
          );
          setData(filteredData);
          setLoading(false);
        },
      });
    };

    fetchData();
  }, [searchParams]);

  return { data, loading };
};

export default useFetchData;
