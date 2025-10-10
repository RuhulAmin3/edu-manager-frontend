import dayjs from "dayjs";
import type { UploadFile } from "antd/es/upload/interface";

export const getTeacherFormObj = (values: Record<string, unknown>) => {
  const formObj: Record<string, unknown> = {};

  // Add the rest of the values, handling special fields (e.g., date, image)
  Object.entries(values).forEach(([key, value]) => {
    // Handle date fields and convert them to dayjs objects
    if (key.toLowerCase().includes("date") && typeof value === "string") {
      formObj[key] = dayjs(value);
    }
    // Handle image field: convert URL string to UploadFile array
    else if (key === "image" && typeof value === "string") {
      formObj[key] = [
        {
          uid: "-1", // Unique identifier for the file
          name: "Uploaded Image", // Placeholder name
          status: "done", // Mark it as already uploaded
          url: value, // Image URL from backend
        } as UploadFile,
      ];
    } else {
      formObj[key] = value;
    }

  }); 
  return formObj;
};
