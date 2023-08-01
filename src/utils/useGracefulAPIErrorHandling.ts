/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosError } from "axios";
import { useNavigate, useLocation } from "react-router-dom";
/**
 * @description Intercept API errors and redirect to auth if
 * error is unauthorised error
 * @param {AxiosError} error
 */
export const useRedirectOnUnauthorised = (
  error: any,
  path: string,
  onFailure?: Function
) => {
  const history = useNavigate();
  const location = useLocation();

  if (error && (error as AxiosError)?.response?.status === 403) {
    const newLocation = {
      pathname: "/access-denied",
      state: { from: location },
    };
    history(newLocation);
    return;
  }
  onFailure &&
    onFailure({
      message: makeErrorMessage(error),
      statusCode: error.response?.status,
    });
};

/**
 * @description Attempt to make a useful error message from the API error
 * @param {AxiosError} error The api error
 * @return {string}
 */
export const makeErrorMessage = (error: AxiosError) => {
  if (error.response?.status === 404) {
    return "Resource not found";
  }

  if (error.response?.status === 401) {
    return "Invalid email or password";
  }

  return `${error?.message}` || "Something went wrong";
};
