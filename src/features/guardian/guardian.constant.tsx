import { Avatar, Flex, TableProps, Tag } from "antd";
import { bloodGroupList } from "~/common/constants";
import { EDU_MANAGER_TOKENS } from "~/styles/token"; 
import AdminGuardianListAction from "./components/admin-guardian-list-action";

export const GuardianListBreadCrumbItems = [
    {
      label: "Guardian List",
    },
  ];
export const columns: TableProps["columns"] = [
    {
      title: "Guardian Id",
      dataIndex: "guardianId",
      key: "guardianId",
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
      title: "Occupation",
      dataIndex: "occupation",
      key: "occupation",
      sorter:true, 
    },  
    {
      title: "Account Status",
      dataIndex: "accountStatus",
      key: "accountStatus",
      sorter:true,
      render: (data: string) => {
        const color =
          data == "Approved"
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
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      sorter: true,
    },
    {
      title: "No of students",
      dataIndex: "students",
      key: "students",
      render: (data: string[]) => {
        return data.length || 0;
      },
    },
  
    {
      title: "Action",
      dataIndex: "id",
      align: "center",
      fixed: "right",
      render: (id: string) => {
        return (
           <AdminGuardianListAction id={id}/>
        );
      },
    },
  ];