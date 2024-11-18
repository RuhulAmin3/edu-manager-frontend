import { Table, TablePaginationConfig, TableProps } from "antd";
import { PiArrowLeftFill, PiArrowRightFill } from "react-icons/pi";
import { EDU_MANAGER_TOKENS } from "~/styles/token";

type CustomTableProps<T> = {
  loading?: boolean;
  columns: TableProps<T>["columns"];
  dataSource: TableProps<T>["dataSource"];
  pageSize?: number;
  prevPage?: number;
  nextPage?: number;
  totalPages?: number;
  totalDoc?: number;
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
  prevPage,
  nextPage,
  totalDoc,
  showSizeChanger = true,
  onPaginationChange,
  onTableChange,
  showPagination = true,
  ...props
}: CustomTableProps<T>) => {
  const paginationConfig: TablePaginationConfig = {
    pageSize: pageSize,
    total: totalDoc,
    showLessItems: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    pageSizeOptions: ["5", "10", "20"],
    showSizeChanger: showSizeChanger,
    onChange: onPaginationChange,
    prevIcon: (
      <PiArrowLeftFill
        color={
          prevPage
            ? EDU_MANAGER_TOKENS.colors["edu-text-primary-color"]
            : EDU_MANAGER_TOKENS.colors["edu-text-secondary-color"]
        }
      />
    ),
    nextIcon: (
      <PiArrowRightFill
        color={
          nextPage
            ? EDU_MANAGER_TOKENS.colors["edu-text-primary-color"]
            : EDU_MANAGER_TOKENS.colors["edu-text-secondary-color"]
        }
      />
    ),
    style: { margin: "16px" },
  };

  return (
    <Table<T>
      bordered
      loading={loading}
      columns={columns}
      dataSource={dataSource}
      pagination={showPagination ? paginationConfig : false}
      onChange={onTableChange}
      {...props}
    />
  );
};

export default CustomTable;
