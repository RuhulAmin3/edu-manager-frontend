/**
 * Teacher Related Types
 */

export interface TeacherName {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface EducationalQualification {
  universityName: string;
  subject: string;
  result?: string;
  graduation: string;
  completedYear?: number;
}

export interface Teacher {
  id: string;
  teacherId: string;
  name: TeacherName;
  gender: "Male" | "Female";
  email: string;
  contactNo: string;
  bloodGroup: string;
  designation: string;
  salary: number;
  subject: string;
  type: "Monthly" | "Contractual" | "Daily";
  educationalQualification: EducationalQualification;
  image: string;
  imagePublicId?: string;
  dateOfBirth: string;
  address: string;
  shortDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TeacherApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: Teacher;
}

export interface TeacherListApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: Teacher[];
  meta: {
    page: number;
    limit: number;
    totalDoc: number;
    totalPage: number;
    prevPage: number | null;
    nextPage: number | null;
  };
}

export interface TeacherQueryParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  teacherId?: string;
  gender?: string;
  designation?: string;
  subject?: string;
  contactNo?: string;
  salary?: number;
  type?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface UpdateTeacherData {
  name?: Partial<TeacherName>;
  gender?: "Male" | "Female";
  email?: string;
  contactNo?: string;
  bloodGroup?: string;
  designation?: string;
  salary?: number;
  subject?: string;
  type?: "Monthly" | "Contractual" | "Daily";
  educationalQualification?: Partial<EducationalQualification>;
  dateOfBirth?: string;
  address?: string;
  shortDescription?: string;
}
