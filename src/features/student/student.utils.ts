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
