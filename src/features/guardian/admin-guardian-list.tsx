
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch, useAppSelector } from "~/common/hooks/redux.hooks";
import CustomTable from "~/components/table/custom-table"; 
import { RootState } from "~/redux/store";  
import { setQuery } from "~/redux/slice";  
import { columns } from "./guardian.constant";
import { useGetAllGuardiansQuery } from "./guardian.api";

const AdminGuardianList = () => {
  const query = useAppSelector((state: RootState) => state.defaultState.query);
  const dispatch = useAppDispatch();
  const { data: guardianData, isFetching } = useGetAllGuardiansQuery(query);
  const { data, meta } = guardianData || {};

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

export default AdminGuardianList;
