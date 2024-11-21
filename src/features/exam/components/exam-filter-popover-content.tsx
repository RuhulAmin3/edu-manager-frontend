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
import {  monthSelectList } from "~/common/constants";
import { setQuery } from "~/redux/slice";
import SelectClassField from "~/features/class/components/select-class-field";

const ExamFilterPopoverContent: FC<{
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
          label="Month"
          name="month"
        >
          <CustomSelect
            size="large"
            placeholder="Select"
            options={monthSelectList}
          />
        </CustomFormItem>
        <CustomFormItem
          style={{ width: "100%", marginBottom: 0 }}
          layout="vertical"
          label="Class Name"
          name="classId"
        >
           <SelectClassField/>
        </CustomFormItem>
      </Flex>
   
    </DefaultFilterBox>
  );
};

export default ExamFilterPopoverContent;
