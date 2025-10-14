import { FC } from "react";
import { useGetAllTeachersQuery } from "~/features/teacher/teacher.api";
import { Teacher } from "~/features/teacher/teacher.types";
import CustomSelect from "./custom-select";
interface SelectTeacherFieldProps {
    // This ensures that SelectTeacherField receives all props that Form.Item might pass down
    [key: string]: unknown;
}

const SelectTeacherField: FC<SelectTeacherFieldProps> = (props) => {
    const { data: teacherOptions, isLoading } = useGetAllTeachersQuery({});

    const teacherListItems = teacherOptions?.data?.map(
        (teacher: Teacher) => {
            const name = teacher?.name?.firstName + " " + (teacher?.name?.middleName || "") + " " + teacher?.name?.lastName;
            return {
                label: name,
                value: teacher?.id,
            }
        }
    );

    return (
        <CustomSelect
            size="large"
            placeholder="Select"
            loading={isLoading}
            options={teacherListItems}
            {...props}
        />
    );
};

export default SelectTeacherField;
