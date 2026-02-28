/**
 * Student Related Types
 */

export interface StudentName {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface Guardian {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
}

export interface Student {
  id: string;
  studentId: string;
  name: StudentName;
  gender: "Male" | "Female";
  dateOfBirth: string;
  admissionYear: number;
  guardian: Guardian;
  email?: string;
  contactNo?: string;
  bloodGroup: string;
  status: "Active" | "Inactive" | "Block";
  className: string;
  classRoll: string;
  section: string;
  schoolName: string;
  image: string;
  address: string;
  shortDescription?: string;
  imagePublicId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StudentApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: Student;
}

export interface StudentListApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: Student[];
  meta: {
    page: number;
    limit: number;
    totalDoc: number;
    totalPage: number;
    prevPage: number | null;
    nextPage: number | null;
  };
}

export interface StudentQueryParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  className?: string;
  gender?: string;
  status?: string;
  admissionYear?: number;
  bloodGroup?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface UpdateStudentData {
  name?: Partial<StudentName>;
  gender?: "Male" | "Female";
  dateOfBirth?: string;
  guardian?: Partial<Guardian>;
  email?: string;
  contactNo?: string;
  bloodGroup?: string;
  status?: "Active" | "Inactive" | "Block";
  className?: string;
  classRoll?: string;
  section?: string;
  schoolName?: string;
  address?: string;
  shortDescription?: string;
}
