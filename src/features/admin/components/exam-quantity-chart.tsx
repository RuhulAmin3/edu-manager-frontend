// External Imports
import { Divider, Flex, Popover, Tooltip } from "antd";
import { useState } from "react";
import { CiFilter } from "react-icons/ci";

// Internal Imports
import NormalText from "../../../components/ui/normal-text";
import CustomSelect from "../../../components/form/custom-select";
import { EDU_MANAGER_TOKENS } from "../../../styles/token";
import SecondaryButton from "../../../components/ui/secondary-button";
import { DownOutlined } from "@ant-design/icons";
import DefaultFilterBox from "../../../components/ui/default-filter-box";
import CustomFormItem from "../../../components/form/custom-form-item";
import { useLazyGetAllExamQuery } from "../../exam/exam.api";

const data = [
  { month: "January", value: 2, color: "#1890FF" },
  { month: "February", value: 1, color: "#73C9E8" },
  { month: "March", value: 4, color: "#FF7875" },
  //   { month: "April", value: 110, color: "#FFC069" },
  //   { month: "May", value: 130, color: "#95DE64" },
  //   { month: "June", value: 100, color: "#5CDBD3" },
  //   { month: "July", value: 150, color: "#FF85C0" },
  //   { month: "August", value: 125, color: "#FF9C6E" },
  //   { month: "September", value: 115, color: "#D3F261" },
  //   { month: "October", value: 135, color: "#A0D911" },
  //   { month: "November", value: 95, color: "#FFD666" },
  //   { month: "December", value: 105, color: "#FF4D4F" },
];

// Calculate the total value for width percentage calculation
const totalValue = data.reduce((acc, item) => acc + item.value, 0);

const ExamQuantityChart = () => {
  const [open, setOpen] = useState(false);

  const [triggerGetAllExam, { data: examData }] = useLazyGetAllExamQuery();

  const handleSubmit = (value: Record<string, string>) => {
    triggerGetAllExam(value);
    setOpen(false);
  };
  console.log("data", examData);
  const content = (
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
            options={[
              { label: "2023", value: "2023" },
              { label: "2024", value: "2024" },
            ]}
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
            options={[
              { label: "Ten", value: "671b21f14217b0cc8d5c0151" },
              { label: "Seven", value: "671b22414217b0cc8d5c0153" },
            ]}
          />
        </CustomFormItem>
      </Flex>
    </DefaultFilterBox>
  );
  return (
    <>
      <Flex justify="space-between" align="center">
        <NormalText textType="large" level={4} style={{ margin: 0 }}>
          Exam Quantity
        </NormalText>

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
      <Divider style={{ margin: "12px 0" }} />
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
    </>
  );
};

export default ExamQuantityChart;
