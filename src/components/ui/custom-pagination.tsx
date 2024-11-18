import { Pagination } from "antd";
import React from "react";

const CustomPagination = () => {
  return (
    <Pagination
      total={85}
      showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
      defaultPageSize={20}
      defaultCurrent={1}
    />
  );
};

export default CustomPagination;
    