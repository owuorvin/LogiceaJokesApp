import api from "../api";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { makeErrorMessage } from "./useGracefulAPIErrorHandling";

/**
 * @description Abstract the logic for making a post request into a reusable function
 * @param payload
 * @param path
 * @returns
 */
export default function usePostRequest(
  path: string,
  payload: any,
  onSuccess: Function,
  onFailure: Function
) {
  const postRequest = () => api.post(path, payload);
  const mutation = useMutation(postRequest, {
    onSuccess: (data) => {
      onSuccess(data);
    },
    onError: (error: AxiosError) => {
      onFailure({
        message: makeErrorMessage(error),
        statusCode: error.response?.status,
      });
    },
  });
  return mutation;
}

/**
 * @description Abstract the logic for making a post request into a reusable function
 * @param payload
 * @param path
 * @returns
 */
export function usePatchRequest(
  path: string,
  payload: any,
  onSuccess: Function,
  onFailure: Function
) {
  const patchRequest = () => api.patch(path, payload);
  const mutation = useMutation(patchRequest, {
    onSuccess: (data) => {
      onSuccess(data);
    },
    onError: (error: AxiosError) => {
      onFailure({
        message: makeErrorMessage(error),
        statusCode: error.response?.status,
      });
    },
  });
  return mutation;
}

