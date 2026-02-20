// src/lib/api/students.ts
// import { Student } from '@/types/student';

import { Student } from '../type/Student';

export interface StudentsResponse {
  items: Student[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

export const getStudents = async (): Promise<any> => {
  const res = await fetch('/api/students/excel');

  if (!res.ok) throw new Error('Failed to fetch students');

  return res.json();
};
