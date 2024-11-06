/**
 * External Dependency
 */

import { Divider, Flex, Popover, Space, Tooltip } from "antd";
import { useCallback, useMemo, useState } from "react";
import { FaRegCircleDot } from "react-icons/fa6";
import { DownOutlined } from "@ant-design/icons";
import { CiFilter } from "react-icons/ci";
import { Link } from "react-router-dom";

/**
 * Internal Dependency
 */

import DefaultFilterBox from "../../../components/ui/default-filter-box";
import CustomFormItem from "../../../components/form/custom-form-item";
import SecondaryButton from "../../../components/ui/secondary-button";
import PrimaryButton from "../../../components/ui/primary-button";
import CustomSelect from "../../../components/form/custom-select";
import { useLazyGetAllExamQuery } from "../../exam/exam.api";
import NormalText from "../../../components/ui/normal-text";
import { EDU_MANAGER_TOKENS } from "../../../styles/token";

const data = [
  { month: "January", value: 2, color: "#1890FF" },
  { month: "February", value: 1, color: "#73C9E8" },
  { month: "March", value: 4, color: "#FF7875" },
];

// Calculate the total value for width percentage calculation
const totalValue = data.reduce((acc, item) => acc + item.value, 0);

const ExamQuantityChart = () => {
  const [open, setOpen] = useState(false);

  const [triggerGetAllExam] = useLazyGetAllExamQuery();

  const handleSubmit = useCallback(
    (value: Record<string, string>) => {
      triggerGetAllExam(value);
      setOpen(false);
    },
    [triggerGetAllExam, setOpen]
  );

  // Memoized options
  const yearOptions = useMemo(
    () => [
      { label: "2023", value: "2023" },
      { label: "2024", value: "2024" },
    ],
    []
  );

  const classOptions = useMemo(
    () => [
      { label: "Ten", value: "671b21f14217b0cc8d5c0151" },
      { label: "Seven", value: "671b22414217b0cc8d5c0153" },
    ],
    []
  );

  const content = useMemo(
    () => (
      <DefaultFilterBox layout="vertical" cb={handleSubmit}>
        <Flex justify="space-between" gap={10}>
          <CustomFormItem
            style={{ width: "100%", marginBottom: 0 }}
            layout="vertical"
            label="Year"
            name="year"
          >
            <CustomSelect
              size="large"
              defaultValue="Select"
              options={yearOptions}
            />
          </CustomFormItem>
          <CustomFormItem
            style={{ width: "100%", marginBottom: 0 }}
            layout="vertical"
            label="Class"
            name="classId"
          >
            <CustomSelect
              size="large"
              defaultValue="Select"
              options={classOptions}
            />
          </CustomFormItem>
        </Flex>
      </DefaultFilterBox>
    ),
    [handleSubmit, yearOptions, classOptions]
  );

  return (
    <>
      <Flex justify="space-between" align="center">
        <NormalText textType="large" level={5} style={{ margin: 0 }}>
          Exam Quantity
        </NormalText>
        {/* Fiter box content with popover  */}
        <Popover
          open={open}
          onOpenChange={(val) => setOpen(val)}
          placement="bottomRight"
          trigger="click"
          arrow={false}
          content={content}
        >
          <SecondaryButton>
            <CiFilter />
            Filter
            <DownOutlined size={2} />
          </SecondaryButton>
        </Popover>
      </Flex>
      <Divider style={{ margin: "15px 0" }} />

      {/* showing Total Exam and Year*/}
      <Flex justify="space-between">
        <Space>
          <NormalText
            textType="middle"
            textColor={EDU_MANAGER_TOKENS.colors["edu-text-secondary-color"]}
            style={{ margin: "0px" }}
          >
            Total Exam:{" "}
          </NormalText>
          <NormalText textType="large" level={4}>
            {totalValue}
          </NormalText>
        </Space>
        <Space>
          <NormalText
            textType="middle"
            textColor={EDU_MANAGER_TOKENS.colors["edu-text-secondary-color"]}
            style={{ margin: "0px" }}
          >
            Year:{" "}
          </NormalText>
          <NormalText textType="large" level={4}>
            2024
          </NormalText>
        </Space>
      </Flex>
      {/* Monthly number of exams showing separately in Line graph*/}
      <Flex>
        {data.map((item, index) => {
          const widthPercentage = ((item.value / totalValue) * 100).toFixed(2);

          return (
            <Tooltip
              key={index}
              title={`${item.month}: ${item.value}`}
              placement="top"
              color={EDU_MANAGER_TOKENS.colors["edu-primary"]}
            >
              <div
                style={{
                  width: `${widthPercentage}%`,
                  backgroundColor: item.color,
                  height: "15px",
                  marginRight: "4px",
                  borderRadius: "4px",
                  transition: "transform 0.3s ease",
                }}
              />
            </Tooltip>
          );
        })}
      </Flex>
      <Divider style={{ margin: "15px 0" }} />

      {/* Monthly number of exams showing separately in text format*/}
      <Flex vertical gap={15}>
        <Flex justify="space-between">
          <NormalText textType="middle" style={{ width: "50%" }}>
            Month
          </NormalText>
          <NormalText textType="middle">No of Exams</NormalText>
          <NormalText textType="middle"> Class</NormalText>
        </Flex>
        {data?.map((dt) => {
          return (
            <Flex justify="space-between">
              <Flex gap={8} align="center" style={{ width: "50%" }}>
                <FaRegCircleDot color={dt.color} />{" "}
                <NormalText
                  textType="middle"
                  textColor={
                    EDU_MANAGER_TOKENS.colors["edu-text-secondary-color"]
                  }
                >
                  {dt.month}
                </NormalText>
              </Flex>
              <NormalText
                textType="middle"
                textColor={
                  EDU_MANAGER_TOKENS.colors["edu-text-secondary-color"]
                }
              >
                {dt.value}
              </NormalText>
              <NormalText
                textType="middle"
                textColor={
                  EDU_MANAGER_TOKENS.colors["edu-text-secondary-color"]
                }
              >
                Seven
              </NormalText>
            </Flex>
          );
        })}
        <Divider style={{ margin: "15px 0" }} />
        <Link to="/admin/exams">
          <PrimaryButton type="primary" block>
            View More
          </PrimaryButton>
        </Link>
      </Flex>
    </>
  );
};

export default ExamQuantityChart;
