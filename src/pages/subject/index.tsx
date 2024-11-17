import { Flex } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch } from "~/common/hooks/redux.hooks";
import useDebounce from "~/common/hooks/use-debounce";
import CustomInput from "~/components/form/custom-input";
import CustomBreadCrumb from "~/components/ui/bread-crumb";
import DefaultCard from "~/components/ui/default-card";
import NormalText from "~/components/ui/normal-text";
import SubjectList from "~/features/subject/subject-list"; 
import { resetQuery, setQuery } from "~/redux/slice";

const SubjectListPage = () => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm.trim()) { // checking string after removing empty spacing before and after typing text
      dispatch(setQuery({ searchTerm: debouncedSearchTerm }));
    } else {
      dispatch(resetQuery());
    }
  }, [debouncedSearchTerm, dispatch]);

  return (
    <>
      <CustomBreadCrumb
        items={[
          {
            label: `Subject List`,
          },
        ]}
      />
      <DefaultCard padding="0">
        <Flex
          align="center"
          justify="space-between"
          style={{ padding: "10px" }}
        >
          <NormalText textType="large" level={4}>
            Class Subjects
          </NormalText>
          <CustomInput
            placeholder="Search by title"
            padding="4px 10px"
            style={{ width: "350px" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Flex>
        <SubjectList />
      </DefaultCard>
    </>
  );
};

export default SubjectListPage;
