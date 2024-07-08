import axios from "axios";
import { ApiResponse, SuccessApiResponse } from "../models/types";

function isSuccessApiResponse<T>(
  response: ApiResponse
): response is SuccessApiResponse<T> {
  return "result" in response;
}

async function fetchApiData<T>(
  url: string,
  params: object,
  token: string | null // Add token parameter
): Promise<T | null> {
  if (!token) {
    return null;
  }

  try {
    const response = await axios.get<ApiResponse>(url, {
      headers: {
        Authorization: token,
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
    console.error(
      "There was an error fetching the data or no data retrieved",
      error
    );
    return null;
  }
}

async function postApiData<T>(
  url: string,
  body: object,
  token: string | null
): Promise<boolean | null> {
  if (!token) {
    return null;
  }

  try {
    console.log(body);
    const response = await axios.post<ApiResponse>(url, body, {
      headers: {
        Authorization: token,
      },
    });

    if (isSuccessApiResponse<T>(response.data)) {
      return true;
    } else {
      console.error("Failed to post data");
      return false;
    }
  } catch (error) {
    console.error(
      "There was an error posting the data or no data retrieved",
      error
    );
    return null;
  }
}

export { fetchApiData, postApiData };
