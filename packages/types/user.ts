export type LoginPayload = { identifier: string; password: string };

export type Profile = {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: string; // Consider using a Date type if needed
  yearAndSection: string;
  createdAt: string; // Consider using a Date type if needed
  updatedAt: string; // Consider using a Date type if needed
  user: User;
  course: Course;
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
