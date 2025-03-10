import { Loan } from "@prisma/client";
import type { Book } from "./Book";

// src/models/Member.ts
export interface Member {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;  // หมายเลขโทรศัพท์
  loans: Loan[];  // ความสัมพันธ์กับการยืมหลายเล่ม
}
