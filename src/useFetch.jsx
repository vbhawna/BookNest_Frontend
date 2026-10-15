import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        setData(null);

        const response = await fetch(url, {
          signal: controller.signal,
        });

        let result = null;

        try {
          result = await response.json();
        } catch (jsonError) {
          throw new Error("Failed to parse JSON response");
        }

        if (!response.ok) {
          const requestError = new Error(
            result?.message ||
              (response.status === 404
                ? "Book not found."
                : "Unable to fetch data. Please try again.")
          );

          requestError.status = response.status;
          throw requestError;
        }

        setData(result);
      } catch (err) {
        if (err.name === "AbortError") return;

        setError(err);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
