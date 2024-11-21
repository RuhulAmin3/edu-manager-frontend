import { Avatar, Flex, TableProps, Tag } from "antd"; 
import { bloodGroupList } from "~/common/constants";
import { EDU_MANAGER_TOKENS } from "~/styles/token";
import AdminStudentListAction from "./components/admin-student-list-action";
 
export const studentListBreadCrumbItems = [
  {
    label: "Student List",
  },
];

export const columns: TableProps["columns"] = [
  {
    title: "Student Id",
    dataIndex: "studentId",
    key: "studentId",
    fixed: "left",
  },
  {
    title: "Roll",
    dataIndex: "classRoll",
    key: "classRoll",
  },
  {
    title: "Name",
    key: "name",
    align: "center",
    render: (data: Record<string, string | unknown>) => {
      const { name, image } =
        (data as {
          name: { firstName: string; middleName?: string; lastName: string };
          image: string;
        }) || {};

      return (
        <Flex gap={4} align="center" >
          <Avatar src={image} /> 
            {`${name?.firstName} ${name?.middleName ? name.middleName : ""} ${
              name?.lastName
            }`} 
        </Flex>
      );
    },
  },
  {
    title: "Class",
    dataIndex: "className",
    key: "className",
    sorter: true,
  },
  {
    title: "School",
    dataIndex: "schoolName",
    key: "schoolName",
  },
  {
    title: "Section",
    dataIndex: "section",
    key: "section",
    sorter: true,
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    sorter: true,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (data: string) => {
      const color =
        data == "Active"
          ? EDU_MANAGER_TOKENS.colors["edu-primary"]
          : EDU_MANAGER_TOKENS.colors["edu-danger"];
      return (
        <Tag color={color} key={data}>
          {" "}
          {data}
        </Tag>
      );
    },
  },
  {
    title: "Admission Year",
    dataIndex: "admissionYear",
    key: "admissionYear",
    sorter:true,
  },
  {
    title: "Blood Group",
    dataIndex: "bloodGroup",
    key: "bloodGroup",
    render: (data: string) => {
      return bloodGroupList[data];
    },
  },

  {
    title: "Action",
    dataIndex: "id",
    align: "center",
    fixed: "right",
    render: (id: string) => {
      return (
         <AdminStudentListAction id={id}/>
      );
    },
  },
];
