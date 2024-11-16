import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { getFromLocalStorage } from "~/common/utils/local-storage.utils";
import { USER } from "~/common/constants/local-storage.constant";

// Define the type for the breadcrumb item
export type BreadCrumbItem = {
  label: string;
  link?: string;
};

// Define props for the CustomBreadCrumb component
export type CustomBreadCrumbProps = {
  items?: BreadCrumbItem[];
} & React.ComponentProps<typeof Breadcrumb>; 

const CustomBreadCrumb: React.FC<CustomBreadCrumbProps> = ({ items = [], ...breadcrumbProps }) => {
  const { role }: Record<string, string> = getFromLocalStorage(USER) || {};

  // Prepare breadcrumb items
  const breadCrumbItems = [
    {
      title: (
        <Link to={role ? `/${role.toLowerCase()}` : "/"}>
          Dashboard
        </Link>
      ),
    },
    ...items.map((item) => {
      return {
        title: item.link ? (
          <Link to={item.link}>{item.label}</Link>
        ) : (
          <span>{item.label}</span>
        ),
      };
    }),
  ];

  // Render Breadcrumb with custom items
  return (
    <Breadcrumb
      items={breadCrumbItems}
      style={{ margin: "15px 0" }}
      {...breadcrumbProps} // Allow passing additional props like `separator`
    />
  );
};

export default CustomBreadCrumb;
