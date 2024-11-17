import CustomTable from "~/components/table/custom-table";
import { useGetAllSubjectsQuery } from "./subject.api";
import { columns } from "./subject.constant";
import { useAppSelector } from "~/common/hooks/redux.hooks";
import { RootState } from "~/redux/store";

const SubjectList = () => {
  const query = useAppSelector((state: RootState) => state.defaultState.query);
  const { data: subjectData, isLoading } = useGetAllSubjectsQuery(query);

  const { data } = subjectData || {};
  const dataSource = data?.map((sub: Record<string, string | number>) => ({
    key: sub.id,
    ...sub
  }));

  return (
    <CustomTable
      dataSource={dataSource}
      columns={columns}
      loading={isLoading} 
    />
  );
};

export default SubjectList;
