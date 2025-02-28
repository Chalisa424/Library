import { Book } from "@prisma/client";
import { Member } from "./Member";

export interface Loan {
  id: number;
  bookId: number;
  memberId: number;
  quantity: number;  // จำนวนหนังสือที่ยืม
  dueDate: Date;  // กำหนดเวลาการคืน
  returnDate: Date | null;  // เวลาที่คืนจริง
  book: Book;  // ความสัมพันธ์กับหนังสือ
  member: Member;  // ความสัมพันธ์กับสมาชิก
}
