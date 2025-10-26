import { SubjectDataType } from "../subject/subject.type";

export type ClassDataType = {
    id:string;
    className:string;
    subjects:SubjectDataType[];
    studentIds:string[];
    subjectIds:string[];
}