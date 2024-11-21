/**
 * External Dependencies
 */
import { BsFiletypeXlsx, BsPrinter } from "react-icons/bs";
import { BiSolidFileExport } from "react-icons/bi";
import { DownOutlined } from "@ant-design/icons";
import { GrDocumentPdf } from "react-icons/gr";
import { FaPlusSquare } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Flex, Popover } from "antd";

/**
 * Internal Dependencies
 */
import ExamFilterPopoverContent from "~/features/exam/components/exam-filter-popover-content"; 
import AddClassModal from "~/features/class/components/add-class-modal";
import { MODEL_CONSTANT } from "~/common/constants/modal.constant";
import { setModalName, setQuery, resetQuery } from "~/redux/slice";
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
import CustomAvatar from "~/components/ui/avatar";
import ExamList from "~/features/exam/exam-list";
import { CiFilter } from "react-icons/ci";

const ClassListPage = () => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
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
        <CustomBreadCrumb items={[{label:"Exam List"}]} />
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
          <PrimaryButton
            style={{ padding: "18px 10px" }}
            onClick={() => dispatch(setModalName(MODEL_CONSTANT.ADD_CLASS))}
          >
            {" "}
            <FaPlusSquare /> Add Exam
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
            Exams
          </NormalText>

          <Flex align="center" gap={5}>
            {/* search bar */}
            <CustomInput
              placeholder="Search by title or class name"
              padding="4px 10px"
              style={{ width: "350px" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* Filter content with filter button */}
            <Popover
              open={popoverOpen}
              onOpenChange={(val) => setPopoverOpen(val)}
              placement="bottomRight"
              trigger="click"
              arrow={false}
              content={
                <ExamFilterPopoverContent setPopoverOpen={setPopoverOpen} />
              }
            >
              <SecondaryButton>
                <CiFilter />
                Filter
                <DownOutlined size={2} />
              </SecondaryButton>
            </Popover>
          </Flex>
        </Flex>

        {/* class List in table */}
        <ExamList />

        {/* add class modal  */}
        <AddClassModal />
      </DefaultCard>
    </>
  );
};

export default ClassListPage;
