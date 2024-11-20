import { TableProps } from "antd";
import { ClassDataType } from "./class.type"; 
import ClassListAction from "./components/class-list-action";

export const columns: TableProps<ClassDataType>["columns"] = [
  {
    title: "Class Name",
    dataIndex: "className",
    key: "classname",
    width: "30%",
    sorter: true,
  },
  {
    title: "No of Students",
    dataIndex: "studentIds",
    key: "studentIds",
    align: "center",
    render: (data: string[]) => {
      return data?.length || 0;
    },
  },
  {
    title: "No of Subjects",
    dataIndex: "subjects",
    key: "subjects",
    align:"center", 
    render: (data: string[]) => {
      return data?.length || 0;
    },
  },
  {
    title: "Action",
    dataIndex: "id",
    align: "center",
    render: (id: string) => {
      return <ClassListAction id={id} />;
    },
  },
];

export const classBreadCrumbItems = [
  {
    label: `Class List`,
  },
];
