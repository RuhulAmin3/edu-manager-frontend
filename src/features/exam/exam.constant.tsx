import dayjs from "dayjs";
import { TableProps } from "antd";

import ExamListAction from "./components/exam-list-action";

export const columns: TableProps["columns"] = [
  {
    title: "Exam Name",
    dataIndex: "title",
    key: "title",
    sorter: true,
  },
  {
    title: "Month",
    dataIndex: "month",
    key: "month", 
    sorter:true,
  },
  {
    title: "Exam Date",
    dataIndex: "date",
    key: "date",
    sorter:true,
    render: (data: string) => {
      return data && dayjs(data).format("MMM D, YYYY hh:mm A");
    },
  },
  {
    title: "Class Name",
    dataIndex: "class",
    key: "class", 
    render: (data: Record<string, string>) => {
      return data?.className;
    },
  },
  {
    title: "No of Subjects",
    dataIndex: "subjects",
    key: "subjects",
    align: "center",
    render: (data: string[]) => { 
      return data?.length || 0;
    },
  },
  {
    title: "Action",
    dataIndex: "id",
    align: "center",
    fixed:"right",
    render: (id: string) => {
      return <ExamListAction id={id} />;
    },
  },
];

export const classBreadCrumbItems = [
  {
    label: `Class List`,
  },
];
