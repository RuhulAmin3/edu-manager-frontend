/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from "~/common/hooks/redux.hooks";
import CustomTable from "~/components/table/custom-table"; 
import { useGetAllTeachersQuery } from "./teacher.api";
import { columns } from "./teacher.constant";
import { RootState } from "~/redux/store";  
import { setQuery } from "~/redux/slice"; 

const AdminTeacherList = () => {
  const query = useAppSelector((state: RootState) => state.defaultState.query);
  const dispatch = useAppDispatch();
  const { data: TeacherData, isFetching } = useGetAllTeachersQuery(query);
  const { data, meta } = TeacherData || {};

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
      scroll={{x:"max-content"}}
      totalDoc={meta?.totalDoc}
      pageSize={meta?.limit}
      prevPage={meta?.prevPage}
      nextPage={meta?.nextPage}
      onPaginationChange={onPaginationChange}
      onTableChange={onTableChange}
      dataSource={dataSource}
      columns={columns}
      loading={isFetching} 
    />
  );
};

export default AdminTeacherList;
