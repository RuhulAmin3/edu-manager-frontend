/**
 * External Dependencies
 */ 
import { FaPlusSquare } from "react-icons/fa";
import { useEffect, useState } from "react";
import { BsPrinter } from "react-icons/bs"; 
import { Flex } from "antd";

/**
 * Internal Dependencies
 */

import SubjectModal from "~/features/subject/components/subject-modal";
import { subjectsBreadCrumbItems } from "~/features/subject/subject.constant"; 
import { MODEL_CONSTANT } from "~/common/constants/modal.constant";
import { resetQuery, setModalName, setQuery } from "~/redux/slice"; 
import { useAppDispatch } from "~/common/hooks/redux.hooks";
import PrimaryButton from "~/components/ui/primary-button";
import RefreshButton from "~/components/ui/refresh-button";
import CustomBreadCrumb from "~/components/ui/bread-crumb";
import SubjectList from "~/features/subject/subject-list";
import CustomInput from "~/components/form/custom-input";
import DefaultCard from "~/components/ui/default-card";
import useDebounce from "~/common/hooks/use-debounce";
import NormalText from "~/components/ui/normal-text"; 


const SubjectListPage = () => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState<string>(""); 
  const debouncedSearchTerm = useDebounce(searchTerm, 500); 

  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      // checking string after removing empty spacing before and after typing text
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
        <CustomBreadCrumb
          items={subjectsBreadCrumbItems}
        />
        <Flex gap={10} align="center">
          <RefreshButton />
          
          <PrimaryButton style={{ padding: "18px 10px" }} onClick={()=>dispatch(setModalName(MODEL_CONSTANT.ADD_SUBJECT))}>
            {" "}
            <FaPlusSquare /> Add Subject
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
            Class Subjects
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

        {/* subject list table */}
        <SubjectList />

        {/* Unified subject modal - handles both add and edit */}
        <SubjectModal/>
      </DefaultCard>
    </>
  );
};

export default SubjectListPage;
