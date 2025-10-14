export type ExamType = {
    id: string;
    title: string;
    date: string;
    classId: string;
    subjects: {
        totalMark: number,
        subjectId: string,
    }[];
    authorId: string;
}