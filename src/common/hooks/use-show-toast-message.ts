/* eslint-disable react-hooks/exhaustive-deps */
/**
 * External Dependencies
 */
import { useEffect } from "react";
import { App } from "antd";

/**
 * Internal Dependencies
 */
import { ModifiedErrorType } from "../types/response.type";

type ShowToastProps = {
  isError?: boolean;
  isSuccess?: boolean;
  error?: ModifiedErrorType | undefined;
  successMessage?: string;
  cb?: () => void;
};

const useShowToastMessage = ({
  isError,
  isSuccess,
  error,
  successMessage,
  cb,
}: ShowToastProps): void => {
  const { notification } = App.useApp();

  useEffect(() => {
    if (isError && error !== undefined) {
      const { data } = error;
      if (Array.isArray(data)) {
        data.forEach((msg) =>
          notification.error({
            message: msg || "Something is wrong!!",
            pauseOnHover: true,
            duration: 2,
            type: "error",
            showProgress: true,
          })
        );
      } else {
        notification.error({
          message: data || "Something is wrong!!",
          pauseOnHover: true,
          duration: 2,
          type: "error",
          showProgress: true,
        });
      }
    }

    if (isSuccess) {
      notification.success({
        message: successMessage || "Operation Successful",
        pauseOnHover: true,
        duration: 2,
        type: "success",
        showProgress: true,
      });
      if (cb) cb();
    }
  }, [error, isError, isSuccess, successMessage, notification]);
};

export default useShowToastMessage;
