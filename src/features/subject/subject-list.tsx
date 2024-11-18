/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomTable from "~/components/table/custom-table";
import { useGetAllSubjectsQuery } from "./subject.api";
import { columns } from "./subject.constant";
import { useAppDispatch, useAppSelector } from "~/common/hooks/redux.hooks";
import { RootState } from "~/redux/store";  
import { setQuery } from "~/redux/slice";

const SubjectList = () => {
  const query = useAppSelector((state: RootState) => state.defaultState.query);
  const dispatch = useAppDispatch();
  const { data: subjectData, isLoading } = useGetAllSubjectsQuery(query);
  const { data, meta } = subjectData || {};

  const dataSource = data?.map((sub: Record<string, string | number>) => ({
    key: sub.id,
    ...sub
  }));

  const onPaginationChange = (page:number, limit:number)=>{
      dispatch(setQuery({page, limit}));
  }

  const onTableChange = (pagination:any, filter:any, sorter:any) => {  
   const {field, order} = sorter; 
    const query = {
      sortBy:field,
      sortOrder:order === "ascend" ? "asc" : "desc",
    } 
    dispatch(setQuery(query));
   } 

  return (
    <CustomTable 
      totalDoc={meta?.totalDoc}
      pageSize={meta?.limit}
      prevPage={meta?.prevPage}
      nextPage={meta?.nextPage}
      onPaginationChange={onPaginationChange}
      onTableChange={onTableChange}
      dataSource={dataSource}
      columns={columns}
      loading={isLoading} 
    />
  );
};

export default SubjectList;
