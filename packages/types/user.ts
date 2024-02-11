import { MakePayload } from "./helperType";

export type LoginPayload = { identifier: string; password: string };
export type RegisterPayload = LoginPayload & { username: string };

export type Profile = {
  id: number;
  studentId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: string; // Consider using a Date type if needed
  yearAndSection: string;
  createdAt: string; // Consider using a Date type if needed
  updatedAt: string; // Consider using a Date type if needed
  user: User;
  course: Course;
  college: College;
};

export type User = {
  id: number;
  username: string;
  email: string;
  type: string;
  createdAt: string; // Consider using a Date type if needed
  updatedAt: string; // Consider using a Date type if needed
};

export type Course = {
  id: number;
  name: string;
  code: string;
  createdAt: string;
  updatedAt: string;
};

export type College = {
  id: number;
  collegeName: string;
  createdAt: string;
  updatedAt: string;
  code: string;
  courses: Course[];
};

export type PaginationMeta = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};
export type ProfilesQueryData = MakePayload<Profile[]> & {
  meta: PaginationMeta;
};

export type UserProfile = {
  id?: number; // Assuming id is of type string, adjust if it's a different type
  studentId: string; // Assuming studentId is of type string, adjust if it's a different type
  email: string;
  username: string;
  firstName: string; // Assuming firstName is of type string, adjust if it's a different type
  middleName: string | null; // Assuming middleName is of type string, adjust if it's a different type
  lastName: string; // Assuming lastName is of type string, adjust if it's a different type
  birthDate: string | Date; // Assuming birthDate is a JavaScript Date object
  college: string; // Assuming college.code is of type string, adjust if it's a different type
  course: string; // Assuming course.code is of type string, adjust if it's a different type
};

export type UserProfilePayload = {
  studentId: string;
  username: string;
  email: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  birthDate: string; // Assuming birthDate is a string, you might want to use Date type after parsing
  course: string; // Assuming course is a number, adjust if it's a different type
  college: string; // Assuming college is a number, adjust if it's a different type
};
