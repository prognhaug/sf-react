// useApiHandler.ts
import axios from "axios";
import { ApiResponse, SuccessApiResponse } from "../models/types";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

function isSuccessApiResponse<T>(
  response: ApiResponse
): response is SuccessApiResponse<T> {
  return "result" in response;
}

export function useApiHandler() {
  const token = useAuthHeader();

  const get = async <T>(url: string, params?: object): Promise<T | null> => {
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
  };

  const post = async <T>(url: string, body: object): Promise<T | null> => {
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
  };

  const put = async <T>(url: string, body: object): Promise<T | null> => {
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
  };
  const deleteData = async <T>(url: string): Promise<T | null> => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.delete<ApiResponse>(url, {
        headers: {
          Authorization: token,
        },
      });

      if (isSuccessApiResponse<T>(response.data)) {
        return response.data.result.data;
      } else {
        console.error("Failed to delete data");
        return null;
      }
    } catch (error) {
      console.error(
        "There was an error deleting the data or no data retrieved",
        error
      );
      return null;
    }
  };

  return { get, post, put, deleteData };
}
