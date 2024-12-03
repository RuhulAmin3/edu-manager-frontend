import { Flex, Skeleton } from "antd";
import React from "react";

const StudentPromotionLoadingContent = () => {
  return (
    <Flex justify="space-between" gap={30}>
      <Skeleton paragraph={{ rows: 6 }} active />
      <Skeleton paragraph={{ rows: 6 }} active />
    </Flex>
  );
};

export default StudentPromotionLoadingContent;
