/**
 * External Dependencies
*/
import { BsFiletypeXlsx, BsPrinter } from "react-icons/bs";
import { BiSolidFileExport } from "react-icons/bi";
import { DownOutlined } from "@ant-design/icons";
import { GrDocumentPdf } from "react-icons/gr";
import { FaPlusSquare } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Flex } from "antd";

/**
 * Internal Dependencies
*/
import { classBreadCrumbItems } from "~/features/class/class.constant";
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
import ClassList from "~/features/class/class-list";
import CustomAvatar from "~/components/ui/avatar";

const ClassListPage = () => {
  const dispatch = useAppDispatch();
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
        <CustomBreadCrumb items={classBreadCrumbItems} />
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
            <FaPlusSquare /> Add Class
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
            Added Classes
          </NormalText>

          {/* search bar */}
          <CustomInput
            placeholder="Search by title"
            padding="4px 10px"
            style={{ width: "350px" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Flex>

        {/* class List in table */}
        <ClassList />

        {/* add class modal  */}
        <AddClassModal />
      </DefaultCard>
    </>
  );
};

export default ClassListPage;
