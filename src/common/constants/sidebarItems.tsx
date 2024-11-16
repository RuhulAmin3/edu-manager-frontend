import type { MenuProps } from "antd";
import { 
  TableOutlined,
  AppstoreOutlined,
  ScheduleOutlined,
  ThunderboltOutlined,
  CreditCardOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ROLE } from "./index"; 
import { FaPeopleArrows, FaPeopleRoof } from "react-icons/fa6";
import { GoDot } from "react-icons/go";
import { IoMdPeople } from "react-icons/io"; 
import { FaFileAlt } from "react-icons/fa";

export const sidebarItems = (role:string) => { 
  const lowerCase_role = role?.toLowerCase(); 

  const defaultSidebarItems: MenuProps["items"] = [
    // {
    //   label: "Profile",
    //   key: "profile",
    //   icon: <ProfileOutlined />,
    //   children: [
    //     {
    //       label: <Link to={`/${lowerCase_role}`}>Profile</Link>,
    //       key: `/${lowerCase_role}/profile`,
    //     },
    //     {
    //       label: <Link to={`/${lowerCase_role}/change-password`}>Change Password</Link>,
    //       key: `/${lowerCase_role}/change-password`,
    //     },
    //   ],
    // },
  ];

  const commonAdminSidebarItems: MenuProps["items"] = [
    {
      label: <Link to={`/${lowerCase_role}/manage-student`}>Manage Students</Link>,
      icon: <TableOutlined />,
      key: `/${lowerCase_role}/manage-student`,
    },
    {
      label: <Link to={`/${lowerCase_role}/manage-faculty`}>Manage Faculty</Link>,
      icon: <TableOutlined />,
      key: `/${lowerCase_role}/manage-faculty`,
    },
  ];

  const adminSidebarItems: MenuProps["items"] = [
    // ...defaultSidebarItems,
    // ...commonAdminSidebarItems,

    // Admin Student Route
    {
      label: "Student",
      key:"students",
      icon: <FaPeopleArrows />,
      children: [
        {
          label: <Link to={`/${lowerCase_role}/students`}>All Student</Link>,
          key: `/${lowerCase_role}/students`,
          icon:<GoDot />,
        },
        {
          label: <Link to={`/${lowerCase_role}/add-student`}>Add New Student</Link>,
          key: `/${lowerCase_role}/add-student`,
          icon:<GoDot />,
        },
        {
          label: <Link to={`/${lowerCase_role}/students/1`}>Student Details</Link>, // 1 will be replace by unique student Id
          key: `/${lowerCase_role}/students/1`,
          icon:<GoDot />,
        },
        {
          label: <Link to={`/${lowerCase_role}/student-promotion/1`}>Student Promotion</Link>, // 1 will be replace by unique student Id
          key: `/${lowerCase_role}/student-promotion/1`,
          icon:<GoDot />,
        },
      ],
    },

    // Admin Teacher Route
    {
      label: "Teacher",
      key:"teacher",
      icon: <FaPeopleRoof />,
      children: [
        {
          label: <Link to={`/${lowerCase_role}/teachers`}>All Teacher</Link>,
          key: `/${lowerCase_role}/teachers`,
          icon:<GoDot />,
        },
        {
          label: <Link to={`/${lowerCase_role}/add-teacher`}>Add New Teacher</Link>,
          key: `/${lowerCase_role}/add-teacher`,
          icon:<GoDot />,
        },
        {
          label: <Link to={`/${lowerCase_role}/teachers/1`}>Teacher Details</Link>, // 1 will be replace by unique student Id
          key: `/${lowerCase_role}/teachers/1`,
          icon:<GoDot />,
        }, 
        {
          label: <Link to={`/${lowerCase_role}/payments`}>Teacher Payment</Link>,
          key: `/${lowerCase_role}/payments`,
          icon:<GoDot />,
        }, 
      ],
    },

    // Admin Guardian Route
    {
      label: "Guardian",
      key:"guardian",
      icon: <IoMdPeople />,
      children: [
        {
          label: <Link to={`/${lowerCase_role}/guardians`}>All Guardian</Link>,
          key: `/${lowerCase_role}/guardians`,
          icon:<GoDot />,
        },
        {
          label: <Link to={`/${lowerCase_role}/add-guardian`}>Add New Guardian</Link>,
          key: `/${lowerCase_role}/add-guardian`,
          icon:<GoDot />,
        },
        {
          label: <Link to={`/${lowerCase_role}/guardians/1`}>Guardian Details</Link>, // 1 will be replace by unique student Id
          key: `/${lowerCase_role}/guardians/1`,
          icon:<GoDot />,
        }, 
      ],
    },

    // classes route
    {
      label: <Link to={`/${lowerCase_role}/classes`}>Class List</Link>,
      key: `/${lowerCase_role}/classes`,
      icon:<GoDot />,
    },

    // Subject Route
    {
      label: <Link to={`/${lowerCase_role}/subjects`}>Subject List</Link>,
      key: `/${lowerCase_role}/subjects`,
      icon:<GoDot />,
    }, 

    // examination routes 
    {
        label: "Examination",
        key:"examination",
        icon: <FaFileAlt /> , 
        children: [
          {
            label: <Link to={`/${lowerCase_role}/exams`}>All Exam</Link>,
            key: `/${lowerCase_role}/exams`,
            icon:<GoDot />,
          },
          {
            label: <Link to={`/${lowerCase_role}/exam-result`}>Exam Result</Link>, // 1 will be replace by unique student Id
            key: `/${lowerCase_role}/exam-result`,
            icon:<GoDot />,
          }, 
        ],
    },
  ];

  const teacherSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,
    {
      label: <Link to={`/${lowerCase_role}/admin`}>Manage Admin</Link>,
      icon: <TableOutlined />,
      key: `/${lowerCase_role}/admin`,
    },
    {
      label: <Link to={`/${lowerCase_role}/user`}>Manage User</Link>,
      icon: <TableOutlined />,
      key: `/${lowerCase_role}/user`,
    },
    {
      label: "Management",
      key: "management",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link to={`/${lowerCase_role}/department`}>Department</Link>,
          key: `/${lowerCase_role}/department`,
        },
      ],
    },
  ];

  const guardianSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: <Link to={`/${lowerCase_role}/courses`}>Courses</Link>,
      icon: <TableOutlined />,
      key: `/${lowerCase_role}/courses`,
    },
  ];

  const studentSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: <Link to={`/${lowerCase_role}/courses`}>Courses</Link>,
      icon: <TableOutlined />,
      key: `/${lowerCase_role}/courses`,
    },
    {
      label: <Link to={`/${lowerCase_role}/courses/schedule`}>Course schedules</Link>,
      icon: <ScheduleOutlined />,
      key: `/${lowerCase_role}/courses/schedule`,
    },
    {
      label: <Link to={`/${lowerCase_role}/registration`}>Registration</Link>,
      icon: <ThunderboltOutlined />,
      key: `/${lowerCase_role}/registration`,
    },
    {
      label: <Link to={`/${lowerCase_role}/payment`}>Payment</Link>,
      icon: <CreditCardOutlined />,
      key: `/${lowerCase_role}/payment`,
    },
    {
      label: <Link to={`/${lowerCase_role}/academic-report`}>Academic report</Link>,
      icon: <FileTextOutlined />,
      key: `/${lowerCase_role}/academic-report`,
    },
  ];

  if (role === ROLE.ADMIN) return adminSidebarItems;
  else if (role === ROLE.TEACHER) return teacherSidebarItems;
  else if (role === ROLE.GUARDIAN) return guardianSidebarItems;
  else if (role === ROLE.STUDENT) return studentSidebarItems;
  else {
    return defaultSidebarItems;
  }
};
