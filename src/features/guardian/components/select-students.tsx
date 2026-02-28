import { FC, useEffect, useState } from "react";
import useDebounce from "~/common/hooks/use-debounce";
import CustomSelect from "~/components/form/custom-select";
import { useLazyGetAllStudentsQuery } from "~/features/student/student.api";
import { Student } from "~/features/student/student.types";

interface CustomSelectProps {
    [key: string]: unknown;
}

export const SelectStudentsIdField: FC<CustomSelectProps> = (props) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const [trigger, { data: studentData }] = useLazyGetAllStudentsQuery();

    // Trigger API call only when debounced search term changes
    useEffect(() => {
        if (debouncedSearchTerm) {
            trigger({ searchTerm: debouncedSearchTerm });
        }
    }, [debouncedSearchTerm, trigger]);

    const studentListItems = studentData?.data?.map((student: Student) => ({
        label: student?.studentId,
        value: student?.studentId,
    }));

    return (
        <CustomSelect
            onSearch={(value: string) => {
                setSearchTerm(value);
            }}
            placeholder="Search by student Id"
            options={studentListItems || []}
            {...props}
        />
    );
};