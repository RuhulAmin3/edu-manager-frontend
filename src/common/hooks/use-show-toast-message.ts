/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { ModifiedErrorType } from "../types/response.type";
import { App } from "antd"; 

function useShowToastMessage(
  isError: boolean,
  isSuccess: boolean,
  error: ModifiedErrorType | undefined,
  successMessage: string,
  cb?: () => void
) {
  const { notification } = App.useApp();
  useEffect(() => {
    if (isError && error != undefined) {
      const { data } = error;
      if (Array.isArray(data)) {
        data.forEach((msg) =>
          notification.error({
            message: msg,
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
        message: successMessage,
        pauseOnHover: true,
        duration: 2,
        type: "success",
        showProgress: true,
      });
      if (cb != undefined) cb();
    }
  }, [error, isError, isSuccess, notification, successMessage]);
}

export default useShowToastMessage;
