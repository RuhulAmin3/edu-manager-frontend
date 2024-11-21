/**
 * External Dependencies
*/
import { BsFiletypeXlsx, BsPrinter } from "react-icons/bs";
import { BiSolidFileExport } from "react-icons/bi";
import { DownOutlined } from "@ant-design/icons";
import { GrDocumentPdf } from "react-icons/gr";
import { FaPlusSquare } from "react-icons/fa";
import { Flex } from "antd";
/*
 * Internal Dependencies
*/
import { getFromLocalStorage } from "~/common/utils/local-storage.utils";
import { USER } from "~/common/constants/local-storage.constant";
import SecondaryButton from "~/components/ui/secondary-button";
import CustomDropdown from "~/components/ui/custom-dropdown";
import CustomBreadCrumb from "~/components/ui/bread-crumb";
import PrimaryButton from "~/components/ui/primary-button";
import RefreshButton from "~/components/ui/refresh-button";
import CustomAvatar from "~/components/ui/avatar";


const TeacherDetailsPage = () => {
  const { role }: Record<string, string> = getFromLocalStorage(USER) || {};
  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        style={{ paddingBlock: "10px" }}
      >
        <CustomBreadCrumb
          items={[
            {
              label: "Teacher List",
              link: `/${role ? role?.toLocaleLowerCase() : "admin"}/teachers`,
            },
            {
              label: "Teacher Details",
            },
          ]}
        />
        <Flex gap={10} align="center">
          <RefreshButton />
          <CustomAvatar size="large" shape="square" icon={<BsPrinter />} />

          {/* export buttons */}
          <CustomDropdown
            placement="bottomRight"
            items={[
              {
                key: "export as pdf",
                label: (
                  <Flex gap={8} align="center">
                    {" "}
                    <GrDocumentPdf /> Export as PDF
                  </Flex>
                ),
              },
              {
                key: "export as excel",
                label: (
                  <Flex gap={8} align="center">
                    {" "}
                    <BsFiletypeXlsx /> Export as Excel{" "}
                  </Flex>
                ),
              },
            ]}
          >
            <SecondaryButton style={{ padding: "19px 15px" }}>
              <BiSolidFileExport />
              Exports
              <DownOutlined size={2} />
            </SecondaryButton>
          </CustomDropdown>
          <PrimaryButton style={{ padding: "18px 10px" }}>
            {" "}
            <FaPlusSquare /> Edit Teacher
          </PrimaryButton>
        </Flex>
      </Flex>
    </>
  );
};

export default TeacherDetailsPage;
