import { useState, useEffect } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { ApiResponse, SuccessApiResponse } from "../lib";
import axios, { AxiosResponse } from "axios";

function isSuccessApiResponse<T>(
  response: ApiResponse
): response is SuccessApiResponse<T> {
  return (
    "result" in response &&
    response.result !== null &&
    "data" in response.result
  );
}

const paramsEmpty = {};

function useFetch<T>(
  url: string,
  params: Record<string, string> = paramsEmpty,
  dependencies: React.DependencyList = []
): {
  data: T | null;
  loading: boolean;
  error: Error | null;
} {
  const token = useAuthHeader();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!url) {
        setData(null);
        setLoading(false);
        setError(null);
        return;
      }
      setLoading(true);
      try {
        const response: AxiosResponse<ApiResponse> =
          await axios.get<ApiResponse>(url, {
            headers: {
              Authorization: token,
            },
            params,
          });
        if (isMounted) {
          if (isSuccessApiResponse<T>(response.data)) {
            setData(response.data.result.data);
          } else {
            setError(new Error("An error occurred while fetching data"));
          }
        }
      } catch (error) {
        if (isMounted) setError(error as Error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, params, token, ...dependencies]);

  return { data, loading, error };
}

export default useFetch;
