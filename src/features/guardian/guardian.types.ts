/**
 * Guardian Related Types
 */

export interface GuardianName {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface Guardian {
  id: string;
  guardianId: string;
  name: GuardianName;
  gender: "Male" | "Female";
  email?: string;
  contactNo: string;
  occupation: string;
  bloodGroup: string;
  image: string;
  imagePublicId?: string;
  accountStatus: "Pending" | "Approved" | "Block";
  address: string;
  students: string[]; // Array of student IDs
  shortDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GuardianApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: Guardian;
}

export interface GuardianListApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: Guardian[];
  meta: {
    page: number;
    limit: number;
    totalDoc: number;
    totalPage: number;
    prevPage: number | null;
    nextPage: number | null;
  };
}

export interface GuardianQueryParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  guardianId?: string;
  gender?: string;
  contactNo?: string;
  occupation?: string;
  accountStatus?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface UpdateGuardianData {
  name?: Partial<GuardianName>;
  gender?: "Male" | "Female";
  email?: string;
  contactNo?: string;
  occupation?: string;
  bloodGroup?: string;
  accountStatus?: "Pending" | "Approved" | "Block";
  address?: string;
  students?: string[];
  shortDescription?: string;
}
