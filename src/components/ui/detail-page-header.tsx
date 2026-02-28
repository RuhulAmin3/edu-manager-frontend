/**
 * External Dependencies
 */
import { BsFiletypeXlsx } from "react-icons/bs";
import { BiSolidFileExport } from "react-icons/bi";
import { DownOutlined } from "@ant-design/icons";
import { GrDocumentPdf } from "react-icons/gr";
import { FaPlusSquare } from "react-icons/fa";
import { Flex } from "antd";
import { FC } from "react";

/**
 * Internal Dependencies
 */
import SecondaryButton from "./secondary-button";
import CustomDropdown from "./custom-dropdown";
import CustomBreadCrumb, { BreadCrumbItem } from "./bread-crumb";
import PrimaryButton from "./primary-button";
import RefreshButton from "./refresh-button";

export type DetailPageHeaderProps = {
  breadcrumbItems: BreadCrumbItem[];
  onEdit?: () => void;
  onRefresh?: () => void;
  onExportPdf?: () => void;
  onExportExcel?: () => void;
  editButtonText?: string;
  showExportButtons?: boolean;
  showEditButton?: boolean;
  showRefreshButton?: boolean;
};

const DetailPageHeader: FC<DetailPageHeaderProps> = ({
  breadcrumbItems,
  onEdit,
  onRefresh,
  onExportPdf,
  onExportExcel,
  editButtonText = "Edit",
  showEditButton = true,
  showExportButtons = true,
  showRefreshButton = true,
}) => {

  const exportItems = [
    {
      key: "export as pdf",
      label: (
        <Flex gap={8} align="center" onClick={onExportPdf}>
          <GrDocumentPdf /> Export as PDF
        </Flex>
      ),
    },
    {
      key: "export as excel",
      label: (
        <Flex gap={8} align="center" onClick={onExportExcel}>
          <BsFiletypeXlsx /> Export as Excel
        </Flex>
      ),
    },
  ];

  return (
    <Flex
      align="center"
      justify="space-between"
      style={{ paddingBlock: "10px" }}
    >
      <CustomBreadCrumb items={breadcrumbItems} />

      <Flex gap={10} align="center">
        {showRefreshButton && <RefreshButton onClick={onRefresh} />}
        {showExportButtons && (
          <CustomDropdown
            placement="bottomRight"
            items={exportItems}
          >
            <SecondaryButton style={{ padding: "19px 15px" }}>
              <BiSolidFileExport />
              Exports
              <DownOutlined size={2} />
            </SecondaryButton>
          </CustomDropdown>
        )}

        {showEditButton && (
          <PrimaryButton style={{ padding: "18px 10px" }} onClick={onEdit}>
            <FaPlusSquare /> {editButtonText}
          </PrimaryButton>
        )}
      </Flex>
    </Flex>
  );
};

export default DetailPageHeader;
