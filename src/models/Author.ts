import { Book } from "@prisma/client";

export interface Author {
  id: number;
  firstName: string;
  lastName: string;
  affiliation: string;
  books: Book[];  // ความสัมพันธ์กับหนังสือหลายเล่ม
}

