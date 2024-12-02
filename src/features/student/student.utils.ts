import dayjs from "dayjs"; 
import type { UploadFile } from "antd/es/upload/interface";

export const getStudentObj = (values: Record<string, unknown>) => {
  const studentObj: Record<string, unknown> = {};
  const guardian: Record<string, unknown> = {};
  const name: Record<string, unknown> = {};

  // create name object
  name["firstName"] = values["firstName"];

  if (values?.middleName) {
    name["middleName"] = values["middleName"];
  }

  name["lastName"] = values["lastName"];

  // create guardian object
  guardian["fatherName"] = values["fatherName"];
  guardian["fatherOccupation"] = values["fatherOccupation"];
  guardian["fatherContactNo"] = values["fatherContactNo"];

  guardian["motherName"] = values["motherName"];
  guardian["motherOccupation"] = values["motherOccupation"];
  guardian["motherContactNo"] = values["motherContactNo"];

  studentObj["name"] = name;
  studentObj["guardian"] = guardian;

  studentObj["gender"] = values["gender"];
  studentObj["dateOfBirth"] = (values["dateOfBirth"] as Date).toISOString();

  if (values?.status) studentObj["status"] = values["status"];
  if (values?.email) studentObj["email"] = values["email"];
  if (values?.contactNo) studentObj["contactNo"] = values["contactNo"];
  if (values?.shortDescription)
    studentObj["shortDescription"] = values["shortDescription"];

  studentObj["admissionYear"] = +(values["admissionYear"] as string);
  studentObj["bloodGroup"] = values["bloodGroup"];
  studentObj["className"] = values["className"];
  studentObj["classRoll"] = values["classRoll"];
  studentObj["section"] = values["section"];
  studentObj["schoolName"] = values["schoolName"];
  studentObj["address"] = values["address"];

  return studentObj;
}; 

export const getFormObj = (values: Record<string, unknown>) => {
  const formObj: Record<string, unknown> = {};

  // Flatten nested objects for fields like 'name' and 'guardian'
  ["name", "guardian"].forEach((key) => {
    if (typeof values[key] === "object" && values[key] !== null) {
      Object.entries(values[key] as Record<string, string>).forEach(
        ([subKey, value]) => {
          formObj[subKey] = value;
        }
      );
    }
  });

  // Add the rest of the values, handling special fields (e.g., date, image)
  Object.entries(values).forEach(([key, value]) => {
    if (!["name", "guardian"].includes(key)) {
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
    }
  });

  return formObj;
};
