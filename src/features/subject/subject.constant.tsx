import { TableProps } from "antd";
import { SubjectDataType } from "./subject.type";
import dayjs from "dayjs"; 
import SubjectListAction from "./components/subject-list-action";

export const columns: TableProps<SubjectDataType>["columns"] = [
  {
    title: "Name",
    dataIndex: "title",
    key: "title",
    width: "30%",
    sorter: true,
  },
  {
    title: "Code",
    dataIndex: "code",
    key: "code",
    align: "center",
    sorter: true,
  },
  {
    title: "Added",
    dataIndex: "createdAt",
    key: "createdAt",
    sorter: true,
    render: (data: string) => {
      return data && dayjs(data).format("MMM D, YYYY hh:mm A");
    },
  },
  {
    title: "Action",
    dataIndex: "id",
    align: "center",
    render: (id:string) => { 
      return <SubjectListAction id={id} />;
    },
  },
];

export const subjectsBreadCrumbItems = [
  {
    label: `Subject List`,
  },
];
