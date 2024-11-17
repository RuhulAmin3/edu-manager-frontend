import { TableProps } from "antd";
import { SubjectDataType } from "./subject.type";
import dayjs from "dayjs";
import { DeleteFilled } from "@ant-design/icons"; 
 
export const columns: TableProps<SubjectDataType>['columns'] = [
    {
        title: 'Name',
        dataIndex: 'title',
        key: 'title',
        width: "30%",
        sorter:true,
    },
    {
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
        sorter: true,
    },
    {
        title: 'Added',
        dataIndex: 'createdAt',
        key: 'createdAt',
        sorter: true,
        render: (data: string) => {
            return data && dayjs(data).format("MMM D, YYYY hh:mm A");
        },
    },
    {
        title: 'Action',  
        render: () => { 
            return (<DeleteFilled/> )
        }
    },
];
 