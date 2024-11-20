/**
 * External Dependencies
*/
import React, { FC } from "react";
import { Flex } from "antd";

/**
 * Internal Dependencies
 */

import SelectClassField from "~/features/class/components/select-class-field";
import DefaultFilterBox from "~/components/ui/default-filter-box";
import CustomFormItem from "~/components/form/custom-form-item";
import { yearOptions } from "~/features/admin/admin.constant";
import { useAppDispatch } from "~/common/hooks/redux.hooks";
import CustomSelect from "~/components/form/custom-select";
import { bloodGroupSelectList } from "~/common/constants";
import { setQuery } from "~/redux/slice";

const StudentFilterPopoverContent: FC<{
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
      <Flex justify="space-between" gap={10}>
        <CustomFormItem
          style={{ width: "100%", marginBottom: 0 }}
          layout="vertical"
          label="Admission Year"
          name="admissionYear"
        >
          <CustomSelect
            size="large"
            placeholder="Select"
            options={yearOptions}
          />
        </CustomFormItem>

        <CustomFormItem
          style={{ width: "100%", marginBottom: 0 }}
          layout="vertical"
          label="Class"
          name="classId"
        >
          {/* Use SelectClassField directly */}
          <SelectClassField />
        </CustomFormItem>
      </Flex>
      {/* second row */}
      <Flex justify="space-between" gap={10}>
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
          label="Status"
          name="status"
        >
          <CustomSelect
            size="large"
            placeholder="Select"
            options={[
              { label: "Active", value: "Active" },
              { label: "Inacitve", value: "Inacitve" },
              { label: "Block", value: "Block" },
            ]}
          />
        </CustomFormItem>
      </Flex>

      {/* Third row */}
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

export default StudentFilterPopoverContent;
