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
