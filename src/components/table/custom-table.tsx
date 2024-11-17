import { Table, TableProps } from "antd";

type CustomTableProps<T> = {
  loading?: boolean;
  columns: TableProps<T>["columns"];
  dataSource: TableProps<T>["dataSource"];
  pageSize?: number;
  totalPages?: number;
  showSizeChanger?: boolean;
  onPaginationChange?: (page: number, pageSize: number) => void;
  onTableChange?: TableProps<T>["onChange"];
  showPagination?: boolean;
} & Omit<TableProps<T>, "pagination" | "onChange">;

const CustomTable = <T extends object>({
  loading = false,
  columns,
  dataSource,
  pageSize,
  totalPages,
  showSizeChanger = true,
  onPaginationChange,
  onTableChange,
  showPagination = true,
  ...props
}: CustomTableProps<T>) => {
  const paginationConfig = showPagination
    ? {
        pageSize: pageSize,
        total: totalPages,
        pageSizeOptions: ["5", "10", "20"],
        showSizeChanger: showSizeChanger,
        onChange: onPaginationChange,
      }
    : false; 
  return (
    <Table<T>
      bordered
      loading={loading}
      columns={columns}
      dataSource={dataSource}
      
      pagination={paginationConfig}
      onChange={onTableChange}
      {...props}
    />
  );
};

export default CustomTable;
