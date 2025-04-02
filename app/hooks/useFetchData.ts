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
        console.log("Fetching saved search data...");
        const response = await fetch(`/api/saveSearch?id=${id}`);
        if (!response.ok) throw new Error("Failed to fetch search data");

        const result = await response.json();

        // Fetch search results based on words
        const searchResponse = await fetch("/api/searchWords", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ words: result.words, ageBand: result.age }),
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
