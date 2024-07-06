import axios from "axios";
import { ApiResponse, SuccessApiResponse } from "../models/types";

function isSuccessApiResponse<T>(
  response: ApiResponse
): response is SuccessApiResponse<T> {
  return "result" in response;
}

async function fetchApiData<T>(
  url: string,
  params: object
): Promise<T | "UNAUTHORIZED" | null> {
  const token = localStorage.getItem("token");
  if (!token) {
    return "UNAUTHORIZED";
  }

  try {
    const response = await axios.get<ApiResponse>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });

    if (isSuccessApiResponse<T>(response.data)) {
      return response.data.result.data;
    } else {
      console.error("Failed to fetch data");
      return null;
    }
  } catch (error) {
    console.error("There was an error fetching the data", error);
    return null;
  }
}

export { fetchApiData };
