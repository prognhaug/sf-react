import axios, { AxiosResponse } from "axios";
import { ApiResponse, SuccessApiResponse } from "../lib";

function isSuccessApiResponse<T>(
  response: ApiResponse
): response is SuccessApiResponse<T> {
  return (
    "result" in response &&
    response.result !== null &&
    "data" in response.result
  );
}

async function fetchApiData<T>(
  url: string,
  params: object,
  token: string | null // Add token parameter
): Promise<T> {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.get<ApiResponse>(
      url,
      {
        headers: {
          Authorization: token,
        },
        params,
      }
    );

    if (isSuccessApiResponse<T>(response.data)) {
      // Now that we've asserted the type, we can safely access .data
      return response.data.result.data;
    } else {
      // Handle failure or error responses as needed
      throw new Error("API response was not successful.");
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      // Handle 404 specifically
      console.log("Resource not found", error);
      return [] as T;
    } else {
      console.error(
        "There was an error fetching the data or no data retrieved",
        error
      );
      throw new Error("Failed to fetch data");
    }
  }
}

async function postApiData<T>(
  url: string,
  body: object,
  token: string | null
): Promise<T | null> {
  if (!token) {
    return null;
  }

  try {
    const response = await axios.post<ApiResponse>(url, body, {
      headers: {
        Authorization: token,
      },
    });

    if (isSuccessApiResponse<T>(response.data)) {
      return response.data.result.data;
    } else {
      console.error("Failed to post data");
      return null;
    }
  } catch (error) {
    console.error(
      "There was an error posting the data or no data retrieved",
      error
    );
    return null;
  }
}

async function putApiData<T>(
  url: string,
  body: object,
  token: string | null
): Promise<T | null> {
  if (!token) {
    return null;
  }

  try {
    const response = await axios.put<ApiResponse>(url, body, {
      headers: {
        Authorization: token,
      },
    });

    if (isSuccessApiResponse<T>(response.data)) {
      return response.data.result.data;
    } else {
      console.error("Failed to put data");
      return null;
    }
  } catch (error) {
    console.error(
      "There was an error uploading the data or no data retrieved",
      error
    );
    return null;
  }
}

export { fetchApiData, postApiData, putApiData };
