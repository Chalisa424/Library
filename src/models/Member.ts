import { Loan } from "@prisma/client";

// src/models/Member.ts
export interface Member {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;  // หมายเลขโทรศัพท์
  loans: Loan[];  // ความสัมพันธ์กับการยืมหลายเล่ม
}
