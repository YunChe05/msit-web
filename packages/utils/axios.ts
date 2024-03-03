import axios, { AxiosError, AxiosResponse } from "axios";
import qs from "qs";

const DEFAULT_ERROR_MSG = "Something went wrong";

export const makeRequest = axios.create({
  baseURL: process.env.APP_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

makeRequest.interceptors.request.use(
  async (config) => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken") || "");

      if (token.length !== 0 && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error parsing token from localStorage:", error);
    }

    return config;
  },
  (error) => Promise.reject(error)
);
export const errorHandler = (error: AxiosError<ErrorEvent>) => {
  if (error.response) {
    throw new Error(parseErrorResponse(error.response));
  } else if (error.request) {
    throw new Error("Connection Timeout, Please try again.");
  } else {
    throw new Error(error.message);
  }
};

const parseErrorResponse = (
  response: AxiosResponse<ErrorEvent, any> | undefined
): string => {
  const errorResponse: string[] = [];

  errorResponse.push(`STATUS: ${response?.status}`);
  errorResponse.push(
    `MSG: ${response?.data.error?.message || response?.data.message}`
  );

  if (response && response.request && "_url" in response.request) {
    const [url, params] = (response.request._url as string).split("?");
    errorResponse.push(`URL: ${url}`);
    errorResponse.push(`params: ${JSON.stringify(qs.parse(params))}`);
  }

  //   if (__DEV__) {
  //     // eslint-disable-next-line no-console
  //     console.log(errorResponse.join("\n"));
  //   }

  return (
    parseDataErrorMessage(response?.data.error?.message) || DEFAULT_ERROR_MSG
  );
};

const parseDataErrorMessage = (message: string | undefined) => {
  switch (message) {
    case "Email or Username are already taken":
      return "Email is already taken";
    case "Invalid identifier or password":
      return "Invalid email or password";
    case "Email is already verified or code already used":
      return "Invalid code";
    default:
      return message || DEFAULT_ERROR_MSG;
  }
};
