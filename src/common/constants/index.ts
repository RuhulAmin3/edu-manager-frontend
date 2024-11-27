export const ROLE = {
  ADMIN: "ADMIN",
  TEACHER: "TEACHER",
  GUARDIAN: "GUARDIAN",
  STUDENT: "STUDENT",
};

export const bloodGroupList: { [key: string]: string } = {
  A_POSITIVE: "A+",
  A_NEGETIVE: "A-",
  B_POSITIVE: "B+",
  B_NEGETIVE: "B-",
  AB_POSITIVE: "AB+",
  AB_NEGETIVE: "AB-",
  O_POSITIVE: "O+",
  O_NEGETIVE: "O-",
};

export const bloodGroupSelectList = [
  {
    label: "A+",
    value: "A_POSITIVE",
  },
  {
    label: "A-",
    value: "A_NEGETIVE",
  },
  {
    label: "B+",
    value: "B_POSITIVE",
  },
  {
    label: "B-",
    value: "B_NEGETIVE",
  },
  {
    label: "O+",
    value: "O_POSITIVE",
  },
  {
    label: "O-",
    value: "O_NEGETIVE",
  },
  {
    label: "AB+",
    value: "AB_POSITIVE",
  },
  {
    label: "AB-",
    value: "AB_NEGETIVE",
  },
];

export const monthSelectList = [
  { label: "January", value: "January" },
  { label: "February", value: "February" },
  { label: "March", value: "March" },
  { label: "April", value: "April" },
  { label: "May", value: "May" },
  { label: "June", value: "June" },
  { label: "July", value: "July" },
  { label: "August", value: "August" },
  { label: "September", value: "September" },
  { label: "October", value: "October" },
  { label: "November", value: "November" },
  { label: "December", value: "December" },
];


export const genderSelectList = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" }
]

export const studentStatusSelectList = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
  { label: "Block", value: "Block" }
]

