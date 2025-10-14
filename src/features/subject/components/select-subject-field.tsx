
/**
 * External Dependency
 */

import { FC } from "react";
/**
 * Internal Dependency
 */

import CustomSelect from "../../../components/form/custom-select";
import { useGetAllSubjectsQuery } from "../subject.api"; 
interface SelectSubjectFieldProps {
  // This ensures that SelectClassField receives all props that Form.Item might pass down
  [key: string]: unknown;
}

const SelectSubjectField: FC<SelectSubjectFieldProps> = (props) => {
  const { data: subjectOptions, isLoading } = useGetAllSubjectsQuery({});
  const subjectListItems = subjectOptions?.data?.map(
    (sub: Record<string, string>) => ({
      label: sub?.title,
      value: sub?.id,
    })
  );

  return (
    <CustomSelect
      size="large"
      placeholder="Select" 
      optionFilterProp="label"
      loading={isLoading}
      options={subjectListItems}
      {...props}
    />
  );
};

export default SelectSubjectField;
