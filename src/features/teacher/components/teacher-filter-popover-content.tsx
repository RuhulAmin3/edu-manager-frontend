/**
 * External Dependencies
*/
import React, { FC } from "react";
import { Flex } from "antd";

/**
 * Internal Dependencies
 */

import DefaultFilterBox from "~/components/ui/default-filter-box";
import CustomFormItem from "~/components/form/custom-form-item"; 
import { useAppDispatch } from "~/common/hooks/redux.hooks";
import CustomSelect from "~/components/form/custom-select";
import { bloodGroupSelectList } from "~/common/constants";
import { setQuery } from "~/redux/slice";

const TeacherFilterPopoverContent: FC<{
  setPopoverOpen: (x: boolean) => void;
}> = ({ setPopoverOpen }) => {
  const dispatch = useAppDispatch();
  const handleSubmit = (values: Record<string, string>) => {
    dispatch(setQuery(values));
    setPopoverOpen(false);
  };

  return (
    <DefaultFilterBox layout="vertical" cb={handleSubmit}>
      {/* First row */} 
      <Flex justify="space-between" gap={10} style={{marginBottom:"10px"}}>
        <CustomFormItem
          style={{ width: "100%", marginBottom: 0 }}
          layout="vertical"
          label="Blood Group"
          name="bloodGroup"
        >
          <CustomSelect
            size="large"
            placeholder="Select"
            options={bloodGroupSelectList}
          />
        </CustomFormItem>
        <CustomFormItem
          style={{ width: "100%", marginBottom: 0 }}
          layout="vertical"
          label="Type"
          name="type"
        >
          <CustomSelect
            size="large"
            placeholder="Select"
            options={[
              { label: "Monthly", value: "Monthly" },
              { label: "Contractual", value: "Contractual" },
              { label: "Daily", value: "Daily" },
            ]}
          />
        </CustomFormItem>
      </Flex>

      {/* second row */}
      <Flex justify="space-between" gap={10}>
        <CustomFormItem
          style={{ width: "100%", marginBottom: 0 }}
          layout="vertical"
          label="Gender"
          name="gender"
        >
          <CustomSelect
            size="large"
            placeholder="Select"
            options={[
              { label: "Male", value: "Male" },
              { label: "Female", value: "Female" },
            ]}
          />
        </CustomFormItem>
      </Flex>
   
    </DefaultFilterBox>
  );
};

export default TeacherFilterPopoverContent;
