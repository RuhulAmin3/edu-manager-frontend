import { Avatar, Flex, TableProps, Tag } from "antd";
import { bloodGroupList } from "~/common/constants";
import { EDU_MANAGER_TOKENS } from "~/styles/token";
import AdminTeacherListAction from "./components/admin-teacher-list-action";

export const teacherListBreadCrumbItems = [
    {
      label: "Teacher List",
    },
  ];
export const columns: TableProps["columns"] = [
    {
      title: "Teacher Id",
      dataIndex: "teacherId",
      key: "teacherId",
      fixed: "left",
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
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      sorter: true,
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
      sorter:true,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      sorter: true,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      sorter:true,
      render: (data: string) => {
        const color =
          data == "Monthly"
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
      title: "Email",
      dataIndex: "email",
      key: "email", 
      ellipsis:true,
    },
    {
      title: "Contact No",
      dataIndex: "contactNo",
      key: "contactNo", 
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
           <AdminTeacherListAction id={id}/>
        );
      },
    },
  ];