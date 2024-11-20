/**
 * External Imports
 */

import { BsFiletypeXlsx, BsPrinter } from "react-icons/bs";
import { BiSolidFileExport } from "react-icons/bi";
import { DownOutlined } from "@ant-design/icons";
import { GrDocumentPdf } from "react-icons/gr";
import { FaPlusSquare } from "react-icons/fa";
import { useState, useEffect } from "react";
import { CiFilter } from "react-icons/ci";
import { Flex, Popover } from "antd";

/**
 * Internal Imports
 */

import StudentFilterPopoverContent from "~/features/student/components/student-filter-popover-content";
import { studentListBreadCrumbItems } from "~/features/student/student.constant";
import MultipleViewButtons from "~/components/ui/multiple-view-buttons";
import AdminStudentList from "~/features/student/admin-student-list";
import SecondaryButton from "~/components/ui/secondary-button";
import CustomDropdown from "~/components/ui/custom-dropdown";
import { useAppDispatch } from "~/common/hooks/redux.hooks";
import CustomBreadCrumb from "~/components/ui/bread-crumb";
import PrimaryButton from "~/components/ui/primary-button";
import RefreshButton from "~/components/ui/refresh-button";
import CustomInput from "~/components/form/custom-input";
import DefaultCard from "~/components/ui/default-card";
import useDebounce from "~/common/hooks/use-debounce";
import NormalText from "~/components/ui/normal-text";
import { setQuery, resetQuery } from "~/redux/slice";
import CustomAvatar from "~/components/ui/avatar";

const StudentListPage = () => {
  const dispatch = useAppDispatch();
  const [cardView, setCardView] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      dispatch(setQuery({ searchTerm: debouncedSearchTerm }));
    } else {
      dispatch(resetQuery());
    }
  }, [debouncedSearchTerm, dispatch]);

  return (
    <>
      {/* Breadcrumb bar */}
      <Flex
        align="center"
        justify="space-between"
        style={{ paddingBlock: "10px" }}
      >
        <CustomBreadCrumb items={studentListBreadCrumbItems} />
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
            <FaPlusSquare /> Add Student
          </PrimaryButton>
        </Flex>
      </Flex>

      {/* main table  */}
      <DefaultCard padding="0">
        {/* table top bar */}
        <Flex
          align="center"
          justify="space-between"
          style={{ padding: "10px" }}
        >
          <NormalText textType="large" level={4}>
            Students
          </NormalText>

          {/* search bar */}
          <Flex align="center" gap={5}>
            <CustomInput
              placeholder="Search by Student Roll, Student Id, School and Class"
              padding="4px 10px"
              style={{ width: "400px" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <Popover
              open={popoverOpen}
              onOpenChange={(val) => setPopoverOpen(val)}
              placement="bottomRight"
              trigger="click"
              arrow={false}
              content={<StudentFilterPopoverContent setPopoverOpen={setPopoverOpen} />}
            >
              <SecondaryButton>
                <CiFilter />
                Filter
                <DownOutlined size={2} />
              </SecondaryButton>
            </Popover>

            <MultipleViewButtons
              cardView={cardView}
              setCardView={setCardView}
            />
          </Flex>
        </Flex>

        {/* Students List in table */}
        <AdminStudentList />
      </DefaultCard>
    </>
  );
};

export default StudentListPage;
