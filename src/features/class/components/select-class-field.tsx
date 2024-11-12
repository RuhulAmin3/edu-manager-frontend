/**
 * External Dependency
 */

import { FC } from "react";
/**
 * Internal Dependency
 */

import CustomSelect from "../../../components/form/custom-select";
import { useGetAllClassQuery } from "../class.api";

interface SelectClassFieldProps {
  // This ensures that SelectClassField receives all props that Form.Item might pass down
  [key: string]: unknown;
}

const SelectClassField: FC<SelectClassFieldProps> = (props) => {
  const { data: classOptions } = useGetAllClassQuery({});
  const classListItems = classOptions?.data?.map(
    (cls: Record<string, string>) => ({
      label: cls?.className,
      value: cls?.id,
    })
  );

  return (
    <CustomSelect
      size="large"
      placeholder="Select"
      options={classListItems}
      {...props}
    />
  );
};

export default SelectClassField;
