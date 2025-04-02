// import { useState, useEffect } from "react";

// export const useFetchData = (id: string | null) => {
//   const [data, setData] = useState<any | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!id) {
//       setLoading(false); // Stop loading if no ID is provided
//       return;
//     }

//     const fetchData = async () => {
//       try {
//         console.log("Fetching saved search data...");
//         const response = await fetch(`/api/saveSearch?id=${id}`);
//         if (!response.ok) throw new Error("Failed to fetch search data");

//         const result = await response.json();

//         const endpoint = result.words ? "words" : "stats"; // Determine the endpoint based on the presence of words

//         console.log("Fetching for endpoint:", endpoint);
//         // Fetch search results based on words
//         const searchResponse = await fetch("/api/searchWords", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ words: result.words, ageBand: result.age }),
//         });

//         if (!searchResponse.ok)
//           throw new Error("Failed to fetch search results");

//         const searchResults = await searchResponse.json();

//         const enhancedResults = searchResults.map((item: any) => ({
//           ...item,
//           numberOfLetters: item.Word ? item.Word.length : 0, // Calculate number of letters
//         }));

//         // Combine search criteria and results
//         setData({
//           searchCriteria: result.searchCriteria || {},
//           words: result.words || [],
//           age: result.age || "all",
//           results: enhancedResults,
//         });
//       } catch (err) {
//         setError("Error fetching data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [id]);

//   return { data, loading, error };
// };

import { useState, useEffect } from "react";

export const useFetchData = (id: string | null) => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false); // Stop loading if no ID is provided
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/saveSearch?id=${id}`);
        if (!response.ok) throw new Error("Failed to fetch search data");

        const result = await response.json();
        const searchMode = result.words ? "words" : "stats";

        const endpoint = result.words ? "/api/searchWords" : "/api/filterWords"; // Determine the endpoint based on the presence of words

        const body =
          searchMode === "words"
            ? JSON.stringify({
                words: result.words,
                ageBand: result.age,
              })
            : JSON.stringify({
                searchCriteria: result.searchCriteria,
                ageBand: result.age,
              });

        if (!body) {
          throw new Error("Failed to construct request body");
        }

        // Fetch search results based on words
        const searchResponse = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({ words: result.words, ageBand: result.age }),
          body: body,
        });

        if (!searchResponse.ok)
          throw new Error("Failed to fetch search results");

        const searchResults = await searchResponse.json();

        const enhancedResults = searchResults.map((item: any) => ({
          ...item,
          numberOfLetters: item.Word ? item.Word.length : 0, // Calculate number of letters
        }));

        // Combine search criteria and results
        setData({
          searchCriteria: result.searchCriteria || {},
          words: result.words || [],
          age: result.age || "all",
          results: enhancedResults,
        });
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { data, loading, error };
};
